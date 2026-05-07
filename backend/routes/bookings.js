import express from 'express';
import { createBooking, getBookings, getBookingById, updatePaymentStatus } from '../controllers/bookingController.js';
import db from '../config/db.js';  // ✅ ADD THIS IMPORT

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id/payment', updatePaymentStatus);

// DELETE a booking by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM bookings WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      return res.status(500).json({ message: "Error deleting booking", error: err.message });
    }
    res.json({ message: "Booking deleted successfully" });
  });
});

// DELETE bookings older than 30 days
router.delete('/old', (req, res) => {
  const sql = "DELETE FROM bookings WHERE booking_date < DATE_SUB(CURDATE(), INTERVAL 30 DAY)";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error deleting old bookings:", err);
      return res.status(500).json({ message: "Error deleting old bookings", error: err.message });
    }
    res.json({ 
      message: `Deleted ${result.affectedRows} old bookings`,
      deletedCount: result.affectedRows 
    });
  });
});

export default router;