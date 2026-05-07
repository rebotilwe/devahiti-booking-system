import { Link } from "react-router-dom";
import { XCircle, Waves } from "lucide-react";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="h-3 w-3 text-white/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/60">Payment Cancelled</span>
            <Waves className="h-3 w-3 text-white/60" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-light text-white">Payment Cancelled</h1>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-heading mb-2">Payment was cancelled</h2>
            <p className="text-muted-foreground mb-6">No payment has been processed. You can try again.</p>
            
            <Link to="/checkout" className="inline-block px-6 py-3 bg-ocean text-white rounded-lg">
              Try Again
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}