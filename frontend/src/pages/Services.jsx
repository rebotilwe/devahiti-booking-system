import { Link, useNavigate } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Clock, MapPin, Sparkles, Calendar, Users, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { services } from "../data/services";
import logo from "../assets/devahiti.png";
import heroServicesImg from "../assets/images/homee.jpg";

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

const groupedServices = services.reduce((acc, service) => {
  if (!acc[service.category]) acc[service.category] = [];
  acc[service.category].push(service);
  return acc;
}, {});

const categoryOrder = [
  "Group Classes",
  "Private Yoga",
  "Corporate & Workplace",
  "Sound Healing",
  "Therapeutic Bodywork",
  "Training",
  "Retreats",
];

const categoryInfo = {
  "Group Classes": { icon: Users, description: "Connect with others in a supportive group environment" },
  "Private Yoga": { icon: Sparkles, description: "Personalized one-on-one sessions tailored to you" },
  "Corporate & Workplace": { icon: Calendar, description: "Wellness programs for your team" },
  "Sound Healing": { icon: Sparkles, description: "Restorative sound bath experiences" },
  "Therapeutic Bodywork": { icon: Sparkles, description: "Healing hands-on therapy sessions" },
  "Training": { icon: Users, description: "Comprehensive teacher training programs" },
  "Retreats": { icon: Calendar, description: "Immersive wellness getaways" },
};

export default function Services() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoneClick = () => (window.location.href = "tel:+27840902083");
  const handleShoppingBagClick = () => navigate("/services");

  const getServiceLink = (service) => {
    if (service.slug === "teacher-training") return "/teacher-training";
    if (service.slug === "retreats") return "/retreats";
    return `/services/${service.slug}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-12 w-auto" />
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

        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto max-w-7xl px-6 py-2.5 text-center">
            <button
              onClick={() => navigate("/services")}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors"
            >
              Our Services
            </button>
          </div>
        </div>
      </header>

      <div className="h-28" />

      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#65AEEA] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-4 w-full bg-[#65AEEA] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full">
              Our Services
            </button>
          </div>
        </div>
      )}

      {/* ========== ✅ UPDATED: HERO - NO TEXT ON IMAGE ========== */}
      <section className="w-full">
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
            <img 
              src={heroServicesImg} 
              alt="Devahiti Yoga Services" 
              className="w-full h-full object-cover object-center"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            {/* Minimal overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* ========== ✅ UPDATED: Hero Text Below Image ========== */}
      <section className="relative py-8 sm:py-12 px-6 text-center bg-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#65AEEA] mb-3">
            Devahiti Yoga &amp; Sound Studio
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 font-light leading-[1.1]">
            A practice for<br className="hidden md:block" /> every body, every mood
          </h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            From breath and movement to sound and stillness — find the offering that meets you where you are.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-24">
          {categoryOrder.map((category) => {
            const items = groupedServices[category];
            if (!items || items.length === 0) return null;

            const CategoryIcon = categoryInfo[category]?.icon || Sparkles;
            const categoryDesc = categoryInfo[category]?.description || "";

            return (
              <div key={category}>
                <div className="flex items-baseline gap-4 mb-10">
                  <CategoryIcon className="h-5 w-5 text-[#65AEEA] shrink-0 translate-y-0.5" strokeWidth={1.75} />
                  <div className="min-w-0">
                    <h2 className="text-2xl md:text-3xl text-[#1A1A1A] font-light">
                      {category}
                    </h2>
                    {categoryDesc && (
                      <p className="text-sm text-gray-500 mt-1">{categoryDesc}</p>
                    )}
                  </div>
                  <div className="flex-1 h-px bg-gray-200 ml-2" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((service) => {
                    const link = getServiceLink(service);
                    return (
                      <Link
                        key={service.id}
                        to={link}
                        className="group relative flex flex-col bg-white rounded-xl p-7 ring-1 ring-gray-100 transition-all duration-300 hover:ring-[#65AEEA]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5"
                      >
                        {/* ✅ FIXED: object-contain to show full image */}
                        <div className="w-full h-48 overflow-hidden rounded-lg bg-[#F5F0E8]">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h3 className="text-xl text-[#1A1A1A] mb-2.5 group-hover:text-[#65AEEA] transition-colors mt-4">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-5 leading-relaxed flex-grow">
                          {service.shortDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-400 mb-5">
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="text-[#65AEEA]/70" /> {service.duration}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-[#65AEEA]/70" /> {service.location.split(" ")[0]}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-5 border-t border-gray-100">
                          <span className="text-[#1A1A1A] font-semibold">
                            {service.price}
                          </span>
                          <span className="text-xs font-medium text-[#65AEEA] flex items-center gap-1">
                            View details
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/80 mb-4">
            Not sure where to start?
          </p>
          <h2 className="text-3xl md:text-4xl text-white font-light mb-5">
            Let's find your practice
          </h2>
          <p className="text-white/80 mb-9 leading-relaxed">
            Every journey begins with a single step. Reach out for a personal recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 rounded-full bg-white text-[#65AEEA] text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/class-schedule"
              className="px-8 py-3 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
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
          Developed by{" "}
          <a href="https://afribizconnect.co.za/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors underline underline-offset-2">
            Afribiz Connect
          </a>
        </p>
      </footer>
    </div>
  );
}