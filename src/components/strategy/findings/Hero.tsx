import type { GrowthData } from "./types";
import { Chip, wrap } from "./shared";

/** Executive hero: dark band, three labelled signals, and the strengths the findings build on. Server-rendered. */
export default function Hero({ d }: { d: GrowthData }) {
  return (
    <section id="overview" aria-labelledby="overview-h" className="relative isolate overflow-hidden border-t-4 border-ink bg-ink text-cream">
      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute -end-24 -top-24 -z-10 h-[34rem] w-[34rem] text-mustard/20" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
        {[40, 80, 120, 160, 200].map((r) => <circle key={r} cx="200" cy="200" r={r} />)}
        <path d="M200 0v400M0 200h400M58 58l284 284M342 58L58 342" />
      </svg>
      <div className={`${wrap} py-12 md:py-20`}>
        <p className="inline-flex rounded-sm border-2 border-cream/70 px-2 py-1 text-xs font-bold uppercase tracking-wide">{d.draftBadge}</p>
        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-mustard">{d.kicker}</p>
        <h1 id="overview-h" className="mt-3 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{d.headline}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-snug md:text-2xl">{d.sub}</p>
        <p className="mt-4 max-w-3xl text-base text-cream/90 md:text-lg">{d.commercial}</p>

        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {d.stats.map((s) => (
            <li key={s.label} className="rounded-sm border-2 border-cream bg-cream p-5 text-ink shadow-[4px_4px_0_var(--tomato)]">
              <p className={`font-display leading-none ${s.value.length > 7 ? "text-4xl" : "text-5xl"}`}>{s.value}</p>
              <p className="mt-3 font-semibold leading-snug">{s.label}</p>
              <p className="mt-2 text-sm">{s.sub}</p>
              <p className="mt-3 flex items-center gap-2 text-xs"><Chip tag={s.tag} />{d.tags[s.tag]}</p>
              <p className="mt-2 text-[11px] leading-snug text-ink/80">Evidence {s.ev.join(" · ")}. {s.cites.join(" | ")}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/30 pt-6">
          <p className="text-sm font-bold uppercase tracking-wide text-mustard">Built on real strengths</p>
          {d.strengths.map((s) => (
            <p key={s.label} className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-mustard">{s.value}</span>
              <span className="text-sm">{s.label}</span>
            </p>
          ))}
          <p className="flex items-center gap-2 text-xs"><Chip tag="PUB" />Public listings, Oct 2026</p>
        </div>
      </div>
    </section>
  );
}
