"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TrackedLink from "./TrackedLink";
import type { BranchSlug, Lang } from "@/content/types";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface Props {
  items: NavItem[];
  reserve: { label: string; href: string; branch: BranchSlug | "any" };
  lang: Lang;
  navLabel: string;
  menuButton: string;
  closeLabel: string;
}

const linkCls = "inline-flex min-h-11 items-center gap-1 px-3 text-sm font-semibold uppercase tracking-wide hover:underline underline-offset-4";

function Caret() {
  return (
    <svg viewBox="0 0 10 6" className="h-2 w-2.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

/** Desktop: disclosure dropdowns (click, Esc, outside-click). Below lg: accessible drawer built on <dialog>. */
export default function MainNav({ items, reserve, lang, navLabel, menuButton, closeLabel }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close menus and release the body scroll lock whenever the route changes.
  useEffect(() => {
    setDrawer(false);
    setOpenIdx(null);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIdx(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (drawer && !d.open) d.showModal();
    if (!drawer && d.open) d.close();
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const closeDrawer = () => {
    setDrawer(false);
    trigger.current?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* Desktop */}
      <nav ref={navRef} aria-label={navLabel} className="hidden flex-1 items-center justify-center lg:flex">
        <ul className="flex items-center">
          {items.map((it, i) =>
            it.children ? (
              <li key={it.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openIdx === i}
                  aria-controls={`dd-${i}`}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className={linkCls}
                >
                  {it.label}
                  <Caret />
                </button>
                {openIdx === i && (
                  <ul id={`dd-${i}`} className="absolute start-0 top-full z-50 mt-1 min-w-56 rounded-sm border-2 border-ink bg-cream py-1 shadow-[4px_4px_0_var(--ink)]">
                    <li>
                      <Link href={it.href} onClick={() => setOpenIdx(null)} className="flex min-h-11 items-center px-4 text-sm font-bold hover:bg-mustard">
                        {it.label}
                      </Link>
                    </li>
                    {it.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={() => setOpenIdx(null)} className="flex min-h-11 items-center px-4 text-sm hover:bg-mustard">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={it.label}>
                <Link href={it.href} className={linkCls}>
                  {it.label}
                </Link>
              </li>
            ),
          )}
          <li className="ms-2">
            <TrackedLink
              href={reserve.href}
              event="reservation_click"
              params={{ branch: reserve.branch, language: lang }}
              className="inline-flex min-h-11 items-center rounded-sm bg-tomato px-4 text-sm font-semibold uppercase tracking-wide text-cream hover:bg-[#8f1d17]"
              dataReserve
            >
              {reserve.label}
            </TrackedLink>
          </li>
        </ul>
      </nav>

      {/* Mobile / tablet drawer */}
      <button
        ref={trigger}
        type="button"
        onClick={() => setDrawer(true)}
        aria-haspopup="dialog"
        aria-expanded={drawer}
        className="inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-ink px-3 text-sm font-bold uppercase lg:hidden"
      >
        <svg viewBox="0 0 20 14" className="h-3.5 w-5" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1h18M1 7h18M1 13h18" />
        </svg>
        {menuButton}
      </button>
      <dialog
        ref={dlg}
        aria-label={navLabel}
        onCancel={(e) => {
          e.preventDefault();
          closeDrawer();
        }}
        className="fixed inset-y-0 end-0 start-auto m-0 h-full max-h-none w-[min(22rem,92vw)] max-w-none overflow-y-auto border-s-4 border-ink bg-cream p-0 text-ink lg:hidden"
      >
        <div className="sticky top-0 flex items-center justify-between border-b-2 border-ink bg-mustard px-4 py-2">
          <span className="text-lg font-bold">{navLabel}</span>
          <button type="button" onClick={closeDrawer} aria-label={closeLabel} className="min-h-11 min-w-11 rounded-sm border-2 border-ink bg-cream font-bold">
            ✕
          </button>
        </div>
        <ul className="p-2">
          {items.map((it) => (
            <li key={it.label} className="border-b border-ink/15 py-1">
              <Link href={it.href} onClick={() => setDrawer(false)} className="flex min-h-12 items-center px-2 text-lg font-bold">
                {it.label}
              </Link>
              {it.children && (
                <ul className="mb-1 ps-4">
                  {it.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={() => setDrawer(false)} className="flex min-h-11 items-center px-2">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="p-2">
            <TrackedLink
              href={reserve.href}
              event="reservation_click"
              params={{ branch: reserve.branch, language: lang }}
              className="flex min-h-12 items-center justify-center rounded-sm bg-tomato px-4 font-semibold text-cream"
              dataReserve
            >
              {reserve.label}
            </TrackedLink>
          </li>
        </ul>
      </dialog>
    </>
  );
}
