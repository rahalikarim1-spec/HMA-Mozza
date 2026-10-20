import type { Lang } from "./types";

export type MenuId = "food" | "brunch" | "aperitivo" | "afternoon-tea";
export const MENU_IDS: MenuId[] = ["food", "brunch", "aperitivo", "afternoon-tea"];

export interface MenuUi {
  hub: { title: string; description: string; h1: string; intro: string; open: string };
  menus: Record<MenuId, { name: string; title: string; description: string; h1: string; blurb: string; hours?: string }>;
  categories: Record<string, string>;
  ui: {
    search: string;
    searchPlaceholder: string;
    filters: string;
    vegetarian: string;
    pork: string;
    alcohol: string;
    clear: string;
    results: (n: number, total: number) => string;
    none: string;
    jump: string;
    pdf: string;
    reserve: string;
    pricesNote: string;
    serviceNote: string;
    dietNote: string;
    tags: { vegetarian: string; vegetarianOnRequest: string; pork: string; alcohol: string; spicy: string };
    priceNotes: { perGlass: string; each: string; addOn: string; hotOnly: string };
    sizes: Record<string, string>;
    noPrice: string;
    otherMenus: string;
    branchesTitle: string;
    atChidlomOnly: string;
  };
}

// <!-- NEEDS NATIVE REVIEW --> (Thai + Arabic below)
export const menusUi: Record<Lang, MenuUi> = {
  en: {
    hub: {
      title: "Menus | Mozza Italian Trattoria Bangkok",
      description: "Browse Mozza's food, brunch, aperitivo and afternoon tea menus. Pork and alcohol are labelled; prices as published by Mozza (demo).",
      h1: "Mozza Menus",
      intro: "Four menus, one trattoria. Choose a menu to see every dish with its published price. Pork and alcohol are always labelled.",
      open: "View menu",
    },
    menus: {
      food: { name: "Food", title: "Food Menu | Mozza Italian Trattoria Bangkok", description: "Pasta, pizza, burrata, grill, desserts and drinks at Mozza. Filter by vegetarian, pork or alcohol. Prices as published by Mozza (demo).", h1: "Food menu", blurb: "Spritz, cheeses, burrata, starters, pasta, pizza, mains, grill, dolci and drinks." },
      brunch: { name: "Brunch & Breakfast", title: "Brunch & Breakfast Menu | Mozza Bangkok", description: "Mozza breakfast: avocado egg toast, benedicts, Italian omelettes and bakery, served everyday until 12pm. Prices as published (demo).", h1: "Brunch & breakfast menu", blurb: "Buongiorno! Breakfast everyday until 12pm.", hours: "Everyday until 12pm" },
      aperitivo: { name: "Aperitivo", title: "Aperitivo Menu | Mozza Italian Trattoria Bangkok", description: "Mozza aperitivo, everyday 4pm to 7pm: the Aperitivo Board, Italian cocktails, mocktails, wine and Peroni. Prices as published (demo).", h1: "Aperitivo menu", blurb: "Aperitivo board, Italian cocktails, mocktails, wine and beer.", hours: "Everyday from 4pm to 7pm" },
      "afternoon-tea": { name: "Afternoon Tea", title: "Afternoon Tea at Mozza Chidlom | Bangkok", description: "Afternoon tea sets at Mozza Chidlom, everyday 2 to 5pm: 990 THB with tea or coffee, 1,990 THB with a bottle of prosecco (as published, demo).", h1: "Afternoon tea", blurb: "Two sets, everyday 2–5 pm, available exclusively at Mozza Chidlom.", hours: "Everyday 2–5 pm" },
    },
    categories: {
      spritz: "Spritz", "cheeses-and-cold-cuts": "Cheeses & Cold Cuts", burrata: "Burrata", starter: "Starters", salad: "Salads",
      "pasta-and-risotto": "Pasta & Risotto", pizza: "Pizza", "main-course": "Main Course", grill: "Grill", "side-dish": "Side Dishes", dolci: "Dolci (Desserts)",
      "signature-drinks": "Signature Drinks", "homemade-juice": "Homemade Juice", smoothie: "Smoothies", milkshake: "Milkshakes", "italian-soda": "Italian Soda",
      "homemade-iced-tea": "Homemade Iced Tea", water: "Water", "soft-drink": "Soft Drinks", coffee: "Coffee", tea: "Tea", "coffee-options-add": "Coffee Options (add)",
      "on-the-go-breakfast": "On-the-go Breakfast", breakfast: "Breakfast", bakery: "Bakery",
      "aperitivo-board": "Aperitivo Board", "italian-cocktails": "Italian Cocktails", mocktails: "Mocktails", sparkling: "Sparkling", "wine-by-the-glass": "Wine by the Glass", "draught-beer": "Draught Beer",
      "afternoon-tea-set": "Afternoon Tea Sets",
    },
    ui: {
      search: "Search this menu", searchPlaceholder: "Search dishes or ingredients", filters: "Dietary filters",
      vegetarian: "Vegetarian", pork: "Contains pork", alcohol: "Contains alcohol", clear: "Clear filters",
      results: (n, t) => `Showing ${n} of ${t} items`, none: "No items match. Try another search or clear the filters.",
      jump: "Jump to category", pdf: "Download PDF menu", reserve: "Reserve",
      pricesNote: "Prices as published by Mozza — demo",
      serviceNote: "Prices are subject to 10% service charge and 7% VAT (as stated on the menu).",
      dietNote: "Dietary labels follow the icons printed on Mozza's menu; where a menu has no icons, pork and alcohol are flagged from named ingredients. Everything is transcribed and unverified — ask the restaurant about allergies.",
      tags: { vegetarian: "Vegetarian", vegetarianOnRequest: "Vegetarian version on request", pork: "Contains pork", alcohol: "Contains alcohol", spicy: "Spicy" },
      priceNotes: { perGlass: "per glass", each: "each", addOn: "add-on", hotOnly: "hot only" },
      sizes: { Hot: "Hot", Iced: "Iced", Scoop: "Scoop", "Waffle Cone": "Waffle cone" },
      noPrice: "Price not stated", otherMenus: "Other menus", branchesTitle: "Where to find Mozza", atChidlomOnly: "Available exclusively at Mozza Chidlom",
    },
  },
  th: {
    hub: {
      title: "เมนู | Mozza ร้านอาหารอิตาเลียน กรุงเทพฯ",
      description: "ดูเมนูอาหาร บรันช์ อาเปริติโว และอาฟเตอร์นูนทีของ Mozza ระบุส่วนผสมของหมูและแอลกอฮอล์ ราคาตามที่ Mozza เผยแพร่ (เดโม)",
      h1: "เมนู Mozza",
      intro: "4 เมนู ในทราตตอเรียเดียว เลือกเมนูเพื่อดูทุกจานพร้อมราคาที่เผยแพร่ ระบุส่วนผสมของหมูและแอลกอฮอล์ทุกครั้ง",
      open: "ดูเมนู",
    },
    menus: {
      food: { name: "อาหาร", title: "เมนูอาหาร | Mozza ร้านอาหารอิตาเลียน กรุงเทพฯ", description: "พาสต้า พิซซ่า บูร์ราต้า เนื้อย่าง ของหวาน และเครื่องดื่มที่ Mozza กรองตามมังสวิรัติ หมู หรือแอลกอฮอล์ ราคาตามที่ Mozza เผยแพร่ (เดโม)", h1: "เมนูอาหาร", blurb: "สปริตซ์ ชีส บูร์ราต้า อาหารเรียกน้ำย่อย พาสต้า พิซซ่า จานหลัก เนื้อย่าง ของหวาน และเครื่องดื่ม" },
      brunch: { name: "บรันช์และอาหารเช้า", title: "เมนูบรันช์และอาหารเช้า | Mozza กรุงเทพฯ", description: "อาหารเช้า Mozza: อะโวคาโดเอ้กโทสต์ เบเนดิกต์ ไข่เจียวสไตล์อิตาเลียน และเบเกอรี่ เสิร์ฟทุกวันถึงเที่ยง ราคาตามที่เผยแพร่ (เดโม)", h1: "เมนูบรันช์และอาหารเช้า", blurb: "Buongiorno! อาหารเช้าทุกวันถึง 12.00 น.", hours: "ทุกวันถึง 12.00 น." },
      aperitivo: { name: "อาเปริติโว", title: "เมนูอาเปริติโว | Mozza ร้านอาหารอิตาเลียน", description: "อาเปริติโวของ Mozza ทุกวัน 16.00–19.00 น.: Aperitivo Board ค็อกเทลอิตาเลียน ม็อกเทล ไวน์ และ Peroni ราคาตามที่เผยแพร่ (เดโม)", h1: "เมนูอาเปริติโว", blurb: "Aperitivo Board ค็อกเทลอิตาเลียน ม็อกเทล ไวน์ และเบียร์", hours: "ทุกวัน 16.00–19.00 น." },
      "afternoon-tea": { name: "อาฟเตอร์นูนที", title: "อาฟเตอร์นูนทีที่ Mozza Chidlom | กรุงเทพฯ", description: "เซตอาฟเตอร์นูนทีที่ Mozza Chidlom ทุกวัน 14.00–17.00 น.: 990 บาทพร้อมชาหรือกาแฟ 1,990 บาทพร้อมโพรเซกโก้ 1 ขวด (ตามที่เผยแพร่ เดโม)", h1: "อาฟเตอร์นูนที", blurb: "2 เซต ทุกวัน 14.00–17.00 น. มีเฉพาะที่ Mozza Chidlom", hours: "ทุกวัน 14.00–17.00 น." },
    },
    categories: {
      spritz: "สปริตซ์", "cheeses-and-cold-cuts": "ชีสและเนื้อเย็น", burrata: "บูร์ราต้า", starter: "อาหารเรียกน้ำย่อย", salad: "สลัด",
      "pasta-and-risotto": "พาสต้าและริซอตโต้", pizza: "พิซซ่า", "main-course": "จานหลัก", grill: "เนื้อย่าง", "side-dish": "เมนูเคียง", dolci: "ของหวาน (Dolci)",
      "signature-drinks": "เครื่องดื่มซิกเนเจอร์", "homemade-juice": "น้ำผลไม้โฮมเมด", smoothie: "สมูทตี้", milkshake: "มิลค์เชค", "italian-soda": "อิตาเลียนโซดา",
      "homemade-iced-tea": "ชาเย็นโฮมเมด", water: "น้ำดื่ม", "soft-drink": "น้ำอัดลม", coffee: "กาแฟ", tea: "ชา", "coffee-options-add": "ตัวเลือกเพิ่มสำหรับกาแฟ",
      "on-the-go-breakfast": "อาหารเช้าแบบพกพา", breakfast: "อาหารเช้า", bakery: "เบเกอรี่",
      "aperitivo-board": "Aperitivo Board", "italian-cocktails": "ค็อกเทลอิตาเลียน", mocktails: "ม็อกเทล", sparkling: "สปาร์กลิงไวน์", "wine-by-the-glass": "ไวน์แก้ว", "draught-beer": "เบียร์สด",
      "afternoon-tea-set": "เซตอาฟเตอร์นูนที",
    },
    ui: {
      search: "ค้นหาในเมนูนี้", searchPlaceholder: "ค้นหาเมนูหรือส่วนผสม", filters: "ตัวกรองด้านอาหาร",
      vegetarian: "มังสวิรัติ", pork: "มีส่วนผสมของหมู", alcohol: "มีแอลกอฮอล์", clear: "ล้างตัวกรอง",
      results: (n, t) => `แสดง ${n} จาก ${t} รายการ`, none: "ไม่พบรายการที่ตรงกัน ลองค้นหาอย่างอื่นหรือล้างตัวกรอง",
      jump: "ไปที่หมวดหมู่", pdf: "ดาวน์โหลดเมนู PDF", reserve: "จองโต๊ะ",
      pricesNote: "ราคาตามที่ Mozza เผยแพร่ — เดโม",
      serviceNote: "ราคายังไม่รวมค่าบริการ 10% และ VAT 7% (ตามที่ระบุในเมนู)",
      dietNote: "ป้ายด้านอาหารเป็นไปตามไอคอนที่พิมพ์ในเมนูของ Mozza หากเมนูไม่มีไอคอน จะระบุหมูและแอลกอฮอล์จากส่วนผสมที่ระบุชื่อไว้ ข้อมูลทั้งหมดเป็นการถอดความและยังไม่ได้ยืนยัน โปรดสอบถามทางร้านเรื่องการแพ้อาหาร",
      tags: { vegetarian: "มังสวิรัติ", vegetarianOnRequest: "มีแบบมังสวิรัติเมื่อร้องขอ", pork: "มีส่วนผสมของหมู", alcohol: "มีแอลกอฮอล์", spicy: "เผ็ด" },
      priceNotes: { perGlass: "ต่อแก้ว", each: "ต่อรายการ", addOn: "เพิ่ม", hotOnly: "ร้อนเท่านั้น" },
      sizes: { Hot: "ร้อน", Iced: "เย็น", Scoop: "สคูป", "Waffle Cone": "โคนวัฟเฟิล" },
      noPrice: "ไม่ระบุราคา", otherMenus: "เมนูอื่น ๆ", branchesTitle: "สาขา Mozza", atChidlomOnly: "มีเฉพาะที่ Mozza Chidlom",
    },
  },
  ar: {
    hub: {
      title: "القوائم | Mozza مطعم إيطالي في بانكوك",
      description: "تصفّح قوائم Mozza للطعام والبرانش والأبريتيفو وشاي بعد الظهر. يتم التنبيه إلى لحم الخنزير والكحول؛ الأسعار كما نشرها Mozza (عرض تجريبي).",
      h1: "قوائم Mozza",
      intro: "أربع قوائم في تراتوريا واحدة. اختر قائمة لترى كل طبق بسعره المنشور. يتم دائمًا التنبيه إلى لحم الخنزير والكحول.",
      open: "عرض القائمة",
    },
    menus: {
      food: { name: "الطعام", title: "قائمة الطعام | Mozza مطعم إيطالي في بانكوك", description: "معكرونة وبيتزا وبوراتا ومشويات وحلويات ومشروبات في Mozza. صفِّ حسب النباتي أو الخنزير أو الكحول. الأسعار كما نشرها Mozza (تجريبي).", h1: "قائمة الطعام", blurb: "سبريتز وأجبان وبوراتا ومقبلات ومعكرونة وبيتزا وأطباق رئيسية ومشويات وحلويات ومشروبات." },
      brunch: { name: "البرانش والإفطار", title: "قائمة البرانش والإفطار | Mozza بانكوك", description: "إفطار Mozza: توست الأفوكادو والبيض وبنديكت وعجّة إيطالية ومخبوزات، يوميًا حتى 12 ظهرًا. الأسعار كما نُشرت (تجريبي).", h1: "قائمة البرانش والإفطار", blurb: "Buongiorno! إفطار يوميًا حتى 12 ظهرًا.", hours: "يوميًا حتى 12 ظهرًا" },
      aperitivo: { name: "الأبريتيفو", title: "قائمة الأبريتيفو | Mozza مطعم إيطالي", description: "أبريتيفو Mozza يوميًا من 4 إلى 7 مساءً: Aperitivo Board وكوكتيلات إيطالية وموكتيل ونبيذ وPeroni. الأسعار كما نُشرت (تجريبي).", h1: "قائمة الأبريتيفو", blurb: "Aperitivo Board وكوكتيلات إيطالية وموكتيل ونبيذ وبيرة.", hours: "يوميًا من 4 إلى 7 مساءً" },
      "afternoon-tea": { name: "شاي بعد الظهر", title: "شاي بعد الظهر في Mozza Chidlom | بانكوك", description: "أطقم شاي بعد الظهر في Mozza Chidlom يوميًا من 2 إلى 5 مساءً: 990 باتًا مع الشاي أو القهوة، و1,990 باتًا مع زجاجة بروسيكو (كما نُشر، تجريبي).", h1: "شاي بعد الظهر", blurb: "طقمان يوميًا من 2 إلى 5 مساءً، متوفران حصريًا في Mozza Chidlom.", hours: "يوميًا من 2 إلى 5 مساءً" },
    },
    categories: {
      spritz: "سبريتز", "cheeses-and-cold-cuts": "أجبان ولحوم باردة", burrata: "بوراتا", starter: "المقبلات", salad: "السلطات",
      "pasta-and-risotto": "المعكرونة والريزوتو", pizza: "البيتزا", "main-course": "الأطباق الرئيسية", grill: "المشويات", "side-dish": "أطباق جانبية", dolci: "الحلويات (Dolci)",
      "signature-drinks": "المشروبات المميزة", "homemade-juice": "عصائر منزلية", smoothie: "سموذي", milkshake: "ميلك شيك", "italian-soda": "صودا إيطالية",
      "homemade-iced-tea": "شاي مثلج منزلي", water: "مياه", "soft-drink": "مشروبات غازية", coffee: "القهوة", tea: "الشاي", "coffee-options-add": "إضافات القهوة",
      "on-the-go-breakfast": "إفطار سريع", breakfast: "الإفطار", bakery: "المخبوزات",
      "aperitivo-board": "Aperitivo Board", "italian-cocktails": "كوكتيلات إيطالية", mocktails: "موكتيل", sparkling: "نبيذ فوّار", "wine-by-the-glass": "نبيذ بالكأس", "draught-beer": "بيرة مَسحوبة",
      "afternoon-tea-set": "أطقم شاي بعد الظهر",
    },
    ui: {
      search: "ابحث في هذه القائمة", searchPlaceholder: "ابحث عن طبق أو مكوّن", filters: "مرشّحات غذائية",
      vegetarian: "نباتي", pork: "يحتوي على لحم الخنزير", alcohol: "يحتوي على كحول", clear: "مسح المرشحات",
      results: (n, t) => `عرض ${n} من ${t} عنصرًا`, none: "لا توجد عناصر مطابقة. جرّب بحثًا آخر أو امسح المرشحات.",
      jump: "انتقل إلى القسم", pdf: "تنزيل القائمة بصيغة PDF", reserve: "احجز طاولة",
      pricesNote: "الأسعار كما نشرها Mozza — عرض تجريبي",
      serviceNote: "الأسعار خاضعة لرسوم خدمة 10% وضريبة قيمة مضافة 7% (كما هو مذكور في القائمة).",
      dietNote: "تتبع الإشارات الغذائية الرموز المطبوعة في قائمة Mozza؛ وحيث لا توجد رموز يتم التنبيه إلى لحم الخنزير والكحول بحسب المكوّنات المذكورة بالاسم. كل المعلومات منقولة وغير مؤكدة — اسأل المطعم عن الحساسية.",
      tags: { vegetarian: "نباتي", vegetarianOnRequest: "نسخة نباتية عند الطلب", pork: "يحتوي على لحم الخنزير", alcohol: "يحتوي على كحول", spicy: "حار" },
      priceNotes: { perGlass: "للكأس", each: "للواحد", addOn: "إضافة", hotOnly: "ساخن فقط" },
      sizes: { Hot: "ساخن", Iced: "مثلج", Scoop: "كرة", "Waffle Cone": "كون وافل" },
      noPrice: "السعر غير مذكور", otherMenus: "قوائم أخرى", branchesTitle: "أين تجد Mozza", atChidlomOnly: "متوفر حصريًا في Mozza Chidlom",
    },
  },
};
