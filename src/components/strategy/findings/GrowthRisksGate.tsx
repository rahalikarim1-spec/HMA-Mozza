"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import Logo from "@/components/Logo";
import { GR_SESSION_KEY, GrowthCryptoError, loadPayload, unlockWithPassword, unlockWithSessionKey, type GrowthPayload } from "@/lib/growth-crypto";
import FindingsPage from "./FindingsPage";
import type { GrowthData } from "./types";

/**
 * /strategy/growth-risks/ body. The content is encrypted at build time (scripts/encrypt-growth-risks.mjs) and decrypted in the browser:
 * nothing readable is in the exported HTML, RSC payloads or JS bundles. The password is remembered for this browser session only.
 */
export default function GrowthRisksGate() {
  const [data, setData] = useState<GrowthData | null>(null);
  const [state, setState] = useState<"checking" | "locked" | "busy" | "wrong" | "unavailable">("locked");
  const [pass, setPass] = useState("");
  const id = useId();

  useEffect(() => {
    let stored: string | null = null;
    try { stored = sessionStorage.getItem(GR_SESSION_KEY); } catch { /* ignore */ }
    if (!stored) return;
    setState("checking");
    loadPayload()
      .then((p) => unlockWithSessionKey<GrowthData>(stored as string, p))
      .then(setData)
      .catch(() => {
        try { sessionStorage.removeItem(GR_SESSION_KEY); } catch { /* ignore */ }
        setState("locked");
      });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pass) return;
    setState("busy");
    try {
      const p: GrowthPayload = await loadPayload();
      const { data: d, sessionKey } = await unlockWithPassword<GrowthData>(pass, p);
      try { sessionStorage.setItem(GR_SESSION_KEY, sessionKey); } catch { /* ignore */ }
      setPass("");
      setData(d);
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      setState(err instanceof GrowthCryptoError && err.kind === "unavailable" ? "unavailable" : "wrong");
    }
  }

  if (data) return <FindingsPage d={data} />;

  const busy = state === "busy" || state === "checking";
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Link href="/strategy/" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">← Back to Strategy</Link>
      <div className="mt-4 rounded-sm border-2 border-ink bg-cream p-6 shadow-[4px_4px_0_var(--tomato)]">
        <Logo className="h-14 w-auto" />
        <h1 className="mt-4 text-3xl">Growth Risks &amp; Structural Gaps</h1>
        <p className="mt-2 text-sm">Confidential · prepared for HMA · password provided by Wadhah Belhassen</p>
        {state === "checking" ? (
          <p className="mt-4" aria-busy="true">Checking…</p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
            <label htmlFor={`${id}-pw`} className="block text-sm font-semibold">Password</label>
            <input
              id={`${id}-pw`}
              type="password"
              autoComplete="off"
              value={pass}
              onChange={(e) => { setPass(e.target.value); if (state === "wrong") setState("locked"); }}
              aria-invalid={state === "wrong"}
              aria-describedby={state === "wrong" || state === "unavailable" ? `${id}-msg` : undefined}
              className="min-h-11 w-full rounded-sm border-2 border-ink bg-white px-3 text-base"
            />
            <button type="submit" disabled={busy || !pass} className="min-h-11 w-full rounded-sm border-2 border-ink bg-ink px-4 text-base font-semibold text-cream hover:bg-black disabled:opacity-60">
              {state === "busy" ? "Unlocking…" : "Unlock"}
            </button>
            <p id={`${id}-msg`} role="alert" className="min-h-5 text-sm font-semibold text-tomato">
              {state === "wrong" ? "Incorrect password. Please try again." : state === "unavailable" ? "This page is not available in this build." : ""}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
