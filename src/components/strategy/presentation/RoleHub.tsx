import Link from "next/link";
import Icon from "@/components/Icon";
import { roleCards, roleHub } from "../../../../strategy/presentations.mjs";

/** Additive hub on /strategy/: one card per role. Only roles that exist link anywhere; the others are labelled "Coming soon". */
export default function RoleHub() {
  return (
    <section aria-labelledby="role-hub-h" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 print:hidden">
      <h2 id="role-hub-h" className="text-2xl sm:text-3xl">{roleHub.title}</h2>
      <p className="mt-1 max-w-prose">{roleHub.lead}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {roleCards.map((c) => (
          <li key={c.role}>
            {c.href && !c.soon ? (
              <Link
                href={c.href}
                className="flex h-full flex-col rounded-sm border-2 border-ink bg-white p-4 shadow-[3px_3px_0_var(--ink)] hover:bg-ink hover:text-cream"
              >
                <span className="font-display text-xl">{c.title}</span>
                <span className="mt-1 text-sm">{c.who}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
                  {roleHub.open}
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <div className="flex h-full flex-col rounded-sm border-2 border-dashed border-ink/70 bg-white/60 p-4 text-ink">
                <span className="font-display text-xl">{c.title}</span>
                <span className="mt-1 text-sm">{c.who}</span>
                <span className="mt-3 inline-flex w-fit rounded-sm border-2 border-ink px-2 py-0.5 text-xs font-bold uppercase tracking-wide">{roleHub.soon}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
