import { bookingHref } from "@/lib/booking";
import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import type { Lang } from "@/content/types";
import { AWARDS, AWARDS_VERIFIED, BRANCHES } from "@/config/site";
import { HOME_SIGNATURE } from "@/config/signature";
import { buildMetadata } from "@/lib/seo";
import { faqLd, organizationLd } from "@/lib/jsonld";
import { pathFor } from "@/lib/routes";
import { btnPrimary, container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import TrackedLink from "@/components/TrackedLink";
import BranchCard from "@/components/BranchCard";
import { SignatureCard } from "@/components/DishCard";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";

export function homeMetadata(lang: Lang): Metadata {
  return buildMetadata(lang, "", getDict(lang).meta.home);
}

export default function HomePage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <PageShell lang={lang} route="">
      <JsonLd data={organizationLd()} />
      <JsonLd data={faqLd(d.faq.items)} />

      {/* Hero: full-bleed AI-generated background (decorative), dark gradient for legibility */}
      <section className="relative isolate flex min-h-[90vh] min-h-[90svh] items-start overflow-hidden bg-ink md:min-h-[85vh] md:items-center">
        <picture aria-hidden="true">
          <source media="(min-width: 768px)" srcSet="/images/hero-bg.webp" type="image/webp" width={1536} height={1024} />
          <source media="(min-width: 768px)" srcSet="/images/hero-bg.jpg" type="image/jpeg" width={1536} height={1024} />
          <source srcSet="/images/hero-bg-mobile.webp" type="image/webp" width={600} height={900} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg-mobile.jpg"
            alt=""
            width={600}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-bottom md:object-right md:rtl:-scale-x-100"
          />
        </picture>
        {/* Overlay: top->bottom on mobile; start->end on desktop (mirrors in RTL) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.8),rgb(0_0_0/0.65)_55%,transparent_100%)] md:bg-[linear-gradient(to_right,rgb(0_0_0/0.78),rgb(0_0_0/0.6)_40%,transparent_85%)] md:rtl:bg-[linear-gradient(to_left,rgb(0_0_0/0.78),rgb(0_0_0/0.6)_40%,transparent_85%)]"
        />
        <div className={`${container} py-10 md:py-16`}>
          <div className="max-w-md text-start text-cream md:max-w-lg">
            <h1 className="text-4xl [text-shadow:0_1px_14px_rgb(0_0_0/0.45)] sm:text-5xl lg:text-6xl">{d.hero.h1}</h1>
            <p className="mt-4 text-lg [text-shadow:0_1px_10px_rgb(0_0_0/0.45)]">{d.hero.sub}</p>
            <div className="mt-7 grid gap-3 sm:flex">
              <TrackedLink
                href={bookingHref(lang)}
                event="reservation_click"
                params={{ branch: "any", language: lang }}
                className={btnPrimary}
                dataReserve
              >
                <Icon name="calendar" />
                {d.hero.cta.reserve}
              </TrackedLink>
              <Link
                href={pathFor(lang, "menu")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border-2 border-cream bg-black/40 px-5 py-2 text-center text-base font-semibold leading-tight text-cream transition-colors hover:bg-black/60"
              >
                <Icon name="menu" />
                {d.hero.cta.menu}
              </Link>
            </div>
          </div>
        </div>
        <p className="absolute bottom-2 end-3 rounded-sm bg-black/65 px-2 py-0.5 text-[10px] leading-4 text-cream">
          {d.hero.aiCaption}
        </p>
      </section>

      {/* Choose your Mozza */}
      <section id="branches" className="bg-cream py-12">
        <div className={container}>
          <h2 className="text-3xl sm:text-4xl">{d.chooser.title}</h2>
          <p className="mt-2 max-w-prose">{d.chooser.intro}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((b) => (
              <BranchCard key={b.slug} branch={b} d={d} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Signature dishes */}
      <section className="bg-mustard py-12">
        <div className={container}>
          <h2 className="text-3xl sm:text-4xl">{d.signature.title}</h2>
          <p className="mt-2 max-w-prose">{d.signature.intro}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_SIGNATURE.map((id) => (
              <SignatureCard key={id} id={id} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards strip: hidden until AWARDS_VERIFIED (config). Text only, no logos. */}
      {AWARDS_VERIFIED && (
        <section className="bg-ink py-10 text-cream" aria-labelledby="awards-h">
          <div className={`${container} text-center`}>
            <h2 id="awards-h" className="text-xl text-mustard">{d.awards.title}</h2>
            <ul className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-10">
              {AWARDS.map((a) => (
                <li key={a.name} className="font-[family-name:var(--font-heading)] text-2xl">
                  {a.name} <span className="block text-sm font-sans text-cream/80">{a.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-cream/75">{d.awards.note}</p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-cream py-12">
        <div className={`${container} max-w-3xl`}>
          <h2 className="text-3xl sm:text-4xl">{d.faq.title}</h2>
          <div className="mt-6">
            <Faq items={d.faq.items} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
