import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookingRoutes from "./routes/bookings.js";
import availabilityRoutes from "./routes/availability.js";
import paymentRoutes from './routes/payments.js';
import updatePaymentRoutes from './routes/update-payment.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/payments', updatePaymentRoutes);


app.get("/", (req, res) => {
  res.send("Devahiti Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});