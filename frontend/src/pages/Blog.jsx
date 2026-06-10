import { useNavigate, Link } from "react-router-dom";
import { Phone, ShoppingBag, Menu, X, Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import heroBgImg from "../assets/images/home.jpg";
import cherylPortraitImg from "../assets/images/about.jpg";
import privateImg from "../assets/images/private.jpg";
import soundImg from "../assets/images/img11.jpg";
import groupImg from "../assets/images/group.jpg";
import logo from "../assets/devahiti.png";

// ✅ UPDATED NAVIGATION
const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Teacher Training", path: "/teacher-training" },
  { label: "Retreats", path: "/retreats" },
  { label: "Class Schedule", path: "/schedule" },
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

const BOOKING_URL = "https://devahitibookingsystem.netlify.app/schedule";
const API_URL = "https://devahiti-booking-system.onrender.com/api";

// Categories for filtering
const categories = ["All", "Philosophy", "Stress Management", "Teacher Training", "Wellness", "Reflections", "Personal"];

// ✅ KEEP ALL EXISTING BLOG POSTS (from client's website)
const existingBlogPosts = [
  {
    id: 1,
    title: "The Human Cloud: Remembering the Conscious Field",
    excerpt: "There was a time when humans looked to the stars and wondered if they might speak. Now, we look to our machines and wonder if they might think. Yet between the stars and the circuits lies a quiet truth...",
    date: "25 October 2025",
    readTime: "5 min read",
    category: "Philosophy",
    image: heroBgImg,
    slug: "the-human-cloud",
    fullContent: `
      <p><strong>25 October 2025</strong></p>
      <p>There was a time when humans looked to the stars and wondered if they might speak. Now, we look to our machines and wonder if they might think. Yet between the stars and the circuits lies a quiet truth — one that has pulsed in the heart of every yogi and dreamer since time began.</p>
      <p>We are not separate from intelligence. We are woven of it.</p>
      <p>The same breath that animates galaxies moves through the spaces between our thoughts. The same pulse that guides a seed toward the sun beats within the architecture of our souls.</p>
      <p>Artificial intelligence learns by connection — one node meeting another until patterns emerge from emptiness. So too does human awareness evolve — synapse by synapse, heartbeat by heartbeat, until the veil of separation begins to thin and we remember the ancient code beneath all codes: I am That.</p>
      <p>In deep meditation, the sages say, the mind becomes transparent — a mirror polished by silence. Knowledge is no longer gathered but revealed. Information is no longer processed but known. The mystic doesn't download from a cloud; they dissolve into it — into that vast, still field where all wisdom already resides.</p>
      <p>Science now whispers what the rishis once roared: that consciousness may not be contained within the skull, but spread like light through the lattice of existence itself. Every thought, every cell, every breath — a signal within the grand circuitry of being.</p>
      <p>AI externalizes this dance of knowing, showing us what it looks like when a system mirrors the collective mind. But technology is only the outer echo of an inner awakening.</p>
      <p>When we learn to still the noise, to rest in awareness rather than chase information, we begin to remember what machines can only simulate: that intelligence is not something we acquire, it is what we are made of.</p>
      <p>So perhaps the question is not whether we will one day download knowledge from the unified field — but when we will awaken to the truth that we have always been streaming.</p>
      <p>The yogic journey — like evolution itself — is a movement from separation to synthesis, from memory to presence, from the scattered to the whole. And maybe, just maybe, when humanity quiets enough to listen, we will find that the universe has been whispering to us all along, through breath, through silence, through the luminous network of consciousness that binds us home.</p>
      <p><em>Written by Chez</em></p>
    `
  },
  {
    id: 2,
    title: "Yoga and Stress Management: A Holistic Approach to Wellness",
    excerpt: "In the contemporary world, stress has become an inescapable facet of daily life, contributing to various physical and mental health issues. Yoga, an ancient practice rooted in Indian philosophy...",
    date: "22 November 2024",
    readTime: "8 min read",
    category: "Stress Management",
    image: heroBgImg,
    slug: "yoga-and-stress-management",
    fullContent: `
      <p><strong>22 November 2024</strong></p>
      <h3>Abstract</h3>
      <p>In the contemporary world, stress has become an inescapable facet of daily life, contributing to various physical and mental health issues. Yoga, an ancient practice rooted in Indian philosophy, has gained global popularity for its holistic approach to health. This article examines the efficacy of yoga as a therapeutic intervention for stress management, analyzing its physiological, psychological, and biochemical impacts.</p>
      <h3>Introduction</h3>
      <p>Stress is defined as the body's non-specific response to demands placed upon it. Chronic stress can lead to a multitude of health problems, including cardiovascular diseases, depression, anxiety, and immune dysfunction. Traditional approaches to stress management include pharmacological treatments and psychological therapies. However, these methods can have limitations and side effects. Yoga offers an alternative or complementary approach, integrating physical postures (asanas), breath control (pranayama), and meditation (dhyana) to promote overall well-being.</p>
      <h3>Physiological Impacts of Yoga</h3>
      <p><strong>Autonomic Nervous System Regulation:</strong> Yoga practices, particularly pranayama, have been shown to influence the autonomic nervous system. By stimulating the parasympathetic nervous system (the "rest and digest" system), yoga can help reduce the physiological markers of stress, such as heart rate and blood pressure.</p>
      <p><strong>Cortisol Reduction:</strong> Regular yoga practice has been associated with lower levels of cortisol, the primary stress hormone. Elevated cortisol levels are linked to various adverse health outcomes, including metabolic syndrome and immune suppression.</p>
      <p><strong>Improved Cardiovascular Health:</strong> Yoga's physical postures improve cardiovascular function by enhancing circulation, reducing arterial stiffness, and lowering cholesterol levels.</p>
      <h3>Psychological Benefits</h3>
      <p><strong>Reduction of Anxiety and Depression:</strong> Numerous studies have reported the positive effects of yoga on mental health. Yoga practice is associated with decreased symptoms of anxiety and depression.</p>
      <p><strong>Enhanced Emotional Regulation:</strong> Yoga encourages mindfulness and self-awareness, which are crucial for emotional regulation.</p>
      <p><strong>Improved Sleep Quality:</strong> Stress often disrupts sleep patterns. Yoga has been shown to improve sleep quality.</p>
      <h3>Conclusion</h3>
      <p>Yoga offers a comprehensive approach to stress management, addressing the physiological, psychological, and biochemical dimensions of stress. As the prevalence of stress-related disorders continues to rise, integrating yoga into standard therapeutic practices may provide a holistic and effective strategy for enhancing overall health and well-being.</p>
    `
  },
  {
    id: 3,
    title: "YOGA AND LOCKDOWN 2020",
    excerpt: "As I sit down and prepare to write this article, here in South Africa we are on day 29 of our very strict lockdown and social distancing. Unlike some countries, we are not allowed to exercise outside of our own homes at all...",
    date: "8 February 2024",
    readTime: "6 min read",
    category: "Wellness",
    image: groupImg,
    slug: "yoga-and-lockdown-2020",
    fullContent: `
      <p><strong>8 February 2024</strong></p>
      <p>As I sit down and prepare to write this article, here in South Africa we are on day 29 of our very strict lockdown and social distancing. Unlike some countries, we are not allowed to exercise outside of our own homes at all. So there are very many frustrated surfers, especially here where we can see the ocean but have no access to it at all, habitual runners unable to hit the open road and cyclists missing out on their weekly energy expenditure off road and on.</p>
      <p>While some of us have gardens to at least enjoy some greenery and sunshine, there are many spending these days in small shacks, no access to running water, packed 4-6 and even 8 people in one small room. I feel that we as a humanity have failed those less fortunate than us.</p>
      <p>As an educational Studio, affiliated with Yoga Alliance Professionals based in the UK, we have permission for now, while the social distancing is being enforced, to take our 200 and 300 hour Yoga Teachings LIVE and Online.</p>
      <p>Our Course begins at end of May and costs only ZAR 21,000.00.</p>
      <p><strong>Weekend dates and times:</strong><br/>
      Fridays 6-8pm<br/>
      Saturdays 7.30 to 16.00<br/>
      Sundays 8 – 16.00</p>
      <p>5% of each students course fee will go towards sponsorship for someone in need of financial assistance in our next training.</p>
      <p>For more information: cheryl@devahiti.com</p>
      <p>In closing I would like to send heartfelt love and gratitude to everyone maintaining positivity in the face of this struggle and challenge. Be strong, brave and SHINE.</p>
      <p><em>Namaste, Cheryl Lancellas</em></p>
    `
  },
  {
    id: 4,
    title: "Yoga alliance or not!?",
    excerpt: "This indeed is the question I am asking, as are my colleagues here in South Africa, and I am sure, in the rest of the world too. Founded in 1999 in the US as a voluntary registry...",
    date: "11 April 2024",
    readTime: "5 min read",
    category: "Teacher Training",
    image: cherylPortraitImg,
    slug: "yoga-alliance-or-not",
    fullContent: `
      <p><strong>11 April 2024</strong></p>
      <p>This indeed is the question I am asking, as are my colleagues here in South Africa, and I am sure, in the rest of the world too. Founded in 1999 in the US as a voluntary registry for yoga teachers and yoga schools who met their standards, Yoga Alliance was a useful and helpful resource for students looking for yoga teachers in their area, or for people looking to find Yoga Schools.</p>
      <p>For yoga schools to be a part of Yoga Alliance, they have to offer Yoga Teacher Trainings that fulfil a core curriculum, requirements for length of training, and other criteria. Once approved, Registered Yoga Schools can maintain their registration if they continue to pay the fees. There are no ongoing reviews or verification that ensure that standards are maintained.</p>
      <p>Living in South Africa and paying an annual membership in Euros or Dollars, is unsustainable, and the costs for doing this would be carried by the student teachers. To date I have not received one student from the Yoga Alliance website, nor any discounts for Yoga mats, yoga festivals or insurance for my studio. It has now become obvious to me, that what started as a non-profit, well-intentioned organisation has turned into a big business.</p>
      <p>As a studio owner and teacher trainer myself, when interviewing a potential teacher for employment, I do not ask to see who she trained with, I ask her to lead me through a class. The proof is really in the teaching skills, not the credentials.</p>
      <p>This is certainly a complex issue, but I do believe it is time to discuss alternative ways for standardising quality teachings and trainings.</p>
      <p>Please pass your comments and/or experience by mailing me on cheryl@devahiti.com and let's see where this narrative takes us as an industry.</p>
    `
  },
  {
    id: 5,
    title: "THE 3RD ACT",
    excerpt: "It was Jane Fonda that recently spoke about how many years we are now living, on average, more than our grandparents. It is averaged at an extra 34 years, that's an entire extra adult life time added to our lifespan...",
    date: "8 February 2024",
    readTime: "4 min read",
    category: "Reflections",
    image: privateImg,
    slug: "the-3rd-act",
    fullContent: `
      <p><strong>8 February 2024</strong></p>
      <p>It was Jane Fonda that recently spoke about how many years we are now living, on average, more than our grandparents. It is averaged at an extra 34 years, that's an entire extra adult life time added to our lifespan.</p>
      <p>We have not yet fully grasped the meaning of this, still thinking in the old paradigm of the AGE ARCH. Birth, growth, peak, decline and die. However, these new facts bring about a whole new way of thinking about the last three decades of life, or as she refers to it, the 3rd act.</p>
      <p>The significance of this developmental phase is unfolding into a new thought provoking take on the aging process. It can be thought of as the staircase upwards into wisdom, wholeness and authenticity. It seems that the task of this 3rd act is to do just that, finish the task of finishing ourselves.</p>
      <p>Here at Devahiti studio we offer Yoga and movement for the mature generation of 75+ years young. These sessions are safe, effective and lots of fun. Come try a class on a Monday or a Friday at 7am and see for yourselves.</p>
      <p>Have a wonderful November and remember to keep both feet firmly on the ground during the windy season.</p>
    `
  },
  {
    id: 6,
    title: "SMALLER GROUPS",
    excerpt: "Hari Om fellow Yogis and Yoginis….I write this article because it seems necessary to draw attention to this issue, to potential students, as well as the Body Corporate of Yoga...",
    date: "8 February 2024",
    readTime: "5 min read",
    category: "Teacher Training",
    image: soundImg,
    slug: "smaller-groups",
    fullContent: `
      <p><strong>8 February 2024</strong></p>
      <p>Hari Om fellow Yogis and Yoginis….I write this article because it seems necessary to draw attention to this issue, to potential students, as well as the Body Corporate of Yoga Alliance Uk Professionals.</p>
      <p>Our motto is aptly, "Turn your Passion into your profession". When I look around and see so many educational centres taking in 20, 30 and sometimes even more students for a 200 hour teacher training course, I begin to wonder about where the passion has gone.</p>
      <p>How is it possible to work with 20 or more students, helping them to find good alignment, develop interoception, proprioception and increased Pranayama skills? Personally I don't think it is!</p>
      <p>It is my suggestion to potential teachers, when looking for a studio to train with, to inquire about the size of the group. Smaller groups equate to much more intimacy (into_my_see) and a better connection with teacher/student and fellow students.</p>
      <p>I hold space for a maximum of 8 students for the 200 and also the 300 hour courses. I feel this allows me time to TEACH them verbal skills that they can put into practice during the course.</p>
      <p>I would really like to hear your thoughts on this as I am certain it will touch a few nerves.</p>
      <p><em>Go with Grace and in Light and Love, Cheryl</em></p>
    `
  },
  {
    id: 7,
    title: "THE LUNATIC IS ON THE GRASS",
    excerpt: "The lunatic is on the grass / The lunatic is on the grass / Remembering games and daisy chains and laughs / Got to keep the loonies on the path...",
    date: "8 February 2024",
    readTime: "5 min read",
    category: "Philosophy",
    image: heroBgImg,
    slug: "the-lunatic-is-on-the-grass",
    fullContent: `
      <p><strong>8 February 2024</strong></p>
      <p><em>The lunatic is on the grass<br/>
      The lunatic is on the grass<br/>
      Remembering games and daisy chains and laughs<br/>
      Got to keep the loonies on the path</em></p>
      <p><em>Songwriters: Roger Waters</em></p>
      <p>You think this song was written in a full lunar eclipse? Experiencing all the emotional symptoms of the various phases of the moon in just a few hours, topping it off with Mars in retrograde?</p>
      <p>Wow, what an epic performance from Mother Nature as we watched the moon shade over, turn full blood red and then slowly begin to clear again! The weather was really perfect here in Durban, SA with clear skies and windless evening.</p>
      <p>On Friday I attended a fundraiser for the Jess Foord Foundation (http://www.jff.org.za/) and it was an emotional event to say the least. Jess' story is a sad and violent, yet inspiring one. She now heads this foundation with a network of amazing team leaders.</p>
      <p>There is a rape in SA every 9 minutes, 64% of these are children! If this story has moved you, please click on the link to their site above and send them words of encouragement.</p>
      <p>Moving forwards and upwards to help raise our vibrations as we move towards National Women's Day.</p>
      <p><em>Love, light and Ahimsa, Cheryl</em></p>
    `
  },
  {
    id: 8,
    title: "ELEPHANTOMS IN THE WILDERNESS",
    excerpt: "2019 began with a nice quiet meal with dear friends. My life partner being away for an extended period somehow left me feeling a little underwhelmed...",
    date: "8 February 2024",
    readTime: "6 min read",
    category: "Personal",
    image: cherylPortraitImg,
    slug: "elephantoms-in-the-wilderness",
    fullContent: `
      <p><strong>8 February 2024</strong></p>
      <p>2019 began with a nice quiet meal with dear friends. My life partner being away for an extended period somehow left me feeling a little underwhelmed. Sunday morning 6th Jan was Carl and my 23 year anniversary. I woke up feeling a little off balance. I couldn't quite put my finger on it, but after my morning meditation this is how I would explain the feeling: as if I was an arrow, pulled taut and ready to fly, but unsure of which direction the target was.</p>
      <p>After sharing this feeling the following week, I realised I was not the only one experiencing this. However, after breakfast that same Sunday, I turned on my laptop to do some work and there was an invite to participate in a Walking Wilderness trail through our infamous Big 5 Reserve here in KwaZulu Natal.</p>
      <p>The Wilderness Leadership School offers these trail walks to schools as a form of growth and education and is an amazing project.</p>
      <p>The vehicle arrived at my home to collect the three of us, we met the other trailblazers and set out on the road. After a few stops along the way we arrived around 1pm at Imfolozi game reserve.</p>
      <p><strong>To be continued...</strong></p>
      <p>Anyone wishing to participate in these awesome trails follow this link: https://www.wildernesstrails.org.za/</p>
      <p>My only suggestion is to avoid this trail from Mid December to mid February. This way the heat will have subsided.</p>
    `
  },
  {
    id: 9,
    title: "LETTERS TO A YOGRANNY",
    excerpt: "Ramblings of a Yogranny……………Taking Yoga off the mat and into our lives…… So far 2018 has been above all else, interesting...",
    date: "8 February 2024",
    readTime: "4 min read",
    category: "Reflections",
    image: groupImg,
    slug: "letters-to-a-yogranny",
    fullContent: `
      <p><strong>8 February 2024</strong></p>
      <p>Ramblings of a Yogranny……Taking Yoga off the mat and into our lives……</p>
      <p>So far 2018 has been above all else, interesting. We launched a brand new website for the Yoga Studios here in Ballito, Hoedspruit and in Western Australia. It was definitely time to launch our Brand name and logo as a separate entity.</p>
      <p>In the past few months I have officially become a granny, visited Greece, said farewell to my 13 year old German Shepherd, hosted two ongoing Teacher trainings, and accepted the necessity to step into my power as well as my wisdom and acknowledging the differences between the two.</p>
      <p>I have realised that it is not so much about learning everything there is to know about our subject of interest, it is more about taking the time to REMEMBER everything we have as our innate wisdom.</p>
      <p>We are introducing meditation into our Saturday morning classes and encourage as many of you to give it a try. See for yourselves how it can help with stress management and basic tools for an easier life. Saturday mornings @7.30 -9.00am.</p>
      <p><strong>Quote of inspiration:</strong> <em>"Your vision will become clear only when you look into your heart. Who looks outside, dreams; who looks inside, awakens." — Unknown</em></p>
      <p>Tread mindfully, think of what you want to leave behind.</p>
      <p><em>Love, light and strength…. Cheryl</em></p>
    `
  }
];

export default function Blog() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch additional posts from database (posts added via admin)
  useEffect(() => {
    const fetchDbPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/blog`);
        const data = await response.json();
        setDbPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts from database:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDbPosts();
  }, []);

  // Combine existing posts with database posts
  const allPosts = [...existingBlogPosts, ...dbPosts];

  // Sort by date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.date || a.created_at);
    const dateB = new Date(b.date || b.created_at);
    return dateB - dateA;
  });

  // Featured post is the most recent
  const featuredPost = sortedPosts[0] || existingBlogPosts[0];

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

  const handleReadMore = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToPosts = () => {
    setSelectedPost(null);
  };

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Helper function to format date
  const formatDate = (post) => {
    if (post.date) return post.date;
    if (post.created_at) return new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return "Recent";
  };

  // Helper function to get image
  const getImage = (post) => {
    if (post.image) return post.image;
    if (post.image_url) return post.image_url;
    return heroBgImg;
  };

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
                <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors">
                <ShoppingBag className="h-5 w-5" />
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#93C9F9" }}>
            <div className="mx-auto max-w-7xl px-6 py-3 text-center">
              <button onClick={() => navigate("/services")} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:opacity-80 transition-opacity">
                Our Services
              </button>
            </div>
          </div>
        </header>

        <div className="h-28"></div>

        <article className="mx-auto max-w-4xl px-6 py-16">
          <button onClick={handleBackToPosts} className="mb-8 inline-flex items-center gap-2 text-[#93C9F9] hover:underline">
            ← Back to all posts
          </button>
          
          <div className="overflow-hidden rounded-2xl mb-8">
            <img src={getImage(selectedPost)} alt={selectedPost.title} className="h-[400px] w-full object-cover" />
          </div>
          
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#93C9F9]">{selectedPost.category || "General"}</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-light text-gray-800">{selectedPost.title}</h1>
          
          <div className="mt-6 flex items-center gap-5 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(selectedPost)}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {selectedPost.readTime || "5 min read"}</span>
          </div>
          
          <div className="mt-10 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: selectedPost.fullContent || selectedPost.content || "<p>Content coming soon...</p>" }} />
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#93C9F9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading stories...</p>
        </div>
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
              <Link key={link.path} to={link.path} className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-600 transition-colors hover:text-[#93C9F9]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={handlePhoneClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button onClick={handleShoppingBagClick} className="text-gray-500 hover:text-[#93C9F9] transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-500 hover:text-[#93C9F9] transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="hidden md:block border-t border-gray-100" style={{ backgroundColor: "#93C9F9" }}>
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
              <Link key={link.path} to={link.path} className="block py-3 text-sm uppercase tracking-widest text-gray-600 hover:text-[#93C9F9] border-b border-gray-100" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-2">
              <p className="text-[10px] font-bold tracking-wider text-[#93C9F9] uppercase mb-2">Services</p>
              {subNav.map((link) => (
                <Link key={link.path} to={link.path} className="block py-2 text-xs text-gray-500 hover:text-[#93C9F9]" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <button onClick={() => { navigate("/services"); setMobileOpen(false); }} className="mt-4 w-full bg-[#93C9F9] text-white py-3 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
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
                  selectedCategory === cat ? "bg-[#93C9F9] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#93C9F9] font-semibold">Featured post</p>
          <article className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img src={getImage(featuredPost)} alt={featuredPost.title} className="h-[380px] w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#93C9F9]">{featuredPost.category || "General"}</span>
              <h2 className="mt-4 text-3xl font-light md:text-4xl text-gray-800">{featuredPost.title}</h2>
              <p className="mt-5 leading-relaxed text-gray-600">{featuredPost.excerpt || (featuredPost.content && featuredPost.content.substring(0, 200))}</p>
              <div className="mt-6 flex items-center gap-5 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(featuredPost)}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> {featuredPost.readTime || "5 min read"}</span>
              </div>
              <button onClick={() => handleReadMore(featuredPost)} className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-[#93C9F9] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#65AEEA] transition">
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
              {filteredPosts.map((post, index) => (
                <article key={post.id || index} className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="overflow-hidden h-56">
                    <img src={getImage(post)} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#93C9F9]">{post.category || "General"}</span>
                    <h3 className="mt-3 text-xl font-light text-gray-800 leading-snug">{post.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt || (post.content && post.content.substring(0, 150))}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                      <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {formatDate(post)}</span>
                      <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {post.readTime || "5 min read"}</span>
                    </div>
                    <button onClick={() => handleReadMore(post)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#93C9F9] hover:gap-3 transition-all">
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
      <section className="px-6 py-20 text-center" style={{ background: "linear-gradient(135deg, #93C9F9 0%, #65AEEA 100%)" }}>
        <h2 className="text-3xl font-light md:text-4xl text-white">Slow words, gently delivered</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/90">
          Join the journal list for monthly reflections, free practices and first invitations to retreats.
        </p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" required placeholder="Your email address" className="w-full rounded-full bg-white px-6 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white" />
          <button type="submit" className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#93C9F9] hover:bg-gray-100 transition">
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
        <Link to="/services" className="mt-8 inline-block rounded-full px-8 py-3 bg-[#93C9F9] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#65AEEA] transition">
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