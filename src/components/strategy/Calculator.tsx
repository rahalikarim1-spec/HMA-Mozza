"use client";

import { useMemo, useState } from "react";
import type { CalcUi } from "./types";

const fmt = (n: number, lang: string) => (isFinite(n) ? Math.round(n).toLocaleString(lang === "fr" ? "fr-FR" : "en-GB") : "—");

/** Client-side only. Nothing is stored or sent. Example values are labelled as such. */
export default function Calculator({ ui, exampleLabel, lang }: { ui: CalcUi; exampleLabel: string; lang: string }) {
  const [v, setV] = useState<Record<string, number>>(() => Object.fromEntries(ui.inputs.map((i) => [i.id, i.v])));
  const out = useMemo(() => {
    const tablesMonth = v.tables * v.branches * (52 / 12);
    const guests = tablesMonth * v.gpt;
    const revenue = guests * v.spend;
    const gross = revenue * (v.margin / 100);
    const media = v.media;
    const guestYear = v.visits * v.spend * (v.margin / 100);
    return { revenue, gross, media, after: gross - media, cpt: tablesMonth > 0 ? media / tablesMonth : NaN, guestYear, members: guests * (v.share / 100) };
  }, [v]);

  const rows: [keyof CalcUi["outputs"], number, boolean?][] = [
    ["revenue", out.revenue], ["gross", out.gross], ["media", out.media], ["after", out.after, true], ["cpt", out.cpt], ["guestYear", out.guestYear], ["members", out.members],
  ];

  return (
    <div className="rounded-sm border-2 border-ink bg-white p-4">
      <p className="inline-block rounded-sm bg-mustard px-2 py-1 text-xs font-bold">{exampleLabel}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {ui.inputs.map((i) => (
            <div key={i.id}>
              <label htmlFor={`calc-${i.id}`} className="block text-sm font-semibold">{i.label}</label>
              <input
                id={`calc-${i.id}`}
                type="number"
                inputMode="decimal"
                min={i.min}
                step={i.step}
                value={Number.isFinite(v[i.id]) ? v[i.id] : ""}
                onChange={(e) => setV((p) => ({ ...p, [i.id]: e.target.value === "" ? NaN : Number(e.target.value) }))}
                className="mt-1 min-h-11 w-full rounded-sm border-2 border-ink bg-cream px-3"
                dir="ltr"
              />
            </div>
          ))}
        </div>
        <div aria-live="polite" className="rounded-sm bg-cream p-4">
          <h4 className="text-xl">{ui.title}</h4>
          <dl className="mt-3 space-y-2">
            {rows.map(([k, val, strong]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-1">
                <dt className="text-sm">{ui.outputs[k]}</dt>
                <dd className={`shrink-0 text-end ${strong ? "text-lg font-bold" : "font-semibold"}`} dir="ltr">
                  {fmt(val, lang)}{k === "members" ? "" : ` ${ui.unit}`}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs">{ui.note}</p>
        </div>
      </div>
    </div>
  );
}
