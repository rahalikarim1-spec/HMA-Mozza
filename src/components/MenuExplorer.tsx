"use client";

import { useMemo, useState } from "react";

export interface ExplorerItem {
  id: string;
  name: string;
  description: string | null;
  priceText: string;
  tags: { key: string; label: string; tone: string }[];
  haystack: string;
}
export interface ExplorerCategory {
  id: string;
  name: string;
  items: ExplorerItem[];
}
export interface ExplorerLabels {
  search: string;
  searchPlaceholder: string;
  filters: string;
  vegetarian: string;
  pork: string;
  alcohol: string;
  clear: string;
  none: string;
  jump: string;
  resultsTemplate: string; // "Showing {n} of {t} items"
  demoPrice: string;
}

type Filter = "vegetarian" | "pork" | "alcohol";

const toneClass: Record<string, string> = {
  vegetarian: "bg-leaf text-cream",
  "vegetarian-on-request": "border border-leaf text-leaf",
  pork: "bg-tomato text-cream",
  alcohol: "bg-ink text-cream",
  spicy: "border border-tomato text-tomato",
};

/** Search + dietary filter + category anchors. All in memory, no network, no storage. */
export default function MenuExplorer({
  categories,
  labels,
}: {
  categories: ExplorerCategory[];
  labels: ExplorerLabels;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Filter[]>([]);
  const total = useMemo(() => categories.reduce((n, c) => n + c.items.length, 0), [categories]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter((it) => {
          if (needle && !it.haystack.includes(needle)) return false;
          if (active.length && !active.some((f) => it.tags.some((t) => t.key === f))) return false;
          return true;
        }),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, q, active]);
  const shown = filtered.reduce((n, c) => n + c.items.length, 0);

  const toggle = (f: Filter) => setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));
  const chip = (f: Filter, label: string) => (
    <button
      key={f}
      type="button"
      aria-pressed={active.includes(f)}
      onClick={() => toggle(f)}
      className={`min-h-11 rounded-sm border-2 border-ink px-3 text-sm font-semibold ${
        active.includes(f) ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="rounded-sm bg-cream p-4">
        <label htmlFor="menu-search" className="block text-sm font-bold">
          {labels.search}
        </label>
        <input
          id="menu-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.searchPlaceholder}
          autoComplete="off"
          className="mt-1 min-h-12 w-full rounded-sm border-2 border-ink bg-white px-3 text-base"
        />
        <div role="group" aria-label={labels.filters} className="mt-3 flex flex-wrap gap-2">
          {chip("vegetarian", labels.vegetarian)}
          {chip("pork", labels.pork)}
          {chip("alcohol", labels.alcohol)}
          {(active.length > 0 || q) && (
            <button
              type="button"
              onClick={() => {
                setActive([]);
                setQ("");
              }}
              className="min-h-11 px-3 text-sm font-semibold underline underline-offset-4"
            >
              {labels.clear}
            </button>
          )}
        </div>
        <p role="status" aria-live="polite" className="mt-3 text-sm">
          {labels.resultsTemplate.replace("{n}", String(shown)).replace("{t}", String(total))}
        </p>
      </div>

      <nav
        aria-label={labels.jump}
        className="sticky top-[var(--banner-h)] z-30 -mx-4 mt-4 border-y-2 border-ink bg-cream sm:-mx-6"
      >
        <ul className="flex gap-1 overflow-x-auto px-4 sm:px-6">
          {filtered.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#cat-${c.id}`} className="inline-flex min-h-12 items-center px-3 text-sm font-bold hover:bg-mustard">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {filtered.length === 0 && <p className="mt-8 rounded-sm bg-cream p-4">{labels.none}</p>}

      {filtered.map((c) => (
        <section key={c.id} id={`cat-${c.id}`} aria-labelledby={`h-${c.id}`} className="pt-10">
          <h2 id={`h-${c.id}`} className="text-3xl">
            {c.name}
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {c.items.map((it) => (
              <li key={it.id} id={it.id} className="rounded-sm bg-cream p-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-xl">{it.name}</h3>
                  <p className="max-w-[48%] text-end text-sm font-bold" dir="ltr">
                    {it.priceText}
                  </p>
                </div>
                {it.description && <p className="mt-1 text-sm">{it.description}</p>}
                {it.tags.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <li key={t.key} className={`rounded-sm px-2 py-1 text-xs font-bold ${toneClass[t.tone] ?? ""}`}>
                        {t.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
