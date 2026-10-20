"use client";

import { useId, useState } from "react";
import { STRATEGY_SESSION_KEY } from "@/content/strategy-ui";
import { decryptStrategy, StrategyError } from "@/lib/strategy-crypto";
import { track } from "@/lib/track";

interface Labels {
  passcodeLabel: string;
  open: string;
  cancel?: string;
  wrong: string;
  unavailable: string;
  checking: string;
  hint: string;
}

/** Verifies the passcode by actually decrypting the payload. Never logs/sends the passcode (events carry no value). */
export default function PasscodeForm({
  labels,
  onSuccess,
  onCancel,
  language,
}: {
  labels: Labels;
  onSuccess: (pass: string, doc: unknown) => void;
  onCancel?: () => void;
  language: string;
}) {
  const [pass, setPass] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong" | "unavailable">("idle");
  const id = useId();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pass) return;
    setState("checking");
    try {
      const doc = await decryptStrategy(pass);
      try {
        sessionStorage.setItem(STRATEGY_SESSION_KEY, pass); // tab session only, so /strategy opens without asking again
      } catch {
        /* storage blocked: the page will ask again */
      }
      track("strategy_unlock_success", { language });
      onSuccess(pass, doc);
    } catch (err) {
      const kind = err instanceof StrategyError ? err.kind : "wrong";
      setState(kind);
      if (kind === "wrong") track("strategy_unlock_fail", { language });
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={`${id}-p`} className="block text-sm font-bold">
        {labels.passcodeLabel}
      </label>
      <input
        id={`${id}-p`}
        type="password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
          if (state === "wrong") setState("idle");
        }}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-describedby={`${id}-h`}
        aria-invalid={state === "wrong"}
        className="mt-1 min-h-12 w-full rounded-sm border-2 border-ink bg-white px-3 text-base"
        dir="ltr"
      />
      <p id={`${id}-h`} className="mt-1 text-xs">
        {labels.hint}
      </p>
      <p role="alert" className="mt-2 min-h-5 text-sm font-semibold text-tomato">
        {state === "wrong" ? labels.wrong : state === "unavailable" ? labels.unavailable : ""}
      </p>
      <div className="mt-3 flex flex-wrap justify-end gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className="min-h-12 rounded-sm border-2 border-ink bg-white px-5 font-semibold">
            {labels.cancel}
          </button>
        )}
        <button type="submit" disabled={state === "checking" || !pass} className="min-h-12 rounded-sm bg-tomato px-6 font-semibold text-cream disabled:opacity-60">
          {state === "checking" ? labels.checking : labels.open}
        </button>
      </div>
    </form>
  );
}
