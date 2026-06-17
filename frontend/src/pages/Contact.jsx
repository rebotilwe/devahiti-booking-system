import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import heroBgImg from "../assets/images/home.jpg";
import logo from "../assets/devahiti.png";

// ✅ UPDATED NAVIGATION (matching other pages)
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
  { label: "Fascial Release", path: "/services/fascia-release" },
  { label: "Teacher Training", path: "/services/teacher-training" },
  { label: "Retreats", path: "/services/retreats" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";
const FORMSPREE_ID = "xyklpvwn";

export default function Contact() {
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
      <section className="relative h-[40vh] min-h-[350px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Devahiti Contact" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Say hello</p>
          <h1 className="text-5xl font-light md:text-6xl text-white">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90 italic">
            I'd love to hear from you. Let's craft a session that feels just right.
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Contact Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Info Side */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-light md:text-4xl text-gray-800">Reach out</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              Whether you're planning a group getaway, a private session, or simply wanting a one-on-one treatment — drop me a message and I'll be in touch within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#65AEEA] text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Email</p>
                  <a href="mailto:cheryl@devahiti.com" className="text-lg text-[#65AEEA] hover:underline">
                    cheryl@devahiti.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#65AEEA] text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Phone / WhatsApp</p>
                  <a href="tel:+27840902083" className="text-lg text-[#65AEEA] hover:underline">
                    084 090 2083
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#65AEEA] text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Service area</p>
                  <p className="text-lg text-gray-700">
                    Ballito, Salt Rock, Umhlanga &amp; surrounding North Coast
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#65AEEA] text-white">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Hours</p>
                  <p className="text-lg text-gray-700">Tuesday & Thursday · 8:00 AM</p>
                  <p className="text-sm text-gray-500">Other times by appointment</p>
                </div>
              </div>
            </div>

            <Link
              to="/services"
              className="mt-10 inline-block rounded-full px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#4A9FD9] transition"
            >
              Book Now
            </Link>
          </div>

          {/* Form Side */}
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-[#F9F9FB] p-8 shadow-md md:p-10">
              <h2 className="text-3xl font-light text-gray-800">Send a message</h2>
              <p className="mt-2 text-sm text-gray-500">
                Tell me a little about what you're after — group size, dates, what you'd love to experience.
              </p>

              {state.succeeded ? (
                <div className="mt-6 rounded-xl border border-[#65AEEA] bg-[#65AEEA]/10 px-5 py-4 text-sm text-[#65AEEA]">
                  Thank you! Your message has been sent. I'll be in touch soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500">Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#65AEEA] focus:ring-1 focus:ring-[#65AEEA]"
                        required
                      />
                      <ValidationError 
                        field="name" 
                        errors={state.errors} 
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#65AEEA] focus:ring-1 focus:ring-[#65AEEA]"
                        required
                      />
                      <ValidationError 
                        field="email" 
                        errors={state.errors} 
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500">Phone (optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#65AEEA] focus:ring-1 focus:ring-[#65AEEA]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500">I'm interested in</label>
                      <select
                        name="subject"
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#65AEEA] focus:ring-1 focus:ring-[#65AEEA]"
                      >
                        <option>Private group yoga</option>
                        <option>Sound journey</option>
                        <option>Corporate wellness</option>
                        <option>Teacher training</option>
                        <option>Workshop / retreat enquiry</option>
                        <option>Gift card</option>
                        <option>Something else</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#65AEEA] focus:ring-1 focus:ring-[#65AEEA]"
                      required
                    />
                    <ValidationError 
                      field="message" 
                      errors={state.errors} 
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex items-center gap-2 rounded-full px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#4A9FD9] transition disabled:opacity-50"
                  >
                    {state.submitting ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ UPDATED FAQ Section */}
      <section className="bg-[#F9F9FB] px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-light md:text-4xl text-gray-800">A few common questions</h2>
          <div className="mt-10 space-y-4">
            {[
              { q: "Do I need to be flexible or experienced?", a: "Not at all. Every session is gentle and adaptable. Beginners and stiff bodies are warmly welcomed." },
              { q: "Do you bring all the equipment?", a: "Yes — mats, bolsters, blankets, and sound bowls all travel with me. You just turn up." },
              { q: "How far do you travel?", a: "There are no limitations to how far we travel. However, for locations outside of Ballito, Salt Rock, Umhlanga, and the surrounding North Coast areas, an additional travel fee may apply." },
              { q: "What's the minimum group size?", a: "There is no minimum group size requirement. However, a minimum/basic fee will apply regardless of group size." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-xl bg-white p-6 shadow-sm">
                <summary className="cursor-pointer list-none text-lg font-medium text-gray-800">
                  <span className="text-[#65AEEA] mr-2">+</span> {faq.q}
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600 pl-5">{faq.a}</p>
              </details>
            ))}
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