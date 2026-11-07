import type { Category, Confidence, Priority, Tag } from "./types";

export const card = "rounded-sm border-2 border-ink bg-white p-4 text-ink shadow-[3px_3px_0_var(--ink)]";
export const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** Evidence chips: shape + colour + text, never colour alone. */
const TAG_CLS: Record<Tag, string> = {
  OBS: "bg-ink text-cream border-ink",
  PUB: "bg-leaf text-cream border-leaf",
  "3P": "bg-mustard text-ink border-ink",
  HYP: "bg-white text-ink border-ink border-dashed",
  DATA: "bg-tomato text-cream border-tomato",
};
export function Chip({ tag }: { tag: Tag }) {
  return <span className={`inline-flex items-center rounded-sm border-2 px-1.5 py-0.5 text-[11px] font-bold leading-none tracking-wide ${TAG_CLS[tag]}`}>{tag}</span>;
}

const PRIORITY_CLS: Record<Priority, string> = {
  Critical: "bg-tomato text-cream border-tomato",
  High: "bg-ink text-cream border-ink",
  Medium: "bg-white text-ink border-ink",
  Monitor: "bg-transparent text-ink border-ink border-dashed",
};
const PRIORITY_MARK: Record<Priority, string> = { Critical: "!", High: "▲", Medium: "●", Monitor: "○" };
export function PriorityBadge({ p }: { p: Priority }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border-2 px-2 py-0.5 text-xs font-bold ${PRIORITY_CLS[p]}`}>
      <span aria-hidden="true">{PRIORITY_MARK[p]}</span>
      {p}
    </span>
  );
}

const CONF_CLS: Record<Confidence, string> = {
  Confirmed: "bg-leaf text-cream border-leaf",
  Moderate: "bg-cream text-ink border-ink",
  Low: "bg-transparent text-ink border-ink border-dashed",
  Hypothesis: "bg-transparent text-ink border-ink border-dotted italic",
};
const CONF_MARK: Record<Confidence, string> = { Confirmed: "✓", Moderate: "≈", Low: "…", Hypothesis: "?" };
export function ConfidenceBadge({ c }: { c: Confidence }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm border-2 px-2 py-0.5 text-xs font-bold ${CONF_CLS[c]}`}>
      <span aria-hidden="true">{CONF_MARK[c]}</span>
      {c}
    </span>
  );
}

const CAT_CLS: Record<Category, string> = {
  A: "bg-leaf text-cream border-leaf",
  B: "bg-mustard text-ink border-ink",
  C: "bg-white text-ink border-tomato",
};
export function CategoryBadge({ cat, label }: { cat: Category; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold">
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border-2 ${CAT_CLS[cat]}`} aria-hidden="true">{cat}</span>
      <span>{label ?? `Category ${cat}`}</span>
    </span>
  );
}

export function SectionHead({ id, kicker, title, lead, dark = false, onMustard = false }: { id: string; kicker: string; title: string; lead?: string; dark?: boolean; onMustard?: boolean }) {
  return (
    <header className="max-w-3xl">
      <p className={`text-sm font-bold uppercase tracking-wide ${dark ? "text-mustard" : onMustard ? "text-ink" : "text-tomato"}`}>{kicker}</p>
      <h2 id={`${id}-h`} className="mt-2 text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {lead ? <p className="mt-3 text-lg">{lead}</p> : null}
    </header>
  );
}
