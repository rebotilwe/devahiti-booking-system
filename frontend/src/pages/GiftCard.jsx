import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Gift, Sparkles, Heart, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import logo from "../assets/devahiti.png";

// ✅ UPDATED NAVIGATION
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Teacher Training", path: "/teacher-training" },
  { label: "Retreats", path: "/retreats" },
  { label: "Class Schedule", path: "/schedule" },
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
  { label: "Teacher Training", path: "/services/teacher-training" },
  { label: "Educational Workshops", path: "/services/educational-workshops" },
  { label: "Retreats", path: "/services/retreats" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

export default function GiftCard() {
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
              <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Our Services Button */}
        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#93C9F9" }}>
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
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
              Our Services
            </button>
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#93C9F9] text-[#93C9F9] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#93C9F9] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Devahiti Gift Card" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Gift className="h-5 w-5 text-white/80" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/80">Give the gift of wellness</span>
            <Gift className="h-5 w-5 text-white/80" />
          </div>
          <h1 className="text-5xl font-light md:text-6xl text-white">Gift Cards</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            Share the healing power of yoga, sound, and stillness
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Gift Card Options */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">Choose an amount</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Perfect for birthdays, holidays, or simply because someone deserves to slow down
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Option 1 */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:border-[#93C9F9] hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#93C9F9]/10 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-[#93C9F9]" />
              </div>
              <h3 className="text-3xl font-light text-[#93C9F9]">R650</h3>
              <p className="text-gray-500 text-sm mt-2">Private Yoga Session</p>
              <p className="text-gray-600 text-sm mt-4">One 60-minute private yoga session, personalized for the recipient</p>
              <button onClick={() => navigate("/contact")} className="mt-6 w-full py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
                Enquire
              </button>
            </div>

            {/* Option 2 */}
            <div className="bg-white border-2 border-[#93C9F9] rounded-2xl p-8 text-center hover:shadow-xl transition-all relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#93C9F9] text-white text-xs font-bold px-4 py-1 rounded-full">
                Popular
              </div>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#93C9F9]/10 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-[#93C9F9]" />
              </div>
              <h3 className="text-3xl font-light text-[#93C9F9]">R1,300</h3>
              <p className="text-gray-500 text-sm mt-2">2 x Private Sessions</p>
              <p className="text-gray-600 text-sm mt-4">Two 60-minute sessions — a beautiful mini-journey</p>
              <button onClick={() => navigate("/contact")} className="mt-6 w-full py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
                Enquire
              </button>
            </div>

            {/* Option 3 */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 text-center hover:border-[#93C9F9] hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#93C9F9]/10 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-[#93C9F9]" />
              </div>
              <h3 className="text-3xl font-light text-[#93C9F9]">Custom</h3>
              <p className="text-gray-500 text-sm mt-2">Any amount you choose</p>
              <p className="text-gray-600 text-sm mt-4">Tailored to group sessions, sound journeys, or a series of classes</p>
              <button onClick={() => navigate("/contact")} className="mt-6 w-full py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
                Enquire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9] mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[#93C9F9] text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold text-gray-800 mb-2">Choose your amount</h3>
              <p className="text-sm text-gray-500">Select from our packages or request a custom value</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[#93C9F9] text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold text-gray-800 mb-2">Contact us</h3>
              <p className="text-sm text-gray-500">Email us with recipient name and your message</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[#93C9F9] text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold text-gray-800 mb-2">We deliver</h3>
              <p className="text-sm text-gray-500">Digital gift card delivered via email within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Give the gift of stillness</h2>
        <p className="text-white/90 text-sm mt-2 max-w-xl mx-auto">
          A Devahiti gift card is the perfect way to show someone you care
        </p>
        <button onClick={() => navigate("/contact")} className="mt-6 px-8 py-3 bg-white text-[#93C9F9] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
          Contact Us
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