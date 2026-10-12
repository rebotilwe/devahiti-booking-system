import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://devahiti.com";
const BRAND = "Devahiti Yoga";

// Title + description for every public page. Titles are kept under ~60 chars
// and descriptions under ~160 so Google shows them in full.
const PAGES = {
  "/": {
    title: "Devahiti Yoga | Open-Air Yoga Studio in Ballito",
    description:
      "Open-air yoga and movement studio in Ballito, South Africa. Private sessions, group classes, sound journeys, and teacher training. Beginners welcome!",
  },
  "/about": {
    title: "About Cheryl Lancellas | Devahiti Yoga Ballito",
    description:
      "Meet Cheryl Lancellas, founder of Devahiti Yoga in Ballito. Yoga, sound healing and movement for every body, in studio or at your venue.",
  },
  "/services": {
    title: "Yoga & Sound Healing Services | Devahiti Ballito",
    description:
      "Group classes, private yoga sessions, corporate wellness, sound journeys, sound massage and fascial release in Ballito and the North Coast.",
  },
  "/services/group-class": {
    title: "Group Yoga Classes in Ballito | Devahiti Yoga",
    description:
      "Join a group yoga class in Ballito: therapeutic movement, hatha, gentle flow and yin. Beginners welcome. Book online.",
  },
  "/services/private-sessions": {
    title: "Private Yoga Sessions in Ballito | Devahiti Yoga",
    description:
      "One-on-one or small-group private yoga sessions in Ballito, in studio or at your accommodation. Book online with Cheryl.",
  },
  "/services/corporate-wellness": {
    title: "Corporate Wellness Yoga | Devahiti Yoga Ballito",
    description:
      "Yoga and sound relaxation for your team, at your workplace or venue on the North Coast. Reduce stress and boost wellbeing.",
  },
  "/services/sound-journey": {
    title: "Sound Journey Sound Healing in Ballito | Devahiti",
    description:
      "A relaxing sound bath for up to three people in Ballito. Release tension and restore calm with a guided sound journey.",
  },
  "/services/sound-massage": {
    title: "Sound Massage in Ballito | Devahiti Yoga",
    description:
      "Deeply relaxing sound massage using singing bowls and vibration in Ballito. Book a session with Devahiti Yoga.",
  },
  "/services/fascia-release": {
    title: "Fascial Release Therapy in Ballito | Devahiti Yoga",
    description:
      "Fascial release therapy to ease tightness and restore movement, offered at Devahiti Yoga in Ballito.",
  },
  "/teacher-training": {
    title: "Yoga Teacher Training in South Africa | Devahiti",
    description:
      "Yoga teacher training with Cheryl Lancellas at Devahiti Yoga, Ballito. Learn anatomy, movement and teaching skills.",
  },
  "/retreats": {
    title: "Yoga Retreats & Safaris in South Africa | Devahiti",
    description:
      "Yoga retreats and safaris from bush to beach with Devahiti Yoga. See upcoming retreats and what past retreatants say.",
  },
  "/class-schedule": {
    title: "Yoga Class Schedule Ballito | Devahiti Yoga",
    description:
      "Weekly yoga class timetable at Devahiti Yoga, Ballito: Monday to Saturday group classes and how to book your spot.",
  },
  "/schedule": {
    title: "Book a Session | Devahiti Yoga Ballito",
    description:
      "Choose a date and time and book your yoga or sound healing session at Devahiti Yoga in Ballito.",
  },
  "/blog": {
    title: "Yoga & Wellness Blog | Devahiti Yoga Ballito",
    description:
      "Articles on yoga, movement, sound healing and healthy ageing from Cheryl Lancellas and the Devahiti Yoga community.",
  },
  "/contact": {
    title: "Contact Devahiti Yoga | Ballito, South Africa",
    description:
      "Get in touch with Devahiti Yoga in Ballito. Call, message or send an enquiry about classes, sessions and retreats.",
  },
  "/gift-card": {
    title: "Yoga Gift Cards | Devahiti Yoga Ballito",
    description:
      "Give the gift of yoga and sound relaxation. Gift cards for Devahiti Yoga classes and sessions in Ballito.",
  },
};

// Pages that should not appear in search results.
const NOINDEX_PREFIXES = [
  "/admin",
  "/checkout",
  "/payment",
  "/booking",
  "/success",
  "/cancel",
  "/events",
];

function setMeta(selector, create, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(el.tagName === "LINK" ? "href" : "content", value);
}

export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const noindex = NOINDEX_PREFIXES.some((p) => path.startsWith(p));
    let page = PAGES[path];

    // Blog posts: pretty-print the slug until a post sets its own title.
    if (!page && path.startsWith("/blog/")) {
      const name = path
        .replace("/blog/", "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      page = {
        title: `${name} | ${BRAND} Blog`,
        description: PAGES["/blog"].description,
      };
    }
    if (!page) page = PAGES["/"];

    document.title = page.title;

    setMeta(
      'meta[name="description"]',
      () => Object.assign(document.createElement("meta"), { name: "description" }),
      page.description
    );
    setMeta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      `${SITE}${path === "/" ? "/" : path}`
    );
    setMeta(
      'meta[name="robots"]',
      () => Object.assign(document.createElement("meta"), { name: "robots" }),
      noindex ? "noindex, nofollow" : "index, follow"
    );
    setMeta(
      'meta[property="og:title"]',
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        return m;
      },
      page.title
    );
    setMeta(
      'meta[property="og:description"]',
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      },
      page.description
    );
  }, [pathname]);

  return null;
}
