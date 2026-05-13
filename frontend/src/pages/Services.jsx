import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";
import { services } from "../data/services";

// Group services
const groupedServices = services.reduce((acc, service) => {
  if (!acc[service.category]) acc[service.category] = [];
  acc[service.category].push(service);
  return acc;
}, {});

export default function Services() {
  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[40vh] flex items-center justify-center bg-black/80">
        <div className="text-center text-white">
          <h1 className="font-heading text-4xl md:text-6xl font-light">
            Our Services
          </h1>
          <p className="text-white/70 mt-3">
            Choose the practice that speaks to you
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-16">

          {Object.entries(groupedServices).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-heading mb-6 border-b pb-2">
                {category}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="border p-6 rounded-lg hover:border-ocean transition"
                  >
                    <h3 className="text-lg font-heading mb-2">
                      {service.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center gap-4 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {service.duration}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-ocean font-medium">
                        {service.price}
                      </span>

                      <span className="text-xs text-ocean">
                        View →
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