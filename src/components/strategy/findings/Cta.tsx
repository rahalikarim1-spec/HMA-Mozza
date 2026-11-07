"use client";

import Icon from "@/components/Icon";
import { track } from "@/lib/track";
import { btnPrimary } from "@/lib/ui";
import type { GrowthData } from "./types";
import { wrap } from "./shared";

export default function Cta({ d }: { d: GrowthData }) {
  const c = d.cta;
  return (
    <section id="contact" aria-labelledby="contact-h" className="border-t-4 border-ink bg-ink py-14 text-cream md:py-20">
      <div className={wrap}>
        <p className="text-sm font-bold uppercase tracking-wide text-mustard">{d.ui.contactTitle}</p>
        <h2 id="contact-h" className="mt-2 max-w-3xl text-4xl sm:text-5xl">{c.title}</h2>
        <p className="mt-4 max-w-2xl text-lg">{c.text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer" className={btnPrimary} onClick={() => track("whatsapp_contact_click", { location: "growth-risks" })}>
            <Icon name="whatsapp" />
            {c.whatsapp.label}
          </a>
          {c.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-sm border-2 border-cream px-4 font-semibold hover:bg-cream hover:text-ink" onClick={() => track("external_link_click", { destination: l.href, section: "growth-risks" })}>
              {l.label}
            </a>
          ))}
        </div>
        <p className="mt-10 border-t border-cream/30 pt-4 text-xs text-cream/90">{d.footer}</p>
      </div>
    </section>
  );
}
