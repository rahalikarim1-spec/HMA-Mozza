"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { getDict } from "@/content";
import type { Lang } from "@/content/types";
import TrackedLink from "@/components/TrackedLink";

const ITEMS = [
  { href: "/strategy/ceo/", label: "CEO Briefing", bg: "bg-[#0B1220]", icon: "M4 20V8l8-4 8 4v12M9 20v-6h6v6" },
  { href: "/strategy/", label: "Growth Strategy", bg: "bg-[#1D4ED8]", icon: "M3 17l6-6 4 4 8-8M15 7h6v6" },
  { href: "/strategy/marketing/", label: "Marketing Director", bg: "bg-[#0F766E]", icon: "M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM15 9a4 4 0 010 6M18 6.5a8 8 0 010 11" },
  { href: "/strategy/growth-risks/", label: "Growth Risks", lock: true, bg: "bg-[#B45309]", icon: "M12 3l9 16H3L12 3zM12 10v4M12 17h.01" },
] as const;

/**
 * Floating "Strategy" speed-dial on every page (above the mobile booking bar; bottom corner on /strategy/*).
 * Closed = the original Growth strategy button. Open = four pill links to the strategy pages.
 */
export default function StrategyButton({ lang }: { lang: Lang }) {
  const t = getDict(lang).strategy;
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) trigger.current?.focus();
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") close(true); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open, close]);

  const onMenuKey = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (i < 0) return;
    e.preventDefault();
    links[(i + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length].focus();
  };

  const isStrategy = pathname.startsWith("/strategy");
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <div
      ref={root}
      className={`fixed end-3 z-40 flex flex-col-reverse items-end gap-2 md:bottom-6 md:end-6 ${isStrategy ? "bottom-[calc(1rem+env(safe-area-inset-bottom))]" : "bottom-[calc(4.75rem+env(safe-area-inset-bottom))]"}`}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 max-w-[min(15rem,72vw)] items-center gap-2 rounded-sm border-2 border-cream bg-ink px-3 py-2 text-start text-[11px] font-semibold leading-tight text-cream shadow-[3px_3px_0_var(--tomato)] hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard md:max-w-[19rem] md:text-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-mustard" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
        </svg>
        <span>{t.button}</span>
        <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 15l6-6 6 6" />
        </svg>
      </button>
      <ul id={menuId} role="list" onKeyDown={onMenuKey} className="flex flex-col items-end gap-2" aria-label="Strategy pages">
        {ITEMS.map((it, i) => {
          const here = current === it.href;
          return (
            <li
              key={it.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${(ITEMS.length - 1 - i) * 40}ms` : "0ms" }}
              className={`sd-item transition-[opacity,transform,visibility] duration-[180ms] ease-out motion-reduce:translate-y-0 motion-reduce:transition-none ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}
            >
              <TrackedLink
                href={it.href}
                event="strategy_button_click"
                params={{ language: lang, target: it.href }}
                prefetch={false}
                ariaCurrent={here ? "page" : undefined}
                className={`flex min-h-11 items-center gap-2 rounded-sm border-2 border-cream px-4 py-2 text-[13px] font-semibold text-white shadow-lg ${it.bg} ring-offset-2 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard md:text-sm ${here ? "ring-2 ring-white ring-offset-ink" : ""}`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={it.icon} /></svg>
                {it.label}
                {"lock" in it ? (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" role="img" aria-label="Password protected" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="1.5" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>
                ) : null}
                {here ? <span className="sr-only"> (current page)</span> : null}
              </TrackedLink>
            </li>
          );
        })}
      </ul>
      <noscript>
        <style>{".sd-item{visibility:visible!important;opacity:1!important;transform:none!important}"}</style>
      </noscript>
    </div>
  );
}
