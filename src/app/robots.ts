import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** Private concept demo: disallow everything. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
