import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Waves } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (bookingId) {
        try {
          // Update booking status to paid
          const response = await fetch(`http://localhost:5000/api/payments/update-booking-status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: bookingId,
              paymentStatus: 'paid',
              paymentId: 'yoco_' + Date.now()
            })
          });
          
          const data = await response.json();
          console.log("Payment status updated:", data);
          setBookingDetails({ bookingId });
        } catch (error) {
          console.error("Update error:", error);
        }
      }
      setLoading(false);
    };
    
    updatePaymentStatus();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean/20 to-transparent" />

        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-3 w-3 text-white/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60">Payment Received</span>
            <Waves className="h-3 w-3 text-white/60" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-light text-white">Payment Successful!</h1>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-heading mb-2">Thank you for your payment!</h2>
            <p className="text-muted-foreground mb-6">Your booking has been confirmed.</p>
            
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-ocean/30 border-t-ocean rounded-full animate-spin" />
                <p>Confirming your booking...</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-ocean mb-4">Booking Reference: #{bookingId}</p>
                <Link to="/" className="inline-block px-6 py-3 bg-ocean text-white rounded-lg">
                  Return to Home
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}