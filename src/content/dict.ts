import type { BranchSlug, CategoryId, DishId, Lang, TagId } from "./types";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BranchText {
  mall: string;
  district: string;
  /** H1 on the branch page */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  intro: string[];
  transit: string;
  landmark: string;
  faq: FaqItem[]; // parking, groups, reservations
}

export interface Dict {
  htmlLang: string;
  dir: "ltr" | "rtl";
  banner: string;
  skipToContent: string;
  nav: { home: string; menu: string; locations: string; reserve: string; label: string };
  lang: { label: string; names: Record<Lang, string> };
  common: {
    demoPrice: string;
    tbc: string;
    ratingOn: (source: string) => string;
    openToday: (until: string) => string;
    openTbc: string;
    hours: string;
    directions: string;
    reserve: string;
    menu: string;
    viewBranch: string;
    viewDish: string;
    breadcrumbHome: string;
    breadcrumbLabel: string;
    dayNames: Record<string, string>;
    demoNote: string;
  };
  meta: {
    home: { title: string; description: string };
    menu: { title: string; description: string };
    locations: { title: string; description: string };
  };
  hero: { h1: string; sub: string; imageAlt: string; cta: { reserve: string; menu: string } };
  chooser: { title: string; intro: string };
  signature: { title: string; intro: string };
  awards: { title: string; note: string; items: string[] };
  faq: { title: string; items: FaqItem[] };
  footer: {
    branches: string;
    follow: string;
    line: string;
    instagram: string;
    facebook: string;
    part: string;
    disclaimer: string;
  };
  menuPage: {
    h1: string;
    intro: string;
    pdf: string;
    categories: Record<CategoryId, string>;
    tabsLabel: string;
    dietaryNote: string;
    reserveSticky: string;
  };
  tags: Record<TagId, string> & { toConfirm: string };
  dishes: Record<DishId, { name: string; description: string; alt: string }>;
  locationsPage: { h1: string; intro: string };
  branchPage: {
    reserve: string;
    directions: string;
    menu: string;
    addressTitle: string;
    mapAlt: string;
    mapCaption: string;
    gettingHere: string;
    transitLabel: string;
    landmarkLabel: string;
    aboutTitle: string;
    signatureTitle: string;
    hoursTitle: string;
    day: string;
    hoursCol: string;
    faqTitle: string;
    otherTitle: string;
  };
  sticky: { label: string; reserve: string; whatsapp: string; line: string; directions: string };
  whatsappMessage: (place: string) => string;
  branches: Record<BranchSlug, BranchText>;
}
