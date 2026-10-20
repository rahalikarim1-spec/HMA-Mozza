import type { ReactNode } from "react";
import { getDict } from "@/content";
import type { BranchSlug, Lang, Route } from "@/content/types";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import StickyBar from "./StickyBar";

/** Banner + header + main + footer + mobile sticky bar. Used by every page. */
export default function PageShell({
  lang,
  route,
  branch,
  children,
}: {
  lang: Lang;
  route: Route;
  branch?: BranchSlug;
  children: ReactNode;
}) {
  const d = getDict(lang);
  return (
    <>
      <Banner d={d} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-[calc(var(--banner-h)+0.5rem)] focus:z-[60] focus:bg-cream focus:px-3 focus:py-2 focus:font-semibold"
      >
        {d.skipToContent}
      </a>
      <Header lang={lang} route={route} d={d} branch={branch} />
      <main id="main">{children}</main>
      <Footer lang={lang} d={d} route={route} />
      <StickyBar lang={lang} d={d} branch={branch} />
    </>
  );
}
