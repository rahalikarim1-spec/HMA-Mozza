import type { CategoryId, DishId, TagId } from "@/content/types";

export const CATEGORIES: { id: CategoryId; anchor: string }[] = [
  { id: "starters", anchor: "starters" },
  { id: "pizza", anchor: "pizza" },
  { id: "pasta", anchor: "pasta" },
  { id: "desserts", anchor: "desserts" },
];

export interface DishConfig {
  id: DishId;
  category: CategoryId;
  image: string;
  /** `confirm: true` renders "(to confirm)" next to the tag. */
  tags: { tag: TagId; confirm?: boolean }[];
}

export const DISHES: DishConfig[] = [
  {
    id: "burrata",
    category: "starters",
    image: "/images/burrata.jpg",
    tags: [{ tag: "vegetarian" }],
  },
  {
    id: "carpi-salerno",
    category: "pizza",
    image: "/images/carpi-salerno.jpg",
    tags: [{ tag: "pork" }],
  },
  {
    id: "truffle-tagliolini",
    category: "pasta",
    image: "/images/truffle-tagliolini.jpg",
    tags: [],
  },
  {
    id: "truffle-risotto",
    category: "pasta",
    image: "/images/truffle-risotto.jpg",
    tags: [{ tag: "vegetarian", confirm: true }],
  },
  {
    id: "lobster-spaghetti",
    category: "pasta",
    image: "/images/lobster-spaghetti.jpg",
    tags: [],
  },
  {
    id: "tiramisu",
    category: "desserts",
    image: "/images/tiramisu.jpg",
    tags: [{ tag: "alcohol", confirm: true }],
  },
];

/** Homepage "signature dishes" order (the six dishes from the brief). */
export const SIGNATURE_ORDER: DishId[] = [
  "truffle-tagliolini",
  "burrata",
  "carpi-salerno",
  "truffle-risotto",
  "lobster-spaghetti",
  "tiramisu",
];

export function getDish(id: DishId): DishConfig {
  const d = DISHES.find((x) => x.id === id);
  if (!d) throw new Error(`Unknown dish: ${id}`);
  return d;
}
