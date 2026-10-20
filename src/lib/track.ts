import type { BranchSlug, Lang } from "@/content/types";

export type TrackName =
  | "reservation_click"
  | "whatsapp_click"
  | "line_click"
  | "directions_click"
  | "menu_view"
  | "pdf_download"
  | "language_switch";

export type TrackParams =
  | { branch: BranchSlug | "any"; language: Lang }
  | { language: Lang }
  | { from: Lang; to: Lang };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Demo tracking: pushes to window.dataLayer AND logs to the console for live DevTools demos. */
export function track(event: TrackName, params: TrackParams): void {
  if (typeof window === "undefined") return;
  const payload = { event, ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  // eslint-disable-next-line no-console
  console.log("[dataLayer]", payload);
}
