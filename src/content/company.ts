import type { Lang } from "./types";

/** Brand, company, delivery, contact, blog and 404 copy. Facts only from the menu PDFs (food.pdf pp.1-2, aperitivo.pdf), /context and the demo brief.
 *  Thai + Arabic: <!-- NEEDS NATIVE REVIEW --> */
export interface PostText {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  body: string[];
  menu: "food" | "aperitivo";
  menuLabel: string;
  branches: [string, string]; // branch slugs
}

export interface CompanyText {
  footer: { menus: string; company: string; otherHma: string; partOf: string; languages: string; branches: string; follow: string; copyDemo: string };
  links: { about: string; privilege: string; delivery: string; contact: string; blog: string; hmaSite: string };
  about: { title: string; description: string; h1: string; body: string[]; pending: string; brandsTitle: string; locationsTitle: string };
  privilege: { title: string; description: string; h1: string; body: string[]; link: string; pending: string };
  delivery: { title: string; description: string; h1: string; intro: string; order: string; demoLink: string; branchesTitle: string };
  contact: { title: string; description: string; h1: string; intro: string; messageTitle: string; visitTitle: string; onlineTitle: string; website: string; pending: string; groupTitle: string };
  blog: { title: string; description: string; h1: string; intro: string; demoExcerpt: string; read: string; related: string; viewMenu: string; atBranches: string; back: string };
  posts: PostText[];
  notFound: { h1: string; text: string; home: string; menu: string; locations: string };
}

export const company: Record<Lang, CompanyText> = {
  en: {
    footer: { menus: "Menus", company: "Company", otherHma: "Other HMA restaurants", partOf: "Part of Hospitality Management Asia", languages: "Language", branches: "Branches", follow: "Follow", copyDemo: "Private concept demo. Not the official Mozza website. Not indexed." },
    links: { about: "About", privilege: "HMA Privilege", delivery: "Delivery", contact: "Contact", blog: "Blog", hmaSite: "hmgtasia.net" },
    about: {
      title: "About Mozza | La Cucina di Mamma, Italian Trattoria",
      description: "About Mozza, the Italian trattoria in Bangkok: La Cucina di Mamma, handmade pasta, Neapolitan pizza, part of Hospitality Management Asia.",
      h1: "About Mozza",
      body: [
        "Mozza — Mozza by Cocotte, as printed on its menus — is an Italian trattoria in Bangkok serving La Cucina di Mamma: wood-fired pizza and handmade pasta.",
        "Its published menus list the Italian classics: handmade pasta, authentic Neapolitan pizzas, creamy risottos and rich tiramisu, alongside breakfast, aperitivo and afternoon tea.",
        "Mozza is part of Hospitality Management Asia (HMA).",
      ],
      pending: "The full brand story will be added from the current Mozza website once its wording is confirmed.",
      brandsTitle: "Part of Hospitality Management Asia",
      locationsTitle: "Branches",
    },
    privilege: {
      title: "HMA Privilege | Hospitality Management Asia Restaurants",
      description: "HMA Privilege is linked to Hospitality Management Asia, the group behind Mozza and its sister restaurants. Programme details to be confirmed.",
      h1: "HMA Privilege",
      body: [
        "HMA Privilege is linked to Hospitality Management Asia (HMA), the group behind Mozza and its sister restaurants.",
        "Programme details — benefits, eligibility and how to join — are not shown until they are confirmed.",
      ],
      link: "Visit Hospitality Management Asia (hmgtasia.net)",
      pending: "Details to be confirmed.",
    },
    delivery: {
      title: "Delivery | Mozza Italian Trattoria Bangkok",
      description: "Delivery for Mozza Bangkok branches. Availability differs by branch and is to be confirmed; ordering links on this demo page are placeholders.",
      h1: "Delivery",
      intro: "Delivery availability differs by branch and is to be confirmed with the restaurant group. The ordering links below are demo placeholders and lead nowhere.",
      order: "Order delivery",
      demoLink: "demo link",
      branchesTitle: "Choose your branch",
    },
    contact: {
      title: "Contact Mozza | Italian Trattoria Bangkok",
      description: "Contact Mozza Bangkok: message by WhatsApp or LINE (demo links), find each branch and get directions, or follow Mozza online.",
      h1: "Contact Mozza",
      intro: "Message the team, find a branch or follow Mozza online. This page has no contact form and collects no data.",
      messageTitle: "Message us (demo links)",
      visitTitle: "Visit a branch",
      onlineTitle: "Online",
      website: "Website",
      pending: "Phone numbers and email addresses are not shown until they are confirmed.",
      groupTitle: "Group",
    },
    blog: {
      title: "Blog | Mozza Italian Trattoria Bangkok",
      description: "Mozza blog (demo): fresh Italian food and aperitivo in Bangkok, with links to the menus and branches. Excerpts only.",
      h1: "Mozza Blog",
      intro: "Two demo posts based on existing Mozza article titles. Bodies are marked as demo excerpts.",
      demoExcerpt: "Demo excerpt",
      read: "Read the excerpt",
      related: "Related",
      viewMenu: "See the menu",
      atBranches: "Visit",
      back: "All posts",
    },
    posts: [
      {
        slug: "fresh-italian-food-at-mozza",
        title: "Fresh Italian Food at Mozza: It Starts With the Ingredients",
        metaTitle: "Fresh Italian Food at Mozza | Ingredients",
        description: "Demo excerpt: the ingredients named on Mozza's menus, from San Marzano tomato and mozzarella di bufala to carnaroli rice and homemade pasta.",
        excerpt: "Ingredients named on Mozza's published menus, from San Marzano tomato to homemade pasta.",
        body: [
          "Mozza's published menus name a number of ingredients: San Marzano tomato sauce on pizzas and pasta, mozzarella di bufala, stracciatella and burrata, Parma ham aged 30 months, aged Grana Padano, truffle, and carnaroli rice for its risottos.",
          "Several items are described as homemade: pesto, focaccia and pizza bread, ravioli, tagliolini and gelato. Pork items are marked with the menu's own icon.",
          "This is a demo excerpt; the full article text is not part of the concept demo.",
        ],
        menu: "food",
        menuLabel: "Food menu",
        branches: ["central-park", "emquartier"],
      },
      {
        slug: "aperitivo-in-bangkok",
        title: "Aperitivo in Bangkok: The Italian Tradition at Mozza",
        metaTitle: "Aperitivo in Bangkok | Mozza Italian Tradition",
        description: "Demo excerpt: Mozza's aperitivo, everyday 4–7pm — the Aperitivo Board, Italian cocktails, mocktails, wine and Peroni, with published prices.",
        excerpt: "Mozza's aperitivo, everyday from 4pm to 7pm: the Aperitivo Board, cocktails, wine and beer.",
        body: [
          "Mozza's aperitivo menu runs everyday from 4pm to 7pm. It centres on the Aperitivo Board (990 THB): homemade focaccia and pizza bread, prosciutto and mortadella, aged Grana Padano, moliterno, stracciatella with sweet berry tomatoes, fritto misto and fried mozzarella bites, sundried tomato tapenade and aioli.",
          "Drinks listed alongside include four Italian cocktails (220 THB each), three mocktails (150 THB each), wine by the glass (199 THB) and draught Peroni (120 THB half pint, 200 THB pint). Prices as published by Mozza — demo; subject to 10% service charge and 7% VAT. Pork and alcohol items are labelled.",
          "This is a demo excerpt; the full article text is not part of the concept demo.",
        ],
        menu: "aperitivo",
        menuLabel: "Aperitivo menu",
        branches: ["central-park", "siam-paragon"],
      },
    ],
    notFound: { h1: "Page not found", text: "This page does not exist in the concept demo.", home: "Home", menu: "Menus", locations: "Locations" },
  },
  th: {
    footer: { menus: "เมนู", company: "บริษัท", otherHma: "ร้านอาหาร HMA อื่น ๆ", partOf: "ส่วนหนึ่งของ Hospitality Management Asia", languages: "ภาษา", branches: "สาขา", follow: "ติดตามเรา", copyDemo: "เดโมแนวคิดส่วนตัว ไม่ใช่เว็บไซต์ทางการของ Mozza ไม่ให้ค้นหาจัดทำดัชนี" },
    links: { about: "เกี่ยวกับเรา", privilege: "HMA Privilege", delivery: "เดลิเวอรี่", contact: "ติดต่อ", blog: "บล็อก", hmaSite: "hmgtasia.net" },
    about: {
      title: "เกี่ยวกับ Mozza | La Cucina di Mamma ทราตตอเรียอิตาเลียน",
      description: "เกี่ยวกับ Mozza ทราตตอเรียอิตาเลียนในกรุงเทพฯ: La Cucina di Mamma พาสต้าทำมือ พิซซ่านาโปลี ส่วนหนึ่งของ Hospitality Management Asia",
      h1: "เกี่ยวกับ Mozza",
      body: [
        "Mozza — Mozza by Cocotte ตามที่พิมพ์ในเมนู — คือทราตตอเรียอิตาเลียนในกรุงเทพฯ ที่เสิร์ฟ La Cucina di Mamma: พิซซ่าเตาฟืนและพาสต้าทำมือ",
        "เมนูที่เผยแพร่มีอาหารอิตาเลียนคลาสสิก: พาสต้าทำมือ พิซซ่านาโปลีแท้ ริซอตโต้เนื้อครีม และทีรามิสุเข้มข้น พร้อมอาหารเช้า อาเปริติโว และอาฟเตอร์นูนที",
        "Mozza เป็นส่วนหนึ่งของ Hospitality Management Asia (HMA)",
      ],
      pending: "เรื่องราวแบรนด์ฉบับเต็มจะเพิ่มจากเว็บไซต์ Mozza ปัจจุบันเมื่อยืนยันถ้อยคำแล้ว",
      brandsTitle: "ส่วนหนึ่งของ Hospitality Management Asia",
      locationsTitle: "สาขา",
    },
    privilege: {
      title: "HMA Privilege | ร้านอาหารในเครือ Hospitality Management Asia",
      description: "HMA Privilege เชื่อมโยงกับ Hospitality Management Asia กลุ่มธุรกิจเบื้องหลัง Mozza และร้านอาหารในเครือ รายละเอียดโปรแกรมรอยืนยัน",
      h1: "HMA Privilege",
      body: [
        "HMA Privilege เชื่อมโยงกับ Hospitality Management Asia (HMA) กลุ่มธุรกิจเบื้องหลัง Mozza และร้านอาหารในเครือ",
        "รายละเอียดโปรแกรม — สิทธิประโยชน์ คุณสมบัติ และวิธีสมัคร — จะไม่แสดงจนกว่าจะยืนยัน",
      ],
      link: "เยี่ยมชม Hospitality Management Asia (hmgtasia.net)",
      pending: "รายละเอียดรอยืนยัน",
    },
    delivery: {
      title: "เดลิเวอรี่ | Mozza ร้านอาหารอิตาเลียน กรุงเทพฯ",
      description: "เดลิเวอรี่ของสาขา Mozza ในกรุงเทพฯ บริการแตกต่างกันตามสาขาและรอยืนยัน ลิงก์สั่งอาหารในหน้าเดโมนี้เป็นตัวอย่าง",
      h1: "เดลิเวอรี่",
      intro: "บริการเดลิเวอรี่แตกต่างกันตามสาขาและรอยืนยันกับทางกลุ่มร้านอาหาร ลิงก์สั่งอาหารด้านล่างเป็นตัวอย่างและไม่ได้พาไปที่ใด",
      order: "สั่งเดลิเวอรี่",
      demoLink: "ลิงก์ตัวอย่าง",
      branchesTitle: "เลือกสาขาของคุณ",
    },
    contact: {
      title: "ติดต่อ Mozza | ร้านอาหารอิตาเลียน กรุงเทพฯ",
      description: "ติดต่อ Mozza กรุงเทพฯ: ส่งข้อความผ่าน WhatsApp หรือ LINE (ลิงก์ตัวอย่าง) ค้นหาสาขาและเส้นทาง หรือติดตาม Mozza ออนไลน์",
      h1: "ติดต่อ Mozza",
      intro: "ส่งข้อความถึงทีมงาน ค้นหาสาขา หรือติดตาม Mozza ออนไลน์ หน้านี้ไม่มีแบบฟอร์มติดต่อและไม่เก็บข้อมูลใด ๆ",
      messageTitle: "ส่งข้อความถึงเรา (ลิงก์ตัวอย่าง)",
      visitTitle: "เยี่ยมชมสาขา",
      onlineTitle: "ออนไลน์",
      website: "เว็บไซต์",
      pending: "หมายเลขโทรศัพท์และอีเมลจะไม่แสดงจนกว่าจะยืนยัน",
      groupTitle: "กลุ่มบริษัท",
    },
    blog: {
      title: "บล็อก | Mozza ร้านอาหารอิตาเลียน กรุงเทพฯ",
      description: "บล็อก Mozza (เดโม): อาหารอิตาเลียนสดใหม่และอาเปริติโวในกรุงเทพฯ พร้อมลิงก์ไปยังเมนูและสาขา เฉพาะข้อความตัวอย่าง",
      h1: "บล็อก Mozza",
      intro: "บทความตัวอย่าง 2 เรื่อง อ้างอิงชื่อบทความที่มีอยู่ของ Mozza เนื้อหาระบุว่าเป็นข้อความตัวอย่าง",
      demoExcerpt: "ข้อความตัวอย่าง",
      read: "อ่านข้อความตัวอย่าง",
      related: "ที่เกี่ยวข้อง",
      viewMenu: "ดูเมนู",
      atBranches: "เยี่ยมชม",
      back: "บทความทั้งหมด",
    },
    posts: [
      {
        slug: "fresh-italian-food-at-mozza",
        title: "อาหารอิตาเลียนสดใหม่ที่ Mozza: เริ่มต้นจากวัตถุดิบ",
        metaTitle: "อาหารอิตาเลียนสดใหม่ที่ Mozza | วัตถุดิบ",
        description: "ข้อความตัวอย่าง: วัตถุดิบที่ระบุในเมนู Mozza ตั้งแต่มะเขือเทศซานมาร์ซาโนและมอซซาเรลลาดิบูฟาลา ไปจนถึงข้าวคาร์นาโรลีและพาสต้าทำมือ",
        excerpt: "วัตถุดิบที่ระบุในเมนูที่เผยแพร่ของ Mozza ตั้งแต่มะเขือเทศซานมาร์ซาโนถึงพาสต้าทำมือ",
        body: [
          "เมนูที่เผยแพร่ของ Mozza ระบุวัตถุดิบหลายอย่าง: ซอสมะเขือเทศซานมาร์ซาโนบนพิซซ่าและพาสต้า มอซซาเรลลาดิบูฟาลา สตรัชชาเตลลา และบูร์ราต้า ปาร์มาแฮมบ่ม 30 เดือน กราน่าปาดาโนบ่ม ทรัฟเฟิล และข้าวคาร์นาโรลีสำหรับริซอตโต้",
          "หลายรายการระบุว่าทำเองที่ร้าน: เพสโต้ ฟอกัชเชียและขนมปังพิซซ่า ราวีโอลี่ ตาลิโอลินี และเจลาโต้ เมนูที่มีหมูมีไอคอนของเมนูกำกับ",
          "นี่คือข้อความตัวอย่าง เนื้อหาบทความฉบับเต็มไม่ได้เป็นส่วนหนึ่งของเดโมแนวคิดนี้",
        ],
        menu: "food",
        menuLabel: "เมนูอาหาร",
        branches: ["central-park", "emquartier"],
      },
      {
        slug: "aperitivo-in-bangkok",
        title: "อาเปริติโวในกรุงเทพฯ: ประเพณีอิตาเลียนที่ Mozza",
        metaTitle: "อาเปริติโวในกรุงเทพฯ | ประเพณีอิตาเลียนที่ Mozza",
        description: "ข้อความตัวอย่าง: อาเปริติโวของ Mozza ทุกวัน 16.00–19.00 น. — Aperitivo Board ค็อกเทลอิตาเลียน ม็อกเทล ไวน์ และ Peroni พร้อมราคาที่เผยแพร่",
        excerpt: "อาเปริติโวของ Mozza ทุกวัน 16.00–19.00 น.: Aperitivo Board ค็อกเทล ไวน์ และเบียร์",
        body: [
          "เมนูอาเปริติโวของ Mozza เสิร์ฟทุกวัน 16.00–19.00 น. โดยมี Aperitivo Board (990 บาท) เป็นหลัก: ฟอกัชเชียและขนมปังพิซซ่าโฮมเมด โปรชุตโตและมอร์ตาเดลลา กราน่าปาดาโนบ่ม โมลิแตร์โน สตรัชชาเตลลากับมะเขือเทศเบอร์รีหวาน ฟริตโตมิสโตและมอซซาเรลลาทอดชิ้นพอดีคำ ทาเพนาดมะเขือเทศตากแห้งและไอโอลี",
          "เครื่องดื่มในเมนูมีค็อกเทลอิตาเลียน 4 รายการ (รายการละ 220 บาท) ม็อกเทล 3 รายการ (รายการละ 150 บาท) ไวน์แก้ว (199 บาท) และเบียร์สด Peroni (ครึ่งไพนต์ 120 บาท ไพนต์ 200 บาท) ราคาตามที่ Mozza เผยแพร่ — เดโม ยังไม่รวมค่าบริการ 10% และ VAT 7% ระบุเมนูที่มีหมูและแอลกอฮอล์",
          "นี่คือข้อความตัวอย่าง เนื้อหาบทความฉบับเต็มไม่ได้เป็นส่วนหนึ่งของเดโมแนวคิดนี้",
        ],
        menu: "aperitivo",
        menuLabel: "เมนูอาเปริติโว",
        branches: ["central-park", "siam-paragon"],
      },
    ],
    notFound: { h1: "ไม่พบหน้านี้", text: "หน้านี้ไม่มีอยู่ในเดโมแนวคิด", home: "หน้าแรก", menu: "เมนู", locations: "สาขา" },
  },
  ar: {
    footer: { menus: "القوائم", company: "الشركة", otherHma: "مطاعم HMA الأخرى", partOf: "جزء من Hospitality Management Asia", languages: "اللغة", branches: "الفروع", follow: "تابعنا", copyDemo: "عرض تجريبي خاص. ليس الموقع الرسمي لمطعم Mozza. غير مفهرس." },
    links: { about: "من نحن", privilege: "HMA Privilege", delivery: "التوصيل", contact: "اتصل بنا", blog: "المدونة", hmaSite: "hmgtasia.net" },
    about: {
      title: "عن Mozza | La Cucina di Mamma تراتوريا إيطالية",
      description: "عن Mozza، التراتوريا الإيطالية في بانكوك: La Cucina di Mamma ومعكرونة منزلية وبيتزا نابولية، وهي جزء من Hospitality Management Asia.",
      h1: "عن Mozza",
      body: [
        "Mozza — Mozza by Cocotte كما هو مطبوع على قوائمه — تراتوريا إيطالية في بانكوك تقدّم La Cucina di Mamma: بيتزا بفرن الحطب ومعكرونة مصنوعة يدويًا.",
        "تضم قوائمه المنشورة الأطباق الإيطالية الكلاسيكية: معكرونة منزلية وبيتزا نابولية أصيلة وريزوتو كريمي وتيراميسو غني، إلى جانب الإفطار والأبريتيفو وشاي بعد الظهر.",
        "Mozza جزء من Hospitality Management Asia (HMA).",
      ],
      pending: "ستُضاف قصة العلامة التجارية كاملة من موقع Mozza الحالي بعد تأكيد صياغتها.",
      brandsTitle: "جزء من Hospitality Management Asia",
      locationsTitle: "الفروع",
    },
    privilege: {
      title: "HMA Privilege | مطاعم Hospitality Management Asia",
      description: "HMA Privilege مرتبط مع Hospitality Management Asia، المجموعة التي تقف خلف Mozza ومطاعمها الشقيقة. تفاصيل البرنامج بانتظار التأكيد.",
      h1: "HMA Privilege",
      body: [
        "HMA Privilege مرتبط مع Hospitality Management Asia (HMA)، المجموعة التي تقف خلف Mozza ومطاعمها الشقيقة.",
        "تفاصيل البرنامج — المزايا وشروط الأهلية وطريقة الانضمام — لا تُعرض حتى يتم تأكيدها.",
      ],
      link: "زيارة Hospitality Management Asia (hmgtasia.net)",
      pending: "التفاصيل بانتظار التأكيد.",
    },
    delivery: {
      title: "التوصيل | Mozza مطعم إيطالي في بانكوك",
      description: "التوصيل من فروع Mozza في بانكوك. يختلف التوفر حسب الفرع وهو بانتظار التأكيد؛ روابط الطلب في هذه الصفحة التجريبية نائبة.",
      h1: "التوصيل",
      intro: "يختلف توفر التوصيل حسب الفرع وهو بانتظار التأكيد من مجموعة المطاعم. روابط الطلب أدناه نائبة تجريبية ولا تؤدي إلى أي مكان.",
      order: "اطلب التوصيل",
      demoLink: "رابط تجريبي",
      branchesTitle: "اختر فرعك",
    },
    contact: {
      title: "تواصل مع Mozza | مطعم إيطالي في بانكوك",
      description: "تواصل مع Mozza بانكوك: راسل عبر واتساب أو LINE (روابط تجريبية)، واعثر على كل فرع واحصل على الاتجاهات، أو تابع Mozza عبر الإنترنت.",
      h1: "تواصل مع Mozza",
      intro: "راسل الفريق أو اعثر على فرع أو تابع Mozza عبر الإنترنت. لا تحتوي هذه الصفحة على نموذج اتصال ولا تجمع أي بيانات.",
      messageTitle: "راسلنا (روابط تجريبية)",
      visitTitle: "زر أحد الفروع",
      onlineTitle: "عبر الإنترنت",
      website: "الموقع الإلكتروني",
      pending: "لا تُعرض أرقام الهواتف ولا عناوين البريد الإلكتروني حتى يتم تأكيدها.",
      groupTitle: "المجموعة",
    },
    blog: {
      title: "المدونة | Mozza مطعم إيطالي في بانكوك",
      description: "مدونة Mozza (تجريبية): طعام إيطالي طازج وأبريتيفو في بانكوك مع روابط إلى القوائم والفروع. مقتطفات فقط.",
      h1: "مدونة Mozza",
      intro: "مقالان تجريبيان مبنيان على عناوين مقالات Mozza الحالية. النصوص موسومة بأنها مقتطفات تجريبية.",
      demoExcerpt: "مقتطف تجريبي",
      read: "اقرأ المقتطف",
      related: "ذو صلة",
      viewMenu: "اطلع على القائمة",
      atBranches: "زيارة",
      back: "كل المقالات",
    },
    posts: [
      {
        slug: "fresh-italian-food-at-mozza",
        title: "طعام إيطالي طازج في Mozza: يبدأ من المكوّنات",
        metaTitle: "طعام إيطالي طازج في Mozza | المكوّنات",
        description: "مقتطف تجريبي: المكوّنات المذكورة في قوائم Mozza، من الطماطم سان مارزانو وموزاريلا دي بوفالا إلى أرز كارنارولي والمعكرونة المنزلية.",
        excerpt: "المكوّنات المذكورة في قوائم Mozza المنشورة، من الطماطم سان مارزانو إلى المعكرونة المنزلية.",
        body: [
          "تذكر قوائم Mozza المنشورة عددًا من المكوّنات: صلصة الطماطم سان مارزانو على البيتزا والمعكرونة، وموزاريلا دي بوفالا وستراتشياتيلا وبوراتا، ولحم بارما معتّق 30 شهرًا، وغرانا بادانو معتّق، والكمأة، وأرز كارنارولي للريزوتو.",
          "وُصفت عدة أصناف بأنها منزلية: البيستو والفوكاتشيا وخبز البيتزا والرافيولي والتاغليوليني والجيلاتو. وتحمل الأصناف التي تحتوي على لحم الخنزير رمز القائمة نفسه.",
          "هذا مقتطف تجريبي؛ نص المقال الكامل ليس جزءًا من العرض التجريبي.",
        ],
        menu: "food",
        menuLabel: "قائمة الطعام",
        branches: ["central-park", "emquartier"],
      },
      {
        slug: "aperitivo-in-bangkok",
        title: "الأبريتيفو في بانكوك: التقليد الإيطالي في Mozza",
        metaTitle: "الأبريتيفو في بانكوك | التقليد الإيطالي في Mozza",
        description: "مقتطف تجريبي: أبريتيفو Mozza يوميًا من 4 إلى 7 مساءً — Aperitivo Board وكوكتيلات إيطالية وموكتيل ونبيذ وPeroni بأسعار منشورة.",
        excerpt: "أبريتيفو Mozza يوميًا من 4 إلى 7 مساءً: Aperitivo Board وكوكتيلات ونبيذ وبيرة.",
        body: [
          "تقدَّم قائمة الأبريتيفو في Mozza يوميًا من 4 إلى 7 مساءً. وتتمحور حول Aperitivo Board (990 باتًا): فوكاتشيا وخبز بيتزا منزليان، وبروشوتو ومورتديلا، وغرانا بادانو معتّق، وموليتيرنو، وستراتشياتيلا مع طماطم التوت الحلوة، وفريتو ميستو وقطع موزاريلا مقلية، وتابيناد الطماطم المجففة والآيولي.",
          "تشمل المشروبات المدرجة أربعة كوكتيلات إيطالية (220 باتًا للواحد) وثلاثة موكتيل (150 باتًا للواحد) ونبيذًا بالكأس (199 باتًا) وبيرة Peroni مسحوبة (120 باتًا نصف باينت، 200 باتًا باينت). الأسعار كما نشرها Mozza — عرض تجريبي؛ مع رسوم خدمة 10% وضريبة قيمة مضافة 7%. يتم التنبيه إلى الأصناف التي تحتوي على لحم الخنزير والكحول.",
          "هذا مقتطف تجريبي؛ نص المقال الكامل ليس جزءًا من العرض التجريبي.",
        ],
        menu: "aperitivo",
        menuLabel: "قائمة الأبريتيفو",
        branches: ["central-park", "siam-paragon"],
      },
    ],
    notFound: { h1: "الصفحة غير موجودة", text: "هذه الصفحة غير موجودة في العرض التجريبي.", home: "الرئيسية", menu: "القوائم", locations: "الفروع" },
  },
};
