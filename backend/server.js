import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import availabilityRoutes from './routes/availability.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payments.js';
import blogRoutes from './routes/blog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ INCREASE BODY SIZE LIMIT - IMPORTANT FOR IMAGE UPLOADS
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ ONLY THE CORRECT FRONTEND URL
const allowedOrigins = [
  'https://devahitibookingsystem.netlify.app',
  'http://localhost:5173',  // For local development only
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log(`CORS blocked: ${origin}`);
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/blog', blogRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    frontend_url: process.env.FRONTEND_URL
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Devahiti Yoga API is running' });
});

// ✅ TEST EMAIL ENDPOINT
app.get('/api/test-email', async (req, res) => {
  try {
    // Import the email service
    const { sendAllBookingEmails } = await import('./services/emailService.js');
    
    // Create a test booking
    const testBooking = {
      id: 9999,
      customer_name: 'Test User',
      customer_email: 'rebotilwemokiba@gmail.com', // Change to your test email
      customer_phone: '0821234567',
      service_type: 'Yoga Class',
      booking_date: new Date().toISOString(),
      booking_time: '10:00:00',
      participants: 2,
      total_price: 650,
      customer_address: '123 Test Street',
      notes: 'This is a test booking for email verification'
    };

    console.log('Sending test emails...');
    const result = await sendAllBookingEmails(testBooking);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Test emails sent successfully! Check your inbox.',
        details: result
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`);
  console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
  console.log(`✅ Email notifications are enabled`);
});