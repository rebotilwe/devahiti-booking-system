import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Waves, Calendar, Clock, Users, MapPin, 
  User, Mail, Phone, CreditCard, ArrowRight, Lock 
} from "lucide-react";
import { initiateBooking } from "../api/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [loading, setLoading] = useState(false);

  if (!booking) {
    navigate("/services");
    return null;
  }

  const formatDate = (date) => {
    if (!date) return "Not selected";
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
    });
  };

  const formatTime = (time) => {
    if (!time) return "Not selected";
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

 const handlePayment = async () => {
  setLoading(true);

  try {
    // Step 1: Create the booking in database
    const bookingData = {
      service_type: booking.service_type,
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      participants: booking.participants,
      total_price: booking.total_price,
      customer_name: booking.customer_name,
      customer_email: booking.customer_email,
      customer_phone: booking.customer_phone,
      customer_address: booking.customer_address,
      notes: booking.notes || "",
    };
    
    const bookingResult = await initiateBooking(bookingData);
    
    if (bookingResult.bookingId) {
      // Step 2: Create Yoco checkout session
      const checkoutResponse = await fetch('https://devahiti-booking-system.onrender.com/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: booking.total_price,
          bookingId: bookingResult.bookingId,
          customerName: booking.customer_name,
          customerEmail: booking.customer_email,
        }),
      });
      
      const checkoutData = await checkoutResponse.json();
      
      if (checkoutData.redirectUrl) {
        // Step 3: Redirect to Yoco payment page
        window.location.href = checkoutData.redirectUrl;
      } else {
        throw new Error("Failed to create payment session");
      }
    }
  } catch (err) {
    console.error("Payment error:", err);
    alert("Something went wrong. Please try again.");
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden">
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
              Secure Checkout
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white px-4"
          >
            Complete Your Booking
          </motion.h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{booking.service_type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Date
                  </span>
                  <span>{formatDate(booking.booking_date)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Time
                  </span>
                  <span>{formatTime(booking.booking_time)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Participants
                  </span>
                  <span>{booking.participants} people</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">Your Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> Name
                  </span>
                  <span>{booking.customer_name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </span>
                  <span>{booking.customer_email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone
                  </span>
                  <span>{booking.customer_phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Address
                  </span>
                  <span className="text-right max-w-[200px]">{booking.customer_address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-ocean/5 border border-ocean/20 rounded-lg p-6 sticky top-24">
              <h2 className="font-heading text-xl text-foreground mb-4">Total</h2>
              <div className="text-center mb-6">
                <p className="text-3xl font-heading text-ocean">R{booking.total_price}</p>
                <p className="text-xs text-muted-foreground mt-1">Including all fees</p>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay Securely
                  </>
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure payment powered by Yoco
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your booking will be confirmed after successful payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}