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

// ✅ CORS configuration - allow your frontend
app.use(cors({
  origin: ['https://devahiti-wellness.netlify.app', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Devahiti Yoga API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});