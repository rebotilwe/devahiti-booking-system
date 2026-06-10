import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, ArrowRight, Waves, Phone, ShoppingBag, Menu, X, Calendar, CheckCircle, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { services } from "../data/services";
import logo from "../assets/devahiti.png";
import heroBgImg from "../assets/images/home.jpg";

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

// ✅ UPDATED TEACHER TRAINING DATA (from client's website)
const teacherTrainingData = {
  startDate: "May 2026",
  schedule: "One full weekend per month | Saturdays & Sundays 9:30am - 2:30pm",
  duration: "12 months | 11 Modules",
  investment: "R2,800 per month (for 12 months)",
  maxStudents: "Maximum 10 participants",
  whyChoose: [
    "New Research – Explore the latest research in fascia, pain management, skeletal alignment, and therapeutic practices",
    "Comprehensive Course Material – Gain an advanced understanding of yoga, from philosophy to functional anatomy, somatic psychology to Ayurveda",
    "Hands-On Learning – Master the exclusive Devahiti hands-on bodywork technique for pain management, fascial release, and skeletal alignment",
    "Affordable & Accessible – No exams, no large upfront costs. Monthly workshop fee of R2,800 for 12 months"
  ],
  modules: [
    { name: "Anatomy of Energy", description: "The relationship between energy and health, quantum physics, koshas" },
    { name: "Yoga & Somatic Psychology", description: "Intention setting, working within the framework of the Eight Limbs of Yoga, Samkhya" },
    { name: "Advanced Anatomy & Physiology", description: "Functional fitness, digestive health, intermittent fasting, ketosis & autophagy" },
    { name: "Advanced Fascia Studies", description: "The latest research and applications in yoga" },
    { name: "Advanced Pranayama and Activational breathing techniques", description: "Mudras, bandhas, kumbhaka, chakras, mantras & meditation" },
    { name: "Advanced Ayurveda", description: "The impact of doshas, gunas, five pranas, 14 major nadis, and the secrets of alchemy" },
    { name: "Specialized Training", description: "Yin, prenatal yoga, yoga for children and special needs groups" },
    { name: "The art of retreating", description: "Learn how to plan and host transformative retreats" },
    { name: "Devahiti Hands-On Bodywork", description: "Learn hands-on techniques to supplement your income" }
  ],
  requirements: "Valid 200-hour yoga teacher training certification required. All workshops need to be attended for certification and all assignments must be completed within the allocated time."
};

export default function ServiceDetail() {
  const { slug } = useParams();
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

  const service = services.find((s) => s.slug === slug);
  const isTeacherTraining = slug === "teacher-training";

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Service not found</h1>
          <Link to="/services" className="text-[#65AEEA] hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const handleBook = () => {
    const safeService = {
      id: service.id,
      slug: service.slug,
      title: service.title,
      category: service.category,
      duration: service.duration,
      price: service.price,
      priceAmount: service.priceAmount,
      location: service.location,
      capacity: service.capacity,
      bookingType: service.bookingType,
    };

    if (service.bookingType === "enquire") {
      navigate("/contact");
    } else {
      navigate("/schedule", { state: { service: safeService } });
    }
  };

  const IconComponent = service.icon;

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
            <button onClick={() => { handleShoppingBagClick(); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#65AEEA] text-[#65AEEA] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={service.image || heroBgImg} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "#65AEEA", opacity: 0.85 }} />
        
        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/60">
              {service.category}
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white px-4"
          >
            {service.title}
          </motion.h1>
          
          {isTeacherTraining && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-xl text-white/90"
            >
              Next Training Starts: {teacherTrainingData.startDate}
            </motion.p>
          )}
        </div>
        
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* CONTENT */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Icon & Description */}
          <div className="text-center mb-12">
            {IconComponent && (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#65AEEA]/10 mb-6">
                <IconComponent className="h-10 w-10 text-[#65AEEA]" />
              </div>
            )}
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#65AEEA]/10 p-6 rounded-lg text-center">
              <Clock className="h-8 w-8 text-[#65AEEA] mx-auto mb-3" />
              <h3 className="font-heading text-xl text-gray-800 mb-1">Duration</h3>
              <p className="text-gray-500">{isTeacherTraining ? teacherTrainingData.duration : service.duration}</p>
            </div>
            <div className="bg-[#65AEEA]/10 p-6 rounded-lg text-center">
              <MapPin className="h-8 w-8 text-[#65AEEA] mx-auto mb-3" />
              <h3 className="font-heading text-xl text-gray-800 mb-1">Location</h3>
              <p className="text-gray-500">{service.location}</p>
            </div>
            <div className="bg-[#65AEEA]/10 p-6 rounded-lg text-center">
              <Users className="h-8 w-8 text-[#65AEEA] mx-auto mb-3" />
              <h3 className="font-heading text-xl text-gray-800 mb-1">Capacity</h3>
              <p className="text-gray-500">{isTeacherTraining ? teacherTrainingData.maxStudents : service.capacity}</p>
            </div>
          </div>

          {/* TEACHER TRAINING SPECIFIC CONTENT */}
          {isTeacherTraining && (
            <>
              {/* Why Choose This Training */}
              <div className="mb-12">
                <h3 className="text-2xl font-light md:text-3xl text-[#65AEEA] mb-6 text-center">Why Choose This Training?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {teacherTrainingData.whyChoose.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#65AEEA]/5 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-[#65AEEA] mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Modules */}
              <div className="mb-12">
                <h3 className="text-2xl font-light md:text-3xl text-[#65AEEA] mb-6 text-center">300 Hour Course Content</h3>
                <div className="space-y-3">
                  {teacherTrainingData.modules.map((module, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:border-[#65AEEA]/30 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{module.name}</h4>
                          <p className="text-sm text-gray-500">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Details */}
              <div className="mb-12 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#65AEEA]/5 rounded-lg text-center">
                  <p className="text-gray-600"><strong>Schedule:</strong> {teacherTrainingData.schedule}</p>
                </div>
                <div className="p-4 bg-[#65AEEA]/5 rounded-lg text-center">
                  <p className="text-gray-600"><strong>Investment:</strong> {teacherTrainingData.investment}</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-12 p-6 bg-[#65AEEA]/5 rounded-xl">
                <BookOpen className="h-8 w-8 text-[#65AEEA] mx-auto mb-3" />
                <p className="text-gray-600 text-center">
                  <strong>Requirements:</strong> {teacherTrainingData.requirements}
                </p>
              </div>
            </>
          )}

          {/* Price and CTA */}
          <div className="bg-gradient-to-r from-[#65AEEA]/10 to-[#4A9FD9]/5 p-8 rounded-2xl text-center">
            <div className="mb-6">
              <span className="text-4xl font-heading text-[#65AEEA]">{service.price}</span>
              {isTeacherTraining && (
                <p className="text-sm text-gray-500 mt-1">
                  {teacherTrainingData.investment} | No large upfront costs
                </p>
              )}
            </div>

            <button
              onClick={handleBook}
              className="inline-flex items-center gap-3 px-10 py-4 text-white text-sm font-medium uppercase tracking-[0.3em] hover:opacity-90 transition-all rounded-sm"
              style={{ backgroundColor: "#65AEEA" }}
            >
              {service.bookingType === "enquire" ? "Enquire Now" : isTeacherTraining ? "Register Interest" : "Book Now"}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-xs text-gray-500 mt-4">
              {service.bookingType === "enquire"
                ? "Contact us for more information about this program"
                : isTeacherTraining 
                  ? "Submit your interest and we'll send you the full training brochure"
                  : "Select your preferred date and time after booking"}
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link to="/services" className="text-[#65AEEA] hover:underline text-sm">
              ← Back to all services
            </Link>
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
</footer>  {/* Footer */}
      <footer className="px-6 py-12 text-center" style={{ backgroundColor: "#65AEEA" }}>
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