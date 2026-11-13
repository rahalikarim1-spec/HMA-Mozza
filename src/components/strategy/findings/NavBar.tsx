"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

const SECTIONS: [string, string][] = [
  ["overview", "Overview"], ["summary", "Summary"], ["findings", "Findings"], ["evidence", "Charts"],
  ["journey", "Journey"], ["options", "Options"], ["foundation", "Foundation"], ["roadmap", "Roadmap"], ["contact", "Review"],
];

/** Sticky bar: back link + section chips with scroll-position tracking. Chips are real anchors (work without JS). */
export default function NavBar({ back, label }: { back: string; label: string }) {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const anchor = window.innerHeight * 0.3;
      let cur = SECTIONS[0][0];
      for (const [id] of SECTIONS) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= anchor) cur = id; }
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    update();
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };
  return (
    <div className="sticky top-[var(--banner-h)] z-30 border-b-2 border-ink bg-cream text-ink">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/strategy/" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
          <Icon name="arrow" className="h-4 w-4 -scale-x-100" />
          <span>{back}</span>
        </Link>
        <nav aria-label={label} className="min-w-0 flex-1 overflow-x-auto">
          <ul className="flex w-max items-center gap-1">
            {SECTIONS.map(([id, text]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-current={active === id ? "location" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-sm border-2 px-2.5 text-xs font-bold ${active === id ? "border-ink bg-ink text-cream" : "border-transparent hover:border-ink"}`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
