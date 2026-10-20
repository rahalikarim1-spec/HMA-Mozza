import type { Dict } from "./dict";
import { branchTexts } from "./branches";

// <!-- NEEDS NATIVE REVIEW --> Every Thai string in this file was drafted without
// native review. Do not publish before a native Thai speaker has checked it.

const dayNames = {
  mon: "วันจันทร์", tue: "วันอังคาร", wed: "วันพุธ", thu: "วันพฤหัสบดี",
  fri: "วันศุกร์", sat: "วันเสาร์", sun: "วันอาทิตย์",
};

export const th: Dict = {
  htmlLang: "th",
  dir: "ltr",
  // <!-- NEEDS NATIVE REVIEW -->
  banner: "เดโมแนวคิดโดย Wadhah Belhassen — ไม่ใช่เว็บไซต์ทางการของ Mozza",
  skipToContent: "ข้ามไปยังเนื้อหา",
  nav: { home: "หน้าแรก Mozza", menu: "เมนู", locations: "สาขา", reserve: "จองโต๊ะ", label: "เมนูนำทางหลัก" },
  lang: { label: "ภาษา", names: { en: "EN", th: "ไทย", ar: "العربية" } },
  common: {
    demoPrice: "ราคาตัวอย่าง",
    tbc: "รอยืนยัน",
    ratingOn: (s) => `บน ${s}`,
    closesAt: (t) => `ปิด ${t} น.`,
    untilTime: (t) => `ถึง ${t} น.`,
    hours: "เวลาทำการ",
    directions: "เส้นทาง",
    reserve: "จองโต๊ะ",
    menu: "เมนู",
    viewBranch: "ดูรายละเอียดสาขา",
    viewDish: "ดูในเมนู",
    breadcrumbHome: "หน้าแรก",
    breadcrumbLabel: "เส้นทางนำทาง",
    dayNames,
    demoNote: "เนื้อหาตัวอย่าง",
  },
  // <!-- NEEDS NATIVE REVIEW -->
  meta: {
    home: {
      title: "Mozza กรุงเทพฯ | ร้านอาหารอิตาเลียนแท้ พิซซ่าเตาฟืน พาสต้าสด",
      description:
        "เดโมแนวคิด: ร้านอาหารอิตาเลียนทราตตอเรียในกรุงเทพฯ พิซซ่าเตาฟืนและพาสต้าทำมือ เลือกสาขา ดูเมนู และจองโต๊ะ",
    },
    locations: {
      title: "สาขา | ร้านอาหารอิตาเลียน Mozza ในกรุงเทพฯ",
      description:
        "Mozza 6 สาขาในกรุงเทพฯ: เซ็นทรัล พาร์ค เอ็มควอเทียร์ สยามพารากอน ไอคอนสยาม เซ็นทรัล ชิดลม และเซ็นทรัลเวิลด์ เส้นทางและการจอง (เดโม)",
    },
  },
  hero: {
    h1: "ร้านอาหารอิตาเลียนแท้ในกรุงเทพฯ",
    sub: "พิซซ่าเตาฟืนและพาสต้าทำมือ La Cucina di Mamma",
    aiCaption: "ภาพประกอบจาก AI",
    cta: { reserve: "จองโต๊ะ", menu: "ดูเมนู" },
  },
  chooser: { title: "เลือกสาขา Mozza ของคุณ", intro: "6 สาขาทั่วกรุงเทพฯ เลือกสาขาที่ใกล้คุณที่สุด" },
  signature: { title: "เมนูแนะนำ", intro: "6 เมนูเริ่มต้น แตะเพื่อดูในหน้าเมนู" },
  awards: {
    title: "การยอมรับ",
    note: "ข้อความตัวอย่าง — ต้องตรวจสอบชื่อรางวัล ปี และถ้อยคำก่อนนำไปใช้จริง",
    items: ["Gambero Rosso", "Lifestyle Asia Best Bites", "Tripadvisor Travellers' Choice"],
  },
  faq: {
    title: "คำถามที่พบบ่อย",
    items: [
      {
        q: "จองโต๊ะได้อย่างไร",
        a: "เลือกสาขาแล้วกดปุ่มจองโต๊ะ ในเดโมแนวคิดนี้ ลิงก์จองเป็นเพียงตัวอย่างและไม่มีการจองจริง",
      },
      { q: "มีบริการจัดส่งไหม", a: "บริการจัดส่งแตกต่างกันตามสาขา และรอยืนยันกับทางกลุ่มร้านอาหาร" },
      {
        q: "จองโต๊ะสำหรับกลุ่มใหญ่ได้ไหม",
        a: "ต้อนรับกลุ่มในหลักการ เงื่อนไขสำหรับกลุ่มรอยืนยัน สอบถามสาขาผ่าน WhatsApp หรือ LINE (ลิงก์ตัวอย่าง)",
      },
      {
        q: "เวลาเปิดทำการคือเมื่อไร",
        a: "เวลาทำการแสดงในหน้าของแต่ละสาขา ในเดโมนี้เวลาเปิดส่วนใหญ่ระบุว่ารอยืนยัน",
      },
    ],
  },
  footer: {
    branches: "สาขา",
    follow: "ติดตามเรา",
    line: "LINE",
    instagram: "Instagram",
    facebook: "Facebook",
    part: "ส่วนหนึ่งของ Hospitality Management Asia",
    disclaimer: "เดโมแนวคิดส่วนตัว ไม่ใช่เว็บไซต์ทางการของ Mozza ไม่ให้ค้นหาจัดทำดัชนี",
    photos: "ภาพตัวอย่างเพื่อการสาธิตแนวคิดเท่านั้น",
  },
  locationsPage: {
    mapLabel: "แผนที่เชิงแผนภาพของสาขา Mozza ในกรุงเทพฯ",
    mapCaption: "แผนที่เชิงแผนภาพ — ตำแหน่งเป็นค่าประมาณเพื่อประกอบภาพ ไม่ได้เป็นมาตราส่วนจริง",
    h1: "สาขา Mozza ในกรุงเทพฯ",
    intro: "สาขา Mozza 6 แห่งในกรุงเทพฯ ค้นหาสาขาที่ใกล้ที่สุด ดูเส้นทาง หรือจองโต๊ะ รายละเอียดสาขาที่ยังไม่ยืนยันจะไม่แสดงจนกว่าจะตรวจสอบ",
  },
  branchPage: {
    reserve: "จองโต๊ะ",
    directions: "เส้นทาง",
    menu: "เมนู",
    addressTitle: "ที่อยู่",
    mapAlt: "ภาพตัวอย่างแผนที่แสดงตำแหน่งสาขา",
    mapCaption: "ภาพแผนที่ตัวอย่าง — ไม่ใช้ API key ของแผนที่",
    gettingHere: "การเดินทาง",
    directionsFallback: "เส้นทางบน Google Maps",
    detailsPending: "รายละเอียดเพิ่มเติมของสาขานี้อยู่ระหว่างการยืนยัน",
    transitLabel: "BTS / MRT ที่ใกล้ที่สุด",
    landmarkLabel: "จุดสังเกต",
    aboutTitle: "เกี่ยวกับสาขานี้",
    signatureTitle: "เมนูแนะนำของสาขานี้",
    hoursTitle: "เวลาทำการ",
    day: "วัน",
    hoursCol: "เวลา",
    faqTitle: "คำถามเกี่ยวกับสาขา",
    otherTitle: "สาขา Mozza อื่น ๆ",
  },
  sticky: { label: "ติดต่อด่วน", reserve: "จองโต๊ะ", whatsapp: "WhatsApp", line: "LINE", directions: "เส้นทาง" },
  whatsappMessage: (place) => `สวัสดีครับ/ค่ะ สอบถามเรื่องการจองโต๊ะที่ ${place}`,
  branches: branchTexts("th"),
};
