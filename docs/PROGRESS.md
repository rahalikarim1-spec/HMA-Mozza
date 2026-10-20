# PROGRESS — read this first in a new session

_Last updated: 2026-10-20 (end of the scroll-fix session)._

## 1. What this is
A **private concept demo** (pitch mockup) of a search-optimised, multilingual, conversion-focused site for **Mozza By Cocotte** (restaurant group **Hospitality Management Asia, HMA**, Bangkok). Built by the user (a digital-marketing consultant, Wadhah Belhassen) to show HMA's marketing team. It is **not** the official Mozza site.

- Next.js 16 (App Router) + TypeScript + Tailwind v4, **static export** (`output: 'export'`, `trailingSlash: true`), `--webpack` builds.
- Languages: EN `/`, TH `/th/`, AR `/ar/` (RTL). No CMS; typed dictionaries.
- Every page: `<meta name="robots" content="noindex, nofollow">` + fixed top banner "Concept demo by Wadhah Belhassen — not the official Mozza website" (EN/TH/AR). `robots.txt` **allows** crawling on purpose (a crawler must fetch the page to see `noindex`).
- Answer the user in English; they are an expert (Google Ads/SEO/CRO) — be direct, critical, no generic advice.

## 2. Branches, deployment
- **Working branch:** `claude/dreamy-noether-ux1o1s` (all work happens here; push here only).
- **PR base ("production" side):** `claude/eloquent-ritchie-lmgpnk`. PR #1 and PR #2 were merged by the user. **Never merge or push to it; the user merges PRs.** Open a new PR when asked (no unrequested PRs).
- If a PR was already merged, restart the working branch from the base (`git fetch origin <base> && git checkout -B claude/dreamy-noether-ux1o1s origin/<base>`) before new work.
- **Vercel:** no Vercel config exists in the repo and this environment has no Vercel access. _Which Vercel project(s) track which branch is NOT known to the agent — ask the user and record it here._ Rule of thumb: pushes to the working branch / PRs = **preview**; anything merged into the base branch may be **production** — never merge without the user.
- Optional password protection (off by default): `deploy/vercel/middleware.ts` (untested), `npm run build:protected` for Hostinger (see README).
- Build env facts: Google Fonts download works at build time; `images.unsplash.com`/`pexels.com` are blocked (that is why photos are not stock). Outbound network is otherwise restricted.

## 3. Commands
`npm run build` (also copies `source/menus/*.pdf` → `public/menus/`), `npm run check` (post-build: **zero broken internal links/anchors**, title ≤60, description ≤155, 1 H1, noindex, hreflang x4, canonical, OG, JSON-LD, banner), `npm run typecheck`, `npm run review-strings`, `npm run review-priority`, `npm run verify-list`, `npm start`.
Route files in `src/app/(en|th|ar)/` are **generated**: edit `scripts/routes.json`, run `python3 scripts/gen-routes.py`.

## 4. What has been built (phase by phase)
| Step | Result | Key files |
|---|---|---|
| Initial build | Home, menu, locations, 5 branch pages, sticky mobile bar (WhatsApp/LINE first per language), tracking, SEO, banner, fonts (DM Serif Display, Inter, Noto Sans Thai, IBM Plex Sans Arabic) | `src/app/`, `src/components/`, `src/config/site.ts` |
| Follow-ups | robots allow + noindex; unverified transit hidden; optional password protection; Thai priority review list | `deploy/`, `scripts/protect-hostinger.mjs` |
| Photos | 4 brand photos from a collage the user supplied (branch assignment arbitrary, **not free-licence**); stock photos impossible (blocked hosts) | `public/images/`, README "Photos" |
| Hero redesign | Full-bleed AI hero (`hero-bg*.webp/jpg`), AA-checked overlay, RTL mirrored, "AI illustration" caption | `src/pages-impl/HomePage.tsx` |
| **A — Menus** | 4 menus transcribed from the PDFs (144 food, 49 brunch, 13 aperitivo, 2 afternoon-tea); `/menu` hub + 4 pages with search, filters, schema, PDF link; TH/AR descriptions | `src/data/menus/*.json`, `descriptions.i18n.json`, `src/lib/menus.ts`, `src/content/menus-ui.ts`, `src/components/MenuExplorer.tsx`, `docs/MENU_REVIEW.md` |
| **B — Locations** | Hub with schematic map + 6 branches (incl. **central-world, everything unconfirmed**); verify-flag gating; Restaurant schema | `src/config/site.ts` (`BRANCHES`, `shown()`), `src/content/branches.ts`, `src/components/StylisedMap.tsx` |
| **C — SEO pages** | `/neapolitan-pizza-bangkok`, `/pasta-bangkok`, `/celebrations`, `docs/SEO_PLAN.md` | `src/content/landing.ts`, `src/pages-impl/LandingPage.tsx` |
| **D+E — Brand/group** | about, hma-privilege, delivery (placeholders), contact, blog + 2 demo posts, tri-lingual 404, group footer, Organization schema "Mozza By Cocotte" | `src/content/company.ts`, `src/pages-impl/CompanyPages.tsx`, `src/components/Footer.tsx`, `src/app/global-not-found.tsx` |
| **F — Reservation** | 6-step flow at `/reserve/` + modal from every Reserve button (links with `data-reserve`); simulated availability; SVG zone plan + radio list; local `.ics`; `?debug=1` attribution panel; **no network/storage/personal data** | `src/components/reservation/*`, `src/lib/reservation.ts`, `src/content/reservation-ui.ts`, `docs/TRACKING_PLAN.md` |
| **G — Nav/SEO** | Menu & Locations dropdowns + accessible drawer; OG/Twitter; sitemap with alternates from one route list | `src/components/MainNav.tsx`, `Header.tsx`, `src/lib/allRoutes.ts`, `src/lib/seo.ts` |
| **H — Quality** | `scripts/check-site.mjs`, RTL fixes (no `لـ`/`بـ` before Latin), `docs/VERIFY_LIST.md`, native-review generators | `scripts/` |
| **Scroll fix** | Pages opened mid-scroll. Cause: global `scroll-behavior: smooth` animated Next's scroll-to-top; plus the reservation flow focused its heading on first render (`/reserve/`). Fix: removed smooth scrolling, no first-render focus, drawer/modal close + body-scroll-lock release on route change, `ScrollToTop` safety net (skips `#hash` and back/forward) | `src/app/globals.css`, `src/components/ScrollToTop.tsx`, `MainNav.tsx`, `ReservationLauncher.tsx`, `ReservationFlow.tsx` |

Navigation regression test: `scratchpad` script (not in repo) — see §9 for the result.

## 5. Data sources and the core rule
**NEVER INVENT FACTS.** Allowed sources only: `source/menus/*.pdf` (food, brunch, afternoon-tea, aperitivo), `src/config/*`, `/context/*.md` (`2026-10-20_update_new-findings.md`: GBP snapshot 4.9★/~1.5K reviews, Popular Times, GEO findings), and the user's briefs. Anything else = `null`/"TBC" with `verify: true` and **hidden** in the UI until the user confirms. `food.pdf` and `brunch.pdf` are image-only (read by eye; no OCR in the environment). Prices come only from the PDFs, THB, with "Prices as published by Mozza — demo". food.pdf pp. 22–24 (Cocotte brand promo) are deliberately not used.

## 6. Open `verify:true` items (still hidden/flagged) — full list: `docs/VERIFY_LIST.md`
- Opening times for **every** branch (unknown; only closing times from the brief: Central Park 22:00, EmQuartier 22:00, Siam Paragon 21:30, ICONSIAM 22:00; Chidlom and CentralWorld none). Reservation uses a labelled DEMO range (11:00 → closing − 60 min).
- Addresses: EmQuartier 693 vs 695 Sukhumvit; Central Chidlom address TBC (only "1st Floor" known); postcodes/sub-districts hidden for all.
- Transit/landmark: only Central Park shows the menu's own wording ("beside Lumphini Park", "direct BTS and MRT connections"); all others hidden.
- **Mozza CentralWorld: everything unconfirmed** (page shows name + "details being confirmed").
- HMA Privilege programme details; phone numbers/emails (none shown); delivery links (placeholders `#delivery-demo-<slug>`); WhatsApp number/LINE URL (placeholders — hard rule: no real IDs); About story (needs wording from the current mozza-bangkok.com, unreachable from the sandbox); celebration offers (none published).
- Schematic map positions; SITE_ORIGIN placeholder domain; reservation inventions (zone capacities, availability rules).

### Confirmed by the user (stated in chat; **not yet applied in code unless noted**)
The user said they already confirmed: **awards**, **social links**, **"brick-oven"**, **"handmade pasta"**, and the **Central Park wording**. Apply when you next touch the code, after asking the user for the exact approved text: flip `AWARDS_VERIFIED` (`src/config/site.ts`), re-check `INSTAGRAM_URL`/`FACEBOOK_URL`, replace "wood-fired" with the approved "brick-oven" wording (EN/TH/AR, `docs/SEO_PLAN.md`, hero/landing copy, Thai keyword "พิซซ่าเตาฟืน"), keep "handmade pasta" (and drop "fresh pasta/พาสต้าเส้นสด" body claims if not approved), and use the approved Central Park text in `src/content/branches.ts`. Then regenerate `NATIVE_REVIEW*.md` and `docs/VERIFY_LIST.md`.

## 7. Open review items
- `docs/MENU_REVIEW.md`: every item is "transcribed — unverified" with page numbers; 12 flagged decisions (e.g. Niçoise vegetarian icon contradicts ingredients → tag withheld; pork derived from ingredient names on icon-less menus; alcohol tag only where named; Cocotte's Tiramisu alcohol unknown).
- `NATIVE_REVIEW_PRIORITY.md` (74 Thai strings: banner, home, Central Park, /menu) and `NATIVE_REVIEW.md` (~1,300 TH/AR strings). All TH/AR copy is machine-drafted. Every new TH/AR string must land in these (regenerate with the npm scripts).

## 8. Known limits
- Lighthouse mobile (throttled, ±4 variance): home 86–92, Central Park 95, /menu/food 94, /reserve 89–94; Accessibility 100, Best Practices 100, CLS 0. **SEO ≈ 66–69 is expected** (mandatory `noindex` fails `is-crawlable`).
- Demo mechanics: availability/zones/hours range are simulated and labelled; nothing is sent or stored; calendar `.ics` has no personal data; `data-reserve` modal needs JS (falls back to `/reserve/`).
- Images: hero background is **AI-generated** (captioned); branch photos are brand photos from a collage, low-res, arbitrarily assigned; Chidlom/CentralWorld/map are grey placeholders; dish cards are text-only.
- Brand colours/logo are placeholders (`src/app/globals.css`, `Logo.tsx`).

## 9. Navigation/scroll test result (final)
NAVTEST_RESULT_PLACEHOLDER

## 10. Non-negotiable rules
1. **Never use the word "halal"** anywhere (code, content, docs shipped to the site). Label **pork** and **alcohol** clearly in all languages; dietary tags only if stated in the source menus.
2. **Reservation flow must not send or store personal data**: no network requests, no localStorage/sessionStorage/cookies of personal fields, no payment; confirmation says "Demo — no reservation has been made" (EN/TH/AR).
3. No real phone numbers / WhatsApp / LINE IDs / booking forms / payment; placeholders live in `src/config/site.ts`.
4. Banner + `noindex, nofollow` on every page; no logos of other brands (text links only).
5. **No merge to production without the user.** Do not create PRs unless asked; the user merges.
6. Never invent facts (see §5). Every new TH/AR string goes to `NATIVE_REVIEW.md`.
7. Commit after each phase; report with screenshots (360×800 and 1440×900, EN/TH/AR).

## 11. NEXT TASK
Build the **private `/strategy` page** from the file the user will attach next session: **`mozza-strategy-page-prompt.md`**. Read that file first; follow the non-negotiable rules above (especially: no invented facts, noindex, EN/TH/AR if requested, no merge). Likely touchpoints: add the route to `scripts/routes.json` + `src/lib/allRoutes.ts`, content module in `src/content/`, run `npm run build && npm run check`, regenerate native-review lists. Consider whether the page should be excluded from the public nav/sitemap (it is "private") and say so to the user.
