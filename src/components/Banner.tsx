import type { Dict } from "@/content/dict";

/** Fixed demo disclaimer shown on every page (required). */
export default function Banner({ d }: { d: Dict }) {
  return (
    <div
      role="note"
      className="fixed inset-x-0 top-0 z-50 flex h-[var(--banner-h)] items-center justify-center bg-ink px-3 text-center text-[11px] leading-[1.25] font-medium text-cream sm:text-xs"
    >
      {d.banner}
    </div>
  );
}
