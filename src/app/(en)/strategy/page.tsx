import type { Metadata } from "next";
import { getDict } from "@/content";
import Banner from "@/components/Banner";
import StrategyGate from "@/components/strategy/StrategyGate";

// Private page: noindex, not in the sitemap, not in nav/footer. Only the sticky "Growth strategy" button leads here.
export const metadata: Metadata = {
  title: "Private page | Mozza concept demo",
  description: "Private strategy page of the Mozza concept demo.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <div className="print:hidden"><Banner d={getDict("en")} /></div>
      <main id="main">
        <StrategyGate />
      </main>
    </>
  );
}
