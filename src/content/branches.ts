import type { BranchText, FaqItem } from "./dict";
import type { BranchSlug, Lang } from "./types";

/**
 * Per-branch copy for EN / TH / AR. Facts only from: the menu PDFs (food.pdf p.2), src/config/site.ts, the demo brief.
 * Transit / landmark are null (hidden) unless the menu itself states them. Thai + Arabic: <!-- NEEDS NATIVE REVIEW -->
 */
interface Facts {
  name: string;
  mall: Record<Lang, string>;
  district: Record<Lang, string | null>;
  imageAlt: Record<Lang, string>;
}

const FACTS: Record<BranchSlug, Facts> = {
  "central-park": {
    name: "Mozza Central Park",
    mall: { en: "Dusit Central Park", th: "ดุสิต เซ็นทรัล พาร์ค", ar: "دوسيت سنترال بارك" },
    district: { en: "Silom · Sathorn · Lumphini", th: "สีลม · สาทร · ลุมพินี", ar: "سيلوم · ساثورن · لومبيني" },
    imageAlt: {
      en: "Mozza storefront with open entrance and diners at outdoor-style tables (demo photo)",
      th: "หน้าร้าน Mozza ทางเข้าเปิดโล่ง และแขกที่นั่งโต๊ะอาหารด้านหน้า (ภาพตัวอย่าง)",
      ar: "واجهة مطعم Mozza بمدخل مفتوح وزبائن يجلسون على طاولات أمام المطعم (صورة تجريبية)",
    },
  },
  emquartier: {
    name: "Mozza EmQuartier",
    mall: { en: "EmQuartier", th: "เอ็มควอเทียร์", ar: "إم كوارتيير" },
    district: { en: "Sukhumvit Road", th: "ถนนสุขุมวิท", ar: "شارع سوخومفيت" },
    imageAlt: {
      en: "Mozza dining room with a lit MOZZA sign, wood panelling, hanging plants and set tables (demo photo)",
      th: "ห้องอาหาร Mozza ป้ายไฟ MOZZA ผนังไม้ ต้นไม้แขวน และโต๊ะอาหารที่จัดเตรียมไว้ (ภาพตัวอย่าง)",
      ar: "قاعة طعام Mozza بلافتة MOZZA مضاءة وجدران خشبية ونباتات معلقة وطاولات مجهزة (صورة تجريبية)",
    },
  },
  "siam-paragon": {
    name: "Mozza Siam Paragon",
    mall: { en: "Siam Paragon", th: "สยามพารากอน", ar: "سيام باراغون" },
    district: { en: "Rama I Road", th: "ถนนพระราม 1", ar: "شارع راما 1" },
    imageAlt: {
      en: "Mozza restaurant front with arched wooden windows and a pizza oven visible inside (demo photo)",
      th: "หน้าร้าน Mozza หน้าต่างไม้โค้ง และเตาพิซซ่าที่มองเห็นจากด้านใน (ภาพตัวอย่าง)",
      ar: "واجهة مطعم Mozza بنوافذ خشبية مقوسة وفرن بيتزا ظاهر في الداخل (صورة تجريبية)",
    },
  },
  iconsiam: {
    name: "Mozza ICONSIAM",
    mall: { en: "ICONSIAM", th: "ไอคอนสยาม", ar: "آيكون سيام" },
    district: { en: "Charoen Nakhon Road · Khlong San", th: "ถนนเจริญนคร · คลองสาน", ar: "شارع تشاروين ناكون · خلونغ سان" },
    imageAlt: {
      en: "Chef ladling sauce at a table of Italian dishes while a guest looks on (demo photo)",
      th: "เชฟกำลังราดซอสที่โต๊ะอาหารอิตาเลียน โดยมีแขกนั่งมองอยู่ (ภาพตัวอย่าง)",
      ar: "طاهٍ يسكب الصلصة على طاولة أطباق إيطالية بينما تنظر إليه ضيفة (صورة تجريبية)",
    },
  },
  "central-chidlom": {
    name: "Mozza Central Chidlom",
    mall: { en: "Central Chidlom", th: "เซ็นทรัล ชิดลม", ar: "سنترال شيدلوم" },
    district: { en: null, th: null, ar: null },
    imageAlt: {
      en: "Placeholder photo of Mozza Central Chidlom",
      th: "ภาพตัวอย่างแทนของ Mozza Central Chidlom",
      ar: "صورة نائبة لـ Mozza Central Chidlom",
    },
  },
  "central-world": {
    name: "Mozza CentralWorld",
    mall: { en: "CentralWorld", th: "เซ็นทรัลเวิลด์", ar: "سنترال وورلد" },
    district: { en: null, th: null, ar: null },
    imageAlt: {
      en: "Placeholder photo of Mozza CentralWorld",
      th: "ภาพตัวอย่างแทนของ Mozza CentralWorld",
      ar: "صورة نائبة لـ Mozza CentralWorld",
    },
  },
};

interface Tpl {
  h1: (n: string, mall: string) => string;
  title: (n: string, mall: string) => string;
  description: (n: string, mall: string, road: string | null) => string;
  intro: Record<BranchSlug, string[]>;
  transit: Partial<Record<BranchSlug, string>>;
  landmark: Partial<Record<BranchSlug, string>>;
  faq: (n: string, slug: BranchSlug) => FaqItem[];
}

const TPL: Record<Lang, Tpl> = {
  en: {
    h1: (n, mall) => `${n} — Italian Restaurant at ${mall}`,
    title: (n) => `${n} | Italian Restaurant Bangkok`,
    description: (n, mall, road) =>
      `${n} at ${mall}${road ? `, ${road}` : ""}: Italian trattoria with handmade pasta and Neapolitan pizza. See menus, directions and reserve (demo).`,
    intro: {
      "central-park": [
        "Mozza Central Park is on the ground floor of Dusit Central Park, on Rama IV Road in the Silom–Sathorn–Lumphini area. Mozza describes the spot as perfectly situated beside Lumphini Park, where Bangkok's vibrant energy meets its most treasured green sanctuary.",
        "The menu offers the Italian classics: handmade pasta, authentic Neapolitan pizzas, creamy risottos and rich tiramisu. Mozza notes the branch has direct BTS and MRT connections, in one of the city's most prestigious areas where the bustling CBD meets tranquil parkland.",
        "Whether it is lunch between meetings, catching up with friends over wine or a relaxed dinner, the branch serves the same flavours. Check the menus for pork and alcohol labels, then reserve a table.",
      ],
      emquartier: ["Mozza EmQuartier serves Mozza's Italian menu on the ground floor of EmQuartier, on Sukhumvit Road."],
      "siam-paragon": ["Mozza Siam Paragon serves Mozza's Italian menu on the ground floor of Siam Paragon (Room G31), on Rama I Road."],
      iconsiam: ["Mozza ICONSIAM serves Mozza's Italian menu on the ground floor of ICONSIAM, on Charoen Nakhon Road in Khlong San."],
      "central-chidlom": ["Mozza Central Chidlom is on the first floor of Central Chidlom. Mozza's afternoon tea sets, everyday 2–5 pm, are available exclusively at this branch."],
      "central-world": ["Details for Mozza CentralWorld are being confirmed."],
    },
    transit: { "central-park": "Direct BTS and MRT connections (as stated by Mozza)" },
    landmark: { "central-park": "Beside Lumphini Park (as stated by Mozza)" },
    faq: (n, slug) => [
      { q: `How do I reserve a table at ${n}?`, a: `Press Reserve to start a reservation request for ${n}. In this concept demo nothing is sent and no reservation is made.` },
      { q: "Which menus does Mozza publish?", a: "Four menus: Food, Brunch & Breakfast (everyday until 12pm), Aperitivo (everyday 4pm–7pm) and Afternoon Tea (everyday 2–5pm, Mozza Chidlom only). Which menus each branch serves is to be confirmed with the restaurant." },
      slug === "central-chidlom"
        ? { q: "Where can I have afternoon tea?", a: "Mozza states that its afternoon tea sets are available exclusively at Mozza Chidlom, everyday from 2 to 5 pm." }
        : slug === "central-park"
          ? { q: "Is Mozza Central Park near public transport?", a: "Mozza states the Central Park branch has direct BTS and MRT connections." }
          : { q: `Where is ${n}?`, a: "Use the Directions button to open the location in Google Maps." },
    ],
  },
  th: {
    h1: (n, mall) => `${n} — ร้านอาหารอิตาเลียน ${mall}`,
    title: (n) => `${n} | ร้านอาหารอิตาเลียน กรุงเทพฯ`,
    description: (n, mall, road) =>
      `${n} ที่${mall}${road ? ` ${road}` : ""}: ทราตตอเรียอิตาเลียน พาสต้าทำมือ พิซซ่านาโปลี ดูเมนู เส้นทาง และจองโต๊ะ (เดโม)`,
    intro: {
      "central-park": [
        "Mozza Central Park ตั้งอยู่ชั้นล่างของดุสิต เซ็นทรัล พาร์ค ถนนพระราม 4 ย่านสีลม–สาทร–ลุมพินี Mozza อธิบายว่าทำเลอยู่ข้างสวนลุมพินีอย่างลงตัว จุดที่พลังชีวิตของกรุงเทพฯ มาพบกับพื้นที่สีเขียวอันล้ำค่าที่สุดของเมือง",
        "เมนูมีอาหารอิตาเลียนคลาสสิก: พาสต้าทำมือ พิซซ่านาโปลีแท้ ริซอตโต้เนื้อครีม และทีรามิสุเข้มข้น Mozza ระบุว่าสาขานี้เชื่อมต่อ BTS และ MRT โดยตรง ในย่านที่มีชื่อเสียงที่สุดแห่งหนึ่งของเมือง ที่ซึ่งย่านธุรกิจใจกลางเมืองพบกับสวนสาธารณะอันสงบ",
        "ไม่ว่าจะเป็นมื้อกลางวันระหว่างประชุม การพบปะเพื่อนฝูงพร้อมไวน์ หรือมื้อเย็นสบาย ๆ สาขานี้เสิร์ฟรสชาติเดียวกัน โปรดดูป้ายระบุส่วนผสมของหมูและแอลกอฮอล์ในเมนู แล้วจองโต๊ะ",
      ],
      emquartier: ["Mozza EmQuartier เสิร์ฟเมนูอิตาเลียนของ Mozza ที่ชั้นล่างของเอ็มควอเทียร์ ถนนสุขุมวิท"],
      "siam-paragon": ["Mozza Siam Paragon เสิร์ฟเมนูอิตาเลียนของ Mozza ที่ชั้นล่างของสยามพารากอน (ห้อง G31) ถนนพระราม 1"],
      iconsiam: ["Mozza ICONSIAM เสิร์ฟเมนูอิตาเลียนของ Mozza ที่ชั้นล่างของไอคอนสยาม ถนนเจริญนคร เขตคลองสาน"],
      "central-chidlom": ["Mozza Central Chidlom ตั้งอยู่ชั้น 1 ของเซ็นทรัล ชิดลม เซตอาฟเตอร์นูนทีของ Mozza ทุกวัน 14.00–17.00 น. มีเฉพาะที่สาขานี้"],
      "central-world": ["รายละเอียดของ Mozza CentralWorld อยู่ระหว่างการยืนยัน"],
    },
    transit: { "central-park": "เชื่อมต่อ BTS และ MRT โดยตรง (ตามที่ Mozza ระบุ)" },
    landmark: { "central-park": "ข้างสวนลุมพินี (ตามที่ Mozza ระบุ)" },
    faq: (n, slug) => [
      { q: `จองโต๊ะที่ ${n} ได้อย่างไร`, a: `กดปุ่มจองโต๊ะเพื่อเริ่มคำขอจองสำหรับ ${n} ในเดโมแนวคิดนี้ ไม่มีการส่งข้อมูลและไม่มีการจองจริง` },
      { q: "Mozza มีเมนูอะไรบ้าง", a: "4 เมนู: อาหาร บรันช์และอาหารเช้า (ทุกวันถึง 12.00 น.) อาเปริติโว (ทุกวัน 16.00–19.00 น.) และอาฟเตอร์นูนที (ทุกวัน 14.00–17.00 น. เฉพาะ Mozza Chidlom) แต่ละสาขาเสิร์ฟเมนูใดบ้างรอยืนยันกับทางร้าน" },
      slug === "central-chidlom"
        ? { q: "ทานอาฟเตอร์นูนทีได้ที่ไหน", a: "Mozza ระบุว่าเซตอาฟเตอร์นูนทีมีเฉพาะที่ Mozza Chidlom ทุกวัน 14.00–17.00 น." }
        : slug === "central-park"
          ? { q: "Mozza Central Park ใกล้ระบบขนส่งสาธารณะไหม", a: "Mozza ระบุว่าสาขา Central Park เชื่อมต่อ BTS และ MRT โดยตรง" }
          : { q: `${n} อยู่ที่ไหน`, a: "กดปุ่มเส้นทางเพื่อเปิดตำแหน่งใน Google Maps" },
    ],
  },
  ar: {
    h1: (n, mall) => `${n} — مطعم إيطالي في ${mall}`,
    title: (n) => `${n} | مطعم إيطالي في بانكوك`,
    description: (n, mall, road) =>
      `${n} في ${mall}${road ? `، ${road}` : ""}: تراتوريا إيطالية بمعكرونة منزلية وبيتزا نابولية. القوائم والاتجاهات والحجز (تجريبي).`,
    intro: {
      "central-park": [
        "يقع Mozza Central Park في الطابق الأرضي من دوسيت سنترال بارك على شارع راما 4 في منطقة سيلوم وساثورن ولومبيني. ويصف Mozza الموقع بأنه يقع بمحاذاة حديقة لومبيني، حيث تلتقي حيوية بانكوك بأثمن ملاذ أخضر فيها.",
        "تقدّم القائمة الأطباق الإيطالية الكلاسيكية: معكرونة منزلية وبيتزا نابولية أصيلة وريزوتو كريمي وتيراميسو غني. ويذكر Mozza أن الفرع متصل مباشرة بشبكتي BTS وMRT، في واحدة من أرقى مناطق المدينة حيث يلتقي قلب الأعمال الصاخب بالمنتزه الهادئ.",
        "سواء كان غداءً بين الاجتماعات أو لقاءً مع الأصدقاء على كأس نبيذ أو عشاءً هادئًا، يقدّم الفرع النكهات نفسها. يرجى الاطلاع على إشارات لحم الخنزير والكحول في القوائم ثم احجز طاولة.",
      ],
      emquartier: ["يقدّم Mozza EmQuartier قائمة Mozza الإيطالية في الطابق الأرضي من إم كوارتيير على شارع سوخومفيت."],
      "siam-paragon": ["يقدّم Mozza Siam Paragon قائمة Mozza الإيطالية في الطابق الأرضي من سيام باراغون (الغرفة G31) على شارع راما 1."],
      iconsiam: ["يقدّم Mozza ICONSIAM قائمة Mozza الإيطالية في الطابق الأرضي من آيكون سيام على شارع تشاروين ناكون في خلونغ سان."],
      "central-chidlom": ["يقع Mozza Central Chidlom في الطابق الأول من سنترال شيدلوم. أطقم شاي بعد الظهر من Mozza، يوميًا من 2 إلى 5 مساءً، متوفرة حصريًا في هذا الفرع."],
      "central-world": ["تفاصيل Mozza CentralWorld قيد التأكيد."],
    },
    transit: { "central-park": "اتصال مباشر بشبكتي BTS وMRT (كما ذكر Mozza)" },
    landmark: { "central-park": "بمحاذاة حديقة لومبيني (كما ذكر Mozza)" },
    faq: (n, slug) => [
      { q: `كيف أحجز طاولة في ${n}؟`, a: `اضغط «احجز طاولة» لبدء طلب حجز في ${n}. في هذا العرض التجريبي لا يتم إرسال أي شيء ولا يتم أي حجز فعلي.` },
      { q: "ما القوائم التي ينشرها Mozza؟", a: "أربع قوائم: الطعام، والبرانش والإفطار (يوميًا حتى 12 ظهرًا)، والأبريتيفو (يوميًا من 4 إلى 7 مساءً)، وشاي بعد الظهر (يوميًا من 2 إلى 5 مساءً في Mozza Chidlom فقط). أما القوائم التي يقدّمها كل فرع فبانتظار التأكيد من المطعم." },
      slug === "central-chidlom"
        ? { q: "أين أستمتع بشاي بعد الظهر؟", a: "يذكر Mozza أن أطقم شاي بعد الظهر متوفرة حصريًا في Mozza Chidlom يوميًا من 2 إلى 5 مساءً." }
        : slug === "central-park"
          ? { q: "هل Mozza Central Park قريب من وسائل النقل العام؟", a: "يذكر Mozza أن فرع Central Park متصل مباشرة بشبكتي BTS وMRT." }
          : { q: `أين يقع ${n}؟`, a: "استخدم زر الاتجاهات لفتح الموقع في خرائط Google." },
    ],
  },
};

export function branchTexts(lang: Lang): Record<BranchSlug, BranchText> {
  const t = TPL[lang];
  const out = {} as Record<BranchSlug, BranchText>;
  (Object.keys(FACTS) as BranchSlug[]).forEach((slug) => {
    const f = FACTS[slug];
    const road = f.district[lang];
    out[slug] = {
      mall: f.mall[lang],
      district: road,
      h1: t.h1(f.name, f.mall[lang]),
      metaTitle: t.title(slug === "central-park" ? "Mozza Dusit Central Park" : f.name, f.mall[lang]),
      metaDescription: t.description(f.name, f.mall[lang], road),
      imageAlt: f.imageAlt[lang],
      intro: t.intro[slug],
      transit: t.transit[slug] ?? null,
      landmark: t.landmark[slug] ?? null,
      faq: t.faq(f.name, slug),
    };
  });
  return out;
}
