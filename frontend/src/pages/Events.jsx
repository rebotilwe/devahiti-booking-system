import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Award, Sun, Waves } from "lucide-react";
import { useState, useEffect } from "react";
import heroEventsImg from "../assets/images/img10.jpg";
import logo from "../assets/logo1.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

const subNav = [
  { label: "Private Group Packages", path: "/services/private-sessions" },
  { label: "Sound Bowl Massage", path: "/services/sound-massage" },
  { label: "Bowen Therapy", path: "/services/bowen-therapy" },
  { label: "Weekly Yoga", path: "/services/group-class" },
];

const upcomingEvents = [
  {
    id: "teacher-training-200",
    title: "200 Hour Teacher Training",
    date: "May 16-17, 2026",
    location: "Ballito, South Africa",
    description:
      "Foundational training rooted in science and evidence-based movement practices.",
    price: "From R28 000",
    icon: Award,
    serviceKey: "teacher-training",
  },
  {
    id: "teacher-training-300",
    title: "300 Hour Advanced Teacher Training",
    date: "Starts June 13-14, 2026",
    location: "Ballito, South Africa",
    description:
      "Advanced training for certified 200-hour yoga teachers focused on refinement and mastery.",
    price: "From R32 000",
    icon: Award,
    serviceKey: "teacher-training",
  },
  {
    id: "sound-immersion",
    title: "Sound Journey Immersion",
    date: "Monthly",
    location: "Ballito, South Africa",
    description:
      "Immersive sound healing experience using Tibetan singing bowls and vibrational therapy.",
    price: "R800 per session",
    icon: Sun,
    serviceKey: "sound-journey",
  },
];

const classSchedule = [
  { day: "Monday", time: "7:00 AM", class: "Gentle Movement", level: "All Levels", duration: "45 min" },
  { day: "Monday", time: "8:00 AM", class: "Intermediate Hatha", level: "Intermediate", duration: "75 min" },
  { day: "Monday", time: "4:00 PM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Friday", time: "8:15 AM", class: "Gentle Hatha", level: "All Levels", duration: "60 min" },
  { day: "Saturday", time: "7:30 AM", class: "Yin Yoga", level: "All Levels", duration: "90 min" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

export default function Events() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    window.open(BOOKING_URL, "_blank");
  };

  const handleEventBooking = (event) => {
    navigate(`/schedule?service=${event.serviceKey}`);
  };

  const handleDropInBooking = () => {
    navigate("/schedule?service=drop-in-class");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar - Fixed with scroll effect */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePhoneClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleShoppingBagClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Book Online"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Sub Navbar - Second Navigation Bar */}
        <div style={{ backgroundColor: "#93C9F9" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-3">
            {subNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#93C9F9] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-xs text-gray-500 hover:text-[#93C9F9]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => {
                handleShoppingBagClick();
                setMobileOpen(false);
              }}
              className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition"
            >
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img src={heroEventsImg} alt="Devahiti Events" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-4 w-4 text-white/80" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/80">
              Programs & Training
            </span>
            <Waves className="h-4 w-4 text-white/80" />
          </div>
          <h1 className="text-5xl font-light md:text-6xl text-white">Events & Training</h1>
        </div>
        {/* curved bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">Upcoming Events</h2>
            <p className="text-gray-500 text-sm mt-2">
              Book your spot directly — limited availability
            </p>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          <div className="space-y-6">
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <event.icon className="h-5 w-5 text-[#93C9F9]" />
                    <h3 className="text-xl font-light text-gray-800">{event.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {event.date}
                    </span>
                    <span>📍 {event.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between gap-3 min-w-[140px]">
                  <span className="text-[#93C9F9] font-medium text-lg">
                    {event.price}
                  </span>
                  <button
                    onClick={() => handleEventBooking(event)}
                    className="px-6 py-2 bg-[#93C9F9] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">Weekly Classes</h2>
            <p className="text-gray-500 text-sm mt-2">
              Drop-in rate: R130 per class
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Ballito sessions: Tuesday & Thursday at 8:00 AM
            </p>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="bg-[#93C9F9] text-white">
                  <th className="p-3 text-left rounded-l-lg">Day</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Level</th>
                  <th className="p-3 text-left rounded-r-lg"></th>
                </tr>
              </thead>
              <tbody>
                {classSchedule.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="p-3 text-gray-700">{item.day}</td>
                    <td className="p-3 text-gray-600">{item.time}</td>
                    <td className="p-3 text-gray-700">{item.class}</td>
                    <td className="p-3 text-gray-500">{item.duration}</td>
                    <td className="p-3">
                      <span className="text-[#93C9F9] text-xs font-medium">{item.level}</span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDropInBooking()}
                        className="text-xs text-[#93C9F9] font-semibold uppercase hover:underline"
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

      {/* Teacher Training CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Teacher Training</h2>
        <p className="text-white/90 text-sm mt-2">
          200hr & 300hr Certified Programs in Ballito
        </p>
        <button
          onClick={() => navigate("/schedule?service=teacher-training")}
          className="mt-6 px-8 py-3 bg-white text-[#93C9F9] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition"
        >
          Book Training
        </button>
      </section>

      {/* Quote */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <p className="text-white text-xl italic font-light">
          "If you can breathe, you can do yoga"
        </p>
      </section>

   {/* Footer */}
<footer className="px-6 py-12 text-center text-white" style={{ backgroundColor: "#65AEEA" }}>
  <img src={logo} alt="Devahiti Yoga" className="mx-auto h-20 w-auto" />
  <p className="mt-4 text-2xl font-light text-white">Devahiti</p>
  <p className="mt-2 text-sm italic text-white/90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
  <p className="mt-6 text-xs uppercase tracking-widest text-white/80">
    © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
  </p>
  <p className="mt-4 text-xs text-white/60">
    Developed by{' '}
    <a 
      href="https://afribizconnect.co.za/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white/80 hover:text-white transition-colors underline underline-offset-2"
    >
      Afribiz Connect
    </a>
  </p>
</footer>
    </div>
  );
}