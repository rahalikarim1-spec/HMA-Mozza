import type { Dict } from "./dict";
import { branchTexts } from "./branches";

// <!-- NEEDS NATIVE REVIEW --> Every Arabic string in this file was drafted without
// native review. Do not publish before a native Arabic speaker has checked it
// (Modern Standard vs. Gulf register, tone, and terminology).

const dayNames = {
  mon: "الاثنين", tue: "الثلاثاء", wed: "الأربعاء", thu: "الخميس",
  fri: "الجمعة", sat: "السبت", sun: "الأحد",
};

export const ar: Dict = {
  htmlLang: "ar",
  dir: "rtl",
  // <!-- NEEDS NATIVE REVIEW -->
  banner: "عرض تجريبي من Wadhah Belhassen — وليس موقع Mozza الرسمي",
  skipToContent: "انتقل إلى المحتوى",
  nav: { home: "الصفحة الرئيسية لـ Mozza", menu: "القائمة", locations: "الفروع", reserve: "احجز طاولة", label: "التنقل الرئيسي" },
  lang: { label: "اللغة", names: { en: "EN", th: "ไทย", ar: "العربية" } },
  common: {
    demoPrice: "سعر تجريبي",
    tbc: "سيُؤكَّد لاحقًا",
    ratingOn: (s) => `على ${s}`,
    closesAt: (t) => `يُغلق الساعة ${t}`,
    untilTime: (t) => `حتى ${t}`,
    hours: "ساعات العمل",
    directions: "الاتجاهات",
    reserve: "احجز طاولة",
    menu: "القائمة",
    viewBranch: "تفاصيل الفرع",
    viewDish: "عرض في القائمة",
    breadcrumbHome: "الرئيسية",
    breadcrumbLabel: "مسار التنقل",
    dayNames,
    demoNote: "محتوى تجريبي",
  },
  // <!-- NEEDS NATIVE REVIEW -->
  meta: {
    home: {
      title: "Mozza بانكوك | مطعم إيطالي أصيل، بيتزا بفرن الحطب ومعكرونة طازجة",
      description:
        "عرض تجريبي: مطعم إيطالي (تراتوريا) في بانكوك يقدم بيتزا بفرن الحطب ومعكرونة مصنوعة يدويًا. اختر فرعك واطلع على القائمة واحجز طاولة.",
    },
    locations: {
      title: "الفروع | مطاعم Mozza الإيطالية في بانكوك",
      description:
        "ستة فروع لـ Mozza في بانكوك: سنترال بارك وإم كوارتيير وسيام باراغون وآيكون سيام وسنترال شيدلوم وسنترال وورلد. الاتجاهات والحجز (تجريبي).",
    },
  },
  hero: {
    h1: "مطعم إيطالي أصيل في بانكوك",
    sub: "بيتزا بفرن الحطب ومعكرونة مصنوعة يدويًا، La Cucina di Mamma",
    aiCaption: "صورة توضيحية بالذكاء الاصطناعي",
    cta: { reserve: "احجز طاولة", menu: "اطلع على القائمة" },
  },
  chooser: { title: "اختر فرع Mozza الخاص بك", intro: "ستة فروع في أنحاء بانكوك. اختر الأقرب إليك." },
  signature: { title: "أطباقنا المميزة", intro: "ستة أطباق للبداية. اضغط على أي طبق للانتقال إليه في القائمة." },
  awards: {
    title: "التقدير",
    note: "نص نائب — يجب التحقق من أسماء الجوائز وسنواتها وصياغتها قبل الاستخدام.",
    items: ["Gambero Rosso", "Lifestyle Asia Best Bites", "Tripadvisor Travellers' Choice"],
  },
  faq: {
    title: "الأسئلة الشائعة",
    items: [
      {
        q: "كيف أحجز طاولة؟",
        a: "اختر فرعك ثم اضغط «احجز طاولة». في هذا العرض التجريبي رابط الحجز مجرد عنصر نائب ولا يتم أي حجز فعلي.",
      },
      { q: "هل تقدمون خدمة التوصيل؟", a: "تختلف خدمة التوصيل حسب الفرع وهي بانتظار التأكيد من مجموعة المطاعم." },
      {
        q: "هل يمكنني الحجز لمجموعة كبيرة؟",
        a: "المجموعات مرحَّب بها من حيث المبدأ، وشروط المجموعات بانتظار التأكيد. استخدم واتساب أو LINE (روابط تجريبية) للاستفسار من الفرع.",
      },
      {
        q: "ما هي ساعات العمل؟",
        a: "تظهر ساعات العمل في صفحة كل فرع. في هذا العرض التجريبي معظم أوقات الفتح موسومة بأنها بانتظار التأكيد.",
      },
    ],
  },
  footer: {
    branches: "الفروع",
    follow: "تابعنا",
    line: "LINE",
    instagram: "Instagram",
    facebook: "Facebook",
    part: "جزء من Hospitality Management Asia",
    disclaimer: "عرض تجريبي خاص. ليس الموقع الرسمي لـ Mozza. غير مفهرس.",
    photos: "صور تجريبية لأغراض العرض التوضيحي فقط.",
  },
  locationsPage: {
    mapLabel: "خريطة تخطيطية لفروع Mozza في بانكوك",
    mapCaption: "خريطة تخطيطية — المواقع تقريبية وللتوضيح فقط وليست بمقياس رسم.",
    h1: "فروع Mozza في بانكوك",
    intro: "ستة فروع لـ Mozza في بانكوك. اعثر على أقرب فرع، واحصل على الاتجاهات أو احجز. لا تُعرض تفاصيل الفروع غير المؤكدة حتى يتم التحقق منها.",
  },
  branchPage: {
    reserve: "احجز طاولة",
    directions: "الاتجاهات",
    menu: "القائمة",
    addressTitle: "العنوان",
    mapAlt: "صورة نائبة لخريطة توضح موقع الفرع",
    mapCaption: "خريطة ثابتة نائبة — لا يتم استخدام مفتاح API للخرائط.",
    gettingHere: "كيفية الوصول",
    directionsFallback: "الاتجاهات على Google Maps",
    detailsPending: "تفاصيل إضافية عن هذا الفرع قيد التأكيد.",
    transitLabel: "أقرب محطة BTS / MRT",
    landmarkLabel: "معلم قريب",
    aboutTitle: "عن هذا الفرع",
    signatureTitle: "الأطباق المميزة في هذا الفرع",
    hoursTitle: "ساعات العمل",
    day: "اليوم",
    hoursCol: "الساعات",
    faqTitle: "أسئلة عن الفرع",
    otherTitle: "فروع Mozza الأخرى",
  },
  sticky: { label: "تواصل سريع", reserve: "احجز", whatsapp: "واتساب", line: "LINE", directions: "الاتجاهات" },
  whatsappMessage: (place) => `مرحبًا! أود الاستفسار عن حجز طاولة في ${place}.`,
  branches: branchTexts("ar"),
};
