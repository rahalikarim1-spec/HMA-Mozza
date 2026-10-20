import type { MetadataRoute } from "next";
import { LANGS, type Route } from "@/content/types";
import { BRANCHES } from "@/config/site";
import { absoluteUrl } from "@/lib/routes";
import { hreflangMap } from "@/lib/seo";

export const dynamic = "force-static";

/** Shows the multilingual structure even though the whole site is noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Route[] = ["", "menu", "locations", ...BRANCHES.map((b) => `locations/${b.slug}` as Route)];
  return routes.flatMap((route) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(lang, route),
      alternates: { languages: hreflangMap(route) },
    })),
  );
}
