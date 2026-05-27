import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo1.png";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "EVENTS", path: "/events" },
  { label: "BLOG", path: "/blog" },
  { label: "CONTACT", path: "/contact" },
  { label: "GIFT CARD", path: "/gift-card" },
];

// Secondary navigation - matching Home page services
const secondaryLinks = [
  { label: "GROUP CLASS", path: "/services/group-class" },
  { label: "PRIVATE SESSIONS", path: "/services/private-sessions" },
  { label: "CORPORATE WELLNESS", path: "/services/corporate-wellness" },
  { label: "SOUND JOURNEY", path: "/services/sound-journey" },
  { label: "SOUND MASSAGE", path: "/services/sound-massage" },
  { label: "FASCIA RELEASE", path: "/services/fascia-release" },
  { label: "TEACHER TRAINING", path: "/schedule?service=teacher-training" },
  { label: "EDUCATIONAL WORKSHOPS", path: "/services/educational-workshops" },
  { label: "SPECIALIZED WORKSHOP", path: "/services/specialized-workshop" },
  { label: "RETREATS", path: "/services/retreats" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleBookingClick = () => {
    window.location.href = "/schedule";
  };

  return (
    <>
      {/* MAIN NAVBAR - White background, blue text (matching reference) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={logo}
                alt="Devahiti Yoga"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation - Blue text (#93C9F9) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-[#93C9F9] border-b border-[#93C9F9] pb-0.5"
                      : "text-gray-600 hover:text-[#93C9F9]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book Online Button - Blue background (#93C9F9) */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={handleBookingClick}
                className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer bg-[#93C9F9] text-white hover:bg-[#65AEEA] rounded-sm"
              >
                BOOK ONLINE
              </button>
            </div>

            {/* Mobile Toggle - Blue icon */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#93C9F9]"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - White background */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <nav className="flex flex-col px-6 py-6 gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[11px] font-medium tracking-[0.15em] uppercase py-2 transition-colors ${
                      location.pathname === link.path
                        ? "text-[#93C9F9]"
                        : "text-gray-600 hover:text-[#93C9F9]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Secondary links in mobile menu */}
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <p className="text-[9px] text-[#93C9F9]/40 tracking-[0.15em] uppercase mb-2">SERVICES</p>
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block text-[10px] text-gray-500 tracking-[0.1em] uppercase py-1.5 hover:text-[#93C9F9] transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={handleBookingClick}
                  className="mt-3 px-6 py-3 bg-[#93C9F9] text-white text-[10px] font-bold uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-[#65AEEA] transition rounded-sm"
                >
                  BOOK ONLINE
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECONDARY NAVIGATION BAR - Light blue background (#93C9F9), white text */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 hidden lg:block bg-[#93C9F9] border-t border-white/10 shadow-md overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-4 xl:gap-6 py-2 whitespace-nowrap">
            {secondaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[9px] xl:text-[10px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spacers */}
      <div className="h-16 md:h-20"></div>
      <div className="h-10 md:h-10 lg:h-10"></div>
    </>
  );
}