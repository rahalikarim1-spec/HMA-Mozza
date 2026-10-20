export type Lang = "en" | "th" | "ar";
export const LANGS: Lang[] = ["en", "th", "ar"];
export const DEFAULT_LANG: Lang = "en";

export type BranchSlug =
  | "central-park"
  | "emquartier"
  | "siam-paragon"
  | "iconsiam"
  | "central-chidlom";

export type DishId =
  | "truffle-tagliolini"
  | "burrata"
  | "carpi-salerno"
  | "truffle-risotto"
  | "lobster-spaghetti"
  | "tiramisu";

export type CategoryId = "starters" | "pizza" | "pasta" | "desserts";
export type TagId = "vegetarian" | "pork" | "alcohol";

/** A page inside the site, language-independent. "" = home. */
export type Route =
  | ""
  | "menu"
  | "locations"
  | `locations/${BranchSlug}`;
