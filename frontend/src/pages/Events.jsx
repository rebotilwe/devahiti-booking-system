import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Sun,
  Award,
  Waves
} from "lucide-react";

import heroEventsImg from "../assets/images/img10.jpg";

const upcomingEvents = [
  {
    id: "teacher-training-200",
    title: "200 Hour Teacher Training",
    date: "May 16-17, 2026",
    location: "📍 Ballito, South Africa",
    description:
      "Foundational training rooted in science and evidence-based movement practices.",
    price: "From R28 000",
    icon: Award,
    serviceKey: "teacher-training", // ✅ Matches services.js ID
    type: "book"
  },
  {
    id: "teacher-training-300",
    title: "300 Hour Advanced Teacher Training",
    date: "Starts June 13-14, 2026",
    location: "📍 Ballito, South Africa",
    description:
      "Advanced training for certified 200-hour yoga teachers focused on refinement and mastery.",
    price: "From R32 000",
    icon: Award,
    serviceKey: "teacher-training", // ✅ Matches services.js ID
    type: "book"
  },
  {
    id: "sound-immersion",
    title: "Sound Journey Immersion",
    date: "Monthly",
    location: "📍 Ballito, South Africa",
    description:
      "Immersive sound healing experience using Tibetan singing bowls and vibrational therapy.",
    price: "R800 per session",
    icon: Sun,
    serviceKey: "sound-journey", // ✅ Matches services.js ID
    type: "book"
  }
];

// Weekly schedule
const classSchedule = [
  { day: "Monday", time: "7:00 AM", class: "Gentle Movement", level: "All Levels", duration: "45 min" },
  { day: "Monday", time: "8:00 AM", class: "Intermediate Hatha", level: "Intermediate", duration: "75 min" },
  { day: "Monday", time: "4:00 PM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Friday", time: "8:15 AM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Saturday", time: "7:30 AM", class: "Yin Yoga", level: "All Levels", duration: "90 min" }
];

export default function Events() {
  const navigate = useNavigate();

  // ✅ Unified booking flow using URL params (cleaner than state)
  const handleEventBooking = (event) => {
    navigate(`/schedule?service=${event.serviceKey}`);
  };

  const handleDropInBooking = (scheduleItem) => {
    navigate("/schedule?service=drop-in-class");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroEventsImg} className="w-full h-full object-cover" alt="Events" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-3 w-3 text-white/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60">
              Programs & Training
            </span>
            <Waves className="h-3 w-3 text-white/60" />
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-light text-white">
            Events & Training
          </h1>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl">Upcoming Events</h2>
            <p className="text-muted-foreground text-sm mt-2">
              Book your spot directly — limited availability
            </p>
          </div>

          <div className="space-y-5">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border rounded-sm p-5 flex flex-col sm:flex-row justify-between gap-4 hover:border-ocean/40 transition"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <event.icon className="h-4 w-4 text-ocean" />
                    <h3 className="font-heading text-lg">{event.title}</h3>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {event.date} • {event.location}
                  </p>

                  <p className="text-sm text-muted-foreground mt-2">
                    {event.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-ocean font-medium whitespace-nowrap">
                    {event.price}
                  </span>

                  <button
                    onClick={() => handleEventBooking(event)}
                    className="px-5 py-2 bg-ocean text-white text-xs uppercase tracking-widest rounded-sm hover:bg-ocean-dark transition"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY SCHEDULE */}
      <section className="py-12 px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl md:text-3xl">
              Weekly Classes
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Drop-in rate: R130 per class
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Ballito sessions: Tuesday & Thursday at 8:00 AM
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-ocean text-white">
                <tr>
                  <th className="p-2 text-left">Day</th>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">Class</th>
                  <th className="p-2 text-left">Duration</th>
                  <th className="p-2 text-left">Level</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {classSchedule.map((item, i) => (
                  <tr key={i} className="border-b border-ocean/10">
                    <td className="p-2">{item.day}</td>
                    <td className="p-2">{item.time}</td>
                    <td className="p-2">{item.class}</td>
                    <td className="p-2">{item.duration}</td>
                    <td className="p-2 text-ocean">{item.level}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={() => handleDropInBooking(item)}
                        className="text-xs text-ocean uppercase hover:underline"
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-ocean text-center text-white">
        <h2 className="font-heading text-2xl md:text-3xl">
          Teacher Training
        </h2>
        <p className="text-white/80 mt-2">
          200hr & 300hr Certified Programs in Ballito
        </p>

        <button
          onClick={() => navigate("/schedule?service=teacher-training")}
          className="mt-5 px-6 py-2 bg-white text-ocean text-xs uppercase rounded-sm hover:bg-white/90 transition"
        >
          Book Training
        </button>
      </section>

      {/* QUOTE */}
      <section className="py-10 text-center bg-ocean-dark text-white">
        <p className="font-heading italic">
          "If you can breathe, you can do yoga"
        </p>
      </section>
    </div>
  );
}