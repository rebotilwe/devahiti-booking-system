-- 010: support reliable payment confirmation.
-- Safe to run more than once. Run in the Supabase SQL Editor BEFORE deploying the new backend.
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS checkout_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_started_at TIMESTAMPTZ;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS unpaid_alert_sent_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_bookings_checkout_id ON bookings (checkout_id);
