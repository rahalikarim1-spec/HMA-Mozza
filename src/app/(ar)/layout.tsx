import type { ReactNode } from "react";
import RootDocument from "@/components/RootDocument";
import { display } from "@/fonts/display";
import { inter } from "@/fonts/inter";
import { arabic } from "@/fonts/arabic";

export default function ARLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="ar" fontClass={`${display.variable} ${inter.variable} ${arabic.variable}`}>
      {children}
    </RootDocument>
  );
}
