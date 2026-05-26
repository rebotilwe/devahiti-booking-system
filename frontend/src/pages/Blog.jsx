import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, Tag } from "lucide-react";
import { useState, useEffect } from "react";

// IMPORT IMAGES PROPERLY (required for React)
import aboutImg from "../assets/images/about.jpg";
import img5 from "../assets/images/img5.jpg";
import groupImg from "../assets/images/group.jpg";
import img13 from "../assets/images/img13.jpg";
import img1 from "../assets/images/img1.jpg";
import privateImg from "../assets/images/private.jpg";

// Blog post data with imported images
const blogPosts = [
  {
    id: 1,
    title: "What is Bowen Therapy? And how does it work?",
    excerpt: "Bowen Therapy offers a gentle and restorative pathway to help bring your body, mind and emotions back into balance when stress, anxiety, or chronic tension take hold...",
    date: "May 15, 2026",
    author: "Cheryl Lancellas",
    category: "Therapy",
    readTime: "5 min read",
    image: aboutImg,
    slug: "what-is-bowen-therapy"
  },
  {
    id: 2,
    title: "Bowen Therapy for Pain Relief",
    excerpt: "A nurturing, non-invasive approach to help ease pain and restore balance. When you're living with pain, whether it's from an old injury, muscle tension, inflammation, or stress...",
    date: "May 10, 2026",
    author: "Cheryl Lancellas",
    category: "Therapy",
    readTime: "4 min read",
    image: img5,
    slug: "bowen-therapy-pain-relief"
  },
  {
    id: 3,
    title: "Private Yoga & Sound Relaxation Experiences in Ballito",
    excerpt: "Devahiti Yoga offers private yoga and sound relaxation experiences in Ballito, Salt Rock and the surrounding areas of the North Coast. Relax in the comfort of your own accommodation...",
    date: "May 5, 2026",
    author: "Cheryl Lancellas",
    category: "Yoga",
    readTime: "6 min read",
    image: groupImg,
    slug: "private-yoga-ballito"
  },
  {
    id: 4,
    title: "The Healing Power of Sound Journeys",
    excerpt: "Discover how sound vibrations can calm your nervous system, reduce stress, and promote deep healing. Sound journeys use singing bowls and therapeutic frequencies...",
    date: "April 28, 2026",
    author: "Cheryl Lancellas",
    category: "Sound Healing",
    readTime: "5 min read",
    image: img13,
    slug: "healing-power-of-sound"
  },
  {
    id: 5,
    title: "Fascia Release: Why It Matters for Athletes",
    excerpt: "Understanding fascia and how release techniques can improve mobility, reduce injury risk, and enhance athletic performance...",
    date: "April 20, 2026",
    author: "Cheryl Lancellas",
    category: "Wellness",
    readTime: "4 min read",
    image: img1,
    slug: "fascia-release-for-athletes"
  },
  {
    id: 6,
    title: "Creating a Home Yoga Practice",
    excerpt: "Tips and guidance for establishing a sustainable and nourishing yoga practice in your own home...",
    date: "April 12, 2026",
    author: "Cheryl Lancellas",
    category: "Yoga",
    readTime: "5 min read",
    image: privateImg,
    slug: "home-yoga-practice"
  }
];

// Categories for filtering
const categories = ["All", "Yoga", "Sound Healing", "Therapy", "Wellness"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-ocean-dark to-ocean">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-heading text-4xl md:text-6xl font-light">
            Devahiti Events and Blog
          </h1>
          <p className="text-white/80 mt-3 max-w-lg mx-auto">
            Stories, insights, and updates from Cheryl
          </p>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 pb-6 border-b border-ocean/20">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition ${
                    selectedCategory === category
                      ? "bg-ocean text-white"
                      : "bg-ocean/10 text-ocean hover:bg-ocean/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:border-ocean w-full md:w-64"
              />
              <svg
                className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Blog Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-52">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-ocean/10 text-ocean text-[10px] uppercase tracking-wider rounded-full mb-3">
                      {post.category}
                    </span>

                    <h3 className="font-heading text-xl mb-2 group-hover:text-ocean transition">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    {/* Read More Link */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-ocean text-sm font-medium hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-ocean/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-6">
            Get the latest articles, wellness tips, and event updates straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-ocean"
            />
            <button className="px-6 py-2 bg-ocean text-white text-sm uppercase tracking-widest rounded-lg hover:bg-ocean-dark transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}