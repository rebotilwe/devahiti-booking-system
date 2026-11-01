import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Waves } from "lucide-react";

const API = "https://devahiti-booking-system-4t96.onrender.com/api";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  // "checking" | "paid" | "delayed"
  const [state, setState] = useState(bookingId ? "checking" : "delayed");

  // The browser no longer tells the server the payment worked (anyone could fake
  // that). We only ask the server whether Yoco has confirmed it, and wait.
  useEffect(() => {
    if (!bookingId) return;
    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // ~1 minute

    const check = async () => {
      attempts += 1;
      try {
        const res = await fetch(`${API}/payments/status/${encodeURIComponent(bookingId)}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.paid) { setState("paid"); return; }
      } catch (err) {
        console.error("Status check error:", err);
      }
      if (cancelled) return;
      if (attempts >= MAX_ATTEMPTS) { setState("delayed"); return; }
      setTimeout(check, 3000);
    };
    check();
    return () => { cancelled = true; };
  }, [bookingId]);

  const loading = state === "checking";
  const paid = state === "paid";

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean/20 to-transparent" />

        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-3 w-3 text-white/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60">{paid ? "Payment Received" : "Confirming Payment"}</span>
            <Waves className="h-3 w-3 text-white/60" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-light text-white">{paid ? "Payment Successful!" : "Thank You"}</h1>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${paid ? "bg-green-100" : "bg-blue-50"}`}>
              <CheckCircle className={`h-8 w-8 ${paid ? "text-green-500" : "text-ocean"}`} />
            </div>

            {loading && (
              <>
                <h2 className="text-2xl font-heading mb-2">Confirming your payment...</h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-ocean/30 border-t-ocean rounded-full animate-spin" />
                  <p>Please keep this page open for a moment.</p>
                </div>
              </>
            )}

            {paid && (
              <>
                <h2 className="text-2xl font-heading mb-2">Thank you for your payment!</h2>
                <p className="text-muted-foreground mb-6">Your booking has been confirmed. A confirmation email is on its way.</p>
                <p className="text-sm text-ocean mb-4">Booking Reference: #{bookingId}</p>
                <Link to="/" className="inline-block px-6 py-3 bg-ocean text-white rounded-lg">Return to Home</Link>
              </>
            )}

            {state === "delayed" && (
              <>
                <h2 className="text-2xl font-heading mb-2">We're still confirming your payment</h2>
                <p className="text-muted-foreground mb-4">
                  If your payment went through, you will receive a confirmation email shortly. Please do not pay again.
                  If you don't hear from us within the hour, contact us and quote your booking reference.
                </p>
                {bookingId && <p className="text-sm text-ocean mb-4">Booking Reference: #{bookingId}</p>}
                <Link to="/" className="inline-block px-6 py-3 bg-ocean text-white rounded-lg">Return to Home</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}