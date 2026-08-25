import express from 'express';
import { getBookings, getBookingById, updatePaymentStatus } from '../controllers/bookingController.js';
import db from '../config/db.js';
import { sendAllBookingEmails } from '../services/emailService.js';

const router = express.Router();

// Create booking directly in route with email support
router.post('/', async (req, res) => {
  try {
    const {
      service_type, booking_date, booking_time, participants,
      total_price, original_price, customer_name, customer_email,
      customer_phone, customer_address, notes, coupon_code,
      discount_amount, discount_percentage
    } = req.body;

    // Optional fields (original_price, coupon_code, discount_amount,
    // discount_percentage) can legitimately be absent — e.g. no coupon was
    // applied. Postgres needs an explicit null for a missing parameter, not
    // JS's undefined, so default each one here instead of passing it through.
    const values = [
      service_type,
      booking_date,
      booking_time,
      participants,
      total_price,
      original_price ?? total_price ?? null,
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      notes ?? "",
      coupon_code ?? null,
      discount_amount ?? null,
      discount_percentage ?? null,
    ];

    // Insert booking
    const result = await db.query(
      `INSERT INTO bookings (
        service_type, booking_date, booking_time, participants,
        total_price, original_price, customer_name, customer_email,
        customer_phone, customer_address, notes, coupon_code,
        discount_amount, discount_percentage, payment_status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'pending', NOW())
      RETURNING *`,
      values
    );

    const booking = result.rows[0];

    // Send emails in background
    if (booking) {
      console.log('📧 Sending booking confirmation emails for booking #', booking.id);
      sendAllBookingEmails(booking).catch(err => {
        console.error('❌ Background email sending failed:', err);
      });
    }

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      booking: booking
    });

  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create booking',
      // Included so the frontend/console can show what actually went wrong
      // instead of a dead-end generic message — remove once this is stable.
      details: error.message
    });
  }
});

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id/payment', updatePaymentStatus);

// DELETE a booking by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Deleting booking:", id);
  
  try {
    const result = await db.query("DELETE FROM bookings WHERE id = $1 RETURNING id", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.json({ message: "Booking deleted successfully", deletedId: id });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ message: "Error deleting booking", error: err.message });
  }
});

// DELETE bookings older than 30 days
router.delete('/old', async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM bookings WHERE booking_date < CURRENT_DATE - INTERVAL '30 days' RETURNING id"
    );
    
    res.json({ 
      message: `Deleted ${result.rows.length} old bookings`,
      deletedCount: result.rows.length 
    });
  } catch (err) {
    console.error("Error deleting old bookings:", err);
    res.status(500).json({ message: "Error deleting old bookings", error: err.message });
  }
});

export default router;