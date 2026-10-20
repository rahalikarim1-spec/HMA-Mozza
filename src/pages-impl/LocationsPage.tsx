import type { Metadata } from "next";
import { getDict } from "@/content";
import type { Lang } from "@/content/types";
import { BRANCHES } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, organizationLd, restaurantsListLd } from "@/lib/jsonld";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import BranchCard from "@/components/BranchCard";
import JsonLd from "@/components/JsonLd";

export function locationsMetadata(lang: Lang): Metadata {
  return buildMetadata(lang, "locations", getDict(lang).meta.locations);
}

export default function LocationsPage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <PageShell lang={lang} route="locations">
      <JsonLd data={organizationLd()} />
      <JsonLd data={restaurantsListLd(lang)} />
      <JsonLd
        data={breadcrumbLd([
          { name: d.common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: d.nav.locations, url: absoluteUrl(lang, "locations") },
        ])}
      />
      <section className="bg-mustard">
        <div className={`${container} py-6 md:py-10`}>
          <Breadcrumbs
            label={d.common.breadcrumbLabel}
            items={[{ name: d.common.breadcrumbHome, href: pathFor(lang) }, { name: d.nav.locations }]}
          />
          <h1 className="mt-4 text-4xl sm:text-5xl">{d.locationsPage.h1}</h1>
          <p className="mt-3 max-w-prose text-lg">{d.locationsPage.intro}</p>
        </div>
      </section>
      <section className="bg-cream py-10">
        <div className={`${container} grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
          {BRANCHES.map((b) => (
            <BranchCard key={b.slug} branch={b} d={d} lang={lang} headingLevel={2} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
