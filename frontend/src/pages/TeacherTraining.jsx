import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Award, Clock, MapPin, CheckCircle, BookOpen, Star, Quote, Users } from "lucide-react";
import { useState, useEffect } from "react";
import heroTrainingImg from "../assets/images/img10.jpg";
import trainingImg from "../assets/images/img5.jpg";
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

// ✅ UPDATED: Removed subNav - not needed on Teacher Training page

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

// ✅ UPDATED: 10 Modules with correct dates
const courseModules300 = [
  {
    id: 1,
    title: "Anatomy of Energy",
    description: "The relationship between energy and health, quantum physics, koshas",
    dates: "June 13th and 14th"
  },
  {
    id: 2,
    title: "Advanced Anatomy & Physiology",
    description: "Functional fitness, digestive health, intermittent fasting, ketosis & autophagy",
    dates: "July 18th and 19th"
  },
  {
    id: 3,
    title: "Advanced Fascia Studies",
    description: "The latest research and applications in yoga",
    dates: "August 1st and 2nd"
  },
  {
    id: 4,
    title: "Yoga & Somatic Psychology",
    description: "Intention setting, working within the framework of the Eight Limbs of Yoga, Samkhya",
    dates: "September 5th and 6th"
  },
  {
    id: 5,
    title: "Advanced Pranayama and Activational breathing techniques",
    description: "Mudras, bandhas, kumbhaka, chakras, mantras & meditation",
    dates: "October 10th and 11th"
  },
  {
    id: 6,
    title: "Advanced Philosophy",
    description: "Deep dive into yogic philosophy and ancient wisdom",
    dates: "November 14th and 15th"
  },
  {
    id: 7,
    title: "Advanced Ayurveda",
    description: "The impact of doshas, gunas, five pranas, 14 major nadis, and the secrets of alchemy (usually needs 3-4 days for this one)",
    dates: "December 5th and 6th, PLUS January 16th"
  },
  {
    id: 8,
    title: "Specialized Training",
    description: "Yin, prenatal yoga, yoga for children and special needs groups, and the art of retreating",
    dates: "February 19th and 20th"
  },
  {
    id: 9,
    title: "Devahiti Hands-On Bodywork",
    description: "Learn hands-on techniques to supplement your income (optional extra, in-person only, over 2 weekends)",
    dates: "March 12th and 13th PLUS March 19th and 20th"
  },
  {
    id: 10,
    title: "Trauma Sensitive Yoga",
    description: "Specialized training for trauma-informed teaching practices",
    dates: "April 16th and 17th"
  }
];

// ✅ NEW: 200 Hour Modules (4 modules)
const courseModules200 = [
  {
    id: 1,
    title: "Foundations of Yoga",
    description: "History, philosophy, and the eight limbs of yoga"
  },
  {
    id: 2,
    title: "Anatomy & Physiology",
    description: "Understanding the body's systems and how they relate to yoga practice"
  },
  {
    id: 3,
    title: "Teaching Methodology",
    description: "Class sequencing, verbal cues, and hands-on adjustments"
  },
  {
    id: 4,
    title: "Practicum & Integration",
    description: "Practice teaching, feedback, and integration of all learned skills"
  }
];

// ✅ UPDATED: Why Choose - Split for 200hr and 300hr
const whyChoose200 = [
  "Foundational Training – Build a strong, safe, and sustainable teaching practice",
  "Comprehensive Curriculum – Study philosophy, anatomy, teaching methodology, and more",
  "Small Groups – Maximum 10 students for personalized attention",
  "Internationally Recognized – Course content approved by Yoga Alliance"
];

const whyChoose300 = [
  "Advanced Research – Explore the latest research in fascia, pain management, skeletal alignment, and therapeutic practices",
  "Comprehensive Course Material – Gain an advanced understanding from philosophy to functional anatomy, somatic psychology to Ayurveda",
  "Hands-On Learning – Master the exclusive Devahiti hands-on bodywork technique",
  "Affordable & Accessible – No exams, no large upfront costs. R2,800 per module"
];

// Testimonials from past students
const testimonials = [
  {
    id: 1,
    name: "Chelsea Cowen",
    title: "Yoga Instructor / Past Student",
    text: "I did my 200hr yoga training with Cheryl and to say the least, it changed my life all for the better. With her many years of experience and wisdom, she guided, taught and showed full attention to detail. The studio was a place of growth and place where I felt very much at home. I am so grateful for the time I spent there and the opportunities it brought me."
  },
  {
    id: 2,
    name: "Lauren Chrichton",
    title: "Yoga Instructor / Past Student",
    text: "I absolutely loved my teacher training with Cheryl! It was incredibly well structured and in-depth & gave me such confidence to teach. It also had a huge impact on my life personally with positive changes in my mindset, increased emotional regulation & connection to myself on all levels. Cheryl is an amazing person - so experienced, knowledgeable & authentic & I highly recommend her training!"
  },
  {
    id: 3,
    name: "Cami Barausse",
    title: "Yoga Instructor / Past Student",
    text: "Yoga- the gift that keeps on giving. I did my 200hr teacher training with Cheryl in 2016 and it was one of the greatest journeys I've been on. It was everything I needed it to be and I look back at it now and I am extremely grateful for the sturdy grounding and foundation I got that allowed me to step out into the world and share the gift that keeps on giving."
  },
  {
    id: 4,
    name: "Tasia Dellis",
    title: "Yoga Instructor / Past Student",
    text: "When I first stepped into Cheryl's yoga studio, I was seeking a respite from the whirlwind and the complexities of navigating life back in 2013. Little did I know, this was a step towards what would become the most transformative journey of my life. Cheryl's approach to yoga transcends the physical. It's not just about mastering poses; it's about mastering an openness and curiosity to the inward journey. The return on investment is immeasurable, offering not just professional success but a profound sense of inner peace and fulfilment."
  }
];

export default function TeacherTraining() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto max-w-7xl px-6 py-3 text-center">
            <button onClick={() => navigate("/services")} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity">
              Our Services
            </button>
          </div>
        </div>
        {/* ✅ SUBNAV REMOVED */}
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

      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img src={heroTrainingImg} alt="Teacher Training" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="h-5 w-5 text-white/80" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/80">Turn Your Passion into Your Profession</span>
            <Award className="h-5 w-5 text-white/80" />
          </div>
          <h1 className="text-5xl font-light md:text-6xl text-white">Teacher Training</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            200hr & 300hr Certified Programs in Ballito
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Training Options */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#65AEEA] font-semibold">Transform Your Life</p>
            <h2 className="text-3xl font-light md:text-4xl text-gray-800 mt-2">Choose Your Path</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Dive deeper into something that brings you peace and happiness. Expand your knowledge of what you are passionate about and share that passion with others!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 200 Hour */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#65AEEA]/10 mb-4">
                  <BookOpen className="h-8 w-8 text-[#65AEEA]" />
                </div>
                <h3 className="text-2xl font-light text-gray-800">200 Hour Teacher Training</h3>
                <p className="text-[#65AEEA] font-semibold text-xl mt-2">Next Training Starts November 2026</p>
                <p className="text-gray-500 text-sm mt-2">200 Hours Over 10 Months | 4 Modules</p>
                <div className="mt-4 p-4 bg-[#F9F9FB] rounded-lg">
                  <p className="text-sm text-gray-600">
                    Increase your understanding of the body, mind and Spirit connection, deepen your own practice, turn your PASSION into your PROFESSION and teach Yoga to others.
                  </p>
                </div>
                <ul className="mt-6 text-left space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> Part-time training</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> Small groups (maximum 10 students)</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> Personalised feedback</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> Course content approved by Yoga Alliance</li>
                </ul>
                <button onClick={() => window.location.href = "mailto:cheryl@devahiti.com"} className="mt-6 w-full py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition">
                  Enquire Now
                </button>
              </div>
            </div>

            {/* 300 Hour Advanced */}
            <div className="bg-white border-2 border-[#65AEEA] rounded-2xl p-8 shadow-lg hover:shadow-xl transition relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#65AEEA] text-white text-xs font-bold px-4 py-1 rounded-full">
                Advanced
              </div>
              <div className="text-center mt-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#65AEEA]/10 mb-4">
                  <Award className="h-8 w-8 text-[#65AEEA]" />
                </div>
                <h3 className="text-2xl font-light text-gray-800">Advanced 300 Hour Teacher Training</h3>
                <p className="text-[#65AEEA] font-semibold text-xl mt-2">Next Training Starts July 2026</p>
                <p className="text-gray-500 text-sm mt-2">300 Hours Over 12 Months | 10 Modules</p>
                <div className="mt-4 p-4 bg-[#F9F9FB] rounded-lg">
                  <p className="text-sm text-gray-600">
                    Designed for certified 200-hour yoga teachers looking to expand their knowledge and elevate their practice. Students can attend all 10 modules in one year or spread them over 2 years.
                  </p>
                </div>
                <ul className="mt-6 text-left space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> 10 Modules over 12 weekends</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> One full weekend per month</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> R2,800 per module</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#65AEEA]" /> Complete in 1 or 2 years</li>
                </ul>
                <button onClick={() => window.location.href = "mailto:cheryl@devahiti.com"} className="mt-6 w-full py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose This Training */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">Why Choose This Training?</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 200 Hour Training */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-[#65AEEA] mb-4 text-center">200-Hour Teacher Training</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whyChoose200.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-[#65AEEA] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 300 Hour Training */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-xl font-semibold text-[#65AEEA] mb-4 text-center">Advanced 300-Hour Teacher Training</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {whyChoose300.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <CheckCircle className="h-5 w-5 text-[#65AEEA] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ 200 Hour Course Content - All 4 modules displayed */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">200 Hour Course Content</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4">4 comprehensive modules designed for foundational learning</p>
          </div>

          <div className="space-y-4">
            {courseModules200.map((module) => (
              <div key={module.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#65AEEA]/30 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#65AEEA]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#65AEEA]">{module.id}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{module.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ 300 Hour Course Content - All 10 modules displayed */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">300 Hour Course Content</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4">10 comprehensive modules designed for advanced learning</p>
          </div>

          <div className="space-y-4">
            {courseModules300.map((module) => (
              <div key={module.id} className="bg-white border border-gray-100 rounded-xl p-5 hover:border-[#65AEEA]/30 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#65AEEA]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#65AEEA]">{module.id}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">{module.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                  </div>
                  <div className="flex-shrink-0 mt-2 md:mt-0">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#65AEEA] bg-[#65AEEA]/10 px-3 py-1.5 rounded-full whitespace-nowrap">
                      <Calendar className="h-4 w-4" />
                      {module.dates}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#65AEEA]/10 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              <strong>Flexible Learning:</strong> Complete all 10 modules in one year or spread them over 2 years. 
              R2,800 per module. 10 modules over 12 weekends.
            </p>
          </div>
        </div>
      </section>

      {/* Training Details */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">Training Details</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="h-8 w-8 text-[#65AEEA] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Duration</h3>
              <p className="text-gray-600">200 Hours Over 10 Months</p>
              <p className="text-gray-500 text-sm mt-2">4 Modules</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="h-8 w-8 text-[#65AEEA] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">Devahiti Studio, Ballito</p>
              <p className="text-gray-500 text-sm mt-2">In-person training only</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Award className="h-8 w-8 text-[#65AEEA] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Investment</h3>
              <p className="text-gray-600">Contact for pricing</p>
              <p className="text-gray-500 text-sm mt-2">Payment plans available</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="h-8 w-8 text-[#65AEEA] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Small Groups</h3>
              <p className="text-gray-600">Maximum 10 participants</p>
              <p className="text-gray-500 text-sm mt-2">Personalised attention guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-light md:text-3xl text-[#65AEEA] mb-6">Terms & Conditions</h2>
          <div className="bg-white p-6 rounded-xl text-left space-y-3 shadow-sm">
            <p className="text-sm text-gray-600">✓ To participate a valid 200 hour certificate is necessary.</p>
            <p className="text-sm text-gray-600">✓ All workshops need to be attended for certification and all assignments must be completed within the allocated time.</p>
            <p className="text-sm text-gray-600">✓ The monthly payment needs to reflect a minimum of 5 days before the monthly workshop.</p>
            <p className="text-sm text-gray-600">✓ Failure to meet these criteria could lead to dismissal from the course.</p>
          </div>
          <p className="text-sm text-gray-500 mt-6 italic">
            Course content approved and accredited by Yoga Alliance, however due to the high exchange rate we no longer subscribe annually.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#65AEEA]">What Our Students Say</h2>
            <div className="w-20 h-px bg-[#65AEEA] mx-auto mt-4"></div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <Quote className="h-8 w-8 text-[#65AEEA]/30 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Quote className="h-8 w-8 text-[#65AEEA]/30 mb-4" />
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm">"{testimonial.text.substring(0, 200)}..."</p>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-xs text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === idx ? "w-8 bg-[#65AEEA]" : "w-2 bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Ready to Transform Your Life?</h2>
        <p className="text-white/90 text-sm mt-2 max-w-xl mx-auto">
          The bonds that are created during teacher training last a lifetime. Only a few places left!
        </p>
        <p className="text-white/80 text-sm mt-4">
          Email <a href="mailto:cheryl@devahiti.com" className="underline font-semibold">cheryl@devahiti.com</a> for registration forms and course content
        </p>
        <button onClick={() => window.location.href = "mailto:cheryl@devahiti.com"} className="mt-6 px-8 py-3 bg-white text-[#65AEEA] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
          Enquire Now
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