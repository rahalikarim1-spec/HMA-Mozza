import type { BranchSlug, Lang } from "./types";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BranchText {
  mall: string;
  /** null = hidden (unconfirmed) */
  district: string | null;
  /** H1 on the branch page */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  intro: string[];
  /** null = hidden (unconfirmed) */
  transit: string | null;
  landmark: string | null;
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
    closesAt: (time: string) => string;
    untilTime: (time: string) => string;
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
    locations: { title: string; description: string };
  };
  hero: { h1: string; sub: string; aiCaption: string; cta: { reserve: string; menu: string } };
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
    photos: string;
  };
  locationsPage: { h1: string; intro: string; mapLabel: string; mapCaption: string };
  branchPage: {
    reserve: string;
    directions: string;
    menu: string;
    addressTitle: string;
    mapAlt: string;
    mapCaption: string;
    gettingHere: string;
    directionsFallback: string;
    detailsPending: string;
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
  strategy: { button: string; dialogTitle: string; passcodeLabel: string; open: string; cancel: string; wrong: string; unavailable: string; checking: string; hint: string; back: string };
  sticky: { label: string; reserve: string; whatsapp: string; line: string; directions: string };
  whatsappMessage: (place: string) => string;
  branches: Record<BranchSlug, BranchText>;
}
