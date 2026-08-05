import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { 
  Waves, Calendar, Clock, Users, MapPin, 
  User, Mail, Phone, Lock, ArrowLeft, Menu, X, ShoppingBag
} from "lucide-react";
import { initiateBooking } from "../api/api";
import CouponInput from "../components/CouponInput";
import logo from "../assets/devahiti.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Teacher Training", path: "/teacher-training" },
  { label: "Retreats", path: "/retreats" },
  { label: "Class Schedule", path: "/class-schedule" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, giftCard, service } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedTotal, setDiscountedTotal] = useState(booking?.total_price || 0);
  const [originalTotal] = useState(booking?.total_price || 0);

  // Editable customer details — pre-filled from booking if a prior step already
  // collected them, but always editable here so gift card purchases (which skip
  // the booking form) can actually enter their details.
  const [customer, setCustomer] = useState({
    name: booking?.customer_name || "",
    email: booking?.customer_email || "",
    phone: booking?.customer_phone || "",
    address: booking?.customer_address || "",
  });
  const [customerErrors, setCustomerErrors] = useState({});

  if (!booking) {
    navigate("/services");
    return null;
  }

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    navigate("/services");
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    if (customerErrors[name]) {
      setCustomerErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCustomer = () => {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.email.trim() || !/\S+@\S+\.\S+/.test(customer.email)) newErrors.email = "A valid email is required";
    if (!customer.phone.trim()) newErrors.phone = "Phone number is required";
    if (!giftCard && !customer.address.trim()) newErrors.address = "Address is required for on-location sessions";
    setCustomerErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    if (!date) return "Not selected";
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
    });
  };

  const formatTime = (time) => {
    if (!time) return "Not selected";
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const handleApplyCoupon = (coupon) => {
    let discountAmount = 0;
    
    if (coupon.type === "percentage") {
      discountAmount = (originalTotal * coupon.value) / 100;
    } else if (coupon.type === "fixed") {
      discountAmount = coupon.value;
    }
    
    const newTotal = Math.max(0, originalTotal - discountAmount);
    
    setAppliedCoupon(coupon);
    setDiscountedTotal(Math.round(newTotal));
  };
  
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountedTotal(originalTotal);
  };

  const handlePayment = async () => {
    if (!validateCustomer()) return;

    setLoading(true);
    setLoadingStep("Creating your booking...");

    try {
      const bookingData = {
        service_type: booking.service_type,
        booking_date: booking.booking_date,
        booking_time: booking.booking_time,
        participants: booking.participants,
        total_price: discountedTotal,
        original_price: originalTotal,
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        customer_address: customer.address,
        notes: booking.notes || "",
        ...(appliedCoupon && {
          coupon_code: appliedCoupon.code,
          discount_amount: originalTotal - discountedTotal,
          discount_percentage: appliedCoupon.value
        })
      };
      
      console.log("Creating booking...");
      const bookingResult = await initiateBooking(bookingData);
      console.log("Booking result:", bookingResult);
      
      if (bookingResult.bookingId) {
        setLoadingStep("Preparing secure payment...");
        
        const checkoutResponse = await fetch('https://devahiti-booking-system.onrender.com/api/payments/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: discountedTotal,
            originalAmount: originalTotal,
            bookingId: bookingResult.bookingId,
            customerName: customer.name,
            customerEmail: customer.email,
            ...(appliedCoupon && {
              couponCode: appliedCoupon.code,
              discountAmount: originalTotal - discountedTotal
            })
          }),
        });
        
        const checkoutData = await checkoutResponse.json();
        console.log("Checkout response:", checkoutData);
        
        if (checkoutData.redirectUrl) {
          setLoadingStep("Redirecting to payment page...");
          setTimeout(() => {
            window.location.href = checkoutData.redirectUrl;
          }, 500);
        } else {
          throw new Error("No redirectUrl from Yoco");
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Please try again. Error: " + err.message);
      setLoading(false);
      setLoadingStep("");
    }
  };

  const discountAmount = originalTotal - discountedTotal;

  return (
    <div className="min-h-screen bg-[#F3F8FC]">
      {/* Top Navbar — standard site header, matching every other page */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 sm:h-14 w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#65AEEA]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Call us">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Book Online">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#65AEEA] transition-colors" aria-label="Menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto max-w-7xl px-6 py-3 text-center">
            <button
              onClick={() => navigate("/services")}
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity"
            >
              Our Services
            </button>
          </div>
        </div>
      </header>

      <div className="h-16 sm:h-20 md:h-28" />

      {mobileOpen && (
        <div className="fixed top-16 sm:top-20 md:top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#65AEEA] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-4 w-full bg-[#65AEEA] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full">
              Our Services
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative py-14 sm:py-16 px-6 text-center" style={{ backgroundColor: "#65AEEA" }}>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/70">
            Secure Checkout
          </span>
          <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-white px-4">
          {giftCard ? "Complete Your Gift Card Purchase" : "Complete Your Booking"}
        </h1>
      </section>

      {/* Checkout Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 hover:text-[#65AEEA] transition flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">
                {giftCard ? "Gift Card Summary" : "Booking Summary"}
              </h2>
              <div className="space-y-3">
                {giftCard ? (
                  <>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Gift</span>
                      <span className="font-medium">{service?.title || booking.service_type}</span>
                    </div>
                    {service?.description && (
                      <p className="text-sm text-muted-foreground py-2">{service.description}</p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium">{booking.service_type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Date
                      </span>
                      <span>{formatDate(booking.booking_date)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Time
                      </span>
                      <span>{formatTime(booking.booking_time)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" /> Participants
                      </span>
                      <span>{booking.participants} people</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Customer Details — now a real, editable form */}
            <div className="bg-white rounded-lg shadow-sm border border-ocean/10 p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Full Name <span className="text-ocean">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="Your full name"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean ${
                        customerErrors.name ? "border-red-500" : "border-border"
                      }`}
                    />
                  </div>
                  {customerErrors.name && <p className="text-xs text-red-500 mt-1">{customerErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email <span className="text-ocean">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleCustomerChange}
                      placeholder="your@email.com"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean ${
                        customerErrors.email ? "border-red-500" : "border-border"
                      }`}
                    />
                  </div>
                  {customerErrors.email && <p className="text-xs text-red-500 mt-1">{customerErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone Number <span className="text-ocean">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      placeholder="+27 84 090 2083"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean ${
                        customerErrors.phone ? "border-red-500" : "border-border"
                      }`}
                    />
                  </div>
                  {customerErrors.phone && <p className="text-xs text-red-500 mt-1">{customerErrors.phone}</p>}
                </div>

                {!giftCard && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Address <span className="text-ocean">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea
                        name="address"
                        value={customer.address}
                        onChange={handleCustomerChange}
                        rows={3}
                        placeholder="Your full address for on-location sessions"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-ocean resize-none ${
                          customerErrors.address ? "border-red-500" : "border-border"
                        }`}
                      />
                    </div>
                    {customerErrors.address && <p className="text-xs text-red-500 mt-1">{customerErrors.address}</p>}
                  </div>
                )}

                {giftCard && (
                  <p className="text-xs text-muted-foreground">
                    Your gift card will be emailed to the address above.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Sidebar — no longer sticky, so it can't drift out of alignment with the left column while scrolling */}
          <div className="lg:col-span-1">
            <div className="bg-ocean/5 border border-ocean/20 rounded-lg p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">Payment Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R{originalTotal}</span>
                </div>
                
                <CouponInput
                  onApply={handleApplyCoupon}
                  onRemove={handleRemoveCoupon}
                  appliedCoupon={appliedCoupon}
                />
                
                {appliedCoupon && discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 pt-2 border-t border-ocean/10">
                    <span>Discount ({appliedCoupon.value}% off)</span>
                    <span>-R{discountAmount}</span>
                  </div>
                )}
              </div>
              
              <div className="text-center pt-4 border-t border-ocean/20">
                <p className="text-xs text-muted-foreground mb-1">Total due</p>
                <p className="text-3xl font-heading text-ocean">R{discountedTotal}</p>
                {appliedCoupon && (
                  <p className="text-xs text-green-600 mt-1">
                    You saved R{discountAmount}!
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">Including all fees</p>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-3 bg-ocean text-white rounded-lg font-medium hover:bg-ocean-dark transition disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm">{loadingStep || "Processing..."}</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay R{discountedTotal} Securely
                  </>
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure payment powered by Yoco
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {giftCard ? "Your gift card will be sent after successful payment" : "Your booking will be confirmed after successful payment"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}