# SEO PLAN — page → primary keyword → secondary keywords → language

**Scope rule:** only the keywords below (from the demo author's Google Keyword Planner research, Bangkok). No single-dish pages and no pages for keywords outside this list.
**Data caveat:** this repo contains the keyword *list* only. Monthly volumes, CPC and competition were **not provided**, so none are quoted here. Add them from the Keyword Planner export before presenting ("proven demand" must be shown by the export, not by this file).
**Language caveat:** no Arabic keyword research was supplied. `/ar/` pages are translations for the Arabic audience (hreflang + same URLs) and target **no** specific keywords.
**Claims policy:** pages avoid superlatives. "best …" keywords (`best italian restaurant bangkok`, `best pizza bangkok`, `best pasta bangkok`) are tracked as secondary targets but the copy makes no "best" claim: it needs a confirmed, citable source (awards are `verify: true` and currently hidden — see `AWARDS_VERIFIED` in `src/config/site.ts`).

## Page map

| Page (EN URL) | Primary keyword (EN) | Secondary keywords (EN) | Primary keyword (TH) | Secondary keywords (TH) | Languages |
|---|---|---|---|---|---|
| `/` | italian restaurant bangkok | best italian restaurant bangkok | ร้านอาหารอิตาเลี่ยน | อาหารอิตาเลียน | EN · TH · AR(translation) |
| `/neapolitan-pizza-bangkok/` | neapolitan pizza bangkok | best pizza bangkok, pizza bangkok | พิซซ่านาโปลี | ร้านพิซซ่า, พิซซ่าเตาฟืน | EN · TH · AR |
| `/pasta-bangkok/` | pasta bangkok | best pasta bangkok, fresh pasta bangkok | ร้านพาสต้า | พาสต้าเส้นสด | EN · TH · AR |
| `/celebrations/` | birthday dinner bangkok | — | ร้านอาหาร วันเกิด | ร้านอาหาร ครอบครัว | EN · TH · AR |
| `/locations/siam-paragon/` | siam paragon restaurant | — | ร้านอาหาร สยามพารากอน | — | EN · TH · AR |
| `/locations/iconsiam/` | iconsiam restaurant | — | ร้านอาหาร ไอคอนสยาม | — | EN · TH · AR |
| `/locations/emquartier/` | emquartier restaurant | italian restaurant sukhumvit | ร้านอาหาร เอ็มควอเทียร์ | — | EN · TH · AR |
| `/locations/central-park/` | dusit central park restaurant | italian restaurant sathorn | ร้านอาหาร ดุสิต เซ็นทรัล พาร์ค | ร้านอาหารอิตาเลียน สาทร | EN · TH · AR |

Branch pages not in the list (`central-chidlom`, `central-world`) get **no keyword target** (kept as normal location pages for users / schema).
`italian restaurant sukhumvit` is mapped to the EmQuartier page (Sukhumvit Road address); `italian restaurant sathorn` / `ร้านอาหารอิตาเลียน สาทร` to the Central Park page (the demo brief places it in the Silom–Sathorn–Lumphini area — **verify** that the branch is correctly describable as "Sathorn").

## On-page implementation (where each keyword physically appears)

| Page | `<title>` (≤60) | H1 | Body / schema |
|---|---|---|---|
| `/` EN | "Italian Restaurant Bangkok \| Mozza Italian Trattoria" | "Authentic Italian Trattoria in Bangkok" | description + hero + FAQPage + Organization |
| `/` TH | "Mozza \| ร้านอาหารอิตาเลี่ยน อาหารอิตาเลียน กรุงเทพฯ" | "ร้านอาหารอิตาเลียนแท้ในกรุงเทพฯ" | — |
| pizza | EN "Neapolitan Pizza in Bangkok \| Mozza Italian Trattoria" · TH "ร้านพิซซ่า พิซซ่านาโปลี เตาฟืน กรุงเทพฯ \| Mozza" | "Neapolitan Pizza in Bangkok" / "พิซซ่านาโปลี พิซซ่าเตาฟืน กรุงเทพฯ" | all 12 pizzas from `food.json` (names, prices, pork/vegetarian icons), branch links, FAQPage |
| pasta | EN "Pasta in Bangkok \| Handmade Pasta at Mozza" · TH "ร้านพาสต้า พาสต้าเส้นสด กรุงเทพฯ \| Mozza" | "Pasta in Bangkok" / "พาสต้าเส้นสด ทำมือ กรุงเทพฯ" | 13 pasta & risotto items, FAQPage |
| celebrations | EN "Birthday Dinner in Bangkok \| Mozza Celebrations" · TH "ร้านอาหาร วันเกิด ครอบครัว กรุงเทพฯ \| Mozza" | "Birthday & Family Dinners in Bangkok" / "ร้านอาหารวันเกิดและมื้อครอบครัว กรุงเทพฯ" | sharing boards + desserts from the menus; reservation-request explainer; FAQPage |
| branch pages | "Mozza {mall} \| Italian Restaurant Bangkok" (Central Park uses "Dusit Central Park") · TH "Mozza {mall} \| ร้านอาหารอิตาเลียน กรุงเทพฯ" | "Mozza X — Italian Restaurant at {mall}" / "Mozza X — ร้านอาหารอิตาเลียน {mall}" | Restaurant schema (+ hasMenu, acceptsReservations), FAQPage, BreadcrumbList |

## Content gaps to close before this can rank (needs client input)

1. **Celebrations page is intentionally thin.** The menus and `/context` contain no celebration offers (cakes, set menus, private rooms, group policy). The page says so rather than inventing them. Needs: real celebration options, group-size rules, deposit/cancellation policy.
2. **Wording claims to confirm:** "wood-fired" (from the demo brief), "fresh pasta / พาสต้าเส้นสด" (keyword wording; the menus say "handmade"/"homemade" only), "Neapolitan" (printed on the Central Park note, food.pdf p.2).
3. **Awards (hidden):** Tripadvisor Travellers' Choice 2023–2025, LSA Best Bites Awards 2026 "Best Pizza", Gambero Rosso "Top Italian Restaurants" are printed on food.pdf p.1. Once confirmed, flip `AWARDS_VERIFIED` and they feed the home page and `/about`; "Best Pizza 2026" would be the first legitimate basis for any "best pizza" wording.
4. **Local entity data:** confirmed hours, full addresses, phone numbers and the Google Business Profile links per branch (see `docs/VERIFY_LIST.md`).
5. **Thai copy** is machine-drafted; native review before any Thai keyword claim (`NATIVE_REVIEW.md`).

## Measurement (demo)

Search Console / GA4 are not connected (noindex demo). Planned events are in `docs/TRACKING_PLAN.md`; the intended success metric is **reservation requests per branch per daypart**, not rankings alone (see `/context/2026-10-20_update_new-findings.md` §20).
