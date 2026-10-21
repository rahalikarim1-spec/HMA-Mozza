# Mozza Bangkok — Multilingual Search & Conversion CONCEPT DEMO

> **Private pitch mockup. Not the official Mozza website.** Every page carries the
> "Concept demo by Wadhah Belhassen" banner and `<meta name="robots" content="noindex, nofollow">`.
> `robots.txt` does **not** block crawling (a crawler must be able to fetch a page to see its `noindex`);
> keep it that way. Use the optional password protection below if the URL must not be publicly reachable.

Next.js (App Router) + TypeScript + Tailwind CSS v4, static export (`output: 'export'`).
English `/`, Thai `/th/`, Arabic `/ar/` (RTL). 5 branch pages, HTML menu, locations hub.

## Run

```bash
npm install
npm run dev              # http://localhost:3000 (copies menu PDFs to public/menus first)
npm run build            # static export -> ./out
npm start                # serves ./out
npm run check            # post-build: broken internal links/anchors, title<=60, description<=155, 1 H1, noindex, hreflang, canonical, OG, JSON-LD, banner
npm run typecheck
npm run review-strings   # NATIVE_REVIEW.md (every Thai/Arabic string)
npm run review-priority  # NATIVE_REVIEW_PRIORITY.md (Thai: banner, home, Central Park, /menu)
npm run verify-list      # docs/VERIFY_LIST.md (everything verify:true)
npm run build:protected  # build + optional Hostinger basic auth (see below)
```

`dev`/`build` use `--webpack` on purpose (per-language font preloads; Turbopack leaks all of them into every page).
Route files under `src/app/(en|th|ar)/` are generated: edit `scripts/routes.json`, run `python3 scripts/gen-routes.py`.

## Site map (EN `/`, TH `/th/`, AR `/ar/`)

`/` · `/menu/` + `/menu/{food,brunch,aperitivo,afternoon-tea}/` · `/locations/` + 6 branches (central-park, emquartier, siam-paragon, iconsiam, central-chidlom, central-world) · `/neapolitan-pizza-bangkok/` · `/pasta-bangkok/` · `/celebrations/` · `/about/` · `/hma-privilege/` · `/delivery/` · `/contact/` · `/blog/` + 2 posts · `/reserve/` (+ modal from every Reserve button) · 404 (one tri-lingual `404.html`).

## Where to edit things

| What | File |
|---|---|
| Placeholder links (WhatsApp, LINE, delivery), social URLs, group links, awards flag, rating, site origin | `src/config/site.ts` (top) |
| **Branches** (address parts, floor, closing time, `verify` flags, map position) | `src/config/site.ts` → `BRANCHES` |
| **Menu data** (4 menus, transcribed) | `src/data/menus/*.json` + `docs/MENU_REVIEW.md` |
| Menu descriptions TH/AR | `src/data/menus/descriptions.i18n.json` |
| Menu UI / category names | `src/content/menus-ui.ts` |
| Signature dishes (home, branches) | `src/config/signature.ts` |
| Site copy EN/TH/AR | `src/content/{en,th,ar}.ts`, `branches.ts`, `landing.ts`, `company.ts`, `reservation-ui.ts` |
| Reservation logic (hours range, simulated availability, zones) | `src/lib/reservation.ts` |
| Colours | `src/app/globals.css` `:root` |
| Logo (placeholder SVG) | `src/components/Logo.tsx` |
| Tracking | `src/lib/track.ts` → `docs/TRACKING_PLAN.md` |

## Rules this build follows

- **No invented facts.** Hours, addresses, phones, awards, prices come only from `source/menus/*.pdf`, `src/config` or `/context`. Anything else is `null`/`TBC` with `verify: true` and **hidden** in the UI (`shown()` in `site.ts`). Full list: `docs/VERIFY_LIST.md`.
- **Pork / alcohol labelled** in all languages; vegetarian / spicy tags only from the icons printed on Mozza's food menu.
- **Prices from the PDFs, THB**, with the note "Prices as published by Mozza — demo" (translated).
- **Reservation flow sends/stores nothing**: no network request, no cookies/localStorage/sessionStorage, no payment; confirmation says "Demo — no reservation has been made". The `.ics` is built locally with no personal data.
- Every page: `noindex, nofollow`, demo banner (EN/TH/AR); `robots.txt` allows crawling (a crawler must fetch a page to see its `noindex`).

## /strategy page (public URL, noindex)

A growth-strategy and audit page (EN | FR toggle, 21 sections, return calculator, range-band charts, print-to-PDF) opened directly by the sticky "Growth strategy for multi-location restaurants" button (EN/FR/TH/AR labels, above the mobile booking bar).

- It is a **normal static page** rendered at build time from `strategy/data.mjs` + `strategy/doc.mjs` (route: `src/app/(en)/strategy/page.tsx`, components: `src/components/strategy/`). **There is no passcode and no encryption: the content is publicly readable if someone knows the URL.**
- It is `noindex, nofollow`, **not** in `sitemap.xml`, and not in the nav/footer. Only the sticky button links to it. Use the optional host-level password protection (see "Optional password protection") if the URL must not be reachable.
- Optional build env var: `STRATEGY_EUR_THB` (default `38`) for the "≈ THB" conversion of Keyword Planner bids (labelled "rate to verify").
- Contact + links (only on /strategy, never elsewhere in the demo): section 19 has a WhatsApp CTA (`wa.me/21628320998`, prefilled EN/FR message), secondary links (website, arabicmarket.asia, LinkedIn, phone) and a "Selected results" block (3 published case studies); sections 2, 6–10, 14, 15 end their "What we propose" card with a "Learn more →" link; a closing contact strip follows section 21. All external links use `target="_blank" rel="noopener noreferrer"`. Link data lives in `strategy/doc.mjs` (`CONTACT`, `learnMore`).
- Events: `strategy_button_click`, `whatsapp_contact_click {location}`, `external_link_click {destination, section}`. FR copy needs a native read; TH/AR button strings are in `NATIVE_REVIEW.md`.

## Docs

`docs/SEO_PLAN.md` · `docs/TRACKING_PLAN.md` · `docs/MENU_REVIEW.md` · `docs/VERIFY_LIST.md` · `NATIVE_REVIEW.md` · `NATIVE_REVIEW_PRIORITY.md`

## Optional password protection for deployment

The site is a static export, so there is no server code to gate it; protection comes from the host. It is **off by default**.

### Vercel
1. **Recommended — built-in Deployment Protection** (Project → Settings → Deployment Protection): *Vercel Authentication*
   (viewers must be signed-in members of your team) or *Password Protection* (a shared password; a paid add-on on Pro/Enterprise —
   check Vercel's current plans). No code changes.
2. **Basic auth via Routing Middleware (untested here):** `deploy/vercel/middleware.ts`. Set Framework Preset to *Other* with
   Output Directory `out` and Build Command `npm run build`, copy the file to the project root as `middleware.ts`, run
   `npm i @vercel/functions`, and set `DEMO_USER` / `DEMO_PASSWORD` env vars. Verify against Vercel's Routing Middleware
   docs before relying on it.

### Hostinger (Apache / LiteSpeed shared hosting)
1. Easiest: hPanel → **Websites → Dashboard → Advanced → Password Protect Directories** (wording may vary) → protect `public_html`.
2. Or generate the files at build time:
   ```bash
   DEMO_USER=client DEMO_PASSWORD='choose-a-password' \
   HTPASSWD_PATH=/home/uXXXXXXXXX/domains/your-domain.com/public_html/.htpasswd \
   npm run build:protected
   ```
   `HTPASSWD_PATH` must be the absolute server path (visible in hPanel's File Manager). This writes `out/.htaccess` and
   `out/.htpasswd`; upload the **contents** of `out/` to `public_html` including the dotfiles. Without `DEMO_USER`/`DEMO_PASSWORD`
   the script does nothing. The `{SHA}` hash is adequate for a demo gate, not for real secrets.

## Photos

**Status: partly replaced.** Free-licence stock photos (Unsplash/Pexels) could not be downloaded from the build environment
(hosts blocked), so these images come from a collage supplied by the demo author instead:

| File | Content (cropped from the supplied collage) | Source / licence |
|---|---|---|
| `branch-central-park.jpg` | storefront with open entrance and diners | same |
| `branch-emquartier.jpg` | dining room with lit MOZZA sign | same |
| `branch-siam-paragon.jpg` | arched wooden front with pizza oven inside | same |
| `branch-iconsiam.jpg` | chef ladling sauce at a table of dishes, guest smiling | same |

Notes: the photo-to-branch assignment is **arbitrary** (the collage does not say which branch each shows), and alt texts describe
the picture without naming a branch. The photos contain identifiable guests and staff. They are low resolution (440–690 px wide,
cropped from a collage), so they look soft on retina screens. These are brand-owner assets: fine for a private pitch to the brand,
but do not publish them or call them free-licence.
**Home hero background (decorative, `alt=""`) — real Mozza photos, no longer AI-generated:**

| File | What | Origin |
|---|---|---|
| `hero-bg.webp` / `hero-bg.jpg` | 1536×1024 landscape collage (food and restaurant on the right, dark area on the left for text; desktop, ≈244 / 239 KB) | Composite made from real Mozza By Cocotte photos, supplied by the demo author |
| `hero-bg-mobile.webp` / `hero-bg-mobile.jpg` | 600×900 portrait version (dark area on top for text, photos at the bottom; mobile, ≈165 / 167 KB) | Same, resized/compressed from the supplied 1024×1536 file |

The hero shows a small caption "Photos: Mozza By Cocotte" (TH "ภาพ: Mozza By Cocotte", AR "الصور: Mozza By Cocotte"; key `hero.photoCaption`, in `NATIVE_REVIEW.md`). The photos are brand-owner assets (see the note above): private pitch only. The photos contain the Mozza sign, so on desktop RTL (Arabic) the image is **not** mirrored; the text block moves to the left instead. `hero.jpg` (the old hero box) was removed.

Still grey placeholders: `branch-central-chidlom.jpg` (no fifth photo), the six dish photos, and `map-placeholder.jpg`.
The footer shows a "Demo photos" caption. When more photos are added, list each file's source URL and licence in this table.

## Thai and Arabic — NEEDS NATIVE REVIEW

All TH/AR copy is marked `<!-- NEEDS NATIVE REVIEW -->` in `src/content/th.ts` and `src/content/ar.ts`.
**The complete string list is in [`NATIVE_REVIEW.md`](./NATIVE_REVIEW.md)** (generated; ~200 strings per language),
ready to forward to reviewers.
**Shortlist for a first pass: [`NATIVE_REVIEW_PRIORITY.md`](./NATIVE_REVIEW_PRIORITY.md)** — 62 Thai strings for the banner, home, `/th/locations/central-park` and `/th/menu` (`npm run review-priority`). Highest-risk items to look at first: the top banner, hero H1/sub, the pork / alcohol / vegetarian
labels, "Demo price", the "to confirm" / TBC wording, the Arabic register (MSA vs Gulf), and the Thai/Arabic mall names.
Dish names are intentionally kept in their original Latin form in all languages.

## Measured (Lighthouse mobile, local static server with gzip)

Accessibility 100, Best Practices 100, CLS 0 on all measured pages. Performance (several runs): home 86–92, Central Park 95, /menu/food 94, /reserve 89–94 (mobile throttled; run-to-run variance ±4).
**SEO ~66–69 is expected:** the only failing audit is `is-crawlable`, caused by the mandatory `noindex`.
Preview-only: do not merge to production.
