import Icon from "@/components/Icon";
import type { GrowthData } from "./types";
import { SectionHead, wrap } from "./shared";
import Reveal from "./Reveal";

/** Simplified, platform-agnostic future-state model: layers on one structured source of truth. Native <details> keeps it usable without JavaScript. */
export default function Foundation({ d }: { d: GrowthData }) {
  const f = d.foundation;
  return (
    <section id="foundation" aria-labelledby="foundation-h" className="border-t-4 border-ink bg-ink py-12 text-cream md:py-16">
      <div className={wrap}>
        <SectionHead id="foundation" kicker="Future state" title={f.title} lead={f.lead} dark />
        <p className="mt-2 text-sm text-cream/90">{f.note}</p>
        <Reveal>
          <ol className="mt-8 space-y-0">
            {f.layers.map((l, i) => (
              <li key={l.id}>
                <details className="group rounded-sm border-2 border-cream bg-ink p-4 open:bg-cream open:text-ink">
                  <summary className="flex cursor-pointer list-none flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-2xl text-mustard group-open:text-tomato">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-xl">{l.title}</span>
                    <span className="text-sm opacity-90">{l.short}</span>
                  </summary>
                  <p className="mt-3 max-w-3xl">{l.detail}</p>
                </details>
                {i < f.layers.length - 1 ? <div className="flex justify-center py-1 text-mustard" aria-hidden="true"><Icon name="arrow" className="h-5 w-5 rotate-90" /></div> : null}
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-sm border-2 border-mustard bg-mustard px-4 py-3 text-center font-semibold text-ink">{f.base}</p>
        </Reveal>
      </div>
    </section>
  );
}
