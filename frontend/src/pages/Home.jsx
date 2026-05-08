import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Waves, MapPin, Star } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import FreeTrialPopup from "../components/FreeTrialPopup";

// Images
import philosophyImg from "../assets/images/img2.jpg";
import trainingImg from "../assets/images/img4.jpg";

import groupImg from "../assets/images/img5.jpg";
import privateImg from "../assets/images/img13.jpg";
import soundImg from "../assets/images/img11.jpg";
import corporateImg from "../assets/images/img1.jpg";
import trainingCardImg from "../assets/images/img9.jpg";
import heroBgImg from "../assets/images/img14.jpg";

const services = [
  {
    id: "group",
    title: "Studio Drop-in Class",
    description: "Join an existing class at the studio. Suitable for all levels.",
    duration: "60 min",
    price: "R130 drop-in",
    location: "📍 In Studio",
    image: groupImg,
    bookingType: "group",
  },
  {
    id: "private",
    title: "Private Yoga Session",
    description: "Personalised session at your home or accommodation.",
    duration: "60 min",
    price: "R650 (+R150 per extra person)",
    location: "📍 On Location",
    image: privateImg,
    bookingType: "private",
  },
  {
    id: "sound",
    title: "Sound Journey",
    description: "Restorative sound healing experience.",
    duration: "60 min",
    price: "From R800",
    location: "📍 On Location",
    image: soundImg,
    bookingType: "sound",
  },
  {
    id: "corporate",
    title: "Corporate Yoga",
    description: "Wellness sessions for teams and events.",
    duration: "60 min",
    price: "R1999 (up to 8 people)",
    location: "📍 On Location",
    image: corporateImg,
    bookingType: "corporate",
  },
  {
    id: "training",
    title: "Teacher Training",
    description: "200hr & 300hr advanced training programs.",
    duration: "Multi-month",
    price: "Enquire for pricing",
    location: "📍 In Studio",
    image: trainingCardImg,
    bookingType: "enquire",
  },
];

const animatedWords = ["Breathe", "Center", "Align", "Flow", "Release", "Restore"];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setIsVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>

      {/* HERO - Simplified */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBgImg} className="w-full h-full object-cover" alt="Hero background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Waves className="h-3 w-3 text-white/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/70">Devahiti Yoga</span>
            <Waves className="h-3 w-3 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-light text-white"
          >
            Yoga & Movement Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/70 text-base max-w-xl mx-auto mt-4"
          >
            Restore balance through gentle movement, breathwork, and mindful practice.
          </motion.p>

          <div className="flex items-center justify-center gap-2 mt-3 text-white/50 text-sm">
            <MapPin className="h-3 w-3" />
            Ballito, South Africa
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/services" className="px-8 py-3 bg-ocean text-white text-xs uppercase tracking-wider rounded-sm hover:bg-ocean-dark transition">
              Book a Session
            </Link>
            <Link to="/services" className="px-8 py-3 border border-white/30 text-white text-xs uppercase tracking-wider rounded-sm hover:bg-white/10 transition">
              View Services
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* SERVICES PREVIEW - Simplified */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">Our Offerings</h2>
            <p className="text-muted-foreground mt-2">Find the practice that speaks to you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <ServiceCard key={i} {...service} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-ocean text-sm hover:gap-3 transition-all">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY - Simplified */}
      <section className="py-16 px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img src={philosophyImg} alt="Yoga practice" className="rounded-lg w-full" />
          </div>
          <div className="md:w-1/2">
            <p className="text-xs tracking-[0.3em] uppercase text-ocean mb-2">Our Philosophy</p>
            <h2 className="font-heading text-3xl font-light text-foreground mb-4">Rooted in Science & Tradition</h2>
            <p className="text-muted-foreground mb-4">
              Rooted in science and evidence-based movement practices, Devahiti Yoga is designed to facilitate alignment and harmony.
            </p>
            <div className="border-l-4 border-ocean pl-4">
              <p className="italic text-ocean">"If you can breathe, you can do yoga!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHER TRAINING - Simplified */}
      <section className="py-16 px-6 bg-ocean text-white text-center">
        <h2 className="font-heading text-3xl font-light mb-2">Teacher Training</h2>
        <p className="text-white/80 mb-3">200hr & 300hr Advanced Programs</p>
        <p className="text-white/70 text-sm mb-4">Starting May 16-17, 2026 (200hr) | June 13-14, 2026 (300hr)</p>
        <Link to="/contact" className="inline-block px-6 py-2 bg-white text-ocean text-xs uppercase tracking-wider rounded-sm hover:bg-white/90 transition">
          Enquire Now
        </Link>
      </section>

      <FreeTrialPopup />
    </motion.div>
  );
}