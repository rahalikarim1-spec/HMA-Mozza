import type { Metadata } from "next";
import type { Lang, Route } from "@/content/types";
import { LANGS } from "@/content/types";
import { SITE_ORIGIN } from "@/config/site";
import { absoluteUrl } from "./routes";

const OG_LOCALE: Record<Lang, string> = { en: "en_US", th: "th_TH", ar: "ar_AE" };

export function hreflangMap(route: Route): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LANGS) map[l] = absoluteUrl(l, route);
  map["x-default"] = absoluteUrl("en", route);
  return map;
}

/** Every page: unique title/description, self-canonical, hreflang set, noindex+nofollow. */
export function buildMetadata(
  lang: Lang,
  route: Route,
  meta: { title: string; description: string },
): Metadata {
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(lang, route),
      languages: hreflangMap(route),
    },
    robots: { index: false, follow: false },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(lang, route),
      locale: OG_LOCALE[lang],
      type: "website",
    },
  };
}
