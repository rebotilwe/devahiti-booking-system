import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// Images
import heroBgImg from "../assets/images/img10.jpg";
import cherylPortraitImg from "../assets/images/img2.jpg";
import privateImg from "../assets/images/img13.jpg";
import soundImg from "../assets/images/img11.jpg";
import trainingImg from "../assets/images/img5.jpg";
import longPortraitImg from "../assets/images/img11.jpg"; // Using for full-width section

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background">

      {/* 1. HERO — Matches exact wording from refs */}
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <img src={heroBgImg} className="absolute inset-0 w-full h-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-black/20" /> {/* Light overlay for text pop */}

        <div className="relative z-10 max-w-3xl px-6 text-white">
          <h1 className="font-heading text-5xl md:text-7xl font-light leading-tight">
            Private Group Yoga & <br /> Sound Relaxation
          </h1>
          <p className="mt-6 text-white/90 text-xl tracking-wide">
            In your own accommodation
          </p>
          <button
            onClick={() => navigate("/schedule")}
            className="mt-10 px-12 py-4 bg-white text-foreground text-[10px] uppercase tracking-[0.4em] font-bold shadow-xl hover:bg-ocean hover:text-white transition-all"
          >
            Book Online
          </button>
        </div>
      </section>

      {/* 2. SHORT INTRO (White Background Block) */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden mb-10 shadow-sm border-2 border-white">
            <img src={cherylPortraitImg} className="w-full h-full object-cover" alt="Cheryl" />
          </div>
          <h2 className="font-heading text-4xl mb-6">Hi, I'm Cheryl!</h2>
          <p className="text-muted-foreground leading-relaxed italic text-lg">
            I specialise in private group yoga and sound relaxation experiences in the comfort of your own accommodation, all equipment provided.
          </p>
          <button
            onClick={() => navigate("/schedule")}
            className="mt-10 bg-ocean text-white px-10 py-3 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            Booking Menu
          </button>
        </div>
      </section>

   {/* ─── 3. SERVICING — Styled for White Background ─── */}
<section className="py-24 px-6 bg-background"> {/* Using your warm off-white background */}
  <div className="max-w-4xl mx-auto text-center space-y-12">
    
    {/* Areas I Service */}
    <div>
      <p className="text-ocean text-[11px] tracking-[0.4em] uppercase mb-6 font-bold">
        Areas I Service
      </p>
      <div className="flex items-center justify-center gap-3 text-ocean-deep">
        <MapPin className="h-6 w-6 text-ocean shrink-0" />
        <h3 className="font-heading text-3xl md:text-5xl font-light">
          Ballito · Salt Rock · Umhlanga
        </h3>
      </div>
      <p className="mt-4 text-ocean-dark/70 text-sm tracking-widest uppercase font-medium">
        North Coast South Africa
      </p>
    </div>
    
    {/* Divider - Blue tinted */}
    <div className="h-px w-20 bg-ocean/20 mx-auto"></div>

    {/* Specialised Services */}
    <div>
      <p className="text-ocean text-[11px] tracking-[0.4em] uppercase mb-8 font-bold">
        Our Specialised Services
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 text-ocean-deep text-lg md:text-xl font-medium tracking-wide">
        <span className="hover:text-ocean transition-colors cursor-default">
          Private Group Yoga & Sound Relaxation
        </span>
        <span className="hidden md:block text-ocean/30 text-2xl">•</span>
        <span className="hover:text-ocean transition-colors cursor-default">
          Sound Journey
        </span>
        {/* Note: I kept the dots/bullets blue and the text a deep blue for maximum legibility */}
      </div>
    </div>

  </div>
</section>

      {/* 4. SERVICES GRID (Standard grid) */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {[{
            img: privateImg,
            title: "Private Group Yoga",
            link: "/services/private-yoga"
          }, {
            img: soundImg,
            title: "Sound Journey",
            link: "/services/sound-journey"
          }, {
            img: trainingImg,
            title: "Teacher Training",
            link: "/schedule?service=teacher-training"
          }].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" alt={item.title} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <h3 className="mt-6 font-heading text-2xl">{item.title}</h3>
              <p 
                 onClick={() => navigate(item.link)}
                 className="mt-4 text-[10px] tracking-[0.3em] uppercase text-ocean font-bold border-b border-transparent hover:border-ocean inline-block cursor-pointer"
              >
                Read More
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FULL IMAGE + HI I AM CHERYL (Screenshot 410) */}
      <section className="bg-background">
        <div className="w-full h-[70vh]">
          <img src={longPortraitImg} className="w-full h-full object-cover" alt="Cheryl Portrait" />
        </div>
        <div className="py-24 px-6 text-center max-w-2xl mx-auto">
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
      </section>

    </div>
  );
}