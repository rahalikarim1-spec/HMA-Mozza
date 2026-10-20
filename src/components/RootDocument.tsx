import type { ReactNode } from "react";
import type { Lang } from "@/content/types";
import { getDict } from "@/content";
import "@/app/globals.css";
import ScrollToTop from "./ScrollToTop";
import ReservationLauncher from "./reservation/ReservationLauncher";

/**
 * Shared <html>/<body>. Each route group (English "/" and "[lang]" for TH/AR)
 * has its own root layout that calls this with the right language + font classes.
 */
export default function RootDocument({
  lang,
  fontClass,
  children,
}: {
  lang: Lang;
  fontClass: string;
  children: ReactNode;
}) {
  const d = getDict(lang);
  return (
    <html lang={d.htmlLang} dir={d.dir} className={fontClass}>
      <head>
        {/* Demo dataLayer - events are also console.logged (see src/lib/track.ts).
            GTM is intentionally commented out; real container ID goes here later. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
/* GTM snippet (disabled in the concept demo) - container "GTM-XXXXXXX":
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');
*/`,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollToTop />
        <ReservationLauncher lang={lang} />
      </body>
    </html>
  );
}
