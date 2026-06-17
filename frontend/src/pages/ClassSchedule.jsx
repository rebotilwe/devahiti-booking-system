import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Clock, MapPin, BookOpen, Users } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import logo from "../assets/devahiti.png";

// ✅ UPDATED NAVIGATION - MATCHING HOME PAGE
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Teacher Training", path: "/teacher-training" },
  { label: "Retreats", path: "/retreats" },
  { label: "Class Schedule", path: "/class-schedule" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

// ✅ UPDATED Class Schedule Data from Instagram
const classSchedule = [
  { days: "MONDAY AND THURSDAY", times: [
    { time: "7:00 AM", class: "Therapeutic Movement" },
    { time: "8:00 AM", class: "Intermediate Hatha" },
    { time: "4:00 PM", class: "Beginners Gentle Hatha" }
  ]},
  { days: "TUESDAY AND FRIDAY", times: [
    { time: "8:15 AM", class: "Gentle Hatha Holistic Flow" }
  ]},
  { days: "SATURDAY", times: [
    { time: "7:30 AM", class: "90 min Yin / Breathwork / Meditation / Sound Blend" }
  ]}
];

export default function ClassSchedule() {
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
    navigate("/services");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-14 w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#65AEEA]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Call us">
              <Phone className="h-5 w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Book Online">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Our Services Button */}
        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto max-w-7xl px-6 py-3 text-center">
            <button
              onClick={() => navigate("/services")}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity"
            >
              Our Services
            </button>
          </div>
        </div>
      </header>

      <div className="h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#65AEEA] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-4 w-full bg-[#65AEEA] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition">
              Our Services
            </button>
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#65AEEA] text-[#65AEEA] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Class Schedule" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-white/80" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/80">Find Your Flow</span>
            <Calendar className="h-5 w-5 text-white/80" />
          </div>
          <h1 className="text-5xl font-light md:text-6xl text-white">Class Schedule</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            Join us on the mat — all levels welcome
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Class Schedule Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">Weekly Classes</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4">R700 per month – unlimited sessions</p>
          </div>

          <div className="space-y-8">
            {classSchedule.map((schedule, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="bg-[#65AEEA] px-6 py-4">
                  <h3 className="text-xl font-light text-white">{schedule.days}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {schedule.times.map((item, timeIdx) => (
                    <div key={timeIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#65AEEA]" />
                        <span className="font-medium text-gray-800">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 sm:mt-0">
                        <BookOpen className="h-5 w-5 text-[#65AEEA]" />
                        <span className="text-gray-600">{item.class}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Drop-in classes note */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Drop-in classes: <strong>R130 per person</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FREE Trial Class CTA */}
      <section className="bg-[#F9F9FB] py-16 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA] mb-4">BOOK YOUR CLASSES</h2>
          <p className="text-gray-600 text-lg mb-6">
            We invite you to take a <strong>FREE trial class</strong> with us whenever you are ready to dip your toes into the cleansing Yogic "waters".
          </p>
          <Link 
            to="/services"
            className="inline-block px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
          >
            Click Here
          </Link>
        </div>
      </section>

      {/* Private Sessions CTA */}
      <section className="py-16 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-[#65AEEA]" />
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">Privates and Small Groups</h2>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Available on request — tailored sessions for you or your group
          </p>
          <Link 
            to="/contact"
            className="inline-block px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
          >
            Contact Us
          </Link>
        </div>
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