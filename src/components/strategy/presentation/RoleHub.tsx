import Link from "next/link";
import Icon from "@/components/Icon";
import { roleCards, roleHub } from "../../../../strategy/presentations.mjs";

/** Additive hub on /strategy/: exactly the two approved experiences. Other role routes exist but are archived: noindex, not linked. */
export default function RoleHub() {
  return (
    <section aria-labelledby="role-hub-h" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 print:hidden">
      <h2 id="role-hub-h" className="text-2xl sm:text-3xl">{roleHub.title}</h2>
      <p className="mt-1 max-w-prose">{roleHub.lead}</p>
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {roleCards.map((c) => (
          <li key={c.role}>
            <Link
              href={c.href}
              className={`flex h-full min-h-32 flex-col rounded-sm border-2 border-ink p-5 ${c.dark ? "bg-ink text-cream shadow-[3px_3px_0_var(--tomato)] hover:bg-black" : "bg-white text-ink shadow-[3px_3px_0_var(--ink)] hover:bg-ink hover:text-cream"}`}
            >
              <span className="font-display text-2xl leading-snug">{c.title}</span>
              <span className="mt-2 flex-1 text-sm">{c.who}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
                {roleHub.open}
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
