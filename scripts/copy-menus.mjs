// Copies the source menu PDFs into public/menus/ (git-ignored) so "Download PDF" works without duplicating 20 MB in git.
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
mkdirSync("public/menus", { recursive: true });
for (const f of ["food", "brunch", "aperitivo", "afternoon-tea"]) {
  const src = `source/menus/${f}.pdf`;
  if (existsSync(src)) copyFileSync(src, `public/menus/${f}.pdf`);
  else console.warn(`copy-menus: ${src} missing`);
}
