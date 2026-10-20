/** Food-menu item ids (see src/data/menus/food.json). Only dishes that exist in the published menu. */
export const HOME_SIGNATURE = [
  "truffle-tagliolini",
  "tomato-confit-and-balsamic-caramel",
  "carpi-salerno",
  "mushroom-risotto",
  "lasagna-della-nonna",
  "cocotte-s-tiramisu",
];

export const BRANCH_SIGNATURE: Record<string, [string, string, string]> = {
  "central-park": ["tomato-confit-and-balsamic-caramel", "truffle-tagliolini", "carpi-salerno"],
  emquartier: ["carpi-salerno", "mushroom-risotto", "cocotte-s-tiramisu"],
  "siam-paragon": ["pesto-and-sun-dried-cherry-tomatoes", "spaghetti-gamberi-and-stracciatella", "cocotte-s-tiramisu"],
  iconsiam: ["truffle-tagliolini", "lasagna-della-nonna", "cocotte-s-tiramisu"],
  "central-chidlom": ["tomato-confit-and-balsamic-caramel", "carpi-salerno", "spaghetti-alla-carbonara"],
  "central-world": ["tomato-confit-and-balsamic-caramel", "carpi-salerno", "truffle-tagliolini"],
};
