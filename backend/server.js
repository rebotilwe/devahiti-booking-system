import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import availabilityRoutes from './routes/availability.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED CORS CONFIGURATION - Allow Netlify frontend
const allowedOrigins = [
  'https://devahitibookingsystem.netlify.app',
  'https://devahiti-wellness.netlify.app',
  'http://localhost:5173',  // For local development
  'http://localhost:3000',   // For local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// For development - allow all origins (use only if above doesn't work)
// app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// Routes
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    timestamp: new Date().toISOString(),
    cors_origins: allowedOrigins
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Devahiti Yoga API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
});