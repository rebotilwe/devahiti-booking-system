import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ========== BLOCKED DATES ==========
// Get all blocked dates
router.get('/blocked-dates', async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blocked_dates ORDER BY blocked_date ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching blocked dates:", err);
    res.status(500).json({ error: err.message });
  }
});

// Add a blocked date
router.post('/blocked-dates', async (req, res) => {
  const { blocked_date, reason } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO blocked_dates (blocked_date, reason) VALUES ($1, $2) RETURNING *",
      [blocked_date, reason || 'Holiday']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding blocked date:", err);
    res.status(500).json({ error: err.message });
  }
});

// Remove a blocked date
router.delete('/blocked-dates/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM blocked_dates WHERE id = $1", [id]);
    res.json({ message: 'Blocked date removed' });
  } catch (err) {
    console.error("Error removing blocked date:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========== WEEKLY SCHEDULE ==========
// Get weekly schedule
router.get('/schedule', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM weekly_schedule 
      ORDER BY 
        CASE day_of_week
          WHEN 'Monday' THEN 1
          WHEN 'Tuesday' THEN 2
          WHEN 'Wednesday' THEN 3
          WHEN 'Thursday' THEN 4
          WHEN 'Friday' THEN 5
          WHEN 'Saturday' THEN 6
          WHEN 'Sunday' THEN 7
        END,
        time_slot
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(500).json({ error: err.message });
  }
});

// Add time slot
router.post('/schedule', async (req, res) => {
  const { day_of_week, time_slot } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES ($1, $2) RETURNING *",
      [day_of_week, time_slot]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding time slot:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete time slot
router.delete('/schedule/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM weekly_schedule WHERE id = $1", [id]);
    res.json({ message: 'Time slot removed' });
  } catch (err) {
    console.error("Error removing time slot:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========== CUSTOMER MANAGEMENT ==========
// Get all customers (unique by email)
router.get('/customers', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT DISTINCT 
        customer_name, 
        customer_email, 
        customer_phone, 
        customer_address,
        MIN(created_at) as first_booking, 
        COUNT(*) as total_bookings 
      FROM bookings 
      GROUP BY customer_name, customer_email, customer_phone, customer_address 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get customer booking history
router.get('/customers/:email/bookings', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM bookings WHERE customer_email = $1 ORDER BY created_at DESC",
      [email]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching customer bookings:", err);
    res.status(500).json({ error: err.message });
  }
});

// ========== REVENUE & ANALYTICS ==========
// Get revenue stats
router.get('/analytics/revenue', async (req, res) => {
  try {
    const dailyResult = await db.query(`
      SELECT DATE(booking_date) as date, 
             SUM(total_price) as daily_revenue, 
             COUNT(*) as bookings_count 
      FROM bookings 
      WHERE payment_status = 'paid' 
      GROUP BY DATE(booking_date) 
      ORDER BY date DESC 
      LIMIT 30
    `);
    
    const totalsResult = await db.query(`
      SELECT COUNT(*) as total_bookings, 
             SUM(total_price) as total_revenue, 
             COUNT(DISTINCT customer_email) as total_customers 
      FROM bookings 
      WHERE payment_status = 'paid'
    `);
    
    res.json({ 
      daily: dailyResult.rows, 
      totals: totalsResult.rows[0] 
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get booking status counts
router.get('/analytics/status', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT payment_status, COUNT(*) as count FROM bookings GROUP BY payment_status"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching status counts:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;