import db from "../config/db.js";

// GET AVAILABLE TIME SLOTS FOR A SPECIFIC DATE
export const getAvailableSlots = (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });

  // First, check if date is blocked
  const checkBlockedSql = "SELECT * FROM blocked_dates WHERE blocked_date = ?";
  db.query(checkBlockedSql, [date], (err, blockedResults) => {
    if (err) {
      console.error("Error checking blocked dates:", err);
      return res.status(500).json({ message: "Error checking blocked dates", error: err.message });
    }
    
    if (blockedResults.length > 0) {
      return res.json({ slots: [], message: "This date is fully booked", date });
    }

    // Get time slots for this day of week
    const getSlotsSql = "SELECT time_slot FROM weekly_schedule WHERE day_of_week = ? ORDER BY time_slot";
    db.query(getSlotsSql, [dayOfWeek], (err, slotResults) => {
      if (err) {
        console.error("Error fetching schedule:", err);
        return res.status(500).json({ message: "Error fetching schedule", error: err.message });
      }

      // Format time slots from MySQL TIME to HH:MM
      const allSlots = slotResults.map(row => {
        const timeStr = row.time_slot;
        // Handle string format "07:00:00" or Date object
        if (typeof timeStr === 'string') {
          return timeStr.substring(0, 5); // Returns "HH:MM"
        } else if (timeStr instanceof Date) {
          return `${timeStr.getHours().toString().padStart(2, '0')}:${timeStr.getMinutes().toString().padStart(2, '0')}`;
        }
        return timeStr;
      });

      // Get already booked slots for this date
      const getBookedSql = "SELECT booking_time FROM bookings WHERE booking_date = ? AND payment_status IN ('paid', 'pending')";
      db.query(getBookedSql, [date], (err, bookedResults) => {
        if (err) {
          console.error("Error checking bookings:", err);
          return res.status(500).json({ message: "Error checking bookings", error: err.message });
        }

        const bookedSlots = bookedResults.map(row => {
          const timeSlot = row.booking_time;
          if (typeof timeSlot === 'string') {
            return timeSlot.substring(0, 5);
          } else if (timeSlot instanceof Date) {
            return `${timeSlot.getHours().toString().padStart(2, '0')}:${timeSlot.getMinutes().toString().padStart(2, '0')}`;
          }
          return timeSlot;
        });
        
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

        res.json({ slots: availableSlots, date });
      });
    });
  });
};

// GET WEEKLY SCHEDULE
export const getWeeklySchedule = (req, res) => {
  const sql = "SELECT day_of_week, time_slot FROM weekly_schedule ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), time_slot";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching schedule:", err);
      return res.status(500).json({ message: "Error fetching schedule", error: err.message });
    }
    
    // Group by day
    const schedule = {};
    results.forEach(row => {
      if (!schedule[row.day_of_week]) {
        schedule[row.day_of_week] = [];
      }
      let timeStr;
      if (typeof row.time_slot === 'string') {
        timeStr = row.time_slot.substring(0, 5);
      } else if (row.time_slot instanceof Date) {
        timeStr = `${row.time_slot.getHours().toString().padStart(2, '0')}:${row.time_slot.getMinutes().toString().padStart(2, '0')}`;
      } else {
        timeStr = row.time_slot;
      }
      schedule[row.day_of_week].push(timeStr);
    });
    
    res.json(schedule);
  });
};