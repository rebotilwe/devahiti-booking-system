import db from "../config/db.js";
import { getCalendarBlocksForDate, saTimeMs } from "../services/googleCalendar.js";

// How long a private/individual session is assumed to last when checking it
// against Google Calendar events.
const PRIVATE_SESSION_MINUTES = 60;

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
    
    // A blocked date normally closes everything. A block flagged
    // keep_group_classes only closes private/individual offerings (private
    // sessions, Sound Journey, Corporate, etc.) and leaves group classes open.
    const blockedRows = blockedResult.rows;
    const fullyBlocked = blockedRows.some(row => !row.keep_group_classes);
    const blockedForThisService = isGroupClassBooking ? fullyBlocked : blockedRows.length > 0;
    if (blockedForThisService) {
      return res.json({ slots: [], message: "This date is fully booked", date });
    }

    // Slots already taken on this date. Paid bookings always hold a slot.
    // Pending ones only hold it for 30 minutes (long enough to finish
    // checkout) — otherwise a single abandoned checkout would lock that
    // time for good, since nothing ever clears a 'pending' booking.
    const bookedResult = await db.query(
      `SELECT booking_time FROM bookings
       WHERE booking_date = $1
         AND (
           payment_status = 'paid'
           OR (payment_status = 'pending' AND created_at > NOW() - INTERVAL '30 minutes')
         )`,
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

    // Events in Cheryl's "Devahiti Availability" Google Calendar. Events marked
    // "group classes open" block everything except group classes.
    const calendarBlocks = await getCalendarBlocksForDate(date);
    const blockedByCalendar = (startMs, endMs) =>
      calendarBlocks.some(
        (b) =>
          b.startMs < endMs &&
          b.endMs > startMs &&
          (!isGroupClassBooking || !b.groupsOpen)
      );

    let availableSlots;

    if (isGroupClassBooking) {
      // Booking a group class: the only "slots" that make sense are the
      // class's own start times on this day — not a generic range of
      // half-hour options. If there's no class on this day, there's
      // nothing to book.
      // A group class is shared: other people booking it must NOT remove
      // it for everyone else. (Previously any booking at that time hid the
      // class from the next customer, so it vanished after the first
      // sign-up.) Only deliberate blocks apply here.
      availableSlots = groupClassWindows
        .filter(({ start, end }) =>
          !blockedSlotTimes.includes(start) &&
          !blockedByCalendar(saTimeMs(date, start), saTimeMs(date, end))
        )
        .map(({ start }) => start);
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
        !blockedByCalendar(
          saTimeMs(date, slot),
          saTimeMs(date, slot) + PRIVATE_SESSION_MINUTES * 60 * 1000
        ) &&
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