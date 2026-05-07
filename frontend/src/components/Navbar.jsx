import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Import your logo - adjust the filename to match your actual file
import logo from "../assets/logo1.png"; // or .svg, .webp, etc.

// Calendly URL
const CALENDLY_URL = "https://calendly.com/cheryl-sayogasafaris";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle booking click - opens Calendly in new tab
  const handleBookingClick = () => {
    window.open(CALENDLY_URL, "_blank");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Increased size */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Devahiti Yoga Logo" 
              className="h-12 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-body tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="tel:+27840902083" className="text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={handleBookingClick}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-body font-medium tracking-widest uppercase rounded-none hover:bg-primary/90 transition-all duration-300 cursor-pointer"
            >
              Book Online
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-body tracking-widest uppercase py-2 transition-colors ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleBookingClick}
                className="mt-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-body font-medium tracking-widest uppercase text-center cursor-pointer"
              >
                Book Online
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}