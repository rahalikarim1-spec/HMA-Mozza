import type { Dict } from "./dict";
import { branchTexts } from "./branches";

const dayNames = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
  fri: "Friday", sat: "Saturday", sun: "Sunday",
};

export const en: Dict = {
  htmlLang: "en",
  dir: "ltr",
  banner: "Concept demo by Wadhah Belhassen — not the official Mozza website",
  skipToContent: "Skip to content",
  nav: { home: "Mozza home", menu: "Menu", locations: "Locations", reserve: "Reserve", label: "Main navigation" },
  lang: { label: "Language", names: { en: "EN", th: "ไทย", ar: "العربية" } },
  common: {
    demoPrice: "Demo price",
    tbc: "TBC",
    ratingOn: (s) => `on ${s}`,
    closesAt: (t) => `Closes at ${t}`,
    untilTime: (t) => `Until ${t}`,
    hours: "Hours",
    directions: "Directions",
    reserve: "Reserve",
    menu: "Menu",
    viewBranch: "Branch details",
    viewDish: "See on the menu",
    breadcrumbHome: "Home",
    breadcrumbLabel: "Breadcrumb",
    dayNames,
    demoNote: "Demo content",
  },
  meta: {
    home: {
      title: "Italian Restaurant Bangkok | Mozza Italian Trattoria",
      description:
        "Mozza Italian trattoria in Bangkok: handmade pasta, wood-fired pizza and 6 branches. See menus, get directions and reserve a table (concept demo).",
    },
    locations: {
      title: "Locations | Mozza Italian Restaurants in Bangkok",
      description:
        "Six Mozza branches in Bangkok: Central Park, EmQuartier, Siam Paragon, ICONSIAM, Central Chidlom and CentralWorld. Directions and reservations (demo).",
    },
  },
  hero: {
    h1: "Authentic Italian Trattoria in Bangkok",
    sub: "Wood-fired pizza and handmade pasta, La Cucina di Mamma",
    aiCaption: "AI illustration",
    cta: { reserve: "Reserve a table", menu: "See the menu" },
  },
  chooser: {
    title: "Choose your Mozza",
    intro: "Six branches across Bangkok. Pick the one closest to you.",
  },
  signature: {
    title: "Signature dishes",
    intro: "Six dishes to start with. Tap one to jump to it on the menu.",
  },
  awards: {
    title: "Recognition",
    note: "Placeholder text — award names, years and wording must be verified before use.",
    items: ["Gambero Rosso", "Lifestyle Asia Best Bites", "Tripadvisor Travellers' Choice"],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How do I make a reservation?",
        a: "Choose your branch, then press Reserve. In this concept demo the booking link is a placeholder and no reservation is made.",
      },
      {
        q: "Do you offer delivery?",
        a: "Delivery availability differs by branch and is to be confirmed with the restaurant group.",
      },
      {
        q: "Can I book for a large group?",
        a: "Yes, groups are welcome in principle. Group conditions are to be confirmed; use WhatsApp or LINE (demo links) to ask a branch.",
      },
      {
        q: "What are your opening hours?",
        a: "Hours are shown on each branch page. In this demo most opening times are marked TBC until confirmed.",
      },
    ],
  },
  footer: {
    branches: "Branches",
    follow: "Follow",
    line: "LINE",
    instagram: "Instagram",
    facebook: "Facebook",
    part: "Part of Hospitality Management Asia",
    disclaimer: "Private concept demo. Not the official Mozza website. Not indexed.",
    photos: "Demo photos — for concept demonstration only.",
  },
  locationsPage: {
    mapLabel: "Schematic map of Mozza branches in Bangkok",
    mapCaption: "Schematic map — positions are approximate and illustrative, not to scale.",
    h1: "Mozza Locations in Bangkok",
    intro: "Six Mozza branches in Bangkok. Find your nearest one, get directions or reserve. Branch details marked as unconfirmed are not shown until verified.",
  },
  branchPage: {
    reserve: "Reserve",
    directions: "Directions",
    menu: "Menu",
    addressTitle: "Address",
    mapAlt: "Placeholder map image showing the branch location",
    mapCaption: "Static map placeholder — no map API key used.",
    gettingHere: "Getting here",
    directionsFallback: "Directions on Google Maps",
    detailsPending: "More details for this branch are being confirmed.",
    transitLabel: "Nearest BTS / MRT",
    landmarkLabel: "Landmark",
    aboutTitle: "About this branch",
    signatureTitle: "Signature dishes at this branch",
    hoursTitle: "Opening hours",
    day: "Day",
    hoursCol: "Hours",
    faqTitle: "Branch FAQ",
    otherTitle: "Other Mozza branches",
  },
  sticky: { label: "Quick contact", reserve: "Reserve", whatsapp: "WhatsApp", line: "LINE", directions: "Directions" },
  whatsappMessage: (place) => `Hello! I'd like to ask about a table at ${place}.`,
  branches: branchTexts("en"),
};
