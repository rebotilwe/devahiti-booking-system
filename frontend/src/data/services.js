import {
  Users,
  Heart,
  Briefcase,
  Music,
  Calendar,
  Award,
  Sparkles,
  Waves,
  BookOpen,
  Flower2,
  Gem
} from "lucide-react";

// Import actual images from your assets folder
import groupImg from "../assets/images/group.jpg";
import privateImg from "../assets/images/private.jpg";
import corporateImg from "../assets/images/img1.jpg";
import soundImg from "../assets/images/img11.jpg";
import soundMassageImg from "../assets/images/about.jpg";
import fasciaReleaseImg from "../assets/images/img11.jpg";
import trainingImg from "../assets/images/img5.jpg";
import educationalWorkshopImg from "../assets/images/img1.jpg";
import specializedImg from "../assets/images/specialize.jpg";
import retreatsImg from "../assets/images/img11.jpg";
import bowenImg from "../assets/images/img3.jpg";

export const services = [
  {
    id: "group-class",
    slug: "group-class",
    title: "Group Class",
    category: "Group Classes",
    description: "Join our group yoga classes in Ballito. Perfect for all levels, these sessions combine breath, movement, and mindfulness in a supportive community setting.",
    shortDescription: "Community yoga classes for all levels.",
    duration: "60 minutes",
    price: "R130 per class",
    priceAmount: 130,
    location: "In Studio (Ballito)",
    capacity: "All levels welcome",
    icon: Users,
    bookingType: "book",
    image: groupImg  // ✅ Use imported image variable
  },
  {
    id: "private-sessions",
    slug: "private-sessions",
    title: "Private Sessions",
    category: "Private Yoga",
    description: "A personalised 1-on-1 session at your home or accommodation tailored to your body and goals. Ideal for beginners or those looking to deepen their practice.",
    shortDescription: "Personalised session at your home or accommodation.",
    duration: "60 minutes",
    price: "R650 for 1 person, +R150 per extra person",
    priceAmount: 650,
    location: "On Location (Accommodation / Home)",
    capacity: "1+ people",
    icon: Heart,
    bookingType: "book",
    image: privateImg  // ✅ Use imported image variable
  },
  {
    id: "corporate-wellness",
    slug: "corporate-wellness",
    title: "Corporate Wellness",
    category: "Corporate & Workplace",
    description: "Bring balance and focus to your team with a guided wellness session at your workplace. Reduce stress, improve focus, and boost productivity. All equipment provided.",
    shortDescription: "Wellness sessions for teams at your workplace.",
    duration: "60 minutes",
    price: "R1500 per session",
    priceAmount: 1500,
    location: "On Location (Office / Venue)",
    capacity: "Teams up to 15",
    icon: Briefcase,
    bookingType: "book",
    image: corporateImg  // ✅ Use imported image variable
  },
  {
    id: "sound-journey",
    slug: "sound-journey",
    title: "Sound Journey",
    category: "Sound Healing",
    description: "Deeply relax and restore with healing frequencies and vibration. This immersive experience uses singing bowls and therapeutic sound to calm the nervous system and promote deep rest.",
    shortDescription: "Immersive sound healing experience.",
    duration: "60 minutes",
    price: "R800 per session",
    priceAmount: 800,
    location: "On Location / In Studio (Ballito)",
    capacity: "1+ people",
    icon: Music,
    bookingType: "book",
    image: soundImg  // ✅ Use imported image variable
  },
  {
    id: "sound-massage",
    slug: "sound-massage",
    title: "Sound Massage",
    category: "Sound Healing",
    description: "Experience the therapeutic benefits of sound massage. Using singing bowls placed directly on and around the body, this treatment creates deep vibrational healing, releasing tension and promoting cellular restoration.",
    shortDescription: "Therapeutic sound healing with singing bowls.",
    duration: "60 minutes",
    price: "R800 per session",
    priceAmount: 800,
    location: "In Studio / On Location",
    capacity: "1 person",
    icon: Waves,
    bookingType: "book",
    image: soundMassageImg  // ✅ Use imported image variable
  },
  {
    id: "fascia-release",
    slug: "fascia-release",
    title: "Fascia Release Therapy",
    category: "Therapeutic Bodywork",
    description: "Hands-on fascial release therapy to relieve tension, improve mobility, and restore balance in the body. This gentle but effective technique targets the connective tissue to release chronic tension patterns.",
    shortDescription: "Hands-on fascia release for deep tension relief.",
    duration: "45–75 minutes",
    price: "R450 – R650",
    priceAmount: 450,
    location: "In Studio (Ballito)",
    capacity: "Individual",
    icon: Sparkles,
    bookingType: "book",
    image: fasciaReleaseImg  // ✅ Use imported image variable
  },
  {
    id: "teacher-training",
    slug: "teacher-training",
    title: "Teacher Training",
    category: "Training",
    description: "200hr & 300hr advanced yoga teacher training programs designed to deepen your practice and knowledge. Become a certified instructor and share the gift of yoga.",
    shortDescription: "200hr & 300hr teacher training programs.",
    duration: "Multi-month",
    price: "From R28,000",
    priceAmount: 28000,
    location: "In Studio (Ballito)",
    capacity: "Enrolling now",
    icon: Award,
    bookingType: "book",
    image: trainingImg  // ✅ Use imported image variable
  },
  {
    id: "educational-workshops",
    slug: "educational-workshops",
    title: "Educational Workshops",
    category: "Workshops",
    description: "Deepen your understanding of yoga philosophy, anatomy, and teaching methodology. These educational workshops are perfect for practitioners and aspiring teachers alike.",
    shortDescription: "Deepen your yoga knowledge and understanding.",
    duration: "2-3 hours",
    price: "R350 – R650",
    priceAmount: 350,
    location: "In Studio (Ballito)",
    capacity: "Limited spaces",
    icon: BookOpen,
    bookingType: "book",
    image: educationalWorkshopImg  // ✅ Use imported image variable
  },
  {
    id: "specialized-workshop",
    slug: "specialized-workshop",
    title: "Specialized Workshop",
    category: "Workshops",
    description: "Deepen your practice with our specialized workshops. Topics include fascia release, yin yoga, pranayama, and more. Perfect for those wanting to explore specific aspects of yoga.",
    shortDescription: "Focused workshops on specific yoga topics.",
    duration: "2-3 hours",
    price: "R450 – R850",
    priceAmount: 450,
    location: "In Studio (Ballito)",
    capacity: "Limited spaces",
    icon: Calendar,
    bookingType: "book",
    image: specializedImg  // ✅ Use imported image variable
  },
  {
    id: "retreats",
    slug: "retreats",
    title: "Retreats",
    category: "Retreats",
    description: "Immerse yourself in a transformative retreat experience. Combining yoga, sound healing, meditation, and wellness activities, our retreats offer a complete reset for mind, body, and spirit.",
    shortDescription: "Transformative wellness retreat experiences.",
    duration: "Weekend / Weekly",
    price: "From R3,500",
    priceAmount: 3500,
    location: "Various Locations",
    capacity: "Limited spaces",
    icon: Flower2,
    bookingType: "book",
    image: retreatsImg  // ✅ Use imported image variable
  },
  {
    id: "bowen-therapy",
    slug: "bowen-therapy",
    title: "Bowen Therapy",
    category: "Therapeutic Bodywork",
    description: "A gentle, non-invasive therapy that stimulates the body's natural healing response. Bowen Therapy addresses pain, stress, and tension by making precise, gentle rolling movements over muscles and connective tissue.",
    shortDescription: "Gentle, non-invasive therapy for pain relief.",
    duration: "45–60 minutes",
    price: "R550 – R750",
    priceAmount: 550,
    location: "In Studio (Ballito)",
    capacity: "Individual",
    icon: Gem,
    bookingType: "book",
    image: bowenImg  // ✅ Use imported image variable
  }
];