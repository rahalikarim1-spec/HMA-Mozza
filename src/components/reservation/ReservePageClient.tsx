"use client";

import { useEffect, useState } from "react";
import { BRANCHES } from "@/config/site";
import type { BranchSlug, Lang } from "@/content/types";
import ReservationFlow from "./ReservationFlow";

/** /reserve/ page body: reads ?branch= once on mount (client only; nothing stored). */
export default function ReservePageClient({ lang }: { lang: Lang }) {
  const [init, setInit] = useState<{ branch: BranchSlug | null } | null>(null);
  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("branch");
    setInit({ branch: BRANCHES.find((x) => x.slug === b)?.slug ?? null });
  }, []);
  if (!init) return <p className="py-6" aria-hidden="true">…</p>;
  return <ReservationFlow lang={lang} initialBranch={init.branch} entryPage="/reserve" />;
}
