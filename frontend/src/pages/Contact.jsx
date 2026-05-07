import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Waves, Droplets } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Link, useNavigate } from "react-router-dom";

// Import client image for hero background
import contactHeroImg from "../assets/images/img11.jpg";  // Contact page hero background

// ✅ Updated Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyklpvwn";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent! We'll be in touch soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        console.error("FormSpree error:", errorData);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Hero with Ocean Wave Overlay - REPLACED WITH CLIENT IMAGE */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactHeroImg}
            alt="Peaceful yoga studio setting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean/20 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Waves className="h-4 w-4 text-white/60" />
            <span className="text-xs tracking-[0.4em] uppercase text-white/60">
              Get in Touch
            </span>
            <Waves className="h-4 w-4 text-white/60" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-ocean mb-4">
                  We'd love to hear from you
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6">
                  Let's Connect
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Whether you're ready to book a class, have questions about our teacher training,
                  or want to learn more about our philosophy — drop us a line. We're here to help
                  you on your wellness journey.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      Devahiti Yoga Studio<br />
                      Ballito, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Email</h4>
                    <a href="mailto:cheryl@devahiti.com" className="text-sm text-ocean hover:underline">
                      cheryl@devahiti.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Phone</h4>
                    <a href="tel:+27840902083" className="text-sm text-ocean hover:underline">
                      +27 84 090 2083
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-ocean hover:text-ocean transition-all"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-ocean hover:text-ocean transition-all"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quote Section */}
              <div className="pt-6 border-t border-border">
                <p className="font-heading text-lg italic text-muted-foreground">
                  "If you can breathe, you can do yoga!"
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  We welcome all practitioners from beginners through advanced and special needs.
                </p>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                      Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-border rounded-none h-12 bg-transparent focus:outline-none focus:border-ocean px-4"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-border rounded-none h-12 bg-transparent focus:outline-none focus:border-ocean px-4"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-border rounded-none h-12 bg-transparent focus:outline-none focus:border-ocean px-4"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-border rounded-none h-12 bg-transparent focus:outline-none focus:border-ocean px-4"
                    >
                      <option value="">Select a subject...</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Teacher Training">Teacher Training (200hr/300hr)</option>
                      <option value="Class Booking">Class Booking</option>
                      <option value="Private Session">Private Session</option>
                      <option value="Free Trial">Free Trial Class</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border border-border rounded-none bg-transparent focus:outline-none focus:border-ocean px-4 py-3 resize-none"
                    placeholder="Tell us about what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-12 bg-ocean text-white rounded-none text-xs font-medium tracking-[0.3em] uppercase hover:bg-ocean-dark transition disabled:opacity-50"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center pt-4">
                  We'll get back to you within 24-48 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}