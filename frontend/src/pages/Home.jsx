import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import heroBgImg from "../assets/images/homee.jpg";
import cherylPortraitImg from "../assets/images/about1.jpeg";
import privateImg from "../assets/images/privates.jpg";
import soundImg from "../assets/images/relaxation.png";
import trainingImg from "../assets/images/teachers.jpg";
import groupImg from "../assets/images/couples.png";
import corporateImg from "../assets/images/people.jpg";
import soundMassageImg from "../assets/images/specialize.jpg";
import retreatsImg from "../assets/images/retreats.jpg";
import fasciaReleaseImg from "../assets/images/fascia.jpg";
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

// 8 services - Removed Educational Workshops
const allServices = [
  { img: groupImg, title: "Group Class", link: "/services/group-class" },
  { img: privateImg, title: "Private Sessions", link: "/services/private-sessions" },
  { img: corporateImg, title: "Corporate Wellness", link: "/services/corporate-wellness" },
  { img: soundImg, title: "Sound Journey", link: "/services/sound-journey" },
  { img: soundMassageImg, title: "Sound Massage", link: "/services/sound-massage" },
  { img: fasciaReleaseImg, title: "Fascial Release Therapy", link: "/services/fascia-release" },
  { img: trainingImg, title: "Teacher Training", link: "/services/teacher-training" },
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
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 text-center text-lg font-light text-gray-800">{title}</h3>
      <button
        onClick={(e) => { e.stopPropagation(); navigate(link); }}
        className="mt-2 w-full text-center text-[10px] font-semibold uppercase tracking-wider text-[#65AEEA] hover:underline"
      >
        Read More
      </button>
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#65AEEA]/30 h-full flex flex-col ${
        index === 0 ? "md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="mb-4">
        <Quote className="h-8 w-8 text-[#65AEEA]/30" />
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#65AEEA] text-[#65AEEA]" />
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
    navigate("/services");
  };

  return (
    <div className="min-h-screen bg-white">
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
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Call us">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Book Online">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
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

      {/* ✅ Reduced spacer height on mobile */}
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

      {/* Banner Section - ✅ FIXED for wide screens */}
      <section className="w-full">
        <div className="relative w-full h-[35vh] min-h-[250px] md:h-[50vh] max-h-[600px] overflow-hidden">
          <img 
            src={heroBgImg} 
            alt="Devahiti Yoga" 
            className="w-full h-full object-cover object-center"
            style={{ maxWidth: '100%' }}
          />
          {/* Optional: Add a gradient overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </section>

      {/* Hero Title Section */}
      <section className="relative py-12 sm:py-16 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
            Private, Group Yoga &amp; Sound Relaxation
          </h1>
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-white/90">
            Your space or ours
          </p>
          <Link 
            to="/services"
            className="mt-6 sm:mt-8 inline-block rounded-full px-8 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#65AEEA] bg-white transition-all hover:scale-105"
          >
            Booking Menu
          </Link>
        </div>
        
       <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none">
  <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
</svg>
      </section>

      {/* Hi I'm Cheryl Section */}
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16 text-center">
        <img 
          src={cherylPortraitImg} 
          alt="Portrait of Cheryl" 
          className="mx-auto h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover shadow-lg" 
          loading="lazy" 
        />
        <h2 className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl font-light">Hi, I'm Cheryl!</h2>
        <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-gray-600">
            Based in Ballito, I specialise in private, group, corporate yoga and sound relaxation sessions — in studio or in the comfort of your own accommodation.
        </p>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
          I know how life can get so full that we forget what it feels like to truly unwind, reconnect and simply breathe again.
        </p>
        
        <div className="mt-8 sm:mt-10">
          <p className="text-sm sm:text-base leading-relaxed text-gray-600">
            Unwind with family and friends, allow gentle movement to reduce stress and tension, followed by a nurturing sound bath – leaving you feeling relaxed and rejuvenated.
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
            Sessions are for everyBODY, beginners are welcome.
          </p>
        </div>
        
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link 
            to="/services"
            className="inline-block rounded-full px-8 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90 w-full sm:w-auto" 
            style={{ backgroundColor: "#65AEEA" }}
          >
            BOOKING MENU
          </Link>
          <Link 
            to="/about" 
            className="inline-block rounded-full px-8 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#65AEEA] border-2 border-[#65AEEA] bg-white transition-all hover:bg-[#65AEEA] hover:text-white w-full sm:w-auto"
          >
            MORE ABOUT CHERYL
          </Link>
        </div>
        
        <p className="mt-8 sm:mt-10 text-xs sm:text-sm italic text-gray-500">
          *Serving North Coast • Ballito • Salt Rock • Sheffield • Surrounding Area*
        </p>
      </section>

      {/* Our Services CTA Section */}
      <section className="py-12 sm:py-16 px-6 text-center bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">Our Services</h2>
          <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4 mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Explore our full range of yoga, sound healing, and wellness offerings. From group classes to private sessions, corporate wellness to teacher training — find the practice that speaks to you.
          </p>
          <Link 
            to="/services"
            className="inline-block rounded-full px-8 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#65AEEA" }}
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="bg-[#F9F9FB] py-16 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">Our Offerings</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
            {allServices.slice(0, 3).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
            {allServices.slice(3, 6).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {allServices.slice(6, 8).map((service, idx) => (
              <ServiceCard key={idx} {...service} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#65AEEA] text-[#65AEEA]" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800">
              What Our Clients Say
            </h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4 mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
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
                      <Quote className="h-8 w-8 text-[#65AEEA]/30 mb-4" />
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#65AEEA] text-[#65AEEA]" />
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
                    activeTestimonial === idx ? "w-8 bg-[#65AEEA]" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <div className="inline-flex items-center gap-2 bg-[#F9F9FB] rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#65AEEA] text-[#65AEEA]" />
                ))}
              </div>
              <span className="text-xs text-gray-600">5.0 rating · 19+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 text-center text-white" style={{ background: "linear-gradient(135deg, #65AEEA 0%, #4A9FD9 100%)" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">Sign up for a free trial class!</h2>
        
        {state.succeeded ? (
          <div className="mt-6 sm:mt-8 max-w-md mx-auto bg-green-500/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white text-sm sm:text-base">✓ Thanks! We'll contact you to schedule your free trial class.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" name="email" placeholder="Your email address" required className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base" disabled={state.submitting} />
            <ValidationError field="email" errors={state.errors} className="text-xs text-red-200 mt-1" />
            <button type="submit" disabled={state.submitting} className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-[#65AEEA] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
              {state.submitting ? "Sending..." : "Subscribe"}
            </button>
          </form>
        )}
        <ValidationError errors={state.errors} className="mt-3 text-sm text-red-200" />
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-10 sm:py-12 text-center text-white" style={{ backgroundColor: "#65AEEA" }}>
        <img src={logo} alt="Devahiti Yoga" className="mx-auto h-16 sm:h-20 w-auto" />
        <p className="mt-3 sm:mt-4 text-xl sm:text-2xl font-light text-white">Devahiti</p>
        <p className="mt-2 text-xs sm:text-sm italic text-white/90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-5 sm:mt-6 text-[10px] sm:text-xs uppercase tracking-widest text-white/80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
        <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-white/60">
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