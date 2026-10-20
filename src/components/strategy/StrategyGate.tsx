"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDict } from "@/content";
import { STRATEGY_FR, STRATEGY_SESSION_KEY } from "@/content/strategy-ui";
import { decryptStrategy } from "@/lib/strategy-crypto";
import Logo from "@/components/Logo";
import PasscodeForm from "./PasscodeForm";
import StrategyDoc from "./StrategyDoc";
import type { StrategyPayload } from "./types";

/** /strategy page body. Decrypts in the browser; nothing readable is in the exported HTML/JS. */
export default function StrategyGate() {
  const t = getDict("en").strategy;
  const [doc, setDoc] = useState<StrategyPayload | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = sessionStorage.getItem(STRATEGY_SESSION_KEY);
    } catch {
      /* ignore */
    }
    if (!stored) {
      setChecking(false);
      return;
    }
    decryptStrategy<StrategyPayload>(stored)
      .then(setDoc)
      .catch(() => {
        try {
          sessionStorage.removeItem(STRATEGY_SESSION_KEY);
        } catch {
          /* ignore */
        }
      })
      .finally(() => setChecking(false));
  }, []);

  if (doc) return <StrategyDoc en={doc.en} fr={doc.fr} />;

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">{t.back}</Link>
      <div className="mt-4 rounded-sm border-2 border-ink bg-cream p-6">
        <Logo className="h-14 w-auto" />
        <h1 className="mt-4 text-3xl">{t.dialogTitle}</h1>
        <p className="text-sm" lang="fr">{STRATEGY_FR.dialogTitle}</p>
        <div className="mt-4" aria-busy={checking}>
          {checking ? <p>{t.checking}</p> : <PasscodeForm language="en" labels={t} onSuccess={(_, d) => setDoc(d as StrategyPayload)} />}
        </div>
      </div>
    </div>
  );
}
