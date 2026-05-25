import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <img src={heroBgImg} className="absolute inset-0 w-full h-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-3xl px-6 text-white">
          <h1 className="font-heading text-5xl md:text-7xl font-light leading-tight">
            Private, Group Yoga & <br /> Sound Relaxation
          </h1>
          <p className="mt-6 text-white/90 text-xl tracking-wide">
            In studio or in your own accommodation
          </p>
        </div>
      </section>

      {/* 2. "HI, I'M CHERYL" SECTION - With full story moved up from bottom */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Larger image - w-80 h-80 (320px) */}
          <div className="w-80 h-80 mx-auto rounded-full overflow-hidden mb-8 shadow-lg border-4 border-white">
            <img src={cherylPortraitImg} className="w-full h-full object-cover" alt="Cheryl" />
          </div>
          <h2 className="font-heading text-4xl mb-4">Hi, I'm Cheryl!</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            I specialise in private, group, corporate yoga and sound relaxation sessions in studio or in the comfort of your own accommodation.
          </p>
          
          {/* Full story content moved from bottom section */}
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed font-light mt-8 pt-6 border-t border-ocean/20">
            <p>I know how life can get so full that we forget what it feels like to truly unwind, reconnect and simply breathe again.</p>
            <p>I discovered the deeply calming and restorative benefits of gentle yoga and sound relaxation after years of pushing through tension and stress.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/schedule")}
              className="bg-ocean text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-ocean-dark transition"
            >
              Booking Menu
            </button>
            <button
              onClick={() => navigate("/about")}
              className="border border-ocean text-ocean px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-ocean hover:text-white transition"
            >
              More About Me
            </button>
          </div>
        </div>
      </section>

      {/* 3. AREAS / SERVICE LOCATION SECTION */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div>
            <p className="text-ocean text-[11px] tracking-[0.4em] uppercase mb-6 font-bold">
              Areas I Service
            </p>
            <div className="flex items-center justify-center gap-3 text-ocean-deep">
              <MapPin className="h-6 w-6 text-ocean shrink-0" />
              <h3 className="font-heading text-3xl md:text-5xl font-light">
                North Coast · Ballito · Salt Rock · Sheffield · Surrounding Areas
              </h3>
            </div>
            <p className="mt-4 text-ocean-dark/70 text-sm tracking-widest uppercase font-medium">
              Including Durban Corporate Wellness
            </p>
          </div>
          
          {/* Divider */}
          <div className="h-px w-20 bg-ocean/20 mx-auto"></div>

          {/* 4. SPECIALISED SERVICES SECTION - Updated order */}
          <div>
            <p className="text-ocean text-[11px] tracking-[0.4em] uppercase mb-8 font-bold">
              Our Specialised Services
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-ocean-deep text-base md:text-lg font-medium tracking-wide">
              <span className="hover:text-ocean transition-colors cursor-default">Group Class</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Private Sessions</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Corporate Wellness</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Sound Journey</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Sound Massage</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Fascia Release Therapy</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Teacher Training</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Educational Workshops</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Specialized Workshop</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Retreats</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SERVICES GRID - Updated order with consistent dimensions */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Row 1 - Group Class, Private Sessions, Corporate Wellness, Sound Journey */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
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
                <h3 className="mt-4 font-heading text-lg md:text-xl text-center">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 - Sound Massage, Fascia Release Therapy, Teacher Training, Educational Workshops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
            {[{
              img: soundMassageImg,
              title: "Sound Massage",
              link: "/services/sound-massage"
            }, {
              img: fasciaReleaseImg,
              title: "Fascia Release Therapy",
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
                <h3 className="mt-4 font-heading text-lg md:text-xl text-center">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>

          {/* Row 3 - Specialized Workshop, Retreats (centered with 2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
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
                <h3 className="mt-4 font-heading text-lg md:text-xl text-center">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom "Hi I Am Cheryl" section REMOVED - content moved to top section */}

    </div>
  );
}