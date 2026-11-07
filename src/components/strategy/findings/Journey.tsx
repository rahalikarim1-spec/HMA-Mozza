"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { GrowthData } from "./types";
import { Chip, SectionHead, card, wrap } from "./shared";
import Reveal from "./Reveal";

/** Guest journey: select a step to see what the guest needs, what we observed (labelled), where friction may arise (hypothesis) and how we'd measure it. */
export default function Journey({ d }: { d: GrowthData }) {
  const j = d.journey;
  const [i, setI] = useState(0);
  const s = j.steps[i];
  return (
    <section id="journey" aria-labelledby="journey-h" className="border-t-4 border-ink bg-mustard py-12 md:py-16">
      <div className={wrap}>
        <SectionHead id="journey" kicker="Guest journey" title={j.title} lead={j.lead} onMustard />
        <Reveal>
          <ol className="mt-8 flex flex-wrap items-stretch gap-2" aria-label={j.title}>
            {j.steps.map((st, k) => (
              <li key={st.id} className="flex items-center gap-2">
                <button
                  type="button"
                  aria-pressed={i === k}
                  aria-controls="journey-panel"
                  onClick={() => setI(k)}
                  className={`min-h-12 rounded-sm border-2 border-ink px-4 font-semibold ${i === k ? "bg-ink text-cream" : "bg-white hover:bg-cream"}`}
                >
                  <span className="me-2 tabular-nums opacity-80">{k + 1}</span>{st.title}
                </button>
                {k < j.steps.length - 1 ? <Icon name="arrow" className="h-4 w-4" /> : null}
              </li>
            ))}
          </ol>
        </Reveal>

        <div id="journey-panel" role="region" aria-live="polite" aria-label={s.title} className={`${card} mt-4`}>
          <h3 className="font-display text-2xl">{s.title}</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{j.labels.need}</p>
              <p className="mt-1">{s.need}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{j.labels.observed}</p>
              <ul className="mt-1 space-y-2">
                {s.observed.map((o, k) => (
                  <li key={k} className="flex items-start gap-2"><Chip tag={o.tag} /><span className="text-sm">{o.text}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm border-2 border-dashed border-tomato p-3">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-tomato"><Chip tag="HYP" />{j.labels.friction}</p>
              <p className="mt-1">{s.friction}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{j.labels.measure}</p>
              <p className="mt-1">{s.measure}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
