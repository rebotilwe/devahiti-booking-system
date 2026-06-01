import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, ArrowRight, Waves, Phone, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { services } from "../data/services";
import logo from "../assets/devahiti.png";
import heroBgImg from "../assets/images/home.jpg"; // ✅ Add this import

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

export default function ServiceDetail() {
  const { slug } = useParams();
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

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Service not found</h1>
          <Link to="/services" className="text-[#93C9F9] hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    const safeService = {
      id: service.id,
      slug: service.slug,
      title: service.title,
      category: service.category,
      duration: service.duration,
      price: service.price,
      priceAmount: service.priceAmount,
      location: service.location,
      capacity: service.capacity,
      bookingType: service.bookingType,
    };

    if (service.bookingType === "enquire") {
      navigate("/contact");
    } else {
      navigate("/schedule", { state: { service: safeService } });
    }
  };

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar - Same as Home page */}
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
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors" aria-label="Call us">
              <Phone className="h-5 w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors" aria-label="Book Online">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors" aria-label="Menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Our Services Button - Same as Home page */}
        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#93C9F9" }}>
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
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => { navigate("/services"); setMobileOpen(false); }} 
              className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition"
            >
              Our Services
            </button>
            <button onClick={() => { handleShoppingBagClick(); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#93C9F9] text-[#93C9F9] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#93C9F9] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* HERO - WITH BACKGROUND IMAGE (Fixed) */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img 
          src={service.image || heroBgImg} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blue Overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "#93C9F9", opacity: 0.75 }} />
        
        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/60">
              {service.category}
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white px-4"
          >
            {service.title}
          </motion.h1>
        </div>
        
        {/* White curved bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* CONTENT */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Icon & Description */}
          <div className="text-center mb-12">
            {IconComponent && (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#93C9F9]/10 mb-6">
                <IconComponent className="h-10 w-10 text-[#93C9F9]" />
              </div>
            )}
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#93C9F9]/10 p-6 rounded-lg text-center">
              <Clock className="h-8 w-8 text-[#93C9F9] mx-auto mb-3" />
              <h3 className="font-heading text-xl text-gray-800 mb-1">Duration</h3>
              <p className="text-gray-500">{service.duration}</p>
            </div>
            <div className="bg-[#93C9F9]/10 p-6 rounded-lg text-center">
              <MapPin className="h-8 w-8 text-[#93C9F9] mx-auto mb-3" />
              <h3 className="font-heading text-xl text-gray-800 mb-1">Location</h3>
              <p className="text-gray-500">{service.location}</p>
            </div>
            <div className="bg-[#93C9F9]/10 p-6 rounded-lg text-center">
              <Users className="h-8 w-8 text-[#93C9F9] mx-auto mb-3" />
              <h3 className="font-heading text-xl text-gray-800 mb-1">Capacity</h3>
              <p className="text-gray-500">{service.capacity}</p>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="bg-gradient-to-r from-[#93C9F9]/10 to-[#65AEEA]/5 p-8 rounded-2xl text-center">
            <div className="mb-6">
              <span className="text-4xl font-heading text-[#93C9F9]">{service.price}</span>
              <p className="text-sm text-gray-500 mt-1">
                {service.bookingType === "enquire" ? "Contact for pricing" : "Includes all equipment"}
              </p>
            </div>

            <button
              onClick={handleBook}
              className="inline-flex items-center gap-3 px-10 py-4 text-white text-sm font-medium uppercase tracking-[0.3em] hover:opacity-90 transition-all rounded-sm"
              style={{ backgroundColor: "#93C9F9" }}
            >
              {service.bookingType === "enquire" ? "Enquire Now" : "Book Now"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs text-gray-500 mt-4">
              {service.bookingType === "enquire"
                ? "Contact us for more information about this program"
                : "Select your preferred date and time after booking"}
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link to="/services" className="text-[#93C9F9] hover:underline text-sm">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <img src={logo} alt="Devahiti Yoga" className="mx-auto h-20 w-auto" />
        <p className="mt-4 text-2xl font-light text-white">Devahiti</p>
        <p className="mt-2 text-sm italic text-white/90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest text-white/80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
      </footer>
    </div>
  );
}