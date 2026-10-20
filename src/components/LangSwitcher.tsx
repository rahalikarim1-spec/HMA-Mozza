import type { Dict } from "@/content/dict";
import type { Lang, Route } from "@/content/types";
import { LANGS } from "@/content/types";
import { pathFor } from "@/lib/routes";
import TrackedLink from "./TrackedLink";

/** EN | ไทย | العربية - keeps the user on the SAME page in the other language. */
export default function LangSwitcher({ lang, route, d }: { lang: Lang; route: Route; d: Dict }) {
  return (
    <nav aria-label={d.lang.label} className="flex items-center">
      <ul className="flex items-center divide-x divide-ink/40 rtl:divide-x-reverse">
        {LANGS.map((l) => {
          const current = l === lang;
          return (
            <li key={l} className="px-0.5">
              <TrackedLink
                href={pathFor(l, route)}
                lang={l}
                prefetch={false}
                event={current ? undefined : "language_switch"}
                params={current ? undefined : { from: lang, to: l }}
                ariaCurrent={current ? "page" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm ${
                  current ? "font-bold underline decoration-2 underline-offset-4" : "font-medium hover:underline"
                }`}
              >
                {d.lang.names[l]}
              </TrackedLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
