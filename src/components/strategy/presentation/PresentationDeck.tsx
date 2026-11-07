"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { track } from "@/lib/track";
import { btnPrimary } from "@/lib/ui";
import type { DeckData, DeckLink, DeckSlide, EvidenceTag, Visual } from "./types";

const card = "rounded-sm border-2 border-ink bg-white p-4 text-ink shadow-[3px_3px_0_var(--ink)]";

/** Evidence chips: shape + colour + text, never colour alone. */
const TAG_CLS: Record<EvidenceTag, string> = {
  OBS: "bg-ink text-cream border-ink",
  PUB: "bg-leaf text-cream border-leaf",
  "3P": "bg-mustard text-ink border-ink",
  HYP: "bg-white text-ink border-ink border-dashed",
  DATA: "bg-tomato text-cream border-tomato",
};

function Chip({ tag }: { tag: EvidenceTag }) {
  return (
    <span className={`inline-flex items-center rounded-sm border-2 px-1.5 py-0.5 text-[11px] font-bold leading-none tracking-wide ${TAG_CLS[tag]}`}>
      {tag}
    </span>
  );
}

function ExtLink({ l, slide, role, className, children }: { l: DeckLink; slide: string; role: string; className?: string; children?: React.ReactNode }) {
  return (
    <a
      href={l.href}
      {...(l.external === false ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={className}
      onClick={() => {
        if (l.href.startsWith("https://wa.me")) track("whatsapp_contact_click", { location: `${role}-deck-${slide}` });
        else track("external_link_click", { destination: l.href, section: `${role}-deck-${slide}` });
      }}
    >
      {children ?? l.label}
    </a>
  );
}

function VisualIcon({ name }: { name: "star" | "heart" | "search" | "pin" }) {
  if (name === "star" || name === "pin") return <Icon name={name} className="h-7 w-7" />;
  const d = name === "heart" ? "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" : "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5";
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

const BAR: Record<"base" | "prep" | "test", string> = {
  base: "bg-ink",
  prep: "bg-leaf",
  test: "bg-tomato",
};

function VisualView({ v, slide, role }: { v: Visual; slide: string; role: string }) {
  switch (v.kind) {
    case "tiles":
      return (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {v.items.map((i) => (
            <li key={i.label} className="flex items-center gap-3 rounded-sm border-2 border-cream bg-ink px-4 py-4 text-cream">
              <span className="text-mustard"><VisualIcon name={i.icon} /></span>
              <span className="font-semibold">{i.label}</span>
            </li>
          ))}
        </ul>
      );
    case "branches":
      return (
        <div className="mt-8">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {v.items.map((b) => (
              <li key={b} className={card}>
                <p className="flex items-center gap-2 font-display text-xl"><Icon name="pin" className="h-5 w-5 text-tomato" />{b}</p>
                <ul className="mt-3 space-y-2">
                  {v.placeholders.map((p) => (
                    <li key={p} className="rounded-sm border-2 border-dashed border-ink/60 px-2 py-2 text-sm text-ink/80">{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">{v.note}</p>
        </div>
      );
    case "pools":
      return (
        <div className="mt-8">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {v.pools.map((p, i) => (
              <li key={p.title} className={`rounded-sm border-2 border-ink p-5 ${i === 0 ? "bg-white" : "bg-mustard"}`}>
                <p className="font-display text-2xl">{p.title}</p>
                <p className="mt-1">{p.sub}</p>
              </li>
            ))}
          </ul>
          <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Guest journey">
            {v.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-sm border-2 border-ink bg-white px-3 py-1.5 text-sm font-semibold">{s}</span>
                {i < v.steps.length - 1 ? <Icon name="arrow" className="h-4 w-4" /> : null}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm">{v.caption}</p>
        </div>
      );
    case "levers":
      return (
        <div className="mt-8">
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {v.items.map((l, i) => (
              <li key={l.title} className={card}>
                <p className="text-sm font-bold uppercase tracking-wide text-tomato">{i + 1}</p>
                <p className="font-display text-3xl">{l.title}</p>
                <p className="mt-1 text-lg">{l.outcome}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-sm border-2 border-ink bg-ink px-4 py-2 text-center font-semibold text-cream">{v.base}</p>
        </div>
      );
    case "board":
      return (
        <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {v.cols.map((c) => (
            <li key={c.title} className={card}>
              <p className="flex items-center gap-2 font-display text-xl"><Chip tag={c.tag} />{c.title}</p>
              <ul className="mt-3 list-disc space-y-2 ps-5">
                {c.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      );
    case "timeline":
      return (
        <div className="mt-8">
          <ol className="space-y-4">
            {v.rows.map((r) => (
              <li key={r.label}>
                <p className="text-sm font-semibold">{r.label}</p>
                <div className="mt-1 grid h-5 rounded-sm bg-white/70 ring-2 ring-ink" style={{ gridTemplateColumns: `repeat(${v.weeks}, minmax(0, 1fr))` }} aria-hidden="true">
                  <div className={`rounded-sm ${BAR[r.tone]}`} style={{ gridColumn: `${r.from} / ${r.to + 1}` }} />
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-2 grid text-[10px] font-semibold text-ink/80 sm:text-xs" style={{ gridTemplateColumns: `repeat(${v.weeks}, minmax(0, 1fr))` }} aria-hidden="true">
            {Array.from({ length: v.weeks }, (_, i) => <span key={i} className="text-center">{i + 1}</span>)}
          </div>
          <p className="mt-1 text-xs">Week</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 font-display text-xl">
              <span className="inline-block h-4 w-4 rotate-45 bg-ink" aria-hidden="true" />
              {v.decision.label}
            </span>
            <ul className="flex flex-wrap gap-2">
              {v.decision.outcomes.map((o) => <li key={o} className="rounded-sm border-2 border-ink bg-white px-3 py-1 font-semibold">{o}</li>)}
            </ul>
          </div>
          <p className="mt-4 rounded-sm border-2 border-dashed border-ink/70 px-3 py-2 text-sm">{v.note}</p>
        </div>
      );
    case "equation":
      return (
        <div className="mt-8">
          <ul className="flex flex-wrap items-center gap-2" aria-label="Incremental contribution">
            {v.terms.map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                {t.op ? <span className="text-2xl font-bold" aria-label="minus">{t.op}</span> : null}
                <span className="rounded-sm border-2 border-ink bg-white px-3 py-2 font-semibold">{t.label}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-2xl font-bold" aria-label="equals">=</span>
              <span className="rounded-sm border-2 border-ink bg-ink px-3 py-2 font-semibold text-cream">{v.result}</span>
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide">{v.ladderTitle}</p>
          <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
            {v.ladder.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-sm border-2 border-ink/60 px-3 py-1.5 text-sm text-ink/85">{s}</span>
                {i < v.ladder.length - 1 ? <Icon name="arrow" className="h-4 w-4 text-ink/70" /> : null}
              </li>
            ))}
          </ol>
        </div>
      );
    case "bands": {
      const cls: Record<string, string> = { brand: "bg-ink", nonbrand: "bg-tomato", thai: "bg-mustard ring-2 ring-inset ring-ink" };
      return (
        <div className="mt-8">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs" aria-label="Legend">
            {Object.entries(v.groups).map(([k, label]) => (
              <li key={k} className="flex items-center gap-1.5"><span className={`inline-block h-3 w-5 ${cls[k]}`} aria-hidden="true" />{label}</li>
            ))}
          </ul>
          <ul className="mt-3 space-y-3">
            {v.rows.map((r) => (
              <li key={r.label}>
                <p className="text-sm font-semibold">{r.label}</p>
                <div className="relative mt-1 h-5 rounded-sm bg-white/80 ring-1 ring-ink/40" role="img" aria-label={`${r.label}: ${v.scale[r.band - 1]} monthly searches, ${v.groups[r.group]}`}>
                  <div className={`absolute inset-y-0 rounded-sm ${cls[r.group]}`} style={{ insetInlineStart: `${((r.band - 1) / v.scale.length) * 100}%`, width: `${100 / v.scale.length}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-1 grid text-center text-[11px] font-semibold" style={{ gridTemplateColumns: `repeat(${v.scale.length}, minmax(0, 1fr))` }} aria-hidden="true">
            {v.scale.map((x) => <span key={x} className="border-s border-ink/30">{x}</span>)}
          </div>
          <p className="mt-2 text-sm">{v.caption}</p>
        </div>
      );
    }
    case "table":
      return (
        <div className="mt-8">
          {v.caption ? <p className="mb-2 text-sm">{v.caption}</p> : null}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-start text-sm">
              <thead><tr>{v.head.map((h) => <th key={h} scope="col" className="border-2 border-ink bg-ink p-2.5 text-start font-semibold text-cream">{h}</th>)}</tr></thead>
              <tbody>{v.rows.map((r, i) => <tr key={i}>{r.map((c, k) => k === 0 ? <th key={k} scope="row" className="border-2 border-ink bg-mustard p-2.5 text-start font-semibold">{c}</th> : <td key={k} className="border-2 border-ink bg-white p-2.5 align-top">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <ul className="space-y-2 md:hidden">
            {v.rows.map((r, i) => (
              <li key={i} className={card}>
                <p className="font-display text-xl">{r[0]}</p>
                <dl className="mt-2 space-y-1.5 text-sm">{r.slice(1).map((c, k) => <div key={k}><dt className="font-bold">{v.head[k + 1]}</dt><dd>{c}</dd></div>)}</dl>
              </li>
            ))}
          </ul>
        </div>
      );
    case "steps":
      return (
        <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {v.items.map((it, i) => (
            <li key={it.title} className={card}>
              <p className="flex items-baseline gap-2"><span className="font-display text-3xl leading-none text-tomato">{i + 1}</span><span className="font-display text-xl">{it.title}</span></p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-tomato">{v.labels.observed}</p>
              <p className="text-sm">{it.observed}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-tomato">{v.labels.test}</p>
              <p className="text-sm">{it.test}</p>
            </li>
          ))}
        </ol>
      );
    case "cta":
      return (
        <div className="mt-8">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2" aria-label="Next steps">
            {v.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className="rounded-sm border-2 border-cream px-3 py-2 font-semibold">{s}</span>
                {i < v.steps.length - 1 ? <Icon name="arrow" className="h-4 w-4 text-mustard" /> : null}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ExtLink l={v.whatsapp} slide={slide} role={role} className={btnPrimary}>
              <Icon name="whatsapp" />
              {v.whatsapp.label}
            </ExtLink>
            {v.links.map((l) => (
              <ExtLink key={l.href} l={l} slide={slide} role={role} className="inline-flex min-h-12 items-center rounded-sm border-2 border-cream px-4 font-semibold hover:bg-cream hover:text-ink" />
            ))}
          </div>
        </div>
      );
  }
}

const TONE: Record<DeckSlide["tone"], string> = {
  dark: "bg-ink text-cream",
  plain: "bg-mustard text-ink",
  light: "bg-cream text-ink",
};

function SlideView({
  s, i, total, deck, revealed, setRef,
}: {
  s: DeckSlide; i: number; total: number; deck: DeckData; revealed: boolean; setRef: (el: HTMLElement | null) => void;
}) {
  const ui = deck.ui;
  const Heading = i === 0 ? "h1" : "h2";
  const dark = s.tone === "dark";
  const used = Array.from(new Set(s.evidence.map((e) => e.tag)));
  return (
    <section
      id={`slide-${i + 1}`}
      ref={setRef}
      aria-labelledby={`slide-${i + 1}-h`}
      className={`${TONE[s.tone]} border-t-4 border-ink md:flex md:min-h-[calc(100svh-var(--banner-h)-3.5rem)] md:items-center`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14 motion-safe:transition-all motion-safe:duration-500 ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <p className={`text-sm font-bold uppercase tracking-wide ${dark ? "text-mustard" : "text-tomato"}`}>
          <span className="tabular-nums">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span> · {s.kicker}
        </p>
        <Heading id={`slide-${i + 1}-h`} tabIndex={-1} className="mt-3 max-w-4xl text-4xl focus:outline-none sm:text-5xl lg:text-6xl">
          {s.headline}
        </Heading>
        <p className="mt-6 max-w-3xl text-xl leading-snug md:text-2xl">{s.copy}</p>
        <VisualView v={s.visual} slide={s.id} role={deck.role} />
        <details className={`mt-8 rounded-sm border-2 ${dark ? "border-cream/70" : "border-ink"} p-3`}>
          <summary className="cursor-pointer font-semibold">{ui.evidenceToggle}</summary>
          <div className={`mt-3 space-y-4 rounded-sm p-4 ${dark ? "bg-cream text-ink" : "bg-white text-ink"}`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{ui.questionLabel}</p>
              <p className="mt-1">{s.question}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{ui.evidenceLabel}</p>
              <ul className="mt-2 space-y-2">
                {s.evidence.map((e, k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Chip tag={e.tag} />
                    <span>{e.text}{e.conf ? <span className="ms-1 font-semibold">Confidence: {e.conf}.</span> : null}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-tomato">{ui.notesLabel}</p>
              <p className="mt-1 max-w-prose">{s.notes}</p>
            </div>
          </div>
        </details>
        <p className={`mt-4 flex flex-wrap items-center gap-2 text-xs ${dark ? "text-cream/90" : "text-ink/85"}`}>
          {used.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5"><Chip tag={t} /><span>{deck.tags[t]}</span></span>
          ))}
        </p>
        {i === 0 ? <p className={`mt-2 hidden text-xs sm:block ${dark ? "text-cream/90" : "text-ink/85"}`}>{ui.keyboardHint}</p> : null}
      </div>
    </section>
  );
}

function AppendixView({ deck }: { deck: DeckData }) {
  return (
    <section id="appendix" aria-labelledby="appendix-h" className="border-t-4 border-ink bg-cream text-ink">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h2 id="appendix-h" tabIndex={-1} className="text-3xl focus:outline-none sm:text-4xl">{deck.ui.appendixTitle}</h2>
        <p className="mt-2 max-w-prose">{deck.ui.appendixLead}</p>
        <div className="mt-6 space-y-3">
          {deck.appendix.map((a) => (
            <details key={a.id} className="rounded-sm border-2 border-ink bg-white p-3">
              <summary className="cursor-pointer font-display text-xl">{a.title}</summary>
              <div className="mt-3">
                {a.lead ? <p className="max-w-prose">{a.lead}</p> : null}
                {a.bullets ? (
                  <ul className="mt-3 max-w-prose list-disc space-y-2 ps-6">{a.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                ) : null}
                {a.table ? (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[34rem] border-collapse text-start text-sm">
                      <thead>
                        <tr>{a.table.head.map((h) => <th key={h} scope="col" className="border-2 border-ink bg-ink px-2 py-1.5 text-start font-semibold text-cream">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {a.table.rows.map((r, ri) => (
                          <tr key={ri}>{r.map((c, ci) => <td key={ci} className="border-2 border-ink px-2 py-1.5 align-top">{c}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {a.foot ? <p className="mt-3 max-w-prose font-semibold">{a.foot}</p> : null}
              </div>
            </details>
          ))}
        </div>
        <p className="mt-8 border-t-4 border-ink pt-4 text-xs">{deck.ui.footer}</p>
      </div>
    </section>
  );
}

/** Interactive, slide-style executive presentation. Natural vertical scrolling (no scroll snapping); ← / → move between slides. */
export default function PresentationDeck({ deck, backHref }: { deck: DeckData; backHref: string }) {
  const total = deck.slides.length;
  const ui = deck.ui;
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => deck.slides.map(() => true));
  const refs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const reduce = useRef(false);

  useEffect(() => { activeRef.current = active; }, [active]);

  // Active slide = the last slide whose top has passed ~35% of the viewport (scroll position, not observer deltas: robust for tall slides)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const anchor = window.innerHeight * 0.35;
      let idx = 0;
      refs.current.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= anchor) idx = i; });
      setActive(idx);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [deck]);

  // Gentle reveal (disabled for reduced motion; everything is visible without JS)
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    const els = refs.current.filter(Boolean) as HTMLElement[];
    setRevealed(deck.slides.map((_, i) => { const el = refs.current[i]; if (!el) return true; const r = el.getBoundingClientRect(); return r.top < window.innerHeight * 0.9 && r.bottom > 0; }));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Number((e.target as HTMLElement).id.replace("slide-", "")) - 1;
          setRevealed((r) => (r[idx] ? r : r.map((v, k) => (k === idx ? true : v))));
        }
      },
      { threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [deck]);

  const goTo = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(total - 1, i));
    const el = refs.current[idx];
    if (!el) return;
    const calm = reduce.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
    (el.querySelector("h1, h2") as HTMLElement | null)?.focus({ preventScroll: true });
    setActive(idx);
  }, [total]);

  // Keyboard: ← / → only. Never intercepts scrolling keys, modifier combos, form fields, or widgets that use arrows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.closest('[role="slider"],[role="tablist"],[role="listbox"],[role="menu"],[role="spinbutton"]'))) return;
      e.preventDefault();
      goTo(activeRef.current + (e.key === "ArrowRight" ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  const pct = Math.round(((active + 1) / total) * 100);

  return (
    <div className="strategy-deck">
      <div className="sticky top-[var(--banner-h)] z-30 border-b-2 border-ink bg-cream text-ink">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link href={backHref} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
            <Icon name="arrow" className="h-4 w-4 -scale-x-100" />
            <span>{ui.back}</span>
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold">
              <span className="hidden truncate sm:inline">{deck.subtitle}</span>
              <span className="ms-auto shrink-0 tabular-nums" aria-live="polite">{ui.slide} {active + 1} {ui.of} {total}</span>
            </div>
            <div
              role="progressbar"
              aria-label={ui.progress}
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={active + 1}
              aria-valuetext={`${ui.slide} ${active + 1} ${ui.of} ${total}`}
              className="mt-1 h-2 rounded-sm border border-ink bg-white"
            >
              <div className="h-full bg-tomato motion-safe:transition-[width] motion-safe:duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <nav aria-label={ui.slides} className="hidden items-center gap-1 lg:flex">
            {deck.slides.map((s, i) => (
              <a
                key={s.id}
                href={`#slide-${i + 1}`}
                aria-label={`${ui.slide} ${i + 1}: ${s.headline}`}
                aria-current={i === active ? "step" : undefined}
                title={s.headline}
                onClick={(e) => { e.preventDefault(); goTo(i); }}
                className={`flex h-8 w-8 items-center justify-center rounded-sm border-2 border-ink text-xs font-bold ${i === active ? "bg-ink text-cream" : "bg-white text-ink hover:bg-mustard"}`}
              >
                {i + 1}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 gap-1">
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={ui.prev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-ink bg-white hover:bg-mustard disabled:opacity-40">
              <Icon name="arrow" className="h-4 w-4 -scale-x-100" />
            </button>
            <button type="button" onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label={ui.next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-ink bg-white hover:bg-mustard disabled:opacity-40">
              <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {deck.slides.map((s, i) => (
        <SlideView key={s.id} s={s} i={i} total={total} deck={deck} revealed={revealed[i] ?? true} setRef={(el) => { refs.current[i] = el; }} />
      ))}
      <AppendixView deck={deck} />
    </div>
  );
}
