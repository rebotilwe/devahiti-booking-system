import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves, ArrowRight, Phone, ShoppingBag, Menu, X } from "lucide-react";
import Calendar from "../components/Calendar";
import TimeSlots from "../components/TimeSlots";
import ParticipantSelector from "../components/ParticipantSelector";
import BookingForm from "../components/BookingForm";
import { services } from "../data/services";
import logo from "../assets/devahiti.png";

const API_BASE_URL = "https://devahiti-booking-system.onrender.com/api";

// ✅ NAVIGATION
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

export default function Schedule() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const serviceId = searchParams.get("service");
  
  const preselectedService = services.find(s => s.id === serviceId);
  const stateService = location.state?.service;
  
  const initialService = preselectedService || stateService || { 
    id: "private", 
    title: "Private Yoga Session", 
    basePrice: 650, 
    extraPersonFee: 150 
  };

  const [selectedService] = useState(initialService);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [totalPrice, setTotalPrice] = useState(initialService.basePrice || 650);
  const [step, setStep] = useState(1);
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedDates] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState({});

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

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/availability/schedule`);
        const data = await response.json();
        setWeeklySchedule(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`${API_BASE_URL}/availability/slots?date=${dateStr}`);
        const data = await response.json();
        setAvailableSlots(data.slots || []);
        
        if (selectedTime && !data.slots?.includes(selectedTime)) {
          setSelectedTime(null);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate, selectedTime]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleParticipantsChange = (price) => {
    setTotalPrice(price);
  };

  const handleFormSubmit = (userData) => {
    const booking = {
      service_type: selectedService.id,
      booking_date: selectedDate.toISOString().split('T')[0],
      booking_time: selectedTime,
      participants: participants,
      total_price: totalPrice,
      customer_name: userData.name,
      customer_email: userData.email,
      customer_phone: userData.phone,
      customer_address: userData.address,
      notes: userData.notes || "",
    };

    navigate("/checkout", { state: { booking, service: selectedService, participants, totalPrice } });
  };

  const formatPrice = (price) => `R${price}`;

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

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#65AEEA]/20 to-transparent" />

        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/60">
              Schedule Your Session
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white px-4"
          >
            {selectedService.title}
          </motion.h1>
          <p className="text-white/70 text-sm sm:text-base mt-3">
            {formatPrice(totalPrice)} • {selectedService.duration || "60 minutes"}
          </p>
        </div>
      </section>

      {/* Steps Indicator */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#65AEEA]" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#65AEEA] text-white" : "bg-gray-200"}`}>
              1
            </div>
            <span className="text-xs sm:text-sm hidden sm:inline">Date & Time</span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#65AEEA]" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#65AEEA] text-white" : "bg-gray-200"}`}>
              2
            </div>
            <span className="text-xs sm:text-sm hidden sm:inline">Participants</span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-[#65AEEA]" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-[#65AEEA] text-white" : "bg-gray-200"}`}>
              3
            </div>
            <span className="text-xs sm:text-sm hidden sm:inline">Your Details</span>
          </div>
        </div>
      </div>

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              blockedDates={blockedDates}
              weeklySchedule={weeklySchedule}
            />
            <TimeSlots
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onTimeSelect={handleTimeSelect}
              availableSlots={availableSlots}
              loading={loadingSlots}
            />
          </div>
        </div>
      )}

      {/* Step 2: Participants */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ParticipantSelector
            participants={participants}
            setParticipants={setParticipants}
            onPriceChange={handleParticipantsChange}
            basePrice={selectedService.basePrice || 650}
            extraPersonFee={selectedService.extraPersonFee || 150}
          />
          <div className="flex justify-end mt-8 gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-[#65AEEA]/30 text-[#65AEEA] rounded-lg hover:bg-[#65AEEA]/10 transition"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-[#65AEEA] text-white rounded-lg hover:bg-[#4A9FD9] transition flex items-center gap-2"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Booking Form */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto px-4 py-8">
          <BookingForm onSubmit={handleFormSubmit} />
          <div className="mt-4 flex justify-start">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 border border-[#65AEEA]/30 text-[#65AEEA] rounded-lg hover:bg-[#65AEEA]/10 transition text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

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