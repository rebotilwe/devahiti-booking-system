import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Update booking payment status
router.post('/update-booking-status', async (req, res) => {
  const { bookingId, paymentStatus, paymentId } = req.body;
  
  console.log("Updating booking:", { bookingId, paymentStatus, paymentId });
  
  if (!bookingId) {
    return res.status(400).json({ error: 'Booking ID is required' });
  }
  
  const sql = "UPDATE bookings SET payment_status = ?, payment_id = ? WHERE id = ?";
  
  db.query(sql, [paymentStatus, paymentId || null, bookingId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: 'Failed to update booking status' });
    }
    
    console.log("Booking updated successfully:", result);
    res.json({ 
      success: true, 
      message: `Booking ${bookingId} updated to ${paymentStatus}` 
    });
  });
});

export default router;