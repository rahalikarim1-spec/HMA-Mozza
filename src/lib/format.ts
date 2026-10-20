import type { Dict } from "@/content/dict";
import type { BranchConfig } from "@/config/site";

export function openStatus(b: BranchConfig, d: Dict): string {
  return b.closes === "TBC" ? d.common.openTbc : d.common.openToday(b.closes);
}

export function hoursText(opens: string, closes: string, d: Dict): { text: string; ltr: boolean } {
  if (opens === "TBC" && closes === "TBC") return { text: d.common.tbc, ltr: false };
  const o = opens === "TBC" ? d.common.tbc : opens;
  const c = closes === "TBC" ? d.common.tbc : closes;
  return { text: `${o} – ${c}`, ltr: opens !== "TBC" && closes !== "TBC" };
}
