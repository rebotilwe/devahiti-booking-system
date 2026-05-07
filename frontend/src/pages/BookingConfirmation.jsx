import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Users, Mail, Phone, MapPin, ArrowRight, Waves } from "lucide-react";

export default function BookingConfirmation() {
  const location = useLocation();
  const { booking } = location.state || {};

  // Debug: Log what we received
  console.log("BookingConfirmation received:", booking);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">No booking found</h2>
          <Link to="/services" className="text-ocean hover:underline">Go to Services</Link>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "Not selected";
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (time) => {
    if (!time) return "Not selected";
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  // Safely get values from either structure
  const customerEmail = booking.customer_email || booking.user?.email || "your email";
  const customerPhone = booking.customer_phone || booking.user?.phone || "your phone";
  const serviceTitle = booking.service_type || booking.service?.title || "Yoga Session";
  const bookingDate = booking.booking_date || booking.date;
  const bookingTime = booking.booking_time || booking.time;
  const participants = booking.participants || 1;
  const totalPrice = booking.total_price || booking.totalPrice || 0;

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
              Booking Confirmed
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white px-4"
          >
            Thank You!
          </motion.h1>
        </div>
      </section>

      {/* Confirmation Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-ocean/10 p-6 sm:p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <h2 className="font-heading text-2xl text-foreground mb-2">
              Your booking is confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              A confirmation has been sent to <span className="font-medium">{customerEmail}</span>
            </p>

            <div className="bg-ocean/5 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-heading text-lg text-foreground mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{serviceTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Date:
                  </span>
                  <span>{formatDate(bookingDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Time:
                  </span>
                  <span>{formatTime(bookingTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> Participants:
                  </span>
                  <span>{participants}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-medium">Total:</span>
                  <span className="font-heading text-ocean">R{totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-left">
              <p className="text-sm text-amber-700">
                📍 <span className="font-medium">Important:</span> Cheryl will confirm your booking via WhatsApp at {customerPhone}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-6 py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean-dark transition"
              >
                Return to Home
              </Link>
              <Link
                to="/services"
                className="px-6 py-3 border border-ocean/30 text-ocean rounded-lg font-medium hover:bg-ocean/10 transition"
              >
                Book Another Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}