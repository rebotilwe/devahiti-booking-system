import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Waves,
  Droplets,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// Images
// Ensure img7.jpg is the "lighter" photo in a lotus position
import heroImg from "../assets/images/img7.jpg"; 
import philosophyImg from "../assets/images/img5.jpg";

export default function About() {
  return (
    <div className="bg-[#fdfcf9]">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cheryl Lancellas in Lotus Position"
            className="w-full h-full object-cover"
          />
          {/* Lightened overlay per client request */}
          <div className="absolute inset-0 bg-black/30" /> 
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-5"
          >
            <Waves className="h-4 w-4 text-white/80" />
            <span className="text-xs tracking-[0.4em] uppercase text-white font-medium">
              About Devahiti
            </span>
            <Waves className="h-4 w-4 text-white/80" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            /* Increased weight from light to normal */
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-tight drop-shadow-md"
          >
            Movement. Healing.
            <br />
            Connection.
          </motion.h1>
        </div>
      </section>

      {/* INTRO SECTION - THE MESSAGE */}
      <section className="py-20 lg:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Darker text for readability */}
            <p className="text-xl text-slate-800 leading-relaxed mb-8 font-normal">
              Hi, I am <span className="text-ocean font-semibold">Cheryl Lancellas</span>.
            </p>

            <div className="space-y-6 text-slate-700 text-lg leading-relaxed">
              <p>
                We currently live in a world where we are receiving in one week
                the amount of information our ancestors received in their entire
                lifetime. Overwhelm and dysfunction are then naturally to be expected.
              </p>

              <p>
                Whether you’re feeling overwhelmed, disconnected, or simply needing space to breathe, 
                Devahiti Yoga offers experiences designed to help you slow down and reconnect.
              </p>

              <p>
                I specialise in <span className="font-medium text-slate-900">private yoga, corporate wellness, sound journeys, yoga for athletes, and yoga for kids</span>. 
                These sessions are held in our intimate studio space or in the comfort of your home, retreat, workplace, or holiday accommodation.
              </p>

              <p className="pt-4">
                Unwind with family and friends as you restore <span className="italic text-ocean">homeostasis</span> and
                reduce stress through mindful movement, followed by a nurturing
                sound journey experience designed to leave you feeling grounded and restored.
              </p>
            </div>

            <p className="text-sm text-ocean mt-10 uppercase tracking-[0.3em] font-bold">
              Beginners are always welcome ✨
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY DEVAHITI - HINT OF COLOR BG */}
      <section className="py-20 lg:py-28 px-6 bg-ocean/5 rounded-3xl mx-4 lg:mx-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-ocean mb-3 font-bold">
              The Devahiti Experience
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-normal text-slate-900">
              A space to breathe,
              <br />
              move & reconnect
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Reduce stress & overwhelm",
              "Improve movement & flexibility",
              "Support athletic recovery & fascia release",
              "Reconnect with yourself & loved ones",
              "Experience deep rest through sound healing",
              "Create meaningful wellness experiences",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white/80 border border-ocean/10 rounded-xl p-8 shadow-sm"
              >
                <p className="text-slate-800 font-medium leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <img
              src={philosophyImg}
              alt="Mindful movement practice"
              className="w-full rounded-2xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-ocean font-bold">
              Our Philosophy
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-normal text-slate-900 leading-tight">
              Rooted in <span className="text-ocean">Science</span> &
              <br />
              <span className="text-ocean">Tradition</span>
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed">
              Devahiti is a Sanskrit word meaning <span className="font-medium">Divine or Natural Order</span>. 
              Our practice combines evidence-based movement and fascia release with time-honoured yogic principles.
            </p>

            <div className="bg-ocean/10 p-6 rounded-xl border-l-4 border-ocean mt-8">
              <p className="italic text-ocean-dark font-heading text-xl">
                “If you can breathe, you can do yoga.”
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BALLITO SESSIONS - RE-STYLED */}
      <section className="py-16 px-6 bg-slate-900 text-white rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-ocean-light mb-3 font-bold">
            Ballito Holiday Makers & Locals
          </p>
          <h3 className="font-heading text-3xl font-normal mb-4">
            Join a Weekly Session
          </h3>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Available every <span className="text-ocean-light font-bold">Tuesday & Thursday at 8:00 AM</span>. 
            Perfect for easing into your relaxing holiday or finding your local flow.
          </p>
        </div>
      </section>

      {/* FINAL CONTACT CTA */}
      <section className="py-20 lg:py-28 px-6 bg-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-normal text-white mb-8">
            Let’s Connect
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-white mb-12">
            <a href="mailto:cheryl@devahiti.com" className="flex items-center gap-3 hover:text-white/80 transition">
              <Mail className="h-5 w-5" /> cheryl@devahiti.com
            </a>
            <a href="tel:+27840902083" className="flex items-center gap-3 hover:text-white/80 transition">
              <Phone className="h-5 w-5" /> +27 84 090 2083
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" /> Ballito, South Africa
            </div>
          </div>

          <Link
            to="/schedule"
            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-ocean text-sm font-bold tracking-[0.2em] uppercase hover:bg-slate-50 transition-all rounded-sm shadow-lg"
          >
            Book Your Session
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}