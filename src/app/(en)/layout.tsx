import type { ReactNode } from "react";
import RootDocument from "@/components/RootDocument";
import { display } from "@/fonts/display";
import { inter } from "@/fonts/inter";

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="en" fontClass={`${display.variable} ${inter.variable}`}>
      {children}
    </RootDocument>
  );
}
