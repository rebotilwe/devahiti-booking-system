import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Waves,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";
import FreeTrialPopup from "../components/FreeTrialPopup";

// Images
import philosophyImg from "../assets/images/img2.jpg";

import groupImg from "../assets/images/img5.jpg";
import privateImg from "../assets/images/img13.jpg";
import soundImg from "../assets/images/img11.jpg";
import corporateImg from "../assets/images/img1.jpg";
import trainingCardImg from "../assets/images/img9.jpg";
import heroBgImg from "../assets/images/img7.jpg";

// Updated services preview - ALL with direct booking links
const services = [

  {
    id: "athletes",
    title: "Yoga for Athletes",
    description:
      "Improve mobility, fascia release, recovery and functional movement to reach peak performance.",
    duration: "60 min",
    price: "R650",
    location: "📍 In Studio / On Location",
    image: privateImg,
    bookingType: "book",
    link: "/services/yoga-for-athletes",
  },
  {
    id: "private",
    title: "Private Yoga Session",
    description:
      "A personalised yoga experience tailored to your body, goals and energy.",
    duration: "60 min",
    price: "R650 (+R150 per extra person)",
    location: "📍 On Location",
    image: privateImg,
    bookingType: "book",
    link: "/services/private-yoga",
  },
  {
    id: "sound",
    title: "Sound Journey",
    description:
      "A deeply restorative sound healing experience designed to calm the nervous system.",
    duration: "60 min",
    price: "From R800",
    location: "📍 On Location / In Studio",
    image: soundImg,
    bookingType: "book",
    link: "/services/sound-journey",
  },
  {
    id: "corporate",
    title: "Corporate Yoga",
    description:
      "Wellness sessions for teams and workplaces to reduce stress and restore balance.",
    duration: "60 min",
    price: "R1500 per session",
    location: "📍 On Location",
    image: corporateImg,
    bookingType: "book",
    link: "/services/corporate-yoga",
  },
  {
    id: "training",
    title: "Teacher Training",
    description:
      "200hr & 300hr yoga teacher training programs for aspiring and advanced teachers.",
    duration: "Multi-month",
    price: "From R28,000",
    location: "📍 In Studio",
    image: trainingCardImg,
    bookingType: "book",
    link: "/services/teacher-training",
  },
];

const animatedWords = [
  "Breathe",
  "Center",
  "Align",
  "Flow",
  "Release",
  "Restore",
];

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentWordIndex(
          (prev) => (prev + 1) % animatedWords.length
        );
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBgImg}
            className="w-full h-full object-cover"
            alt="Devahiti Yoga"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Waves className="h-3 w-3 text-white/60" />

            <span className="text-[10px] tracking-[0.4em] uppercase text-white/70">
              Devahiti Yoga
            </span>

            <Waves className="h-3 w-3 text-white/60" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl font-light text-white leading-tight"
          >
            Yoga, Healing
            <br />
            & Functional Movement
          </motion.h1>

          {/* Animated Word */}
          <div className="h-10 flex items-center justify-center mt-5">
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="text-ocean-light text-xl md:text-2xl font-light"
            >
              {animatedWords[currentWordIndex]}
            </motion.span>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/75 text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            From private yoga to sound journeys to yoga,
            athlete recovery and corporate wellness — every session
            is designed to help you reconnect, restore and feel your
            best.
          </motion.p>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 mt-5 text-white/60 text-sm">
            <MapPin className="h-3 w-3" />
            Ballito, South Africa
          </div>

          {/* Availability - Fixed Ballito schedule */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Tuesday & Thursday
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              8:00 AM Sessions (Ballito)
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/schedule"
              className="px-8 py-3 bg-ocean text-white text-xs uppercase tracking-widest rounded-sm hover:bg-ocean-dark transition"
            >
              Book a Session
            </Link>

            <Link
              to="/services"
              className="px-8 py-3 border border-white/30 text-white text-xs uppercase tracking-widest rounded-sm hover:bg-white/10 transition"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-ocean mb-2">
              Our Offerings
            </p>

            <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground">
              Find Your Practice
            </h2>

            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Whether you're looking to move, recover, heal or
              simply breathe deeper — there's a space for you here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                {...service}
                index={i}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-ocean text-sm hover:gap-3 transition-all"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={philosophyImg}
              alt="Yoga philosophy"
              className="rounded-lg w-full object-cover"
            />
          </div>

          <div className="md:w-1/2">
            <p className="text-xs tracking-[0.3em] uppercase text-ocean mb-3">
              Our Philosophy
            </p>

            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-5">
              Rooted in Science,
              <br />
              Guided by Tradition
            </h2>

            <p className="text-muted-foreground mb-5 leading-relaxed">
              Devahiti Yoga combines evidence-based movement,
              fascia release techniques and mindful practices to
              create experiences that support healing, mobility,
              strength and inner calm.
            </p>

            <div className="border-l-4 border-ocean pl-4">
              <p className="italic text-ocean text-lg">
                “If you can breathe, you can do yoga.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHER TRAINING - UPDATED: Removed "Enquire Now", using direct booking */}
      <section className="py-20 px-6 bg-ocean text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-3">
            Advanced Programs
          </p>

          <h2 className="font-heading text-3xl md:text-5xl font-light mb-4">
            Teacher Training
          </h2>

          <p className="text-white/80 mb-3">
            200hr & 300hr Advanced Yoga Teacher Training Programs
          </p>

          <p className="text-white/70 text-sm mb-8">
            Starting May 16–17, 2026 (200hr) & June 13–14, 2026 (300hr)
          </p>

          <Link
            to="/schedule?service=teacher-training"
            className="inline-block px-8 py-3 bg-white text-ocean text-xs uppercase tracking-widest rounded-sm hover:bg-white/90 transition"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* FREE CLASS POPUP */}
      <FreeTrialPopup />
    </motion.div>
  );
}