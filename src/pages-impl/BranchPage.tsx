import { bookingHref } from "@/lib/booking";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import type { BranchSlug, Lang } from "@/content/types";
import { BRANCHES, RATING, WEEKDAYS, directionsUrl, fullAddress, getBranch, shown } from "@/config/site";
import { BRANCH_SIGNATURE } from "@/config/signature";
import { menusUi } from "@/content/menus-ui";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, faqLd, organizationLd, restaurantLd } from "@/lib/jsonld";
import { hoursCell, statusText } from "@/lib/format";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { btnLight, btnPrimary, container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedLink from "@/components/TrackedLink";
import BranchCard from "@/components/BranchCard";
import { SignatureCard } from "@/components/DishCard";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";

export function branchMetadata(lang: Lang, slug: BranchSlug): Metadata {
  const t = getDict(lang).branches[slug];
  return buildMetadata(lang, `locations/${slug}`, { title: t.metaTitle, description: t.metaDescription });
}

export default function BranchPage({ lang, slug }: { lang: Lang; slug: BranchSlug }) {
  const d = getDict(lang);
  const mu = menusUi[lang];
  const b = getBranch(slug);
  const t = d.branches[slug];
  const params = { branch: slug, language: lang } as const;
  const hub = pathFor(lang, "locations");
  const status = statusText(b, d);
  const address = fullAddress(b) ?? (shown(b, "floor") ? `${b.floor}, ${t.mall}` : null);
  const hoursRows = WEEKDAYS.map((day) => ({ day, cell: hoursCell(b, day, d) }));
  const showHours = hoursRows.every((r) => r.cell !== null);
  const showTransit = !b.verify.transit && !!t.transit;
  const showLandmark = !b.verify.landmark && !!t.landmark;
  const hasGettingHere = showTransit || showLandmark;
  const showRating = slug === "central-park"; // the only rating in /context (Google Business Profile snapshot)
  const others = BRANCHES.filter((x) => x.slug !== slug);
  const pending = !address && !status;

  return (
    <PageShell lang={lang} route={`locations/${slug}`} branch={slug}>
      <JsonLd data={organizationLd()} />
      <JsonLd data={restaurantLd(lang, b)} />
      <JsonLd data={faqLd(t.faq)} />
      <JsonLd
        data={breadcrumbLd([
          { name: d.common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: d.nav.locations, url: absoluteUrl(lang, "locations") },
          { name: b.name, url: absoluteUrl(lang, `locations/${slug}`) },
        ])}
      />

      {/* First mobile viewport: H1, rating (if known), status + hours (if confirmed), 3 buttons */}
      <section className="bg-mustard">
        <div className={`${container} grid items-center gap-6 py-4 md:grid-cols-2 md:gap-10 md:py-12`}>
          <div>
            <Breadcrumbs
              label={d.common.breadcrumbLabel}
              items={[
                { name: d.common.breadcrumbHome, href: pathFor(lang) },
                { name: d.nav.locations, href: hub },
                { name: b.name },
              ]}
            />
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{t.h1}</h1>
            <ul className="mt-3 space-y-1 text-base">
              {showRating && (
                <li className="flex items-center gap-2 font-semibold">
                  <Icon name="star" className="h-5 w-5 text-tomato" filled />
                  <span>
                    {RATING.value} ★ {d.common.ratingOn(RATING.source)}
                  </span>
                  <span className="text-xs font-normal opacity-75">({d.common.demoNote})</span>
                </li>
              )}
              {status && (
                <li className="flex items-center gap-2">
                  <Icon name="clock" className="h-5 w-5" />
                  <strong>{status}</strong>
                </li>
              )}
              {pending && <li>{d.branchPage.detailsPending}</li>}
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              <TrackedLink href={bookingHref(lang, slug)} event="reservation_click" params={params} className={`${btnPrimary} !px-2 sm:!px-5`} dataReserve>
                <Icon name="calendar" className="hidden h-5 w-5 sm:block" />
                {d.branchPage.reserve}
              </TrackedLink>
              <TrackedLink href={directionsUrl(b)} external event="directions_click" params={params} className={`${btnLight} !px-2 sm:!px-5`}>
                <Icon name="pin" className="hidden h-5 w-5 sm:block" />
                {d.branchPage.directions}
              </TrackedLink>
              <Link href={pathFor(lang, "menu")} className={`${btnLight} !px-2 sm:!px-5`}>
                <Icon name="menu" className="hidden h-5 w-5 sm:block" />
                {d.branchPage.menu}
              </Link>
            </div>
          </div>
          <Image
            src={b.image}
            alt={t.imageAlt}
            width={1200}
            height={900}
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-sm object-cover"
          />
        </div>
      </section>

      {/* Getting there (only confirmed facts) + address + static map placeholder */}
      <section className="bg-cream py-10" aria-labelledby="addr-h">
        <div className={`${container} grid gap-8 md:grid-cols-2`}>
          <div>
            <h2 id="addr-h" className="text-3xl">{d.branchPage.addressTitle}</h2>
            <address className="mt-3 text-lg not-italic">
              <strong>{b.name}</strong>
              {address && (
                <>
                  <br />
                  {address}
                </>
              )}
              <br />
              <span className="text-base">{t.district ? `${t.mall} · ${t.district}` : t.mall}</span>
            </address>
            <h3 className="mt-8 text-2xl">{d.branchPage.gettingHere}</h3>
            {hasGettingHere && (
              <dl className="mt-3 space-y-3">
                {showTransit && (
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wide">{d.branchPage.transitLabel}</dt>
                    <dd>{t.transit}</dd>
                  </div>
                )}
                {showLandmark && (
                  <div>
                    <dt className="text-sm font-bold uppercase tracking-wide">{d.branchPage.landmarkLabel}</dt>
                    <dd>{t.landmark}</dd>
                  </div>
                )}
              </dl>
            )}
            <p className="mt-3">
              <TrackedLink href={directionsUrl(b)} external event="directions_click" params={params} className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">
                <Icon name="pin" className="h-5 w-5" />
                {d.branchPage.directionsFallback}
              </TrackedLink>
            </p>
          </div>
          <figure>
            <Image
              src={b.mapImage}
              alt={d.branchPage.mapAlt}
              width={1200}
              height={600}
              loading="lazy"
              sizes="(min-width: 768px) 560px, 100vw"
              className="aspect-[2/1] w-full rounded-sm border-2 border-ink object-cover"
            />
            <figcaption className="mt-2 text-xs opacity-80">{d.branchPage.mapCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-mustard py-10" aria-labelledby="about-h">
        <div className={`${container} max-w-3xl`}>
          <h2 id="about-h" className="text-3xl">{d.branchPage.aboutTitle}</h2>
          <div className="mt-4 space-y-4 text-lg">
            {t.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-10" aria-labelledby="sig-h">
        <div className={container}>
          <h2 id="sig-h" className="text-3xl">{d.branchPage.signatureTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCH_SIGNATURE[slug].map((id) => (
              <SignatureCard key={id} id={id} lang={lang} />
            ))}
          </div>
          <p className="mt-6 text-sm">{mu.ui.pricesNote}</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {(["food", "brunch", "aperitivo", "afternoon-tea"] as const)
              .filter((m) => m !== "afternoon-tea" || slug === "central-chidlom")
              .map((m) => (
                <li key={m}>
                  <Link href={pathFor(lang, `menu/${m}`)} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-white px-4 font-semibold hover:bg-mustard">
                    {mu.menus[m].name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {showHours && (
        <section className="bg-mustard py-10" aria-labelledby="hours-h">
          <div className={`${container} max-w-3xl`}>
            <h2 id="hours-h" className="text-3xl">{d.branchPage.hoursTitle}</h2>
            <table className="mt-4 w-full border-2 border-ink bg-cream text-start">
              <thead>
                <tr className="bg-ink text-cream">
                  <th scope="col" className="px-4 py-2 text-start font-semibold">{d.branchPage.day}</th>
                  <th scope="col" className="px-4 py-2 text-start font-semibold">{d.branchPage.hoursCol}</th>
                </tr>
              </thead>
              <tbody>
                {hoursRows.map(({ day, cell }) => (
                  <tr key={day} className="border-t border-ink/25">
                    <th scope="row" className="px-4 py-3 text-start font-medium">{d.common.dayNames[day]}</th>
                    <td className="px-4 py-3">
                      <span dir={cell!.ltr ? "ltr" : undefined}>{cell!.text}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="bg-cream py-10" aria-labelledby="faq-h">
        <div className={`${container} max-w-3xl`}>
          <h2 id="faq-h" className="text-3xl">{d.branchPage.faqTitle}</h2>
          <div className="mt-5">
            <Faq items={t.faq} />
          </div>
        </div>
      </section>

      <section className="bg-mustard py-10" aria-labelledby="other-h">
        <div className={container}>
          <h2 id="other-h" className="text-3xl">{d.branchPage.otherTitle}</h2>
        </div>
        <ul tabIndex={0} aria-labelledby="other-h" className={`${container} mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4`}>
          {others.map((o) => (
            <li key={o.slug} className="w-72 shrink-0 snap-start">
              <BranchCard branch={o} d={d} lang={lang} />
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
