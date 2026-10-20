import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/content";
import { company } from "@/content/company";
import type { Lang } from "@/content/types";
import { BRANCHES, DELIVERY_URL, FACEBOOK_URL, GROUP_LINKS, HMA_URL, INSTAGRAM_URL, LINE_URL, MOZZA_WEBSITE, directionsUrl, fullAddress, getBranch, shown, whatsappUrl } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { blogPostingLd, breadcrumbLd, organizationLd } from "@/lib/jsonld";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { btnLight, btnPrimary, container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedLink from "@/components/TrackedLink";
import JsonLd from "@/components/JsonLd";
import Icon from "@/components/Icon";

type PageId = "about" | "hma-privilege" | "delivery" | "contact" | "blog";

function Hero({ lang, crumb, h1, children }: { lang: Lang; crumb: { name: string; href?: string }[]; h1: string; children?: React.ReactNode }) {
  const d = getDict(lang);
  return (
    <section className="bg-mustard">
      <div className={`${container} py-6 md:py-10`}>
        <Breadcrumbs label={d.common.breadcrumbLabel} items={[{ name: d.common.breadcrumbHome, href: pathFor(lang) }, ...crumb]} />
        <h1 className="mt-4 text-4xl sm:text-5xl">{h1}</h1>
        {children}
      </div>
    </section>
  );
}

const crumbLd = (lang: Lang, name: string, route: string) =>
  breadcrumbLd([
    { name: getDict(lang).common.breadcrumbHome, url: absoluteUrl(lang) },
    { name, url: absoluteUrl(lang, route) },
  ]);

export function companyMetadata(lang: Lang, id: PageId): Metadata {
  const c = company[lang];
  const m = id === "about" ? c.about : id === "hma-privilege" ? c.privilege : id === "delivery" ? c.delivery : id === "contact" ? c.contact : c.blog;
  return buildMetadata(lang, id, { title: m.title, description: m.description });
}

const quick = "inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4";

export function AboutPage({ lang }: { lang: Lang }) {
  const c = company[lang];
  const d = getDict(lang);
  return (
    <PageShell lang={lang} route="about">
      <JsonLd data={organizationLd()} />
      <JsonLd data={crumbLd(lang, c.links.about, "about")} />
      <Hero lang={lang} crumb={[{ name: c.links.about }]} h1={c.about.h1}>
        <div className="mt-4 max-w-prose space-y-4 text-lg">
          {c.about.body.map((p, i) => <p key={i}>{p}</p>)}
          <p className="text-sm opacity-80">{c.about.pending}</p>
        </div>
      </Hero>
      <section className="bg-cream py-10">
        <div className={`${container} max-w-3xl`}>
          <h2 className="text-3xl">{c.about.brandsTitle}</h2>
          <p className="mt-3">
            <a href={HMA_URL} className={quick} rel="noopener noreferrer" target="_blank">{c.links.hmaSite}<Icon name="external" className="h-4 w-4" /></a>
          </p>
          <h2 className="mt-8 text-3xl">{c.about.locationsTitle}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {BRANCHES.map((b) => (
              <li key={b.slug}><Link href={pathFor(lang, `locations/${b.slug}`)} className="flex min-h-12 items-center rounded-sm border-2 border-ink bg-white px-4 font-semibold hover:bg-mustard">{b.name}</Link></li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap gap-4">
            <Link href={pathFor(lang, "menu")} className={quick}>{d.nav.menu}</Link>
            <Link href={pathFor(lang, "locations")} className={quick}>{d.nav.locations}</Link>
            <Link href={pathFor(lang, "reserve")} className={quick}>{d.nav.reserve}</Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export function PrivilegePage({ lang }: { lang: Lang }) {
  const c = company[lang];
  return (
    <PageShell lang={lang} route="hma-privilege">
      <JsonLd data={organizationLd()} />
      <JsonLd data={crumbLd(lang, c.links.privilege, "hma-privilege")} />
      <Hero lang={lang} crumb={[{ name: c.links.privilege }]} h1={c.privilege.h1}>
        <div className="mt-4 max-w-prose space-y-4 text-lg">
          {c.privilege.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <p className="mt-6">
          <a href={HMA_URL} target="_blank" rel="noopener noreferrer" className={btnLight}>{c.privilege.link}<Icon name="external" className="h-4 w-4" /></a>
        </p>
      </Hero>
    </PageShell>
  );
}

export function DeliveryPage({ lang }: { lang: Lang }) {
  const c = company[lang];
  return (
    <PageShell lang={lang} route="delivery">
      <JsonLd data={organizationLd()} />
      <JsonLd data={crumbLd(lang, c.links.delivery, "delivery")} />
      <Hero lang={lang} crumb={[{ name: c.links.delivery }]} h1={c.delivery.h1}>
        <p className="mt-4 max-w-prose text-lg">{c.delivery.intro}</p>
      </Hero>
      <section className="bg-cream py-10">
        <div className={container}>
          <h2 className="text-3xl">{c.delivery.branchesTitle}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((b) => (
              <li key={b.slug} className="rounded-sm border-2 border-ink bg-white p-4">
                <h3 className="text-xl">{b.name}</h3>
                <a href={`${DELIVERY_URL}-${b.slug}`} className={`${btnPrimary} mt-3`}>{c.delivery.order} ({c.delivery.demoLink})</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}

export function ContactPage({ lang }: { lang: Lang }) {
  const c = company[lang];
  const d = getDict(lang);
  const wa = d.whatsappMessage("Mozza Bangkok");
  return (
    <PageShell lang={lang} route="contact">
      <JsonLd data={organizationLd()} />
      <JsonLd data={crumbLd(lang, c.links.contact, "contact")} />
      <Hero lang={lang} crumb={[{ name: c.links.contact }]} h1={c.contact.h1}>
        <p className="mt-4 max-w-prose text-lg">{c.contact.intro}</p>
      </Hero>
      <section className="bg-cream py-10">
        <div className={`${container} grid gap-8 md:grid-cols-2`}>
          <div>
            <h2 className="text-3xl">{c.contact.messageTitle}</h2>
            <p className="mt-3 flex flex-wrap gap-3">
              <TrackedLink href={whatsappUrl(wa)} external event="whatsapp_click" params={{ branch: "any", language: lang }} className={btnLight}><Icon name="whatsapp" />{d.sticky.whatsapp}</TrackedLink>
              <TrackedLink href={LINE_URL} event="line_click" params={{ branch: "any", language: lang }} className={btnLight}><Icon name="line" />{d.sticky.line}</TrackedLink>
            </p>
            <p className="mt-3 text-sm">{c.contact.pending}</p>
            <h2 className="mt-8 text-3xl">{c.contact.onlineTitle}</h2>
            <ul className="mt-3 space-y-1">
              <li><a className={quick} href={MOZZA_WEBSITE} target="_blank" rel="noopener noreferrer">{c.contact.website}: mozza-bangkok.com</a></li>
              <li><a className={quick} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram: @mozzabkk</a></li>
              <li><a className={quick} href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook: mozzabkk</a></li>
            </ul>
            <h2 className="mt-8 text-3xl">{c.contact.groupTitle}</h2>
            <p className="mt-2"><a className={quick} href={HMA_URL} target="_blank" rel="noopener noreferrer">{c.links.hmaSite}</a></p>
          </div>
          <div>
            <h2 className="text-3xl">{c.contact.visitTitle}</h2>
            <ul className="mt-3 space-y-4">
              {BRANCHES.map((b) => {
                const a = fullAddress(getBranch(b.slug)) ?? (shown(b, "floor") ? `${b.floor}, ${getDict(lang).branches[b.slug].mall}` : null);
                return (
                  <li key={b.slug}>
                    <h3 className="text-xl"><Link href={pathFor(lang, `locations/${b.slug}`)} className="hover:underline">{b.name}</Link></h3>
                    {a && <p className="text-sm">{a}</p>}
                    <a className={quick} href={directionsUrl(b)} target="_blank" rel="noopener noreferrer">{d.common.directions}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function BlogIndexPage({ lang }: { lang: Lang }) {
  const c = company[lang];
  return (
    <PageShell lang={lang} route="blog">
      <JsonLd data={organizationLd()} />
      <JsonLd data={crumbLd(lang, c.links.blog, "blog")} />
      <Hero lang={lang} crumb={[{ name: c.links.blog }]} h1={c.blog.h1}>
        <p className="mt-4 max-w-prose text-lg">{c.blog.intro}</p>
      </Hero>
      <section className="bg-cream py-10">
        <div className={`${container} grid gap-6 md:grid-cols-2`}>
          {c.posts.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-sm border-2 border-ink bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{c.blog.demoExcerpt}</p>
              <h2 className="mt-1 text-2xl"><Link href={pathFor(lang, `blog/${p.slug}`)} className="hover:underline">{p.title}</Link></h2>
              <p className="mt-2">{p.excerpt}</p>
              <Link href={pathFor(lang, `blog/${p.slug}`)} className={`${quick} mt-4 self-start`}>{c.blog.read}<Icon name="arrow" className="h-4 w-4" mirror /></Link>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function blogPostMetadata(lang: Lang, slug: string): Metadata {
  const p = company[lang].posts.find((x) => x.slug === slug)!;
  return buildMetadata(lang, `blog/${slug}`, { title: p.metaTitle, description: p.description });
}

export function BlogPostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const c = company[lang];
  const p = c.posts.find((x) => x.slug === slug)!;
  return (
    <PageShell lang={lang} route={`blog/${slug}`}>
      <JsonLd data={organizationLd()} />
      <JsonLd data={blogPostingLd(lang, slug, p.title, p.description)} />
      <JsonLd
        data={breadcrumbLd([
          { name: getDict(lang).common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: c.links.blog, url: absoluteUrl(lang, "blog") },
          { name: p.title, url: absoluteUrl(lang, `blog/${slug}`) },
        ])}
      />
      <Hero lang={lang} crumb={[{ name: c.links.blog, href: pathFor(lang, "blog") }, { name: p.title }]} h1={p.title}>
        <p className="mt-3 inline-block rounded-sm bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wide text-cream">{c.blog.demoExcerpt}</p>
      </Hero>
      <section className="bg-cream py-10">
        <div className={`${container} max-w-3xl`}>
          <div className="space-y-4 text-lg">{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
          <h2 className="mt-10 text-2xl">{c.blog.related}</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            <li><Link href={pathFor(lang, `menu/${p.menu}`)} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-mustard px-4 font-semibold hover:bg-white">{c.blog.viewMenu}: {p.menuLabel}</Link></li>
            {p.branches.map((s) => (
              <li key={s}><Link href={pathFor(lang, `locations/${s}`)} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-mustard px-4 font-semibold hover:bg-white">{c.blog.atBranches}: {getBranch(s as never).name}</Link></li>
            ))}
            <li><Link href={pathFor(lang, "blog")} className="inline-flex min-h-11 items-center rounded-sm border-2 border-ink bg-white px-4 font-semibold hover:bg-mustard">{c.blog.back}</Link></li>
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
