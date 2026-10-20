import Link from "next/link";
import type { Lang } from "@/content/types";
import { menusUi } from "@/content/menus-ui";
import { categoryName, describe, foodItem, priceText } from "@/lib/menus";
import { menuAnchor } from "@/lib/routes";
import Icon from "./Icon";

const toneClass: Record<string, string> = {
  vegetarian: "bg-leaf text-cream",
  "vegetarian-on-request": "border border-leaf text-leaf",
  pork: "bg-tomato text-cream",
  alcohol: "bg-ink text-cream",
  spicy: "border border-tomato text-tomato",
};
const tagLabel = (lang: Lang, t: string) => {
  const tags = menusUi[lang].ui.tags;
  return t === "vegetarian-on-request" ? tags.vegetarianOnRequest : tags[t as keyof typeof tags];
};

/** Text card linking to a dish on the food menu. Data comes from src/data/menus/food.json. */
export function SignatureCard({ id, lang }: { id: string; lang: Lang }) {
  const { item, category } = foodItem(id);
  const ui = menusUi[lang].ui;
  const desc = describe(item, lang);
  return (
    <Link
      href={menuAnchor(lang, id, "food")}
      className="group flex h-full flex-col rounded-sm bg-cream p-5 transition-shadow hover:shadow-[6px_6px_0_var(--ink)]"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-tomato">{categoryName(category.id, lang)}</p>
      <h3 className="mt-1 text-xl">{item.name}</h3>
      {desc && <p className="mt-2 text-sm">{desc}</p>}
      {item.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li key={t} className={`rounded-sm px-2 py-1 text-xs font-bold ${toneClass[t]}`}>
              {tagLabel(lang, t)}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-auto pt-4 text-sm font-bold" dir="ltr">
        {priceText(item, lang)}
      </p>
      <span className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-tomato group-hover:underline">
        {menusUi[lang].hub.open}
        <Icon name="arrow" className="h-4 w-4" mirror />
      </span>
    </Link>
  );
}
