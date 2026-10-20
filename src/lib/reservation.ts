import { DEMO_HOURS, closesAt, type BranchConfig } from "@/config/site";
import type { ZoneId } from "@/content/reservation-ui";

/** Pure helpers for the demo reservation flow. No I/O, no storage, no network. */
export type Daypart = "lunch" | "afternoon" | "dinner";
export const DAYPARTS: Daypart[] = ["lunch", "afternoon", "dinner"];

export const hhmmToMin = (s: string) => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};
export const minToHhmm = (n: number) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

export function daypartOf(min: number): Daypart {
  return min < 15 * 60 ? "lunch" : min < 18 * 60 ? "afternoon" : "dinner";
}

/** Opening times are unknown for every branch, so the range is a DEMO range. Last slot = closing time minus 60 min when the closing time is confirmed. */
export function branchRange(b: BranchConfig): { from: string; to: string } {
  const close = closesAt(b) ?? DEMO_HOURS.closes;
  return { from: DEMO_HOURS.opens, to: minToHhmm(hhmmToMin(close) - 60) };
}

export function allSlots(b: BranchConfig): { time: string; daypart: Daypart }[] {
  const { from, to } = branchRange(b);
  const out: { time: string; daypart: Daypart }[] = [];
  for (let m = hhmmToMin(from); m <= hhmmToMin(to); m += 15) out.push({ time: minToHhmm(m), daypart: daypartOf(m) });
  return out;
}

/** 0 = Sunday ... 6 = Saturday for a YYYY-MM-DD string (timezone independent). */
export function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1000;
}

export interface SlotInfo {
  time: string;
  daypart: Daypart;
  status: "available" | "limited" | "full";
  quiet: boolean;
  popular: boolean;
}

/**
 * SIMULATED availability (deterministic: same inputs -> same output).
 * quiet  = weekday lunch (Mon-Fri 11:00-13:59) and early dinner (Mon-Thu 18:00-18:59)
 * popular = Friday evening (18:00-20:45) and Sunday late morning (11:00-12:45)
 */
export function slotInfo(branch: string, date: string, time: string, party: number): SlotInfo {
  const dow = weekdayOf(date);
  const m = hhmmToMin(time);
  const quiet = (dow >= 1 && dow <= 5 && m >= 660 && m < 840) || (dow >= 1 && dow <= 4 && m >= 1080 && m < 1140);
  const popular = (dow === 5 && m >= 1080 && m <= 1245) || (dow === 0 && m >= 660 && m <= 765);
  const h = hash(`${branch}|${date}|${time}`);
  const left = quiet ? 6 + (h % 6) : popular ? h % 4 : 3 + (h % 5);
  const need = Math.max(1, Math.ceil(party / 4));
  const status = left < need ? "full" : popular || left <= 2 ? "limited" : "available";
  return { time, daypart: daypartOf(m), status, quiet, popular };
}

export const ZONES: Record<ZoneId, { min: number; max: number }> = {
  main: { min: 1, max: 12 },
  window: { min: 1, max: 6 },
  banquette: { min: 2, max: 8 },
  bar: { min: 1, max: 2 },
  private: { min: 5, max: 12 },
};
export const ZONE_IDS = Object.keys(ZONES) as ZoneId[];
export const zoneFits = (z: ZoneId, party: number) => party >= ZONES[z].min && party <= ZONES[z].max;

/** Minimal .ics (floating local time). Contains NO personal details. */
export function buildIcs(opts: { title: string; date: string; time: string; location: string; description: string }): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const [y, mo, d] = opts.date.split("-");
  const start = hhmmToMin(opts.time);
  const fmt = (min: number) => `${y}${mo}${d}T${String(Math.floor(min / 60) % 24).padStart(2, "0")}${String(min % 60).padStart(2, "0")}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mozza concept demo//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:demo-${y}${mo}${d}-${opts.time.replace(":", "")}@mozza-concept-demo.example`,
    `DTSTAMP:${y}${mo}${d}T000000Z`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(start + 90)}`,
    `SUMMARY:${esc(opts.title)}`,
    `LOCATION:${esc(opts.location)}`,
    `DESCRIPTION:${esc(opts.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function readAttribution(search: string) {
  const p = new URLSearchParams(search);
  return {
    utm_source: p.get("utm_source") ?? "",
    utm_medium: p.get("utm_medium") ?? "",
    utm_campaign: p.get("utm_campaign") ?? "",
    gclid: p.get("gclid") ?? "",
    debug: p.get("debug") === "1",
  };
}
