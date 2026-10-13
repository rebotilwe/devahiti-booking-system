import express from 'express';
import { getAvailableSlots, getWeeklySchedule } from '../controllers/availabilityController.js';
import { getCalendarStatus } from '../services/googleCalendar.js';

const router = express.Router();

router.get('/slots', getAvailableSlots);
router.get('/schedule', getWeeklySchedule);

// Quick check that the Google Calendar link works (no event titles shown).
router.get('/calendar-status', async (req, res) => {
  try {
    res.json(await getCalendarStatus());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
