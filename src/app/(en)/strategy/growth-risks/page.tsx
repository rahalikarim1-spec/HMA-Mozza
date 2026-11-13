import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getDict } from "@/content";
import Banner from "@/components/Banner";
import GrowthRisksGate from "@/components/strategy/findings/GrowthRisksGate";

// PASSWORD-PROTECTED. The content is AES-GCM encrypted at build time (scripts/encrypt-growth-risks.mjs; password = GROWTH_RISKS_PASSWORD or the built-in default)
// and decrypted in the browser. This page module itself contains NO Growth Risks content, only the unlock screen.
// noindex, nofollow, not in the sitemap.
export const metadata: Metadata = {
  title: "Growth Risks & Structural Gaps | Mozza concept demo",
  description: "Confidential review for HMA (concept demo). Password required.",
  robots: { index: false, follow: false },
};

// Never publish this page unprotected: a production build without the encrypted payload must fail.
if (process.env.NODE_ENV === "production" && !existsSync(join(process.cwd(), "public", "strategy-data", "growth-risks.json"))) {
  throw new Error("Growth Risks payload missing: build with `npm run build` (runs scripts/encrypt-growth-risks.mjs).");
}

export default function Page() {
  const d = getDict("en");
  return (
    <>
      <Banner d={d} />
      <main id="main">
        <GrowthRisksGate />
      </main>
    </>
  );
}
