import Link from "next/link";
import type { Dict } from "@/content/dict";
import type { Lang } from "@/content/types";
import { BRANCHES, FACEBOOK_URL, INSTAGRAM_URL, LINE_URL } from "@/config/site";
import { pathFor } from "@/lib/routes";
import { container } from "@/lib/ui";
import Logo from "./Logo";

export default function Footer({ lang, d }: { lang: Lang; d: Dict }) {
  const a = "inline-flex min-h-11 items-center hover:underline underline-offset-4";
  return (
    <footer className="bg-ink text-cream">
      <div className={`${container} grid gap-8 py-10 md:grid-cols-3`}>
        <div>
          <Logo className="h-16 w-auto" />
          <p className="mt-4 text-sm">{d.footer.part}</p>
        </div>
        <nav aria-label={d.footer.branches}>
          <h2 className="text-xl text-mustard">{d.footer.branches}</h2>
          <ul className="mt-2">
            {BRANCHES.map((b) => (
              <li key={b.slug}>
                <Link className={a} href={pathFor(lang, `locations/${b.slug}`)}>
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xl text-mustard">{d.footer.follow}</h2>
          <ul className="mt-2">
            <li>
              <a className={a} href={LINE_URL}>{d.footer.line}</a>
            </li>
            <li>
              <a className={a} href={INSTAGRAM_URL}>{d.footer.instagram}</a>
            </li>
            <li>
              <a className={a} href={FACEBOOK_URL}>{d.footer.facebook}</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-cream/20 px-4 py-4 text-center text-xs text-cream/80">
        {d.footer.disclaimer}
      </p>
    </footer>
  );
}
