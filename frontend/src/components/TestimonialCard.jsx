import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialCard({ quote, author, location }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border/50 p-8 lg:p-10"
    >
      <Quote className="h-8 w-8 text-primary/30 mb-4" />
      <p className="font-heading text-lg lg:text-xl italic text-foreground leading-relaxed mb-6">
        "{quote}"
      </p>
      <div>
        <p className="text-sm font-medium text-foreground">{author}</p>
        {location && (
          <p className="text-xs text-muted-foreground mt-1">{location}</p>
        )}
      </div>
    </motion.div>
  );
}