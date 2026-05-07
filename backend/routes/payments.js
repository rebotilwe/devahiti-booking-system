import express from 'express';
import axios from 'axios';

const router = express.Router();

// ✅ CORRECT Yoco API endpoint for checkouts
const YOCO_API_URL = 'https://payments.yoco.com/api/checkouts';

// Your Yoco Test Keys
const YOCO_SECRET_KEY = 'sk_test_8389d986bBKkkx7301b4a2eb070a';

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
    
    const payload = {
      amount: amountInCents,
      currency: 'ZAR',
      successUrl: `http://localhost:5173/payment-success?bookingId=${bookingId}`,
      cancelUrl: `http://localhost:5173/payment-cancelled?bookingId=${bookingId}`,
      metadata: {
        bookingId: bookingId,
        customerName: customerName,
        customerEmail: customerEmail,
      },
    };
    
    console.log("Sending to Yoco:", JSON.stringify(payload, null, 2));
    
    // ✅ CORRECT AUTHENTICATION: Use Bearer token
    const response = await axios.post(
      YOCO_API_URL,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${YOCO_SECRET_KEY}`,  // ✅ Bearer token authentication
        },
      }
    );

    console.log("Yoco success! Response:", response.data);
    res.json({ 
      redirectUrl: response.data.redirectUrl,
      checkoutId: response.data.id 
    });
    
  } catch (error) {
    console.error("=== Yoco ERROR ===");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.response?.data || error.message
    });
  }
});

// Verify payment status
router.get('/verify-payment/:bookingId', (req, res) => {
  const { bookingId } = req.params;
  console.log("Verifying payment for booking:", bookingId);
  res.json({ bookingId, payment_status: 'pending', amount: 0 });
});

export default router;