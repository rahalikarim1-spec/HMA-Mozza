"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Category, Confidence, GrowthData, Priority } from "./types";
import { CategoryBadge, Chip, ConfidenceBadge, PriorityBadge, SectionHead, card, wrap } from "./shared";
import Reveal from "./Reveal";

type Cell = { p: Priority; c: Confidence } | null;

function FindingBody({ f, d }: { f: GrowthData["findings"][number]; d: GrowthData }) {
  const u = d.ui;
  const rows: [string, string][] = [
    [u.shows, f.shows],
    [u.notProve, f.notProve],
    [u.impact, f.impact],
    [u.validation, f.validation],
    [u.intervention, f.intervention],
    [u.measure, f.measure],
  ];
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      {rows.map(([label, text], i) => (
        <div key={label} className={i === 1 ? "rounded-sm border-2 border-dashed border-tomato bg-white p-3 md:col-span-1" : "p-1"}>
          <p className="text-xs font-bold uppercase tracking-wide text-tomato">{label}</p>
          <p className="mt-1">{text}</p>
        </div>
      ))}
      <div className="md:col-span-2">
        <details className="rounded-sm border-2 border-ink bg-cream p-3">
          <summary className="cursor-pointer font-semibold">{u.evidencePanel}</summary>
          <ul className="mt-3 space-y-2">
            {f.evidence.map((e, i) => (
              <li key={i} className="flex items-start gap-2">
                <Chip tag={e.tag} />
                <span className="text-sm">{e.text}{e.cite ? <span className="mt-0.5 block text-xs text-ink/75">Source {e.cite}</span> : null}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs">{Array.from(new Set(f.evidence.map((e) => e.tag))).map((t) => `${t}: ${d.tags[t]}`).join(" · ")}</p>
        </details>
      </div>
    </div>
  );
}

export default function Explorer({ d }: { d: GrowthData }) {
  const u = d.ui;
  const allConf = useMemo(() => d.confidences.map((c) => c.id), [d]);
  const [ready, setReady] = useState(false);
  const [cat, setCat] = useState<"all" | Category>("all");
  const [conf, setConf] = useState<Set<Confidence>>(() => new Set(allConf));
  const [cell, setCell] = useState<Cell>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  useEffect(() => setReady(true), []);

  const shown = useMemo(
    () => d.findings.filter((f) => (cat === "all" || f.cat === cat) && conf.has(f.confidence) && (!cell || (f.priority === cell.p && f.confidence === cell.c))),
    [d, cat, conf, cell],
  );
  const filtered = ready && (cat !== "all" || conf.size !== allConf.length || cell !== null);

  const reset = useCallback(() => { setCat("all"); setConf(new Set(allConf)); setCell(null); }, [allConf]);

  const openFinding = useCallback((id: string) => {
    reset();
    setOpen((s) => new Set(s).add(id));
    requestAnimationFrame(() => {
      const el = document.getElementById(`finding-${id}`);
      if (el) {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
      }
    });
  }, [reset]);

  // Listen for "open finding" requests from the summary cards
  useEffect(() => {
    const onOpen = (e: Event) => openFinding((e as CustomEvent<string>).detail);
    window.addEventListener("growth:open-finding", onOpen);
    return () => window.removeEventListener("growth:open-finding", onOpen);
  }, [openFinding]);

  const toggleConf = (c: Confidence) => setConf((s) => { const n = new Set(s); if (n.has(c)) n.delete(c); else n.add(c); return n.size ? n : new Set(allConf); });
  const count = (p: Priority, c: Confidence) => d.findings.filter((f) => f.priority === p && f.confidence === c).length;
  const catCount = (id: Category) => d.findings.filter((f) => f.cat === id).length;

  return (
    <section id="findings" aria-labelledby="findings-h" className="border-t-4 border-ink bg-mustard py-12 md:py-16">
      <div className={wrap}>
        <SectionHead id="findings" kicker="By category and confidence" title={u.findingsTitle} lead={u.findingsLead} onMustard />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            {ready ? (
              <div className="space-y-3">
                <div role="group" aria-label={u.categoryLabel} className="flex flex-wrap gap-2">
                  {([["all", u.all, d.findings.length], ...d.categories.map((c) => [c.id, `${c.id} · ${c.title}`, catCount(c.id)] as const)] as const).map(([id, label, n]) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={cat === id}
                      onClick={() => setCat(id as "all" | Category)}
                      className={`min-h-11 rounded-sm border-2 border-ink px-3 text-sm font-semibold ${cat === id ? "bg-ink text-cream" : "bg-white hover:bg-cream"}`}
                    >
                      {label} <span className="tabular-nums opacity-80">({n})</span>
                    </button>
                  ))}
                </div>
                <div role="group" aria-label={u.confidenceLabel} className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold">{u.confidenceLabel}:</span>
                  {d.confidences.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={conf.has(c.id)}
                      onClick={() => toggleConf(c.id)}
                      className={`min-h-11 rounded-sm border-2 border-ink px-3 text-sm font-semibold ${conf.has(c.id) ? "bg-cream" : "bg-transparent line-through opacity-70"}`}
                    >
                      <span aria-hidden="true">{c.mark} </span>{c.id}
                    </button>
                  ))}
                  {filtered ? <button type="button" onClick={reset} className="min-h-11 rounded-sm border-2 border-ink bg-white px-3 text-sm font-semibold underline underline-offset-4">{u.reset}</button> : null}
                </div>
              </div>
            ) : null}
            <p className="mt-3 text-sm font-semibold" aria-live="polite">{shown.length} / {d.findings.length} {u.results}</p>

            <ul className="mt-4 space-y-3">
              {shown.length === 0 ? <li className={card}>{u.noneShown}</li> : null}
              {shown.map((f) => (
                <li key={f.id} id={`finding-${f.id}`} className="scroll-mt-32">
                  <Reveal>
                    <details
                      open={open.has(f.id)}
                      onToggle={(e) => { const isOpen = (e.currentTarget as HTMLDetailsElement).open; setOpen((s) => { const n = new Set(s); if (isOpen) n.add(f.id); else n.delete(f.id); return n; }); }}
                      className={`${card} group`}
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <CategoryBadge cat={f.cat} label={`${f.cat} · ${f.theme}`} />
                          <PriorityBadge p={f.priority} />
                          <ConfidenceBadge c={f.confidence} />
                        </div>
                        <h3 className="mt-3 text-xl sm:text-2xl">{f.title}</h3>
                        <p className="mt-1">{f.summary}</p>
                        <p className="mt-2 text-sm font-semibold underline underline-offset-4 group-open:hidden">{u.openFinding} →</p>
                      </summary>
                      <FindingBody f={f} d={d} />
                    </details>
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-sm border-2 border-dashed border-ink/70 bg-white/60 p-3 text-sm">{d.pendingNote}</p>
          </div>

          <aside aria-labelledby="matrix-h" className="lg:sticky lg:top-32 lg:self-start">
            <div className={card}>
              <h3 id="matrix-h" className="text-xl">{u.matrixTitle}</h3>
              <p className="mt-1 text-xs">{u.priorityLabel} (rows) × {u.confidenceLabel} (columns). {ready ? "Select a cell to filter." : ""}</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-center text-xs">
                  <thead>
                    <tr>
                      <th scope="col" className="p-1"><span className="sr-only">{u.priorityLabel}</span></th>
                      {d.confidences.map((c) => <th key={c.id} scope="col" className="p-1 font-semibold"><span aria-hidden="true">{c.mark}</span><br />{c.id}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {d.priorities.map((p) => (
                      <tr key={p.id}>
                        <th scope="row" className="p-1 text-start font-semibold"><span aria-hidden="true">{p.mark} </span>{p.id}</th>
                        {d.confidences.map((c) => {
                          const n = count(p.id, c.id);
                          const sel = cell?.p === p.id && cell?.c === c.id;
                          return (
                            <td key={c.id} className="p-0.5">
                              {ready && n > 0 ? (
                                <button
                                  type="button"
                                  aria-pressed={sel}
                                  aria-label={`${p.id} priority, ${c.id}: ${n} finding${n > 1 ? "s" : ""}`}
                                  onClick={() => setCell(sel ? null : { p: p.id, c: c.id })}
                                  className={`h-11 w-full rounded-sm border-2 border-ink font-bold tabular-nums ${sel ? "bg-ink text-cream" : "bg-mustard hover:bg-cream"}`}
                                >
                                  {n}
                                </button>
                              ) : (
                                <span className={`flex h-11 w-full items-center justify-center rounded-sm border-2 ${n > 0 ? "border-ink bg-mustard font-bold" : "border-ink/25 text-ink/60"}`}>{n > 0 ? n : "·"}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs">{u.matrixNote}</p>
              <dl className="mt-3 space-y-1 text-xs">
                {d.priorities.map((p) => <div key={p.id}><dt className="inline font-bold">{p.mark} {p.id}: </dt><dd className="inline">{p.def}</dd></div>)}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
