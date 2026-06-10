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

// 300 Hour Course Modules
const courseModules = [
  "Anatomy of Energy – The relationship between energy and health, quantum physics, koshas",
  "Yoga & Somatic Psychology – Intention setting, working within the framework of the Eight Limbs of Yoga, Samkhya",
  "Advanced Anatomy & Physiology – Functional fitness, digestive health, intermittent fasting, ketosis & autophagy",
  "Advanced Fascia Studies – The latest research and applications in yoga",
  "Advanced Pranayama and Activational breathing techniques – Mudras, bandhas, kumbhaka, chakras, mantras & meditation",
  "Advanced Ayurveda – The impact of doshas, gunas, five pranas, 14 major nadis, and the secrets of alchemy",
  "Specialized Training – Yin, prenatal yoga, yoga for children and special needs groups",
  "The art of retreating",
  "Devahiti Hands-On Bodywork – Learn hands-on techniques to supplement your income"
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
            <button onClick={() => { handleShoppingBagClick(); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#93C9F9] text-[#93C9F9] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#93C9F9] hover:text-white transition">
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
            <p className="text-sm uppercase tracking-[0.3em] text-[#93C9F9] font-semibold">Transform Your Life</p>
            <h2 className="text-3xl font-light md:text-4xl text-gray-800 mt-2">Choose Your Path</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Dive deeper into something that brings you peace and happiness. Expand your knowledge of what you are passionate about and share that passion with others!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 200 Hour */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#93C9F9]/10 mb-4">
                  <BookOpen className="h-8 w-8 text-[#93C9F9]" />
                </div>
                <h3 className="text-2xl font-light text-gray-800">200 Hour Teacher Training</h3>
                <p className="text-[#93C9F9] font-semibold text-xl mt-2">Next Training Starting May 2026</p>
                <p className="text-gray-500 text-sm mt-2">International Certificate</p>
                <div className="mt-4 p-4 bg-[#F9F9FB] rounded-lg">
                  <p className="text-sm text-gray-600">
                    Increase your understanding of the body, mind and Spirit connection, deepen your own practice, turn your PASSION into your PROFESSION and teach Yoga to others.
                  </p>
                </div>
                <ul className="mt-6 text-left space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Part-time training</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Small groups (maximum 10 students)</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Personalised feedback</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Course content approved by Yoga Alliance</li>
                </ul>
                <button onClick={() => window.location.href = "mailto:cheryl@devahiti.com"} className="mt-6 w-full py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
                  Enquire Now
                </button>
              </div>
            </div>

            {/* 300 Hour Advanced */}
            <div className="bg-white border-2 border-[#93C9F9] rounded-2xl p-8 shadow-lg hover:shadow-xl transition relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#93C9F9] text-white text-xs font-bold px-4 py-1 rounded-full">
                Advanced
              </div>
              <div className="text-center mt-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#93C9F9]/10 mb-4">
                  <Award className="h-8 w-8 text-[#93C9F9]" />
                </div>
                <h3 className="text-2xl font-light text-gray-800">Advanced 300 Hour Teacher Training</h3>
                <p className="text-[#93C9F9] font-semibold text-xl mt-2">Next Training Starting May 2026</p>
                <p className="text-gray-500 text-sm mt-2">For certified 200-hour yoga teachers</p>
                <div className="mt-4 p-4 bg-[#F9F9FB] rounded-lg">
                  <p className="text-sm text-gray-600">
                    Designed for certified 200-hour yoga teachers looking to expand their knowledge and elevate their practice.
                  </p>
                </div>
                <ul className="mt-6 text-left space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Duration: 12 months</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> 11 Modules | One full weekend a month</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Starts: May 17th</li>
                  <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="h-4 w-4 text-[#93C9F9]" /> Space limited to 10 participants</li>
                </ul>
                <button onClick={() => window.location.href = "mailto:cheryl@devahiti.com"} className="mt-6 w-full py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
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
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">Why Choose This Training?</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="h-5 w-5 text-[#93C9F9] mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">New Research – Explore the latest research in fascia, pain management, skeletal alignment, and therapeutic practices</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="h-5 w-5 text-[#93C9F9] mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">Comprehensive Course Material – Advanced understanding from philosophy to functional anatomy, somatic psychology to Ayurveda</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="h-5 w-5 text-[#93C9F9] mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">Hands-On Learning – Master the exclusive Devahiti hands-on bodywork technique for pain management, fascial release, and skeletal alignment</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="h-5 w-5 text-[#93C9F9] mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">Affordable & Accessible – No exams, no large upfront costs. Monthly workshop fee of R2800 for 12 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">300 Hour Course Content</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
            <p className="text-gray-500 mt-4">11 comprehensive modules designed for deep learning</p>
          </div>

          <div className="space-y-3">
            {courseModules.map((module, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-lg hover:border-[#93C9F9]/30 transition-all">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#93C9F9]/20 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-semibold text-[#93C9F9]">{idx + 1}</span>
                </div>
                <p className="text-gray-700">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Details */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">Training Details</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="h-8 w-8 text-[#93C9F9] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Duration</h3>
              <p className="text-gray-600">12 months | 11 Modules | One full weekend a month</p>
              <p className="text-gray-500 text-sm mt-2">Course starts on May 17th</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="h-8 w-8 text-[#93C9F9] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600">Devahiti Studio, Ballito</p>
              <p className="text-gray-500 text-sm mt-2">In-person training only</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Award className="h-8 w-8 text-[#93C9F9] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Investment</h3>
              <p className="text-gray-600">R2,800 per month (for 12 months)</p>
              <p className="text-gray-500 text-sm mt-2">No large upfront costs</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="h-8 w-8 text-[#93C9F9] mb-3" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Small Groups</h3>
              <p className="text-gray-600">Maximum 10 participants</p>
              <p className="text-gray-500 text-sm mt-2">Personalised attention guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-light md:text-3xl text-[#93C9F9] mb-6">Terms & Conditions</h2>
          <div className="bg-[#F9F9FB] p-6 rounded-xl text-left space-y-3">
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
            <h2 className="text-3xl font-light md:text-4xl text-[#93C9F9]">What Our Students Say</h2>
            <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-4"></div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <Quote className="h-8 w-8 text-[#93C9F9]/30 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">"{testimonial.text}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <Quote className="h-8 w-8 text-[#93C9F9]/30 mb-4" />
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
                <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === idx ? "w-8 bg-[#93C9F9]" : "w-2 bg-gray-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "#93C9F9" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Ready to Transform Your Life?</h2>
        <p className="text-white/90 text-sm mt-2 max-w-xl mx-auto">
          The bonds that are created during teacher training last a lifetime. Only a few places left!
        </p>
        <p className="text-white/80 text-sm mt-4">
          Email <a href="mailto:cheryl@devahiti.com" className="underline font-semibold">cheryl@devahiti.com</a> for registration forms and course content
        </p>
        <button onClick={() => window.location.href = "mailto:cheryl@devahiti.com"} className="mt-6 px-8 py-3 bg-white text-[#93C9F9] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-gray-100 transition">
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