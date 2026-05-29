import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getAvailability } from "../api/api";

// Format time (expects "HH:MM:SS" or "HH:MM")
const formatTime = (time) => {
  if (!time) return "";
  const timeParts = time.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = timeParts[1];
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
};

// Mock time slots for testing (remove when backend is ready)
const MOCK_TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function TimeSlots({
  selectedDate,
  onTimeSelect,
  selectedTime,
  bookedSlots = []
}) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;

      setLoading(true);

      try {
        const dateStr = selectedDate.toISOString().split("T")[0];
        const data = await getAvailability(dateStr);
        
        const slots = data?.slots || (Array.isArray(data) ? data : []);
        
        if (slots && slots.length > 0) {
          setAvailableSlots(slots);
          setUseMockData(false);
        } else {
          // Use mock data for testing
          setAvailableSlots(MOCK_TIME_SLOTS);
          setUseMockData(true);
        }
      } catch (err) {
        console.error("Failed to load slots", err);
        // Use mock data on error
        setAvailableSlots(MOCK_TIME_SLOTS);
        setUseMockData(true);
      }

      setLoading(false);
    };

    fetchSlots();
  }, [selectedDate]);

  const isBooked = (time) => {
    return bookedSlots.includes(time);
  };

  if (!selectedDate) {
    return (
      <div className="bg-ocean/5 border border-ocean/20 rounded-lg p-8 text-center">
        <Clock className="h-10 w-10 text-ocean/40 mx-auto mb-3" />
        <p className="text-muted-foreground">Please select a date first</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-ocean/30 border-t-ocean rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading available times...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-4 sm:p-6">
      <h3 className="font-heading text-xl text-foreground mb-4">
        Select a Time
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4">
        {selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>

      {useMockData && (
        <p className="text-xs text-amber-600 mb-3 italic">
          ⚡ Demo mode - using test time slots
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {availableSlots.length === 0 && (
          <p className="text-muted-foreground col-span-3 text-center py-4">
            No available time slots for this date
          </p>
        )}

        {availableSlots.map((slot, index) => {
          const disabled = isBooked(slot);
          const timeStr = typeof slot === 'string' ? slot : slot.time || slot;

          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => !disabled && onTimeSelect(timeStr)}
              disabled={disabled}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                selectedTime === timeStr
                  ? "bg-ocean text-white shadow-md"
                  : disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-ocean/10 text-ocean hover:bg-ocean/20 cursor-pointer"
              }`}
            >
              {formatTime(timeStr)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}