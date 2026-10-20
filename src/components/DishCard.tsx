import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/dict";
import type { Lang } from "@/content/types";
import type { DishConfig } from "@/config/menu";
import { priceLabel } from "@/lib/format";
import { menuAnchor } from "@/lib/routes";
import Icon from "./Icon";

const tagStyle = {
  vegetarian: "bg-leaf text-cream",
  pork: "bg-tomato text-cream",
  alcohol: "bg-ink text-cream",
} as const;

function Tags({ dish, d }: { dish: DishConfig; d: Dict }) {
  if (dish.tags.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {dish.tags.map(({ tag, confirm }) => (
        <li
          key={tag}
          className={`rounded-sm px-2 py-1 text-xs font-bold ${tagStyle[tag]}`}
        >
          {d.tags[tag]}
          {confirm ? ` (${d.tags.toConfirm})` : ""}
        </li>
      ))}
    </ul>
  );
}

/** Full dish card for the menu page. */
export function MenuDishCard({ dish, d, eager = false }: { dish: DishConfig; d: Dict; eager?: boolean }) {
  const t = d.dishes[dish.id];
  const price = priceLabel(dish.id, d);
  return (
    <article id={dish.id} className="flex flex-col overflow-hidden rounded-sm bg-cream sm:flex-row">
      <Image
        src={dish.image}
        alt={t.alt}
        width={800}
        height={800}
        sizes="(min-width: 640px) 240px, 100vw"
        loading={eager ? "eager" : "lazy"}
        className="aspect-square w-full object-cover sm:w-60"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl">{t.name}</h3>
        <p className="mt-2">{t.description}</p>
        <Tags dish={dish} d={d} />
        <p className="mt-auto pt-4 text-sm font-semibold">
          <span className="opacity-75">{d.common.demoPrice}</span>
          {" · "}
          <span dir={price.ltr ? "ltr" : undefined}>{price.text}</span>
        </p>
      </div>
    </article>
  );
}

/** Compact card linking to the menu anchor (home + branch pages). */
export function SignatureCard({
  dish,
  d,
  lang,
  priority = false,
}: {
  dish: DishConfig;
  d: Dict;
  lang: Lang;
  priority?: boolean;
}) {
  const t = d.dishes[dish.id];
  return (
    <Link
      href={menuAnchor(lang, dish.id)}
      className="group flex h-full flex-col overflow-hidden rounded-sm bg-cream transition-shadow hover:shadow-[6px_6px_0_var(--ink)]"
    >
      <Image
        src={dish.image}
        alt={t.alt}
        width={800}
        height={800}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
        loading={priority ? "eager" : "lazy"}
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl">{t.name}</h3>
        <p className="mt-2 text-sm">{t.description}</p>
        <Tags dish={dish} d={d} />
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold text-tomato group-hover:underline">
          {d.common.viewDish}
          <Icon name="arrow" className="h-4 w-4" mirror />
        </span>
      </div>
    </Link>
  );
}
