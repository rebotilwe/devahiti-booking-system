import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves, Calendar as CalendarIcon, Clock, Users, ArrowRight } from "lucide-react";
import Calendar from "../components/Calendar";
import TimeSlots from "../components/TimeSlots";
import ParticipantSelector from "../components/ParticipantSelector";
import BookingForm from "../components/BookingForm";
import { getAvailableSlots, getWeeklySchedule } from "../services/api";

const API_BASE_URL = "http://localhost:5000/api";

export default function Schedule() {
  const location = useLocation();
  const navigate = useNavigate();

  const { service } = location.state || {
    service: { id: "private", title: "Private Yoga Session", basePrice: 650, extraPersonFee: 150 }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [participants, setParticipants] = useState(1);
  const [totalPrice, setTotalPrice] = useState(service.basePrice || 650);
  const [step, setStep] = useState(1);
  
  // Availability state
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]);
  const [weeklySchedule, setWeeklySchedule] = useState({});

  // Fetch weekly schedule on mount
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

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`${API_BASE_URL}/availability/slots?date=${dateStr}`);
        const data = await response.json();
        setAvailableSlots(data.slots || []);
        
        // If selected time is no longer available, clear it
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
    service_type: service.id,
    booking_date: selectedDate.toISOString().split('T')[0],
    booking_time: selectedTime,
    participants: participants,
    total_price: totalPrice,  // ✅ This must be included
    customer_name: userData.name,
    customer_email: userData.email,
    customer_phone: userData.phone,
    customer_address: userData.address,
    notes: userData.notes || "",
  };

  navigate("/checkout", { state: { booking, service, participants, totalPrice } });
};

  const formatPrice = (price) => `R${price}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean/20 to-transparent" />

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
            {service.title}
          </motion.h1>
          <p className="text-white/70 text-sm sm:text-base mt-3">
            {formatPrice(totalPrice)} • 60 minutes
          </p>
        </div>
      </section>

      {/* Steps Indicator */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-ocean" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-ocean text-white" : "bg-muted"}`}>
              1
            </div>
            <span className="text-xs sm:text-sm hidden sm:inline">Date & Time</span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-ocean" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-ocean text-white" : "bg-muted"}`}>
              2
            </div>
            <span className="text-xs sm:text-sm hidden sm:inline">Participants</span>
          </div>
          <div className="w-8 sm:w-12 h-px bg-border" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-ocean" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-ocean text-white" : "bg-muted"}`}>
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
            basePrice={service.basePrice || 650}
            extraPersonFee={service.extraPersonFee || 150}
          />
          <div className="flex justify-end mt-8 gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-ocean/30 text-ocean rounded-lg hover:bg-ocean/10 transition"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-ocean text-white rounded-lg hover:bg-ocean-dark transition flex items-center gap-2"
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
              className="px-6 py-2 border border-ocean/30 text-ocean rounded-lg hover:bg-ocean/10 transition text-sm"
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}