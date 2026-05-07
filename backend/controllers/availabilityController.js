import db from "../config/db.js";

// GET AVAILABLE TIME SLOTS FOR A SPECIFIC DATE
export const getAvailableSlots = async (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });

  try {
    // Check if date is blocked
    const blockedResult = await db.query(
      "SELECT * FROM blocked_dates WHERE blocked_date = $1",
      [date]
    );
    
    if (blockedResult.rows.length > 0) {
      return res.json({ slots: [], message: "This date is fully booked", date });
    }

    // Get time slots for this day of week
    const slotsResult = await db.query(
      "SELECT time_slot FROM weekly_schedule WHERE day_of_week = $1 ORDER BY time_slot",
      [dayOfWeek]
    );

    const allSlots = slotsResult.rows.map(row => {
      const time = row.time_slot;
      return time.substring(0, 5);
    });

    // Get already booked slots for this date
    const bookedResult = await db.query(
      "SELECT booking_time FROM bookings WHERE booking_date = $1 AND payment_status IN ('paid', 'pending')",
      [date]
    );

    const bookedSlots = bookedResult.rows.map(row => {
      const time = row.booking_time;
      return time.substring(0, 5);
    });
    
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({ slots: availableSlots, date });
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Error fetching availability", error: err.message });
  }
};

// GET WEEKLY SCHEDULE
export const getWeeklySchedule = async (req, res) => {
  // PostgreSQL order by using CASE statement (replaces MySQL FIELD)
  const sql = `
    SELECT day_of_week, time_slot 
    FROM weekly_schedule 
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
  `;
  
  try {
    const result = await db.query(sql);
    
    // Group by day
    const schedule = {};
    result.rows.forEach(row => {
      if (!schedule[row.day_of_week]) {
        schedule[row.day_of_week] = [];
      }
      const timeStr = row.time_slot.substring(0, 5);
      schedule[row.day_of_week].push(timeStr);
    });
    
    res.json(schedule);
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(500).json({ message: "Error fetching schedule", error: err.message });
  }
};