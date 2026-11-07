import type { Metadata } from "next";
import { getDict } from "@/content";
import Banner from "@/components/Banner";
import FindingsPage from "@/components/strategy/findings/FindingsPage";
import { growthRisks } from "../../../../../strategy/growth-risks.mjs";

// PRIVATE REVIEW DRAFT. Public URL if deployed, but NOT indexable: noindex, nofollow, not in the sitemap. noindex is not access control:
// do not publish this page to an unprotected host.
export const metadata: Metadata = {
  title: "Growth Risks & Structural Gaps | Mozza concept demo",
  description: "Evidence-based findings, structural gaps and growth blockers for Mozza by Cocotte (concept demo, private review draft).",
  robots: { index: false, follow: false },
};

export default function Page() {
  const d = getDict("en");
  return (
    <>
      <Banner d={d} />
      <main id="main">
        <FindingsPage d={growthRisks} />
      </main>
    </>
  );
}
