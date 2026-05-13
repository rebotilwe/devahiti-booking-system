import {
  Baby,
  Activity,
  Briefcase,
  Heart,
  Music,
  Users,
  Award
} from "lucide-react";

export const services = [
  {
    id: "yoga-for-kids",
    slug: "yoga-for-kids",
    title: "Yoga for Kids",
    category: "Specialty Yoga",
    description:
      "Yoga for Kids is a fun, imaginative movement experience designed for children aged 4–12. Every session blends breath, movement, and creativity — because fun is our middle name. Each class runs for 45 minutes and helps build focus, coordination, and emotional balance in a playful environment.",
    shortDescription:
      "Fun, engaging yoga for children aged 4–12. Because fun is our middle name!",
    duration: "45 minutes",
    price: "R200 per child",
    priceAmount: 200,
    location: "In Studio / On Location (Ballito)",
    capacity: "Ages 4–12",
    icon: Baby,
    bookingType: "book",
    image: "/images/kids-yoga.jpg"
  },
  {
    id: "yoga-for-athletes",
    slug: "yoga-for-athletes",
    title: "Yoga for Athletes",
    category: "Specialty Yoga",
    description:
      "Yoga for Athletes combines fascia release and functional movement to enhance performance, improve mobility, and support recovery. Designed for runners, gym athletes, and active individuals aiming to reach peak performance.",
    shortDescription:
      "Fascia release & functional movement for peak performance.",
    duration: "60 minutes",
    price: "R650 per session",
    priceAmount: 650,
    location: "In Studio / On Location (Ballito)",
    capacity: "All levels",
    icon: Activity,
    bookingType: "book",
    image: "/images/athletes-yoga.jpg"
  },
  {
    id: "corporate-yoga",
    slug: "corporate-yoga",
    title: "Corporate Yoga",
    category: "Corporate & Workplace",
    description:
      "Bring balance and focus to your team with a guided yoga session at your workplace. Reduce stress, improve focus, and boost productivity in a 60-minute session. All equipment provided.",
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
    id: "private-yoga",
    slug: "private-yoga",
    title: "Private Yoga Session",
    category: "Visitors & Holiday Makers",
    description:
      "A personalised 1-on-1 session at your home or accommodation tailored to your body and goals. Ideal for beginners or deeper practice refinement.",
    shortDescription: "Personalised session at your home or accommodation.",
    duration: "60 minutes",
    price: "R650 for 1 person, +R150 per extra person",
    priceAmount: 650,
    location: "On Location (Accommodation)",
    capacity: "1+ people",
    icon: Heart,
    bookingType: "book",
    image: "/images/private-yoga.jpg"
  },
  {
    id: "sound-journey",
    slug: "sound-journey",
    title: "Sound Journey",
    category: "Therapeutic Bodywork",
    description:
      "Deeply relax and restore with healing frequencies and vibration. This immersive experience calms the nervous system and promotes deep rest.",
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
    id: "fascia-release",
    slug: "fascia-release",
    title: "Fascia Release Therapy",
    category: "Therapeutic Bodywork",
    description:
      "Hands-on fascial release therapy to relieve tension, improve mobility, and restore balance in the body.",
    shortDescription: "Hands-on fascia release for deep tension relief.",
    duration: "45–75 minutes",
    price: "R450 – R650",
    priceAmount: 450,
    location: "In Studio (Ballito)",
    capacity: "Individual",
    icon: Heart,
    bookingType: "book",
    image: "/images/fascia-release.jpg"
  },
  {
    id: "group-sound",
    slug: "group-sound",
    title: "Group Yoga & Sound Journey",
    category: "Visitors & Holiday Makers",
    description:
      "Share mindful movement and healing sound with friends or family — a perfect group wellness experience.",
    shortDescription: "Yoga + sound journey for groups.",
    duration: "60 minutes",
    price: "R1999 (up to 8 people) + R150 per extra person",
    priceAmount: 1999,
    location: "On Location (Ballito)",
    capacity: "Up to 8 people",
    icon: Users,
    bookingType: "book",
    image: "/images/group-sound.jpg"
  },
  {
    id: "drop-in-class",
    slug: "drop-in-class",
    title: "Studio Drop-in Class",
    category: "Studio Classes",
    description:
      "Join a studio class whenever it suits you. All levels welcome in our Ballito studio.",
    shortDescription: "Join a studio class in Ballito.",
    duration: "60 minutes",
    price: "R130",
    priceAmount: 130,
    location: "In Studio (Ballito)",
    capacity: "All levels",
    icon: Users,
    bookingType: "book",
    image: "/images/drop-in.jpg"
  },
  {
    id: "teacher-training",
    slug: "teacher-training",
    title: "Teacher Training",
    category: "Training",
    description:
      "200hr & 300hr yoga teacher training programs designed to deepen your practice and knowledge.",
    shortDescription: "200hr & 300hr teacher training programs.",
    duration: "Multi-month",
    price: "Enquire for pricing",
    priceAmount: null,
    location: "In Studio (Ballito)",
    capacity: "Enrolling now",
    icon: Award,
    bookingType: "enquire",
    image: "/images/teacher-training.jpg"
  }
];