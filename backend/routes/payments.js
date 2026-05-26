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
  
  const { amount, bookingId, customerName, customerEmail, originalAmount, couponCode, discountAmount } = req.body;

  if (!amount || !bookingId) {
    console.log("Missing required fields:", { amount, bookingId });
    return res.status(400).json({ error: 'Amount and bookingId are required' });
  }

  try {
    const amountInCents = Math.round(amount * 100);
    console.log(`Amount: R${amount} = ${amountInCents} cents`);
    
    const frontendUrl = process.env.FRONTEND_URL || 'https://devahiti-wellness.netlify.app';
    
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
        discountAmount: discountAmount
      },
    };
    
    console.log("Sending to Yoco:", JSON.stringify(payload, null, 2));
    
    // ✅ FIX: Use correct Yoco API endpoint with proper secret key format
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
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      details: error.response?.data || error.message 
    });
  }
});

// ✅ FIXED: Webhook endpoint for Yoco to confirm payment (PostgreSQL syntax)
router.post('/webhook', async (req, res) => {
  console.log("=== Yoco Webhook Received ===");
  console.log("Webhook body:", req.body);
  
  const { id, status, metadata } = req.body;
  
  if (status === 'successful' && metadata && metadata.bookingId) {
    try {
      // PostgreSQL syntax using $1, $2, $3
      await db.query(
        `UPDATE bookings 
         SET payment_status = $1, 
             payment_id = $2, 
             updated_at = NOW() 
         WHERE id = $3`,
        ['paid', id, metadata.bookingId]
      );
      
      console.log(`✅ Booking ${metadata.bookingId} marked as paid`);
      res.json({ received: true });
    } catch (err) {
      console.error("Webhook database error:", err);
      res.status(500).json({ error: 'Database update failed' });
    }
  } else {
    console.log("Webhook ignored - not a successful payment or missing bookingId");
    res.json({ received: true });
  }
});

// ✅ FIXED: Update booking status (PostgreSQL syntax)
router.post('/update-booking-status', async (req, res) => {
  const { bookingId, paymentStatus, paymentId } = req.body;
  
  console.log("Updating booking:", { bookingId, paymentStatus, paymentId });
  
  if (!bookingId) {
    return res.status(400).json({ error: 'Booking ID is required' });
  }
  
  try {
    // PostgreSQL syntax using $1, $2, $3
    await db.query(
      `UPDATE bookings 
       SET payment_status = $1, 
           payment_id = $2, 
           updated_at = NOW() 
       WHERE id = $3`,
      [paymentStatus, paymentId || null, bookingId]
    );
    
    console.log(`✅ Booking ${bookingId} updated to ${paymentStatus}`);
    res.json({ 
      success: true, 
      message: `Booking ${bookingId} updated to ${paymentStatus}` 
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router;