# HMA / Mozza — Project Update: New Findings (20 October 2026)

> **Status:** APPEND to the existing HMA / Mozza project context. Do NOT replace previous project knowledge.
> These are additional findings gathered after the previous master handoff.

---

## 1. New Google Maps / Popular Times data — Mozza Central Park

Location studied: Mozza – Trattoria Italiana (Central Park), Bangkok.

Google Business Profile snapshot (approx.):

- Rating: 4.9 / 5
- Reviews: ~1.5K
- Price indication: ฿600–1,600
- Category: Italian
- "About this place" topic chips: Burrata, Salmon Steak, Halal Food, Mushrooms, others

**IMPORTANT:** The "Halal Food" chip is only a Google-generated / review-derived signal. It does NOT prove:

- halal certification
- a fully halal kitchen
- halal meat across the restaurant

**Never advertise Mozza as halal without direct verification from HMA.**

## 2. Mozza Central Park — Popular Times data

Screenshots were collected across all seven days.

| Day | Observed time | Google label | Wait | Interpretation |
|---|---|---|---|---|
| Monday | 9:00 AM | "Usually a little busy" | No wait | Relatively light morning demand. No obvious strong peak in the captured period. |
| Tuesday | 9:00 PM | "Usually a little busy" | No wait | Evening demand exists but restaurant not heavily saturated. |
| Wednesday | 8:00 AM | "Usually a little busy" | No wait | Morning activity exists; overall day appears moderate. |
| Thursday | 5:00 PM | "Usually a little busy" | No wait | Activity rising into early dinner, not yet at strongest weekly level. |
| Friday | 6:00 PM | "Usually as busy as it gets" | No wait | **One of the strongest natural weekly demand peaks.** Likely a high-utilization dinner window. |
| Saturday | 12:00 PM | "Usually a little busy" | No wait | Lunch has activity, but no saturation like Friday evening or Sunday late morning. |
| Sunday | 11:00 AM | "Usually as busy as it gets" | Up to 15 min wait | **Another major weekly peak** (potential brunch / early lunch). Only captured period where Google showed a wait time. |

## 3. Important limitation of Popular Times

Google Popular Times does NOT give:

- exact visitor counts
- restaurant capacity
- revenue
- table occupancy percentage
- number of covers

The bars are relative to the normal activity level of that specific location. "As busy as it gets" must NOT be read as "100% capacity" — it means one of the busiest typical periods Google observes for that establishment. **This distinction must be preserved in any HMA presentation.**

## 4. New business interpretation: Search as a demand-shaping tool

The objective is NOT simply "bring more traffic to Mozza." A more sophisticated objective:

> Use Search acquisition to shift incremental customer demand toward underutilized dayparts.

Friday ~6 PM and Sunday ~11 AM already show strong natural demand. Aggressive paid media at those peaks could create:

- unnecessary CPC expenditure
- organic/paid cannibalization
- capacity pressure
- longer waits
- poor incremental economics

The greater opportunity may be capturing additional demand in weaker periods. Potential underutilized windows suggested by the screenshots include portions of:

- Monday
- Tuesday
- Wednesday
- Thursday before peak dinner
- Sunday after the brunch/lunch peak
- selected Saturday periods

**Must be validated with HMA's real reservation / POS data.**

## 5. New acquisition concept: Dayparting + capacity utilization

Potential Google Ads / Search model:

Search demand → branch → meal/daypart → landing page → reservation → store visit → revenue

Instead of bidding uniformly across the week, campaigns could eventually be adjusted around: lunch demand, early dinner, dinner, weekends, underutilized periods.

Advertising should normally begin BEFORE the actual visit period, because customers search and decide before arriving.

Initial hypotheses to test:

- Lunch decision window: ~10:30 AM – 1:00 PM
- Dinner decision window: ~4:00 PM – 8:00 PM
- Weekend dining searches may begin the previous evening or earlier the same day

These are hypotheses. Actual conversion data should determine final schedules.

## 6. Potential Search messaging by daypart

Possible non-discount messaging:

- "Italian Lunch at Central Park"
- "Dinner at Mozza Central Park"
- "Fresh Pasta in Central Park"
- "Italian Restaurant Near Silom & Lumphini"
- "Sunday Italian Dining"
- "Reserve Your Table at Mozza Central Park"

Premium brand positioning should be preserved. Do NOT assume discounting is necessary. Value proposition can remain: food quality, location, atmosphere, convenience, fresh pasta, Italian experience, reservation availability.

## 7. Capacity + revenue model

If HMA provides covers by hour, tables, occupancy, reservations, walk-ins, cancellations, average check and POS revenue, Search performance should be connected to restaurant capacity.

Framework:

Current utilization by time slot + paid/organic search demand + incremental reservations + average customer/table value = incremental revenue contribution.

Illustrative example only: a weak slot gaining 5 additional tables at a hypothetical 1,800 THB per table = 5 × 1,800 = 9,000 THB incremental revenue.

**1,800 THB is only an illustration. It is NOT Mozza's known average table value. Never present it as HMA financial data.**

## 8. Stronger management positioning

Preferred framing:

> "The objective is not simply to generate more restaurant traffic. It is to capture the right search demand, for the right location, at the right time, particularly during underutilized dayparts, and convert that demand into measurable incremental revenue."

Connects Marketing + Operations + Finance. Likely to resonate with: CEO, Operations Director, Restaurant General Managers, Marketing Director.

## 9. New mobile UX / technical review — Mozza website

Chrome DevTools inspection, simulated device Samsung Galaxy A55, viewport ~360 × 800.

- Page confirmed on Wix infrastructure (DOM shows `static.wixstatic.com`, Wix image components).
- Responsive image delivery / `srcset` in use.
- **Positive finding:** Wix serves different image sizes per viewport/device rather than necessarily forcing one desktop-size image.

## 10. Mobile experience observation

Visually attractive and strongly brand-led. The mobile journey is structured around:

brand story → imagery → restaurant experience → booking

rather than:

search intent → immediate commercial information → reservation.

Observed: large visual emphasis, restaurant story/copy, image gallery, map, booking CTA, compressed navigation, relatively dense hero content.

**Caution:** the Chrome screenshot used "Fit to window", so text/menu size may be visually exaggerated by DevTools scaling. Do NOT claim a font-size accessibility problem from this screenshot alone.

## 11. Mobile search-to-conversion opportunity

For a query such as "italian restaurant central park bangkok", an optimized first mobile viewport could immediately show:

- Mozza Central Park
- Italian Restaurant — Dusit Central Park
- Google rating / review count
- Opening status / hours
- Menu
- Directions
- Reserve a Table

Then: images, story, menu highlights, reviews, location information.

Target journey: Google Search / Maps → mobile landing page → decision → reservation / directions.

Potential mobile CRO opportunities:

- stronger branch identity above the fold
- clearer location context
- menu CTA
- directions CTA
- reservation CTA
- potentially a sticky "Reserve" button
- opening hours
- review / social proof
- mall / district information

## 12. Mobile UX strategic interpretation

Professional wording for HMA:

> "The current mobile experience is visually strong, but primarily brand-led. There is an opportunity to restructure priority location pages around mobile search intent and provide faster access to booking, menus, directions and location-specific information."

**Do NOT say** "the mobile website is bad." The issue is optimization and conversion architecture, not visual quality.

## 13. New GEO / AI search findings

Separate review of GEO (Generative Engine Optimization) and HMA visibility in AI search systems such as ChatGPT.

- ChatGPT does not operate like Google Search Console with a publicly visible fixed index/report for a business.
- When current web information is required, AI systems can retrieve from public web sources.
- HMA and several major restaurant brands were found publicly discoverable through web retrieval.
- Major entities appear understandable to AI systems.

## 14. AI entity visibility — current interpretation

**Stronger / clearer entities:**

- Hospitality Management Asia
- Mozza By Cocotte
- Cocotte Farm Roast & Winery
- Victoria By Cocotte

**Medium visibility / entity clarity:**

- Parma By Mozza
- The Market
- Taste Bistro & Grill
- Summer Seaside

**Potentially weaker / more ambiguous:**

- Leon By Cocotte
- Mojo Grill & Bar
- The Kitchen
- ALMA by El Willy

Reasons: generic names, weaker standalone web presence, Facebook/social dependence, newer concepts, fragmented brand/location information.

## 15. HMA GEO / AI information consistency problem

Different public HMA sources contain different company-scale figures.

Newer HMA website information:

- 23 restaurants
- 12 brands
- 1,300+ employees
- ~2M meals/year

Older public/company copy:

- 19 restaurants
- 1,000+ employees
- 500,000 clients/diners per year

This creates conflicting signals for Google, AI search engines, journalists, customers and partners. An AI answer may quote old numbers, new numbers, a range, or inconsistent portfolio information depending on which source is retrieved.

## 16. GEO / AI structure opportunity

Ideal entity architecture:

Hospitality Management Asia → Brand → Location → Cuisine / attributes → Language version

Example: Hospitality Management Asia → Mozza By Cocotte → Central Park → Italian / Pizza / Pasta → English / Thai / Arabic

Each entity/location should have consistent: name, description, address, opening hours, cuisine, official website, reservation link, parent company relationship, structured data, social profiles, third-party authority references.

## 17. AI / GEO recommendations

1. **Corporate information consistency** — synchronize HMA website, LinkedIn, brand websites, Maps, restaurant directories, mall listings, tourism platforms.
2. **Parent-brand relationship** — each brand website should make the relationship with HMA clear.
3. **Location entity pages** — each important branch gets a dedicated structured location page.
4. **Multilingual entity structure** — English / Thai / Arabic pages represent the same location/entity consistently.
5. **Independent authority** — strong third-party references (Google Maps, Tripadvisor, Wongnai, Michelin/editorial sites, mall websites, tourism sites).
6. **AI crawler accessibility** — verify relevant AI/search crawlers are not accidentally blocked by robots.txt, CDN, WAF or bot protection. **Do NOT claim they are blocked unless verified.**

## 18. Updated HMA growth framework

Four connected visibility/acquisition layers:

1. **Organic Search** — SEO, Local SEO, location pages, non-brand rankings
2. **Paid Search** — Brand Defense, non-brand Google Ads, location acquisition, dayparting
3. **Multilingual / International** — Thai, English, Arabic / GCC
4. **AI / GEO Visibility** — entity clarity, consistent brand/location data, AI discoverability, third-party corroboration

All four connect to: Reservation → Store Visit → HMA customer ecosystem → Revenue.

## 19. Updated strategic funnel

Search / Maps / AI discovery
→ Right HMA brand
→ Right restaurant location
→ Right language
→ Right time/daypart
→ Relevant mobile landing experience
→ Menu / reservation / directions
→ Store visit
→ Revenue
→ HMA Privilege / retention

Stronger than positioning the project as "SEO + Google Ads." Frame it as:

**MULTI-LOCATION DIGITAL ACQUISITION + DEMAND OPTIMIZATION.**

## 20. New key insight to preserve

A restaurant does not necessarily need "more customers at all times." It needs **more profitable demand when capacity exists.**

Search acquisition should ultimately optimize toward:

**INCREMENTAL REVENUE PER LOCATION PER DAYPART**

rather than only clicks, traffic, impressions or rankings.

This is one of the most important new strategic conclusions of the HMA project.
