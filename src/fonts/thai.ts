import { Noto_Sans_Thai } from "next/font/google";

export const thai = Noto_Sans_Thai({
  subsets: ["thai"], // Latin glyphs come from Inter
  display: "swap",
  variable: "--f-thai",
});
