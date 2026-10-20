"use client";

import { useEffect, useRef, useState } from "react";
import Calculator from "./Calculator";
import type { Block, Section, StrategyDocData } from "./types";

const card = "rounded-sm border-2 border-ink bg-white p-4";
const srcCls = "mt-2 text-xs text-ink/75";

function Source({ text }: { text?: string }) {
  return text ? <p className={srcCls}>{text}</p> : null;
}

function BlockView({ b, doc }: { b: Block; doc: StrategyDocData }) {
  const ui = doc.ui;
  switch (b.t) {
    case "p":
      return <p className="mt-4 max-w-prose text-lg">{b.text}</p>;
    case "h3":
      return <h3 className="mt-8 text-2xl">{b.text}</h3>;
    case "list":
      return (
        <ul className="mt-4 max-w-prose list-disc space-y-2 ps-6 text-lg">
          {b.items.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      );
    case "cards":
      return (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {b.items.map((c, i) => (
            <div key={i} className={card}>
              <h4 className="text-xl">{c.title}</h4>
              <p className="mt-2">{c.text}</p>
              <Source text={c.source} />
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="mt-5">
          <div className="overflow-x-auto rounded-sm border-2 border-ink bg-white">
            <table className="w-full min-w-[34rem] text-start text-sm">
              <thead>
                <tr className="bg-ink text-cream">
                  {b.head.map((h, i) => <th key={i} scope="col" className="px-3 py-2 text-start font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i} className="border-t border-ink/20 align-top">
                    {r.map((c, j) => <td key={j} className="whitespace-pre-line px-3 py-2">{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Source text={b.source} />
        </div>
      );
    case "bands":
      return (
        <div className="mt-5 rounded-sm border-2 border-ink bg-white p-3">
          <p className="font-bold">{b.title}</p>
          <p className="text-xs">{ui.bandHint}</p>
          <div className="mt-3 overflow-x-auto" dir="ltr">
            <div className="min-w-[30rem]">
              <div className="grid grid-cols-[minmax(10rem,14rem)_repeat(4,1fr)] gap-1 text-center text-[11px] font-bold">
                <span />
                {ui.bands.map((l) => <span key={l}>{l}</span>)}
              </div>
              {b.rows.map((r, i) => (
                <div key={i} className="mt-1 grid grid-cols-[minmax(10rem,14rem)_repeat(4,1fr)] items-center gap-1">
                  <span className="truncate text-sm" title={r.label}>{r.label}</span>
                  {[1, 2, 3, 4].map((band) => (
                    <span key={band} className={`h-4 rounded-sm ${r.bands.includes(band) ? "bg-tomato" : "bg-ink/10"}`} aria-hidden="true" />
                  ))}
                  <span className="sr-only">{r.note}</span>
                </div>
              ))}
            </div>
          </div>
          <Source text={b.source} />
        </div>
      );
    case "callout":
      return (
        <aside className="mt-5 rounded-sm border-s-8 border-tomato bg-cream p-4">
          {b.title && <p className="font-bold">{b.title}</p>}
          <p className="text-lg">{b.text}</p>
        </aside>
      );
    case "details":
      return (
        <details className="tech mt-6 rounded-sm border-2 border-dashed border-ink bg-white/60 p-3">
          <summary className="cursor-pointer font-bold">{b.summary}</summary>
          <div className="mt-2">{b.blocks.map((x, i) => <BlockView key={i} b={x} doc={doc} />)}</div>
        </details>
      );
    case "findings":
      return (
        <ol className="mt-5 grid gap-4 md:grid-cols-2">
          {b.items.map((f) => (
            <li key={f.n} className={card}>
              <p className="flex items-center justify-between gap-2 text-xs font-bold">
                <span>#{f.n}</span>
                <span className="rounded-sm bg-mustard px-2 py-0.5">{f.effort}</span>
              </p>
              <h4 className="mt-1 text-lg">{f.title}</h4>
              <p className="mt-2 text-sm"><strong>→ </strong>{f.impact}</p>
              <p className="mt-1 text-sm"><strong>✓ </strong>{f.fix}</p>
            </li>
          ))}
        </ol>
      );
    case "calc":
      return <div className="mt-5"><Calculator ui={ui.calc} exampleLabel={ui.example} lang={doc.lang} /></div>;
    case "accordion":
      return (
        <div className="mt-5 divide-y divide-ink/25 rounded-sm border-2 border-ink bg-white">
          {b.items.map((it, i) => (
            <details key={i} className="group p-3">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-bold">
                {it.q}<span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2">{it.a}</p>
              <p className="mt-2 text-sm"><strong>{b.labels.evidence}: </strong>{it.evidence}</p>
              <p className="mt-1 text-sm"><strong>{b.labels.test}: </strong>{it.test}</p>
            </details>
          ))}
        </div>
      );
    case "diagram":
      return (
        <ol className="mt-5 flex flex-wrap items-stretch gap-2">
          {b.nodes.map((n, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="rounded-sm border-2 border-ink bg-white px-3 py-2 text-sm font-semibold">{n}</span>
              {i < b.nodes.length - 1 && <span aria-hidden="true" className="text-xl text-tomato">→</span>}
            </li>
          ))}
        </ol>
      );
    case "timeline":
      return (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {b.items.map((t, i) => (
            <div key={i} className={card}>
              <h4 className="text-2xl text-tomato">{t.label}</h4>
              <ul className="mt-2 list-disc space-y-1 ps-5 text-sm">{t.items.map((x, j) => <li key={j}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      );
    case "source":
      return <Source text={b.text} />;
    case "cta":
      return (
        <p className="mt-5">
          <span aria-disabled="true" className="inline-flex min-h-12 items-center rounded-sm bg-tomato px-6 font-semibold text-cream opacity-90">{b.label}</span>
          <span className="ms-3 text-xs">{b.note}</span>
        </p>
      );
  }
}

function SectionView({ s, doc }: { s: Section; doc: StrategyDocData }) {
  const ui = doc.ui;
  // Business-impact summary first; blocks in the order authored (technical evidence is inside collapsible "details" blocks)
  return (
    <section id={`s${s.n}`} aria-labelledby={`h${s.n}`} className="scroll-mt-24 border-t-4 border-ink pt-8">
      <h2 id={`h${s.n}`} className="text-3xl sm:text-4xl">
        <span className="me-3 text-tomato">{s.n}</span>{s.title}
      </h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {([["found", ui.found], ["why", ui.why], ["propose", ui.propose]] as const).map(([k, label]) => (
          <div key={k} className="rounded-sm bg-white p-4 shadow-[3px_3px_0_var(--ink)]">
            <p className="text-xs font-bold uppercase tracking-wide text-tomato">{label}</p>
            <p className="mt-1">{s.summary[k]}</p>
          </div>
        ))}
      </div>
      {s.blocks.map((b, i) => <BlockView key={i} b={b} doc={doc} />)}
    </section>
  );
}

export default function StrategyDoc({ en, fr }: { en: StrategyDocData; fr: StrategyDocData }) {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const doc = lang === "fr" ? fr : en;
  const [active, setActive] = useState(1);
  const tocRef = useRef<HTMLDetailsElement>(null);

  // Print: open every collapsible so the PDF contains the technical detail
  useEffect(() => {
    const open = () => document.querySelectorAll<HTMLDetailsElement>(".strategy-doc details").forEach((d) => { d.dataset.was = d.open ? "1" : "0"; d.open = true; });
    const restore = () => document.querySelectorAll<HTMLDetailsElement>(".strategy-doc details").forEach((d) => { d.open = d.dataset.was === "1"; });
    window.addEventListener("beforeprint", open);
    window.addEventListener("afterprint", restore);
    return () => { window.removeEventListener("beforeprint", open); window.removeEventListener("afterprint", restore); };
  }, []);

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(`s${s.n}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(Number(vis.target.id.slice(1)));
    }, { rootMargin: "-20% 0px -70% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [doc]);

  const toc = (
    <ol className="space-y-1 text-sm">
      {doc.sections.map((s) => (
        <li key={s.id}>
          <a href={`#s${s.n}`} onClick={() => { if (tocRef.current) tocRef.current.open = false; }} aria-current={active === s.n ? "true" : undefined} className={`flex min-h-9 items-start gap-2 rounded-sm px-2 py-1 hover:bg-mustard ${active === s.n ? "bg-mustard font-bold" : ""}`}>
            <span className="w-6 shrink-0 text-tomato">{s.n}</span><span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="strategy-doc" lang={doc.lang}>
      <header className="bg-mustard print:bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-4xl sm:text-5xl">{doc.ui.title}</h1>
          <p className="mt-3 max-w-prose text-lg">{doc.ui.subtitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 print:hidden">
            <div role="group" aria-label={doc.ui.lang} className="inline-flex overflow-hidden rounded-sm border-2 border-ink">
              {(["en", "fr"] as const).map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={`min-h-11 min-w-14 px-4 text-sm font-bold ${lang === l ? "bg-ink text-cream" : "bg-cream"}`}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => window.print()} className="min-h-11 rounded-sm border-2 border-ink bg-cream px-4 text-sm font-bold hover:bg-white">{doc.ui.print}</button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[16rem_1fr]">
        <aside className="print:hidden">
          <details ref={tocRef} className="rounded-sm border-2 border-ink bg-cream p-3 lg:hidden">
            <summary className="cursor-pointer font-bold">{doc.ui.toc}</summary>
            <div className="mt-2">{toc}</div>
          </details>
          <nav aria-label={doc.ui.toc} className="sticky top-[calc(var(--banner-h)+1rem)] hidden max-h-[calc(100vh-6rem)] overflow-y-auto lg:block">
            <p className="mb-2 text-lg font-bold">{doc.ui.toc}</p>
            {toc}
          </nav>
        </aside>
        <div className="min-w-0 space-y-12">
          {doc.sections.map((s) => <SectionView key={s.id} s={s} doc={doc} />)}
          <p className="border-t-4 border-ink pt-4 text-xs">{doc.ui.footer}</p>
        </div>
      </div>
    </div>
  );
}
