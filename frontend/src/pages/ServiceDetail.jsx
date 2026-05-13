import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, ArrowRight, Calendar, CheckCircle, Waves } from "lucide-react";
import { services } from "../data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const service = services.find(s => s.slug === slug);
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Service not found</h1>
          <Link to="/services" className="text-ocean hover:underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (service.bookingType === "enquire") {
      navigate("/contact");
    } else {
      navigate(`/schedule?service=${service.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920"}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="h-4 w-4 text-white/60" />
            <span className="text-xs tracking-[0.4em] uppercase text-white/80">{service.category}</span>
            <Waves className="h-4 w-4 text-white/60" />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <div className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-ocean/5 p-6 rounded-lg text-center">
              <Clock className="h-8 w-8 text-ocean mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-1">Duration</h3>
              <p className="text-muted-foreground">{service.duration}</p>
            </div>
            <div className="bg-ocean/5 p-6 rounded-lg text-center">
              <MapPin className="h-8 w-8 text-ocean mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-1">Location</h3>
              <p className="text-muted-foreground">{service.location}</p>
            </div>
            <div className="bg-ocean/5 p-6 rounded-lg text-center">
              <Users className="h-8 w-8 text-ocean mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-1">Capacity</h3>
              <p className="text-muted-foreground">{service.capacity}</p>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="bg-gradient-to-r from-ocean/10 to-ocean/5 p-8 rounded-2xl text-center">
            <div className="mb-6">
              <span className="text-4xl font-heading text-ocean">{service.price}</span>
              {service.priceAmount && (
                <p className="text-sm text-muted-foreground mt-1">Includes all equipment</p>
              )}
            </div>
            
            <button
              onClick={handleBookNow}
              className="inline-flex items-center gap-3 px-10 py-4 bg-ocean text-white text-sm font-medium uppercase tracking-[0.3em] hover:bg-ocean-dark transition-all rounded-sm"
            >
              {service.bookingType === "enquire" ? "Enquire Now" : "Book Now"}
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <p className="text-xs text-muted-foreground mt-4">
              {service.bookingType === "enquire" 
                ? "Contact us for more information about this program"
                : "Select your preferred date and time after booking"}
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link to="/services" className="text-ocean hover:underline text-sm">
              ← Back to all services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}