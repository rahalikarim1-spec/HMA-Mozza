import type { GrowthData } from "./types";
import { Chip, SectionHead, card, wrap } from "./shared";
import Reveal from "./Reveal";

function Source({ cites, label = "3P" }: { cites: string[]; label?: "3P" | "PUB" }) {
  return (
    <p className="mt-3 flex flex-wrap items-start gap-2 text-xs">
      <Chip tag={label} />
      <span>{cites.map((c) => `Source ${c}`).join(" | ")}</span>
    </p>
  );
}

/** Factual, labelled charts only: like-for-like comparisons of data we hold, each with its evidence id, tool, scope and date.
 *  No invented series or projections. Each chart has a text/table alternative. */
export default function Charts({ d }: { d: GrowthData }) {
  const v = d.visuals;
  const u = d.ui;
  const L = v.links;
  const tmax = 3000;
  const R = 44;
  const C = 2 * Math.PI * R;
  const bandCls: Record<string, string> = { brand: "bg-ink", nonbrand: "bg-tomato", mall: "bg-leaf", thai: "bg-mustard ring-2 ring-inset ring-ink" };
  const toneCls = { toxic: "bg-tomato text-cream", pot: "bg-mustard text-ink", non: "bg-leaf text-cream" } as const;
  const gmax = 1500;
  const aiMax = Math.max(...v.ai.groups.flatMap((g) => g.rows.map((r) => r.value)));
  const tldMax = Math.max(...L.tld.rows.map((r) => r.count));
  const cMax = Math.max(...L.tld.countries.map((r) => r.count));

  return (
    <section id="evidence" aria-labelledby="evidence-h" className="border-t-4 border-ink bg-cream py-12 md:py-16">
      <div className={wrap}>
        <SectionHead id="evidence" kicker="Charts" title={u.evidenceTitle} lead={u.evidenceLead} />

        {/* ---------- Search visibility estimates ---------- */}
        <h3 className="mt-10 text-2xl">Search visibility estimates</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <figure className={`${card} h-full`} aria-labelledby="fig-traffic">
              <figcaption id="fig-traffic" className="font-display text-xl">{v.traffic.title}</figcaption>
              <p className="mt-1 text-sm">{v.traffic.caption}</p>
              <ul className="mt-5 space-y-5">
                {v.traffic.bars.map((b, i) => {
                  const hi = b.hi ?? b.value ?? 0;
                  return (
                    <li key={b.label}>
                      <p className="text-sm font-semibold">{b.label}</p>
                      <div className="mt-1 h-7 rounded-sm bg-cream ring-2 ring-ink" role="img" aria-label={`${b.label}: ${b.sub}`}>
                        <div className={`h-full rounded-sm ${i === 2 ? "bg-tomato" : "bg-ink"}`} style={{ width: `${Math.min(100, (hi / tmax) * 100)}%`, minWidth: "6px" }} />
                      </div>
                      <p className="mt-1 text-sm">{b.sub}</p>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-sm">{v.traffic.note}</p>
              <Source cites={v.traffic.cites} />
            </figure>
          </Reveal>

          <Reveal className="min-w-0">
            <figure className={`${card} h-full`} aria-labelledby="fig-audit">
              <figcaption id="fig-audit" className="font-display text-xl">{v.audit.title}</figcaption>
              <p className="mt-1 text-sm">{v.audit.caption}</p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <svg viewBox="0 0 120 120" className="h-36 w-36 shrink-0" role="img" aria-label={`Site health ${v.audit.health} percent`}>
                  <circle cx="60" cy="60" r={R} fill="none" stroke="var(--cream)" strokeWidth="14" />
                  <circle cx="60" cy="60" r={R} fill="none" stroke="var(--ink)" strokeWidth="14" strokeLinecap="butt" strokeDasharray={`${(v.audit.health / 100) * C} ${C}`} transform="rotate(-90 60 60)" />
                  <text x="60" y="58" textAnchor="middle" className="fill-ink font-display text-[26px]">{v.audit.health}%</text>
                  <text x="60" y="76" textAnchor="middle" className="fill-ink text-[10px] font-semibold">site health</text>
                </svg>
                <dl className="grid grid-cols-3 gap-3">
                  {v.audit.stats.map((s) => (
                    <div key={s.label} className="rounded-sm border-2 border-ink px-3 py-2 text-center">
                      <dd className="font-display text-3xl leading-none">{s.value}</dd>
                      <dt className="mt-1 text-xs">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>
              <Source cites={v.audit.cites} />
            </figure>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-2">
            <figure className={card} aria-labelledby="fig-ai">
              <figcaption id="fig-ai" className="font-display text-xl">{v.ai.title}</figcaption>
              <p className="mt-1 text-sm">{v.ai.caption}</p>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                {v.ai.groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-sm font-bold">{g.label} <span className="font-normal">· {g.total} mentions</span></p>
                    <ul className="mt-2 space-y-2">
                      {g.rows.map((r) => (
                        <li key={r.label} className="flex items-center gap-3">
                          <span className="w-36 shrink-0 text-sm">{r.label}</span>
                          <div className="h-5 flex-1 rounded-sm bg-cream ring-1 ring-ink/40" role="img" aria-label={`${g.label}, ${r.label}: ${r.value} mentions`}>
                            <div className="h-full rounded-sm bg-ink" style={{ width: `${(r.value / aiMax) * 100}%` }} />
                          </div>
                          <span className="w-7 text-end font-bold tabular-nums">{r.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Source cites={v.ai.cites} />
            </figure>
          </Reveal>
        </div>

        {/* ---------- Search demand ---------- */}
        <h3 className="mt-12 text-2xl">Search demand</h3>
        <div className="mt-4">
          <Reveal className="min-w-0">
            <figure className={card} aria-labelledby="fig-bands">
              <figcaption id="fig-bands" className="font-display text-xl">{v.bands.title}</figcaption>
              <p className="mt-1 text-sm">{v.bands.caption} {u.scaleNote}.</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label="Legend">
                {Object.entries(v.bands.groups).map(([k, label]) => (
                  <li key={k} className="flex items-center gap-1.5"><span className={`inline-block h-3 w-5 ${bandCls[k]}`} aria-hidden="true" />{label}</li>
                ))}
              </ul>
              <div className="mt-4 overflow-x-auto">
                <div className="min-w-[34rem]">
                  <div className="ms-[13rem] grid grid-cols-4 text-center text-[11px] font-semibold" aria-hidden="true">
                    {v.bands.scale.map((s) => <span key={s} className="border-s border-ink/30">{s}</span>)}
                  </div>
                  <ul className="mt-1 space-y-1.5">
                    {v.bands.rows.map((r) => (
                      <li key={r.label} className="flex items-center gap-3">
                        <span className="w-[12.5rem] shrink-0 truncate text-sm" title={r.label}>{r.label}</span>
                        <div className="relative h-5 flex-1 rounded-sm bg-cream ring-1 ring-ink/40" role="img" aria-label={`${r.label}: ${v.bands.scale[r.band - 1]} monthly searches, ${v.bands.groups[r.group]}`}>
                          <div className={`absolute inset-y-0 rounded-sm ${bandCls[r.group]}`} style={{ insetInlineStart: `${((r.band - 1) / 4) * 100}%`, width: "25%" }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Source cites={v.bands.cites} />
            </figure>
          </Reveal>
        </div>

        {/* ---------- Link profile ---------- */}
        <h3 className="mt-12 text-2xl">{L.heading}</h3>
        <p className="mt-2 rounded-sm border-2 border-dashed border-tomato bg-white p-3 text-sm">{L.method}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <figure className={`${card} h-full`} aria-labelledby="fig-growth">
              <figcaption id="fig-growth" className="font-display text-xl">{L.growth.title}</figcaption>
              <p className="mt-1 text-sm">{L.growth.caption}</p>
              <ul className="mt-5 space-y-6">
                {L.growth.items.map((it) => (
                  <li key={it.label}>
                    <p className="text-sm font-bold">{it.label}</p>
                    {[it.start, it.end].map((pt, k) => (
                      <div key={k} className="mt-2">
                        <div className="h-6 rounded-sm bg-cream ring-2 ring-ink" role="img" aria-label={`${it.label}: ${pt.text}`}>
                          <div className={`h-full rounded-sm ${k === 0 ? "bg-ink/55" : "bg-tomato"}`} style={{ width: `${(pt.value / gmax) * 100}%`, minWidth: "6px" }} />
                        </div>
                        <p className="mt-0.5 text-sm">{pt.text}</p>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-sm bg-cream p-2 text-sm">{L.growth.annotation}</p>
              <p className="mt-2 text-xs">{L.growth.limits}</p>
              <Source cites={L.growth.cites} />
            </figure>
          </Reveal>

          <Reveal className="min-w-0">
            <figure className={`${card} h-full`} aria-labelledby="fig-tox">
              <figcaption id="fig-tox" className="font-display text-xl">{L.toxicity.title}</figcaption>
              <p className="mt-1 text-sm">{L.toxicity.caption}</p>
              <div className="mt-5 flex h-9 overflow-hidden rounded-sm ring-2 ring-ink" role="img" aria-label={L.toxicity.segments.map((s) => `${s.label} ${s.count} (${s.pct}%)`).join(", ")}>
                {L.toxicity.segments.map((s) => (
                  <div key={s.label} className={`${toneCls[s.tone]} flex items-center justify-center text-xs font-bold`} style={{ width: `${s.pct}%`, minWidth: s.pct < 3 ? "6px" : undefined }}>
                    {s.pct > 20 ? `${s.pct}%` : ""}
                  </div>
                ))}
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-1 text-sm sm:grid-cols-3">
                {L.toxicity.segments.map((s) => (
                  <li key={s.label} className="flex items-start gap-2">
                    <span className={`mt-1 inline-block h-3 w-3 shrink-0 ${s.tone === "toxic" ? "bg-tomato" : s.tone === "pot" ? "bg-mustard ring-1 ring-ink" : "bg-leaf"}`} aria-hidden="true" />
                    <span><span className="font-bold">{s.label}</span><br />{s.count} · {s.pct}%</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 list-disc space-y-1.5 ps-5 text-xs">{L.toxicity.limits.map((x) => <li key={x}>{x}</li>)}</ul>
              <Source cites={L.toxicity.cites} />
            </figure>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-2">
            <figure className={card} aria-labelledby="fig-tld">
              <figcaption id="fig-tld" className="font-display text-xl">{L.tld.title}</figcaption>
              <p className="mt-1 text-sm">{L.tld.caption}</p>
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <ul className="space-y-2" aria-label={L.tld.title}>
                  {L.tld.rows.map((r) => (
                    <li key={r.label} className="flex items-center gap-3">
                      <span className="w-14 shrink-0 text-sm font-semibold">{r.label}</span>
                      <div className="h-5 flex-1 rounded-sm bg-cream ring-1 ring-ink/40" role="img" aria-label={`${r.label}: ${r.count} referring domains (${r.pct})`}>
                        <div className="h-full rounded-sm bg-ink" style={{ width: `${(r.count / tldMax) * 100}%` }} />
                      </div>
                      <span className="w-24 shrink-0 text-end text-sm tabular-nums">{r.count} · {r.pct}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="text-sm font-bold">{L.tld.countriesTitle}</p>
                  <ul className="mt-2 space-y-2">
                    {L.tld.countries.map((r) => (
                      <li key={r.label} className="flex items-center gap-3">
                        <span className="w-28 shrink-0 text-sm">{r.label}</span>
                        <div className="h-4 flex-1 rounded-sm bg-cream ring-1 ring-ink/40" role="img" aria-label={`${r.label}: ${r.count} referring domains (${r.pct})`}>
                          <div className="h-full rounded-sm bg-tomato" style={{ width: `${(r.count / cMax) * 100}%`, minWidth: "4px" }} />
                        </div>
                        <span className="w-20 shrink-0 text-end text-sm tabular-nums">{r.count} · {r.pct}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-3 text-sm">{L.tld.note}</p>
              <Source cites={L.tld.cites} />
            </figure>
          </Reveal>
        </div>

        {/* ---------- Tracked keyword positions ---------- */}
        <h3 className="mt-12 text-2xl">Tracked keyword positions</h3>
        <div className="mt-4">
          <Reveal className="min-w-0">
            <figure className={card} aria-labelledby="fig-rank">
              <figcaption id="fig-rank" className="font-display text-xl">{v.rank.title}</figcaption>
              <p className="mt-1 text-sm">{v.rank.caption}</p>
              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {v.rank.tops.map((t) => (
                  <div key={t.label} className="rounded-sm border-2 border-ink px-3 py-2 text-center">
                    <dd className="font-display text-4xl leading-none">{t.value}</dd>
                    <dt className="mt-1 text-xs font-semibold">keywords in the {t.label}</dt>
                  </div>
                ))}
              </dl>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Keyword positions">
                {v.rank.keywords.map((k) => (
                  <li key={k.kw} className="flex items-center gap-3 rounded-sm border-2 border-ink/60 px-3 py-2">
                    <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-sm bg-ink px-2 font-display text-xl text-cream" aria-label={`Position ${k.pos}`}>#{k.pos}</span>
                    <span className="text-sm">{k.kw}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 list-disc space-y-1.5 ps-5 text-xs">{v.rank.limits.map((x) => <li key={x}>{x}</li>)}</ul>
              <Source cites={v.rank.cites} />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
