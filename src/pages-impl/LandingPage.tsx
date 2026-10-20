import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { landingText, landingUi, LANDING_SLUGS, type LandingData, type LandingId } from "@/content/landing";
import { menusUi } from "@/content/menus-ui";
import type { Lang } from "@/content/types";
import { BRANCHES } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, faqLd, organizationLd } from "@/lib/jsonld";
import { categoryName, describe, getMenu, itemsInCategories, priceText, type MenuItemData } from "@/lib/menus";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { bookingHref } from "@/lib/booking";
import { btnPrimary, container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedLink from "@/components/TrackedLink";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";
import FaqList from "@/components/Faq";

const route = (id: LandingId) => LANDING_SLUGS[id];

export function landingMetadata(lang: Lang, id: LandingId): Metadata {
  const t = landingText[lang][id];
  return buildMetadata(lang, route(id), { title: t.title, description: t.description });
}

/** Menu content for each landing page, straight from src/data/menus/*.json */
function pick(id: LandingId): { item: MenuItemData; category: string }[] {
  if (id === "pizza") return itemsInCategories("food", ["pizza"]).map(({ item, category }) => ({ item, category: category.id }));
  if (id === "pasta") return itemsInCategories("food", ["pasta-and-risotto"]).map(({ item, category }) => ({ item, category: category.id }));
  const shareIds = ["italian-board", "mozza-s-board", "truffle-board", "pasticceria-assortita"];
  const food = getMenu("food");
  const out: { item: MenuItemData; category: string }[] = [];
  for (const c of food.categories) for (const it of c.items) if (shareIds.includes(it.id)) out.push({ item: it, category: c.id });
  const ap = getMenu("aperitivo").categories[0].items[0]; // Aperitivo Board
  out.push({ item: ap, category: "aperitivo-board" });
  return out;
}

function dataFor(id: LandingId, rows: { item: MenuItemData }[]): LandingData {
  const prices = rows.flatMap((r) => (r.item.sizes ? r.item.sizes.map((s) => s.price) : r.item.price !== null ? [r.item.price] : []));
  return {
    names: {
      vegetarian: rows.filter((r) => r.item.tags.includes("vegetarian")).map((r) => r.item.name),
      pork: rows.filter((r) => r.item.tags.includes("pork")).map((r) => r.item.name),
      priceMin: Math.min(...prices),
      priceMax: Math.max(...prices),
      count: rows.length,
      branches: BRANCHES.map((b) => b.name),
    },
  };
}

export function LandingPage({ lang, id }: { lang: Lang; id: LandingId }) {
  const d = getDict(lang);
  const t = landingText[lang][id];
  const u = landingUi[lang];
  const mu = menusUi[lang];
  const rows = pick(id);
  const faq = t.faq(dataFor(id, rows));
  const otherIds = (Object.keys(LANDING_SLUGS) as LandingId[]).filter((x) => x !== id);

  return (
    <PageShell lang={lang} route={route(id)}>
      <JsonLd data={organizationLd()} />
      <JsonLd data={faqLd(faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: d.common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: t.breadcrumb, url: absoluteUrl(lang, route(id)) },
        ])}
      />
      <section className="bg-mustard">
        <div className={`${container} py-6 md:py-10`}>
          <Breadcrumbs label={d.common.breadcrumbLabel} items={[{ name: d.common.breadcrumbHome, href: pathFor(lang) }, { name: t.breadcrumb }]} />
          <h1 className="mt-4 text-4xl sm:text-5xl">{t.h1}</h1>
          <div className="mt-4 max-w-prose space-y-3 text-lg">
            {t.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink href={bookingHref(lang)} event="reservation_click" params={{ branch: "any", language: lang }} className={btnPrimary} dataReserve>
              <Icon name="calendar" />
              {d.hero.cta.reserve}
            </TrackedLink>
            <Link href={pathFor(lang, "menu/food")} className="inline-flex min-h-12 items-center rounded-sm border-2 border-ink bg-cream px-5 font-semibold hover:bg-white">
              {u.menuCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-10" aria-labelledby="list-h">
        <div className={container}>
          <h2 id="list-h" className="text-3xl">{t.listTitle}</h2>
          <p className="mt-2 text-sm font-semibold">{mu.ui.pricesNote} · {mu.ui.serviceNote}</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {rows.map(({ item, category }) => (
              <li key={item.id} className="rounded-sm border-2 border-ink bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-xl">
                    <Link href={`${pathFor(lang, category === "aperitivo-board" ? "menu/aperitivo" : "menu/food")}#${item.id}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="max-w-[48%] text-end text-sm font-bold" dir="ltr">{priceText(item, lang)}</p>
                </div>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-tomato">{categoryName(category, lang)}</p>
                {describe(item, lang) && <p className="mt-1 text-sm">{describe(item, lang)}</p>}
                {item.tags.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className={`rounded-sm px-2 py-1 text-xs font-bold ${tag === "pork" ? "bg-tomato text-cream" : tag === "alcohol" ? "bg-ink text-cream" : tag === "vegetarian" ? "bg-leaf text-cream" : "border border-ink"}`}>
                        {tag === "vegetarian-on-request" ? mu.ui.tags.vegetarianOnRequest : mu.ui.tags[tag]}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {t.extra && (
        <section className="bg-mustard py-10" aria-labelledby="extra-h">
          <div className={`${container} max-w-3xl`}>
            <h2 id="extra-h" className="text-3xl">{t.extraTitle}</h2>
            <div className="mt-4 space-y-3 text-lg">
              {t.extra.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-mustard py-10" aria-labelledby="br-h">
        <div className={container}>
          <h2 id="br-h" className="text-3xl">{u.branchesTitle}</h2>
          <p className="mt-2">{u.branchesIntro}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((b) => (
              <li key={b.slug}>
                <Link href={pathFor(lang, `locations/${b.slug}`)} className="flex min-h-14 items-center justify-between rounded-sm border-2 border-ink bg-cream px-4 font-semibold hover:bg-white">
                  {b.name}
                  <Icon name="arrow" className="h-4 w-4" mirror />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-10" aria-labelledby="faq-h">
        <div className={`${container} max-w-3xl`}>
          <h2 id="faq-h" className="text-3xl">{u.faqTitle}</h2>
          <div className="mt-5">
            <FaqList items={faq} />
          </div>
          <div className="mt-8 rounded-sm border-2 border-ink bg-white p-5">
            <h2 className="text-2xl">{u.reserveTitle}</h2>
            <p className="mt-2">{u.reserveText}</p>
            <div className="mt-4">
              <TrackedLink href={bookingHref(lang)} event="reservation_click" params={{ branch: "any", language: lang }} className={btnPrimary} dataReserve>
                <Icon name="calendar" />
                {d.hero.cta.reserve}
              </TrackedLink>
            </div>
          </div>
          <nav aria-label={u.related} className="mt-8">
            <h2 className="text-2xl">{u.related}</h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {otherIds.map((o) => (
                <li key={o}>
                  <Link href={pathFor(lang, route(o))} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-mustard px-4 font-semibold hover:bg-white">
                    {landingText[lang][o].breadcrumb}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={pathFor(lang, "menu")} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-mustard px-4 font-semibold hover:bg-white">
                  {d.nav.menu}
                </Link>
              </li>
              <li>
                <Link href={pathFor(lang, "locations")} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-mustard px-4 font-semibold hover:bg-white">
                  {d.nav.locations}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}

