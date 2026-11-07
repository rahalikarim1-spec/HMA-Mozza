import type { GrowthData } from "./types";
import { SectionHead, card, wrap } from "./shared";
import Reveal from "./Reveal";

/** Decision-based roadmap: three indicative phases, each ending in a Go / Adjust / Stop gate. */
export default function Roadmap({ d }: { d: GrowthData }) {
  const r = d.roadmap;
  return (
    <section id="roadmap" aria-labelledby="roadmap-h" className="border-t-4 border-ink bg-mustard py-12 md:py-16">
      <div className={wrap}>
        <SectionHead id="roadmap" kicker="Roadmap" title={r.title} lead={r.lead} onMustard />
        <ol className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {r.phases.map((p, i) => (
            <li key={p.id}>
              <Reveal className="h-full">
                <div className={`${card} flex h-full flex-col`}>
                  <p className="flex items-baseline gap-3"><span className="font-display text-4xl leading-none text-tomato">{i + 1}</span><span className="text-sm font-bold uppercase tracking-wide">{p.when}</span></p>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                  <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm">{p.actions.map((a) => <li key={a}>{a}</li>)}</ul>
                  <div className="mt-4 flex-1" />
                  <div className="rounded-sm border-2 border-ink bg-cream p-3">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide"><span className="inline-block h-3 w-3 rotate-45 bg-ink" aria-hidden="true" />{r.gateLabel}</p>
                    <p className="mt-1 text-sm font-semibold">{p.gate}</p>
                    <ul className="mt-2 flex gap-2">{r.outcomes.map((o) => <li key={o} className="rounded-sm border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold">{o}</li>)}</ul>
                  </div>
                  <p className="mt-3 text-xs"><span className="font-bold">{r.measuredLabel}:</span> {p.measured}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
