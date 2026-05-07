import express from 'express';
import { createBooking, getBookings, getBookingById, updatePaymentStatus } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);
router.put('/:id/payment', updatePaymentStatus);

export default router;