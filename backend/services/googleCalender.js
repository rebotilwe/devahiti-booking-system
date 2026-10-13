import axios from "axios";
import ical from "node-ical";

// Reads Cheryl's private "Devahiti Availability" Google Calendar through its
// secret iCal address (env var GOOGLE_CALENDAR_ICAL_URL — never put that URL
// in code or in git: anyone holding it can read the calendar).
//
// Rules (also documented in the admin guide):
//  - Every event in that calendar blocks bookings for the time it covers.
//  - All-day events block the whole day(s).
//  - Timed events block only the times they cover.
//  - Put "group classes open" anywhere in the event title or description to
//    block everything EXCEPT group classes.
//  - Cancelled events are ignored. Recurring events and exceptions work.
//
// If Google can't be reached we keep using the last good copy for up to 6
// hours; after that (or if it never loaded) bookings carry on as normal and
// the problem is logged, so a Google outage can't take the booking page down.

const SA_OFFSET_MS = 2 * 60 * 60 * 1000; // South Africa: UTC+2, no daylight saving
const DAY_MS = 24 * 60 * 60 * 1000;
const FRESH_MS = Number(process.env.GOOGLE_CALENDAR_CACHE_SECONDS || 120) * 1000;
const STALE_OK_MS = 6 * 60 * 60 * 1000;
const GROUPS_OPEN_RE = /group(?:s|\s*classes?)?\s*(?:stay\s*|remain\s*)?(?:open|on|ok)\b/i;

let calendar = { events: [], fetchedAt: 0, ok: false, lastError: null };
let inflight = null;

export const isCalendarConfigured = () => Boolean(process.env.GOOGLE_CALENDAR_ICAL_URL);

// Parse iCal text into the in-memory calendar. Exported so it can be tested
// without any network access.
export function ingestCalendarText(text) {
  const parsed = ical.sync.parseICS(text);
  const events = Object.values(parsed).filter(
    (e) => e && e.type === "VEVENT" && String(e.status || "").toUpperCase() !== "CANCELLED"
  );
  calendar = { events, fetchedAt: Date.now(), ok: true, lastError: null };
}

async function refreshCalendar() {
  const url = process.env.GOOGLE_CALENDAR_ICAL_URL;
  if (!url) return;
  if (calendar.fetchedAt && Date.now() - calendar.fetchedAt < FRESH_MS) return;
  if (inflight) return inflight;

  inflight = axios
    .get(url, { timeout: 10000, responseType: "text", maxContentLength: 10 * 1024 * 1024 })
    .then((res) => ingestCalendarText(res.data))
    .catch((err) => {
      // Log the message only — never the request/URL, which contains the secret.
      const reason = err?.response?.status ? `HTTP ${err.response.status}` : err?.message || "unknown error";
      console.error("Google Calendar refresh failed:", reason);
      calendar.lastError = reason;
      calendar.ok = false;
      if (calendar.fetchedAt && Date.now() - calendar.fetchedAt > STALE_OK_MS) {
        calendar.events = [];
      }
      // Retry no sooner than the cache window, so a failing feed isn't hammered.
      if (!calendar.fetchedAt) calendar.fetchedAt = Date.now() - FRESH_MS + 30 * 1000;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

const text = (v) => String((v && typeof v === "object" && "val" in v ? v.val : v) ?? "");

function toBlock(inst) {
  const start = inst.start;
  const end = inst.end;
  if (!(start instanceof Date) || Number.isNaN(start.getTime())) return null;

  let startMs;
  let endMs;
  if (inst.isFullDay || start.dateOnly) {
    // All-day: DATE values have no timezone; they mean those calendar days in SA.
    const y = start.getFullYear();
    const m = start.getMonth();
    const d = start.getDate();
    let span = 1;
    if (end instanceof Date && !Number.isNaN(end.getTime())) {
      const endDay = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
      span = Math.max(1, Math.round((endDay - Date.UTC(y, m, d)) / DAY_MS));
    }
    startMs = Date.UTC(y, m, d) - SA_OFFSET_MS;
    endMs = startMs + span * DAY_MS;
  } else {
    startMs = start.getTime();
    endMs = end instanceof Date ? end.getTime() : NaN;
    if (!(endMs > startMs)) return null;
  }

  const label = `${text(inst.summary)} ${text(inst.description)}`;
  return { startMs, endMs, groupsOpen: GROUPS_OPEN_RE.test(label) };
}

function blocksBetween(fromMs, toMs) {
  const out = [];
  for (const ev of calendar.events) {
    let instances = [];
    try {
      instances = ical.expandRecurringEvent(ev, {
        from: new Date(fromMs),
        to: new Date(toMs),
        expandOngoing: true,
      });
    } catch (err) {
      console.error("Skipping unreadable calendar event:", err?.message);
      continue;
    }
    for (const inst of instances) {
      const block = toBlock(inst);
      if (block && block.startMs < toMs && block.endMs > fromMs) out.push(block);
    }
  }
  return out;
}

// All calendar blocks touching one South African calendar date (YYYY-MM-DD).
export async function getCalendarBlocksForDate(dateStr) {
  if (!isCalendarConfigured()) return [];
  await refreshCalendar();
  const dayStart = Date.parse(`${dateStr}T00:00:00+02:00`);
  if (Number.isNaN(dayStart)) return [];
  return blocksBetween(dayStart, dayStart + DAY_MS);
}

// Milliseconds for a South African date + "HH:MM" time.
export const saTimeMs = (dateStr, hhmm) => Date.parse(`${dateStr}T${hhmm}:00+02:00`);

// For GET /api/availability/calendar-status — shows whether the link works
// without exposing event titles (the calendar is private).
export async function getCalendarStatus() {
  if (!isCalendarConfigured()) {
    return { configured: false, message: "GOOGLE_CALENDAR_ICAL_URL is not set" };
  }
  await refreshCalendar();
  const now = Date.now();
  const upcoming = blocksBetween(now, now + 60 * DAY_MS)
    .sort((a, b) => a.startMs - b.startMs)
    .slice(0, 15)
    .map((b) => ({
      from: new Date(b.startMs + SA_OFFSET_MS).toISOString().replace("Z", "").slice(0, 16) + " SAST",
      to: new Date(b.endMs + SA_OFFSET_MS).toISOString().replace("Z", "").slice(0, 16) + " SAST",
      groupClassesOpen: b.groupsOpen,
    }));
  return {
    configured: true,
    ok: calendar.ok,
    lastError: calendar.lastError,
    lastFetched: calendar.fetchedAt ? new Date(calendar.fetchedAt).toISOString() : null,
    eventsInCalendar: calendar.events.length,
    upcomingBlocks: upcoming,
  };
}
