import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import cherylPortraitImg from "../assets/images/about.jpg";
import privateImg from "../assets/images/private.jpg";
import soundImg from "../assets/images/img11.jpg";
import groupImg from "../assets/images/group.jpg";
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
  { label: "Private Group Packages", path: "/services/private-sessions" },
  { label: "Sound Bowl Massage", path: "/services/sound-massage" },
  { label: "Bowen Therapy", path: "/services/bowen-therapy" },
  { label: "Weekly Yoga", path: "/services/group-class" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

export default function About() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar - Fixed with scroll effect */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePhoneClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleShoppingBagClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Book Online"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Sub Navbar - Second Navigation Bar */}
        <div style={{ backgroundColor: "#93C9F9" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-3">
            {subNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#93C9F9] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-xs text-gray-500 hover:text-[#93C9F9]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => {
                handleShoppingBagClick();
                setMobileOpen(false);
              }}
              className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition"
            >
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Devahiti Yoga" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-light md:text-6xl text-[#93C9F9]">About Devahiti</h1>
          <p className="mt-4 max-w-2xl text-lg italic md:text-xl text-white">
            "I strive to encourage those who think 'they can't do yoga' to become those who can. If you can breathe, you can do yoga!"
          </p>
        </div>
      </section>

      {/* Content Section 1 - Bio with image on right */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">Devahiti Ballito ~ Cheryl Lancellas</h2>
              <div className="mt-6 space-y-4 text-[#93C9F9] leading-relaxed">
                <p>Life is busy. We carry tension in our bodies and stress in our minds, often without even noticing. Over time, that weight builds up, and we forget what it feels like to truly let go.</p>
                <p>My passion is to help you reconnect with yourself through gentle, mindful movement and deeply restorative sound relaxation. I believe that everyBODY can benefit from slowing down, and I strive to create a space where you can feel safe, supported, and free to just be.</p>
                <p>I was born and raised in South Africa, and I know firsthand how overwhelming life can feel. I also know how transformative it can be when we give ourselves permission to pause, breathe, and heal.</p>
                <p>My approach is gentle, intuitive, and always welcoming. Whether you're completely new to yoga or returning after a long break, my sessions are designed to meet you exactly where you are.</p>
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="mt-8 inline-block bg-[#93C9F9] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#65AEEA] transition">
                BOOK NOW
              </a>
            </div>
            <img src={cherylPortraitImg} alt="Cheryl Lancellas - Devahiti Yoga" className="w-full rounded-lg shadow-lg object-cover" />
          </div>
        </div>
      </section>

      {/* My Journey Into Yoga - Image on left */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <img src={privateImg} alt="Yoga practice" className="w-full rounded-lg shadow-lg object-cover h-80" />
            <div>
              <h3 className="text-2xl font-light md:text-3xl mb-4 text-[#93C9F9]">My Journey Into Yoga</h3>
              <p className="text-[#93C9F9] leading-relaxed">
                My own journey into yoga began as a search for a gentle way to heal and rebuild strength. What I found went far beyond physical recovery. I completed my Yoga Teacher Training and soon discovered a deep love for sharing the practice with others. My teaching style is influenced by Hatha, Yin, and Restorative Yoga, with a strong focus on breath awareness and mindfulness. I love working with beginners and those who feel intimidated by traditional yoga classes, offering a gentle, supportive approach that honours each individual's body and needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discovering Sound Relaxation - Image on right */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-light md:text-3xl mb-4 text-[#93C9F9]">Discovering Sound Relaxation</h3>
              <p className="text-[#93C9F9] leading-relaxed">
                I attended a sound relaxation session and the experience was profoundly moving. I felt tension melt away in ways I had never experienced before, and I knew I had to learn more. I trained in Sound Relaxation and Sound Bath facilitation, learning to work with singing bowls, gongs, and other therapeutic instruments. Combining sound with gentle yoga creates a truly unique and powerful experience that allows deep rest and restoration on every level.
              </p>
            </div>
            <img src={soundImg} alt="Sound healing" className="w-full rounded-lg shadow-lg object-cover h-80" />
          </div>
        </div>
      </section>

      {/* Finding Restorative Bodywork - Image on left */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <img src={groupImg} alt="Bodywork therapy" className="w-full rounded-lg shadow-lg object-cover h-80" />
            <div>
              <h3 className="text-2xl font-light md:text-3xl mb-4 text-[#93C9F9]">Finding Restorative Bodywork</h3>
              <p className="text-[#93C9F9] leading-relaxed">
                My journey into bodywork began when I discovered Fascia Release Therapy, a gentle technique that helps the body reset and heal itself. I also incorporate Sound Massage into my offerings, blending gentle therapeutic touch with the soothing vibrations of singing bowls. Whether through yoga, sound, or bodywork, my mission remains the same: to create a safe, nurturing space where you can unwind, reconnect, and restore your natural sense of wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restorative Packages */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Devahiti" className="h-12 w-auto" />
          </div>
          <div className="w-20 h-px bg-[#93C9F9] mx-auto mb-6"></div>
          <h2 className="text-center text-3xl font-light md:text-4xl mb-12 text-[#93C9F9]">RESTORATIVE PACKAGES</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-[#93C9F9] rounded-xl shadow-md overflow-hidden group cursor-pointer text-white" onClick={() => window.open(BOOKING_URL, "_blank")}>
              <div className="overflow-hidden">
                <img src={privateImg} alt="Private Yoga Experiences" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 text-white">Private Yoga Experiences</h3>
                <p className="text-white/90 text-sm mb-4">Group, couples or individual yoga sessions for stress relief.</p>
                <button className="inline-block bg-white text-[#93C9F9] px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="bg-[#93C9F9] rounded-xl shadow-md overflow-hidden group cursor-pointer text-white" onClick={() => window.open(BOOKING_URL, "_blank")}>
              <div className="overflow-hidden">
                <img src={soundImg} alt="Yoga & Sound Relaxation" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 text-white">Yoga & Sound Relaxation Sessions</h3>
                <p className="text-white/90 text-sm mb-4">Gentle hatha yoga and sound relaxation packages.</p>
                <button className="inline-block bg-white text-[#93C9F9] px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="bg-[#93C9F9] rounded-xl shadow-md overflow-hidden group cursor-pointer text-white" onClick={() => navigate("/contact")}>
              <div className="overflow-hidden">
                <img src={groupImg} alt="Design Your Own Experience" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 text-white">Design Your Own Experience</h3>
                <p className="text-white/90 text-sm mb-4">Work with me to create your own session to enhance your experience.</p>
                <button className="inline-block bg-white text-[#93C9F9] px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
                  ENQUIRE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#93C9F9] py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-light md:text-4xl mb-8 text-white">Client Gratitude</h2>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-lg italic leading-relaxed text-white">
            "I had the AMAZING experience of taking class with Cheryl while staying in Ballito and I can't say enough good things about it! One of Cheryl's strengths is curating a full experience within her classes by using relaxing sounds and smells. After each practice I felt fully relaxed and calm. Cheryl takes great care and keeps everyone safe and protected against injury or strain in her classes while still getting a good stretch in. This is such a refreshing approach and helped me recover from many stressful days. Thanks Cheryl for a great experience!"
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-white/80">~ Eva Peterson</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-white" style={{ backgroundColor: "#93C9F9" }}>
        <img src={logo} alt="" className="mx-auto h-12 w-auto brightness-0 invert" />
        <p className="mt-4 text-2xl font-light">Devahiti</p>
        <p className="mt-2 text-sm italic opacity-90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest opacity-80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
      </footer>
    </div>
  );
}