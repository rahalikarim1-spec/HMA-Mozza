import { bookingHref } from "@/lib/booking";
import Link from "next/link";
import type { Dict } from "@/content/dict";
import type { BranchSlug, Lang, Route } from "@/content/types";
import { } from "@/config/site";
import { pathFor } from "@/lib/routes";
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";
import TrackedLink from "./TrackedLink";

export default function Header({
  lang,
  route,
  d,
  branch,
}: {
  lang: Lang;
  route: Route;
  d: Dict;
  branch?: BranchSlug;
}) {
  const link = "inline-flex min-h-11 items-center px-3 text-sm font-semibold uppercase tracking-wide hover:underline underline-offset-4";
  return (
    <header className="bg-mustard">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 px-4 sm:px-6 md:flex-nowrap">
        <Link href={pathFor(lang)} className="py-1">
          <Logo className="h-11 w-auto md:h-14" />
        </Link>
        <div className="order-2 md:order-3">
          <LangSwitcher lang={lang} route={route} d={d} />
        </div>
        <nav
          aria-label={d.nav.label}
          className="order-3 flex w-full items-center border-t border-ink/20 [&>*:first-child]:ps-0 md:order-2 md:w-auto md:flex-1 md:justify-center md:border-0 md:[&>*:first-child]:ps-3"
        >
          <Link href={pathFor(lang, "menu")} className={link}>
            {d.nav.menu}
          </Link>
          <Link href={pathFor(lang, "locations")} className={link}>
            {d.nav.locations}
          </Link>
          <TrackedLink
            href={bookingHref(lang, branch)}
            event="reservation_click"
            params={{ branch: branch ?? "any", language: lang }}
            className={link}
          >
            {d.nav.reserve}
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}
