import { motion } from "framer-motion";
import { Users, Minus, Plus } from "lucide-react";
import { useEffect } from "react";

export default function ParticipantSelector({ 
  participants, 
  setParticipants, 
  onPriceChange,
  basePrice = 650, // ✅ Now accepts dynamic base price
  extraPersonFee = 150 // ✅ Now accepts dynamic extra fee
}) {
  const calculatePrice = (count) => {
    if (count === 1) return basePrice;
    return basePrice + (count - 1) * extraPersonFee;
  };

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

  // ✅ Update price when basePrice or extraPersonFee changes
  useEffect(() => {
    onPriceChange(calculatePrice(participants));
  }, [basePrice, extraPersonFee]);

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
        Base price: R{basePrice} for 1 person | +R{extraPersonFee} per extra person
      </p>
    </div>
  );
}