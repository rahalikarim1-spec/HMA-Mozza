"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BRANCHES } from "@/config/site";
import { reservationUi } from "@/content/reservation-ui";
import type { BranchSlug, Lang } from "@/content/types";

const Flow = dynamic(() => import("./ReservationFlow"), { ssr: false, loading: () => <p className="p-4">…</p> });

const isBranch = (v: string | null): v is BranchSlug => !!v && BRANCHES.some((b) => b.slug === v);

/**
 * Opens the reservation flow in a modal from every Reserve button (links marked data-reserve).
 * Without JS (or on /reserve/ itself) the link simply navigates to /reserve/.
 */
export default function ReservationLauncher({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<{ branch: BranchSlug | null; entry: string } | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const t = reservationUi[lang];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[data-reserve]") as HTMLAnchorElement | null;
      if (!a || /\/reserve\/?$/.test(window.location.pathname)) return;
      e.preventDefault(); // capture phase: stops Next <Link> from navigating, tracking onClick still runs
      const b = new URL(a.href, window.location.origin).searchParams.get("branch");
      setOpen({ branch: isBranch(b) ? b : null, entry: window.location.pathname });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const dlg = ref.current;
    if (!open || !dlg) return;
    if (!dlg.open) dlg.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  const close = () => {
    ref.current?.close();
    setOpen(null);
  };
  return (
    <dialog
      ref={ref}
      aria-labelledby="rm-title"
      onCancel={(e) => { e.preventDefault(); close(); }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-cream p-0 text-ink md:m-auto md:h-auto md:max-h-[92vh] md:max-w-2xl md:rounded-sm md:border-4 md:border-ink"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-ink bg-mustard px-4 py-2">
        <p id="rm-title" className="text-xl font-bold">{t.title}</p>
        <button type="button" onClick={close} className="min-h-11 min-w-11 rounded-sm border-2 border-ink bg-cream px-3 font-bold" aria-label={t.close}>
          ✕
        </button>
      </div>
      <div className="p-4">
        <Flow lang={lang} initialBranch={open.branch} entryPage={open.entry} onClose={close} />
      </div>
    </dialog>
  );
}
