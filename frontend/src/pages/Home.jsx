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

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background">

      {/* 1. HERO BANNER */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <img src={heroBgImg} className="absolute inset-0 w-full h-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-3xl px-6 text-white">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
            Private, Group Yoga & <br /> Sound Relaxation
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl tracking-wide">
            In studio or in your own accommodation
          </p>
        </div>
      </section>

      {/* 2. "HI, I'M CHERYL" SECTION - BLUE BACKGROUND */}
      <section className="relative py-16 md:py-20 px-6" style={{ backgroundColor: '#1E3A5F' }}>
        {/* Curved bottom using pseudo-element */}
        <div className="absolute bottom-0 left-0 right-0 h-[50px] md:h-[80px] bg-background rounded-t-[50px] md:rounded-t-[80px]" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white">
            <img src={cherylPortraitImg} className="w-full h-full object-cover" alt="Cheryl" />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">Hi, I'm Cheryl!</h2>
          
          <p className="text-white/95 leading-relaxed text-base md:text-lg mb-4 font-light">
            I specialise in private, group, corporate yoga and sound relaxation sessions in studio or in the comfort of your own accommodation.
          </p>
          
          <p className="text-white/85 leading-relaxed text-sm md:text-base italic mt-4">
            I know how life can get so full that we forget what it feels like to truly unwind, reconnect and simply breathe again.
          </p>
          
          <p className="text-white/80 leading-relaxed text-sm md:text-base italic mt-2">
            I discovered the deeply calming and restorative benefits of gentle yoga and sound relaxation after years of pushing through tension and stress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate("/schedule")}
              className="bg-white text-[#1E3A5F] px-8 py-3 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gray-100 transition shadow-md rounded-sm"
            >
              Book Online
            </button>
            <button
              onClick={() => navigate("/about")}
              className="border-2 border-white text-white px-8 py-3 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition rounded-sm"
            >
              More About Me
            </button>
          </div>
        </div>
      </section>

      {/* 3. SERVICING AREAS SECTION */}
      <section className="py-12 md:py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-ocean text-[10px] tracking-[0.4em] uppercase mb-3 font-bold">
            Servicing Areas
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <MapPin className="h-4 w-4 text-ocean shrink-0" />
            <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-light text-foreground">
              North Coast · Ballito · Salt Rock · Sheffield · Surrounding Areas
            </h3>
          </div>
          <p className="mt-2 text-ocean-dark/60 text-xs tracking-widest uppercase">
            Including Durban Corporate Wellness
          </p>
          
          <div className="h-px w-16 bg-ocean/20 mx-auto my-8"></div>

          <button
            onClick={() => navigate("/services")}
            className="bg-ocean text-white px-10 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-ocean-dark transition shadow-md rounded-sm"
          >
            View Services
          </button>
          <p className="text-muted-foreground text-xs mt-3">
            Click to explore all services with details, pricing, and booking
          </p>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section className="py-12 md:py-16 px-6 bg-ocean/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-ocean text-[10px] tracking-[0.4em] uppercase mb-2 font-bold">
              Our Offerings
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">
              Explore Our Services
            </h2>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[{
              img: groupImg,
              title: "Group Class",
              link: "/services/group-class"
            }, {
              img: privateImg,
              title: "Private Sessions",
              link: "/services/private-yoga"
            }, {
              img: corporateImg,
              title: "Corporate Wellness",
              link: "/services/corporate-yoga"
            }, {
              img: soundImg,
              title: "Sound Journey",
              link: "/services/sound-journey"
            }].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square w-full overflow-hidden relative rounded-lg shadow-md">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="mt-3 font-heading text-sm md:text-base text-center text-foreground">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-1 text-[9px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[{
              img: soundMassageImg,
              title: "Sound Massage",
              link: "/services/sound-massage"
            }, {
              img: fasciaReleaseImg,
              title: "Fascia Release",
              link: "/services/fascia-release"
            }, {
              img: trainingImg,
              title: "Teacher Training",
              link: "/schedule?service=teacher-training"
            }, {
              img: educationalWorkshopImg,
              title: "Educational Workshops",
              link: "/services/educational-workshops"
            }].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square w-full overflow-hidden relative rounded-lg shadow-md">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="mt-3 font-heading text-sm md:text-base text-center text-foreground">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-1 text-[9px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>

          {/* Row 3 - Specialized Workshop & Retreats centered */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto">
            {[{
              img: workshopImg,
              title: "Specialized Workshop",
              link: "/services/specialized-workshop"
            }, {
              img: retreatsImg,
              title: "Retreats",
              link: "/services/retreats"
            }].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square w-full overflow-hidden relative rounded-lg shadow-md">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="mt-3 font-heading text-sm md:text-base text-center text-foreground">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-1 text-[9px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}