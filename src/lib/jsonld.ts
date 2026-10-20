import type { Dict, FaqItem } from "@/content/dict";
import type { Lang } from "@/content/types";
import {
  BRAND_NAME,
  BRANCHES,
  CURRENCY,
  PARENT_ORG_NAME,
  PRICES,
  SITE_ORIGIN,
  type BranchConfig,
} from "@/config/site";
import { CATEGORIES, DISHES } from "@/config/menu";
import { absoluteUrl } from "./routes";

const CTX = "https://schema.org";
const ORG_ID = `${SITE_ORIGIN}/#organization`;

export function organizationLd() {
  return {
    "@context": CTX,
    "@type": "Organization",
    "@id": ORG_ID,
    name: `${BRAND_NAME} Trattoria Italiana`,
    url: `${SITE_ORIGIN}/`,
    parentOrganization: { "@type": "Organization", name: PARENT_ORG_NAME },
  };
}

export function restaurantLd(lang: Lang, b: BranchConfig) {
  const route = `locations/${b.slug}` as const;
  return {
    "@context": CTX,
    "@type": "Restaurant",
    "@id": `${absoluteUrl("en", route)}#restaurant`,
    name: b.name,
    url: absoluteUrl(lang, route),
    image: `${SITE_ORIGIN}${b.image}`,
    servesCuisine: ["Italian", "Pizza", "Pasta"],
    hasMenu: absoluteUrl(lang, "menu"),
    // PLACEHOLDER hours - "TBC" is not valid schema.org until real times are filled in config.
    openingHours: `Mo-Su ${b.opens}-${b.closes}`,
    address: {
      "@type": "PostalAddress",
      ...(b.street !== "TBC" ? { streetAddress: b.street } : {}),
      addressLocality: b.city,
      addressRegion: b.area,
      ...(b.postalCode ? { postalCode: b.postalCode } : {}),
      addressCountry: "TH",
    },
    parentOrganization: { "@id": ORG_ID },
    inLanguage: lang,
  };
}

export function restaurantsListLd(lang: Lang) {
  return BRANCHES.map((b) => restaurantLd(lang, b));
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@context": CTX,
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function menuLd(lang: Lang, d: Dict) {
  return {
    "@context": CTX,
    "@type": "Menu",
    name: d.menuPage.h1,
    url: absoluteUrl(lang, "menu"),
    inLanguage: lang,
    hasMenuSection: CATEGORIES.map((c) => ({
      "@type": "MenuSection",
      name: d.menuPage.categories[c.id],
      hasMenuItem: DISHES.filter((x) => x.category === c.id).map((dish) => {
        const price = PRICES[dish.id];
        return {
          "@type": "MenuItem",
          name: d.dishes[dish.id].name,
          description: d.dishes[dish.id].description,
          ...(dish.tags.some((t) => t.tag === "vegetarian" && !t.confirm)
            ? { suitableForDiet: "https://schema.org/VegetarianDiet" }
            : {}),
          ...(price !== null
            ? { offers: { "@type": "Offer", price: String(price), priceCurrency: CURRENCY } }
            : {}),
        };
      }),
    })),
  };
}
