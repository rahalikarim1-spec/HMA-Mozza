import { BRANCHES } from "@/config/site";
import { LANDING_SLUGS } from "@/content/landing";
import { MENU_IDS } from "@/content/menus-ui";
import type { Route } from "@/content/types";
import { BLOG_SLUGS } from "./params";

/** Every page (language-independent route). Used by sitemap.xml and the link checker. */
export const ALL_ROUTES: Route[] = [
  "",
  "menu",
  ...MENU_IDS.map((m) => `menu/${m}`),
  "locations",
  ...BRANCHES.map((b) => `locations/${b.slug}`),
  ...Object.values(LANDING_SLUGS),
  "about",
  "hma-privilege",
  "delivery",
  "contact",
  "blog",
  ...BLOG_SLUGS.map((s) => `blog/${s}`),
  "reserve",
];
