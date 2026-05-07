import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles } from "lucide-react";

export default function FreeTrialPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("freeTrialDismissed");

    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-5 duration-500">
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-2xl border-l-4 border-ocean p-4 max-w-sm">
        <button 
          onClick={() => {
            setIsVisible(false);
            localStorage.setItem("freeTrialDismissed", "true");
          }}
          className="float-right text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-ocean mt-0.5" />
          <div>
            <h4 className="font-heading text-foreground font-medium">
              Free Trial Class
            </h4>

            <p className="text-xs text-muted-foreground mt-1">
              New to Devahiti? You're welcome to join a free trial class.
            </p>

            <Link 
              to="/contact" 
              className="inline-block mt-2 text-ocean text-xs font-medium hover:underline"
            >
              Enquire about free trial →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}