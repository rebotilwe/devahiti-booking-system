import express from 'express';
import { createBooking, getBookings, getBookingById, updatePaymentStatus } from '../controllers/bookingController.js';
import db from '../config/db.js';
import { sendAllBookingEmails } from '../services/emailService.js';

const router = express.Router();

// Create booking - Modified to send emails
router.post('/', async (req, res) => {
  try {
    // Call the existing createBooking controller
    await createBooking(req, res);
    
    // Note: The email will be sent from the controller after booking is created
  } catch (error) {
    console.error('Error in booking route:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Wrap the createBooking controller to add email functionality
const originalCreateBooking = createBooking;
createBooking = async (req, res) => {
  try {
    // Call the original controller logic
    const result = await new Promise((resolve, reject) => {
      originalCreateBooking(req, {
        status: (code) => ({
          json: (data) => {
            if (code === 201 || code === 200) {
              resolve({ success: true, data });
            } else {
              reject({ success: false, data });
            }
          }
        })
      });
    });
    
    // If booking was created successfully, send emails
    if (result.success && result.data.booking) {
      const booking = result.data.booking;
      sendAllBookingEmails(booking).catch(err => {
        console.error('Background email sending failed:', err);
      });
    }
    
    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id/payment', updatePaymentStatus);

// DELETE a booking by ID (PostgreSQL syntax)
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

// DELETE bookings older than 30 days (PostgreSQL syntax)
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