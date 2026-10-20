"use client";

import { usePathname } from "next/navigation";
import { getDict } from "@/content";
import type { Lang } from "@/content/types";
import TrackedLink from "@/components/TrackedLink";

/** Sticky "Growth strategy" link on every page (above the mobile booking bar). Goes straight to /strategy/. Hidden on /strategy itself. */
export default function StrategyButton({ lang }: { lang: Lang }) {
  const t = getDict(lang).strategy;
  const pathname = usePathname();
  if (pathname.startsWith("/strategy")) return null;
  return (
    <TrackedLink
      href="/strategy/"
      event="strategy_button_click"
      params={{ language: lang }}
      prefetch={false}
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] end-3 z-40 flex max-w-[min(15rem,72vw)] items-center gap-2 rounded-sm border-2 border-cream bg-ink px-3 py-2 text-start text-[11px] font-semibold leading-tight text-cream shadow-[3px_3px_0_var(--tomato)] hover:bg-black md:bottom-6 md:end-6 md:max-w-[19rem] md:text-sm"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-mustard" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
      </svg>
      <span>{t.button}</span>
    </TrackedLink>
  );
}
