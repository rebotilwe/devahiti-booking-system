import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import heroBgImg from "../assets/images/home.jpg";
import cherylPortraitImg from "../assets/images/about.jpg";
import privateImg from "../assets/images/private.jpg";
import soundImg from "../assets/images/img11.jpg";
import trainingImg from "../assets/images/img5.jpg";
import groupImg from "../assets/images/group.jpg";
import corporateImg from "../assets/images/img1.jpg";
import soundMassageImg from "../assets/images/about.jpg";
import educationalWorkshopImg from "../assets/images/img1.jpg";
import retreatsImg from "../assets/images/img11.jpg";
import fasciaReleaseImg from "../assets/images/img11.jpg";
import logo from "../assets/logo1.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

const subNav = [
  { label: "Group Class", path: "/services/group-class" },
  { label: "Private Sessions", path: "/services/private-sessions" },
  { label: "Corporate Wellness", path: "/services/corporate-wellness" },
  { label: "Sound Journey", path: "/services/sound-journey" },
  { label: "Sound Massage", path: "/services/sound-massage" },
  { label: "Fascia Release", path: "/services/fascia-release" },
  { label: "Teacher Training", path: "/schedule?service=teacher-training" },
  { label: "Educational Workshops", path: "/services/educational-workshops" },
  { label: "Retreats", path: "/services/retreats" },
];

// 9 services - Grouped into 3 rows of 3
const allServices = [
  { img: groupImg, title: "Group Class", link: "/services/group-class" },
  { img: privateImg, title: "Private Sessions", link: "/services/private-sessions" },
  { img: corporateImg, title: "Corporate Wellness", link: "/services/corporate-wellness" },
  { img: soundImg, title: "Sound Journey", link: "/services/sound-journey" },
  { img: soundMassageImg, title: "Sound Massage", link: "/services/sound-massage" },
  { img: fasciaReleaseImg, title: "Fascia Release Therapy", link: "/services/fascia-release" },
  { img: trainingImg, title: "Teacher Training", link: "/schedule?service=teacher-training" },
  { img: educationalWorkshopImg, title: "Educational Workshops", link: "/services/educational-workshops" },
  { img: retreatsImg, title: "Retreats / Safaris", link: "/services/retreats" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";
const FORMSPREE_ID = "xyklpvwn";

function ServiceCard({ img, title, link, navigate }) {
  return (
    <div className="group cursor-pointer" onClick={() => navigate(link)}>
      <div className="aspect-square w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 text-center text-lg font-light text-gray-800">{title}</h3>
      <button
        onClick={(e) => { e.stopPropagation(); navigate(link); }}
        className="mt-2 w-full text-center text-[10px] font-semibold uppercase tracking-wider text-[#93C9F9] hover:underline"
      >
        Read More
      </button>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

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

        {/* ✅ Our Services Button - CENTERED with BLUE BACKGROUND */}
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

      {/* ========== OUR SERVICES SECTION (BANNER PIC - NO WORDING) ========== */}
      <section className="w-full">
        <div className="relative w-full h-[40vh] min-h-[300px] md:h-[50vh]">
          <img 
            src={heroBgImg} 
            alt="Our Services" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ========== HERO / TITLE SECTION - BLUE BACKGROUND ========== */}
      <section className="relative py-16 px-6 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-light text-white">
            Private, Group Yoga &amp; Sound Relaxation
          </h1>
          <p className="mt-4 text-xl text-white/90">
            in Studio or in your own accommodation
          </p>
          <a 
            href={BOOKING_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="mt-8 inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-[#93C9F9] bg-white transition-all hover:scale-105"
          >
            Booking Menu
          </a>
        </div>
        
        {/* Blue line curve below this section */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* ========== HI I'M CHERYL SECTION ========== */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <img 
          src={cherylPortraitImg} 
          alt="Portrait of Cheryl" 
          className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg" 
          loading="lazy" 
        />
        <h2 className="mt-8 text-3xl md:text-4xl font-light">Hi, I'm Cheryl!</h2>
        <p className="mt-6 text-base leading-relaxed text-gray-600">
          I specialise in private, group, corporate yoga and sound relaxation sessions — in studio or in the comfort of your own accommodation.
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          I know how life can get so full that we forget what it feels like to truly unwind, reconnect and simply breathe again.
        </p>
        
        {/* Updated text block - same style as About page paragraphs */}
        <div className="mt-10">
          <p className="text-base leading-relaxed text-gray-600">
            Unwind with family and friends, allow gentle movement to reduce stress and tension, followed by a nurturing sound bath ~ leaving you feeling relaxed and rejuvenated.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Sessions are for everyBODY, beginners are welcome.
          </p>
        </div>
        
        {/* Buttons - Booking Menu and More About Cheryl */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={BOOKING_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90" 
            style={{ backgroundColor: "#93C9F9" }}
          >
            Booking Menu
          </a>
          <Link 
            to="/about" 
            className="inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-[#93C9F9] border-2 border-[#93C9F9] bg-white transition-all hover:bg-[#93C9F9] hover:text-white"
          >
            More About Cheryl
          </Link>
        </div>
        
        <p className="mt-10 text-sm italic text-gray-500">
          Servicing North Coast • Ballito • Salt Rock • Sheffield • Surrounding Areas
        </p>
      </section>

      {/* ========== OUR SERVICES GRID SECTION ========== */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-gray-800">Our Services</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          {/* ROW 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {allServices.slice(0, 3).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {allServices.slice(3, 6).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allServices.slice(6, 9).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="px-6 py-20 text-center text-white" style={{ background: "linear-gradient(135deg, #93C9F9 0%, #65AEEA 100%)" }}>
        <h2 className="text-3xl md:text-4xl font-light">Sign up for a free trial class!</h2>
        
        {state.succeeded ? (
          <div className="mt-8 max-w-md mx-auto bg-green-500/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white">✓ Thanks! We'll contact you to schedule your free trial class.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" name="email" placeholder="Your email address" required className="flex-1 px-5 py-3 rounded-full text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white" disabled={state.submitting} />
            <ValidationError field="email" errors={state.errors} className="text-xs text-red-200 mt-1" />
            <button type="submit" disabled={state.submitting} className="px-8 py-3 rounded-full bg-white text-[#93C9F9] text-sm font-semibold uppercase tracking-wider transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
              {state.submitting ? "Sending..." : "Subscribe"}
            </button>
          </form>
        )}
        <ValidationError errors={state.errors} className="mt-3 text-sm text-red-200" />
      </section>

      {/* Testimonial Section */}
      <section className="bg-[#F9F9FB] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#93C9F9] fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-lg italic leading-relaxed text-gray-600">
            "I received a truly nurturing and nourishing treatment from Cheryl. She tuned into my body and what it needed, intuitively offering powerful and helpful messages. Her experience and confidence made me feel safe and in good hands. Highly recommended — not only as a yoga teacher, but for anyone seeking a caring, personalised healing experience."
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-widest text-gray-400">— Client, Ballito South Africa</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-white" style={{ backgroundColor: "#93C9F9" }}>
        <img src={logo} alt="" className="mx-auto h-20 w-auto brightness-0 invert" />
        <p className="mt-4 text-2xl font-light">Devahiti</p>
        <p className="mt-2 text-sm italic opacity-90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest opacity-80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
      </footer>
    </div>
  );
}