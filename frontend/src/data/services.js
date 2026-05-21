import {
  Users,
  Heart,
  Briefcase,
  Music,
  Calendar,
  Award
} from "lucide-react";

export const services = [
  {
    id: "group-class",
    slug: "group-class",
    title: "Group Class",
    category: "Group Classes",
    description:
      "Join our group yoga classes in Ballito. Perfect for all levels, these sessions combine breath, movement, and mindfulness in a supportive community setting.",
    shortDescription: "Community yoga classes for all levels.",
    duration: "60 minutes",
    price: "R130 per class",
    priceAmount: 130,
    location: "In Studio (Ballito)",
    capacity: "All levels welcome",
    icon: Users,
    bookingType: "book",
    image: "/images/group-class.jpg"
  },
  {
    id: "private-sessions",
    slug: "private-sessions",
    title: "Private Sessions",
    category: "Private Yoga",
    description:
      "A personalised 1-on-1 session at your home or accommodation tailored to your body and goals. Ideal for beginners or those looking to deepen their practice.",
    shortDescription: "Personalised session at your home or accommodation.",
    duration: "60 minutes",
    price: "R650 for 1 person, +R150 per extra person",
    priceAmount: 650,
    location: "On Location (Accommodation / Home)",
    capacity: "1+ people",
    icon: Heart,
    bookingType: "book",
    image: "/images/private-yoga.jpg"
  },
  {
    id: "corporate-wellness",
    slug: "corporate-wellness",
    title: "Corporate Wellness",
    category: "Corporate & Workplace",
    description:
      "Bring balance and focus to your team with a guided wellness session at your workplace. Reduce stress, improve focus, and boost productivity. All equipment provided.",
    shortDescription: "Wellness sessions for teams at your workplace.",
    duration: "60 minutes",
    price: "R1500 per session",
    priceAmount: 1500,
    location: "On Location (Office / Venue)",
    capacity: "Teams up to 15",
    icon: Briefcase,
    bookingType: "book",
    image: "/images/corporate-yoga.jpg"
  },
  {
    id: "sound-journey",
    slug: "sound-journey",
    title: "Sound Journey",
    category: "Sound Healing",
    description:
      "Deeply relax and restore with healing frequencies and vibration. This immersive experience uses singing bowls and therapeutic sound to calm the nervous system and promote deep rest.",
    shortDescription: "Immersive sound healing experience.",
    duration: "60 minutes",
    price: "R800 per session",
    priceAmount: 800,
    location: "On Location / In Studio (Ballito)",
    capacity: "1+ people",
    icon: Music,
    bookingType: "book",
    image: "/images/sound-journey.jpg"
  },
  {
    id: "specialized-workshop",
    slug: "specialized-workshop",
    title: "Specialized Workshop",
    category: "Workshops",
    description:
      "Deepen your practice with our specialized workshops. Topics include fascia release, yin yoga, pranayama, and more. Perfect for those wanting to explore specific aspects of yoga.",
    shortDescription: "Deepen your practice with focused workshops.",
    duration: "2-3 hours",
    price: "R450 – R850",
    priceAmount: 450,
    location: "In Studio (Ballito)",
    capacity: "Limited spaces",
    icon: Calendar,
    bookingType: "book",
    image: "/images/specialized-workshop.jpg"
  },
  {
    id: "teacher-training",
    slug: "teacher-training",
    title: "Teacher Training",
    category: "Training",
    description:
      "200hr & 300hr advanced yoga teacher training programs designed to deepen your practice and knowledge. Become a certified instructor and share the gift of yoga.",
    shortDescription: "200hr & 300hr teacher training programs.",
    duration: "Multi-month",
    price: "From R28,000",
    priceAmount: 28000,
    location: "In Studio (Ballito)",
    capacity: "Enrolling now",
    icon: Award,
    bookingType: "book",
    image: "/images/teacher-training.jpg"
  }
];