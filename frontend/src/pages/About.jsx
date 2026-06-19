import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import cherylPortraitImg from "../assets/images/about.jpg";
import privateImg from "../assets/images/private.jpg";
import soundImg from "../assets/images/img11.jpg";
import groupImg from "../assets/images/group.jpg";
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
    navigate("/services"); // ✅ CHANGED: Now goes to Services page
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

      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Devahiti Yoga" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-light md:text-6xl text-[#65AEEA]">About Devahiti</h1>
          <p className="mt-4 max-w-2xl text-lg italic md:text-xl text-white">
            "If you can breathe, you can do yoga."
          </p>
        </div>
      </section>

      {/* ========== ABOUT DEVAHITI SECTION ========== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">About Devahiti</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>
          
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p className="text-lg italic text-[#65AEEA] font-medium">
              "Here at Devahiti, we believe that if you can breathe, you can do Yoga."
            </p>
            
            <p>We understand how busy life is, causing tension and stress in both body and mind. Over time, we ignore this and accept the discomfort as the "norm", we forget how to let go and relax fully.</p>
            
            <p>I know firsthand how overwhelming life in South Africa can feel, however, I have personally experienced the deeply transformative aspects of Yoga that provide the necessary tools to navigate life with increased grace and ease.</p>
            
            <p>My passion is to help you reconnect with your body, mind and spirit through gentle, mindful movements, deeply restorative meditative practices, carefully curated to improve your wellbeing. I believe that everybody can benefit from slowing down, and making time for relaxing yoga and sound sessions. I strive to create a safe and supportive space for you to feel comfortable enough to just be.</p>
            
            <p>My approach, while steeped in science, is also intuitive, gentle, and always ready to meet you exactly where you are in each moment.</p>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/services"
              className="inline-block bg-[#65AEEA] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MY JOURNEY INTO YOGA / DEVAHITI ORIGIN ========== */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-light md:text-3xl text-[#65AEEA]">My Journey Into Yoga</h3>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>
          
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>Devahiti, or "Divine Order," was created out of a deep desire to integrate a lifetime of traditional yoga practice with ongoing research on body alignment techniques. Drawing from a rich foundation in Yoga, Somatic Psychology, Fascial Release, and Ayurveda, Devahiti facilitates balance, health, and homeostasis across the body-mind complex—both on and off the mat.</p>
            
            <p>Founded by Cheryl Lancellas and the late Ena During, Devahiti is the culmination of extensive training and diverse expertise in Somatic psychology, contemporary dance, traditional yoga, personal training, meditation, physical therapy, fascial release, massage, polarity therapy, Reiki, and pranic healing. This unique combination of modalities allows us to work intuitively with clients, addressing pain, limitations, and emotional blockages in a way that is both holistic and scientifically informed.</p>
            
            <p>At Devahiti, we believe in the power of scientifically backed intuition—combining ancient wisdom with modern research to achieve lasting transformation.</p>
            
            <p className="font-medium text-[#65AEEA]">Devahiti Yoga isn't just a practice—it's a complete system for well-being. Rooted in traditional disciplines, it embraces the latest advancements in yoga and healing arts. Whether you are looking to heal, deepen your personal practice or train to become a teacher, Devahiti provides a transformative space for growth, healing, and self-discovery.</p>
          </div>
        </div>
      </section>

      {/* ========== DISCOVERING SOUND RELAXATION ========== */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-light md:text-3xl mb-4 text-[#65AEEA]">Discovering Sound Relaxation</h3>
              <p className="text-gray-700 leading-relaxed">
                My first sound relaxation session was a revelation. The vibrations of the singing bowls seemed to reach places deep within me that words could not access. I left feeling lighter, calmer, and more connected to myself. Compelled to understand this healing modality more deeply, I trained in Sound Relaxation and Sound Bath facilitation, learning to work with singing bowls, gongs, and other therapeutic instruments. Now, I love sharing this powerful practice with others. When combined with gentle, mindful yoga, the experience becomes a truly immersive journey into deep rest and restoration—allowing the body and mind to release what they no longer need to carry.
              </p>
            </div>
            <img src={soundImg} alt="Sound healing" className="w-full rounded-lg shadow-lg object-cover h-80" />
          </div>
        </div>
      </section>

      {/* Finding Restorative Bodywork */}
<section className="bg-[#F9F9FB] py-20 px-6">
  <div className="mx-auto max-w-6xl">
    <div className="grid gap-12 md:grid-cols-2 md:items-center">
      <img src={groupImg} alt="Bodywork therapy" className="w-full rounded-lg shadow-lg object-cover h-80" />
      <div>
        <h3 className="text-2xl font-light md:text-3xl mb-4 text-[#65AEEA]">Finding Restorative Bodywork</h3>
        <p className="text-gray-700 leading-relaxed">
         My journey into bodywork began with massage training, then moved into the more subtle modality of reiki, which was followed by 5 years of studying Pranic healing, learning how to use the subtlest of all, energetic healing. These various modalities culminated into what is now referred to as 'Devahiti' bodywork. Here we use hands on to release fascial adhesion, gently encouraging the body to find homeostasis, releasing discomfort and physical pain. I also incorporate Sound Massage into my offerings, blending gentle therapeutic touch with the soothing vibrations of singing bowls. Whether through yoga, sound, or bodywork, my mission remains the same: to create a safe, nurturing space where you can unwind, reconnect, and restore your natural sense of wellbeing.
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
          <div className="w-20 h-px bg-[#65AEEA] mx-auto mb-6"></div>
          <h2 className="text-center text-3xl font-light md:text-4xl mb-12 text-[#65AEEA]">RESTORATIVE PACKAGES</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-[#65AEEA] rounded-xl shadow-md overflow-hidden group cursor-pointer text-white" onClick={() => navigate("/services")}>
              <div className="overflow-hidden">
                <img src={privateImg} alt="Private Yoga Experiences" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 text-white">Private Yoga Experiences</h3>
                <p className="text-white/90 text-sm mb-4">Group, couples or individual yoga sessions for stress relief.</p>
                <button className="inline-block bg-white text-[#65AEEA] px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="bg-[#65AEEA] rounded-xl shadow-md overflow-hidden group cursor-pointer text-white" onClick={() => navigate("/services")}>
              <div className="overflow-hidden">
                <img src={soundImg} alt="Yoga & Sound Relaxation" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 text-white">Yoga & Sound Relaxation Sessions</h3>
                <p className="text-white/90 text-sm mb-4">Gentle hatha yoga and sound relaxation packages.</p>
                <button className="inline-block bg-white text-[#65AEEA] px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="bg-[#65AEEA] rounded-xl shadow-md overflow-hidden group cursor-pointer text-white" onClick={() => navigate("/contact")}>
              <div className="overflow-hidden">
                <img src={groupImg} alt="Design Your Own Experience" className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-light mb-2 text-white">Design Your Own Experience</h3>
                <p className="text-white/90 text-sm mb-4">Work with me to create your own session to enhance your experience.</p>
                <button className="inline-block bg-white text-[#65AEEA] px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
                  ENQUIRE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Client Gratitude */}
      <section className="py-20 px-6" style={{ backgroundColor: "#65AEEA" }}>
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
            "I had the AMAZING experience of taking class with Cheryl while staying in Ballito and I can't say enough good things about it! One of Cheryl's strengths is curating a full experience within her classes by using relaxing sounds and essential oils. After each practice I felt fully relaxed and calm. Cheryl takes great care and keeps everyone safe and protected against injury or strain in her classes while still getting a good stretch in. This is such a refreshing approach and helped me recover from many stressful days. Thanks Cheryl for a great experience!"
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-white/80">~ Eva Peterson</p>
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