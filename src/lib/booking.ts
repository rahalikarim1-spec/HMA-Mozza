import type { BranchSlug, Lang } from "@/content/types";
import { pathFor } from "./routes";

/** Internal reservation flow (Phase F). Works without JS as a normal link to /reserve/. */
export function bookingHref(lang: Lang, branch?: BranchSlug): string {
  return `${pathFor(lang, "reserve")}${branch ? `?branch=${branch}` : ""}`;
}
