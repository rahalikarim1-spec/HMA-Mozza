import Link from "next/link";
import { BRANCHES } from "@/config/site";
import type { Lang } from "@/content/types";
import { pathFor } from "@/lib/routes";

/**
 * Simple stylised (schematic) map: no tiles, no API key. Positions are approximate and illustrative only.
 * Geography is never mirrored in RTL, so the wrapper is forced to dir="ltr".
 */
export default function StylisedMap({ lang, label, caption }: { lang: Lang; label: string; caption: string }) {
  const placed = BRANCHES.filter((b) => b.mapPos);
  return (
    <figure dir="ltr">
      <svg viewBox="0 0 100 90" role="group" aria-label={label} className="w-full rounded-sm border-2 border-ink bg-[#fff6e5]">
        <path d="M30 0 C 20 18, 33 34, 22 50 S 15 76, 24 90" fill="none" stroke="#9ec3d6" strokeWidth="5" strokeLinecap="round" />
        <path d="M0 62 L100 52" stroke="#e8d9bd" strokeWidth="1.2" strokeDasharray="2 1.5" />
        <path d="M46 0 L46 90" stroke="#e8d9bd" strokeWidth="1.2" strokeDasharray="2 1.5" />
        {placed.map((b) => {
          const { x, y } = b.mapPos!;
          const right = x < 62;
          return (
            <Link key={b.slug} href={pathFor(lang, `locations/${b.slug}`)} aria-label={b.name}>
              <g className="cursor-pointer">
                <circle cx={x} cy={y} r="2.6" fill="var(--tomato)" stroke="#fff6e5" strokeWidth="0.8" />
                <text
                  x={right ? x + 4 : x - 4}
                  y={y + 1.2}
                  textAnchor={right ? "start" : "end"}
                  fontSize="3.4"
                  fontWeight="700"
                  fill="var(--ink)"
                  style={{ fontFamily: "var(--f-inter), system-ui, sans-serif" }}
                >
                  {b.name.replace("Mozza ", "")}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs opacity-80">{caption}</figcaption>
    </figure>
  );
}
