import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Import your logo
import logo from "../assets/logo1.png";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "EVENTS", path: "/events" },
  { label: "BLOG", path: "/blog" },
  { label: "CONTACT", path: "/contact" },
  { label: "GIFT CARD", path: "/gift-card" },
];

// Secondary navigation with dropdown items - UPDATED to match Home page services
const secondaryLinks = [
  { 
    label: "GROUP CLASS", 
    path: "/services/group-class",
    hasDropdown: false,
    dropdownItems: []
  },
  { 
    label: "PRIVATE SESSIONS", 
    path: "/services/private-yoga",
    hasDropdown: false,
    dropdownItems: []
  },
  { 
    label: "CORPORATE WELLNESS", 
    path: "/services/corporate-yoga",
    hasDropdown: false,
    dropdownItems: []
  },
  { 
    label: "SOUND JOURNEY", 
    path: "/services/sound-journey",
    hasDropdown: false,
    dropdownItems: []
  },
  { 
    label: "SPECIALIZED WORKSHOP", 
    path: "/services/specialized-workshop",
    hasDropdown: false,
    dropdownItems: []
  },
  { 
    label: "TEACHER TRAINING", 
    path: "/schedule?service=teacher-training",
    hasDropdown: false,
    dropdownItems: []
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleBookingClick = () => {
    window.location.href = "/schedule";
  };

  return (
    <>
      {/* ─── MAIN NAVBAR (WHITE BACKGROUND, BLUE TEXT) ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-md border-b border-gray-100"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img 
                src={logo} 
                alt="Devahiti Yoga" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation - Blue text on white background */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-ocean border-b border-ocean pb-0.5"
                      : "text-ocean/70 hover:text-ocean"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book Online Button - Blue button on white background */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={handleBookingClick}
                className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer bg-ocean text-white hover:bg-ocean-dark"
              >
                BOOK ONLINE
              </button>
            </div>

            {/* Mobile Toggle - Blue icon on white */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-ocean"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - White background, blue text */}
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
                        ? "text-ocean"
                        : "text-ocean/70 hover:text-ocean"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Secondary links in mobile menu */}
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <p className="text-[9px] text-ocean/40 tracking-[0.15em] uppercase mb-2">SERVICES</p>
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block text-[10px] text-ocean/60 tracking-[0.1em] uppercase py-1.5 hover:text-ocean transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <button
                  onClick={handleBookingClick}
                  className="mt-3 px-6 py-3 bg-ocean text-white text-[10px] font-bold uppercase tracking-[0.2em] text-center cursor-pointer hover:bg-ocean-dark transition"
                >
                  BOOK ONLINE
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── SECONDARY NAVIGATION BAR (BLUE BACKGROUND, WHITE TEXT) - UPDATED SERVICES ─── */}
      <div className="fixed top-20 left-0 right-0 z-40 hidden lg:block bg-ocean border-t border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-6 xl:gap-8 py-3">
            {secondaryLinks.map((link) => (
              <div
                key={link.path}
                className="relative group"
              >
                <Link
                  to={link.path}
                  className="flex items-center gap-1 text-[9px] xl:text-[10px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors duration-300 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer divs to prevent content from hiding under fixed navbars */}
      <div className="h-20"></div>
      <div className="h-12 lg:h-12"></div>
    </>
  );
}