# Mozza Bangkok — Multilingual Search & Conversion CONCEPT DEMO

> **Private pitch mockup. Not the official Mozza website.** Every page carries the
> "Concept demo by Wadhah Belhassen" banner, `noindex, nofollow`, and `robots.txt` disallows everything.

Next.js (App Router) + TypeScript + Tailwind CSS v4, static export (`output: 'export'`).
English `/`, Thai `/th/`, Arabic `/ar/` (RTL). 5 branch pages, HTML menu, locations hub.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export -> ./out
npm start            # serves ./out (npx serve)
npm run typecheck
npm run review-strings   # regenerates NATIVE_REVIEW.md
```

`dev`/`build` use `--webpack` on purpose: with Turbopack, every language's font preloads leak into
every page (Thai + Arabic files in the English `<head>`); webpack preloads only what each language needs.

## Where to edit things

| What | File |
|---|---|
| WhatsApp number, LINE / booking / PDF / Instagram / Facebook placeholders, demo rating, site origin, GTM id | `src/config/site.ts` (top of file) |
| **Branch data** (address, hours, closing time, map link query, images, 3 signature dishes) | `src/config/site.ts` → `BRANCHES` |
| **Demo prices** (THB, `null` = "TBC") | `src/config/site.ts` → `PRICES` |
| Menu structure, categories, dietary tags (`confirm: true` shows "to confirm") | `src/config/menu.ts` |
| **Colours** (mustard, tomato, cream, ink) | `src/app/globals.css` → `:root` variables |
| Logo (inline SVG placeholder) | `src/components/Logo.tsx` |
| All copy EN / TH / AR (typed dictionaries) | `src/content/en.ts`, `th.ts`, `ar.ts` (shape in `dict.ts`) |
| Branch intro, transit, landmark, branch FAQ per language | `branches` key inside each dictionary |
| Fonts | `src/fonts/*.ts` |
| Demo `dataLayer` events | `src/lib/track.ts` |
| JSON-LD builders | `src/lib/jsonld.ts` |
| Images | `public/images/*.jpg` (grey placeholders — overwrite with real photos, keep names/ratios) |

Branch opening/closing times: `opens` is `"TBC"` for every branch until provided; `closes` is set per brief
(Central Chidlom: `"TBC"`). Per-day exceptions: `hoursOverrides` on a branch.

Booking links: `bookingUrlFor(slug)` turns `#reserve-demo` into `#reserve-demo-<slug>`; a real URL gets `?branch=<slug>`.

## What the demo contains (per brief)

- Fixed top banner (EN/TH/AR), `noindex, nofollow` meta, disallow-all `robots.txt`, `sitemap.xml` with hreflang alternates.
- Language switcher (EN | ไทย | العربية) on every page; keeps you on the same page. hreflang `en/th/ar/x-default`, self-canonicals.
- Mobile sticky bottom bar (Reserve / WhatsApp / LINE / Directions): WhatsApp first for EN & AR, LINE first for TH;
  branch pages pre-set Reserve, Directions and the WhatsApp message to the branch. On non-branch pages "Directions" opens the locations hub.
- Pork / alcohol labelled in all three languages. "Vegetarian" (risotto) and "may contain alcohol" (tiramisu) are marked *to confirm*.
  No dietary-certification claims are made anywhere (the word is deliberately absent from the codebase).
- Every price is labelled "Demo price" and comes from config.
- Tracking: `window.dataLayer` + `console.log("[dataLayer]", …)` for `reservation_click`, `whatsapp_click`, `line_click`,
  `directions_click` (`{branch, language}`; `branch` is `"any"` outside branch pages), `menu_view`, `pdf_download`
  (`{language}`), `language_switch` (`{from, to}`). GTM snippet is commented out with `GTM-XXXXXXX` (`src/components/RootDocument.tsx`).
- JSON-LD: Organization (parent Hospitality Management Asia), Restaurant per branch, Menu/MenuSection/MenuItem, BreadcrumbList, FAQPage.
  `openingHours` is a placeholder string (`Mo-Su TBC-22:00`), not valid schema.org until real times are in config.
  No `aggregateRating` / `telephone` is emitted.

## Thai and Arabic — NEEDS NATIVE REVIEW

All TH/AR copy is marked `<!-- NEEDS NATIVE REVIEW -->` in `src/content/th.ts` and `src/content/ar.ts`.
**The complete string list is in [`NATIVE_REVIEW.md`](./NATIVE_REVIEW.md)** (generated; ~200 strings per language),
ready to forward to reviewers. Highest-risk items to look at first: the top banner, hero H1/sub, the pork / alcohol / vegetarian
labels, "Demo price", the "to confirm" / TBC wording, the Arabic register (MSA vs Gulf), and the Thai/Arabic mall names.
Dish names are intentionally kept in their original Latin form in all languages.

## Measured (Lighthouse mobile, local static server with gzip)

Performance 92–99, Accessibility 100, Best Practices 100, CLS 0 on EN/TH/AR home, menu, locations hub and branch pages.
**SEO scores ~69, and that is expected:** the only failing audit is `is-crawlable`, caused by the mandatory `noindex`.
Everything else in the SEO category passes. Expect Performance to vary with hosting — serve with gzip/brotli.
