import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { menusUi, MENU_IDS, type MenuId } from "@/content/menus-ui";
import type { Lang } from "@/content/types";
import { BRANCHES } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, menuLd, organizationLd } from "@/lib/jsonld";
import { categoryName, describe, getMenu, itemCount, priceText } from "@/lib/menus";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { btnPrimary, container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedLink from "@/components/TrackedLink";
import MenuViewTracker from "@/components/MenuViewTracker";
import MenuExplorer, { type ExplorerCategory } from "@/components/MenuExplorer";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import { bookingHref } from "@/lib/booking";

export function menuHubMetadata(lang: Lang): Metadata {
  return buildMetadata(lang, "menu", menusUi[lang].hub);
}
export function menuMetadata(lang: Lang, id: MenuId): Metadata {
  const m = menusUi[lang].menus[id];
  return buildMetadata(lang, `menu/${id}`, { title: m.title, description: m.description });
}

export function MenuHubPage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const ui = menusUi[lang];
  return (
    <PageShell lang={lang} route="menu">
      <JsonLd data={organizationLd()} />
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
          <h1 className="mt-4 text-4xl sm:text-5xl">{ui.hub.h1}</h1>
          <p className="mt-3 max-w-prose text-lg">{ui.hub.intro}</p>
        </div>
      </section>
      <section className="bg-cream py-10">
        <div className={`${container} grid gap-6 sm:grid-cols-2`}>
          {MENU_IDS.map((id) => {
            const m = ui.menus[id];
            return (
              <article key={id} className="flex flex-col rounded-sm border-2 border-ink bg-white p-6">
                <h2 className="text-3xl">{m.name}</h2>
                {m.hours && <p className="mt-1 text-sm font-bold text-tomato">{m.hours}</p>}
                <p className="mt-3">{m.blurb}</p>
                <p className="mt-2 text-sm opacity-80">{itemCount(id)} · {ui.ui.pricesNote}</p>
                {id === "afternoon-tea" && <p className="mt-1 text-sm font-semibold">{ui.ui.atChidlomOnly}</p>}
                <Link
                  href={pathFor(lang, `menu/${id}`)}
                  className="mt-5 inline-flex min-h-12 items-center gap-2 self-start font-bold text-tomato underline underline-offset-4"
                >
                  {ui.hub.open}: {m.name}
                  <Icon name="arrow" className="h-4 w-4" mirror />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

export function MenuDetailPage({ lang, id }: { lang: Lang; id: MenuId }) {
  const d = getDict(lang);
  const ui = menusUi[lang];
  const m = ui.menus[id];
  const data = getMenu(id);
  const categories: ExplorerCategory[] = data.categories.map((c) => ({
    id: c.id,
    name: categoryName(c.id, lang),
    items: c.items.map((it) => {
      const desc = describe(it, lang);
      return {
        id: it.id,
        name: it.name,
        description: desc,
        priceText: priceText(it, lang),
        tags: it.tags.map((t) => ({
          key: t,
          tone: t,
          label: t === "vegetarian-on-request" ? ui.ui.tags.vegetarianOnRequest : ui.ui.tags[t],
        })),
        haystack: `${it.name} ${desc ?? ""} ${it.description ?? ""}`.toLowerCase(),
      };
    }),
  }));

  return (
    <PageShell lang={lang} route={`menu/${id}`}>
      <MenuViewTracker lang={lang} />
      <JsonLd data={organizationLd()} />
      <JsonLd data={menuLd(lang, id)} />
      <JsonLd
        data={breadcrumbLd([
          { name: d.common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: d.nav.menu, url: absoluteUrl(lang, "menu") },
          { name: m.name, url: absoluteUrl(lang, `menu/${id}`) },
        ])}
      />
      <section className="bg-mustard">
        <div className={`${container} py-6 md:py-10`}>
          <Breadcrumbs
            label={d.common.breadcrumbLabel}
            items={[
              { name: d.common.breadcrumbHome, href: pathFor(lang) },
              { name: d.nav.menu, href: pathFor(lang, "menu") },
              { name: m.name },
            ]}
          />
          <h1 className="mt-4 text-4xl sm:text-5xl">{m.h1}</h1>
          <p className="mt-3 max-w-prose text-lg">{m.blurb}</p>
          {m.hours && <p className="mt-1 font-bold">{m.hours}</p>}
          {id === "afternoon-tea" && <p className="mt-1 font-semibold">{ui.ui.atChidlomOnly}</p>}
          <p className="mt-3 text-sm font-semibold">{ui.ui.pricesNote}</p>
          <p className="mt-1 text-sm">{ui.ui.serviceNote}</p>
          <p className="mt-3">
            <TrackedLink
              href={`/menus/${id}.pdf`}
              external
              event="pdf_download"
              params={{ language: lang }}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4"
            >
              <Icon name="download" className="h-4 w-4" />
              {ui.ui.pdf}
            </TrackedLink>
          </p>
        </div>
      </section>

      <div className="bg-mustard pb-12">
        <div className={container}>
          <MenuExplorer
            categories={categories}
            labels={{
              search: ui.ui.search,
              searchPlaceholder: ui.ui.searchPlaceholder,
              filters: ui.ui.filters,
              vegetarian: ui.ui.vegetarian,
              pork: ui.ui.pork,
              alcohol: ui.ui.alcohol,
              clear: ui.ui.clear,
              none: ui.ui.none,
              jump: ui.ui.jump,
              resultsTemplate: ui.ui.results(1111, 2222).replace("1111", "{n}").replace("2222", "{t}"),
              demoPrice: ui.ui.pricesNote,
            }}
          />
          <p className="mt-10 max-w-prose rounded-sm border-2 border-ink p-4 text-sm">{ui.ui.dietNote}</p>
          <nav aria-label={ui.ui.otherMenus} className="mt-8">
            <h2 className="text-2xl">{ui.ui.otherMenus}</h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {MENU_IDS.filter((x) => x !== id).map((x) => (
                <li key={x}>
                  <Link href={pathFor(lang, `menu/${x}`)} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-cream px-4 font-semibold hover:bg-white">
                    {ui.menus[x].name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={pathFor(lang, "locations")} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-cream px-4 font-semibold hover:bg-white">
                  {ui.ui.branchesTitle} ({BRANCHES.length})
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="fixed bottom-6 end-6 z-40 hidden md:block">
        <TrackedLink
          href={bookingHref(lang)}
          event="reservation_click"
          params={{ branch: "any", language: lang }}
          className={`${btnPrimary} shadow-[4px_4px_0_var(--ink)]`}
        >
          <Icon name="calendar" />
          {ui.ui.reserve}
        </TrackedLink>
      </div>
    </PageShell>
  );
}
