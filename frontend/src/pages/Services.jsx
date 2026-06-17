import { Link, useNavigate } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Clock, MapPin, Sparkles, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { services } from "../data/services";
import logo from "../assets/devahiti.png";

// ✅ UPDATED NAVIGATION
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

// ✅ UPDATED SUBNAV - Removed Educational Workshops
const subNav = [
  { label: "Group Class", path: "/services/group-class" },
  { label: "Private Sessions", path: "/services/private-sessions" },
  { label: "Corporate Wellness", path: "/services/corporate-wellness" },
  { label: "Sound Journey", path: "/services/sound-journey" },
  { label: "Sound Massage", path: "/services/sound-massage" },
  { label: "Fascial Release", path: "/services/fascia-release" },
  { label: "Teacher Training", path: "/services/teacher-training" },
  // ✅ REMOVED: Educational Workshops
  { label: "Retreats", path: "/services/retreats" },
];

// Group services by category
const groupedServices = services.reduce((acc, service) => {
  if (!acc[service.category]) acc[service.category] = [];
  acc[service.category].push(service);
  return acc;
}, {});

// Order of categories for display
const categoryOrder = [
  "Group Classes",
  "Private Yoga",
  "Corporate & Workplace",
  "Sound Healing",
  "Therapeutic Bodywork",
  "Workshops",
  "Training",
  "Retreats"
];

// Category icons and descriptions
const categoryInfo = {
  "Group Classes": { icon: Users, description: "Connect with others in a supportive group environment" },
  "Private Yoga": { icon: Sparkles, description: "Personalized one-on-one sessions tailored to you" },
  "Corporate & Workplace": { icon: Calendar, description: "Wellness programs for your team" },
  "Sound Healing": { icon: Sparkles, description: "Restorative sound bath experiences" },
  "Therapeutic Bodywork": { icon: Sparkles, description: "Healing hands-on therapy sessions" },
  "Workshops": { icon: Calendar, description: "Deep dive into specific practices" },
  "Training": { icon: Users, description: "Comprehensive teacher training programs" },
  "Retreats": { icon: Calendar, description: "Immersive wellness getaways" }
};

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

export default function Services() {
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

        {/* Sub Navbar */}
        <div style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3">
            {subNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90 hover:text-white transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
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
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#65AEEA] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link key={link.path} to={link.path} className="block py-2 text-xs text-gray-500 hover:text-[#65AEEA]" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <button 
              onClick={() => { navigate("/services"); setMobileOpen(false); }} 
              className="mt-4 w-full bg-[#65AEEA] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
            >
              Our Services
            </button>
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#65AEEA] text-[#65AEEA] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-[45vh] flex items-center justify-center bg-gradient-to-br from-[#65AEEA] to-[#93C9F9]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        
        <div className="relative z-10 text-center text-white px-6">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider">Find Your Practice</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-light">
            Our Services
          </h1>
          <div className="w-20 h-px bg-white/50 mx-auto my-4" />
          <p className="text-white/90 mt-3 max-w-lg mx-auto text-lg">
            Choose the practice that speaks to you
          </p>
        </div>
        
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-20">

          {categoryOrder.map((category) => {
            const items = groupedServices[category];
            if (!items || items.length === 0) return null;
            
            const CategoryIcon = categoryInfo[category]?.icon || Sparkles;
            const categoryDesc = categoryInfo[category]?.description || "";
            
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-[#65AEEA]/10">
                    <CategoryIcon className="h-6 w-6 text-[#65AEEA]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-heading text-gray-800">
                      {category}
                    </h2>
                    {categoryDesc && (
                      <p className="text-sm text-gray-500 mt-1">{categoryDesc}</p>
                    )}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#65AEEA]/30 to-transparent ml-4" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((service, index) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.slug}`}
                      className="group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-[#65AEEA]/30 hover:-translate-y-1"
                    >
                      <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[#65AEEA] to-[#4A9FD9] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <div className="absolute top-4 right-4 text-xs font-bold text-[#65AEEA]/30 group-hover:text-[#65AEEA]/50 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <h3 className="text-xl font-heading mb-3 text-gray-800 group-hover:text-[#65AEEA] transition-colors pr-8">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                        {service.shortDescription}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                          <Clock size={12} className="text-[#65AEEA]" /> {service.duration}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                          <MapPin size={12} className="text-[#65AEEA]" /> {service.location.split(" ")[0]}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                        <span className="text-[#65AEEA] font-semibold text-lg">
                          {service.price}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-[#65AEEA] group-hover:gap-2 transition-all flex items-center gap-1">
                          View Details 
                          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#65AEEA] to-[#4A9FD9]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">Not sure where to start?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Let's find the right practice for you
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Every journey begins with a single step. Contact us for a personalized recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-3 rounded-full bg-white text-[#65AEEA] font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Contact Us
            </Link>
            <Link 
              to="/class-schedule"
              className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
            >
              View Class Schedule
            </Link>
          </div>
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