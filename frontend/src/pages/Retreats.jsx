import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Flower2, Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import heroRetreatsImg from "../assets/images/bush-to-beach4.jpg";
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

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

// Testimonials from past retreat attendees
const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    location: "Durban",
    text: "The retreat at Siqalo Lodge was absolutely life-changing. Cheryl's guidance and the serene environment allowed me to truly disconnect and recharge. The cacao ceremony was magical!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael R.",
    location: "Johannesburg",
    text: "A perfect blend of yoga, nature, and relaxation. The guided bush walk and sound meditation were highlights. Highly recommend for anyone needing a reset.",
    rating: 5
  }
];

export default function Retreats() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    navigate("/services");
  };

  const handleBookNow = () => {
    navigate("/services");
  };

  return (
    <div className="min-h-screen bg-[#F3F8FC]">
      {/* Top Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 sm:h-14 w-auto" />
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

          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#65AEEA] transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto max-w-7xl px-6 py-3 text-center">
            <button onClick={() => navigate("/services")} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity">
              Our Services
            </button>
          </div>
        </div>
      </header>

      {/* ✅ FIXED: responsive spacer matching header height on all screen sizes */}
      <div className="h-16 sm:h-20 md:h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-16 sm:top-20 md:top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
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

      {/* ========== ✅ UPDATED: Page Hero - NO TEXT ON IMAGE ========== */}
      <section className="w-full">
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
            <img 
              src={heroRetreatsImg} 
              alt="Devahiti Retreats" 
              className="w-full h-full object-cover object-center"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            {/* Minimal overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </section>

      {/* ========== ✅ STANDARDIZED: Hero Text Below Image ========== */}
      <section className="relative py-10 sm:py-14 px-6 text-center bg-[#F3F8FC]">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flower2 className="h-5 w-5 text-[#65AEEA]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#65AEEA]">Wellness Journeys</span>
            <Flower2 className="h-5 w-5 text-[#65AEEA]" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-800 drop-shadow-lg">
            Yoga Retreats
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Immerse yourself in transformative wellness experiences
          </p>
        </div>
      </section>

      {/* ========== Upcoming Retreats 2027 ========== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#65AEEA] font-semibold">Save the Date</p>
            <h2 className="text-3xl font-light md:text-4xl text-gray-800 mt-2">Upcoming Retreats 2027</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Full itinerary and pricing for each retreat below is being finalised and will be added here soon.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-[#65AEEA] rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-800">Dolphin and Vitamin Sea</h3>
              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-[#65AEEA]" />
                <span>March 2027 — Dates to be confirmed</span>
              </div>
            </div>

            <div className="bg-white border-2 border-[#65AEEA] rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-800">Travel with us through Northern India</h3>
              <p className="text-[#65AEEA] mt-1">A journey through Faith, Culture and Consciousness</p>
              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-[#65AEEA]" />
                <span>September 2027 — 21 Days</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 mb-4">
              Interested in either retreat? Get in touch to register your interest and be the first to know once dates and pricing are confirmed.
            </p>
            <Link 
              to="/contact"
              className="inline-block px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
            >
              Register Interest
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#F3F8FC]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#65AEEA] text-[#65AEEA]" />
              ))}
            </div>
            <h2 className="text-3xl font-light md:text-4xl text-gray-800">What Past Retreaters Say</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-[#F9F9FB] rounded-2xl p-6">
                <Quote className="h-8 w-8 text-[#65AEEA]/30 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-4">"{testimonial.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#65AEEA] text-[#65AEEA]" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-[#F9F9FB] rounded-2xl p-6">
                      <Quote className="h-8 w-8 text-[#65AEEA]/30 mb-4" />
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm">"{testimonial.text}"</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-xs text-gray-400">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === idx ? "w-8 bg-[#65AEEA]" : "w-2 bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Ready to Rest and Rejuvenate?</h2>
        <p className="text-white/90 text-sm mt-2 max-w-xl mx-auto">
          Join us for this transformative 5-day retreat in the beautiful Eswatini wilderness.
        </p>
        <p className="text-white/80 text-sm mt-4">
          <Link to="/services" className="underline font-semibold hover:text-white/80">Browse all services</Link> to find your perfect experience
        </p>
        <button onClick={handleBookNow} className="mt-6 px-8 py-3 bg-white text-[#65AEEA] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
          Book Now
        </button>
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