import crypto from 'crypto';
import axios from 'axios';
import db from '../config/db.js';
import { sendAllBookingEmails, sendUnpaidBookingAlert } from './emailService.js';

const YOCO_API = 'https://payments.yoco.com/api';

// ---------------------------------------------------------------------------
// The ONE place a booking becomes "paid". Webhook, server-side verification and
// the reconciliation job all call this. The WHERE clause makes it idempotent:
// only the first caller updates the row and triggers the emails.
// ---------------------------------------------------------------------------
export async function markBookingPaid({ bookingId, paymentId, method = 'Card' }) {
  const result = await db.query(
    `UPDATE bookings
        SET payment_status = 'paid', payment_id = $2, updated_at = NOW()
      WHERE id = $1 AND payment_status != 'paid'
      RETURNING *`,
    [bookingId, paymentId || null]
  );
  const booking = result.rows[0];
  if (!booking) return { updated: false };

  console.log(`✅ Booking ${bookingId} marked paid (${method}, ${paymentId})`);
  // Do not block the response on email; failures are logged by sendAllBookingEmails.
  sendAllBookingEmails(booking, {
    amount: booking.total_price,
    method,
    transactionId: paymentId || 'N/A',
  }).then((r) => {
    if (r && r.success === false) console.error(`❌ Emails FAILED for booking ${bookingId}:`, r.error);
  });
  return { updated: true, booking };
}

// ---------------------------------------------------------------------------
// Webhook signature verification (Standard Webhooks scheme, used by Yoco).
// signed content = `${webhook-id}.${webhook-timestamp}.${rawBody}`
// key = base64-decoded part of the secret after "whsec_"
// ---------------------------------------------------------------------------
export function verifyWebhookSignature(rawBody, headers, secret, toleranceSeconds = 300) {
  if (!secret || !rawBody) return false;
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const sigHeader = headers['webhook-signature'];
  if (!id || !timestamp || !sigHeader) return false;

  const ts = parseInt(timestamp, 10);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > toleranceSeconds) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = crypto
    .createHmac('sha256', key)
    .update(`${id}.${timestamp}.${rawBody.toString('utf8')}`)
    .digest();

  // Header looks like "v1,<base64> v1,<base64>" (several while a secret rotates).
  return sigHeader.split(' ').some((part) => {
    const [version, sig] = part.split(',');
    if (version !== 'v1' || !sig) return false;
    const given = Buffer.from(sig, 'base64');
    return given.length === expected.length && crypto.timingSafeEqual(given, expected);
  });
}

// Process one verified webhook event. Returns a short string describing what happened.
export async function handleYocoEvent(event) {
  if (event?.type !== 'payment.succeeded') return `ignored:${event?.type}`;

  const p = event.payload || {};
  const checkoutId = p.metadata?.checkoutId;
  const paymentId = p.id;

  let booking = null;
  if (checkoutId) {
    booking = (await db.query('SELECT * FROM bookings WHERE checkout_id = $1', [checkoutId])).rows[0];
  }
  if (!booking && p.metadata?.bookingId) {
    booking = (await db.query('SELECT * FROM bookings WHERE id = $1', [p.metadata.bookingId])).rows[0];
  }
  if (!booking) {
    console.error('⚠️ payment.succeeded but no matching booking', { checkoutId, paymentId });
    return 'no-matching-booking';
  }

  const paidCents = Number(p.amount);
  const expectedCents = Math.round(Number(booking.total_price) * 100);
  if (Number.isFinite(paidCents) && Math.abs(paidCents - expectedCents) > 1) {
    console.error(`⚠️ Amount mismatch on booking ${booking.id}: paid ${paidCents}c, expected ${expectedCents}c (marking paid anyway; check in Yoco)`);
  }

  const r = await markBookingPaid({ bookingId: booking.id, paymentId, method: 'Card (Yoco)' });
  return r.updated ? `paid:${booking.id}` : `already-paid:${booking.id}`;
}

// ---------------------------------------------------------------------------
// Server-side verification with Yoco: ask Yoco whether this booking's checkout
// completed. Used as a safety net (success page + background job) in case a
// webhook is missed. Never trusts the browser.
// ---------------------------------------------------------------------------
export async function verifyBookingWithYoco(booking) {
  if (!booking?.checkout_id || booking.payment_status === 'paid') return false;
  try {
    const { data } = await axios.get(`${YOCO_API}/checkouts/${booking.checkout_id}`, {
      headers: { Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}` },
      timeout: 10000,
    });
    // Log the shape the first times so field names can be confirmed from real data.
    console.log(`Yoco checkout ${booking.checkout_id} status:`, JSON.stringify({ status: data.status, paymentId: data.paymentId, id: data.id }));
    if (String(data.status).toLowerCase() === 'completed') {
      const r = await markBookingPaid({
        bookingId: booking.id,
        paymentId: data.paymentId || data.payment?.id || booking.checkout_id,
        method: 'Card (Yoco, verified)',
      });
      return r.updated || true;
    }
  } catch (err) {
    console.error(`Yoco verify failed for booking ${booking.id}:`, err.response?.status, err.response?.data || err.message);
  }
  return false;
}

// Background job: re-check recent pending bookings, then alert about stale ones.
const UNPAID_ALERT_MINUTES = parseInt(process.env.UNPAID_ALERT_MINUTES || '30', 10);

export async function runPaymentChecks() {
  try {
    const pending = await db.query(
      `SELECT * FROM bookings
        WHERE payment_status = 'pending' AND checkout_id IS NOT NULL
          AND payment_started_at > NOW() - INTERVAL '48 hours'
          AND payment_started_at < NOW() - INTERVAL '2 minutes'`
    );
    for (const b of pending.rows) await verifyBookingWithYoco(b);

    // Claim-then-send so two overlapping runs can't double-alert.
    const stale = await db.query(
      `UPDATE bookings SET unpaid_alert_sent_at = NOW()
        WHERE payment_status = 'pending' AND payment_started_at IS NOT NULL
          AND unpaid_alert_sent_at IS NULL
          AND payment_started_at < NOW() - ($1 || ' minutes')::interval
          AND payment_started_at > NOW() - INTERVAL '48 hours'
        RETURNING *`,
      [String(UNPAID_ALERT_MINUTES)]
    );
    for (const b of stale.rows) await sendUnpaidBookingAlert(b, UNPAID_ALERT_MINUTES);
  } catch (err) {
    console.error('Payment check job failed:', err.message);
  }
}
