import { useState } from "react";
import { Tag, X, CheckCircle } from "lucide-react";

// Coupon with usage tracking (simple in-memory for testing)
// In production, this would be in a database
let couponUsageCount = 0;
const MAX_USES = 20;

const VALID_COUPONS = {
  "FIRST20": { 
    type: "percentage", 
    value: 15, 
    label: "15% OFF - First 20 Bookings",
    maxUses: 20,
    description: "Limited to first 20 bookings"
  },
};

export default function CouponInput({ onApply, onRemove, appliedCoupon }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const getRemainingUses = () => {
    return MAX_USES - couponUsageCount;
  };

  const handleApply = () => {
    setError("");
    const trimmedCode = code.trim().toUpperCase();
    
    if (!trimmedCode) {
      setError("Please enter a coupon code");
      return;
    }
    
    const coupon = VALID_COUPONS[trimmedCode];
    
    if (!coupon) {
      setError("Invalid coupon code");
      return;
    }
    
    // Check if coupon has reached usage limit
    if (couponUsageCount >= MAX_USES) {
      setError(`Sorry, this coupon has reached its limit of ${MAX_USES} uses`);
      return;
    }
    
    setIsApplying(true);
    setTimeout(() => {
      // Increment usage count when applied
      couponUsageCount++;
      
      onApply({
        code: trimmedCode,
        type: coupon.type,
        value: coupon.value,
        label: coupon.label,
        remainingUses: MAX_USES - couponUsageCount
      });
      setIsApplying(false);
      setCode("");
    }, 300);
  };

  const handleRemove = () => {
    // Decrement usage count when removed
    if (appliedCoupon) {
      couponUsageCount--;
    }
    onRemove();
    setError("");
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <div>
            <span className="text-sm text-green-700">
              Coupon applied: {appliedCoupon.code} ({appliedCoupon.label})
            </span>
            {appliedCoupon.remainingUses !== undefined && (
              <p className="text-xs text-green-600 mt-0.5">
                {appliedCoupon.remainingUses} bookings remaining
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleRemove}
          className="text-green-600 hover:text-green-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const remaining = getRemainingUses();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Have a coupon code?
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code (e.g., FIRST20)"
          className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
        />
        <button
          onClick={handleApply}
          disabled={isApplying}
          className="px-4 py-2 bg-ocean text-white text-sm rounded-lg hover:bg-ocean-dark transition disabled:opacity-50"
        >
          {isApplying ? "Applying..." : "Apply"}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      <div className="text-xs text-muted-foreground space-y-1">
        <p className="font-medium text-ocean">🔥 Limited Time Offer:</p>
        <p>Use code <span className="font-mono bg-ocean/10 px-1">FIRST20</span> for 15% OFF your booking!</p>
        <p>⏰ Only {remaining} of 20 bookings remaining</p>
      </div>
    </div>
  );
}