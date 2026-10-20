import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/content";
import Banner from "@/components/Banner";
import StrategyDoc from "@/components/strategy/StrategyDoc";
import { buildDoc } from "../../../../strategy/doc.mjs";

// Public URL but NOT indexable: noindex, nofollow, not in the sitemap, not in the nav/footer. Only the sticky "Growth strategy" link leads here.
export const metadata: Metadata = {
  title: "Growth strategy | Mozza concept demo",
  description: "Growth strategy and audit for multi-location restaurants — Mozza concept demo.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const fx = Number(process.env.STRATEGY_EUR_THB || 38); // optional: EUR→THB rate for the bid conversion
  const d = getDict("en");
  return (
    <>
      <div className="print:hidden">
        <Banner d={d} />
      </div>
      <main id="main">
        <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 print:hidden">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">
            {d.strategy.back}
          </Link>
        </div>
        <StrategyDoc en={buildDoc("en", { fx })} fr={buildDoc("fr", { fx })} />
      </main>
    </>
  );
}
