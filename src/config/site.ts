/**
 * SINGLE CONFIG FILE for everything you will want to tweak before the meeting:
 * placeholder contact links, demo prices, rating text, branch data, social links.
 * No real phone numbers / WhatsApp / LINE IDs / booking systems live anywhere else.
 */
import type { BranchSlug } from "@/content/types";

/* ---------- Placeholder links (CTAs) ---------- */
export const WHATSAPP_NUMBER = "66000000000"; // PLACEHOLDER - wa.me/<number>
export const LINE_URL = "#line-demo"; // PLACEHOLDER
/** Real production booking engine (e.g. TableCheck / Chope) would go here. The demo flow lives at /reserve/ and sends nothing. */
export const BOOKING_URL = "#reserve-demo";
/** Public social handles printed on Mozza's menus (food.pdf p.1: "mozzabkk" on Facebook and Instagram). Profile URLs derived from the handle: verify. */
export const INSTAGRAM_URL = "https://www.instagram.com/mozzabkk/";
export const FACEBOOK_URL = "https://www.facebook.com/mozzabkk";
/** Public website printed on the menus. */
export const MOZZA_WEBSITE = "https://www.mozza-bangkok.com";
/** Delivery ordering links per branch. PLACEHOLDERS (no real ordering provider connected). */
export const DELIVERY_URL = "#delivery-demo";
export const HMA_URL = "https://www.hmgtasia.net/";
export const GROUP_LINKS = [
  { name: "Cocotte", url: "https://www.cocotte-bangkok.com/" },
  { name: "Victoria", url: "https://www.victoria-bangkok.com/" },
  { name: "Leon", url: "https://www.leon-bangkok.com/" },
  { name: "Parma by Mozza", url: "https://www.parma-thailand.com/" },
  { name: "Mozza Phuket", url: "https://www.mozza-phuket.com/" },
];

/* ---------- Site identity ---------- */
/** Placeholder origin, used only for canonical / hreflang / sitemap absolute URLs. */
export const SITE_ORIGIN = "https://mozza-concept-demo.example";
export const BRAND_NAME = "Mozza";
export const ORG_NAME = "Mozza By Cocotte";
export const PARENT_ORG_NAME = "Hospitality Management Asia";
export const DEMO_AUTHOR = "Wadhah Belhassen";
export const GTM_ID = "GTM-XXXXXXX"; // commented out in layouts - demo only

/** Awards printed on food.pdf p.1. Hidden everywhere until the client confirms names, years and wording. */
export const AWARDS_VERIFIED = false;
export const AWARDS = [
  { name: "Tripadvisor Travellers' Choice Awards", detail: "2023, 2024, 2025" },
  { name: "LSA Best Bites Awards", detail: "2026 — Best Pizza" },
  { name: "Gambero Rosso", detail: "Selected: Top Italian Restaurants" },
];

/* ---------- Social proof (editable demo text) ---------- */
export const RATING = {
  value: "4.9", // from /context (Google Business Profile snapshot, 20 Oct 2026) - Central Park only; re-check
  source: "Google",
};

/* ---------- Branches ---------- */
export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

type Field = "street" | "area" | "postalCode" | "hours" | "transit" | "landmark" | "district" | "floor";

export interface BranchConfig {
  slug: BranchSlug;
  name: string;
  /** null = TBC. Nothing null is ever shown in the UI. */
  street: string | null;
  floor: string | null; // from the menu PDF p.2 "Our Locations"
  area: string | null;
  postalCode: string | null;
  city: string;
  /** Opening time unknown for every branch -> null (hidden). `closes` came from the demo brief. */
  opens: string | null;
  closes: string | null;
  hoursOverrides?: Partial<Record<Weekday, { opens: string | null; closes: string | null }>>;
  /** Google Maps directions query (no API key). */
  mapsQuery: string;
  image: string;
  mapImage: string;
  /** Schematic map position (0-100). Approximate, illustrative only. null = not placed. */
  mapPos: { x: number; y: number } | null;
  /**
   * verify: true  => the value (or the matching text in src/content/*.ts) is unconfirmed and HIDDEN in the UI.
   * Flip to false (or delete the key) once the client confirms it.
   */
  verify: Partial<Record<Field, boolean>>;
}

export const BRANCHES: BranchConfig[] = [
  {
    slug: "central-park",
    name: "Mozza Central Park",
    street: "946 Rama IV Rd",
    floor: "G Floor",
    area: "Silom, Bang Rak",
    postalCode: "10500",
    city: "Bangkok",
    opens: null,
    closes: "22:00",
    mapsQuery: "Mozza Dusit Central Park, 946 Rama IV Rd, Bangkok",
    image: "/images/branch-central-park.jpg",
    mapImage: "/images/map-placeholder.jpg",
    mapPos: { x: 46, y: 68 },
    // transit/landmark: only the menu's own wording ("beside Lumphini Park", "direct BTS and MRT connections") is shown.
    verify: { area: true, postalCode: true, hours: true },
  },
  {
    slug: "emquartier",
    name: "Mozza EmQuartier",
    street: "693 Sukhumvit Rd", // official website shows 695
    floor: "G Floor",
    area: "Khlong Tan Nuea, Watthana",
    postalCode: "10110",
    city: "Bangkok",
    opens: null,
    closes: "22:00",
    mapsQuery: "Mozza EmQuartier, 693 Sukhumvit Rd, Bangkok",
    image: "/images/branch-emquartier.jpg",
    mapImage: "/images/map-placeholder.jpg",
    mapPos: { x: 82, y: 56 },
    verify: { street: true, area: true, postalCode: true, hours: true, transit: true, landmark: true },
  },
  {
    slug: "siam-paragon",
    name: "Mozza Siam Paragon",
    street: "Room G31, 991 Rama I Rd",
    floor: "G Floor",
    area: "Pathum Wan",
    postalCode: "10330",
    city: "Bangkok",
    opens: null,
    closes: "21:30",
    mapsQuery: "Mozza Siam Paragon, 991 Rama I Rd, Bangkok",
    image: "/images/branch-siam-paragon.jpg",
    mapImage: "/images/map-placeholder.jpg",
    mapPos: { x: 46, y: 28 },
    verify: { area: true, postalCode: true, hours: true, transit: true, landmark: true },
  },
  {
    slug: "iconsiam",
    name: "Mozza ICONSIAM",
    street: "299 Charoen Nakhon Rd, Khlong San",
    floor: "G Floor",
    area: "Khlong Ton Sai, Khlong San",
    postalCode: "10600",
    city: "Bangkok",
    opens: null,
    closes: "22:00",
    mapsQuery: "Mozza ICONSIAM, 299 Charoen Nakhon Rd, Bangkok",
    image: "/images/branch-iconsiam.jpg",
    mapImage: "/images/map-placeholder.jpg",
    mapPos: { x: 12, y: 58 },
    verify: { area: true, postalCode: true, hours: true, transit: true, landmark: true },
  },
  {
    slug: "central-chidlom",
    name: "Mozza Central Chidlom",
    street: null, // address TBC
    floor: "1st Floor",
    area: null,
    postalCode: null,
    city: "Bangkok",
    opens: null,
    closes: null,
    mapsQuery: "Mozza Central Chidlom, Bangkok",
    image: "/images/branch-central-chidlom.jpg",
    mapImage: "/images/map-placeholder.jpg",
    mapPos: { x: 58, y: 36 },
    verify: { street: true, hours: true, transit: true, landmark: true, district: true },
  },
  {
    // EVERYTHING about this branch is unconfirmed (named in the Phase B brief only).
    slug: "central-world",
    name: "Mozza CentralWorld",
    street: null,
    floor: null,
    area: null,
    postalCode: null,
    city: "Bangkok",
    opens: null,
    closes: null,
    mapsQuery: "Mozza CentralWorld, Bangkok",
    image: "/images/branch-central-world.jpg",
    mapImage: "/images/map-placeholder.jpg",
    mapPos: null,
    verify: { street: true, floor: true, area: true, postalCode: true, hours: true, transit: true, landmark: true, district: true },
  },
];

export const DEFAULT_BRANCH: BranchSlug = "central-park";

export function getBranch(slug: BranchSlug): BranchConfig {
  const b = BRANCHES.find((x) => x.slug === slug);
  if (!b) throw new Error(`Unknown branch: ${slug}`);
  return b;
}

/** True when a field has a value AND is not flagged verify:true. Everything else must stay hidden. */
export function shown(b: BranchConfig, field: Field): boolean {
  if (b.verify[field]) return false;
  switch (field) {
    case "street": return b.street !== null;
    case "floor": return b.floor !== null;
    case "area": return b.area !== null;
    case "postalCode": return b.postalCode !== null;
    default: return true;
  }
}

/** Closing time only (opening times are unknown for every branch). null = hide. */
export function closesAt(b: BranchConfig): string | null {
  return b.closes && !b.verify.hours ? b.closes : null;
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

/** Address text built from CONFIRMED parts only; null if nothing can be shown. */
export function fullAddress(b: BranchConfig): string | null {
  const parts = [
    shown(b, "floor") ? b.floor : null,
    shown(b, "street") ? b.street : null,
    shown(b, "area") ? b.area : null,
    shown(b, "postalCode") ? `${b.city} ${b.postalCode}` : b.city,
  ].filter(Boolean) as string[];
  return shown(b, "street") ? parts.join(", ") : null;
}

/** Reservation demo only: used when a branch has no confirmed hours. Labelled "demo range" in the UI. */
export const DEMO_HOURS = { opens: "11:00", closes: "21:30" };
