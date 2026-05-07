import express from 'express';
import { getAvailableSlots, getWeeklySchedule } from '../controllers/availabilityController.js';

const router = express.Router();

router.get('/slots', getAvailableSlots);
router.get('/schedule', getWeeklySchedule);

export default router;