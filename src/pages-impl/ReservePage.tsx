import type { Metadata } from "next";
import { getDict } from "@/content";
import { reservationUi } from "@/content/reservation-ui";
import type { Lang } from "@/content/types";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbLd, organizationLd } from "@/lib/jsonld";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { container } from "@/lib/ui";
import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ReservePageClient from "@/components/reservation/ReservePageClient";

const meta: Record<Lang, { title: string; description: string; intro: string; noscript: string }> = {
  en: { title: "Reserve a Table | Mozza Italian Trattoria Bangkok", description: "Start a table reservation request at Mozza Bangkok: choose a branch, date, time and seating. Concept demo — nothing is sent and no booking is made.", intro: "Choose a branch, date, time and seating preference in a few steps. This is a concept demo: nothing is sent or stored and no reservation is made.", noscript: "This demo reservation flow needs JavaScript." },
  th: { title: "จองโต๊ะ | Mozza ร้านอาหารอิตาเลียน กรุงเทพฯ", description: "เริ่มคำขอจองโต๊ะที่ Mozza กรุงเทพฯ: เลือกสาขา วันที่ เวลา และที่นั่ง เดโมแนวคิด — ไม่มีการส่งข้อมูลและไม่มีการจองจริง", intro: "เลือกสาขา วันที่ เวลา และที่นั่งที่ต้องการในไม่กี่ขั้นตอน นี่คือเดโมแนวคิด: ไม่มีการส่งหรือเก็บข้อมูลและไม่มีการจองจริง", noscript: "ขั้นตอนจองโต๊ะแบบเดโมนี้ต้องใช้ JavaScript" },
  ar: { title: "احجز طاولة | Mozza مطعم إيطالي في بانكوك", description: "ابدأ طلب حجز طاولة في Mozza بانكوك: اختر الفرع والتاريخ والوقت والجلوس. عرض تجريبي — لا يتم إرسال شيء ولا حجز فعلي.", intro: "اختر الفرع والتاريخ والوقت وتفضيل الجلوس في خطوات قليلة. هذا عرض تجريبي للفكرة: لا يتم إرسال أو حفظ أي شيء ولا يتم أي حجز.", noscript: "يحتاج مسار الحجز التجريبي هذا إلى JavaScript." },
};

export function reserveMetadata(lang: Lang): Metadata {
  return buildMetadata(lang, "reserve", { title: meta[lang].title, description: meta[lang].description });
}

export function ReservePage({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const m = meta[lang];
  return (
    <PageShell lang={lang} route="reserve">
      <JsonLd data={organizationLd()} />
      <JsonLd
        data={breadcrumbLd([
          { name: d.common.breadcrumbHome, url: absoluteUrl(lang) },
          { name: reservationUi[lang].title, url: absoluteUrl(lang, "reserve") },
        ])}
      />
      <section className="bg-mustard">
        <div className={`${container} py-6 md:py-10`}>
          <Breadcrumbs label={d.common.breadcrumbLabel} items={[{ name: d.common.breadcrumbHome, href: pathFor(lang) }, { name: reservationUi[lang].title }]} />
          <h1 className="mt-4 text-4xl sm:text-5xl">{reservationUi[lang].title}</h1>
          <p className="mt-3 max-w-prose text-lg">{m.intro}</p>
        </div>
      </section>
      <section className="bg-mustard pb-12">
        <div className={`${container} max-w-3xl`}>
          <div className="rounded-sm border-2 border-ink bg-cream p-4 sm:p-6">
            <ReservePageClient lang={lang} />
            <noscript>{m.noscript}</noscript>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
