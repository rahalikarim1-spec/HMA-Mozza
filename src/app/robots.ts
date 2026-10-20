import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/config/site";

export const dynamic = "force-static";

/**
 * Crawling is allowed on purpose: every page carries <meta name="robots" content="noindex, nofollow">
 * and a crawler can only obey noindex if it is allowed to fetch the page. Do NOT add Disallow here.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_ORIGIN}/sitemap.xml` };
}
