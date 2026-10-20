import Link from "next/link";
import Icon from "./Icon";

export interface Crumb {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-1">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-8 items-center underline underline-offset-4">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold">{c.name}</span>
            )}
            {i < items.length - 1 && <Icon name="arrow" className="h-3.5 w-3.5 opacity-60" mirror />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
