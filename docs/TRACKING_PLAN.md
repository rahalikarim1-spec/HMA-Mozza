# TRACKING PLAN (demo → production)

In the concept demo every event is pushed to `window.dataLayer` **and** `console.log("[dataLayer]", …)` (see `src/lib/track.ts`). GTM is **not** loaded (commented out, `GTM-XXXXXXX` in `src/components/RootDocument.tsx`). Nothing is sent anywhere, no cookies or storage are written.

## Events

| Event | Fired when | Parameters | GA4 mapping in production |
|---|---|---|---|
| `reservation_click` | any Reserve button/link is clicked | `branch` (slug or `any`), `language` | Custom event. **Not** a key event (intent only). Used for funnel step 0 |
| `booking_start` | reservation flow opens (modal or `/reserve/`) | `branch` (slug or `none`), `language`, `entry_page` (path) | Custom event → funnel step 1 (maps to recommended `begin_checkout` if you want it in the built-in e-commerce-style funnel) |
| `booking_step` | each step is shown (1–6) | `step`, `branch` | Custom event → funnel exploration (drop-off per step) |
| `booking_zone_select` | a seating zone is chosen (plan or list) | `zone` (`main`/`window`/`banquette`/`bar`/`private`), `branch` | Custom event (seating demand; no key event) |
| `booking_time_select` | a time slot is chosen | `daypart` (`lunch`/`afternoon`/`dinner`), `quiet_slot` (bool) | Custom event → measures whether the "quieter times" highlight shifts demand to under-used dayparts |
| `booking_submit_demo` | "Confirm (demo)" | `branch`, `party_size`, `daypart`, `language`, `utm_source`, `gclid_present` | **Key event** `booking_submit` in production (use the real reservation system's confirmation, not this demo event). Candidate for GA4 recommended `generate_lead` or a purchase-style event with an estimated value (average table value from HMA POS — not available here) |
| `whatsapp_click` | WhatsApp button | `branch`, `language` | **Key event** (`contact_whatsapp`) |
| `line_click` | LINE button | `branch`, `language` | **Key event** (`contact_line`) |
| `directions_click` | Directions button | `branch`, `language` | **Key event** (`directions`) — strong store-visit proxy for local intent |
| `menu_view` | any menu page loads | `language` | Custom; secondary |
| `pdf_download` | "Download PDF menu" | `language` | GA4 auto `file_download` also fires with enhanced measurement; keep one of them to avoid double counting |
| `language_switch` | language switcher | `from`, `to` | Custom; secondary |

## Parameters to register as custom dimensions in GA4
`branch`, `language`, `daypart`, `quiet_slot`, `zone`, `party_size`, `step`, `entry_page`, `gclid_present` (event-scoped).

## Attribution (demo panel: add `?debug=1`)
The flow reads `utm_source`, `utm_medium`, `utm_campaign` and `gclid` from the URL **in memory only** and shows what *would* be attached to the reservation: those four values + branch + language + daypart. In production attach them to the reservation payload (hidden fields / reservation-system custom fields) and persist `gclid` per the Google Ads policy (first-party cookie with consent) — the demo deliberately persists nothing.

## Measurement principle (from /context)
Optimise for **incremental reservations per branch per daypart**, not clicks. `booking_time_select.quiet_slot` + `daypart` + `branch` are what allow reporting on underused dayparts. The simulated availability in the demo is **not** Google Popular Times data and must be replaced by real covers/occupancy before any conclusion is drawn.

## Privacy
No personal field (name, phone, email, requests, allergies) is ever included in an event. Events carry only the parameters listed above.
