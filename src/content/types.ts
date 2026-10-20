export type Lang = "en" | "th" | "ar";
export const LANGS: Lang[] = ["en", "th", "ar"];
export const DEFAULT_LANG: Lang = "en";

export type BranchSlug =
  | "central-park"
  | "emquartier"
  | "siam-paragon"
  | "iconsiam"
  | "central-chidlom";


/** A page inside the site, language-independent, e.g. "" (home), "menu/food", "locations/central-park". */
export type Route = string;
