import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Flower2, Star, Quote, MapPin, Clock, CheckCircle, XCircle, Info } from "lucide-react";
import { useState, useEffect } from "react";
import heroRetreatsImg from "../assets/images/bush-to-beach4.jpg";
import dolphinPodImg from "../assets/images/dolphin-pod.jpeg";
import dolphinSnorkelImg from "../assets/images/dolphin-snorkel.jpg";
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
    name: "Liz Swerzsky",
    location: "Llandudno, Cape Town",
    text: "Cheryl's planning and execution was flawless. Our road journey was comfortable, in her gracious vehicle. She knows the best stops on route! Sugarcane, grasslands and subtropical vegetation cluster alongside the road, with rare glimpses of the Indian Ocean. Layers of civilization recede and the buildings and homes become less formal, and animals may grace your path. The border crossing is seamless and uncomplicated. Our comfortable wooden cabin was perched above the long sweep of golden beach, with spectacular views. Our rooms were comfortable, the showers hot, and the cabin well equipped for our needs. Cheryl seamlessly moved from yoga instructor on the verandah, with primate observers, to kitchen goddess, serving incredible vegetarian breakfasts and memorable dinners. Then on to tour guide, walk leader, driver to adjacent exotic destinations, and fundi of all Mozambiquan! Cheryl knows the locals, can assist with a sim-card swop, take you to an exquisite jewellery shop, show you where to get warm bread or a decadent pasteis de nata, and be a calm, nurturing presence during your visit. If you have an opportunity to join Cheryl to experience this wonder, don't hesitate!",
    rating: 5
  }
];

export default function Retreats() {
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

      {/* ========== Upcoming Yoga Retreat 2027 — Yoga and Dolphin Bliss ========== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#65AEEA] font-semibold">Upcoming Yoga Retreat 2027</p>
            <h2 className="text-3xl font-light md:text-4xl text-gray-800 mt-2">Yoga and Dolphin Bliss</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-600 mt-4">One full week in Mozambique, Ponta do Ouro</p>
          </div>

          {/* Photo above the details */}
          <img 
            src={dolphinPodImg} 
            alt="Wild dolphin pod off the coast of Mozambique" 
            className="w-full h-72 object-cover rounded-2xl shadow-md mb-10"
          />

          <div className="bg-white border-2 border-[#65AEEA] rounded-2xl p-8 md:p-10">
            <div className="grid sm:grid-cols-3 gap-6 text-center border-b border-gray-100 pb-8 mb-8">
              <div>
                <Calendar className="h-6 w-6 text-[#65AEEA] mx-auto mb-2" />
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-semibold text-gray-800">21 – 27 February</p>
              </div>
              <div>
                <MapPin className="h-6 w-6 text-[#65AEEA] mx-auto mb-2" />
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">Ponta do Ouro, Mozambique</p>
              </div>
              <div>
                <Clock className="h-6 w-6 text-[#65AEEA] mx-auto mb-2" />
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-800">6 Nights / 7 Days</p>
              </div>
            </div>

            <div className="text-center mb-10">
              <p className="text-3xl font-heading text-[#65AEEA]">R13,500 <span className="text-base font-sans text-gray-500 font-normal">pp sharing</span></p>
              <p className="text-sm text-gray-500 mt-1">R16,500 single supplement</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Inclusive in price</h3>
                <ul className="space-y-2">
                  {[
                    "6 nights and 7 days accommodation in a Beachfront house",
                    "Transport to and from King Shaka airport or Ballito",
                    "1x daily Gentle Hatha yoga",
                    "1x daily Yin yoga",
                    "1x sound session",
                    "2x boat excursions / snorkel with dolphins",
                    "1x dolphin snorkel introduction to safety protocol",
                    "All breakfasts and 5 dinners",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-[#65AEEA] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Not included</h3>
                <ul className="space-y-2">
                  {[
                    "Daily lunches",
                    "One dinner where we dine out together",
                    "Any other costs not mentioned above",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <XCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#65AEEA]/10 rounded-xl flex items-start gap-3">
              <Info className="h-5 w-5 text-[#65AEEA] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                Please note these are wild dolphins — they are free to come or go, as and when they please. Any interactions are on their terms entirely and held with deep respect.
              </p>
            </div>

            <div className="text-center mt-10">
              <Link 
                to="/contact"
                className="inline-block px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
              >
                Register Interest
              </Link>
            </div>
          </div>

          {/* Photo below the details */}
          <img 
            src={dolphinSnorkelImg} 
            alt="Snorkelling alongside wild dolphins" 
            className="w-full h-72 object-cover rounded-2xl shadow-md mt-10"
          />
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

          {testimonials.length === 0 ? (
            <p className="text-center text-gray-500 italic">Reviews from our first dolphin retreat coming soon.</p>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-[#F9F9FB] rounded-2xl p-8">
                  <Quote className="h-8 w-8 text-[#65AEEA]/30 mb-4 mx-auto" />
                  <p className="text-gray-600 leading-relaxed mb-6 text-center">"{testimonial.text}"</p>
                  <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-200">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#65AEEA] text-[#65AEEA]" />
                      ))}
                    </div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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