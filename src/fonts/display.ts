import { DM_Serif_Display } from "next/font/google";

/** Retro display serif for headings (Latin only; TH/AR glyphs fall back per-glyph). */
export const display = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--f-display",
});
