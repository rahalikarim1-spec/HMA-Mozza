import type { Metadata } from "next";
import { getDict } from "@/content";
import Banner from "@/components/Banner";
import PresentationDeck from "@/components/strategy/presentation/PresentationDeck";
import { ceoDeck } from "../../../../../strategy/presentations.mjs";

// Public URL but NOT indexable: noindex, nofollow, not in the sitemap, not in the nav/footer. Reached from the role hub on /strategy/.
export const metadata: Metadata = {
  title: "CEO presentation | Mozza growth pilot",
  description: "A controlled 90-day growth pilot for Mozza by Cocotte — executive presentation (concept demo).",
  robots: { index: false, follow: false },
};

export default function Page() {
  const d = getDict("en");
  return (
    <>
      <Banner d={d} />
      <main id="main">
        <PresentationDeck deck={ceoDeck} backHref="/strategy/" />
      </main>
    </>
  );
}
