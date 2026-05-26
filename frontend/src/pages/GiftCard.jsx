import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Calendar, Clock, Mail, User, Send, CreditCard } from "lucide-react";


export default function GiftCard() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [recipientType, setRecipientType] = useState("someone");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("now");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const presetAmounts = [25, 50, 75, 100, 150, 200];

  const handleAmountSelect = (value) => {
    setAmount(value);
    setShowCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(parseFloat(value) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to checkout with gift card details
      navigate("/checkout", {
        state: {
          booking: {
            service_type: "Gift Card",
            total_price: amount * quantity,
            customer_name: recipientType === "myself" ? "Myself" : recipientName,
            customer_email: recipientEmail,
            notes: message,
            gift_card: {
              amount: amount,
              quantity: quantity,
              recipient_type: recipientType,
              delivery_date: deliveryDate,
              delivery_time: deliveryTime,
              message: message
            }
          },
          service: { title: "Gift Card", basePrice: amount }
        }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-ocean-dark to-ocean">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-white/80" />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-light">
            Gift Card
          </h1>
          <p className="text-white/80 mt-3 max-w-lg mx-auto">
            Give the gift of yoga, relaxation, and wellness
          </p>
        </div>
      </section>

      {/* GIFT CARD FORM */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Intro Text */}
          <div className="text-center mb-10">
            <p className="text-muted-foreground text-lg">
              Give a gift card ~ Choose an amount and write a personalized message to make this gift your own.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Amount Selection */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-heading text-xl mb-4">Amount</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAmountSelect(preset)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                      amount === preset && !showCustom
                        ? "bg-ocean text-white"
                        : "bg-ocean/10 text-ocean hover:bg-ocean/20"
                    }`}
                  >
                    R{preset}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setShowCustom(true);
                    setAmount(0);
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                    showCustom
                      ? "bg-ocean text-white"
                      : "bg-ocean/10 text-ocean hover:bg-ocean/20"
                  }`}
                >
                  Other amount
                </button>
              </div>
              
              {showCustom && (
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Enter amount (R)"
                    value={customAmount}
                    onChange={handleCustomAmount}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
                    min="10"
                    step="10"
                  />
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-heading text-xl mb-4">Quantity</h2>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-ocean/10 text-ocean text-xl hover:bg-ocean/20 transition"
                >
                  -
                </button>
                <span className="text-2xl font-heading w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-ocean/10 text-ocean text-xl hover:bg-ocean/20 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Who is the gift card for? */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-heading text-xl mb-4">Who is the gift card for?</h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRecipientType("someone")}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
                    recipientType === "someone"
                      ? "bg-ocean text-white"
                      : "bg-ocean/10 text-ocean hover:bg-ocean/20"
                  }`}
                >
                  For someone else
                </button>
                <button
                  type="button"
                  onClick={() => setRecipientType("myself")}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${
                    recipientType === "myself"
                      ? "bg-ocean text-white"
                      : "bg-ocean/10 text-ocean hover:bg-ocean/20"
                  }`}
                >
                  For myself
                </button>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-heading text-xl mb-4">Recipient Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Recipient email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Recipient name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
                      placeholder="Name"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Date & Time */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-heading text-xl mb-4">Delivery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Delivery date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Delivery time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean appearance-none"
                    >
                      <option value="now">Now</option>
                      <option value="9am">9:00 AM</option>
                      <option value="12pm">12:00 PM</option>
                      <option value="3pm">3:00 PM</option>
                      <option value="5pm">5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Gift card never expires.</p>
            </div>

            {/* Personal Message */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-heading text-xl mb-4">Message</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean resize-none"
                placeholder="Write a personalized message to make this gift your own..."
              />
            </div>

            {/* Total & Buy Button */}
            <div className="bg-ocean/5 border border-ocean/20 rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-2">Total</p>
              <p className="text-4xl font-heading text-ocean mb-6">
                R{(amount * quantity).toFixed(2)}
              </p>
              
              <button
                type="submit"
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
                    <Send className="h-4 w-4" />
                    Buy Now
                  </>
                )}
              </button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Gift card will be emailed to the recipient on the selected delivery date
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}