import type { FaqItem } from "@/content/dict";

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/25 border-y border-ink/25">
      {items.map((it) => (
        <details key={it.q} className="group py-1">
          <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 py-2 text-lg font-semibold">
            {it.q}
            <span
              aria-hidden="true"
              className="text-2xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-4 pe-8 text-base">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
