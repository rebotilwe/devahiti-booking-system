import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import restImg from "../assets/images/rest.jpg";
import logo from "../assets/devahiti.png";

// ✅ UPDATED NAVIGATION
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

const subNav = [
  { label: "Group Class", path: "/services/group-class" },
  { label: "Private Sessions", path: "/services/private-sessions" },
  { label: "Corporate Wellness", path: "/services/corporate-wellness" },
  { label: "Sound Journey", path: "/services/sound-journey" },
  { label: "Sound Massage", path: "/services/sound-massage" },
  { label: "Fascia Release", path: "/services/fascia-release" },
  { label: "Teacher Training", path: "/services/teacher-training" },
  { label: "Educational Workshops", path: "/services/educational-workshops" },
  { label: "Retreats", path: "/services/retreats" },
];

const API_URL = "https://devahiti-booking-system.onrender.com/api";

// Categories for filtering
const categories = ["All", "Philosophy", "Stress Management", "Teacher Training", "Wellness", "Reflections", "Personal"];

// ✅ UPDATED: Ageing Strong post with rest.jpg image
const ageingStrongPost = {
  id: 999,
  title: "Ageing Strong",
  excerpt: "Embracing the wisdom and strength that comes with age. A reflection on growing older with grace, vitality, and purpose.",
  category: "Wellness",
  image: restImg,
  slug: "ageing-strong",
  read_time: "5 min read",
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

export default function Blog() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from database
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/blog`);
        const data = await response.json();
        setBlogPosts([ageingStrongPost, ...data]);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([ageingStrongPost]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoneClick = () => {
    window.location.href = "tel:+27840902083";
  };

  const handleShoppingBagClick = () => {
    navigate("/services");
  };

  const handleReadMore = async (post) => {
    if (post.id === 999) {
      setSelectedPost(post);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/blog/${post.slug}`);
      if (response.ok) {
        const fullPost = await response.json();
        setSelectedPost(fullPost);
      } else {
        setSelectedPost(post);
      }
    } catch (error) {
      console.error("Error fetching full post:", error);
      setSelectedPost(post);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0] || ageingStrongPost;

  const getImage = (post) => {
    if (post.image_url) return post.image_url;
    if (post.image) return post.image;
    return heroBgImg;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#65AEEA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading stories...</p>
        </div>
      </div>
    );
  }

  // If a post is selected, show the full blog post view
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Devahiti Yoga" className="h-14 w-auto" />
            </Link>
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#65AEEA]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
                <ShoppingBag className="h-5 w-5" />
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
        </header>

        <div className="h-28"></div>

        <article className="mx-auto max-w-4xl px-6 py-16">
          <button onClick={handleBackToPosts} className="mb-8 inline-flex items-center gap-2 text-[#65AEEA] hover:underline">
            ← Back to all posts
          </button>
          
          {getImage(selectedPost) && (
            <div className="overflow-hidden rounded-2xl mb-8">
              <img src={getImage(selectedPost)} alt={selectedPost.title} className="h-[400px] w-full object-cover" />
            </div>
          )}
          
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#65AEEA]">{selectedPost.category || "General"}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-light text-gray-800">{selectedPost.title}</h1>
          
          <div className="mt-6 flex items-center gap-5 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" /> 
              {selectedPost.created_at ? new Date(selectedPost.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : "Recent"}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" /> {selectedPost.read_time || "5 min read"}
            </span>
          </div>
          
          <div 
            className="mt-10 prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedPost.content || "<p>No content available for this post.</p>" }} 
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

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white shadow-md" : "bg-white"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Devahiti Yoga" className="h-14 w-auto" />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#65AEEA]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#65AEEA] transition-colors">
              <ShoppingBag className="h-5 w-5" />
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
      </header>

      <div className="h-28"></div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-28 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto">
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
              Book Online
            </button>
          </div>
        </div>
      )}

      {/* ========== ✅ UPDATED: Page Hero with Framed Container ========== */}
      <section className="w-full">
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl" style={{ aspectRatio: '16/9', maxHeight: '80vh' }}>
            <img 
              src={restImg} 
              alt="Devahiti Blog" 
              className="w-full h-full object-cover object-center"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-white/80 drop-shadow">Journal</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white drop-shadow-lg">From the mat</h1>
              <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-white/90 drop-shadow">
                Slow reflections on yoga, sound, breath, and the art of coming home to yourself.
              </p>
            </div>
          </div>
        </div>
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
                  selectedCategory === cat ? "bg-[#65AEEA] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#65AEEA] w-64"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Featured Post - Ageing Strong with rest.jpg */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#65AEEA] font-semibold">Featured post</p>
          <article className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src={restImg} alt={featuredPost.title} className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#65AEEA]">{featuredPost.category || "General"}</span>
              <h2 className="mt-4 text-3xl font-light md:text-4xl text-gray-800">{featuredPost.title}</h2>
              <p className="mt-5 leading-relaxed text-gray-600 line-clamp-3">{featuredPost.excerpt}</p>
              <div className="mt-6 flex items-center gap-5 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Recent</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {featuredPost.read_time || "5 min read"}</span>
              </div>
              <button onClick={() => handleReadMore(featuredPost)} className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-[#65AEEA] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#4A9FD9] transition">
                Read story <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </section>
      )}

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
                <article key={post.id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="overflow-hidden h-56">
                    <img 
                      src={post.id === 999 ? restImg : (post.image_url || post.image || heroBgImg)} 
                      alt={post.title} 
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#65AEEA]">{post.category || "General"}</span>
                    <h3 className="mt-3 text-xl font-light text-gray-800 leading-snug">{post.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                      <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> 
                        {post.id === 999 ? "Recent" : new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {post.read_time || "5 min read"}</span>
                    </div>
                    <button onClick={() => handleReadMore(post)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#65AEEA] hover:gap-3 transition-all">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 py-20 text-center" style={{ background: "linear-gradient(135deg, #65AEEA 0%, #4A9FD9 100%)" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Slow words, gently delivered</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/90">
          Join the journal list for monthly reflections, free practices and first invitations to retreats.
        </p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" required placeholder="Your email address" className="w-full rounded-full bg-white px-6 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white" />
          <button type="submit" className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#65AEEA] hover:bg-gray-100 transition">
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
        <Link to="/services" className="mt-8 inline-block rounded-full px-8 py-3 bg-[#65AEEA] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#4A9FD9] transition">
          Book Now
        </Link>
      </section>

      {/* Footer */}
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