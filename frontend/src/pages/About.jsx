import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Waves, Droplets, Mail, Phone, MapPin } from "lucide-react";

// Import client images
import heroImg from "../assets/images/img7.jpg";
import philosophyImg from "../assets/images/img5.jpg";

export default function About() {
  return (
    <div>
      {/* Hero - REPLACED with img7 */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Devahiti Yoga Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean/20 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Waves className="h-4 w-4 text-white/60" />
            <span className="text-xs tracking-[0.4em] uppercase text-white/60">
              Welcome To Devahiti
            </span>
            <Waves className="h-4 w-4 text-white/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white"
          >
            A Beautiful Open-Air Yoga Studio
          </motion.h1>
        </div>
      </section>

      {/* Intro Section - Cheryl's Wording */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Welcome to Devahiti, a beautiful open-air yoga and movement studio located in Ballito, South Africa.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Hi, I am <span className="font-medium text-foreground">Cheryl Lancellas</span>. I specialise in private and 
              corporate group yoga and movement classes, sound journey experiences, and educational workshops, 
              in our small home studio or in the comfort of your holiday accommodation. All equipment is provided.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              Unwind with family and friends as you reduce stress through mindful movement, followed
              by a nurturing sound journey, leaving you feeling relaxed and restored.
            </p>

            <p className="text-sm text-ocean mt-6 uppercase tracking-widest font-medium">
              Beginners are always welcome ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* Devahiti Meaning */}
      <section className="py-20 lg:py-28 px-6 bg-gradient-to-b from-white to-ocean/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-12 h-px bg-ocean/30" />
              <span className="mx-3 text-ocean/50 text-xs">✦</span>
              <div className="w-12 h-px bg-ocean/30" />
            </div>
            <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-6">
              Devahiti is a Sanskrit word meaning <span className="text-ocean">Divine</span> or{" "}
              <span className="text-ocean">Natural Order</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy - REPLACED with img5 */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={philosophyImg}
              alt="Yoga practice with Cheryl"
              className="w-full rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-ocean">
              Our Philosophy
            </p>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
              Rooted in <span className="text-ocean">Science</span> & <span className="text-ocean">Tradition</span>
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              Rooted in science and evidence-based movement practices, in conjunction with
              time-honoured yogic principles, Devahiti Yoga is designed to facilitate alignment
              and harmony between mind, body and spirit.
            </p>

            <div className="bg-ocean/5 p-4 rounded-lg border-l-4 border-ocean">
              <p className="italic text-ocean font-heading text-lg">
                "If you can breathe, you can do yoga."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section - Cheryl */}
      <section className="py-20 lg:py-28 px-6 bg-ocean/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Droplets className="h-10 w-10 text-ocean/40 mx-auto mb-4" />
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-4">
              Meet Cheryl
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              I would like to inspire as many people as possible to keep moving and
              dancing with life, maintaining both mental and physical well-being,
              while slowing down the ageing process.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4">
              Myself and my teachers would love to share our passion for this
              ancient art and science with you.
            </p>

            <div className="flex flex-col items-center gap-2 mt-8 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-ocean" />
                <a href="mailto:cheryl@devahiti.com" className="hover:text-ocean transition">
                  cheryl@devahiti.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-ocean" />
                <a href="tel:+27840902083" className="hover:text-ocean transition">
                  +27 84 090 2083
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-ocean" />
                <span>Ballito, South Africa</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teacher Training Teaser */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
          <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-4">
  Upcoming Teacher Training
</h2>
<p className="text-base text-muted-foreground leading-relaxed mb-6">
  200-hour training starts <span className="font-medium text-ocean">May 16-17, 2026</span> (until December 2026)
</p>
<p className="text-base text-muted-foreground leading-relaxed mb-8">
  300-hour advanced training starts <span className="font-medium text-ocean">June 13-14, 2026</span> (12-month program)
</p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ocean/30 text-ocean text-xs uppercase tracking-widest hover:bg-ocean hover:text-white transition-all rounded-sm"
            >
              View Full Schedule <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Free Trial CTA */}
      <section className="py-20 lg:py-28 px-6 bg-ocean">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              Begin Your Journey
            </h2>
            <p className="text-base text-white/80 mb-8 max-w-2xl mx-auto">
              Try a free trial class and experience the Devahiti difference for yourself.
            </p>
            <Link
              to="/booking?type=free"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-ocean text-xs font-medium tracking-[0.3em] uppercase hover:bg-white/90 transition-all duration-300 rounded-sm"
            >
              Claim Your Free Class <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}