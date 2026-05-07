import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Heart,
  Music,
  Briefcase,
  Waves,
  MapPin,
  Droplets,
  ArrowRight,
  CheckCircle
} from "lucide-react";

import CalendlyEmbed from "../components/CalendlyEmbed";

// Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyklpvwn";

// Calendly links
const CALENDLY_LINKS = {
  group: "https://calendly.com/cheryl-sayogasafaris/drop-in-class-clone",
  private: "https://calendly.com/cheryl-sayogasafaris/private-yoga-session",
  sound: "https://calendly.com/cheryl-sayogasafaris/sound-journey-clone",
  combo: "https://calendly.com/cheryl-sayogasafaris/sound-journey-clone",
};

const sections = [
  {
    title: "Corporate Yoga",
    description: "Wellness sessions for teams, offices, and retreats.",
    icon: Briefcase,
    packages: [
      {
        title: "Corporate Yoga Session",
        duration: "60 minutes",
        price: "Custom pricing",
        people: "Up to 8 people (additional per person)",
        location: "📍 On Location (Office / Venue)",
        icon: Users,
        type: "enquire"
      }
    ]
  },
  {
    title: "Visitors & Mobile Sessions",
    description: "Perfect for holidaymakers from Johannesburg visiting Ballito.",
    icon: Heart,
    packages: [
    {
  title: "Private Yoga Session",
  duration: "60 minutes",
  price: "R650 for 1 person, +R150 per extra person",  // ✅ UPDATE
  people: "1+ people",
  location: "📍 On Location (Accommodation)",
  icon: Heart,
  type: "book",
  calendlyKey: "private"
},
      {
        title: "Group Yoga & Sound Journey",
        duration: "60 minutes",
        price: "R1999 (up to 8 people) + R150 per extra person",
        people: "Groups (up to 8)",
        location: "📍 On Location",
        icon: Music,
        type: "book",
        calendlyKey: "combo"
      },
      {
        title: "Sound Journey",
  duration: "60 minutes",
  price: "R800 for 1 person, +R150 per extra person",  // ✅ UPDATE
  people: "1+ people",
  location: "📍 On Location or In Studio (confirmed after booking)",
  icon: Music,
  type: "book",
  calendlyKey: "sound"
      }
    ]
  },
  {
    title: "Studio Classes",
    description: "For local practitioners. Drop-ins are only available during scheduled class times and must be booked directly with us.",
    icon: Users,
    packages: [
      {
        title: "Drop-in Class",
        duration: "60 minutes",
        price: "R130",
        people: "All Levels",
        location: "📍 In Studio (Ballito)",
        icon: Users,
        type: "enquire"
      }
    ]
  }
];

export default function Booking() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: "",
    address: "",
    notes: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormSubmitted(true);
        localStorage.setItem("bookingForm", JSON.stringify(formData));
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please check your connection.");
    } finally {
      setSending(false);
    }
  };

  const handleSelectPackage = (pkg) => {
    if (pkg.type === "enquire") {
      navigate("/contact");
      return;
    }

    if (!formSubmitted) {
      alert("Please complete your details first");
      return;
    }

    setSelectedPackage(pkg);

    setTimeout(() => {
      const calendarSection = document.getElementById("calendar-section");
      if (calendarSection) {
        calendarSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 200);
  };

  const getCalendlyUrl = (pkg) => {
    return CALENDLY_LINKS[pkg.calendlyKey] || CALENDLY_LINKS.group;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO with Ocean Wave Overlay */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69d8b9a35e6ab29a2127374b/3e26628f7_generated_7b319b32.png"
            className="w-full h-full object-cover"
            alt="Yoga class"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-ocean/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-3 sm:mb-4"
          >
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/60">
              Start Your Journey
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white px-4">
            Book Your Session
          </h1>
        </div>
      </section>

      {/* STEP 1: CUSTOM FORM */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-2">
            <div className="w-8 sm:w-12 h-px bg-ocean/30" />
            <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-ocean/40 mx-2" />
            <div className="w-8 sm:w-12 h-px bg-ocean/30" />
          </div>
          <h2 className="font-heading text-xl sm:text-2xl text-foreground">Step 1: Your Details</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 px-4">
            Please fill in your contact information before selecting a session
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              name="name"
              placeholder="Full Name *"
              onChange={handleChange}
              required
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-border rounded-sm focus:outline-none focus:border-ocean transition-colors"
            />
            <input
              name="email"
              placeholder="Email *"
              type="email"
              onChange={handleChange}
              required
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-border rounded-sm focus:outline-none focus:border-ocean transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              name="phone"
              placeholder="Phone Number *"
              onChange={handleChange}
              required
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-border rounded-sm focus:outline-none focus:border-ocean transition-colors"
            />
            <input
              name="people"
              placeholder="Number of People (for group sessions)"
              onChange={handleChange}
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-border rounded-sm focus:outline-none focus:border-ocean transition-colors"
            />
          </div>

          <input
            name="address"
            placeholder="Address (required for on-location sessions)"
            onChange={handleChange}
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-border rounded-sm focus:outline-none focus:border-ocean transition-colors"
          />

          <textarea
            name="notes"
            placeholder="Notes / Special Requests"
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-border rounded-sm focus:outline-none focus:border-ocean transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={sending || formSubmitted}
            className={`w-full py-3 sm:py-3.5 text-white text-xs sm:text-sm uppercase tracking-widest transition rounded-sm ${
              formSubmitted 
                ? "bg-green-600 cursor-default" 
                : "bg-ocean hover:bg-ocean-dark"
            }`}
          >
            {sending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : formSubmitted ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" /> Details Saved
              </span>
            ) : (
              "Save My Details"
            )}
          </button>
        </form>

        {formSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-ocean text-xs sm:text-sm text-center mt-3"
          >
            ✔ Your details have been saved. Now select a session below to continue.
          </motion.p>
        )}
      </section>

      {/* STEP 2: PACKAGES - Only visible after form submission */}
      {formSubmitted && (
        <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-12 sm:mb-16">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex justify-center mb-2">
                  <div className="w-8 sm:w-12 h-px bg-ocean/30" />
                  <section.icon className="h-3 w-3 sm:h-4 sm:w-4 text-ocean/40 mx-2" />
                  <div className="w-8 sm:w-12 h-px bg-ocean/30" />
                </div>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-foreground px-4">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl mx-auto px-4">
                    {section.description}
                  </p>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {section.packages.map((pkg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-card border p-4 sm:p-6 rounded-sm transition-all duration-300 flex flex-col sm:flex-row justify-between gap-4 ${
                      selectedPackage?.title === pkg.title
                        ? "border-ocean shadow-md bg-ocean/5"
                        : "border-border hover:border-ocean/30"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <pkg.icon className="h-4 w-4 sm:h-5 sm:w-5 text-ocean flex-shrink-0" />
                        <h3 className="text-base sm:text-lg md:text-xl font-heading text-foreground">
                          {pkg.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 mb-2 flex-wrap">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="break-words">{pkg.location}</span>
                      </p>

                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {pkg.people}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                      <span className="text-ocean font-medium text-sm sm:text-base min-w-[100px] text-left sm:text-right">
                        {pkg.price}
                      </span>

                      <button
                        onClick={() => handleSelectPackage(pkg)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 text-xs uppercase tracking-widest transition rounded-sm whitespace-nowrap ${
                          selectedPackage?.title === pkg.title
                            ? "bg-ocean-dark text-white"
                            : "bg-ocean text-white hover:bg-ocean-dark"
                        }`}
                      >
                        {pkg.type === "enquire" ? "Enquire" : "Choose Session"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* STEP 3: CALENDLY SECTION */}
      <section id="calendar-section" className="py-8 sm:py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        {selectedPackage && selectedPackage.type === "book" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-ocean/5 border border-ocean/20 p-4 sm:p-6 md:p-8 rounded-lg"
          >
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-foreground">
                Choose Your Date & Time
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                You are booking: <span className="font-medium text-ocean">{selectedPackage.title}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ⏱️ All sessions are 60 minutes
              </p>
            </div>

            <div className="w-full overflow-x-auto">
              <CalendlyEmbed url={getCalendlyUrl(selectedPackage)} />
            </div>

            <div className="text-center mt-4 pt-4 border-t border-ocean/20">
              <p className="text-xs text-muted-foreground mb-2">
                Having trouble seeing the calendar?
              </p>
              <a
                href={getCalendlyUrl(selectedPackage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-ocean hover:underline text-sm"
              >
                Click here to book directly on Calendly →
              </a>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              📍 <span className="font-medium">Important:</span> You will be required to provide your address during booking for all on-location sessions.
            </p>
          </motion.div>
        ) : selectedPackage && selectedPackage.type === "enquire" ? null : formSubmitted ? (
          <div className="text-center py-8 sm:py-12 bg-muted/30 border border-border rounded-lg">
            <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-ocean/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground px-4">
              Select a session above to begin your booking
            </p>
          </div>
        ) : null}
      </section>

      {/* PAYMENT INFO */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="text-center bg-ocean/5 border border-ocean/20 p-4 sm:p-6 rounded-lg">
          <p className="text-xs sm:text-sm text-muted-foreground">
            💳 <span className="text-ocean font-medium">Payment process:</span>{" "}
            After booking via Calendly, you will receive a confirmation email with a secure Yoco payment link.
            Your session is confirmed once payment is completed.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="pb-8 sm:pb-12 px-4 sm:px-6 text-center">
        <Link to="/contact" className="text-ocean hover:underline text-xs sm:text-sm inline-flex items-center gap-1">
          Need help? Contact us <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      {/* QUOTE SECTION */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-ocean-dark/90" />
        <div className="relative text-center text-white">
          <Waves className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 sm:mb-3 text-white/40" />
          <p className="font-heading text-base sm:text-lg italic px-4">
            "If you can breathe, you can do yoga"
          </p>
        </div>
      </section>
    </div>
  );
}