import type { Lang, Route } from "@/content/types";
import { DEFAULT_LANG } from "@/content/types";
import { SITE_ORIGIN } from "@/config/site";

/** Path for a route in a language, always with trailing slash. EN has no prefix. */
export function pathFor(lang: Lang, route: Route = ""): string {
  const prefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
  const tail = route ? `/${route}` : "";
  return `${prefix}${tail}` + "/";
}

export function absoluteUrl(lang: Lang, route: Route = ""): string {
  return `${SITE_ORIGIN}${pathFor(lang, route)}`;
}

export function menuAnchor(lang: Lang, id: string, menu = "food"): string {
  return `${pathFor(lang, `menu/${menu}` as Route)}#${id}`;
}
