import type { ReactNode } from "react";
import RootDocument from "@/components/RootDocument";
import { display } from "@/fonts/display";
import { inter } from "@/fonts/inter";
import { thai } from "@/fonts/thai";

export default function THLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="th" fontClass={`${display.variable} ${inter.variable} ${thai.variable}`}>
      {children}
    </RootDocument>
  );
}
