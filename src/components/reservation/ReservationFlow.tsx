"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getDict } from "@/content";
import { reservationUi, type ContactPref, type Occasion, type ZoneId } from "@/content/reservation-ui";
import type { BranchSlug, Lang } from "@/content/types";
import { BRANCHES, DEMO_HOURS, directionsUrl, fullAddress, getBranch, shown } from "@/config/site";
import { DAYPARTS, ZONE_IDS, ZONES, allSlots, branchRange, buildIcs, daypartOf, hhmmToMin, readAttribution, slotInfo, zoneFits, type Daypart } from "@/lib/reservation";
import { pathFor } from "@/lib/routes";
import { track } from "@/lib/track";
import FloorPlan from "./FloorPlan";

/**
 * Demo reservation flow. PRIVACY: state lives only in React memory. No fetch/XHR/beacon, no cookies,
 * no localStorage/sessionStorage, no payment. The only "output" is an .ics file generated locally with no personal data.
 */
interface State {
  branch: BranchSlug | null;
  date: string;
  party: number;
  children: number;
  highChairs: number;
  time: string;
  zone: ZoneId | "none";
  occasion: Occasion;
  requests: string;
  vegetarian: boolean;
  noPork: boolean;
  allergies: string;
  name: string;
  cc: string;
  phone: string;
  email: string;
  pref: ContactPref | "";
  marketing: boolean;
}

const COUNTRY_CODES = ["+66", "+971", "+966", "+965", "+974", "+973", "+968", "+44", "+33", "+49", "+39", "+1", "+65", "+60", "+81", "+86", "+91", "+61"];
const LOCALES: Record<Lang, string> = { en: "en-GB", th: "th-TH-u-ca-gregory", ar: "ar-u-nu-latn" };

const init = (branch: BranchSlug | null): State => ({
  branch, date: "", party: 2, children: 0, highChairs: 0, time: "", zone: "none", occasion: "none", requests: "", vegetarian: false, noPork: false, allergies: "", name: "", cc: "+66", phone: "", email: "", pref: "", marketing: false,
});

const field = "mt-1 min-h-12 w-full rounded-sm border-2 border-ink bg-white px-3 text-base";
const label = "block text-sm font-bold";
const errCls = "mt-1 text-sm font-semibold text-tomato";

export default function ReservationFlow({
  lang,
  initialBranch,
  entryPage,
  onClose,
}: {
  lang: Lang;
  initialBranch?: BranchSlug | null;
  entryPage: string;
  onClose?: () => void;
}) {
  const t = reservationUi[lang];
  const d = getDict(lang);
  const [s, setS] = useState<State>(() => init(initialBranch ?? null));
  const [step, setStep] = useState(initialBranch ? 2 : 1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [today, setToday] = useState("");
  const [attr, setAttr] = useState({ utm_source: "", utm_medium: "", utm_campaign: "", gclid: "", debug: false });
  const [icsUrl, setIcsUrl] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const mounted = useRef(false);
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const n = new Date();
    setToday(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`);
    setAttr(readAttribution(window.location.search));
  }, []);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    track("booking_start", { branch: initialBranch ?? "none", language: lang, entry_page: entryPage });
  }, [initialBranch, lang, entryPage]);

  useEffect(() => {
    if (!started.current) return;
    if (!done) track("booking_step", { step, branch: s.branch ?? "none" });
    // Move focus to the step heading only AFTER the user has navigated between steps: never on first render
    // (focusing on load scrolled /reserve/ down to the form).
    if (mounted.current) headingRef.current?.focus({ preventScroll: false });
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, done]);

  useEffect(() => () => { if (icsUrl) URL.revokeObjectURL(icsUrl); }, [icsUrl]);

  const branch = s.branch ? getBranch(s.branch) : null;
  const bt = s.branch ? d.branches[s.branch] : null;
  const range = branch ? branchRange(branch) : { from: DEMO_HOURS.opens, to: DEMO_HOURS.closes };
  const slots = useMemo(() => (branch ? allSlots(branch) : []), [branch]);
  const info = useMemo(
    () => (s.date && branch ? slots.map((sl) => slotInfo(branch.slug, s.date, sl.time, s.party)) : []),
    [slots, s.date, s.party, branch],
  );

  const fmtDate = (ds: string) => {
    if (!ds) return "";
    const [y, m, dd] = ds.split("-").map(Number);
    return new Intl.DateTimeFormat(LOCALES[lang], { dateStyle: "full", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, dd)));
  };

  function validate(n: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (n === 1 && !s.branch) e.branch = t.branch.required;
    if (n === 2) {
      if (!s.date) e.date = t.guests.dateRequired;
      else if (today && s.date < today) e.date = t.guests.datePast;
      if (s.party >= 13) e.party = t.guests.partyGroup;
    }
    if (n === 3) {
      const ok = info.find((i) => i.time === s.time && i.status !== "full");
      if (!s.date) e.time = t.time.needDate;
      else if (!ok) e.time = t.time.required;
    }
    if (n === 5) {
      if (!s.name.trim()) e.name = t.details.nameRequired;
      if (!/^\d{6,12}$/.test(s.phone.replace(/[\s-]/g, ""))) e.phone = t.details.phoneInvalid;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.email.trim())) e.email = t.details.emailInvalid;
      if (!s.pref) e.pref = t.details.prefRequired;
    }
    return e;
  }

  function go(n: number) {
    setErrors({});
    setStep(n);
  }
  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.getElementById("rf-errors")?.focus());
      return;
    }
    setStep((x) => Math.min(6, x + 1));
  }
  function submit() {
    if (!branch) return;
    const zoneName = s.zone === "none" ? t.seating.noPreference : t.seating.zones[s.zone];
    const addr = fullAddress(branch) ?? (shown(branch, "floor") ? `${branch.floor}, ${bt?.mall}` : branch.city);
    const ics = buildIcs({
      title: `${branch.name} — DEMO (no reservation made)`,
      date: s.date,
      time: s.time,
      location: `${branch.name}, ${addr}`,
      description: `Concept demo only. Party of ${s.party}. Seating preference: ${zoneName}. No reservation has been made.`,
    });
    setIcsUrl(URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" })));
    track("booking_submit_demo", {
      branch: branch.slug,
      party_size: s.party,
      daypart: daypartOf(hhmmToMin(s.time)),
      language: lang,
      utm_source: attr.utm_source,
      gclid_present: attr.gclid !== "",
    });
    setDone(true);
    setErrors({});
  }

  const errorList = Object.entries(errors);
  const ErrorSummary = errorList.length ? (
    <div id="rf-errors" tabIndex={-1} role="alert" className="mb-4 rounded-sm border-2 border-tomato bg-white p-3">
      <p className="font-bold text-tomato">{t.errorsTitle}</p>
      <ul className="mt-1 list-disc ps-5 text-sm">
        {errorList.map(([k, m]) => (
          <li key={k}>{m}</li>
        ))}
      </ul>
    </div>
  ) : null;

  const daypart: Daypart | "" = s.time ? daypartOf(hhmmToMin(s.time)) : "";
  const progress = (
    <nav aria-label={t.progressLabel} className="mb-4">
      <p className="text-sm font-bold" aria-live="polite">{t.stepOf(done ? 6 : step, 6)}: {done ? t.done.heading : t.steps[step - 1]}</p>
      <ol className="mt-2 flex gap-1" role="list">
        {t.steps.map((name, i) => (
          <li key={name} aria-current={!done && i + 1 === step ? "step" : undefined} className={`h-2 flex-1 rounded-full ${done || i + 1 < step ? "bg-ink" : i + 1 === step ? "bg-tomato" : "bg-ink/20"}`}>
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ol>
    </nav>
  );

  const debugPanel = attr.debug ? (
    <details open className="mt-6 rounded-sm border-2 border-dashed border-ink bg-white p-3 text-sm" dir="ltr">
      <summary className="cursor-pointer font-bold">{t.debug.title}</summary>
      <p className="mt-1">{t.debug.note}</p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
        {([
          [t.debug.source, attr.utm_source || t.debug.absent],
          [t.debug.medium, attr.utm_medium || t.debug.absent],
          [t.debug.campaign, attr.utm_campaign || t.debug.absent],
          [t.debug.gclid, attr.gclid ? t.debug.present : t.debug.absent],
          [t.debug.branch, s.branch ?? "—"],
          [t.debug.language, lang],
          [t.debug.daypart, daypart || "—"],
        ] as [string, string][]).map(([k, v]) => (
          <div key={k} className="contents"><dt className="font-mono font-bold">{k}</dt><dd className="font-mono">{v}</dd></div>
        ))}
      </dl>
    </details>
  ) : null;

  const nav = (extra?: React.ReactNode) => (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      <button type="button" onClick={() => go(step - 1)} disabled={step <= 1} className="min-h-12 rounded-sm border-2 border-ink bg-white px-5 font-semibold disabled:opacity-40">
        {t.back}
      </button>
      {extra ?? <button type="submit" className="min-h-12 rounded-sm bg-tomato px-6 font-semibold text-cream hover:bg-[#8f1d17]">{t.next}</button>}
    </div>
  );

  const h2 = (text: string) => (
    <h2 ref={headingRef} tabIndex={-1} className="text-3xl outline-none">{text}</h2>
  );

  /* ---------- Confirmation ---------- */
  if (done && branch) {
    const rows = summaryRows();
    return (
      <div>
        {progress}
        <h2 ref={headingRef} tabIndex={-1} className="text-3xl outline-none">{t.done.heading}</h2>
        <p className="mt-2">{t.done.text}</p>
        <h3 className="mt-6 text-xl">{t.done.summaryTitle}</h3>
        <SummaryList rows={rows} />
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={icsUrl} download={`mozza-demo-${s.date}.ics`} className="inline-flex min-h-12 items-center rounded-sm bg-tomato px-5 font-semibold text-cream">{t.done.calendar}</a>
          <a href={directionsUrl(branch)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-sm border-2 border-ink bg-white px-5 font-semibold">{t.done.directions}</a>
          <Link href={pathFor(lang, "menu")} onClick={onClose} className="inline-flex min-h-12 items-center rounded-sm border-2 border-ink bg-white px-5 font-semibold">{t.done.menu}</Link>
        </div>
        <p className="mt-3 text-sm">{t.done.icsNote}</p>
        <p className="mt-4 rounded-sm border-2 border-ink bg-white p-3 text-sm font-semibold">{t.done.production}</p>
        <button type="button" onClick={() => { setS(init(initialBranch ?? null)); setIcsUrl(""); setDone(false); setStep(initialBranch ? 2 : 1); }} className="mt-4 min-h-11 font-semibold underline underline-offset-4">{t.startOver}</button>
        {debugPanel}
      </div>
    );
  }

  function summaryRows(): { k: string; v: string; step?: number }[] {
    const r = t.review.rows;
    const yn = (b: boolean) => (b ? t.review.yes : t.review.no);
    const diet = [s.vegetarian && t.details.vegetarian, s.noPork && t.details.noPork, s.allergies.trim() && `${t.details.allergies}: ${s.allergies.trim()}`].filter(Boolean).join(" · ");
    return [
      { k: r.branch, v: branch ? branch.name : "", step: 1 },
      { k: r.date, v: fmtDate(s.date), step: 2 },
      { k: r.party, v: `${s.party} ${t.guestsWord(s.party)}`, step: 2 },
      { k: r.children, v: String(s.children), step: 2 },
      { k: r.highChairs, v: String(s.highChairs), step: 2 },
      { k: r.time, v: s.time, step: 3 },
      { k: r.seating, v: s.zone === "none" ? t.seating.noPreference : t.seating.zones[s.zone], step: 4 },
      { k: r.occasion, v: t.details.occasions[s.occasion], step: 5 },
      { k: r.requests, v: s.requests.trim() || t.review.none, step: 5 },
      { k: r.dietary, v: diet || t.review.none, step: 5 },
      { k: r.name, v: s.name, step: 5 },
      { k: r.phone, v: `${s.cc} ${s.phone}`, step: 5 },
      { k: r.email, v: s.email, step: 5 },
      { k: r.contact, v: s.pref ? t.details.prefs[s.pref] : "", step: 5 },
      { k: r.marketing, v: yn(s.marketing), step: 5 },
    ];
  }

  return (
    <div>
      <p className="mb-3 rounded-sm bg-ink px-3 py-2 text-sm font-semibold text-cream">{t.demoNote}</p>
      {progress}
      {ErrorSummary}

      {step === 1 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          {h2(t.branch.heading)}
          <fieldset className="mt-3">
            <legend className="text-sm">{t.branch.hint}</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {BRANCHES.map((b) => {
                const bx = d.branches[b.slug];
                const checked = s.branch === b.slug;
                return (
                  <label key={b.slug} className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-3 ${checked ? "border-tomato bg-white ring-2 ring-tomato" : "border-ink bg-white hover:bg-mustard/40"}`}>
                    <input type="radio" name="branch" value={b.slug} checked={checked} onChange={() => set("branch", b.slug)} className="mt-1 h-5 w-5 accent-[var(--tomato)]" />
                    <span>
                      <span className="block font-bold">{b.name}</span>
                      <span className="block text-sm">{bx.district ? `${bx.mall} · ${bx.district}` : bx.mall}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {nav()}
        </form>
      )}

      {step === 2 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          {h2(t.guests.heading)}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="rf-date" className={label}>{t.guests.date}</label>
              <input id="rf-date" type="date" min={today || undefined} value={s.date} onChange={(e) => set("date", e.target.value)} aria-invalid={!!errors.date} aria-describedby="rf-date-h" className={field} dir="ltr" />
              <p id="rf-date-h" className="mt-1 text-xs">{t.guests.dateHint}</p>
            </div>
            <div>
              <label htmlFor="rf-party" className={label}>{t.guests.party}</label>
              <select id="rf-party" value={s.party} onChange={(e) => { set("party", Number(e.target.value)); set("zone", "none"); set("time", ""); }} aria-invalid={!!errors.party} className={field}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{t.guests.partyOption(n)}</option>)}
                <option value={13}>13+</option>
              </select>
              {s.party >= 13 && (
                <p className="mt-2 rounded-sm bg-white p-2 text-sm font-semibold" role="status">
                  {t.guests.groups} <Link href={pathFor(lang, "contact")} className="underline" onClick={onClose}>{t.guests.groupsLink}</Link>
                </p>
              )}
            </div>
            <div>
              <label htmlFor="rf-children" className={label}>{t.guests.children}</label>
              <select id="rf-children" value={s.children} onChange={(e) => set("children", Number(e.target.value))} className={field}>
                {[0, 1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="rf-hc" className={label}>{t.guests.highChairs}</label>
              <select id="rf-hc" value={s.highChairs} onChange={(e) => set("highChairs", Number(e.target.value))} className={field}>
                {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          {nav()}
        </form>
      )}

      {step === 3 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          {h2(t.time.heading)}
          <p className="mt-1 text-sm font-bold">{t.time.simulated}</p>
          <p className="text-sm">{t.time.demoRange(range.from, range.to)}</p>
          {!s.date ? (
            <p className="mt-4 rounded-sm bg-white p-3 font-semibold">{t.time.needDate}</p>
          ) : (
            DAYPARTS.map((dp) => {
              const list = info.filter((i) => i.daypart === dp);
              if (!list.length) return null;
              const quiet = list.some((i) => i.quiet);
              const popular = list.some((i) => i.popular);
              return (
                <fieldset key={dp} className="mt-5">
                  <legend className="text-xl font-bold">{t.time[dp]}</legend>
                  {quiet && <p className="text-sm font-semibold text-leaf">{t.time.quiet}</p>}
                  {popular && <p className="text-sm font-semibold text-tomato">{t.time.popular}</p>}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {list.map((i) => {
                      const sel = s.time === i.time;
                      const disabled = i.status === "full";
                      return (
                        <label key={i.time} className={`relative inline-flex min-h-11 min-w-[4.5rem] items-center justify-center rounded-sm border-2 px-3 text-sm font-bold ${disabled ? "cursor-not-allowed border-ink/30 bg-ink/5 text-ink/40 line-through" : sel ? "cursor-pointer border-tomato bg-tomato text-cream" : "cursor-pointer border-ink bg-white hover:bg-mustard/50"} ${i.quiet && !sel && !disabled ? "border-leaf" : ""} ${i.popular && !sel && !disabled ? "border-dashed" : ""}`}>
                          <input
                            type="radio"
                            name="time"
                            value={i.time}
                            disabled={disabled}
                            checked={sel}
                            onChange={() => { set("time", i.time); track("booking_time_select", { daypart: i.daypart, quiet_slot: i.quiet }); }}
                            className="peer sr-only"
                            aria-label={`${i.time} — ${disabled ? t.time.fullSlot : i.status === "limited" ? t.time.limitedSlot : t.time.availableSlot}`}
                          />
                          <span dir="ltr">{i.time}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              );
            })
          )}
          {s.date && info.every((i) => i.status === "full") && <p className="mt-4 font-semibold">{t.time.none}</p>}
          {s.time && <p className="mt-4 text-sm font-bold">{t.time.chosen}: <span dir="ltr">{s.time}</span></p>}
          {nav()}
        </form>
      )}

      {step === 4 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          {h2(t.seating.heading)}
          <p className="mt-1 text-sm">{t.seating.note}</p>
          <div className="mt-4">
            <FloorPlan
              selected={s.zone}
              party={s.party}
              names={t.seating.zones}
              label={t.seating.planLabel}
              onSelect={(z) => { set("zone", z); track("booking_zone_select", { zone: z, branch: s.branch ?? "none" }); }}
            />
            <p className="mt-2 text-center text-xs">{t.seating.illustrative}{branch ? ` · ${branch.name}` : ""}</p>
          </div>
          <fieldset className="mt-5">
            <legend className="text-sm font-bold">{t.seating.planLabel}</legend>
            <div className="mt-2 grid gap-2">
              <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border-2 p-3 ${s.zone === "none" ? "border-tomato bg-white" : "border-ink bg-white"}`}>
                <input type="radio" name="zone" value="none" checked={s.zone === "none"} onChange={() => set("zone", "none")} className="h-5 w-5 accent-[var(--tomato)]" />
                <span className="font-bold">{t.seating.noPreference}</span>
              </label>
              {ZONE_IDS.map((z) => {
                const ok = zoneFits(z, s.party);
                const reason = ok ? t.seating.zoneHints[z] : ZONES[z].min > s.party ? t.seating.minReason(t.seating.zones[z], ZONES[z].min) : t.seating.maxReason(t.seating.zones[z], ZONES[z].max);
                return (
                  <label key={z} className={`flex min-h-12 items-start gap-3 rounded-sm border-2 p-3 ${!ok ? "cursor-not-allowed border-ink/30 bg-ink/5 text-ink/60" : s.zone === z ? "cursor-pointer border-tomato bg-white" : "cursor-pointer border-ink bg-white"}`}>
                    <input type="radio" name="zone" value={z} disabled={!ok} checked={s.zone === z} onChange={() => { set("zone", z); track("booking_zone_select", { zone: z, branch: s.branch ?? "none" }); }} className="mt-1 h-5 w-5 accent-[var(--tomato)]" aria-describedby={`zr-${z}`} />
                    <span>
                      <span className="block font-bold">{t.seating.zones[z]}</span>
                      <span id={`zr-${z}`} className="block text-sm">{ok ? reason : `${t.seating.unavailable} — ${reason}`}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {nav()}
        </form>
      )}

      {step === 5 && (
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          {h2(t.details.heading)}
          <p className="mt-1 text-sm">{t.details.privacy}</p>
          <div className="mt-4 grid gap-4">
            <div>
              <label htmlFor="rf-occ" className={label}>{t.details.occasion}</label>
              <select id="rf-occ" value={s.occasion} onChange={(e) => set("occasion", e.target.value as Occasion)} className={field}>
                {(Object.keys(t.details.occasions) as Occasion[]).map((o) => <option key={o} value={o}>{t.details.occasions[o]}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="rf-req" className={label}>{t.details.requests}</label>
              <textarea id="rf-req" rows={3} value={s.requests} onChange={(e) => set("requests", e.target.value)} className={`${field} py-2`} autoComplete="off" />
            </div>
            <fieldset>
              <legend className={label}>{t.details.dietary}</legend>
              <div className="mt-1 flex flex-wrap gap-4">
                <label className="inline-flex min-h-11 items-center gap-2"><input type="checkbox" checked={s.vegetarian} onChange={(e) => set("vegetarian", e.target.checked)} className="h-5 w-5 accent-[var(--tomato)]" />{t.details.vegetarian}</label>
                <label className="inline-flex min-h-11 items-center gap-2"><input type="checkbox" checked={s.noPork} onChange={(e) => set("noPork", e.target.checked)} className="h-5 w-5 accent-[var(--tomato)]" />{t.details.noPork}</label>
              </div>
              <label htmlFor="rf-all" className={`${label} mt-2`}>{t.details.allergies}</label>
              <input id="rf-all" type="text" value={s.allergies} onChange={(e) => set("allergies", e.target.value)} aria-describedby="rf-all-h" className={field} autoComplete="off" />
              <p id="rf-all-h" className="mt-1 text-xs">{t.details.allergiesHint}</p>
            </fieldset>
            <div>
              <label htmlFor="rf-name" className={label}>{t.details.name}</label>
              <input id="rf-name" type="text" value={s.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "rf-name-e" : undefined} className={field} autoComplete="off" />
              {errors.name && <p id="rf-name-e" className={errCls}>{errors.name}</p>}
            </div>
            <div>
              <span className={label} id="rf-phone-l">{t.details.phone}</span>
              <div className="mt-1 flex gap-2" dir="ltr">
                <select aria-label={t.details.countryCode} value={s.cc} onChange={(e) => set("cc", e.target.value)} className="min-h-12 w-28 rounded-sm border-2 border-ink bg-white px-2">
                  {COUNTRY_CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input id="rf-phone" type="tel" inputMode="tel" aria-labelledby="rf-phone-l" value={s.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "rf-phone-e" : undefined} className="min-h-12 w-full rounded-sm border-2 border-ink bg-white px-3 text-base" autoComplete="off" />
              </div>
              {errors.phone && <p id="rf-phone-e" className={errCls}>{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="rf-email" className={label}>{t.details.email}</label>
              <input id="rf-email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "rf-email-e" : undefined} className={field} dir="ltr" autoComplete="off" />
              {errors.email && <p id="rf-email-e" className={errCls}>{errors.email}</p>}
            </div>
            <fieldset>
              <legend className={label}>{t.details.contactPref}</legend>
              <div className="mt-1 flex flex-wrap gap-3">
                {(Object.keys(t.details.prefs) as ContactPref[]).map((p) => (
                  <label key={p} className="inline-flex min-h-11 items-center gap-2"><input type="radio" name="pref" value={p} checked={s.pref === p} onChange={() => set("pref", p)} className="h-5 w-5 accent-[var(--tomato)]" />{t.details.prefs[p]}</label>
                ))}
              </div>
              {errors.pref && <p className={errCls}>{errors.pref}</p>}
            </fieldset>
            <label className="flex min-h-11 items-start gap-2"><input type="checkbox" checked={s.marketing} onChange={(e) => set("marketing", e.target.checked)} className="mt-1 h-5 w-5 accent-[var(--tomato)]" /><span>{t.details.consent}</span></label>
          </div>
          {nav()}
        </form>
      )}

      {step === 6 && (
        <div>
          {h2(t.review.heading)}
          <p className="mt-1 text-sm">{t.review.intro}</p>
          <SummaryList rows={summaryRows()} editLabel={t.edit} onEdit={(n) => go(n)} />
          {nav(<button type="button" onClick={submit} className="min-h-12 rounded-sm bg-tomato px-6 font-semibold text-cream hover:bg-[#8f1d17]">{t.confirm}</button>)}
        </div>
      )}
      {debugPanel}
    </div>
  );
}

function SummaryList({ rows, editLabel, onEdit }: { rows: { k: string; v: string; step?: number }[]; editLabel?: string; onEdit?: (n: number) => void }) {
  return (
    <dl className="mt-3 divide-y divide-ink/20 rounded-sm border-2 border-ink bg-white">
      {rows.map((r) => (
        <div key={r.k} className="flex items-start justify-between gap-3 px-3 py-2">
          <div className="min-w-0">
            <dt className="text-xs font-bold uppercase tracking-wide">{r.k}</dt>
            <dd className="break-words">{r.v}</dd>
          </div>
          {onEdit && r.step && (
            <button type="button" onClick={() => onEdit(r.step!)} className="min-h-11 shrink-0 px-2 text-sm font-bold underline underline-offset-4">
              {editLabel}<span className="sr-only"> — {r.k}</span>
            </button>
          )}
        </div>
      ))}
    </dl>
  );
}
