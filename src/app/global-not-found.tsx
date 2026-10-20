import type { Metadata } from "next";
import "./globals.css";
import { display } from "@/fonts/display";
import { inter } from "@/fonts/inter";
import { thai } from "@/fonts/thai";
import { arabic } from "@/fonts/arabic";
import { getDict } from "@/content";
import { company } from "@/content/company";
import { LANGS, type Lang } from "@/content/types";
import { pathFor } from "@/lib/routes";
import Banner from "@/components/Banner";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "404 | Mozza concept demo",
  description: "Page not found — Mozza concept demo.",
  robots: { index: false, follow: false },
};

/** Static hosts serve ONE 404.html, so it shows all three languages. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable} ${thai.variable} ${arabic.variable}`}>
      <body>
        <Banner d={getDict("en")} />
        <main className="mx-auto max-w-3xl px-4 py-10">
          <Logo className="h-16 w-auto" />
          {LANGS.map((l: Lang) => {
            const n = company[l].notFound;
            const d = getDict(l);
            return (
              <section key={l} lang={d.htmlLang} dir={d.dir} className="mt-8 rounded-sm bg-cream p-6">
                <h1 className="text-3xl">404 — {n.h1}</h1>
                <p className="mt-2">{n.text}</p>
                <p className="mt-4 flex flex-wrap gap-4 font-semibold underline underline-offset-4">
                  <a href={pathFor(l)}>{n.home}</a>
                  <a href={pathFor(l, "menu")}>{n.menu}</a>
                  <a href={pathFor(l, "locations")}>{n.locations}</a>
                </p>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
