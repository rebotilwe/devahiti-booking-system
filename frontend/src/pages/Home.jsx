import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

// Images
import heroBgImg from "../assets/images/home.jpg";
import cherylPortraitImg from "../assets/images/about.jpg";
import privateImg from "../assets/images/private.jpg";
import soundImg from "../assets/images/img11.jpg";
import trainingImg from "../assets/images/img5.jpg";
import groupImg from "../assets/images/group.jpg";
import corporateImg from "../assets/images/img1.jpg";
import workshopImg from "../assets/images/specialize.jpg";
import soundMassageImg from "../assets/images/about.jpg";
import educationalWorkshopImg from "../assets/images/img1.jpg";
import retreatsImg from "../assets/images/img11.jpg";
import fasciaReleaseImg from "../assets/images/img5.jpg";

const services = [
  { img: groupImg,              title: "Group Class",             link: "/services/group-class" },
  { img: privateImg,            title: "Private Sessions",        link: "/services/private-sessions" },
  { img: corporateImg,          title: "Corporate Wellness",      link: "/services/corporate-wellness" },
  { img: soundImg,              title: "Sound Journey",           link: "/services/sound-journey" },
  { img: soundMassageImg,       title: "Sound Massage",           link: "/services/sound-massage" },
  { img: fasciaReleaseImg,      title: "Fascia Release",          link: "/services/fascia-release" },
  { img: trainingImg,           title: "Teacher Training",        link: "/schedule?service=teacher-training" },
  { img: educationalWorkshopImg,title: "Educational Workshops",   link: "/services/educational-workshops" },
];

const featuredServices = [
  { img: workshopImg,  title: "Specialized Workshop", link: "/services/specialized-workshop" },
  { img: retreatsImg,  title: "Retreats",             link: "/services/retreats" },
];

function ServiceCard({ img, title, link, navigate }) {
  return (
    <div className="group cursor-pointer" onClick={() => navigate(link)}>
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm shadow-md">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
        <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4">
          <h3 className="font-heading text-xl mb-1">{title}</h3>
          <button 
            className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/50 pb-0.5 hover:border-white transition"
            onClick={(e) => { e.stopPropagation(); navigate(link); }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* 1. HERO - Full screen image with centered text */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <img src={heroBgImg} className="absolute inset-0 w-full h-full object-cover" alt="Devahiti Yoga" />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 max-w-3xl px-6 text-white">
          <h1 className="font-heading text-5xl md:text-7xl font-light leading-tight">
            Private, Group Yoga & <br /> Sound Relaxation
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl tracking-wide">
            In studio or in your own accommodation
          </p>
          <button
            onClick={() => navigate("/schedule")}
            className="mt-8 px-8 py-3 bg-white text-gray-800 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gray-100 transition shadow-md"
          >
            Book Online
          </button>
        </div>
      </section>

      {/* 2. HI I'M CHERYL - White background, centered */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          {/* Circular portrait */}
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 shadow-md border-4 border-white">
            <img src={cherylPortraitImg} className="w-full h-full object-cover" alt="Cheryl" />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900 mb-4">Hi, I'm Cheryl!</h2>
          
          <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4">
            I specialise in private, group, corporate yoga and sound relaxation sessions in studio or in the comfort of your own accommodation.
          </p>
          
          <p className="text-gray-500 leading-relaxed text-sm md:text-base mt-4">
            I know how life can get so full that we forget what it feels like to truly unwind, reconnect and simply breathe again.
          </p>
          
          <p className="text-gray-500 leading-relaxed text-sm md:text-base mt-2">
            I discovered the deeply calming and restorative benefits of gentle yoga and sound relaxation after years of pushing through tension and stress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/schedule")}
              className="px-8 py-3 bg-[#93C9F9] text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#65AEEA] transition shadow-md rounded-sm"
            >
              Booking Menu
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-8 py-3 border border-[#93C9F9] text-[#93C9F9] text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#93C9F9] hover:text-white transition rounded-sm"
            >
              More About Me
            </button>
          </div>
        </div>
      </section>

      {/* 3. SERVICING AREAS - Light blue/gray background */}
      <section className="py-16 px-6 bg-[#F9F9FB]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#65AEEA] text-[11px] tracking-[0.4em] uppercase mb-3 font-bold">
            Servicing Areas
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <MapPin className="h-4 w-4 text-[#93C9F9] shrink-0" />
            <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-light text-gray-800">
              North Coast · Ballito · Salt Rock · Sheffield · Surrounding Areas
            </h3>
          </div>
          <p className="mt-2 text-gray-500 text-xs tracking-widest uppercase">
            Including Durban Corporate Wellness
          </p>
          
          <div className="h-px w-16 bg-[#93C9F9]/30 mx-auto my-8"></div>

          <button
            onClick={() => navigate("/services")}
            className="bg-[#93C9F9] text-white px-10 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#65AEEA] transition shadow-md rounded-sm"
          >
            View Services
          </button>
          <p className="text-gray-500 text-xs mt-3">
            Click to explore all services with details, pricing, and booking
          </p>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#65AEEA] text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">
              Our Offerings
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-gray-800">
              Explore Our Services
            </h2>
          </div>

          {/* Row 1 - 4 cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {services.slice(0, 4).map((item, i) => (
              <ServiceCard key={i} {...item} navigate={navigate} />
            ))}
          </div>

          {/* Row 2 - 4 cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {services.slice(4, 8).map((item, i) => (
              <ServiceCard key={i} {...item} navigate={navigate} />
            ))}
          </div>

          {/* Row 3 - 2 centered cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto">
            {featuredServices.map((item, i) => (
              <ServiceCard key={i} {...item} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT STRIP - Blue background like reference */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: '#93C9F9' }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
            <img src={cherylPortraitImg} className="w-full h-full object-cover" alt="Cheryl" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Cheryl Lancellas</h2>
          <p className="text-white/90 text-sm tracking-widest uppercase mb-6">Owner & Founder of Devahiti Yoga Ballito</p>
          <p className="text-white/85 leading-relaxed text-base md:text-lg">
            Every session is a nurturing blend of slow, mindful movement, rest and therapeutic sound.
            It's a privilege to create a peaceful, safe space where you can ease tension, quiet the mind
            and leave feeling deeply relaxed, rebalanced and restored.
          </p>
          <button
            onClick={() => navigate("/about")}
            className="mt-8 px-8 py-3 bg-white text-[#93C9F9] text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gray-100 transition rounded-sm"
          >
            More About Me
          </button>
        </div>
      </section>

      {/* 6. TESTIMONIAL */}
      <section className="py-16 px-6 bg-[#F9F9FB]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-[#93C9F9] fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          
          <p className="text-gray-600 italic text-base md:text-lg leading-relaxed">
            "I received a truly nurturing and nourishing treatment from Cheryl. She was able to tune into my body
            and what it needed. Cheryl's experience and confidence made me feel truly safe and in good hands.
            I would highly recommend Cheryl to anyone looking for a caring and personalized healing experience."
          </p>
          
          <p className="mt-4 text-gray-400 text-xs tracking-widest uppercase">
            — Client, Ballito South Africa
          </p>
        </div>
      </section>

      {/* 7. BRAND MEANING */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-light text-gray-800 mb-2">
            Devahiti
          </h2>
          <p className="text-[#93C9F9] text-sm tracking-widest mb-2">'Day-vah-hee-tee'</p>
          <p className="text-gray-500 text-sm">
            Sanskrit for ~ Divine Order
          </p>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-16 px-6 text-center" style={{ backgroundColor: '#65AEEA' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-3">
            Book Your Session
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Private sessions available across the North Coast
          </p>
          <button
            onClick={() => navigate("/schedule")}
            className="px-8 py-3 bg-white text-[#65AEEA] text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gray-100 transition shadow-md rounded-sm"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}