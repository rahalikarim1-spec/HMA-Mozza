import type { MetadataRoute } from "next";
import { LANGS } from "@/content/types";
import { ALL_ROUTES } from "@/lib/allRoutes";
import { absoluteUrl } from "@/lib/routes";
import { hreflangMap } from "@/lib/seo";

export const dynamic = "force-static";

/** Shows the multilingual structure even though the whole site is noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.flatMap((route) =>
    LANGS.map((lang) => ({
      url: absoluteUrl(lang, route),
      alternates: { languages: hreflangMap(route) },
    })),
  );
}
