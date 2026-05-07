import { motion } from "framer-motion";
import { Users, Minus, Plus } from "lucide-react";

// Pricing configuration
const BASE_PRICE = 650;
const EXTRA_PERSON_FEE = 150;

const calculatePrice = (participants) => {
  if (participants === 1) return BASE_PRICE;
  return BASE_PRICE + (participants - 1) * EXTRA_PERSON_FEE;
};

export default function ParticipantSelector({ participants, setParticipants, onPriceChange }) {
  const increment = () => {
    if (participants < 10) {
      const newCount = participants + 1;
      setParticipants(newCount);
      onPriceChange(calculatePrice(newCount));
    }
  };

  const decrement = () => {
    if (participants > 1) {
      const newCount = participants - 1;
      setParticipants(newCount);
      onPriceChange(calculatePrice(newCount));
    }
  };

  const price = calculatePrice(participants);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-ocean" />
        <h3 className="font-heading text-xl text-foreground">Number of Participants</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            disabled={participants <= 1}
            className="w-10 h-10 rounded-full border border-ocean/30 flex items-center justify-center hover:bg-ocean/10 transition disabled:opacity-50"
          >
            <Minus className="h-4 w-4 text-ocean" />
          </button>
          <span className="text-2xl font-medium text-foreground w-8 text-center">
            {participants}
          </span>
          <button
            onClick={increment}
            disabled={participants >= 10}
            className="w-10 h-10 rounded-full border border-ocean/30 flex items-center justify-center hover:bg-ocean/10 transition disabled:opacity-50"
          >
            <Plus className="h-4 w-4 text-ocean" />
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Price</p>
          <p className="text-2xl font-heading text-ocean">R{price}</p>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Base price: R{BASE_PRICE} for 1 person | +R{EXTRA_PERSON_FEE} per extra person
      </p>
    </div>
  );
}