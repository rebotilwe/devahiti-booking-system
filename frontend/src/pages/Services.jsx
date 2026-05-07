import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Users,
  Heart,
  Music,
  Briefcase,
  Waves,
  MapPin
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";

// Import client image for hero background (using img6)
import heroBg from "../assets/images/img6.jpg";

// Service configurations for the new booking system
const getServiceConfig = (serviceType) => {
  const configs = {
    private: { id: "private", title: "Private Yoga Session", basePrice: 650, extraPersonFee: 150 },
    sound: { id: "sound", title: "Sound Journey", basePrice: 800, extraPersonFee: 150 },
    group: { id: "group", title: "Studio Drop-in Class", basePrice: 130, extraPersonFee: 0 },
    corporate: { id: "corporate", title: "Corporate Yoga", basePrice: 1999, extraPersonFee: 150 },
    "group-sound": { id: "group-sound", title: "Group Yoga & Sound Journey", basePrice: 1999, extraPersonFee: 150 }
  };
  return configs[serviceType] || configs.private;
};

// GROUPED SERVICES
const sections = [
  {
    title: "Corporate Yoga",
    description: "Wellness sessions designed for teams, offices, and corporate retreats.",
    icon: Briefcase,
    services: [
      {
        title: "Corporate Yoga Session",
        description:
          "Reduce stress, improve focus and bring balance into the workplace through guided yoga and movement.",
        duration: "60 minutes",
        price: "Custom pricing (Enquire)",
        location: "📍 On Location (Office / Venue)",
        icon: Briefcase,
        type: "enquire",
        serviceKey: "corporate"
      }
    ]
  },
  {
    title: "Visitors & Mobile Sessions",
    description: "Perfect for holidaymakers from Johannesburg visiting Ballito.",
    icon: Heart,
    services: [
      {
        title: "Private Yoga Session",
        description:
          "Personalised 1-on-1 session at your home or accommodation.",
        duration: "60 minutes",
        price: "R650 for 1 person, +R150 per extra person",
        capacity: "1+ people",
        location: "📍 On Location (Accommodation)",
        icon: Heart,
        type: "book",
        serviceKey: "private"
      },
      {
        title: "Group Yoga & Sound Journey",
        description:
          "A combination of mindful movement and sound healing, ideal for groups and retreats.",
        duration: "60 minutes",
        price: "R1999 (up to 8 people) + R150 per extra person",
        location: "📍 On Location",
        icon: Users,
        type: "book",
        capacity: "Groups up to 8",
        serviceKey: "group-sound"
      },
      {
        title: "Sound Journey",
        description:
          "A deeply restorative sound experience using healing frequencies and vibration.",
        duration: "60 minutes",
        price: "R800 for 1 person, +R150 per extra person",
        capacity: "1+ people",
        location: "📍 On Location or In Studio (confirmed after booking)",
        icon: Music,
        type: "book",
        serviceKey: "sound"
      }
    ]
  },
  {
    title: "Studio Classes",
    description: "For local practitioners. Classes are currently performing well with monthly members.",
    icon: Users,
    services: [
      {
        title: "Drop-in Class",
        description:
          "Join a studio class if you're visiting or not on a membership.",
        duration: "60 minutes",
        price: "R130",
        location: "📍 In Studio (Ballito)",
        icon: Users,
        type: "book",
        capacity: "All Levels",
        serviceKey: "group"
      }
    ]
  }
];

export default function Services() {
  const navigate = useNavigate();

  const handleBookingClick = (serviceKey, type) => {
    if (type === "enquire") {
      navigate("/contact");
      return;
    }
    
    // Navigate to the new Schedule page with the selected service
    const serviceConfig = getServiceConfig(serviceKey);
    navigate("/schedule", { state: { service: serviceConfig } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO - REPLACED with img6 */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            className="w-full h-full object-cover"
            alt="Yoga class"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-ocean/20 to-transparent" />
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
              What We Offer
            </span>
            <Waves className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white px-4"
          >
            Our Services
          </motion.h1>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">

          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex justify-center mb-2">
                  <div className="w-8 sm:w-12 h-px bg-ocean/30" />
                  <section.icon className="h-3 w-3 sm:h-4 sm:w-4 text-ocean/40 mx-2" />
                  <div className="w-8 sm:w-12 h-px bg-ocean/30" />
                </div>

                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-foreground px-4">
                  {section.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl mx-auto px-4">
                  {section.description}
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {section.services.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border hover:border-ocean/30 p-4 sm:p-6 rounded-sm transition-all duration-300 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <service.icon className="h-4 w-4 sm:h-5 sm:w-5 text-ocean flex-shrink-0" />
                        <h3 className="text-base sm:text-lg md:text-xl font-heading text-foreground">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                        {service.description}
                      </p>

                      <p className="text-xs text-muted-foreground flex items-center gap-2 mb-2 flex-wrap">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="break-words">{service.location}</span>
                      </p>

                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {service.duration}
                        </span>
                        {service.capacity && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {service.capacity}
                          </span>
                        )}
                      </div>

                      {service.type !== "enquire" && (
                        <p className="text-xs text-ocean/70 mt-2">
                          ⏱️ All sessions are 60 minutes
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                      <span className="text-ocean font-medium text-sm sm:text-base min-w-[100px] text-left sm:text-right">
                        {service.price}
                      </span>

                      {service.type === "enquire" ? (
                        <Link
                          to="/contact"
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-ocean text-white text-[10px] sm:text-xs uppercase tracking-widest hover:bg-ocean-dark transition rounded-sm whitespace-nowrap"
                        >
                          Enquire
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleBookingClick(service.serviceKey, service.type)}
                          className="px-4 sm:px-6 py-2 sm:py-3 bg-ocean text-white text-[10px] sm:text-xs uppercase tracking-widest hover:bg-ocean-dark transition rounded-sm whitespace-nowrap cursor-pointer"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      <section className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-ocean-dark/90" />
        <div className="relative text-center text-white">
          <Waves className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 sm:mb-3 text-white/40" />
          <p className="font-heading text-base sm:text-lg italic px-4">
            "If you can breathe, you can do yoga"
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 px-4 sm:px-6 text-center bg-background">
        <Link
          to="/booking"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-ocean text-white text-[10px] sm:text-xs uppercase tracking-widest hover:bg-ocean-dark transition rounded-sm"
        >
          Ready to book? Choose your session <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </section>
    </div>
  );
}