import express from 'express';
import axios from 'axios';
import db from '../config/db.js';
import { sendBookingStartedAlert } from '../services/emailService.js';
import { markBookingPaid, verifyWebhookSignature, handleYocoEvent, verifyBookingWithYoco } from '../services/paymentService.js';

const router = express.Router();

const YOCO_API_URL = 'https://payments.yoco.com/api/checkouts';
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

// The transaction fee percentage passed on to the customer at checkout.
// Confirm this against the actual rate on Cheryl's Yoco merchant account
// (Yoco's online/card-not-present rate is typically ~2.95%, but this varies
// by account) and set YOCO_FEE_PERCENT in the environment to match — this
// default is only a placeholder until that's confirmed.
const YOCO_FEE_PERCENT = parseFloat(process.env.YOCO_FEE_PERCENT || '2.95');

// Given a subtotal, work out the fee to add so the customer covers it
// instead of it coming out of the merchant's payout.
const calculateFee = (subtotal) => {
  const fee = Math.round((subtotal * YOCO_FEE_PERCENT / 100) * 100) / 100;
  const total = Math.round((subtotal + fee) * 100) / 100;
  return { fee, total };
};

// Lets the frontend show "+ card processing fee" and the true total before
// the customer commits to paying, using the same calculation create-checkout
// uses so the number never surprises them at the final step.
router.post('/quote', (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'A positive amount is required' });
  }
  const { fee, total } = calculateFee(amount);
  res.json({ subtotal: amount, fee, total, feePercent: YOCO_FEE_PERCENT });
});

router.post('/create-checkout', async (req, res) => {
  console.log("=== Yoco Payment Request ===");
  console.log("Request body:", req.body);
  console.log("FRONTEND_URL from env:", process.env.FRONTEND_URL);
  console.log("YOCO_SECRET_KEY prefix:", YOCO_SECRET_KEY?.substring(0, 15) + "...");
  
  const { amount, bookingId, customerName, customerEmail, originalAmount, couponCode, discountAmount } = req.body;

  if (!amount || !bookingId) {
    console.log("Missing required fields:", { amount, bookingId });
    return res.status(400).json({ error: 'Amount and bookingId are required' });
  }

  try {
    // `amount` is the service subtotal (after any coupon) — add the Yoco
    // transaction fee on top so the customer covers it, not Cheryl.
    const { fee: feeAmount, total: totalWithFee } = calculateFee(amount);
    const amountInCents = Math.round(totalWithFee * 100);
    console.log(`Subtotal: R${amount}, Fee: R${feeAmount}, Charged: R${totalWithFee} = ${amountInCents} cents`);

    // Keep the booking record in sync with what's actually being charged.
    try {
      await db.query(
        "UPDATE bookings SET total_price = $1 WHERE id = $2",
        [totalWithFee, bookingId]
      );
    } catch (updateErr) {
      console.error("Failed to update booking total with fee:", updateErr);
      // Don't block the payment over this — the charge itself is still correct.
    }
    
    const frontendUrl = process.env.FRONTEND_URL || 'https://devahitibookingsystem.netlify.app';
    
    const successUrl = `${frontendUrl}/payment-success?bookingId=${bookingId}`;
    const cancelUrl = `${frontendUrl}/payment-cancelled?bookingId=${bookingId}`;
    
    console.log("Success URL:", successUrl);
    console.log("Cancel URL:", cancelUrl);
    
    const payload = {
      amount: amountInCents,
      currency: 'ZAR',
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      metadata: {
        bookingId: bookingId,
        customerName: customerName,
        customerEmail: customerEmail,
        originalAmount: originalAmount,
        couponCode: couponCode,
        discountAmount: discountAmount,
        subtotal: amount,
        feeAmount: feeAmount,
      },
    };
    
    console.log("Sending to Yoco:", JSON.stringify(payload, null, 2));
    
    const response = await axios.post(YOCO_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOCO_SECRET_KEY}`,
      },
    });

    console.log("Yoco success! Response:", response.data);

    // Remember Yoco's checkout id so the webhook (and the safety-net checks)
    // can match a payment back to this booking.
    try {
      const saved = await db.query(
        "UPDATE bookings SET checkout_id = $1, payment_started_at = NOW() WHERE id = $2 RETURNING *",
        [response.data.id, bookingId]
      );
      if (saved.rows[0]) sendBookingStartedAlert(saved.rows[0]);
    } catch (saveErr) {
      console.error("Failed to save checkout id on booking:", saveErr.message);
    }

    res.json({ redirectUrl: response.data.redirectUrl, feeAmount, totalCharged: totalWithFee });
    
  } catch (error) {
    console.error("Yoco error details:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      details: error.response?.data || error.message 
    });
  }
});

// Yoco webhook. Authoritative way a booking becomes paid.
// Needs the RAW request body for signature checking (captured in server.js).
router.post('/webhook', async (req, res) => {
  const secret = process.env.YOCO_WEBHOOK_SECRET;
  if (!secret) {
    console.error('Webhook received but YOCO_WEBHOOK_SECRET is not set - rejecting');
    return res.status(503).json({ error: 'Webhook not configured' });
  }
  if (!verifyWebhookSignature(req.rawBody, req.headers, secret)) {
    console.error('Webhook rejected: bad signature');
    return res.status(401).json({ error: 'Invalid signature' });
  }
  try {
    const outcome = await handleYocoEvent(req.body);
    console.log('Webhook handled:', req.body?.type, outcome);
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    // 500 makes Yoco retry later.
    res.status(500).json({ error: 'Processing failed' });
  }
});

// Used by the payment-success page. Read-only: reports whether the booking is
// paid. If it is still pending, it asks Yoco directly (server-side) at most
// once every few seconds, so the page works even if the webhook is delayed.
const lastVerify = new Map();
router.get('/status/:bookingId', async (req, res) => {
  try {
    const id = parseInt(req.params.bookingId, 10);
    if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid booking id' });
    let row = (await db.query('SELECT id, payment_status, checkout_id FROM bookings WHERE id = $1', [id])).rows[0];
    if (!row) return res.status(404).json({ error: 'Not found' });

    if (row.payment_status !== 'paid' && row.checkout_id) {
      const last = lastVerify.get(id) || 0;
      if (Date.now() - last > 5000) {
        lastVerify.set(id, Date.now());
        await verifyBookingWithYoco(row);
        row = (await db.query('SELECT id, payment_status FROM bookings WHERE id = $1', [id])).rows[0];
      }
    }
    res.json({ bookingId: id, paid: row.payment_status === 'paid' });
  } catch (err) {
    console.error('Status check error:', err.message);
    res.status(500).json({ error: 'Status check failed' });
  }
});

// Manual override for the developer only (e.g. a cash/EFT payment). Requires
// the ADMIN_API_KEY header. The public website no longer calls this.
router.post('/update-booking-status', async (req, res) => {
  const key = process.env.ADMIN_API_KEY;
  if (!key || req.headers['x-admin-key'] !== key) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { bookingId, paymentStatus, paymentId, sendEmails } = req.body;
  if (!bookingId || !paymentStatus) {
    return res.status(400).json({ error: 'bookingId and paymentStatus are required' });
  }
  try {
    if (paymentStatus === 'paid' && sendEmails !== false) {
      const r = await markBookingPaid({ bookingId, paymentId: paymentId || 'manual', method: 'Manual' });
      return res.json({ success: true, updated: r.updated });
    }
    await db.query(
      'UPDATE bookings SET payment_status = $1, payment_id = $2, updated_at = NOW() WHERE id = $3',
      [paymentStatus, paymentId || null, bookingId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;