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

    // ✅ Recurring group classes - lock out private slots
    const groupClassResult = await db.query(
      "SELECT start_time, end_time, class_name FROM group_classes WHERE day_of_week = $1",
      [dayOfWeek]
    );

    // ✅ Log for debugging
    console.log(`📅 Group classes for ${dayOfWeek}:`, groupClassResult.rows);

    const groupClassWindows = groupClassResult.rows.map(row => ({
      start: row.start_time.substring(0, 5),
      end: row.end_time.substring(0, 5),
      class_name: row.class_name,
    }));

    // ✅ Improved time comparison function
    const isWithinGroupClass = (slot) => {
      return groupClassWindows.some(({ start, end, class_name }) => {
        // Compare as strings (works for "HH:MM" format)
        const isBlocked = slot >= start && slot < end;
        if (isBlocked) {
          console.log(`🔒 Slot ${slot} blocked by group class "${class_name}" (${start}-${end})`);
        }
        return isBlocked;
      });
    };

    // ✅ Filter available slots
    const availableSlots = allSlots.filter(
      slot => !bookedSlots.includes(slot) && !isWithinGroupClass(slot)
    );

    // ✅ Log the results
    console.log(`✅ Available slots for ${date}:`, availableSlots);
    console.log(`❌ Blocked by group classes:`, allSlots.filter(s => isWithinGroupClass(s)));

    res.json({ 
      slots: availableSlots, 
      date,
      debug: {
        dayOfWeek,
        allSlots,
        bookedSlots,
        groupClassWindows,
        availableSlots
      }
    });
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Error fetching availability", error: err.message });
  }
};

// GET WEEKLY SCHEDULE
export const getWeeklySchedule = async (req, res) => {
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

// ✅ NEW: Get all group classes for admin
export const getGroupClasses = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM group_classes ORDER BY day_of_week, start_time"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching group classes:", err);
    res.status(500).json({ message: "Error fetching group classes", error: err.message });
  }
};

// ✅ NEW: Add group class
export const addGroupClass = async (req, res) => {
  const { day_of_week, start_time, end_time, class_name } = req.body;
  
  try {
    const result = await db.query(
      "INSERT INTO group_classes (day_of_week, start_time, end_time, class_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [day_of_week, start_time, end_time, class_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding group class:", err);
    res.status(500).json({ message: "Error adding group class", error: err.message });
  }
};

// ✅ NEW: Delete group class
export const deleteGroupClass = async (req, res) => {
  const { id } = req.params;
  
  try {
    await db.query("DELETE FROM group_classes WHERE id = $1", [id]);
    res.json({ message: "Group class deleted successfully" });
  } catch (err) {
    console.error("Error deleting group class:", err);
    res.status(500).json({ message: "Error deleting group class", error: err.message });
  }
};