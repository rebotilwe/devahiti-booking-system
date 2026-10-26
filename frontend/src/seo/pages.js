// Single source of truth for per-page SEO.
// Used by:
//   1. src/components/PageMeta.jsx  (updates title/description while browsing)
//   2. scripts/prerender.mjs        (writes real HTML for each page at build time,
//                                    so Google sees the title, description and
//                                    main heading without running JavaScript)
// Edit text here, then redeploy.

export const SITE = "https://devahiti.com";
export const BRAND = "Devahiti Yoga";

export const PAGES = {
  "/": {
    title: "Devahiti Yoga | Open-Air Yoga Studio in Ballito",
    description:
      "Open-air yoga and movement studio in Ballito, South Africa. Private sessions, group classes, sound journeys, and teacher training. Beginners welcome!",
    h1: "Open-Air Yoga & Sound Healing in Ballito",
    intro:
      "Welcome to Devahiti, an educational yoga studio in Ballito, South Africa. Private sessions, group classes, sound journeys and teacher training with Cheryl Lancellas. Beginners welcome.",
  },
  "/about": {
    title: "About Cheryl Lancellas | Devahiti Yoga Ballito",
    description:
      "Meet Cheryl Lancellas, founder of Devahiti Yoga in Ballito. Yoga, sound healing and movement for every body, in studio or at your venue.",
    h1: "About Cheryl Lancellas and Devahiti Yoga",
    intro:
      "Cheryl Lancellas is the founder of Devahiti Yoga in Ballito. She offers yoga, sound healing and movement for every body, in the studio or at your venue.",
  },
  "/services": {
    title: "Yoga & Sound Healing Services | Devahiti Ballito",
    description:
      "Group classes, private yoga sessions, corporate wellness, sound journeys, sound massage and fascial release in Ballito and the North Coast.",
    h1: "Yoga & Sound Healing Services in Ballito",
    intro:
      "Group classes, private yoga sessions, corporate wellness, sound journeys, sound massage and fascial release in Ballito and the North Coast.",
  },
  "/services/group-class": {
    title: "Group Yoga Classes in Ballito | Devahiti Yoga",
    description:
      "Join a group yoga class in Ballito: therapeutic movement, hatha, gentle flow and yin. Beginners welcome. Book online.",
    h1: "Group Yoga Classes in Ballito",
    intro:
      "Join a group yoga class in Ballito: therapeutic movement, hatha, gentle flow and yin. Beginners are welcome. Book online.",
  },
  "/services/private-sessions": {
    title: "Private Yoga Sessions in Ballito | Devahiti Yoga",
    description:
      "One-on-one or small-group private yoga sessions in Ballito, in studio or at your accommodation. Book online with Cheryl.",
    h1: "Private Yoga Sessions in Ballito",
    intro:
      "One-on-one or small-group private yoga sessions in Ballito, in the studio or at your accommodation. Book online with Cheryl.",
  },
  "/services/corporate-wellness": {
    title: "Corporate Wellness Yoga | Devahiti Yoga Ballito",
    description:
      "Yoga and sound relaxation for your team, at your workplace or venue on the North Coast. Reduce stress and boost wellbeing.",
    h1: "Corporate Wellness Yoga on the North Coast",
    intro:
      "Yoga and sound relaxation for your team, at your workplace or venue on the North Coast. Reduce stress and boost wellbeing.",
  },
  "/services/sound-journey": {
    title: "Sound Journey Sound Healing in Ballito | Devahiti",
    description:
      "A relaxing sound bath for up to three people in Ballito. Release tension and restore calm with a guided sound journey.",
    h1: "Sound Journey Sound Healing in Ballito",
    intro:
      "A relaxing sound bath for up to three people in Ballito. Release tension and restore calm with a guided sound journey.",
  },
  "/services/sound-massage": {
    title: "Sound Massage in Ballito | Devahiti Yoga",
    description:
      "Deeply relaxing sound massage using singing bowls and vibration in Ballito. Book a session with Devahiti Yoga.",
    h1: "Sound Massage in Ballito",
    intro:
      "Deeply relaxing sound massage using singing bowls and vibration in Ballito. Book a session with Devahiti Yoga.",
  },
  "/services/fascia-release": {
    title: "Fascial Release Therapy in Ballito | Devahiti Yoga",
    description:
      "Fascial release therapy to ease tightness and restore movement, offered at Devahiti Yoga in Ballito.",
    h1: "Fascial Release Therapy in Ballito",
    intro:
      "Fascial release therapy to ease tightness and restore movement, offered at Devahiti Yoga in Ballito.",
  },
  "/teacher-training": {
    title: "Yoga Teacher Training in South Africa | Devahiti",
    description:
      "Yoga teacher training with Cheryl Lancellas at Devahiti Yoga, Ballito. Learn anatomy, movement and teaching skills.",
    h1: "Yoga Teacher Training in South Africa",
    intro:
      "Yoga teacher training with Cheryl Lancellas at Devahiti Yoga, Ballito. Learn anatomy, movement and teaching skills.",
  },
  "/retreats": {
    title: "Yoga Retreats & Safaris in South Africa | Devahiti",
    description:
      "Yoga retreats and safaris from bush to beach with Devahiti Yoga. See upcoming retreats and what past retreatants say.",
    h1: "Yoga Retreats & Safaris in South Africa",
    intro:
      "Yoga retreats and safaris from bush to beach with Devahiti Yoga. See upcoming retreats and what past retreatants say.",
  },
  "/class-schedule": {
    title: "Yoga Class Schedule Ballito | Devahiti Yoga",
    description:
      "Weekly yoga class timetable at Devahiti Yoga, Ballito: Monday to Saturday group classes and how to book your spot.",
    h1: "Yoga Class Schedule in Ballito",
    intro:
      "The weekly yoga class timetable at Devahiti Yoga, Ballito: Monday to Saturday group classes and how to book your spot.",
  },
  "/schedule": {
    title: "Book a Session | Devahiti Yoga Ballito",
    description:
      "Choose a date and time and book your yoga or sound healing session at Devahiti Yoga in Ballito.",
    h1: "Book a Yoga or Sound Healing Session",
    intro:
      "Choose a date and time and book your yoga or sound healing session at Devahiti Yoga in Ballito.",
  },
  "/blog": {
    title: "Yoga & Wellness Blog | Devahiti Yoga Ballito",
    description:
      "Articles on yoga, movement, sound healing and healthy ageing from Cheryl Lancellas and the Devahiti Yoga community.",
    h1: "Yoga & Wellness Blog",
    intro:
      "Articles on yoga, movement, sound healing and healthy ageing from Cheryl Lancellas and the Devahiti Yoga community.",
  },
  "/contact": {
    title: "Contact Devahiti Yoga | Ballito, South Africa",
    description:
      "Get in touch with Devahiti Yoga in Ballito. Call, message or send an enquiry about classes, sessions and retreats.",
    h1: "Contact Devahiti Yoga in Ballito",
    intro:
      "Get in touch with Devahiti Yoga in Ballito. Call, message or send an enquiry about classes, sessions and retreats.",
  },
  "/gift-card": {
    title: "Yoga Gift Cards | Devahiti Yoga Ballito",
    description:
      "Give the gift of yoga and sound relaxation. Gift cards for Devahiti Yoga classes and sessions in Ballito.",
    h1: "Yoga & Sound Healing Gift Cards",
    intro:
      "Give the gift of yoga and sound relaxation. Gift cards for Devahiti Yoga classes and sessions in Ballito.",
  },
};

// Links shown in the pre-rendered HTML so crawlers can follow them.
export const NAV_LINKS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/class-schedule", "Class schedule"],
  ["/teacher-training", "Teacher training"],
  ["/retreats", "Retreats"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
];
