import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import cherylPortraitImg from "../assets/images/about.jpg";
import privateImg from "../assets/images/private.jpg";
import soundImg from "../assets/images/img11.jpg";
import groupImg from "../assets/images/group.jpg";
import logo from "../assets/logo1.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events", path: "/events" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
  { label: "Gift Card", path: "/gift-card" },
];

const subNav = [
  { label: "Private Group Packages", path: "/services/private-sessions" },
  { label: "Sound Bowl Massage", path: "/services/sound-massage" },
  { label: "Bowen Therapy", path: "/services/bowen-therapy" },
  { label: "Weekly Yoga", path: "/services/group-class" },
];

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";

// Categories for filtering
const categories = ["All", "Yoga Practice", "Sound Healing", "Wellness", "Personal"];

// Blog posts data
const featuredPost = {
  id: 1,
  title: "The quiet power of slowing down",
  excerpt: "We live in a culture that worships speed. But the deepest healing — and the most lasting change — almost always happens in stillness. Here's what I've learned about the practice of slowing down.",
  date: "May 14, 2026",
  readTime: "6 min read",
  category: "Yoga Practice",
  image: heroBgImg,
};

const blogPosts = [
  {
    id: 2,
    title: "What a sound bath actually does to your nervous system",
    excerpt: "The science behind why the tones of crystal and Tibetan bowls leave you feeling so deeply rested.",
    date: "May 2, 2026",
    readTime: "5 min read",
    category: "Sound Healing",
    image: soundImg,
  },
  {
    id: 3,
    title: "A weekend of stillness in Ballito",
    excerpt: "Three simple rituals to turn an ordinary weekend away into a true reset for body and mind.",
    date: "Apr 20, 2026",
    readTime: "4 min read",
    category: "Wellness",
    image: heroBgImg,
  },
  {
    id: 4,
    title: "Why your hens, retreat or birthday deserves yoga",
    excerpt: "Gathering friends is one of life's great joys. A shared, gentle practice makes it unforgettable.",
    date: "Apr 8, 2026",
    readTime: "4 min read",
    category: "Personal",
    image: groupImg,
  },
  {
    id: 5,
    title: "How yoga found me (not the other way around)",
    excerpt: "The unexpected season of life that brought me to the mat — and why I never left it.",
    date: "Mar 26, 2026",
    readTime: "7 min read",
    category: "Personal",
    image: cherylPortraitImg,
  },
  {
    id: 6,
    title: "Three breaths to soften a hard day",
    excerpt: "Simple, do-anywhere pranayama techniques you can return to whenever the world feels loud.",
    date: "Mar 12, 2026",
    readTime: "3 min read",
    category: "Yoga Practice",
    image: privateImg,
  },
  {
    id: 7,
    title: "Fascia Release: gentle touch, deep release",
    excerpt: "An introduction to this softly powerful body therapy and what to expect in your first session.",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    category: "Wellness",
    image: groupImg,
  },
];

export default function Blog() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    window.open(BOOKING_URL, "_blank");
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar - Fixed with scroll effect */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePhoneClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleShoppingBagClick}
              className="text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Book Online"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Sub Navbar - Second Navigation Bar */}
        <div style={{ backgroundColor: "#93C9F9" }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-3">
            {subNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div className="h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
          <div className="px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#93C9F9] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block py-2 text-xs text-gray-500 hover:text-[#93C9F9]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => {
                handleShoppingBagClick();
                setMobileOpen(false);
              }}
              className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition"
            >
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* Page Hero */}
      <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden">
        <img src={heroBgImg} alt="Devahiti Blog" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Journal</p>
          <h1 className="text-5xl font-light md:text-6xl text-white">From the mat</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Slow reflections on yoga, sound, breath, and the art of coming home to yourself.
          </p>
        </div>
        {/* curved bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 Q720,0 1440,120 Z" fill="white" />
        </svg>
      </section>

      {/* Categories & Search */}
      <section className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col md:flex-row items-center justify-between gap-4 px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition ${
                  selectedCategory === cat
                    ? "bg-[#93C9F9] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93C9F9] w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#93C9F9] font-semibold">Featured post</p>
        <article className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#93C9F9]">
              {featuredPost.category}
            </span>
            <h2 className="mt-4 text-3xl font-light md:text-4xl text-gray-800">{featuredPost.title}</h2>
            <p className="mt-5 leading-relaxed text-gray-600">{featuredPost.excerpt}</p>
            <div className="mt-6 flex items-center gap-5 text-sm text-gray-500">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {featuredPost.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" /> {featuredPost.readTime}
              </span>
            </div>
            {/* <button className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-[#93C9F9] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
              Read story <ArrowRight className="h-4 w-4" />
            </button> */}
          </div>
        </article>
      </section>

      {/* Blog Grid */}
      <section className="bg-[#F9F9FB] py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-light md:text-4xl text-gray-800 mb-12">Recent reflections</h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No articles found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="overflow-hidden h-56">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#93C9F9]">
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-xl font-light text-gray-800 leading-snug">{post.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" /> {post.date}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                    </div>
                    {/* <button className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#93C9F9] hover:gap-3 transition-all">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </button> */}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            {/* <button className="rounded-full border-2 border-[#93C9F9] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#93C9F9] hover:bg-[#93C9F9] hover:text-white transition">
              Load more
            </button> */}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 py-20 text-center" style={{ background: "linear-gradient(135deg, #93C9F9 0%, #65AEEA 100%)" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Slow words, gently delivered</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/90">
          Join the journal list for monthly reflections, free practices and first invitations to retreats.
        </p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="Your email address"
            className="w-full rounded-full bg-white px-6 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#93C9F9] hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-light md:text-4xl text-gray-800">Ready to step off the page and onto the mat?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-gray-600">
          Book a private session, a sound journey or a wellness treatment in Ballito.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full px-8 py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#65AEEA] transition"
        >
          Book Now
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-white" style={{ backgroundColor: "#93C9F9" }}>
        <img src={logo} alt="" className="mx-auto h-12 w-auto brightness-0 invert" />
        <p className="mt-4 text-2xl font-light">Devahiti</p>
        <p className="mt-2 text-sm italic opacity-90">'Day-vah-hee-tee' — Sanskrit for Divine Order</p>
        <p className="mt-6 text-xs uppercase tracking-widest opacity-80">
          © {new Date().getFullYear()} Devahiti Yoga · Ballito, South Africa
        </p>
      </footer>
    </div>
  );
}