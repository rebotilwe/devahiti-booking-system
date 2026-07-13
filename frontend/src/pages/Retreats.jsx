import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Flower2, MapPin, Clock, Users, CheckCircle, ArrowRight, Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import heroRetreatsImg from "../assets/images/retreats.jpg";
import retreatsImg from "../assets/images/img11.jpg";
import groupImg from "../assets/images/group.jpg";
import soundImg from "../assets/images/img11.jpg";
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

// Upcoming Retreat
const upcomingRetreat = {
  id: 1,
  title: "Rest and Rejuvenate",
  subtitle: "5 Day Yoga Retreat",
  date: "24-28th November 2024",
  location: "Siqalo Lodge, Royal Jozini Nature Reserve, Eswatini (Swaziland)",
  price: "R6,500 pp",
  duration: "5 Days",
  capacity: "Small and Intimate Group",
  image: retreatsImg,
  includes: [
    "Single accommodation",
    "All vegetarian meals",
    "Yoga classes and sound meditation",
    "Cacao ceremony",
    "Guided bush walk"
  ]
};

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
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <ShoppingBag className="h-5 w-5" />
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

     {/* Page Hero - ✅ Updated with Framed Container */}
<section className="w-full">
  <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
    <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
      <img 
        src={heroRetreatsImg} 
        alt="Devahiti Retreats" 
        className="w-full h-full object-cover object-center"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          {/* <Flower2 className="h-5 w-5 text-white/80" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/80">Wellness Journeys</span>
          <Flower2 className="h-5 w-5 text-white/80" /> */}
        </div>
        {/* <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white drop-shadow-lg">Yoga Retreats</h1>
        {/* <p className="mt-4 text-lg text-white/90 max-w-2xl drop-shadow"> */}
          {/* Immerse yourself in transformative wellness experiences
        </p> */} 
      </div>
    </div>
  </div>
</section>

      {/* Upcoming Retreat - Featured */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#65AEEA] font-semibold">Limited Spaces Available</p>
            <h2 className="text-3xl font-light md:text-4xl text-gray-800 mt-2">Upcoming Retreat</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>

          {/* Featured Retreat Card */}
          <div className="bg-white border-2 border-[#65AEEA] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="overflow-hidden h-96 md:h-full">
                <img src={upcomingRetreat.image} alt={upcomingRetreat.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10">
                <div className="inline-block px-3 py-1 bg-[#65AEEA]/10 rounded-full mb-4">
                  <span className="text-xs font-semibold text-[#65AEEA]">Featured Retreat</span>
                </div>
                <h3 className="text-3xl font-light text-gray-800">{upcomingRetreat.title}</h3>
                <p className="text-[#65AEEA] text-lg mt-1">{upcomingRetreat.subtitle}</p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-5 w-5 text-[#65AEEA]" />
                    <span>{upcomingRetreat.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-[#65AEEA]" />
                    <span>{upcomingRetreat.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="h-5 w-5 text-[#65AEEA]" />
                    <span>{upcomingRetreat.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="h-5 w-5 text-[#65AEEA]" />
                    <span>{upcomingRetreat.capacity}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-heading text-[#65AEEA]">{upcomingRetreat.price}</p>
                  <p className="text-xs text-gray-500">per person sharing</p>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Price includes:</h4>
                  <ul className="space-y-2">
                    {upcomingRetreat.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#65AEEA]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleBookNow}
                  className="mt-8 w-full py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition flex items-center justify-center gap-2"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Spaces are limited. Early booking recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Venue */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA] mb-6">About the Venue</h2>
          <div className="w-20 h-px bg-[#65AEEA] mx-auto mb-8"></div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-light text-gray-800 mb-2">Siqalo Lodge</h3>
            <p className="text-[#65AEEA] mb-4">Royal Jozini Nature Reserve, Eswatini (Swaziland)</p>
            <p className="text-gray-600 leading-relaxed">
              Nestled in the pristine wilderness of Royal Jozini Nature Reserve, Siqalo Lodge offers a serene escape from the everyday. 
              Surrounded by breathtaking landscapes, diverse wildlife, and the tranquil waters of the Jozini Dam, this is the perfect setting 
              for deep relaxation and rejuvenation.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
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

      {/* Sample Itinerary */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">Sample Itinerary</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4">A taste of what to expect during your retreat</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#65AEEA]/20 flex items-center justify-center">
                <span className="text-[#65AEEA] font-bold">Day 1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Arrival & Opening Circle</h4>
                <p className="text-sm text-gray-500">Welcome ceremony, settling in, gentle evening yoga</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#65AEEA]/20 flex items-center justify-center">
                <span className="text-[#65AEEA] font-bold">Day 2-4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Daily Yoga & Activities</h4>
                <p className="text-sm text-gray-500">Morning yoga, sound meditation, cacao ceremony, guided bush walk, free time for relaxation</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#65AEEA]/20 flex items-center justify-center">
                <span className="text-[#65AEEA] font-bold">Day 5</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Closing Circle & Departure</h4>
                <p className="text-sm text-gray-500">Farewell ceremony, integration, check-out</p>
              </div>
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