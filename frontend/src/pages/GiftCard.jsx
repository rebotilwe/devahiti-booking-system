import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Gift, Heart, Mail, Calendar as CalendarIcon, Minus, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import heroBgImg from "../assets/images/home.jpg";
import soundImg from "../assets/images/img11.jpg";
import logo from "../assets/logo1.png";

// ✅ UPDATED NAVIGATION
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Teacher Training", path: "/teacher-training" },
  { label: "Retreats", path: "/retreats" },
  { label: "Class Schedule", path: "/schedule" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

const subNav = [
  { label: "Group Class", path: "/services/group-class" },
  { label: "Private Sessions", path: "/services/private-sessions" },
  { label: "Corporate Wellness", path: "/services/corporate-wellness" },
  { label: "Sound Journey", path: "/services/sound-journey" },
  { label: "Sound Massage", path: "/services/sound-massage" },
  { label: "Fascia Release", path: "/services/fascia-release" },
  { label: "Teacher Training", path: "/services/teacher-training" },
  { label: "Educational Workshops", path: "/services/educational-workshops" },
  { label: "Retreats", path: "/services/retreats" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";
const FORMSPREE_ID = "xyklpvwn";

const amounts = [50, 90, 150, 220, 350];

export default function GiftCard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [amount, setAmount] = useState(90);
  const [customAmount, setCustomAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [recipientType, setRecipientType] = useState("someone");
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    recipientName: "",
    recipientEmail: "",
    deliveryDate: "",
    deliveryTime: "09:00",
    message: "",
  });
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    window.open(BOOKING_URL, "_blank");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const effectiveAmount = customAmount ? Number(customAmount) || 0 : amount;
  const total = effectiveAmount * quantity;

  // Custom submit handler to include gift card data
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for Formspree
    const formData = new FormData(e.target);
    formData.append("gift_card_amount", effectiveAmount);
    formData.append("gift_card_quantity", quantity);
    formData.append("gift_card_recipient_type", recipientType);
    formData.append("gift_card_total", total);
    
    // Submit to Formspree
    await handleSubmit(e);
    setSubmitted(true);
    
    // Optionally redirect to payment after 2 seconds
    setTimeout(() => {
      // window.location.href = `${BOOKING_URL}?gift=true&amount=${total}`;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar - Fixed with scroll effect */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePhoneClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleShoppingBagClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Book Online"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Sub Navbar - Second Navigation Bar */}
        <div style={{ backgroundColor: "#93C9F9" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-3">
            {subNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#93C9F9] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-xs text-gray-500 hover:text-[#93C9F9]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => {
                handleShoppingBagClick();
                setMobileOpen(false);
              }}
              className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition"
            >
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative h-[40vh] min-h-[350px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Devahiti Gift Card" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Give Devahiti</p>
          <h1 className="text-5xl font-light md:text-6xl text-white">Gift Cards</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90 italic">
            The gift of stillness, breath and time well spent.
          </p>
        </div>
        {/* curved bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Gift className="mx-auto h-12 w-12 text-[#93C9F9]" strokeWidth={1.5} />
        <h2 className="mt-6 text-3xl font-light md:text-4xl text-gray-800">A thoughtful gift, beautifully delivered</h2>
        <p className="mt-5 leading-relaxed text-gray-600">
          Digital gift cards can be used towards any private session, group yoga, sound journey, or wellness treatment. They arrive by email on the date you choose, with a personal note.
        </p>
        {/* Blue line */}
        <div className="w-20 h-px bg-[#93C9F9] mx-auto mt-6"></div>
      </section>

      {/* Gift Card Builder */}
      <section className="bg-[#F9F9FB] py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form Side */}
            <div className="lg:col-span-3">
              <form onSubmit={onSubmit} noValidate className="space-y-8 rounded-2xl bg-white p-8 shadow-md md:p-10">
                {/* Amount Selection */}
                <div>
                  <h3 className="text-xl font-light text-gray-800">Choose an amount</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {amounts.map((a) => {
                      const active = !customAmount && amount === a;
                      return (
                        <button
                          key={a}
                          type="button"
                          onClick={() => {
                            setAmount(a);
                            setCustomAmount("");
                          }}
                          className={`rounded-full border-2 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition ${
                            active
                              ? "bg-[#93C9F9] border-[#93C9F9] text-white"
                              : "border-[#93C9F9] text-[#93C9F9] hover:bg-[#93C9F9]/10"
                          }`}
                        >
                          R{a}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Or enter a custom amount (ZAR)</label>
                    <input
                      type="number"
                      min={20}
                      max={2000}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="e.g. 120"
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-xl font-light text-gray-800">Quantity</h3>
                  <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-gray-200 p-1.5">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="w-10 text-center text-lg font-semibold text-gray-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 transition"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Recipient Type */}
                <div>
                  <h3 className="text-xl font-light text-gray-800">Who is this for?</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setRecipientType("someone")}
                      className={`flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left transition ${
                        recipientType === "someone"
                          ? "border-[#93C9F9] bg-[#93C9F9]/10"
                          : "border-gray-200"
                      }`}
                    >
                      <Heart className="h-5 w-5 text-[#93C9F9]" strokeWidth={1.6} />
                      <span className="text-sm font-semibold uppercase tracking-wider text-gray-700">Someone special</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientType("myself")}
                      className={`flex items-center gap-3 rounded-xl border-2 px-5 py-4 text-left transition ${
                        recipientType === "myself"
                          ? "border-[#93C9F9] bg-[#93C9F9]/10"
                          : "border-gray-200"
                      }`}
                    >
                      <Gift className="h-5 w-5 text-[#93C9F9]" strokeWidth={1.6} />
                      <span className="text-sm font-semibold uppercase tracking-wider text-gray-700">Myself</span>
                    </button>
                  </div>
                </div>

                {/* Sender Details */}
                <div>
                  <h3 className="text-xl font-light text-gray-800">Your details</h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500">Your name *</label>
                      <input
                        name="senderName"
                        value={form.senderName}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                        required
                      />
                      <ValidationError field="senderName" errors={state.errors} className="mt-1 text-xs text-red-500" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500">Your email *</label>
                      <input
                        name="senderEmail"
                        type="email"
                        value={form.senderEmail}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                        required
                      />
                      <ValidationError field="senderEmail" errors={state.errors} className="mt-1 text-xs text-red-500" />
                    </div>
                  </div>
                </div>

                {/* Recipient Details (if for someone else) */}
                {recipientType === "someone" && (
                  <div>
                    <h3 className="text-xl font-light text-gray-800">Recipient</h3>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500">Recipient name *</label>
                        <input
                          name="recipientName"
                          value={form.recipientName}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                        />
                        <ValidationError field="recipientName" errors={state.errors} className="mt-1 text-xs text-red-500" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500">Recipient email *</label>
                        <input
                          name="recipientEmail"
                          type="email"
                          value={form.recipientEmail}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                        />
                        <ValidationError field="recipientEmail" errors={state.errors} className="mt-1 text-xs text-red-500" />
                      </div>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500">Delivery date</label>
                        <div className="relative mt-2">
                          <CalendarIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            name="deliveryDate"
                            type="date"
                            value={form.deliveryDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#93C9F9]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500">Delivery time</label>
                        <input
                          name="deliveryTime"
                          type="time"
                          value={form.deliveryTime}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Message */}
                <div>
                  <h3 className="text-xl font-light text-gray-800">Personal message</h3>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    placeholder="Write a few warm words…"
                    className="mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#93C9F9]"
                  />
                  <p className="mt-1 text-right text-xs text-gray-400">{form.message.length}/500</p>
                </div>

                {state.succeeded && (
                  <div className="flex items-start gap-3 rounded-xl border border-green-500 bg-green-50 px-5 py-4 text-sm text-green-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>Thank you! Your gift card request has been received. We'll contact you shortly to complete the purchase.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full rounded-full bg-[#93C9F9] px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#65AEEA] transition disabled:opacity-50"
                >
                  {state.submitting ? "Processing..." : `Continue to checkout — R${total}`}
                </button>
              </form>
            </div>

            {/* Preview Side */}
            <div className="lg:col-span-2">
              <div className="sticky top-6 space-y-6">
                {/* Gift Card Preview */}
                <div className="overflow-hidden rounded-2xl p-8 text-white shadow-lg" style={{ background: "linear-gradient(135deg, #93C9F9 0%, #65AEEA 100%)" }}>
                  <div className="flex items-center justify-between">
                    <img src={logo} alt="" className="h-10 w-auto brightness-0 invert" />
                    <span className="text-xs uppercase tracking-[0.3em] opacity-90">Gift Card</span>
                  </div>
                  <p className="mt-10 text-4xl font-light">Devahiti</p>
                  <p className="mt-1 text-sm italic opacity-90">'Day-vah-hee-tee' — Divine Order</p>

                  <div className="mt-10 border-t border-white/30 pt-6">
                    <p className="text-xs uppercase tracking-widest opacity-80">Value</p>
                    <p className="mt-1 text-5xl font-light">R{effectiveAmount || 0}</p>
                    {quantity > 1 && <p className="mt-1 text-xs uppercase tracking-widest opacity-80">× {quantity} cards</p>}
                  </div>

                  {form.recipientName && recipientType === "someone" && (
                    <p className="mt-6 text-sm"><span className="opacity-80">For </span>{form.recipientName}</p>
                  )}
                  {form.message && <p className="mt-3 text-sm italic leading-relaxed opacity-95">“{form.message}”</p>}
                </div>

                {/* How It Works */}
                <div className="rounded-2xl bg-white p-6 shadow-md">
                  <h4 className="text-lg font-light text-gray-800">How it works</h4>
                  <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#93C9F9]" />
                      Delivered instantly or on a date you choose
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#93C9F9]" />
                      Redeemable on any session or treatment
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#93C9F9]" />
                      Valid for 3 years from purchase
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="relative overflow-hidden px-6 py-20 text-center text-white" style={{ background: "linear-gradient(135deg, #93C9F9 0%, #65AEEA 100%)" }}>
        <img src={soundImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
        <div className="relative">
          <h2 className="text-3xl font-light md:text-4xl">Prefer to gift a specific experience?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/90">
            Book and pay for a session directly — perfect for special occasions.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-3 text-sm font-semibold uppercase tracking-wider text-[#93C9F9] hover:bg-gray-100 transition"
          >
            <Mail className="h-4 w-4" /> Book Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-white" style={{ backgroundColor: "#93C9F9" }}>
        <img src={logo} alt="" className="mx-auto h-12 w-auto brightness-0 invert" />
        <p className="mt-4 text-2xl font-light">Devahiti</p>
        <p className="mt-2 text-sm italic opacity-90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest opacity-80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
      </footer>
    </div>
  );
}