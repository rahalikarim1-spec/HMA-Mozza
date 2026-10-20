import type { Dict } from "./dict";

const dayNames = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
  fri: "Friday", sat: "Saturday", sun: "Sunday",
};

const genericFaq = (name: string) => [
  {
    q: "Is there parking nearby?",
    a: `Parking details for ${name} are to be confirmed with the restaurant. This answer will list the exact car park, access and rates.`,
  },
  {
    q: "Can I book for a group?",
    a: `Group bookings at ${name} are to be confirmed. Use WhatsApp or LINE (demo links) to ask the team about larger tables.`,
  },
  {
    q: "How do I reserve a table?",
    a: `Press Reserve to book ${name}. In this concept demo the booking link is a placeholder and no reservation is made.`,
  },
];

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
    openToday: (t) => `Open today until ${t}`,
    openTbc: "Opening hours TBC",
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
      title: "Mozza Bangkok | Authentic Italian Trattoria, Wood-Fired Pizza & Fresh Pasta",
      description:
        "Concept demo: Italian trattoria in Bangkok with wood-fired pizza and handmade pasta. Choose your branch, see the menu, reserve a table.",
    },
    menu: {
      title: "Menu | Mozza Bangkok Italian Trattoria — Pasta, Pizza, Burrata",
      description:
        "Concept demo menu: truffle tagliolini, burrata, wood-fired pizza, risotto, lobster spaghetti and tiramisu, with clear pork and alcohol labels.",
    },
    locations: {
      title: "Locations | Mozza Italian Restaurants in Bangkok",
      description:
        "Concept demo: five Mozza branches in Bangkok — Central Park, EmQuartier, Siam Paragon, ICONSIAM and Central Chidlom. Directions and reservations.",
    },
  },
  hero: {
    h1: "Authentic Italian Trattoria in Bangkok",
    sub: "Wood-fired pizza and handmade pasta, La Cucina di Mamma",
    imageAlt: "Placeholder photo: a table of pizza and pasta in a warm Italian trattoria",
    cta: { reserve: "Reserve a table", menu: "See the menu" },
  },
  chooser: {
    title: "Choose your Mozza",
    intro: "Five branches across Bangkok. Pick the one closest to you.",
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
  menuPage: {
    h1: "Mozza Menu — Italian Trattoria in Bangkok",
    intro: "Pasta, pizza, burrata and dessert. Pork and alcohol are always labelled.",
    pdf: "Download PDF menu",
    categories: {
      starters: "Starters & Burrata",
      pizza: "Pizza",
      pasta: "Pasta & Risotto",
      desserts: "Desserts",
    },
    tabsLabel: "Menu categories",
    dietaryNote:
      "Dietary and allergen information marked “to confirm” must be verified with the restaurant. Ask the team about your needs.",
    reserveSticky: "Reserve",
  },
  tags: {
    vegetarian: "Vegetarian",
    pork: "Contains pork",
    alcohol: "May contain alcohol",
    toConfirm: "to confirm",
  },
  dishes: {
    "truffle-tagliolini": {
      name: "Truffle Tagliolini",
      description: "Fresh tagliolini with truffle.",
      alt: "Placeholder photo of truffle tagliolini pasta",
    },
    burrata: {
      name: "Tomato Confit & Balsamic Caramel Burrata",
      description: "Creamy burrata, tomato confit, balsamic caramel.",
      alt: "Placeholder photo of burrata with tomato confit and balsamic caramel",
    },
    "carpi-salerno": {
      name: "Carpi Salerno",
      description: "Thin wood-fired pizza with Parma ham, stracciatella, basil and tomato.",
      alt: "Placeholder photo of the Carpi Salerno wood-fired pizza",
    },
    "truffle-risotto": {
      name: "Parmesan Truffle Risotto",
      description: "Carnaroli rice finished in a Parmesan wheel, with truffle.",
      alt: "Placeholder photo of truffle risotto finished in a Parmesan wheel",
    },
    "lobster-spaghetti": {
      name: "Lobster Spaghetti",
      description: "Spaghetti with lobster.",
      alt: "Placeholder photo of lobster spaghetti",
    },
    tiramisu: {
      name: "Cocotte's Tiramisu",
      description: "House tiramisu.",
      alt: "Placeholder photo of the house tiramisu",
    },
  },
  locationsPage: {
    h1: "Mozza Locations in Bangkok",
    intro: "Five Italian trattoria branches. Find your nearest Mozza, get directions or reserve.",
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
  branches: {
    "central-park": {
      mall: "Dusit Central Park",
      district: "Silom · Bang Rak",
      h1: "Mozza Central Park — Italian Restaurant at Dusit Central Park",
      metaTitle: "Mozza Central Park | Italian Restaurant at Dusit Central Park, Bangkok",
      metaDescription:
        "Concept demo: Mozza at Dusit Central Park, Rama IV Rd. Wood-fired pizza and handmade pasta for weekday lunch and dinner near Silom, Sathorn and Lumphini.",
      imageAlt: "Placeholder photo of the Mozza Central Park dining room",
      intro: [
        "Mozza Central Park sits on the ground floor of Dusit Central Park, on Rama IV Road where Silom meets the edge of Lumphini. It is a natural stop for people working in the Silom, Sathorn and Lumphini business district.",
        "Weekday lunch suits a quick plate of handmade pasta or a thin wood-fired pizza between meetings. In the evening the same menu works for a relaxed dinner after work, or a table with friends and family.",
        "Check the menu for pork and alcohol labels before you book, and use the Reserve button to pick your table. Opening times and parking details on this page are demo placeholders.",
      ],
      transit: "BTS Sala Daeng / MRT Si Lom",
      landmark: "Opposite Lumphini Park",
      faq: [
        {
          q: "Is there parking at Dusit Central Park?",
          a: "Parking options and rates at Dusit Central Park are to be confirmed with the restaurant. This answer will state the exact car park and any validation.",
        },
        {
          q: "Can I book a table for a group or a business lunch?",
          a: "Group and business-lunch bookings are to be confirmed. Use WhatsApp or LINE (demo links) to ask the Central Park team about larger tables.",
        },
        {
          q: "How do I reserve at Mozza Central Park?",
          a: "Press Reserve on this page — it is pre-set to Mozza Central Park. In this concept demo the link is a placeholder and no booking is made.",
        },
      ],
    },
    emquartier: {
      mall: "EmQuartier",
      district: "Phrom Phong · Sukhumvit",
      h1: "Mozza EmQuartier — Italian Restaurant on Sukhumvit Road",
      metaTitle: "Mozza EmQuartier | Italian Restaurant on Sukhumvit Rd, Bangkok",
      metaDescription:
        "Concept demo: Mozza at EmQuartier, Sukhumvit Rd. Wood-fired pizza, handmade pasta, opening hours, directions and reservations.",
      imageAlt: "Placeholder photo of the Mozza EmQuartier dining room",
      intro: [
        "Mozza EmQuartier serves Italian trattoria dishes in the Phrom Phong area of Sukhumvit Road, in the heart of one of Bangkok's busiest shopping and dining districts.",
        "Opening hours, the exact address number and transit details are demo placeholders to be verified.",
      ],
      transit: "BTS Phrom Phong",
      landmark: "EmQuartier, Sukhumvit Rd",
      faq: genericFaq("Mozza EmQuartier"),
    },
    "siam-paragon": {
      mall: "Siam Paragon",
      district: "Siam · Pathum Wan",
      h1: "Mozza Siam Paragon — Italian Restaurant at Siam Paragon",
      metaTitle: "Mozza Siam Paragon | Italian Restaurant at Siam Paragon, Bangkok",
      metaDescription:
        "Concept demo: Mozza at Siam Paragon, Rama I Rd. Wood-fired pizza, handmade pasta, opening hours, directions and reservations.",
      imageAlt: "Placeholder photo of the Mozza Siam Paragon dining room",
      intro: [
        "Mozza Siam Paragon is on the ground floor of Siam Paragon on Rama I Road, in the Siam shopping district.",
        "Opening hours and transit details are demo placeholders to be verified.",
      ],
      transit: "BTS Siam",
      landmark: "Siam Paragon, Rama I Rd",
      faq: genericFaq("Mozza Siam Paragon"),
    },
    iconsiam: {
      mall: "ICONSIAM",
      district: "Khlong San · Chao Phraya riverside",
      h1: "Mozza ICONSIAM — Italian Restaurant at ICONSIAM",
      metaTitle: "Mozza ICONSIAM | Italian Restaurant at ICONSIAM, Bangkok",
      metaDescription:
        "Concept demo: Mozza at ICONSIAM, Charoen Nakhon Rd. Wood-fired pizza, handmade pasta, opening hours, directions and reservations.",
      imageAlt: "Placeholder photo of the Mozza ICONSIAM dining room",
      intro: [
        "Mozza ICONSIAM is on the ground floor of ICONSIAM on Charoen Nakhon Road, in the Khlong San district on the Chao Phraya riverside.",
        "Opening hours and transit details are demo placeholders to be verified.",
      ],
      transit: "Gold Line / BTS Krung Thon Buri",
      landmark: "ICONSIAM, Chao Phraya riverside",
      faq: genericFaq("Mozza ICONSIAM"),
    },
    "central-chidlom": {
      mall: "Central Chidlom",
      district: "Chidlom · Ploenchit",
      h1: "Mozza Central Chidlom — Italian Restaurant at Central Chidlom",
      metaTitle: "Mozza Central Chidlom | Italian Restaurant at Central Chidlom, Bangkok",
      metaDescription:
        "Concept demo: Mozza at Central Chidlom. Address and opening hours to be confirmed. Directions and reservations.",
      imageAlt: "Placeholder photo of the Mozza Central Chidlom dining room",
      intro: [
        "Mozza Central Chidlom is listed here as a placeholder branch in the Chidlom and Ploenchit area. Its address and opening hours are to be confirmed.",
      ],
      transit: "BTS Chit Lom",
      landmark: "Central Chidlom",
      faq: genericFaq("Mozza Central Chidlom"),
    },
  },
};
