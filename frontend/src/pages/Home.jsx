import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Waves,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Star
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

// Services data
const services = [
  {
    id: "private",
    title: "Private Group Yoga & Sound Relaxation",
    description: "Relax and unwind in the convenience of your own accommodation. All equipment provided!",
    duration: "60 min",
    price: "From R650",
    location: "📍 On Location",
    image: privateImg,
    bookingType: "book",
    link: "/services/private-yoga",
  },
  {
    id: "athletes",
    title: "Yoga for Athletes",
    description: "Fascia release, functional movement & recovery to help you reach peak performance.",
    duration: "60 min",
    price: "R650",
    location: "📍 In Studio / On Location",
    image: groupImg,
    bookingType: "book",
    link: "/services/yoga-for-athletes",
  },
  {
    id: "sound",
    title: "Sound Journey",
    description: "Relieve stress and tension with a relaxing and restorative sound experience.",
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
    description: "Wellness sessions for teams and workplaces to reduce stress and restore balance.",
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
    description: "200hr & 300hr yoga teacher training programs for aspiring and advanced teachers.",
    duration: "Multi-month",
    price: "From R28,000",
    location: "📍 In Studio",
    image: trainingCardImg,
    bookingType: "book",
    link: "/services/teacher-training",
  },
];

// Blog posts data
const blogPosts = [
  {
    title: "Corporate Yoga for Workplace Wellness",
    excerpt: "Bringing balance and focus to your team with guided workplace sessions...",
    link: "/events"
  },
  {
    title: "What is Fascia Release? And how does it work?",
    excerpt: "Fascia release offers a gentle and restorative pathway to help bring your body back into balance...",
    link: "/events"
  },
  {
    title: "Private Yoga Experiences in Ballito",
    excerpt: "Relax in the comfort of your own home or accommodation with all equipment provided...",
    link: "/events"
  }
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed email:", email);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO SECTION - Hi I'm Cheryl (Matching Reference Site) */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0">
          <img
            src={heroBgImg}
            className="w-full h-full object-cover"
            alt="Devahiti Yoga Ballito"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Waves className="h-4 w-4 text-white/60" />
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">
                Devahiti Yoga
              </span>
              <Waves className="h-4 w-4 text-white/60" />
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-light text-white mb-4">
              Hi, I'm Cheryl
            </h1>

            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4">
              I specialise in private yoga, sound journeys and functional movement sessions
              <br />
              in the comfort of your own home or accommodation, all equipment provided.
            </p>

            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Unwind as you reduce stress and tension through gentle, mindful movement,
              followed by restorative sound ~ leaving you feeling relaxed and restored.
            </p>

            <p className="text-white/70 text-sm mb-8">
              Sessions are suitable for everyBODY, beginners welcome!
            </p>

            <Link
              to="/schedule"
              className="inline-block px-8 py-3 bg-ocean text-white text-sm uppercase tracking-widest rounded-sm hover:bg-ocean-dark transition"
            >
              Booking Menu
            </Link>

            {/* Location & Availability */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                Ballito, South Africa
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Tuesday & Thursday
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                8:00 AM Sessions
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>

      {/* SERVICES SECTION - 5 cards with BOOK NOW buttons */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-ocean mb-2">
              What I Offer
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground">
              Find Your Practice
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Relax and unwind in the convenience of your own space
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

      {/* FREE AUDIO DOWNLOAD SECTION - Lead Magnet */}
      <section className="py-16 px-6 bg-ocean/5">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="h-12 w-12 text-ocean mx-auto mb-4" />
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
            Sign up for a FREE yoga audio download!
          </h2>
          <p className="text-muted-foreground mb-6">
            A slow and gentle practice for stress and tension relief,<br />
            listen and feel as you reconnect to your body and breath.
          </p>
          
          {subscribed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700">✓ Thanks! Check your email for your free download.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-ocean text-white text-sm uppercase tracking-widest rounded-lg hover:bg-ocean-dark transition"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ABOUT CHERYL SECTION - Personal Story (Matching Reference Site) */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <img
              src={philosophyImg}
              alt="Cheryl Lancellas - Devahiti Yoga Ballito"
              className="rounded-lg w-full object-cover shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-3 w-3 text-ocean" />
              <span className="text-xs tracking-[0.3em] uppercase text-ocean">
                Owner & Founder of Devahiti Yoga Ballito
              </span>
              <Waves className="h-3 w-3 text-ocean" />
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-4">
              Hi, I'm Cheryl
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I know how life can get so full that we forget what it feels like to truly unwind,
                reconnect and simply breathe again.
              </p>
              <p>
                I learned this the hard way, after years of pushing through tension, stress and fatigue
                — until I discovered the deeply calming and restorative benefits of gentle yoga,
                functional movement, and sound relaxation.
              </p>
              <p>
                It honestly changed my life and has become my passion to share with others!
              </p>
              <p>
                I now create private and small-group sessions that invite you to slow down
                and reconnect to your body and breath, whilst sharing this special experience with friends,
                family or colleagues.
              </p>
              <p>
                Every session is a nurturing blend of slow, mindful movement, rest and therapeutic sound.
                It's a privilege to share this work and to create a peaceful, safe space where you can
                ease tension, quiet the mind and leave feeling deeply relaxed, rebalanced and restored.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-block mt-6 px-6 py-2 border border-ocean text-ocean text-sm uppercase tracking-widest rounded-sm hover:bg-ocean hover:text-white transition"
            >
              MORE ABOUT ME
            </Link>
          </motion.div>
        </div>
      </section>

      {/* EVENTS & BLOG SECTION */}
      <section className="py-16 px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
              Devahiti Events and Blog
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Waves className="h-3 w-3 text-ocean" />
              <span className="text-xs tracking-[0.3em] uppercase text-ocean">Stories & Updates</span>
              <Waves className="h-3 w-3 text-ocean" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-5 hover:border-ocean/30 transition">
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <Link to={post.link} className="text-ocean text-sm hover:underline">
                  Read More →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/events" className="text-ocean text-sm hover:underline inline-flex items-center gap-1">
              View All Events & Blog → <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION - Client Gratitude */}
      <section className="py-16 px-6 bg-ocean text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4 gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <h2 className="font-heading text-2xl mb-6">Client Gratitude</h2>
          
          <p className="text-white/90 text-base md:text-lg italic leading-relaxed mb-6">
            "I received a truly nurturing and nourishing treatment from Cheryl. She was able to tune into my body
            and what it needed. Cheryl's experience and confidence made me feel truly safe and in good hands.
            I would highly recommend Cheryl to anyone looking for a caring and personalized healing experience."
          </p>
          
          <p className="text-white/70 text-sm">
            — Client, Ballito South Africa
          </p>
        </div>
      </section>

      {/* BRAND MEANING SECTION */}
      <section className="py-16 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-3">
            Devahiti
          </h2>
          <p className="text-ocean text-sm tracking-widest mb-2">'Day-vah-hee-tee'</p>
          <p className="text-muted-foreground text-sm">
            Sanskrit for ~ Divine Order
          </p>
        </div>
      </section>

      {/* TEACHER TRAINING CTA SECTION */}
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