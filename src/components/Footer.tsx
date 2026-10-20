import Link from "next/link";
import type { Dict } from "@/content/dict";
import { company } from "@/content/company";
import { menusUi, MENU_IDS } from "@/content/menus-ui";
import { landingText, LANDING_SLUGS, type LandingId } from "@/content/landing";
import type { Lang, Route } from "@/content/types";
import { BRANCHES, FACEBOOK_URL, GROUP_LINKS, HMA_URL, INSTAGRAM_URL, LINE_URL, MOZZA_WEBSITE } from "@/config/site";
import { pathFor } from "@/lib/routes";
import { container } from "@/lib/ui";
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";

export default function Footer({ lang, d, route }: { lang: Lang; d: Dict; route: Route }) {
  const c = company[lang];
  const a = "inline-flex min-h-11 items-center hover:underline underline-offset-4";
  const h = "text-xl text-mustard";
  return (
    <footer className="bg-ink text-cream">
      <div className={`${container} grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <Logo className="h-16 w-auto" />
          <p className="mt-4 text-sm">
            <a className="underline underline-offset-4 hover:text-mustard" href={HMA_URL} target="_blank" rel="noopener noreferrer">
              {c.footer.partOf}
            </a>
          </p>
          <div className="mt-4 rounded-sm bg-cream p-1 text-ink">
            <LangSwitcher lang={lang} route={route} d={d} />
          </div>
        </div>
        <nav aria-label={c.footer.branches}>
          <h2 className={h}>{c.footer.branches}</h2>
          <ul className="mt-2">
            {BRANCHES.map((b) => (
              <li key={b.slug}><Link className={a} href={pathFor(lang, `locations/${b.slug}`)}>{b.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={c.footer.menus}>
          <h2 className={h}>{c.footer.menus}</h2>
          <ul className="mt-2">
            {MENU_IDS.map((m) => (
              <li key={m}><Link className={a} href={pathFor(lang, `menu/${m}`)}>{menusUi[lang].menus[m].name}</Link></li>
            ))}
            {(Object.keys(LANDING_SLUGS) as LandingId[]).map((l) => (
              <li key={l}><Link className={a} href={pathFor(lang, LANDING_SLUGS[l])}>{landingText[lang][l].breadcrumb}</Link></li>
            ))}
            <li><Link className={a} href={pathFor(lang, "reserve")}>{d.nav.reserve}</Link></li>
          </ul>
        </nav>
        <nav aria-label={c.footer.company}>
          <h2 className={h}>{c.footer.company}</h2>
          <ul className="mt-2">
            <li><Link className={a} href={pathFor(lang, "about")}>{c.links.about}</Link></li>
            <li><Link className={a} href={pathFor(lang, "hma-privilege")}>{c.links.privilege}</Link></li>
            <li><Link className={a} href={pathFor(lang, "delivery")}>{c.links.delivery}</Link></li>
            <li><Link className={a} href={pathFor(lang, "contact")}>{c.links.contact}</Link></li>
            <li><Link className={a} href={pathFor(lang, "blog")}>{c.links.blog}</Link></li>
          </ul>
          <h2 className={`${h} mt-6`}>{c.footer.follow}</h2>
          <ul className="mt-2">
            <li><a className={a} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{d.footer.instagram}</a></li>
            <li><a className={a} href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">{d.footer.facebook}</a></li>
            <li><a className={a} href={LINE_URL}>{d.footer.line}</a></li>
            <li><a className={a} href={MOZZA_WEBSITE} target="_blank" rel="noopener noreferrer">mozza-bangkok.com</a></li>
          </ul>
        </nav>
      </div>
      <div className={`${container} border-t border-cream/20 py-5`}>
        <p className="text-sm">
          <span className="font-semibold text-mustard">{c.footer.otherHma}: </span>
          {GROUP_LINKS.map((g, i) => (
            <span key={g.url}>
              <a className="underline underline-offset-4 hover:text-mustard" href={g.url} target="_blank" rel="noopener noreferrer">{g.name}</a>
              {i < GROUP_LINKS.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
        <p className="mt-3 text-xs text-cream/80">
          {c.footer.copyDemo}
          <br />
          {d.footer.photos}
        </p>
      </div>
    </footer>
  );
}
