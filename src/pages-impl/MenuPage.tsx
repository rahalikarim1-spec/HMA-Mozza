import type { Metadata } from "next";
import { getDict } from "@/content";
import type { Lang } from "@/content/types";
import { PDF_MENU_URL, bookingUrlFor } from "@/config/site";
import { CATEGORIES, DISHES } from "@/config/menu";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, menuLd, organizationLd } from "@/lib/jsonld";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { btnPrimary, container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MenuDishCard } from "@/components/DishCard";
import TrackedLink from "@/components/TrackedLink";
import MenuViewTracker from "@/components/MenuViewTracker";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";

export function menuMetadata(lang: Lang): Metadata {
  return buildMetadata(lang, "menu", getDict(lang).meta.menu);
}

export default function MenuPage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <PageShell lang={lang} route="menu">
      <MenuViewTracker lang={lang} />
      <JsonLd data={organizationLd()} />
      <JsonLd data={menuLd(lang, d)} />
      <JsonLd
        data={breadcrumbLd([
          { name: d.common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: d.nav.menu, url: absoluteUrl(lang, "menu") },
        ])}
      />

      <section className="bg-mustard">
        <div className={`${container} py-6 md:py-10`}>
          <Breadcrumbs
            label={d.common.breadcrumbLabel}
            items={[{ name: d.common.breadcrumbHome, href: pathFor(lang) }, { name: d.nav.menu }]}
          />
          <h1 className="mt-4 text-4xl sm:text-5xl">{d.menuPage.h1}</h1>
          <p className="mt-3 max-w-prose text-lg">{d.menuPage.intro}</p>
          <p className="mt-3">
            <TrackedLink
              href={PDF_MENU_URL}
              event="pdf_download"
              params={{ language: lang }}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
            >
              <Icon name="download" className="h-4 w-4" />
              {d.menuPage.pdf}
            </TrackedLink>
          </p>
        </div>
      </section>

      {/* Category tabs (anchors) */}
      <nav
        aria-label={d.menuPage.tabsLabel}
        className="sticky top-[var(--banner-h)] z-30 border-y-2 border-ink bg-cream"
      >
        <ul className={`${container} flex gap-1 overflow-x-auto`}>
          {CATEGORIES.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.anchor}`}
                className="inline-flex min-h-12 items-center px-3 text-sm font-bold hover:bg-mustard sm:text-base"
              >
                {d.menuPage.categories[c.id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-mustard pb-12">
        <div className={container}>
          {CATEGORIES.map((c) => (
            <section key={c.id} id={c.anchor} aria-labelledby={`${c.id}-h`} className="pt-10">
              <h2 id={`${c.id}-h`} className="text-3xl sm:text-4xl">
                {d.menuPage.categories[c.id]}
              </h2>
              <div className="mt-5 grid gap-5">
                {DISHES.filter((x) => x.category === c.id).map((dish) => (
                  <MenuDishCard key={dish.id} dish={dish} d={d} eager={dish.id === DISHES[0].id} />
                ))}
              </div>
            </section>
          ))}
          <p className="mt-10 max-w-prose rounded-sm border-2 border-ink p-4 text-sm">
            {d.menuPage.dietaryNote}
          </p>
        </div>
      </div>

      {/* Desktop floating Reserve (mobile has the sticky bottom bar) */}
      <div className="fixed bottom-6 end-6 z-40 hidden md:block">
        <TrackedLink
          href={bookingUrlFor()}
          event="reservation_click"
          params={{ branch: "any", language: lang }}
          className={`${btnPrimary} shadow-[4px_4px_0_var(--ink)]`}
        >
          <Icon name="calendar" />
          {d.menuPage.reserveSticky}
        </TrackedLink>
      </div>
    </PageShell>
  );
}
