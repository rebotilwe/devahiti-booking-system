import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Sun,
  Award,
  Clock,
  Users,
  Waves,
  Droplets
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";

// Import client image for hero background
import heroEventsImg from "../assets/images/img10.jpg";

// Cheryl's WhatsApp number
const WHATSAPP_NUMBER = "27840902083";

const upcomingEvents = [
  {
    title: "200 Hour Teacher Training",
    date: "May 16-17, 2026",
    location: "📍 Ballito, South Africa",
    description: "Foundational training rooted in science and evidence-based movement practices.",
    price: "Enquire for pricing",
    icon: Award,
    bookingType: "enquire"
  },
  {
    title: "300 Hour Advanced Teacher Training",
    date: "Starts June 13-14, 2026",
    location: "📍 Ballito, South Africa",
    description: "Advanced training for certified 200-hour yoga teachers.",
    price: "R2800 per weekend",
    icon: Award,
    bookingType: "enquire"
  },
  {
    title: "Sound Journey Immersion",
    date: "Monthly",
    location: "📍 Ballito, South Africa",
    description: "Immersive sound experience using Tibetan singing bowls.",
    price: "R800",
    icon: Sun,
    bookingType: "book"
  }
];

const classSchedule = [
  { day: "Monday", time: "7:00 AM", class: "Gentle Movement", level: "All Levels", duration: "45 min" },
  { day: "Monday", time: "8:00 AM", class: "Intermediate Hatha", level: "Intermediate", duration: "75 min" },
  { day: "Monday", time: "4:00 PM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Tuesday", time: "8:15 AM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Thursday", time: "7:00 AM", class: "Gentle Movement", level: "All Levels", duration: "45 min" },
  { day: "Thursday", time: "8:00 AM", class: "Intermediate Hatha", level: "Intermediate", duration: "75 min" },
  { day: "Thursday", time: "4:00 PM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Friday", time: "8:15 AM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Saturday", time: "7:30 AM", class: "Yin Yoga", level: "All Levels", duration: "90 min" }
];

export default function Events() {
  const navigate = useNavigate();

  const handleEventClick = (bookingType) => {
    if (bookingType === "enquire") {
      navigate("/contact");
    } else {
      navigate("/services");
    }
  };

  const handleDropInBooking = (scheduleItem) => {
    const message = `Hi Cheryl, I'd like to book a drop-in class for:\n\nDay: ${scheduleItem.day}\nTime: ${scheduleItem.time}\nClass: ${scheduleItem.class}\nRate: R130 drop-in`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroEventsImg} className="w-full h-full object-cover" alt="Yoga studio" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-ocean/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-3 w-3 text-white/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60">Programs & Training</span>
            <Waves className="h-3 w-3 text-white/60" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-white">Events & Training</h1>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading subtitle="Join Us" title="Upcoming Events" description="Workshops and training programs" />

          <div className="mt-8 space-y-4">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="border-b border-border pb-4 flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <event.icon className="h-4 w-4 text-ocean" />
                    <h3 className="text-lg font-heading">{event.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.date} • {event.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-ocean font-medium text-sm min-w-[80px] text-right">{event.price}</span>
                  <button onClick={() => handleEventClick(event.bookingType)} className="text-ocean text-xs uppercase flex items-center gap-1">
                    {event.bookingType === "enquire" ? "Enquire" : "Book"} <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKLY SCHEDULE */}
      <section className="py-12 px-4 sm:px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground">Weekly Classes</h2>
            <p className="text-sm text-muted-foreground mt-1">Drop-in available at R130 per session</p>
          </div>

          <div className="bg-ocean/10 text-center p-2 mb-4 text-sm rounded">
            💡 Drop-ins available during scheduled class times
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-ocean text-white">
                <tr><th className="p-2 text-left">Day</th><th className="p-2 text-left">Time</th><th className="p-2 text-left">Class</th><th className="p-2 text-left">Duration</th><th className="p-2 text-left">Level</th><th></th></tr>
              </thead>
              <tbody>
                {classSchedule.map((schedule, i) => (
                  <tr key={i} className="border-b border-ocean/10">
                    <td className="p-2">{schedule.day}</td>
                    <td className="p-2">{schedule.time}</td>
                    <td className="p-2">{schedule.class}</td>
                    <td className="p-2">{schedule.duration}</td>
                    <td className="p-2"><span className="px-2 py-0.5 bg-ocean/10 text-ocean text-xs rounded">{schedule.level}</span></td>
                    <td className="p-2"><button onClick={() => handleDropInBooking(schedule)} className="text-xs text-ocean">Book</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TEACHER TRAINING CTA */}
      <section className="py-16 px-4 sm:px-6 bg-ocean text-center text-white">
        <h2 className="font-heading text-2xl sm:text-3xl mb-2">Teacher Training</h2>
        <p className="text-white/80 mb-1">200hr: Starts May 16-17, 2026</p>
        <p className="text-white/80 mb-4">300hr: Starts June 13-14, 2026</p>
        <button onClick={() => navigate("/contact")} className="px-6 py-2 bg-white text-ocean text-xs uppercase rounded-sm">Enquire Now</button>
      </section>

      {/* QUOTE */}
      <section className="relative py-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-ocean-dark/90" />
        <div className="relative text-center text-white">
          <Waves className="h-5 w-5 mx-auto mb-2 text-white/40" />
          <p className="font-heading text-lg italic">"If you can breathe, you can do yoga"</p>
        </div>
      </section>
    </div>
  );
}