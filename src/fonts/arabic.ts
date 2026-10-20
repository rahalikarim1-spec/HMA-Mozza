import { IBM_Plex_Sans_Arabic } from "next/font/google";

export const arabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic"], // Latin glyphs come from Inter
  display: "swap",
  variable: "--f-arabic",
});
