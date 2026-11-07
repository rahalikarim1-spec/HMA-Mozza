"use client";

import type { GrowthData } from "./types";
import { CategoryBadge, ConfidenceBadge, PriorityBadge, SectionHead, card, wrap } from "./shared";
import Reveal from "./Reveal";

/** Reading guide (three categories, two dimensions) + six headline issue cards. Selecting a card opens the finding below. */
export default function Summary({ d }: { d: GrowthData }) {
  const u = d.ui;
  const head = d.findings.filter((f) => f.headline);
  const open = (id: string) => window.dispatchEvent(new CustomEvent("growth:open-finding", { detail: id }));
  return (
    <section id="summary" aria-labelledby="summary-h" className="border-t-4 border-ink bg-cream py-12 md:py-16">
      <div className={wrap}>
        <SectionHead id="summary" kicker={u.readTitle} title={u.summaryTitle} lead={u.summaryLead} />

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {d.categories.map((c) => (
            <Reveal key={c.id}>
              <div className={`${card} h-full`}>
                <CategoryBadge cat={c.id} label={c.tagline} />
                <h3 className="mt-2 text-xl">{c.title}</h3>
                <p className="mt-1 text-sm">{c.rule}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-sm">{u.readLead}</p>

        <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {head.map((f) => (
            <li key={f.id}>
              <Reveal className="h-full">
                <a
                  href={`#finding-${f.id}`}
                  onClick={(e) => { e.preventDefault(); open(f.id); }}
                  className={`${card} flex h-full flex-col hover:bg-ink hover:text-cream`}
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <CategoryBadge cat={f.cat} label={f.theme} />
                  </span>
                  <span className="mt-3 font-display text-xl leading-snug">{f.title}</span>
                  <span className="mt-2 flex-1 text-sm">{f.summary}</span>
                  <span className="mt-3 flex flex-wrap gap-2 text-ink">
                    <PriorityBadge p={f.priority} />
                    <ConfidenceBadge c={f.confidence} />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
