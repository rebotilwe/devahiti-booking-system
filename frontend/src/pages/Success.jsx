import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Waves } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean/5 px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl p-8 max-w-md w-full rounded-lg text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        
        <h2 className="font-heading text-2xl text-foreground mb-2">
          Payment Received!
        </h2>
        
        <p className="text-muted-foreground mb-4">
          Your booking request has been submitted.
        </p>

        <div className="bg-ocean/10 p-4 rounded-lg mb-6">
          <Waves className="h-5 w-5 text-ocean mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            You will receive a confirmation email from Calendly shortly.
            Mandy will confirm your booking within 24 hours.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block w-full bg-ocean text-white py-3 uppercase tracking-[0.3em] text-xs font-medium hover:bg-ocean-dark transition-all rounded-sm text-center"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}