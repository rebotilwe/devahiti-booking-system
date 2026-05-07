import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Sun,
  Award,
  Clock,
  Users,
  Waves,
  Droplets,
  Sparkles,
  BookOpen,
  Heart,
  Brain,
  Activity,
  Leaf
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";

// Import client image for hero background
import heroEventsImg from "../assets/images/img10.jpg";  // Events page hero background

// Calendly URL (for non-drop-in bookings only)
const CALENDLY_URL = "https://calendly.com/cheryl-sayogasafaris";

// Cheryl's WhatsApp number
const WHATSAPP_NUMBER = "27840902083";

const upcomingEvents = [
  {
    title: "200 Hour Teacher Training",
    date: "May 2026",
    location: "📍 Devahiti Yoga Studio, Ballito",
    description:
      "Comprehensive foundational training rooted in science and evidence-based movement practices, combined with time-honoured yogic principles.",
    price: "Enquire for pricing",
    icon: Award,
    bookingType: "enquire"
  },
  {
    title: "300 Hour Advanced Teacher Training",
    date: "Starts June 13-14, 2026",
    location: "📍 Devahiti Yoga Studio, Ballito",
    description:
      "Advanced 300-Hour Yoga Teacher Training designed for certified 200-hour yoga teachers looking to expand their knowledge and elevate their practice.",
    price: "R2800 per weekend",
    icon: Award,
    bookingType: "enquire"
  },
  {
    title: "Sound Journey Immersion",
    date: "Monthly",
    location: "📍 Devahiti Yoga Studio, Ballito",
    description:
      "A deeply immersive sound experience using Tibetan singing bowls to reduce anxiety and promote profound rest.",
    price: "R800",
    icon: Sun,
    bookingType: "book"
  }
];

// 300 Hour Training Modules
const trainingModules = [
  { 
    title: "Anatomy of Energy", 
    date: "June 13th & 14th", 
    description: "The relationship between energy and health, quantum physics, koshas",
    icon: Sparkles
  },
  { 
    title: "Advanced Anatomy & Physiology", 
    date: "July 18th & 19th", 
    description: "Functional fitness, digestive health, intermittent fasting, ketosis & autophagy",
    icon: Activity
  },
  { 
    title: "Advanced Fascia Studies", 
    date: "August 1st & 2nd", 
    description: "The latest research and applications in yoga",
    icon: Brain
  },
  { 
    title: "Yoga & Somatic Psychology", 
    date: "September 5th & 6th", 
    description: "Intention setting, working within the framework of the Eight Limbs of Yoga, Samkhya",
    icon: Heart
  },
  { 
    title: "Advanced Pranayama & Activational Breathing", 
    date: "October 10th & 11th", 
    description: "Mudras, bandhas, kumbhaka, chakras, mantras & meditation",
    icon: Waves
  },
  { 
    title: "Advanced Philosophy", 
    date: "November 14th & 15th", 
    description: "Deep dive into yogic philosophy and texts",
    icon: BookOpen
  },
  { 
    title: "Advanced Ayurveda", 
    date: "December 5th & 6th, plus January 16th", 
    description: "The impact of doshas, gunas, five pranas, 14 major nadis, and the secrets of alchemy",
    icon: Leaf
  },
  { 
    title: "Specialized Training", 
    date: "February 19th & 20th", 
    description: "Yin, prenatal yoga, yoga for children and special needs groups, and the art of retreating",
    icon: Users
  },
  { 
    title: "Devahiti Hands-On Bodywork (Optional Extra)", 
    date: "March 12th & 13th, plus March 19th & 20th", 
    description: "Learn hands-on techniques to supplement your income. In-person only.",
    icon: Heart
  },
  { 
    title: "Trauma Sensitive Yoga", 
    date: "April 16th & 17th", 
    description: "Specialized training for working with trauma survivors",
    icon: Brain
  }
];

const classSchedule = [
  { day: "Monday", time: "7:00 AM", class: "Gentle Movement (Aging Strong)", level: "All Levels", duration: "45 min" },
  { day: "Monday", time: "8:00 AM", class: "Intermediate Hatha Yoga", level: "Intermediate", duration: "75 min" },
  { day: "Monday", time: "4:00 PM", class: "Gentle Hatha Yoga", level: "All Levels", duration: "60 min" },
  { day: "Tuesday", time: "8:15 AM", class: "Gentle Hatha Yoga", level: "All Levels", duration: "60 min" },
  { day: "Thursday", time: "7:00 AM", class: "Gentle Movement (Aging Strong)", level: "All Levels", duration: "45 min" },
  { day: "Thursday", time: "8:00 AM", class: "Intermediate Hatha Yoga", level: "Intermediate", duration: "75 min" },
  { day: "Thursday", time: "4:00 PM", class: "Gentle Hatha Yoga", level: "All Levels", duration: "60 min" },
  { day: "Friday", time: "8:15 AM", class: "Gentle Hatha Yoga", level: "All Levels", duration: "60 min" },
  { day: "Saturday", time: "7:30 AM", class: "Yin Yoga with Essential Oils", level: "All Levels", duration: "90 min" }
];

// Button text helper
const getEventButtonText = (event) => {
  if (event.bookingType === "enquire") return "Enquire";
  return "Book Now";
};

export default function Events() {
  const navigate = useNavigate();

  const handleCalendlyBooking = () => {
    window.open(CALENDLY_URL, "_blank");
  };

  const handleEventClick = (bookingType) => {
    if (bookingType === "enquire") {
      window.location.href = "/contact";
    } else {
      window.open(CALENDLY_URL, "_blank");
    }
  };

  // Drop-in booking via WhatsApp (NO Calendly)
  const handleDropInBooking = (scheduleItem) => {
    const message = `Hi Cheryl, I'd like to book a drop-in class for:\n\n📅 Day: ${scheduleItem.day}\n⏰ Time: ${scheduleItem.time}\n🧘 Class: ${scheduleItem.class}\n💰 Rate: R130 drop-in\n\nPlease let me know if this time is available.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO - REPLACED WITH CLIENT IMAGE (img10) */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroEventsImg}
            className="w-full h-full object-cover"
            alt="Yoga studio peaceful setting"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 h-20 sm:h-32 w-full bg-gradient-to-t from-ocean/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/60">
              Upcoming Programs
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white px-4"
          >
            Events & Training
          </motion.h1>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            subtitle="Join Us"
            title="Upcoming Events"
            description="Discover our upcoming workshops and training programs."
          />

          <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-border pb-4 sm:pb-5"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <event.icon className="h-4 w-4 text-ocean" />
                      <h3 className="text-base sm:text-lg font-heading">{event.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {event.date} • {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-ocean font-medium text-sm min-w-[100px] text-right">
                      {event.price}
                    </span>
                    <button
                      onClick={() => handleEventClick(event.bookingType)}
                      className="text-ocean text-[10px] sm:text-xs uppercase tracking-wider hover:gap-2 transition-all flex items-center gap-1"
                    >
                      {getEventButtonText(event)} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 300 HOUR ADVANCED TEACHER TRAINING DETAILS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-2">
              <div className="w-8 sm:w-12 h-px bg-ocean/30" />
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-ocean/40 mx-2" />
              <div className="w-8 sm:w-12 h-px bg-ocean/30" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground">
              300 Hour Advanced Teacher Training
            </h2>
            <p className="text-lg text-ocean font-medium mt-2">Starts June 13th & 14th, 2026</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
              Designed for certified 200-hour yoga teachers looking to expand their knowledge and elevate their practice.
            </p>
          </div>

          {/* Why Choose This Training */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-ocean/10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ocean" />
              Why Choose This Training?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-ocean mt-0.5">✦</span>
                <span><span className="font-medium text-foreground">New Research:</span> Explore the latest research in anatomy of energy, fascia, pain management, skeletal alignment, and therapeutic practices</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-ocean mt-0.5">✦</span>
                <span><span className="font-medium text-foreground">Comprehensive Course Material:</span> Gain an advanced understanding of yoga, from philosophy to functional anatomy, somatic psychology to advanced Ayurveda</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-ocean mt-0.5">✦</span>
                <span><span className="font-medium text-foreground">Hands-On Learning:</span> Master the exclusive Devahiti hands-on bodywork technique for pain management, fascial release, and skeletal alignment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-ocean mt-0.5">✦</span>
                <span><span className="font-medium text-foreground">Affordable & Accessible:</span> No exams, no large upfront costs. Weekend module fee of R2800.00</span>
              </li>
            </ul>
          </div>

          {/* Course Modules */}
          <h3 className="font-heading text-xl text-foreground mb-4 text-center">Course Modules</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] bg-white rounded-lg overflow-hidden border border-ocean/10">
              <thead className="bg-ocean text-white">
                <tr>
                  <th className="text-left py-3 px-4 font-heading text-sm sm:text-base">Module</th>
                  <th className="text-left py-3 px-4 font-heading text-sm sm:text-base">Date</th>
                  <th className="text-left py-3 px-4 font-heading text-sm sm:text-base">Description</th>
                </tr>
              </thead>
              <tbody>
                {trainingModules.map((module, i) => (
                  <tr key={i} className="border-b border-ocean/10 hover:bg-ocean/5 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">{module.title}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">{module.date}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{module.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Schedule Info */}
          <div className="mt-6 bg-ocean/10 border border-ocean/20 rounded-lg p-4 text-center">
            <p className="text-sm text-foreground">
              📍 Both Saturday and Sunday sessions start at <span className="font-medium">9:30am</span> and finish at <span className="font-medium">2:30pm</span> with a short 20-minute break.
            </p>
            <p className="text-sm text-foreground mt-2">
              📚 Expect written assignments after each module. You will be required to do some research and be consistent with your attendance.
            </p>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ocean text-white text-xs uppercase tracking-widest rounded-sm hover:bg-ocean-dark transition"
            >
              Enquire About 300 Hour Training <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* WEEKLY CLASS SCHEDULE + DROP-IN RATE */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-2">
              <div className="w-8 sm:w-12 h-px bg-ocean/30" />
              <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-ocean/40 mx-2" />
              <div className="w-8 sm:w-12 h-px bg-ocean/30" />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
              Weekly Class Schedule
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Join us for our regular weekly classes. Drop-in available at R130 per session.
            </p>
          </div>

          {/* DROP-IN RATE NOTICE */}
          <div className="bg-ocean/10 border border-ocean/20 rounded-lg p-3 sm:p-4 mb-6 text-center">
            <p className="text-sm text-foreground">
              🧘 <span className="font-semibold">Drop-in Rate:</span> R130 per session
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Drop-ins are only available during the scheduled class times below.
              Click "Book Drop-in" to enquire via WhatsApp.
            </p>
          </div>

          {/* SCHEDULE TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-ocean/20">
                  <th className="text-left py-3 px-3 font-heading text-sm sm:text-base font-light">Day</th>
                  <th className="text-left py-3 px-3 font-heading text-sm sm:text-base font-light">Time</th>
                  <th className="text-left py-3 px-3 font-heading text-sm sm:text-base font-light">Class</th>
                  <th className="text-left py-3 px-3 font-heading text-sm sm:text-base font-light">Duration</th>
                  <th className="text-left py-3 px-3 font-heading text-sm sm:text-base font-light">Level</th>
                  <th className="text-left py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {classSchedule.map((schedule, i) => (
                  <tr key={i} className="border-b border-ocean/10 hover:bg-ocean/5 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium">{schedule.day}</td>
                    <td className="py-3 px-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-ocean" />
                        {schedule.time}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm text-muted-foreground">{schedule.class}</td>
                    <td className="py-3 px-3 text-sm text-muted-foreground">{schedule.duration}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-ocean/10 text-ocean text-xs rounded-sm">
                        {schedule.level}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleDropInBooking(schedule)}
                        className="text-xs tracking-widest uppercase text-ocean hover:underline whitespace-nowrap"
                      >
                        Book Drop-in
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              📍 All classes are held in-studio at Ballito. Drop-in bookings are confirmed via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* FREE TRIAL CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-ocean text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl sm:text-3xl text-white mb-3">
            Try a Class for Free
          </h2>
          <p className="text-white/70 text-sm sm:text-base mb-5 max-w-md mx-auto">
            New to Devahiti? Experience your first class with no obligation.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-ocean px-6 sm:px-8 py-2.5 text-[10px] sm:text-xs uppercase tracking-widest rounded-sm hover:bg-white/90 transition"
          >
            Claim Free Class
          </button>
        </motion.div>
      </section>

      {/* QUOTE SECTION */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-ocean-dark/90" />
        <div className="relative text-center text-white">
          <Waves className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 sm:mb-3 text-white/40" />
          <p className="font-heading text-base sm:text-lg italic px-4">
            "If you can breathe, you can do yoga"
          </p>
        </div>
      </section>
    </div>
  );
}