import Link from "next/link";
import type { Dict } from "@/content/dict";
import { company } from "@/content/company";
import { landingText } from "@/content/landing";
import { menusUi, MENU_IDS } from "@/content/menus-ui";
import type { BranchSlug, Lang, Route } from "@/content/types";
import { BRANCHES } from "@/config/site";
import { bookingHref } from "@/lib/booking";
import { pathFor } from "@/lib/routes";
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";
import MainNav, { type NavItem } from "./MainNav";

const MENU_LABEL: Record<Lang, string> = { en: "Menu", th: "เมนู", ar: "القائمة" };
const CLOSE: Record<Lang, string> = { en: "Close", th: "ปิด", ar: "إغلاق" };

export default function Header({ lang, route, d, branch }: { lang: Lang; route: Route; d: Dict; branch?: BranchSlug }) {
  const items: NavItem[] = [
    { label: d.nav.menu, href: pathFor(lang, "menu"), children: MENU_IDS.map((m) => ({ label: menusUi[lang].menus[m].name, href: pathFor(lang, `menu/${m}`) })) },
    { label: d.nav.locations, href: pathFor(lang, "locations"), children: BRANCHES.map((b) => ({ label: b.name, href: pathFor(lang, `locations/${b.slug}`) })) },
    { label: landingText[lang].pizza.breadcrumb, href: pathFor(lang, "neapolitan-pizza-bangkok") },
    { label: landingText[lang].pasta.breadcrumb, href: pathFor(lang, "pasta-bangkok") },
    { label: landingText[lang].celebrations.breadcrumb, href: pathFor(lang, "celebrations") },
    { label: company[lang].links.about, href: pathFor(lang, "about") },
  ];
  return (
    <header className="bg-mustard">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-1 sm:px-6">
        <Link href={pathFor(lang)} className="shrink-0 py-1">
          <Logo className="h-11 w-auto md:h-14" />
        </Link>
        <MainNav
          items={items}
          reserve={{ label: d.nav.reserve, href: bookingHref(lang, branch), branch: branch ?? "any" }}
          lang={lang}
          navLabel={d.nav.label}
          menuButton={MENU_LABEL[lang]}
          closeLabel={CLOSE[lang]}
        />
        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <LangSwitcher lang={lang} route={route} d={d} />
        </div>
      </div>
    </header>
  );
}
