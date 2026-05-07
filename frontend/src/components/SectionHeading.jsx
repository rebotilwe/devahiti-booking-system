import { motion } from "framer-motion";

export default function SectionHeading({ subtitle, title, description, align = "center", light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {subtitle && (
        <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${light ? "text-primary-foreground/60" : "text-primary"}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 ${light ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}