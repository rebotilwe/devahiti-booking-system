import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Gift, Sparkles, Heart, Mail, Waves, Users, Music } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/giftss.jpg";
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
  { label: "Retreats", path: "/services/retreats" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

// ✅ Gift Card Options - Updated with correct prices
const giftCardOptions = [
  {
    id: "private-session",
    title: "Private Yoga Session",
    description: "A personalised 1-on-1 yoga session tailored to the recipient's body and goals.",
    price: "R550",
    priceAmount: 550,
    icon: Heart,
    popular: true,
    serviceId: "private-sessions"
  },
  {
    id: "sound-massage",
    title: "Sound Massage",
    description: "Therapeutic sound healing with singing bowls placed directly on and around the body.",
    price: "R600",
    priceAmount: 600,
    icon: Waves,
    popular: false,
    serviceId: "sound-massage"
  },
  {
    id: "sound-journey",
    title: "Sound Journey",
    description: "Immersive sound healing experience using singing bowls and therapeutic sound.",
    price: "R800",
    priceAmount: 800,
    icon: Music,
    popular: false,
    serviceId: "sound-journey"
  },
  {
    id: "group-class",
    title: "Group Class Package",
    description: "5 x Group Yoga Classes. Perfect for someone who loves community practice.",
    price: "R650",
    priceAmount: 650,
    icon: Users,
    popular: false,
    serviceId: "group-class"
  },
  {
    id: "corporate-group",
    title: "Corporate / Private Group",
    description: "A private group yoga session for up to 8 people. Perfect for corporate wellness or group gatherings.",
    price: "R1,600",
    priceAmount: 1600,
    icon: Users,
    popular: false,
    serviceId: "corporate-wellness"
  }
];

export default function GiftCard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

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

  // ✅ Handle gift card purchase with correct price
  const handlePurchase = (giftOption) => {
    // Extract the numeric price (remove 'R' and any spaces/commas)
    const priceAmount = parseInt(giftOption.price.replace('R', '').replace(',', '').trim());
    
    navigate("/checkout", { 
      state: { 
        giftCard: true,
        service: {
          id: giftOption.serviceId,
          title: giftOption.title,
          price: giftOption.price,
          priceAmount: priceAmount,
          description: giftOption.description
        },
        booking: {
          service_type: giftOption.serviceId,
          total_price: priceAmount,
          participants: 1,
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          customer_address: "",
          notes: `Gift Card: ${giftOption.title}`
        }
      } 
    });
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
              <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#65AEEA]">
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

        {/* Our Services Button */}
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
        src={heroBgImg} 
        alt="Devahiti Gift Card" 
        className="w-full h-full object-cover object-center"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gift className="h-5 w-5 text-white/80" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/80">Give the gift of wellness</span>
          <Gift className="h-5 w-5 text-white/80" />
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white drop-shadow-lg">Gift Cards</h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl drop-shadow">
          Share the healing power of yoga, sound, and stillness
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Gift Card Options */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">Choose a Gift Experience</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Give the gift of wellness with a Devahiti experience. Perfect for birthdays, holidays, or simply because someone deserves to slow down.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCardOptions.map((option) => (
              <div 
                key={option.id} 
                className={`bg-white border-2 rounded-2xl p-6 text-center transition-all hover:shadow-xl relative ${
                  option.popular ? 'border-[#65AEEA]' : 'border-gray-100 hover:border-[#65AEEA]/50'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#65AEEA] text-white text-xs font-bold px-4 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <div className="w-16 h-16 mx-auto rounded-full bg-[#65AEEA]/10 flex items-center justify-center mb-4">
                  <option.icon className="h-8 w-8 text-[#65AEEA]" />
                </div>
                <h3 className="text-xl font-light text-[#65AEEA]">{option.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{option.price}</p>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{option.description}</p>
                
                <button 
                  onClick={() => handlePurchase(option)} 
                  className="mt-6 w-full py-2.5 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA] mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[#65AEEA] text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold text-gray-800 mb-2">Choose your experience</h3>
              <p className="text-sm text-gray-500">Select from our service-based gift card options</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[#65AEEA] text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold text-gray-800 mb-2">Purchase instantly</h3>
              <p className="text-sm text-gray-500">No need to select date, time, or venue upfront</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full bg-[#65AEEA] text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold text-gray-800 mb-2">We deliver</h3>
              <p className="text-sm text-gray-500">Digital gift card delivered via email. Scheduling arranged after purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Give the gift of stillness</h2>
        <p className="text-white/90 text-sm mt-2 max-w-xl mx-auto">
          A Devahiti gift card is the perfect way to show someone you care
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button onClick={() => navigate("/services")} className="px-8 py-3 bg-white text-[#65AEEA] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
            Browse All Services
          </button>
          <button onClick={() => navigate("/contact")} className="px-8 py-3 border-2 border-white text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition">
            Contact Us
          </button>
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