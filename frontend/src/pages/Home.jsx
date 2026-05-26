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

/*
  FONT SETUP — add these two lines to your index.html <head>:

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lato:wght@300;400;700&family=Dancing+Script:wght@500&display=swap"
    rel="stylesheet"
  />

  Then in your Tailwind config add:
    fontFamily: {
      heading: ['"Cormorant Garamond"', 'serif'],
      script:  ['"Dancing Script"', 'cursive'],
      body:    ['Lato', 'sans-serif'],
    }
*/

const styles = `
  /* ── Inline CSS so this file is self-contained ── */

  :root {
    --cream:   #FAF7F2;
    --sand:    #EDE8DF;
    --mist:    #D6CFC4;
    --sage:    #8A9E8A;
    --sage-dk: #637563;
    --ocean:   #1E3A5F;
    --warm:    #C8A97A;
    --text:    #3A3530;
    --text-lt: #7A736C;
  }

  .dv-home { font-family: 'Lato', sans-serif; color: var(--text); background: var(--cream); }

  /* ── HERO ── */
  .dv-hero { position:relative; height:90vh; display:flex; align-items:center; justify-content:center; text-align:center; overflow:hidden; }
  .dv-hero img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
  .dv-hero-overlay { position:absolute; inset:0; background: linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 100%); }
  .dv-hero-content { position:relative; z-index:10; color:#fff; padding:0 1.5rem; max-width:700px; }
  .dv-hero-content h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    line-height: 1.1;
    letter-spacing: 0.02em;
  }
  .dv-hero-content h1 em { font-style: italic; }
  .dv-hero-sub {
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    letter-spacing: 0.25em;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    margin-top: 1rem;
  }
  .dv-hero-btn {
    display: inline-block;
    margin-top: 2.2rem;
    padding: 0.85rem 2.5rem;
    border: 1.5px solid rgba(255,255,255,0.85);
    color: #fff;
    font-family: 'Lato', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
    background: transparent;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  .dv-hero-btn:hover { background: rgba(255,255,255,0.15); }

  /* ── DIVIDER ORNAMENT ── */
  .dv-ornament { display:flex; align-items:center; justify-content:center; gap:0.75rem; margin:0 auto; }
  .dv-ornament span { display:block; height:1px; width:60px; background:var(--mist); }
  .dv-ornament i { display:block; width:6px; height:6px; border-radius:50%; background:var(--warm); }

  /* ── INTRO / HI I'M CHERYL ── */
  .dv-intro { background: var(--cream); padding: 5rem 1.5rem; text-align:center; }
  .dv-intro-portrait {
    width: 160px; height: 160px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 2rem;
    border: 4px solid var(--sand);
    box-shadow: 0 4px 30px rgba(0,0,0,0.10);
  }
  .dv-intro-portrait img { width:100%; height:100%; object-fit:cover; }
  .dv-intro-script {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--ocean);
    margin-bottom: 0.5rem;
  }
  .dv-intro-body {
    max-width: 600px;
    margin: 0 auto;
    font-weight: 300;
    line-height: 1.9;
    font-size: 1rem;
    color: var(--text-lt);
  }
  .dv-intro-body strong { color: var(--text); font-weight: 400; }
  .dv-intro-btns { display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; margin-top:2.5rem; }
  .dv-btn-solid {
    padding: 0.85rem 2.4rem;
    background: var(--ocean);
    color: #fff;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: background 0.25s;
    font-family: 'Lato', sans-serif;
  }
  .dv-btn-solid:hover { background: var(--sage-dk); }
  .dv-btn-outline {
    padding: 0.85rem 2.4rem;
    background: transparent;
    color: var(--ocean);
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
    border: 1.5px solid var(--ocean);
    cursor: pointer;
    transition: background 0.25s, color 0.25s;
    font-family: 'Lato', sans-serif;
  }
  .dv-btn-outline:hover { background: var(--ocean); color: #fff; }

  /* ── LOCATION BAND ── */
  .dv-location { background: var(--sand); padding: 3rem 1.5rem; text-align:center; }
  .dv-location-label {
    font-size: 0.6rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--sage-dk);
    font-weight: 700;
    margin-bottom: 0.75rem;
  }
  .dv-location-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: var(--text);
    letter-spacing: 0.02em;
  }
  .dv-location-sub { font-size: 0.7rem; letter-spacing: 0.25em; text-transform:uppercase; color: var(--text-lt); margin-top:0.35rem; }
  .dv-location-btn {
    margin-top: 2rem;
    padding: 0.8rem 2.2rem;
    background: var(--sage);
    color: #fff;
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: background 0.25s;
    font-family: 'Lato', sans-serif;
  }
  .dv-location-btn:hover { background: var(--sage-dk); }

  /* ── SERVICES SECTION ── */
  .dv-services { padding: 5rem 1.5rem; background: var(--cream); }
  .dv-section-header { text-align:center; margin-bottom: 3rem; }
  .dv-section-label {
    font-size: 0.6rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--sage-dk);
    font-weight: 700;
    margin-bottom: 0.6rem;
  }
  .dv-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    color: var(--text);
    letter-spacing: 0.02em;
  }
  .dv-section-title em { font-style: italic; }

  /* Portrait card grid */
  .dv-grid { display: grid; gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
  .dv-grid-4 { grid-template-columns: repeat(4, 1fr); }
  .dv-grid-2c { grid-template-columns: repeat(2, 280px); justify-content:center; }
  @media (max-width: 900px) { .dv-grid-4 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .dv-grid-4 { grid-template-columns: 1fr 1fr; gap:1rem; } .dv-grid-2c { grid-template-columns: repeat(2, 1fr); } }

  .dv-card { cursor: pointer; }
  .dv-card-img {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  }
  .dv-card-img img {
    width:100%; height:100%; object-fit:cover;
    transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .dv-card:hover .dv-card-img img { transform: scale(1.06); }
  .dv-card-img-overlay {
    position: absolute; inset:0;
    background: linear-gradient(to top, rgba(30,58,95,0.55) 0%, transparent 55%);
    transition: opacity 0.4s;
  }
  .dv-card:hover .dv-card-img-overlay { opacity: 0.75; }
  .dv-card-label {
    position: absolute; bottom:0; left:0; right:0;
    padding: 1.2rem 1rem 1rem;
    color: #fff;
    text-align: center;
  }
  .dv-card-label h3 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    letter-spacing: 0.04em;
    line-height: 1.3;
    margin-bottom: 0.4rem;
  }
  .dv-card-link {
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    border-bottom: 1px solid rgba(255,255,255,0.4);
    padding-bottom: 1px;
    background: none; border-top:none; border-left:none; border-right:none;
    cursor:pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .dv-card-link:hover { color:#fff; border-color:#fff; }

  /* ── FULL-BLEED ABOUT STRIP ── */
  .dv-about-strip {
    position: relative;
    padding: 6rem 1.5rem;
    background: var(--ocean);
    overflow: hidden;
    text-align: center;
  }
  .dv-about-strip::before {
    content:'';
    position:absolute; inset:0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .dv-about-inner { position:relative; z-index:1; max-width: 640px; margin:0 auto; }
  .dv-about-portrait {
    width:180px; height:180px; border-radius:50%;
    overflow:hidden; margin:0 auto 2rem;
    border: 3px solid rgba(255,255,255,0.25);
    box-shadow: 0 4px 40px rgba(0,0,0,0.25);
  }
  .dv-about-portrait img { width:100%; height:100%; object-fit:cover; }
  .dv-about-script {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .dv-about-tagline {
    font-size: 0.6rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 2rem;
    font-weight: 700;
  }
  .dv-about-body {
    font-weight: 300;
    line-height: 2;
    font-size: 0.97rem;
    color: rgba(255,255,255,0.80);
    margin-bottom: 2.5rem;
  }
  .dv-about-btn {
    padding: 0.85rem 2.4rem;
    border: 1.5px solid rgba(255,255,255,0.6);
    color: #fff;
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
    background: transparent;
    cursor: pointer;
    transition: background 0.25s;
    font-family: 'Lato', sans-serif;
  }
  .dv-about-btn:hover { background: rgba(255,255,255,0.12); }

  /* ── TESTIMONIAL ── */
  .dv-testimonial { background: var(--sand); padding: 5rem 1.5rem; text-align:center; }
  .dv-testimonial-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    color: var(--text);
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.75;
    position: relative;
  }
  .dv-testimonial-quote::before {
    content: '\u201C';
    font-size: 5rem;
    line-height: 0;
    vertical-align: -1.8rem;
    color: var(--warm);
    font-style: normal;
    margin-right: 0.15em;
    font-family: 'Cormorant Garamond', serif;
  }
  .dv-testimonial-attr {
    margin-top: 1.5rem;
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--text-lt);
    font-weight: 700;
  }

  /* grid row gap */
  .dv-grid-gap { margin-bottom: 2rem; }
`;

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
    <div className="dv-card" onClick={() => navigate(link)}>
      <div className="dv-card-img">
        <img src={img} alt={title} loading="lazy" />
        <div className="dv-card-img-overlay" />
        <div className="dv-card-label">
          <h3>{title}</h3>
          <button className="dv-card-link" onClick={e => { e.stopPropagation(); navigate(link); }}>
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
    <>
      <style>{styles}</style>
      <div className="dv-home">

        {/* ── 1. HERO ── */}
        <section className="dv-hero">
          <img src={heroBgImg} alt="Yoga hero" />
          <div className="dv-hero-overlay" />
          <div className="dv-hero-content">
            <h1>Private, Group Yoga &amp; <em>Sound Relaxation</em></h1>
            <p className="dv-hero-sub">In studio or in your own accommodation</p>
            <button className="dv-hero-btn" onClick={() => navigate("/schedule")}>Book Online</button>
          </div>
        </section>

        {/* ── 2. HI I'M CHERYL ── */}
        <section className="dv-intro">
          <div className="dv-intro-portrait">
            <img src={cherylPortraitImg} alt="Cheryl" />
          </div>

          <div className="dv-ornament" style={{ marginBottom: '1.5rem' }}>
            <span /><i /><span />
          </div>

          <p className="dv-intro-script">Hi, I'm Cheryl!</p>

          <div className="dv-intro-body">
            <p>
              I specialise in <strong>private, group, corporate yoga</strong> and sound relaxation sessions —
              in studio or in the comfort of your own accommodation.
            </p>
            <p style={{ marginTop: '1rem' }}>
              I know how life can get so full that we forget what it feels like to truly unwind,
              reconnect and simply breathe again.
            </p>
            <p style={{ marginTop: '1rem' }}>
              I discovered the deeply calming and restorative benefits of gentle yoga and sound relaxation
              after years of pushing through tension and stress — and it changed my life.
            </p>
          </div>

          <div className="dv-intro-btns">
            <button className="dv-btn-solid" onClick={() => navigate("/schedule")}>Book Online</button>
            <button className="dv-btn-outline" onClick={() => navigate("/about")}>More About Me</button>
          </div>
        </section>

        {/* ── 3. LOCATION BAND ── */}
        <section className="dv-location">
          <p className="dv-location-label">Servicing Areas</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', flexWrap:'wrap' }}>
            <MapPin size={15} style={{ color: 'var(--sage-dk)', flexShrink:0 }} />
            <p className="dv-location-title">
              North Coast · Ballito · Salt Rock · Sheffield · Surrounding Areas
            </p>
          </div>
          <p className="dv-location-sub">Including Durban Corporate Wellness</p>
          <br />
          <button className="dv-location-btn" onClick={() => navigate("/services")}>View All Services</button>
        </section>

        {/* ── 4. SERVICES GRID ── */}
        <section className="dv-services">
          <div className="dv-section-header">
            <p className="dv-section-label">Our Offerings</p>
            <h2 className="dv-section-title">Explore Our <em>Services</em></h2>
          </div>

          {/* Row 1 — 4 cards */}
          <div className="dv-grid dv-grid-4 dv-grid-gap">
            {services.slice(0, 4).map((s, i) => (
              <ServiceCard key={i} {...s} navigate={navigate} />
            ))}
          </div>

          {/* Row 2 — 4 cards */}
          <div className="dv-grid dv-grid-4 dv-grid-gap">
            {services.slice(4).map((s, i) => (
              <ServiceCard key={i} {...s} navigate={navigate} />
            ))}
          </div>

          {/* Row 3 — 2 centred cards */}
          <div className="dv-grid dv-grid-2c">
            {featuredServices.map((s, i) => (
              <ServiceCard key={i} {...s} navigate={navigate} />
            ))}
          </div>
        </section>

        {/* ── 5. ABOUT STRIP ── */}
        <section className="dv-about-strip">
          <div className="dv-about-inner">
            <div className="dv-about-portrait">
              <img src={cherylPortraitImg} alt="Cheryl" />
            </div>
            <p className="dv-about-script">Cheryl — Founder &amp; Teacher</p>
            <p className="dv-about-tagline">Yoga · Sound · Wellness · North Coast KZN</p>
            <p className="dv-about-body">
              Every session is a nurturing blend of slow, mindful movement, rest and therapeutic sound.
              It's a privilege to create a peaceful, safe space where you can ease tension, quiet the mind
              and leave feeling deeply relaxed, rebalanced and restored.
            </p>
            <button className="dv-about-btn" onClick={() => navigate("/about")}>More About Me</button>
          </div>
        </section>

        {/* ── 6. TESTIMONIAL ── */}
        <section className="dv-testimonial">
          <div className="dv-ornament" style={{ marginBottom: '2rem' }}>
            <span /><i /><span />
          </div>

          <blockquote className="dv-testimonial-quote">
            A truly nurturing and nourishing experience. Cheryl was able to tune into
            exactly what my body needed — her warmth and expertise made me feel completely
            safe and restored.
          </blockquote>
          <p className="dv-testimonial-attr">— Client · Ballito, KZN</p>

          <div className="dv-ornament" style={{ marginTop: '2rem' }}>
            <span /><i /><span />
          </div>
        </section>

      </div>
    </>
  );
}