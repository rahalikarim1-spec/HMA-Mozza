import type { Metadata } from "next";
import { getDict } from "@/content";
import Banner from "@/components/Banner";
import PresentationDeck from "@/components/strategy/presentation/PresentationDeck";
import { marketingDeck } from "../../../../../strategy/presentations.mjs";

// Public URL if deployed, but NOT indexable: noindex, nofollow, not in the sitemap. noindex is not access control.
export const metadata: Metadata = {
  title: "Marketing Director strategy | Mozza concept demo",
  description: "Branch-level growth strategy for Mozza by Cocotte: demand, local discovery, Google Ads, measurement and a controlled 90-day pilot (concept demo).",
  robots: { index: false, follow: false },
};

export default function Page() {
  const d = getDict("en");
  return (
    <>
      <Banner d={d} />
      <main id="main">
        <PresentationDeck deck={marketingDeck} backHref="/strategy/" />
      </main>
    </>
  );
}
