import type { Dict } from "@/content/dict";
import { closesAt, hoursFor, type BranchConfig, type Weekday } from "@/config/site";

/** "Closes at 22:00" or null (hidden) when the closing time is unknown/unconfirmed. */
export function statusText(b: BranchConfig, d: Dict): string | null {
  const c = closesAt(b);
  return c ? d.common.closesAt(c) : null;
}

/** Hours cell for a weekday; null = hide the whole hours section for this branch. */
export function hoursCell(b: BranchConfig, day: Weekday, d: Dict): { text: string; ltr: boolean } | null {
  if (b.verify.hours) return null;
  const h = hoursFor(b, day);
  if (!h.closes) return null;
  return h.opens
    ? { text: `${h.opens} – ${h.closes}`, ltr: true }
    : { text: d.common.untilTime(h.closes), ltr: false };
}
