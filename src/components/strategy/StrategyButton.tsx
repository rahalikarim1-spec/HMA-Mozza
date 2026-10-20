"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getDict } from "@/content";
import { STRATEGY_FR, STRATEGY_SESSION_KEY } from "@/content/strategy-ui";
import type { Lang } from "@/content/types";
import { track } from "@/lib/track";
import PasscodeForm from "./PasscodeForm";

/** Sticky "Growth strategy" button on every page + passcode dialog. Hidden on /strategy itself. */
export default function StrategyButton({ lang }: { lang: Lang }) {
  const t = getDict(lang).strategy;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/strategy")) return null;

  function click() {
    track("strategy_button_click", { language: lang });
    let stored = false;
    try {
      stored = !!sessionStorage.getItem(STRATEGY_SESSION_KEY);
    } catch {
      /* ignore */
    }
    if (stored) window.location.assign("/strategy/");
    else setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={click}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] end-3 z-40 flex max-w-[min(15rem,72vw)] items-center gap-2 rounded-sm border-2 border-cream bg-ink px-3 py-2 text-start text-[11px] font-semibold leading-tight text-cream shadow-[3px_3px_0_var(--tomato)] hover:bg-black md:bottom-6 md:end-6 md:max-w-[19rem] md:text-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-mustard" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
        </svg>
        <span>{t.button}</span>
      </button>
      <dialog
        ref={ref}
        aria-labelledby="sg-title"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        className="fixed inset-0 m-auto w-[min(26rem,92vw)] rounded-sm border-4 border-ink bg-cream p-0 text-ink"
      >
        <div className="border-b-2 border-ink bg-mustard px-4 py-3">
          <p id="sg-title" className="text-xl font-bold">{t.dialogTitle}</p>
          <p className="text-xs" lang="fr">{STRATEGY_FR.dialogTitle}</p>
        </div>
        <div className="p-4">
          {open && (
            <PasscodeForm
              language={lang}
              labels={t}
              onCancel={() => setOpen(false)}
              onSuccess={() => window.location.assign("/strategy/")}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
