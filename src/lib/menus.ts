import type { Lang } from "@/content/types";
import { menusUi, MENU_IDS, type MenuId } from "@/content/menus-ui";
import food from "@/data/menus/food.json";
import brunch from "@/data/menus/brunch.json";
import aperitivo from "@/data/menus/aperitivo.json";
import afternoonTea from "@/data/menus/afternoon-tea.json";
import descriptions from "@/data/menus/descriptions.i18n.json";

export type DietTag = "vegetarian" | "vegetarian-on-request" | "pork" | "alcohol" | "spicy";

export interface MenuItemData {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  sizes: { label: string; price: number }[] | null;
  priceNote: string | null;
  tags: DietTag[];
  page: number | string;
  verify: boolean;
  reviewNotes: string[];
}
export interface MenuCategoryData {
  id: string;
  name: string;
  items: MenuItemData[];
}
export interface MenuData {
  menu: MenuId;
  source: string;
  title: string;
  status: string;
  currency: "THB";
  categories: MenuCategoryData[];
}

const MENUS: Record<MenuId, MenuData> = {
  food: food as MenuData,
  brunch: brunch as MenuData,
  aperitivo: aperitivo as MenuData,
  "afternoon-tea": afternoonTea as MenuData,
};

export const getMenu = (id: MenuId): MenuData => MENUS[id];
export const asMenuId = (v: string): MenuId | null => (MENU_IDS as string[]).includes(v) ? (v as MenuId) : null;

export function itemCount(id: MenuId): number {
  return MENUS[id].categories.reduce((n, c) => n + c.items.length, 0);
}

/** Dish names stay as printed; only descriptions are translated. */
export function describe(it: MenuItemData, lang: Lang): string | null {
  if (!it.description) return null;
  if (lang === "en") return it.description;
  const t = (descriptions as Record<string, { th: string; ar: string }>)[it.description];
  return t ? t[lang] : it.description;
}

export function categoryName(id: string, lang: Lang): string {
  return menusUi[lang].categories[id] ?? id;
}

const fmt = (n: number) => `${n.toLocaleString("en-US")} THB`;

export function priceText(it: MenuItemData, lang: Lang): string {
  const ui = menusUi[lang].ui;
  if (it.sizes) return it.sizes.map((s) => `${ui.sizes[s.label] ?? s.label} ${fmt(s.price)}`).join(" · ");
  if (it.price === null) return ui.noPrice;
  const n = it.priceNote ?? "";
  const suffix = /per glass/.test(n)
    ? ` / ${ui.priceNotes.perGlass}`
    : /each/.test(n)
      ? ` / ${ui.priceNotes.each}`
      : /add-on/.test(n)
        ? ` (${ui.priceNotes.addOn})`
        : /hot only/.test(n)
          ? ` (${ui.priceNotes.hotOnly})`
          : "";
  return (/add-on/.test(n) ? "+" : "") + fmt(it.price) + suffix;
}

export function findItem(menu: MenuId, id: string): MenuItemData | undefined {
  for (const c of MENUS[menu].categories) for (const it of c.items) if (it.id === id) return it;
}

/** Items referenced by dish id from the food menu (home, branch and category pages). */
export function foodItem(id: string): { item: MenuItemData; category: MenuCategoryData } {
  for (const c of MENUS.food.categories) for (const it of c.items) if (it.id === id) return { item: it, category: c };
  throw new Error(`Unknown food item: ${id}`);
}

export function itemsInCategories(menu: MenuId, categoryIds: string[]): { item: MenuItemData; category: MenuCategoryData }[] {
  return MENUS[menu].categories.filter((c) => categoryIds.includes(c.id)).flatMap((c) => c.items.map((item) => ({ item, category: c })));
}
