import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import type { Lang } from "@/content/types";
import { BRANCHES, bookingUrlFor } from "@/config/site";
import { SIGNATURE_ORDER, getDish } from "@/config/menu";
import { buildMetadata } from "@/lib/seo";
import { faqLd, organizationLd } from "@/lib/jsonld";
import { pathFor } from "@/lib/routes";
import { btnLight, btnPrimary, container } from "@/lib/ui";
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

      {/* Hero */}
      <section className="bg-mustard">
        <div className={`${container} grid items-center gap-8 py-8 md:grid-cols-2 md:py-14`}>
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">{d.hero.h1}</h1>
            <p className="mt-4 max-w-prose text-lg">{d.hero.sub}</p>
            <div className="mt-6 grid gap-3 sm:flex">
              <TrackedLink
                href={bookingUrlFor()}
                event="reservation_click"
                params={{ branch: "any", language: lang }}
                className={btnPrimary}
              >
                <Icon name="calendar" />
                {d.hero.cta.reserve}
              </TrackedLink>
              <Link href={pathFor(lang, "menu")} className={btnLight}>
                <Icon name="menu" />
                {d.hero.cta.menu}
              </Link>
            </div>
          </div>
          <Image
            src="/images/hero.jpg"
            alt={d.hero.imageAlt}
            width={1600}
            height={1000}
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 560px, 100vw"
            className="aspect-[16/10] w-full rounded-sm object-cover"
          />
        </div>
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
            {SIGNATURE_ORDER.map((id) => (
              <SignatureCard key={id} dish={getDish(id)} d={d} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards strip: text placeholders only, no copied logos */}
      <section className="bg-ink py-10 text-cream" aria-labelledby="awards-h">
        <div className={`${container} text-center`}>
          <h2 id="awards-h" className="text-xl text-mustard">{d.awards.title}</h2>
          <ul className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-10">
            {d.awards.items.map((a) => (
              <li key={a} className="font-[family-name:var(--font-heading)] text-2xl">{a}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-cream/75">{d.awards.note}</p>
        </div>
      </section>

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
