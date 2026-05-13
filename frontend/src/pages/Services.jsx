import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { services } from "../data/services";

// Group services by category
const groupedServices = services.reduce((acc, service) => {
  if (!acc[service.category]) {
    acc[service.category] = [];
  }
  acc[service.category].push(service);
  return acc;
}, {});

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-4xl md:text-6xl font-light text-white">Our Services</h1>
          <p className="text-white/70 mt-3">Find the practice that speaks to you</p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 pb-2 border-b border-ocean/20">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service, idx) => (
                  <Link 
                    key={idx}
                    to={`/services/${service.slug}`}
                    className="group block bg-card border border-border hover:border-ocean/30 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-ocean transition">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {service.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {service.location.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ocean font-medium">{service.price}</span>
                      <span className="text-xs uppercase tracking-wider text-ocean group-hover:gap-2 transition-all flex items-center gap-1">
                        View Details <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}