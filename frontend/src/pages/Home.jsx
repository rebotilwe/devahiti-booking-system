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

      {/* 1. HERO BANNER - Updated heading, subheading, CTA removed */}
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
          {/* CTA Button Removed as requested */}
        </div>
      </section>

      {/* 2. FIRST "HI, I'M CHERYL" SECTION - Larger image, updated copy, reduced whitespace */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Increased image size - w-80 h-80 (320px) */}
          <div className="w-80 h-80 mx-auto rounded-full overflow-hidden mb-8 shadow-lg border-4 border-white">
            <img src={cherylPortraitImg} className="w-full h-full object-cover" alt="Cheryl" />
          </div>
          <h2 className="font-heading text-4xl mb-4">Hi, I'm Cheryl!</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            I specialise in private, group, corporate yoga and sound relaxation sessions in studio or in the comfort of your own accommodation.
          </p>
          <button
            onClick={() => navigate("/schedule")}
            className="mt-8 bg-ocean text-white px-10 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-ocean-dark transition"
          >
            Booking Menu
          </button>
        </div>
      </section>

      {/* 3. AREAS / SERVICE LOCATION SECTION - Updated to be less restrictive */}
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

          {/* 4. SPECIALISED SERVICES SECTION - Updated with all services */}
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
              <span className="hover:text-ocean transition-colors cursor-default">Specialized Workshop</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Teacher Training</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Sound Massage</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Educational Workshops</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Retreats</span>
              <span className="hidden md:inline-block text-ocean/30 text-xl">•</span>
              <span className="hover:text-ocean transition-colors cursor-default">Fascia Release Therapy</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SERVICES GRID - Updated with all services (matching reference site style) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Row 1 - 4 services */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
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
                <div className="aspect-[3/4] overflow-hidden relative rounded-lg shadow-md">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="mt-4 font-heading text-xl text-center">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 - 4 services */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[{
              img: workshopImg,
              title: "Specialized Workshop",
              link: "/services/specialized-workshop"
            }, {
              img: trainingImg,
              title: "Teacher Training",
              link: "/schedule?service=teacher-training"
            }, {
              img: soundMassageImg,
              title: "Sound Massage",
              link: "/services/sound-massage"
            }, {
              img: educationalWorkshopImg,
              title: "Educational Workshops",
              link: "/services/educational-workshops"
            }].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden relative rounded-lg shadow-md">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="mt-4 font-heading text-xl text-center">{item.title}</h3>
                <p 
                  onClick={() => navigate(item.link)}
                  className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ocean font-bold text-center cursor-pointer hover:underline"
                >
                  Read More
                </p>
              </div>
            ))}
          </div>

          {/* Row 3 - 2 services (centered) */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[{
              img: retreatsImg,
              title: "Retreats",
              link: "/services/retreats"
            }, {
              img: fasciaReleaseImg,
              title: "Fascia Release Therapy",
              link: "/services/fascia-release"
            }].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden relative rounded-lg shadow-md">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="mt-4 font-heading text-xl text-center">{item.title}</h3>
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

      {/* 6. LOWER "HI I AM CHERYL" SECTION - Consolidated messaging, no duplication */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-5xl md:text-7xl mb-8 uppercase tracking-tighter">Hi I Am Cheryl</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
              <p>I know how life can get so full that we forget what it feels like to truly unwind, reconnect and simply breathe again.</p>
              <p>I discovered the deeply calming and restorative benefits of gentle yoga and sound relaxation after years of pushing through tension and stress.</p>
            </div>
            <button
              onClick={() => navigate("/about")}
              className="mt-12 px-12 py-4 border border-foreground text-foreground text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-foreground hover:text-white transition-all"
            >
              More About Me
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}