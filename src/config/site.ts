/**
 * SINGLE CONFIG FILE for everything you will want to tweak before the meeting:
 * placeholder contact links, demo prices, rating text, branch data, social links.
 * No real phone numbers / WhatsApp / LINE IDs / booking systems live anywhere else.
 */
import type { BranchSlug, DishId } from "@/content/types";

/* ---------- Placeholder links (CTAs) ---------- */
export const WHATSAPP_NUMBER = "66000000000"; // PLACEHOLDER - wa.me/<number>
export const LINE_URL = "#line-demo"; // PLACEHOLDER
export const BOOKING_URL = "#reserve-demo"; // PLACEHOLDER (no real booking form)
export const PDF_MENU_URL = "#pdf-demo"; // PLACEHOLDER
export const INSTAGRAM_URL = "#instagram-demo"; // PLACEHOLDER
export const FACEBOOK_URL = "#facebook-demo"; // PLACEHOLDER

/**
 * Per-branch booking link. A "#hash" placeholder becomes "#reserve-demo-<slug>";
 * a real URL gets "?branch=<slug>" appended. Replace the logic here if the real
 * booking engine uses another parameter.
 */
export function bookingUrlFor(slug?: BranchSlug): string {
  if (!slug) return BOOKING_URL;
  if (BOOKING_URL.startsWith("#")) return `${BOOKING_URL}-${slug}`;
  const sep = BOOKING_URL.includes("?") ? "&" : "?";
  return `${BOOKING_URL}${sep}branch=${slug}`;
}

/* ---------- Site identity ---------- */
/** Placeholder origin, used only for canonical / hreflang / sitemap absolute URLs. */
export const SITE_ORIGIN = "https://mozza-concept-demo.example";
export const BRAND_NAME = "Mozza";
export const PARENT_ORG_NAME = "Hospitality Management Asia";
export const DEMO_AUTHOR = "Wadhah Belhassen";
export const GTM_ID = "GTM-XXXXXXX"; // commented out in layouts - demo only

/* ---------- Social proof (editable demo text) ---------- */
export const RATING = {
  value: "4.9", // demo - re-check on the live Google Business Profile
  source: "Google",
};

/* ---------- Demo prices (THB). null = "TBC" ---------- */
export const CURRENCY = "THB";
export const PRICES: Record<DishId, number | null> = {
  "truffle-tagliolini": null,
  burrata: 620, // reference value only
  "carpi-salerno": null,
  "truffle-risotto": null,
  "lobster-spaghetti": null,
  tiramisu: null,
};

/* ---------- Branches ---------- */
export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export interface BranchConfig {
  slug: BranchSlug;
  name: string; // brand-style name, same in all languages
  /** Address lines in Latin script. Thai / Arabic addresses still to be added. */
  street: string;
  area: string; // sub-district / district
  postalCode?: string;
  city: string;
  /** "TBC" until confirmed */
  opens: string;
  closes: string;
  /** Optional per-day overrides of {opens, closes} */
  hoursOverrides?: Partial<Record<Weekday, { opens: string; closes: string }>>;
  /** Used to build the Google Maps directions link (no API key needed). */
  mapsQuery: string;
  image: string;
  mapImage: string;
  /**
   * Transit line and landmark texts (per language, in src/content/*.ts) were ADDED by the
   * demo author and are unconfirmed. While `verify: true` they are NOT shown anywhere in
   * the UI; the page falls back to "Directions on Google Maps". Set to false once confirmed.
   */
  transit: { verify: boolean };
  landmark: { verify: boolean };
  /** Three dishes highlighted on the branch page (ids from the menu). */
  signature: [DishId, DishId, DishId];
}

export const BRANCHES: BranchConfig[] = [
  {
    slug: "central-park",
    name: "Mozza Central Park",
    street: "G Floor, Dusit Central Park, 946 Rama IV Rd",
    area: "Silom, Bang Rak",
    postalCode: "10500", // verify
    city: "Bangkok",
    opens: "TBC",
    closes: "22:00",
    mapsQuery: "Mozza Dusit Central Park, 946 Rama IV Rd, Bangkok",
    image: "/images/branch-central-park.jpg",
    mapImage: "/images/map-placeholder.jpg",
    transit: { verify: true },
    landmark: { verify: true },
    signature: ["burrata", "truffle-tagliolini", "carpi-salerno"],
  },
  {
    slug: "emquartier",
    name: "Mozza EmQuartier",
    street: "693 Sukhumvit Rd", // verify: official website shows 695
    area: "Khlong Tan Nuea, Watthana",
    postalCode: "10110", // verify
    city: "Bangkok",
    opens: "TBC",
    closes: "22:00",
    mapsQuery: "Mozza EmQuartier, 693 Sukhumvit Rd, Bangkok",
    image: "/images/branch-emquartier.jpg",
    mapImage: "/images/map-placeholder.jpg",
    transit: { verify: true },
    landmark: { verify: true },
    signature: ["carpi-salerno", "truffle-risotto", "tiramisu"],
  },
  {
    slug: "siam-paragon",
    name: "Mozza Siam Paragon",
    street: "G Floor, Room G31, 991 Rama I Rd",
    area: "Pathum Wan",
    postalCode: "10330", // verify
    city: "Bangkok",
    opens: "TBC",
    closes: "21:30",
    mapsQuery: "Mozza Siam Paragon, 991 Rama I Rd, Bangkok",
    image: "/images/branch-siam-paragon.jpg",
    mapImage: "/images/map-placeholder.jpg",
    transit: { verify: true },
    landmark: { verify: true },
    signature: ["burrata", "lobster-spaghetti", "tiramisu"],
  },
  {
    slug: "iconsiam",
    name: "Mozza ICONSIAM",
    street: "G Floor, 299 Charoen Nakhon Rd",
    area: "Khlong Ton Sai, Khlong San",
    postalCode: "10600", // verify
    city: "Bangkok",
    opens: "TBC",
    closes: "22:00",
    mapsQuery: "Mozza ICONSIAM, 299 Charoen Nakhon Rd, Bangkok",
    image: "/images/branch-iconsiam.jpg",
    mapImage: "/images/map-placeholder.jpg",
    transit: { verify: true },
    landmark: { verify: true },
    signature: ["truffle-tagliolini", "truffle-risotto", "tiramisu"],
  },
  {
    slug: "central-chidlom",
    name: "Mozza Central Chidlom",
    street: "TBC",
    area: "Ploenchit, Pathum Wan",
    city: "Bangkok",
    opens: "TBC",
    closes: "TBC",
    mapsQuery: "Mozza Central Chidlom, Bangkok",
    image: "/images/branch-central-chidlom.jpg",
    mapImage: "/images/map-placeholder.jpg",
    transit: { verify: true },
    landmark: { verify: true },
    signature: ["burrata", "carpi-salerno", "lobster-spaghetti"],
  },
];

export const DEFAULT_BRANCH: BranchSlug = "central-park";

export function getBranch(slug: BranchSlug): BranchConfig {
  const b = BRANCHES.find((x) => x.slug === slug);
  if (!b) throw new Error(`Unknown branch: ${slug}`);
  return b;
}

export function hoursFor(b: BranchConfig, day: Weekday) {
  return b.hoursOverrides?.[day] ?? { opens: b.opens, closes: b.closes };
}

export function directionsUrl(b: BranchConfig): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.mapsQuery)}`;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function fullAddress(b: BranchConfig): string {
  return b.street === "TBC"
    ? "TBC"
    : [b.street, b.area, `${b.city}${b.postalCode ? " " + b.postalCode : ""}`].join(", ");
}
