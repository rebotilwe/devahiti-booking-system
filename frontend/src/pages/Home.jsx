import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Star, Quote } from "lucide-react";
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

// 9 services - Grouped into 3 rows of 3
const allServices = [
  { img: groupImg, title: "Group Class", link: "/services/group-class" },
  { img: privateImg, title: "Private Sessions", link: "/services/private-sessions" },
  { img: corporateImg, title: "Corporate Wellness", link: "/services/corporate-wellness" },
  { img: soundImg, title: "Sound Journey", link: "/services/sound-journey" },
  { img: soundMassageImg, title: "Sound Massage", link: "/services/sound-massage" },
  { img: fasciaReleaseImg, title: "Fascia Release Therapy", link: "/services/fascia-release" },
  { img: trainingImg, title: "Teacher Training", link: "/services/teacher-training" },
  { img: educationalWorkshopImg, title: "Educational Workshops", link: "/services/educational-workshops" },
  { img: retreatsImg, title: "Retreats / Safaris", link: "/services/retreats" },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Noelle van S.",
    location: "Ballito, South Africa",
    rating: 5,
    text: "Wow wow wow! If you're looking for an all in one yoga flow, Devahiti Studio is the place to go! The instructor is so in tune and so present in helping you flow. This was easily my best yoga practice and I highly recommend you give it a go. From yoga, to a gentle meditation and a powerful breath-work session, I left feeling grounded and firmly in my truth.",
    date: "1 year ago"
  },
  {
    id: 2,
    name: "Elize R.",
    location: "North Coast",
    rating: 5,
    text: "Cheryl's individualistic and inspiring instructions are what help me connect with my body and mind immediately. She guides from the inside out making her yoga style a sensory experience. Whenever she's offered personal suggestions it's an insight into the depth of her anatomy and movement knowledge.",
    date: "3 months ago"
  },
{
  id: 5,
  name: "Marrion Clarke",
  location: "Ballito, South Africa",
  rating: 5,
  text: "Devahiti Studio has become a home away from home. As their slogan goes: 'not your average studio' – There is certainly nothing average about the owner & founder Cheryl Lancellas & the wildly passionate teachers she surrounds herself with in this space. Not just a studio, it's a community of like-minded humans that encourage & lift each other higher with each gathering.",
  date: "Google Review"
},
  {
    id: 4,
    name: "Cindy C.",
    location: "Salt Rock",
    rating: 5,
    text: "Devahiti has changed my life! Cheryl's guidance has literally shifted my entire paradigm to being more mindful, present, strong and at peace. The Therapeutic Movement classes are absolutely incredible resulting in healing.",
    date: "1 year ago"
  }
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

function TestimonialCard({ testimonial, index }) {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#93C9F9]/30 h-full flex flex-col ${
        index === 0 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="mb-4">
        <Quote className="h-8 w-8 text-[#93C9F9]/30" />
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#93C9F9] text-[#93C9F9]" />
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed mb-5 flex-grow">
        "{testimonial.text}"
      </p>
      <div className="border-t border-gray-100 pt-4 mt-2">
        <p className="font-semibold text-gray-800">{testimonial.name}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-400">{testimonial.location}</p>
          <p className="text-xs text-gray-400">{testimonial.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
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
    navigate("/services"); // ✅ CHANGED: Now goes to Services page instead of external booking URL
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

        {/* Our Services Button */}
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
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#93C9F9] text-[#93C9F9] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#93C9F9] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Banner Section */}
      <section className="w-full">
        <div className="relative w-full h-[40vh] min-h-[300px] md:h-[50vh]">
          <img 
            src={heroBgImg} 
            alt="Devahiti Yoga" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Hero Title Section */}
      <section className="relative py-16 px-6 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-light text-white">
            Private, Group Yoga &amp; Sound Relaxation
          </h1>
          <p className="mt-4 text-xl text-white/90">
            Your space or ours
          </p>
          <Link 
            to="/services"
            className="mt-8 inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-[#93C9F9] bg-white transition-all hover:scale-105"
          >
            Booking Menu
          </Link>
        </div>
        
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Hi I'm Cheryl Section */}
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
        
        <div className="mt-10">
          <p className="text-base leading-relaxed text-gray-600">
            Unwind with family and friends, allow gentle movement to reduce stress and tension, followed by a nurturing sound bath – leaving you feeling relaxed and rejuvenated.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Sessions are for every BODY, beginners are welcome.
          </p>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/services"
            className="inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90" 
            style={{ backgroundColor: "#93C9F9" }}
          >
            BOOKING MENU
          </Link>
          <Link 
            to="/about" 
            className="inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-[#93C9F9] border-2 border-[#93C9F9] bg-white transition-all hover:bg-[#93C9F9] hover:text-white"
          >
            MORE ABOUT CHERYL
          </Link>
        </div>
        
        <p className="mt-10 text-sm italic text-gray-500">
          *Serving North Coast • Ballito • Salt Rock • Sheffield • Surrounding Area*
        </p>
      </section>

      {/* Our Services CTA Section */}
      <section className="py-16 px-6 text-center bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-light md:text-4xl text-gray-800">Our Services</h2>
          <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 mb-8">
            Explore our full range of yoga, sound healing, and wellness offerings. From group classes to private sessions, corporate wellness to teacher training — find the practice that speaks to you.
          </p>
          <Link 
            to="/services"
            className="inline-block rounded-full px-10 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#93C9F9" }}
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-gray-800">Our Offerings</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {allServices.slice(0, 3).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {allServices.slice(3, 6).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allServices.slice(6, 9).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#93C9F9] text-[#93C9F9]" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-800">
              What Our Clients Say
            </h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4 mb-4" />
            <p className="text-gray-500 max-w-2xl mx-auto">
              Real stories from real people who have experienced the Devahiti difference
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={idx} />
            ))}
          </div>

          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <Quote className="h-8 w-8 text-[#93C9F9]/30 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#93C9F9] text-[#93C9F9]" />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                        "{testimonial.text}"
                      </p>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === idx ? "w-8 bg-[#93C9F9]" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-[#F9F9FB] rounded-full px-4 py-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#93C9F9] text-[#93C9F9]" />
                ))}
              </div>
              <span className="text-xs text-gray-600">5.0 rating · 19+ reviews</span>
            </div>
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

      {/* Footer */}
      <footer className="px-6 py-12 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <img src={logo} alt="Devahiti Yoga" className="mx-auto h-20 w-auto" />
        <p className="mt-4 text-2xl font-light text-white">Devahiti</p>
        <p className="mt-2 text-sm italic text-white/90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest text-white/80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
      </footer>
    </div>
  );
}