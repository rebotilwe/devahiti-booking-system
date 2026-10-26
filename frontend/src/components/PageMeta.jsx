import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGES, SITE, BRAND } from "../seo/pages";

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
