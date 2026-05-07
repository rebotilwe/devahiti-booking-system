import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean/5 px-6 py-20">
      <div className="bg-white shadow-xl p-8 max-w-md w-full rounded-lg text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="h-8 w-8 text-red-500" />
        </div>
        
        <h2 className="font-heading text-2xl text-foreground mb-2">
          Payment Cancelled
        </h2>
        
        <p className="text-muted-foreground mb-6">
          Your payment was not completed. Your booking has not been confirmed.
        </p>

        <Link
          to="/booking"
          className="inline-block w-full bg-ocean text-white py-3 uppercase tracking-[0.3em] text-xs font-medium hover:bg-ocean-dark transition-all rounded-sm text-center"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}