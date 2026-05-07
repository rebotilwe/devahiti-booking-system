import express from 'express';
import axios from 'axios';
import db from '../config/db.js';

const router = express.Router();

const YOCO_API_URL = 'https://payments.yoco.com/api/checkouts';
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

// Create a checkout session
router.post('/create-checkout', async (req, res) => {
  console.log("=== Yoco Payment Request ===");
  console.log("Request body:", req.body);
  
  const { amount, bookingId, customerName, customerEmail } = req.body;

  if (!amount || !bookingId) {
    console.log("Missing required fields:", { amount, bookingId });
    return res.status(400).json({ error: 'Amount and bookingId are required' });
  }

  try {
    const amountInCents = Math.round(amount * 100);
    console.log(`Amount: R${amount} = ${amountInCents} cents`);
    
    const successUrl = process.env.FRONTEND_URL 
      ? `${process.env.FRONTEND_URL}/payment-success?bookingId=${bookingId}`
      : `https://devahiti-wellness.netlify.app/payment-success?bookingId=${bookingId}`;
      
    const cancelUrl = process.env.FRONTEND_URL
      ? `${process.env.FRONTEND_URL}/payment-cancelled?bookingId=${bookingId}`
      : `https://devahiti-wellness.netlify.app/payment-cancelled?bookingId=${bookingId}`;
    
    const payload = {
      amount: amountInCents,
      currency: 'ZAR',
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      metadata: {
        bookingId: bookingId,
        customerName: customerName,
        customerEmail: customerEmail,
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
    res.json({ redirectUrl: response.data.redirectUrl });
    
  } catch (error) {
    console.error("Yoco error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create checkout session', details: error.response?.data });
  }
});

// Update booking payment status
router.post('/update-booking-status', async (req, res) => {
  const { bookingId, paymentStatus, paymentId } = req.body;
  
  console.log("Updating booking:", { bookingId, paymentStatus, paymentId });
  
  if (!bookingId) {
    return res.status(400).json({ error: 'Booking ID is required' });
  }
  
  try {
    await db.query(
      "UPDATE bookings SET payment_status = $1, payment_id = $2 WHERE id = $3",
      [paymentStatus, paymentId || null, bookingId]
    );
    
    console.log(`Booking ${bookingId} updated to ${paymentStatus}`);
    res.json({ success: true, message: `Booking ${bookingId} updated to ${paymentStatus}` });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;