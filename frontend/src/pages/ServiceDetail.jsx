import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { services } from "../data/services";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="p-10 text-center">
        <h1>Service not found</h1>
        <Link to="/services">Back</Link>
      </div>
    );
  }
const handleBook = () => {
  const safeService = {
    id: service.id,
    slug: service.slug,
    title: service.title,
    category: service.category,
    duration: service.duration,
    price: service.price,
    location: service.location,
    capacity: service.capacity,
    bookingType: service.bookingType,
  };

  if (service.bookingType === "enquire") {
    navigate("/contact");
  } else {
    navigate("/schedule", { state: { service: safeService } });
  }
};

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="h-[50vh] flex items-center justify-center bg-black text-white text-center">
        <h1 className="text-4xl md:text-6xl font-light">
          {service.title}
        </h1>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto py-16 px-6">

        <p className="text-muted-foreground mb-8">
          {service.description}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="p-4 bg-ocean/5 text-center rounded">
            <Clock />
            <p>{service.duration}</p>
          </div>

          <div className="p-4 bg-ocean/5 text-center rounded">
            <MapPin />
            <p>{service.location}</p>
          </div>

          <div className="p-4 bg-ocean/5 text-center rounded">
            <Users />
            <p>{service.capacity}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl text-ocean mb-4">
            {service.price}
          </p>

          <button
            onClick={handleBook}
            className="bg-ocean text-white px-8 py-3 rounded"
          >
            {service.bookingType === "enquire"
              ? "Enquire Now"
              : "Book Now"}
            <ArrowRight className="inline ml-2" size={16} />
          </button>
        </div>

        <div className="mt-10 text-center">
          <Link to="/services" className="text-ocean">
            ← Back to Services
          </Link>
        </div>
      </section>
    </div>
  );
}