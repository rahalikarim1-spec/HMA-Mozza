"use client";

import type { ZoneId } from "@/content/reservation-ui";
import { ZONE_IDS, zoneFits } from "@/lib/reservation";

interface Props {
  selected: ZoneId | "none";
  party: number;
  names: Record<ZoneId, string>;
  label: string;
  onSelect: (z: ZoneId) => void;
}

/**
 * Generic ILLUSTRATIVE floor plan (zones, not tables). Decorative + pointer-friendly; the radio list next to it
 * is the accessible control, so the drawing is aria-hidden. Geometry is never mirrored in RTL (dir="ltr" wrapper).
 */
const SHAPES: Record<ZoneId, { x: number; y: number; w: number; h: number; vertical?: boolean }> = {
  window: { x: 24, y: 20, w: 352, h: 38 },
  banquette: { x: 24, y: 70, w: 44, h: 120, vertical: true },
  bar: { x: 332, y: 70, w: 44, h: 120, vertical: true },
  private: { x: 24, y: 204, w: 130, h: 62 },
  main: { x: 80, y: 70, w: 240, h: 120 },
};

export default function FloorPlan({ selected, party, names, label, onSelect }: Props) {
  return (
    <div dir="ltr" className="mx-auto w-full max-w-md" aria-hidden="true" title={label}>
      <svg viewBox="0 0 400 280" className="w-full rounded-sm border-2 border-ink bg-white" focusable="false">
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="#efe7d6" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#cfc4ad" strokeWidth="2" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="384" height="264" rx="4" fill="none" stroke="var(--ink)" strokeWidth="3" />
        <rect x="170" y="268" width="60" height="8" fill="var(--mustard)" />
        {ZONE_IDS.map((z) => {
          const s = SHAPES[z];
          const ok = zoneFits(z, party);
          const sel = selected === z;
          const cx = s.x + s.w / 2;
          const cy = s.y + s.h / 2;
          return (
            <g
              key={z}
              onClick={() => ok && onSelect(z)}
              style={{ cursor: ok ? "pointer" : "not-allowed" }}
            >
              <rect
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx="4"
                fill={!ok ? "url(#hatch)" : sel ? "var(--tomato)" : "#fff6e5"}
                stroke="var(--ink)"
                strokeWidth={sel ? 3 : 1.5}
              />
              <text
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={z === "main" || z === "window" ? 15 : 12.5}
                fontWeight="700"
                fill={sel ? "#fff6e5" : "var(--ink)"}
                opacity={ok ? 1 : 0.5}
                transform={s.vertical ? `rotate(-90 ${cx} ${cy})` : undefined}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {names[z].split(" / ").map((part, i, arr) => (
                  <tspan key={i} x={cx} dy={i === 0 ? (arr.length > 1 ? "-0.6em" : 0) : "1.25em"}>
                    {part}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
        {[0, 1, 2, 3, 4].flatMap((r) =>
          [0, 1, 2].map((c) => (
            <circle key={`${r}-${c}`} cx={118 + c * 80} cy={92 + r * 24} r="3" fill="var(--ink)" opacity="0.12" pointerEvents="none" />
          )),
        )}
      </svg>
    </div>
  );
}
