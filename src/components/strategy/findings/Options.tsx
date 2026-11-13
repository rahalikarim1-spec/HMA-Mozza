"use client";

import { useState } from "react";
import type { GrowthData } from "./types";
import { SectionHead, card, wrap } from "./shared";
import Reveal from "./Reveal";

/** Three technical paths compared fairly (qualitative, no scores) + an interactive decision-trigger checklist with a proposed rule, not a verdict. */
export default function Options({ d }: { d: GrowthData }) {
  const o = d.options;
  const t = d.triggers;
  const [st, setSt] = useState<number[]>(() => t.items.map(() => 0));
  const set = (i: number, v: number) => setSt((a) => a.map((x, k) => (k === i ? v : x)));
  const confirmed = st.filter((x) => x === 2).length;
  const unknown = st.filter((x) => x === 0).length;
  const last = t.items.length - 1;
  const ready = st[last] === 2 && st.slice(0, last).some((x) => x === 2);

  return (
    <section id="options" aria-labelledby="options-h" className="border-t-4 border-ink bg-cream py-12 md:py-16">
      <div className={wrap}>
        <SectionHead id="options" kicker="Technical paths" title={o.title} lead={o.lead} />

        {/* Desktop: comparison table */}
        <Reveal>
          <div className="mt-8 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[48rem] border-collapse text-start text-sm">
              <caption className="sr-only">{o.title}</caption>
              <thead>
                <tr>
                  <th scope="col" className="border-2 border-ink bg-ink p-3 text-start text-cream">&nbsp;</th>
                  {o.paths.map((p) => (
                    <th key={p.id} scope="col" className="border-2 border-ink bg-ink p-3 text-start align-top text-cream">
                      <span className="block font-display text-lg leading-snug">{p.title}</span>
                      <span className="mt-1 block text-xs font-normal">{p.summary}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {o.criteria.map((c, i) => (
                  <tr key={c}>
                    <th scope="row" className="w-40 border-2 border-ink bg-mustard p-3 text-start align-top font-semibold">{c}</th>
                    {o.paths.map((p) => <td key={p.id} className="border-2 border-ink bg-white p-3 align-top">{p.cells[i]}</td>)}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="border-2 border-ink bg-mustard p-3 text-start align-top font-semibold">{o.validateLabel}</th>
                  {o.paths.map((p) => <td key={p.id} className="border-2 border-dashed border-ink bg-cream p-3 align-top font-semibold">{p.validate}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile: one card per path */}
        <ul className="mt-8 space-y-3 md:hidden">
          {o.paths.map((p) => (
            <li key={p.id} className={card}>
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="mt-1 text-sm">{p.summary}</p>
              <dl className="mt-3 space-y-2 text-sm">
                {o.criteria.map((c, i) => (
                  <div key={c}><dt className="font-bold">{c}</dt><dd>{p.cells[i]}</dd></div>
                ))}
                <div className="rounded-sm border-2 border-dashed border-ink p-2"><dt className="font-bold">{o.validateLabel}</dt><dd>{p.validate}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">{o.note}</p>

        {/* Decision triggers */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <h3 className="text-2xl sm:text-3xl">{t.title}</h3>
            <p className="mt-2 max-w-prose">{t.lead}</p>
            <ol className="mt-4 space-y-3">
              {t.items.map((it, i) => (
                <li key={i} className={card}>
                  <p className="flex gap-3"><span className="font-display text-2xl leading-none text-tomato">{i + 1}</span><span>{it}</span></p>
                  <div role="group" aria-label={`Trigger ${i + 1} status`} className="mt-3 flex flex-wrap gap-2">
                    {t.states.map((s, k) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={st[i] === k}
                        onClick={() => set(i, k)}
                        className={`min-h-11 rounded-sm border-2 border-ink px-3 text-sm font-semibold ${st[i] === k ? "bg-ink text-cream" : "bg-white hover:bg-cream"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside aria-live="polite" className="lg:sticky lg:top-32 lg:self-start">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{t.title}</p>
              <p className="mt-2 font-display text-4xl leading-none">{confirmed}<span className="text-xl"> / {t.items.length}</span></p>
              <p className="text-sm">{t.summaryLabels.confirmed} · {unknown} {t.summaryLabels.unknown.toLowerCase()}</p>
              <p className={`mt-3 rounded-sm border-2 px-2 py-1 text-sm font-semibold ${ready ? "border-ink bg-ink text-cream" : "border-dashed border-ink"}`}>
                {ready ? t.summaryLabels.ready : t.summaryLabels.notReady}
              </p>
              <p className="mt-3 text-xs">{t.rule}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
