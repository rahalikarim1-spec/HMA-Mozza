import type { Dict } from "@/content/dict";
import { CURRENCY, type BranchConfig } from "@/config/site";
import type { DishId } from "@/content/types";
import { PRICES } from "@/config/site";

export function priceLabel(id: DishId, d: Dict): { text: string; ltr: boolean } {
  const p = PRICES[id];
  return p === null
    ? { text: d.common.tbc, ltr: false }
    : { text: `${p.toLocaleString("en-US")} ${CURRENCY}`, ltr: true };
}

export function openStatus(b: BranchConfig, d: Dict): string {
  return b.closes === "TBC" ? d.common.openTbc : d.common.openToday(b.closes);
}

export function hoursText(opens: string, closes: string, d: Dict): { text: string; ltr: boolean } {
  if (opens === "TBC" && closes === "TBC") return { text: d.common.tbc, ltr: false };
  const o = opens === "TBC" ? d.common.tbc : opens;
  const c = closes === "TBC" ? d.common.tbc : closes;
  return { text: `${o} – ${c}`, ltr: opens !== "TBC" && closes !== "TBC" };
}
