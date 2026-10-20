import type { FaqItem } from "@/content/dict";
import { menusUi, type MenuId } from "@/content/menus-ui";
import { categoryName, describe, getMenu } from "./menus";
import type { Lang } from "@/content/types";
import {
  BRAND_NAME,
  FACEBOOK_URL,
  HMA_URL,
  INSTAGRAM_URL,
  ORG_NAME,
  BRANCHES,
  PARENT_ORG_NAME,
  SITE_ORIGIN,
  shown,
  type BranchConfig,
} from "@/config/site";
import { absoluteUrl } from "./routes";

const CTX = "https://schema.org";
const ORG_ID = `${SITE_ORIGIN}/#organization`;

export function organizationLd() {
  return {
    "@context": CTX,
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG_NAME,
    alternateName: `${BRAND_NAME} Trattoria Italiana`,
    url: `${SITE_ORIGIN}/`,
    parentOrganization: { "@type": "Organization", name: PARENT_ORG_NAME, url: HMA_URL },
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  };
}

export function blogPostingLd(lang: Lang, slug: string, headline: string, description: string) {
  return {
    "@context": CTX,
    "@type": "BlogPosting",
    headline,
    description,
    inLanguage: lang,
    mainEntityOfPage: absoluteUrl(lang, `blog/${slug}`),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function restaurantLd(lang: Lang, b: BranchConfig) {
  const route = `locations/${b.slug}`;
  const street = shown(b, "street") ? [shown(b, "floor") ? b.floor : null, b.street].filter(Boolean).join(", ") : null;
  return {
    "@context": CTX,
    "@type": "Restaurant",
    "@id": `${absoluteUrl("en", route)}#restaurant`,
    name: b.name,
    url: absoluteUrl(lang, route),
    image: `${SITE_ORIGIN}${b.image}`,
    servesCuisine: ["Italian", "Pizza", "Pasta"],
    hasMenu: absoluteUrl(lang, "menu/food"),
    acceptsReservations: absoluteUrl(lang, "reserve"),
    // Unconfirmed values (verify: true) are omitted. Opening hours stay out until real opening times are in config.
    address: {
      "@type": "PostalAddress",
      ...(street ? { streetAddress: street } : {}),
      ...(shown(b, "area") && b.area ? { addressRegion: b.area } : {}),
      addressLocality: b.city,
      ...(shown(b, "postalCode") && b.postalCode ? { postalCode: b.postalCode } : {}),
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

export function menuLd(lang: Lang, menuId: MenuId) {
  const data = getMenu(menuId);
  const ui = menusUi[lang];
  return {
    "@context": CTX,
    "@type": "Menu",
    name: ui.menus[menuId].h1,
    url: absoluteUrl(lang, `menu/${menuId}`),
    inLanguage: lang,
    hasMenuSection: data.categories.map((c) => ({
      "@type": "MenuSection",
      name: categoryName(c.id, lang),
      hasMenuItem: c.items.map((it) => {
        const prices = it.sizes ? it.sizes.map((s) => s.price) : it.price !== null ? [it.price] : [];
        return {
          "@type": "MenuItem",
          name: it.name,
          ...(describe(it, lang) ? { description: describe(it, lang) } : {}),
          ...(it.tags.includes("vegetarian") ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
          ...(prices.length
            ? { offers: prices.map((p) => ({ "@type": "Offer", price: String(p), priceCurrency: "THB" })) }
            : {}),
        };
      }),
    })),
  };
}
