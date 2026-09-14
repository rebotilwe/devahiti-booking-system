import db from "../config/db.js";

// Days where private/individual sessions shouldn't open until this time,
// because a group class runs earlier that morning — per the client's
// explicit instruction, private slots start 9:30 AM on both Friday and
// Saturday regardless of the exact class end time (Friday's class ends
// 9:15, Saturday's ends 9:00 — both round up to the same 9:30 start so
// there's always a clear gap, not just the bare minimum).
const PRIVATE_SESSION_EARLIEST_START = {
  Friday: "09:30",
  Saturday: "09:30",
};

// GET AVAILABLE TIME SLOTS FOR A SPECIFIC DATE
export const getAvailableSlots = async (req, res) => {
  const { date, service } = req.query;
  
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  // Parse the YYYY-MM-DD string as UTC and extract the weekday in UTC,
  // so this never depends on the server's local timezone (was previously
  // rolling back to the wrong day for UTC-behind timezones).
  const [year, month, day] = date.split('-').map(Number);
  const selectedDate = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = selectedDate.toLocaleString('en-US', {
    weekday: 'long',
    timeZone: 'UTC'
  });

  const isGroupClassBooking = service === 'group-class';

  try {
    // Check if date is blocked
    const blockedResult = await db.query(
      "SELECT * FROM blocked_dates WHERE blocked_date = $1",
      [date]
    );
    
    if (blockedResult.rows.length > 0) {
      return res.json({ slots: [], message: "This date is fully booked", date });
    }

    // Get already booked slots for this date (needed either way)
    const bookedResult = await db.query(
      "SELECT booking_time FROM bookings WHERE booking_date = $1 AND payment_status IN ('paid', 'pending')",
      [date]
    );
    const bookedSlots = bookedResult.rows.map(row => row.booking_time.substring(0, 5));

    // One-off blocked times for this specific date
    const blockedSlotsResult = await db.query(
      "SELECT blocked_time FROM blocked_slots WHERE blocked_date = $1",
      [date]
    );
    const blockedSlotTimes = blockedSlotsResult.rows.map(row => row.blocked_time.substring(0, 5));

    // Recurring group classes for this day of week
    const groupClassResult = await db.query(
      "SELECT start_time, end_time FROM group_classes WHERE day_of_week = $1 ORDER BY start_time",
      [dayOfWeek]
    );
    const groupClassWindows = groupClassResult.rows.map(row => ({
      start: row.start_time.substring(0, 5),
      end: row.end_time.substring(0, 5),
    }));

    let availableSlots;

    if (isGroupClassBooking) {
      // Booking a group class: the only "slots" that make sense are the
      // class's own start times on this day — not a generic range of
      // half-hour options. If there's no class on this day, there's
      // nothing to book.
      availableSlots = groupClassWindows
        .map(({ start }) => start)
        .filter(start => !bookedSlots.includes(start) && !blockedSlotTimes.includes(start));
    } else {
      // Booking a private/individual session: use the generic weekly
      // schedule, minus anything already booked, minus any group class
      // window that day, minus one-off blocks, minus (on days with a
      // morning class) anything before that day's earliest private start.
      const slotsResult = await db.query(
        "SELECT time_slot FROM weekly_schedule WHERE day_of_week = $1 ORDER BY time_slot",
        [dayOfWeek]
      );
      const allSlots = slotsResult.rows.map(row => row.time_slot.substring(0, 5));

      const isWithinGroupClass = (slot) => {
        return groupClassWindows.some(({ start, end }) => slot >= start && slot < end);
      };

      const earliestStart = PRIVATE_SESSION_EARLIEST_START[dayOfWeek];

      availableSlots = allSlots.filter(slot =>
        !bookedSlots.includes(slot) &&
        !isWithinGroupClass(slot) &&
        !blockedSlotTimes.includes(slot) &&
        (!earliestStart || slot >= earliestStart)
      );
    }

    // If the requested date is today, hide any slot that's already passed —
    // otherwise someone checking at 11am still sees 7am/8am as "available"
    // for the rest of the day. Evaluated in South Africa time specifically
    // (not server local time, which could be UTC on Render), same reasoning
    // as the earlier date/timezone fixes elsewhere in this file.
    const now = new Date();
    const todayInSA = now.toLocaleDateString('en-CA', { timeZone: 'Africa/Johannesburg' });
    if (date === todayInSA) {
      const currentTimeInSA = now.toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Johannesburg',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      availableSlots = availableSlots.filter(slot => slot > currentTimeInSA);
    }

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