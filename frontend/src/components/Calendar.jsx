import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function Calendar({ onDateSelect, selectedDate, blockedDates = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  // Get day name
  const getDayName = (date) => {
    return date.toLocaleString('default', { weekday: 'short' });
  };

  // Check if date is blocked
  const isDateBlocked = (date) => {
    return blockedDates.some(blocked => 
      new Date(blocked).toDateString() === date.toDateString()
    );
  };

  // Check if date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    setCalendarDays(days);
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-4 sm:p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl text-foreground">
          {getMonthName(currentMonth)} {currentMonth.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-ocean/10 rounded-full transition"
          >
            <ChevronLeft className="h-5 w-5 text-ocean" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-ocean/10 rounded-full transition"
          >
            <ChevronRight className="h-5 w-5 text-ocean" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
          <div key={i} className="text-center text-xs text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }
          
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const isBlocked = isDateBlocked(date);
          const isPast = isPastDate(date);
          const isAvailable = !isBlocked && !isPast;
          
          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => isAvailable && onDateSelect(date)}
              disabled={!isAvailable}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all ${
                isSelected
                  ? "bg-ocean text-white shadow-md"
                  : isAvailable
                  ? "hover:bg-ocean/10 cursor-pointer"
                  : "bg-gray-50 text-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="text-sm font-medium">{date.getDate()}</span>
              <span className="text-[10px] opacity-70">{getDayName(date)}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-ocean rounded-full" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded-full" />
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-white border border-ocean/30 rounded-full" />
          <span>Available</span>
        </div>
      </div>
    </div>
  );
}