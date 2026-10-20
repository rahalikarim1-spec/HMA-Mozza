import type { FaqItem } from "./dict";
import type { Lang } from "./types";

export type LandingId = "pizza" | "pasta" | "celebrations";
export const LANDING_SLUGS: Record<LandingId, string> = {
  pizza: "neapolitan-pizza-bangkok",
  pasta: "pasta-bangkok",
  celebrations: "celebrations",
};

export interface LandingData {
  names: { vegetarian: string[]; pork: string[]; priceMin: number; priceMax: number; count: number; branches: string[] };
}

export interface LandingText {
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  intro: string[];
  listTitle: string;
  extraTitle?: string;
  extra?: string[];
  faq: (d: LandingData) => FaqItem[];
}

export interface LandingUi {
  menuCta: string;
  branchesTitle: string;
  branchesIntro: string;
  reserveTitle: string;
  reserveText: string;
  faqTitle: string;
  related: string;
}

// <!-- NEEDS NATIVE REVIEW --> (Thai + Arabic below). Keywords: docs/SEO_PLAN.md. No superlatives / claims beyond the menu PDFs.
const join = (lang: Lang, a: string[]) => a.join(lang === "ar" ? "، " : ", ");
const range = (d: LandingData) => `${d.names.priceMin.toLocaleString("en-US")}–${d.names.priceMax.toLocaleString("en-US")} THB`;

export const landingUi: Record<Lang, LandingUi> = {
  en: { menuCta: "See the full food menu", branchesTitle: "Where to find Mozza", branchesIntro: "Six branches across Bangkok.", reserveTitle: "Reserve a table", reserveText: "Start a reservation request. In this concept demo nothing is sent and no reservation is made.", faqTitle: "Questions", related: "Explore more" },
  th: { menuCta: "ดูเมนูอาหารทั้งหมด", branchesTitle: "สาขา Mozza", branchesIntro: "6 สาขาทั่วกรุงเทพฯ", reserveTitle: "จองโต๊ะ", reserveText: "เริ่มคำขอจอง ในเดโมแนวคิดนี้ไม่มีการส่งข้อมูลและไม่มีการจองจริง", faqTitle: "คำถามที่พบบ่อย", related: "ดูเพิ่มเติม" },
  ar: { menuCta: "اطلع على قائمة الطعام كاملة", branchesTitle: "أين تجد Mozza", branchesIntro: "ستة فروع في أنحاء بانكوك.", reserveTitle: "احجز طاولة", reserveText: "ابدأ طلب حجز. في هذا العرض التجريبي لا يتم إرسال أي شيء ولا يتم أي حجز فعلي.", faqTitle: "أسئلة", related: "اكتشف المزيد" },
};

export const landingText: Record<Lang, Record<LandingId, LandingText>> = {
  en: {
    pizza: {
      title: "Neapolitan Pizza in Bangkok | Mozza Italian Trattoria",
      description: "Neapolitan pizza in Bangkok at Mozza: every pizza on the menu with published prices, pork and vegetarian labels, and 6 branches to reserve.",
      h1: "Neapolitan Pizza in Bangkok",
      breadcrumb: "Neapolitan pizza",
      intro: [
        "Mozza serves wood-fired pizza and handmade pasta, and its own menu text lists authentic Neapolitan pizzas among the Italian classics. Below is every pizza on the published food menu, with its price as published by Mozza.",
        "Toppings range from San Marzano tomato sauce with mozzarella di bufala to truffle, speck and Calabrian 'nduja. Pork and spicy pizzas carry the menu's own icons, and vegetarian pizzas are marked too.",
      ],
      listTitle: "Pizzas on the menu",
      faq: (d) => [
        { q: "Which pizzas are vegetarian?", a: `The menu marks these pizzas as vegetarian: ${join("en", d.names.vegetarian)}. Boscaiola is marked as vegetarian on request but also contains pork (speck).` },
        { q: "Which pizzas contain pork?", a: `Pizzas marked "Contains pork": ${join("en", d.names.pork)}.` },
        { q: "How much is a pizza at Mozza?", a: `Published pizza prices run ${range(d)} (${d.names.count} pizzas). Prices are subject to 10% service charge and 7% VAT, as stated on the menu. Prices as published by Mozza — demo.` },
        { q: "Where can I eat Mozza pizza?", a: `Mozza branches: ${join("en", d.names.branches)}. Which menus each branch serves is to be confirmed with the restaurant.` },
      ],
    },
    pasta: {
      title: "Pasta in Bangkok | Handmade Pasta at Mozza",
      description: "Pasta in Bangkok at Mozza: handmade pasta and risotto with published prices, pork and vegetarian labels, plus 6 Bangkok branches to reserve.",
      h1: "Pasta in Bangkok",
      breadcrumb: "Pasta",
      intro: [
        "Handmade pasta is at the heart of Mozza's Italian menu: tagliolini, ravioli, gnocchi, spaghetti and more, plus carnaroli risottos. Below is every pasta and risotto on the published food menu, with its price as published by Mozza.",
        "Sauces include truffle, San Marzano tomato, pesto and seafood bisque. Pork and spicy dishes carry the menu's own icons; vegetarian dishes are marked too.",
      ],
      listTitle: "Pasta & risotto on the menu",
      faq: (d) => [
        { q: "Which pasta dishes are vegetarian?", a: `The menu marks these as vegetarian: ${join("en", d.names.vegetarian)}.` },
        { q: "Which pasta dishes contain pork?", a: `Marked "Contains pork": ${join("en", d.names.pork)}.` },
        { q: "How much is a pasta dish?", a: `Published prices run ${range(d)} (${d.names.count} pasta and risotto dishes), plus 10% service charge and 7% VAT as stated on the menu. Prices as published by Mozza — demo.` },
        { q: "Where can I eat Mozza pasta?", a: `Mozza branches: ${join("en", d.names.branches)}.` },
      ],
    },
    celebrations: {
      title: "Birthday Dinner in Bangkok | Mozza Celebrations",
      description: "Plan a birthday or family dinner at Mozza Bangkok: sharing boards, desserts and a reservation request with occasion and dietary notes (demo).",
      h1: "Birthday & Family Dinners in Bangkok",
      breadcrumb: "Celebrations",
      intro: [
        "Mozza is an Italian trattoria, and its published menus include sharing boards, pizzas and a dessert selection that suit a table of family or friends. This page collects those dishes and shows how to request a table for an occasion.",
        "Special arrangements for celebrations (cakes, decorations, private areas, set menus) are not published and are to be confirmed with the restaurant; nothing here promises them.",
      ],
      listTitle: "Dishes to share and celebrate with",
      extraTitle: "Planning your table",
      extra: [
        "In the reservation request you can choose an occasion (birthday, anniversary, business, date night), add children or a high chair, note dietary needs such as vegetarian, no pork or allergies, and write special requests. For parties of 13 or more, contact the restaurant.",
      ],
      faq: (d) => [
        { q: "Can I book a table for a birthday dinner?", a: "Yes — start a reservation request and choose Birthday as the occasion. In this concept demo nothing is sent and no reservation is made." },
        { q: "Can I note allergies or no-pork requests?", a: "The reservation request has fields for vegetarian, no pork and a free-text allergy note. Always confirm allergies directly with the restaurant." },
        { q: "What if we are 13 or more?", a: "Parties of 13 or more should contact the restaurant for group bookings; details are to be confirmed." },
        { q: "Which branches can I choose?", a: `${join("en", d.names.branches)}.` },
      ],
    },
  },
  th: {
    pizza: {
      title: "ร้านพิซซ่า พิซซ่านาโปลี เตาฟืน กรุงเทพฯ | Mozza",
      description: "ร้านพิซซ่าในกรุงเทพฯ: พิซซ่านาโปลีและพิซซ่าเตาฟืนที่ Mozza ครบทุกเมนูพร้อมราคาที่เผยแพร่ ป้ายหมูและมังสวิรัติ และ 6 สาขาให้จองโต๊ะ",
      h1: "พิซซ่านาโปลี พิซซ่าเตาฟืน กรุงเทพฯ",
      breadcrumb: "พิซซ่านาโปลี",
      intro: [
        "Mozza เสิร์ฟพิซซ่าเตาฟืนและพาสต้าทำมือ และข้อความในเมนูของ Mozza เองระบุพิซซ่านาโปลีแท้ไว้ในกลุ่มอาหารอิตาเลียนคลาสสิก ด้านล่างคือพิซซ่าทุกเมนูในเมนูอาหารที่เผยแพร่ พร้อมราคาตามที่ Mozza เผยแพร่",
        "หน้าพิซซ่ามีตั้งแต่ซอสมะเขือเทศซานมาร์ซาโนกับมอซซาเรลลาดิบูฟาลา ไปจนถึงทรัฟเฟิล สเปก และนดูยาคาลาเบรีย พิซซ่าที่มีหมูและรสเผ็ดมีไอคอนของเมนูกำกับ และพิซซ่ามังสวิรัติก็มีป้ายระบุเช่นกัน",
      ],
      listTitle: "พิซซ่าในเมนู",
      faq: (d) => [
        { q: "พิซซ่าอะไรบ้างที่เป็นมังสวิรัติ", a: `เมนูระบุว่าพิซซ่าเหล่านี้เป็นมังสวิรัติ: ${join("th", d.names.vegetarian)} ส่วน Boscaiola ระบุว่ามีแบบมังสวิรัติเมื่อร้องขอ แต่มีส่วนผสมของหมู (สเปก)` },
        { q: "พิซซ่าอะไรบ้างที่มีส่วนผสมของหมู", a: `พิซซ่าที่ระบุว่า “มีส่วนผสมของหมู”: ${join("th", d.names.pork)}` },
        { q: "พิซซ่าที่ Mozza ราคาเท่าไร", a: `ราคาพิซซ่าที่เผยแพร่อยู่ที่ ${range(d)} (${d.names.count} เมนู) ยังไม่รวมค่าบริการ 10% และ VAT 7% ตามที่ระบุในเมนู ราคาตามที่ Mozza เผยแพร่ — เดโม` },
        { q: "ทานพิซซ่า Mozza ได้ที่ไหน", a: `สาขา Mozza: ${join("th", d.names.branches)} แต่ละสาขาเสิร์ฟเมนูใดบ้างรอยืนยันกับทางร้าน` },
      ],
    },
    pasta: {
      title: "ร้านพาสต้า พาสต้าเส้นสด กรุงเทพฯ | Mozza",
      description: "ร้านพาสต้าในกรุงเทพฯ: พาสต้าเส้นสดทำมือและริซอตโต้ที่ Mozza พร้อมราคาที่เผยแพร่ ป้ายหมูและมังสวิรัติ และ 6 สาขาให้จองโต๊ะ",
      h1: "พาสต้าเส้นสด ทำมือ กรุงเทพฯ",
      breadcrumb: "พาสต้า",
      intro: [
        "พาสต้าทำมือคือหัวใจของเมนูอิตาเลียนของ Mozza: ตาลิโอลินี ราวีโอลี่ นิยอกกี สปาเกตตี และอื่น ๆ พร้อมริซอตโต้ข้าวคาร์นาโรลี ด้านล่างคือพาสต้าและริซอตโต้ทุกเมนูในเมนูอาหารที่เผยแพร่ พร้อมราคาตามที่ Mozza เผยแพร่",
        "ซอสมีทั้งทรัฟเฟิล มะเขือเทศซานมาร์ซาโน เพสโต้ และบิสก์อาหารทะเล เมนูที่มีหมูและรสเผ็ดมีไอคอนของเมนูกำกับ และเมนูมังสวิรัติก็มีป้ายระบุเช่นกัน",
      ],
      listTitle: "พาสต้าและริซอตโต้ในเมนู",
      faq: (d) => [
        { q: "พาสต้าจานไหนเป็นมังสวิรัติ", a: `เมนูระบุว่าเมนูเหล่านี้เป็นมังสวิรัติ: ${join("th", d.names.vegetarian)}` },
        { q: "พาสต้าจานไหนมีส่วนผสมของหมู", a: `ระบุว่า “มีส่วนผสมของหมู”: ${join("th", d.names.pork)}` },
        { q: "พาสต้าราคาเท่าไร", a: `ราคาที่เผยแพร่อยู่ที่ ${range(d)} (${d.names.count} เมนูพาสต้าและริซอตโต้) ยังไม่รวมค่าบริการ 10% และ VAT 7% ตามที่ระบุในเมนู ราคาตามที่ Mozza เผยแพร่ — เดโม` },
        { q: "ทานพาสต้า Mozza ได้ที่ไหน", a: `สาขา Mozza: ${join("th", d.names.branches)}` },
      ],
    },
    celebrations: {
      title: "ร้านอาหาร วันเกิด ครอบครัว กรุงเทพฯ | Mozza",
      description: "วางแผนมื้อเย็นวันเกิดหรือครอบครัวที่ Mozza กรุงเทพฯ: เมนูแบ่งกันทาน ของหวาน และคำขอจองพร้อมโอกาสพิเศษและข้อมูลด้านอาหาร (เดโม)",
      h1: "ร้านอาหารวันเกิดและมื้อครอบครัว กรุงเทพฯ",
      breadcrumb: "โอกาสพิเศษ",
      intro: [
        "Mozza เป็นทราตตอเรียอิตาเลียน และเมนูที่เผยแพร่มีบอร์ดแบ่งกันทาน พิซซ่า และของหวานที่เหมาะกับโต๊ะของครอบครัวหรือเพื่อนฝูง หน้านี้รวบรวมเมนูเหล่านั้นและแสดงวิธีขอจองโต๊ะสำหรับโอกาสพิเศษ",
        "การจัดเตรียมพิเศษสำหรับการเฉลิมฉลอง (เค้ก ของตกแต่ง พื้นที่ส่วนตัว เซตเมนู) ยังไม่ได้เผยแพร่และรอยืนยันกับทางร้าน หน้านี้ไม่ได้สัญญาว่ามีบริการเหล่านี้",
      ],
      listTitle: "เมนูสำหรับแบ่งกันทานและฉลอง",
      extraTitle: "วางแผนโต๊ะของคุณ",
      extra: [
        "ในคำขอจอง คุณเลือกโอกาส (วันเกิด วันครบรอบ ธุรกิจ เดทไนท์) เพิ่มเด็กหรือเก้าอี้เด็ก ระบุความต้องการด้านอาหาร เช่น มังสวิรัติ ไม่ทานหมู หรือการแพ้อาหาร และเขียนคำขอพิเศษได้ สำหรับกลุ่ม 13 ท่านขึ้นไป โปรดติดต่อร้าน",
      ],
      faq: (d) => [
        { q: "จองโต๊ะมื้อเย็นวันเกิดได้ไหม", a: "ได้ เริ่มคำขอจองแล้วเลือกวันเกิดเป็นโอกาส ในเดโมแนวคิดนี้ไม่มีการส่งข้อมูลและไม่มีการจองจริง" },
        { q: "ระบุการแพ้อาหารหรือไม่ทานหมูได้ไหม", a: "คำขอจองมีช่องสำหรับมังสวิรัติ ไม่ทานหมู และบันทึกการแพ้อาหารแบบข้อความอิสระ โปรดยืนยันเรื่องการแพ้อาหารกับทางร้านโดยตรงเสมอ" },
        { q: "ถ้าไปกัน 13 ท่านขึ้นไป", a: "กลุ่ม 13 ท่านขึ้นไปควรติดต่อร้านเพื่อจองสำหรับกลุ่ม รายละเอียดรอยืนยัน" },
        { q: "เลือกสาขาไหนได้บ้าง", a: `${join("th", d.names.branches)}` },
      ],
    },
  },
  ar: {
    pizza: {
      title: "بيتزا نابولية في بانكوك | Mozza مطعم إيطالي",
      description: "بيتزا نابولية في بانكوك لدى Mozza: كل بيتزا في القائمة بأسعارها المنشورة وإشارات الخنزير والنباتي، و6 فروع للحجز.",
      h1: "بيتزا نابولية في بانكوك",
      breadcrumb: "بيتزا نابولية",
      intro: [
        "يقدّم Mozza بيتزا بفرن الحطب ومعكرونة مصنوعة يدويًا، ويذكر نص قائمته بيتزا نابولية أصيلة ضمن الأطباق الإيطالية الكلاسيكية. فيما يلي كل بيتزا في قائمة الطعام المنشورة بسعرها كما نشره Mozza.",
        "تتراوح الإضافات من صلصة الطماطم سان مارزانو مع موزاريلا دي بوفالا إلى الكمأة والسبيك والنودجا الكالابرية. وتحمل البيتزا التي تحتوي على لحم الخنزير أو الحارة رموز القائمة نفسها، كما أن البيتزا النباتية موسومة.",
      ],
      listTitle: "البيتزا في القائمة",
      faq: (d) => [
        { q: "ما أنواع البيتزا النباتية؟", a: `تشير القائمة إلى أن هذه الأنواع نباتية: ${join("ar", d.names.vegetarian)}. أما Boscaiola فمتوفرة بنسخة نباتية عند الطلب لكنها تحتوي أيضًا على لحم الخنزير (سبيك).` },
        { q: "ما أنواع البيتزا التي تحتوي على لحم الخنزير؟", a: `البيتزا الموسومة «يحتوي على لحم الخنزير»: ${join("ar", d.names.pork)}.` },
        { q: "كم سعر البيتزا في Mozza؟", a: `تتراوح أسعار البيتزا المنشورة بين ${range(d)} (${d.names.count} بيتزا)، مع رسوم خدمة 10% وضريبة قيمة مضافة 7% كما هو مذكور في القائمة. الأسعار كما نشرها Mozza — عرض تجريبي.` },
        { q: "أين أتناول بيتزا Mozza؟", a: `فروع Mozza: ${join("ar", d.names.branches)}. أما القوائم التي يقدّمها كل فرع فبانتظار التأكيد.` },
      ],
    },
    pasta: {
      title: "معكرونة في بانكوك | معكرونة منزلية لدى Mozza",
      description: "معكرونة في بانكوك لدى Mozza: معكرونة وريزوتو منزليان بأسعار منشورة وإشارات الخنزير والنباتي، و6 فروع في بانكوك للحجز.",
      h1: "معكرونة في بانكوك",
      breadcrumb: "المعكرونة",
      intro: [
        "المعكرونة المصنوعة يدويًا في قلب قائمة Mozza الإيطالية: تاغليوليني ورافيولي ونوكي وسباغيتي وغيرها، إلى جانب ريزوتو كارنارولي. فيما يلي كل معكرونة وريزوتو في قائمة الطعام المنشورة بسعرها كما نشره Mozza.",
        "تشمل الصلصات الكمأة والطماطم سان مارزانو والبيستو وبيسك المأكولات البحرية. وتحمل الأطباق التي تحتوي على لحم الخنزير أو الحارة رموز القائمة نفسها، كما أن الأطباق النباتية موسومة.",
      ],
      listTitle: "المعكرونة والريزوتو في القائمة",
      faq: (d) => [
        { q: "ما أطباق المعكرونة النباتية؟", a: `تشير القائمة إلى أن هذه الأطباق نباتية: ${join("ar", d.names.vegetarian)}.` },
        { q: "ما أطباق المعكرونة التي تحتوي على لحم الخنزير؟", a: `الموسومة «يحتوي على لحم الخنزير»: ${join("ar", d.names.pork)}.` },
        { q: "كم سعر طبق المعكرونة؟", a: `تتراوح الأسعار المنشورة بين ${range(d)} (${d.names.count} طبق معكرونة وريزوتو)، مع رسوم خدمة 10% وضريبة 7% كما في القائمة. الأسعار كما نشرها Mozza — عرض تجريبي.` },
        { q: "أين أتناول معكرونة Mozza؟", a: `فروع Mozza: ${join("ar", d.names.branches)}.` },
      ],
    },
    celebrations: {
      title: "عشاء عيد ميلاد في بانكوك | مناسبات Mozza",
      description: "خطّط لعشاء عيد ميلاد أو عائلة في Mozza بانكوك: أطباق للمشاركة وحلويات وطلب حجز مع المناسبة والملاحظات الغذائية (تجريبي).",
      h1: "عشاء أعياد الميلاد والعائلة في بانكوك",
      breadcrumb: "المناسبات",
      intro: [
        "Mozza تراتوريا إيطالية، وتتضمن قوائمه المنشورة ألواحًا للمشاركة وبيتزا وتشكيلة حلويات تناسب طاولة عائلة أو أصدقاء. تجمع هذه الصفحة تلك الأطباق وتوضح كيفية طلب طاولة لمناسبة.",
        "الترتيبات الخاصة للاحتفالات (كعك وزينة ومناطق خاصة وقوائم محددة) غير منشورة وبانتظار التأكيد من المطعم؛ ولا تَعِد هذه الصفحة بها.",
      ],
      listTitle: "أطباق للمشاركة والاحتفال",
      extraTitle: "خطّط لطاولتك",
      extra: [
        "في طلب الحجز يمكنك اختيار المناسبة (عيد ميلاد أو ذكرى سنوية أو عمل أو موعد رومانسي) وإضافة أطفال أو كرسي أطفال وذكر الاحتياجات الغذائية مثل نباتي أو بدون لحم الخنزير أو الحساسية وكتابة طلبات خاصة. للمجموعات من 13 شخصًا فأكثر يرجى التواصل مع المطعم.",
      ],
      faq: (d) => [
        { q: "هل يمكنني حجز طاولة لعشاء عيد ميلاد؟", a: "نعم — ابدأ طلب حجز واختر «عيد ميلاد» كمناسبة. في هذا العرض التجريبي لا يتم إرسال أي شيء ولا يتم أي حجز فعلي." },
        { q: "هل يمكنني ذكر الحساسية أو طلب بدون لحم الخنزير؟", a: "يتضمن طلب الحجز حقولًا للنباتي وبدون لحم الخنزير وملاحظة حرة للحساسية. أكّد الحساسية مع المطعم مباشرة دائمًا." },
        { q: "ماذا لو كنا 13 شخصًا أو أكثر؟", a: "يرجى للمجموعات من 13 فأكثر التواصل مع المطعم لحجز المجموعات؛ والتفاصيل بانتظار التأكيد." },
        { q: "أي الفروع يمكنني اختيارها؟", a: `${join("ar", d.names.branches)}.` },
      ],
    },
  },
};
