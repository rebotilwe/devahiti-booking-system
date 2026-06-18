import express from 'express';
import axios from 'axios';
import db from '../config/db.js';
import { sendAllBookingEmails } from '../services/emailService.js';

const router = express.Router();

const YOCO_API_URL = 'https://payments.yoco.com/api/checkouts';
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

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
    const amountInCents = Math.round(amount * 100);
    console.log(`Amount: R${amount} = ${amountInCents} cents`);
    
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
        discountAmount: discountAmount
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

// Webhook endpoint - Updated to send email notifications
router.post('/webhook', async (req, res) => {
  console.log("=== Yoco Webhook Received ===");
  console.log("Webhook body:", req.body);
  
  const { id, status, metadata } = req.body;
  
  if (status === 'successful' && metadata && metadata.bookingId) {
    try {
      // Update booking status
      const result = await db.query(
        `UPDATE bookings 
         SET payment_status = $1, 
             payment_id = $2, 
             updated_at = NOW() 
         WHERE id = $3
         RETURNING *`,
        ['paid', id, metadata.bookingId]
      );
      
      const booking = result.rows[0];
      
      if (booking) {
        console.log(`✅ Booking ${metadata.bookingId} marked as paid`);
        
        // Send payment confirmation emails
        const paymentDetails = {
          amount: booking.total_price,
          method: 'Card',
          transactionId: id
        };
        
        sendAllBookingEmails(booking, paymentDetails).catch(err => {
          console.error('Background payment email sending failed:', err);
        });
      }
      
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

// Update booking status manually - Updated to send emails
router.post('/update-booking-status', async (req, res) => {
  const { bookingId, paymentStatus, paymentId } = req.body;
  
  console.log("Updating booking:", { bookingId, paymentStatus, paymentId });
  
  if (!bookingId) {
    return res.status(400).json({ error: 'Booking ID is required' });
  }
  
  try {
    const result = await db.query(
      `UPDATE bookings 
       SET payment_status = $1, 
           payment_id = $2, 
           updated_at = NOW() 
       WHERE id = $3
       RETURNING *`,
      [paymentStatus, paymentId || null, bookingId]
    );
    
    const booking = result.rows[0];
    
    if (booking && paymentStatus === 'paid') {
      console.log(`✅ Booking ${bookingId} updated to paid`);
      
      // Send payment confirmation emails
      const paymentDetails = {
        amount: booking.total_price,
        method: 'Manual',
        transactionId: paymentId || 'N/A'
      };
      
      sendAllBookingEmails(booking, paymentDetails).catch(err => {
        console.error('Background payment email sending failed:', err);
      });
    }
    
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