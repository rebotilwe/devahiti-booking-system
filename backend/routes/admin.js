import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ========== BLOCKED DATES ==========
// Get all blocked dates
router.get('/blocked-dates', (req, res) => {
  db.query("SELECT * FROM blocked_dates ORDER BY blocked_date ASC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a blocked date
router.post('/blocked-dates', (req, res) => {
  const { blocked_date, reason } = req.body;
  db.query(
    "INSERT INTO blocked_dates (blocked_date, reason) VALUES (?, ?)",
    [blocked_date, reason || 'Holiday'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, blocked_date, reason });
    }
  );
});

// Remove a blocked date
router.delete('/blocked-dates/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM blocked_dates WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Blocked date removed' });
  });
});

// ========== WEEKLY SCHEDULE ==========
// Get weekly schedule
router.get('/schedule', (req, res) => {
  db.query(
    "SELECT * FROM weekly_schedule ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), time_slot",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Add time slot
router.post('/schedule', (req, res) => {
  const { day_of_week, time_slot } = req.body;
  db.query(
    "INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES (?, ?)",
    [day_of_week, time_slot],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, day_of_week, time_slot });
    }
  );
});

// Delete time slot
router.delete('/schedule/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM weekly_schedule WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Time slot removed' });
  });
});

// ========== CUSTOMER MANAGEMENT ==========
// Get all customers (unique by email)
router.get('/customers', (req, res) => {
  db.query(
    "SELECT DISTINCT customer_name, customer_email, customer_phone, customer_address, MIN(created_at) as first_booking, COUNT(*) as total_bookings FROM bookings GROUP BY customer_email ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Get customer booking history
router.get('/customers/:email/bookings', (req, res) => {
  const { email } = req.params;
  db.query(
    "SELECT * FROM bookings WHERE customer_email = ? ORDER BY created_at DESC",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// ========== REVENUE & ANALYTICS ==========
// Get revenue stats
router.get('/analytics/revenue', (req, res) => {
  db.query(
    "SELECT DATE(booking_date) as date, SUM(total_price) as daily_revenue, COUNT(*) as bookings_count FROM bookings WHERE payment_status = 'paid' GROUP BY DATE(booking_date) ORDER BY date DESC LIMIT 30",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      
      // Get totals
      db.query(
        "SELECT COUNT(*) as total_bookings, SUM(total_price) as total_revenue, COUNT(DISTINCT customer_email) as total_customers FROM bookings WHERE payment_status = 'paid'",
        (err2, totals) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json({ daily: results, totals: totals[0] });
        }
      );
    }
  );
});

// Get booking status counts
router.get('/analytics/status', (req, res) => {
  db.query(
    "SELECT payment_status, COUNT(*) as count FROM bookings GROUP BY payment_status",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

export default router;