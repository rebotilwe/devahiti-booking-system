import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, ShoppingBag, Menu, X, Calendar, Clock, ArrowLeft } from "lucide-react";
import heroBgImg from "../assets/images/rest.jpg";
import ageingStrongImg from "../assets/images/YogaStress.jpg";
import logo from "../assets/devahiti.png";

const API_URL = "https://devahiti-booking-system.onrender.com/api";

// Estimate read time from actual content length instead of a fixed guess,
// so it stays accurate regardless of how long or short a post is.
const estimateReadTime = (html) => {
  if (!html) return "1 min read";
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

// The "Ageing Strong" post isn't in the backend — it's a static post that
// lives here so the /blog/ageing-strong route works with real browser history.
const ageingStrongPost = {
  id: 999,
  title: "Ageing Strong",
  category: "Wellness",
  image_url: ageingStrongImg,
  slug: "ageing-strong",
  created_at: new Date().toISOString(),
  content: `
    <p><strong>A Reflection on Ageing Strong</strong></p>
    <p>Ageing is not a decline—it is an evolution. Each year brings not just more candles on the cake, but more wisdom, more depth, and more clarity about what truly matters.</p>
    <p>We live in a world that often glorifies youth, but the truth is that some of the most vibrant, powerful, and impactful people are those who have lived long enough to know themselves deeply.</p>
    <p>Ageing strong means:</p>
    <ul>
      <li>Moving your body daily—not to look young, but to feel alive</li>
      <li>Nourishing yourself with whole, vibrant foods</li>
      <li>Staying connected to community and purpose</li>
      <li>Embracing rest as much as activity</li>
      <li>Letting go of what no longer serves you</li>
    </ul>
    <p>The yoga mat is a powerful place to explore this journey. It reminds us that we are not the same person we were a decade ago—and that's a beautiful thing.</p>
    <p>Whether you are 25 or 75, the invitation is the same: show up for yourself, honour where you are, and keep growing. Because ageing isn't about getting older—it's about getting stronger.</p>
  `
};

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Teacher Training", path: "/teacher-training" },
  { label: "Retreats", path: "/retreats" },
  { label: "Class Schedule", path: "/class-schedule" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

// ✅ UPDATED SUBNAV - Removed Educational Workshops
const subNav = [
  { label: "Group Class", path: "/services/group-class" },
  { label: "Private Sessions", path: "/services/private-sessions" },
  { label: "Corporate Wellness", path: "/services/corporate-wellness" },
  { label: "Sound Journey", path: "/services/sound-journey" },
  { label: "Sound Massage", path: "/services/sound-massage" },
  { label: "Fascial Release", path: "/services/fascia-release" },
  { label: "Teacher Training", path: "/services/teacher-training" },
  { label: "Retreats", path: "/services/retreats" },
];

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug === "ageing-strong") {
        setPost(ageingStrongPost);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/blog/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    navigate("/services");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#65AEEA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Post not found</h1>
          <Link to="/blog" className="text-[#65AEEA] hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F8FC]">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 sm:h-14 w-auto" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#65AEEA]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#65AEEA] transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto max-w-7xl px-6 py-3 text-center">
            <button onClick={() => navigate("/services")} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity">
              Our Services
            </button>
          </div>
        </div>
        {/* Sub Navbar */}
        <div style={{ backgroundColor: "#65AEEA" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3">
            {subNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90 hover:text-white transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ✅ FIXED: responsive spacer matching header height on all screen sizes */}
      <div className="h-16 sm:h-20 md:h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-16 sm:top-20 md:top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#65AEEA] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#65AEEA] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link key={link.path} to={link.path} className="block py-2 text-xs text-gray-500 hover:text-[#65AEEA]" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-4 w-full bg-[#65AEEA] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition">
              Our Services
            </button>
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-3 w-full border-2 border-[#65AEEA] text-[#65AEEA] py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] hover:text-white transition">
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero - ✅ FIXED for wide screens */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[700px] w-full overflow-hidden">
        <img 
          src={post.image_url || heroBgImg} 
          alt={post.title} 
          className="absolute inset-0 h-full w-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            {post.category || "General"}
          </span>
          <h1 className="mt-3 text-4xl md:text-5xl font-light text-white max-w-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-5 text-sm text-white/80">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" /> {post.read_time || estimateReadTime(post.content)}
            </span>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Blog Content */}
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#65AEEA] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to all posts
        </Link>
        
        {/* ✅ FIXED: Added explicit paragraph/list/heading spacing so content
            renders correctly whether or not the Tailwind Typography plugin
            is configured in this project. */}
        <div 
          className="prose prose-lg max-w-none text-gray-700 [&_p]:mb-6 [&_p]:leading-relaxed [&_ul]:my-6 [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-6 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:leading-relaxed [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_strong]:font-semibold [&_strong]:text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>

      <footer className="px-6 py-12 text-center text-white" style={{ backgroundColor: "#65AEEA" }}>
        <img src={logo} alt="Devahiti Yoga" className="mx-auto h-20 w-auto" />
        <p className="mt-4 text-2xl font-light text-white">Devahiti</p>
        <p className="mt-2 text-sm italic text-white/90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest text-white/80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
        <p className="mt-4 text-xs text-white/60">
          Developed by{' '}
          <a href="https://afribizconnect.co.za/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors underline underline-offset-2">
            Afribiz Connect
          </a>
        </p>
      </footer>
    </div>
  );
}