// Content for the role-based interactive presentations under /strategy/<role>/ (English only in this phase).
// Source of truth for the CEO deck: docs/CEO_EXECUTIVE_DECK_V2.md (slide headlines, copy, questions and notes are copied from it).
// Rules: no pricing, no internal outreach material, no brand photographs, every claim carries an evidence label.
// Imported by the server pages; typed in presentations.d.mts. Plain data, no logic.

const WA_TEXT = "Hi Wadhah, I've seen the Mozza growth strategy. Let's discuss the pilot.";
const WA_URL = `https://wa.me/21628320998?text=${encodeURIComponent(WA_TEXT)}`;

const ui = {
  back: "Back to Strategy",
  slides: "Slides",
  slide: "Slide",
  of: "of",
  prev: "Previous slide",
  next: "Next slide",
  progress: "Presentation progress",
  evidenceToggle: "Evidence, confidence and presenter notes",
  questionLabel: "Question this slide answers",
  evidenceLabel: "Evidence",
  notesLabel: "Presenter notes",
  legendTitle: "How sure are we? Every statement is labelled",
  keyboardHint: "Tip: use the ← and → keys to move between slides.",
  appendixTitle: "Appendix",
  appendixLead: "Supporting detail, shared after the discovery meeting. Technical and measurement detail lives here, not on the slides.",
  footer: "Independent growth proposal by Wadhah Belhassen. Not an official Mozza / HMA document. Concept demo; third-party figures are estimates, not Mozza analytics.",
};

const tags = {
  OBS: "Our own test (date and device stated)",
  PUB: "Public listing or page (dated)",
  "3P": "Third-party estimate, not analytics",
  HYP: "Hypothesis to test",
  DATA: "Needs HMA information",
};

export const ceoDeck = {
  role: "ceo",
  title: "Mozza by Cocotte — A Controlled 90-Day Growth Pilot",
  subtitle: "For the HMA CEO / Co-Founder",
  ui,
  tags,
  slides: [
    {
      id: "brand",
      tone: "dark",
      kicker: "Mozza by Cocotte · A controlled 90-day growth pilot",
      headline: "Mozza Has Built a Brand Worth Growing",
      copy: "Strong guest ratings across branches. A loyalty programme. A brand people search for by name. This is the foundation. We explore one question: can Mozza attract additional high-intent local guests, profitably, one branch at a time?",
      question: "Do we respect what Mozza has already built, and what is this conversation about?",
      visual: {
        kind: "tiles",
        items: [
          { icon: "star", label: "Reputation" },
          { icon: "heart", label: "Loyalty" },
          { icon: "search", label: "Brand search" },
          { icon: "pin", label: "Branches" },
        ],
      },
      evidence: [
        { tag: "PUB", text: "Ratings of 4.5–4.9 across four branches (≈ 6.0K Google reviews, Oct 2026).", conf: "Medium" },
        { tag: "PUB", text: "HMA Privilege loyalty programme exists.", conf: "High" },
        { tag: "3P", text: "“mozza by cocotte” ≈ 2.4K searches a month (Mangools, Oct 2026).", conf: "Medium" },
      ],
      notes: "Thank you for the time. I will not present an audit or a list of problems. Mozza has a strong reputation and guests who search for it by name; that is the foundation of everything I will say. I have one proposition: there may be additional local demand worth capturing, branch by branch, and a small controlled pilot could test it. Everything on these slides is labelled by how sure we are. I will keep it to twenty minutes, and the only thing I will ask for today is a discovery conversation.",
    },
    {
      id: "branch-demand",
      tone: "plain",
      kicker: "The opportunity",
      headline: "The Next Growth Opportunity Is Branch-Level Demand",
      copy: "Each branch serves its own mall, neighbourhood and hours. Growth may come from reaching more nearby guests when a branch has seats to fill. The question is not whether Mozza is busy, but where extra, profitable covers could fit.",
      question: "Where could incremental covers realistically come from?",
      visual: {
        kind: "branches",
        items: ["Central Park", "EmQuartier", "Siam Paragon", "Central Chidlom"],
        placeholders: ["Capacity by hour — HMA data", "Average check — HMA data", "Weekday vs weekend — HMA data"],
        note: "Branch list to be confirmed with HMA. Nothing is filled in on purpose: these numbers can only come from HMA.",
      },
      evidence: [
        { tag: "3P", text: "Search demand exists around the branches and is larger than brand-name demand (Keyword Planner, Bangkok, Oct 2025–Sep 2026; ranges).", conf: "Medium" },
        { tag: "3P", text: "Google Popular Times (Central Park, Oct 2026) suggests the demand curve is not flat. It is relative to the place, one capture per day: it is not occupancy or capacity, and is used only to motivate the question.", conf: "Low" },
        { tag: "DATA", text: "Capacity and weekday gaps are unknown until HMA shares its own figures." },
      ],
      notes: "Mozza is a group of branches, each with its own neighbourhood and its own hours. I am not saying any branch is empty. Google's busy-time graphs are relative to the place; they do not show occupancy, so I cannot see your capacity from the outside. What I can see is that people search for Italian food around each mall. The question for you: where would an extra table be most welcome, and where would it not? That answer sits in your data, not mine.",
    },
    {
      id: "discovery",
      tone: "light",
      kicker: "Where guests come from",
      headline: "Where High-Intent Guests Discover Italian Restaurants",
      copy: "Guests choosing where to eat search on Google and Maps, by area, mall and cuisine. Mozza is found by name; non-brand, local searches are a separate, larger pool. The pilot tests whether Mozza can win a share of it.",
      question: "Where do new guests come from, and is there a pool Mozza does not yet draw on?",
      visual: {
        kind: "pools",
        pools: [
          { title: "Brand searches", sub: "Guests who search for Mozza by name" },
          { title: "Local non-brand searches", sub: "Area, mall, cuisine: guests with no name in mind" },
        ],
        steps: ["Search or Maps", "Branch page", "Menu", "Reserve", "Visit"],
        caption: "Search volumes are third-party estimates, not Mozza analytics.",
      },
      evidence: [
        { tag: "3P", text: "Non-brand and mall-level volumes exceed brand volumes; one mall term sits in the 1K–10K monthly range (Keyword Planner ranges).", conf: "Medium" },
        { tag: "OBS", text: "On generic “Italian restaurant Bangkok” searches other restaurants appear in the top results (one snapshot, Oct 2026; positions vary by device, location and time).", conf: "Medium" },
        { tag: "OBS", text: "The official website came first for “mozza by cocotte” in our test of 2026-11-05 (one test, one device).", conf: "Medium" },
      ],
      notes: "People who already know Mozza find Mozza; that is a strength. The other pool is guests who do not have a name in mind: they search for a mall, a district, or 'Italian near me', and they choose from the first few results. Volumes here are estimates from a keyword tool, not your analytics, and rankings move by device and time. I am not claiming that guests are being lost. I am suggesting that this pool is worth testing under controlled conditions.",
    },
    {
      id: "levers",
      tone: "plain",
      kicker: "What we would do",
      headline: "Three Levers for Measurable Growth",
      copy: "Local discovery: make each branch easy to find and choose. Booking conversion: make reserving simple for every guest. Targeted acquisition: reach nearby high-intent guests in hours with capacity. Each lever is tested, measured, and stopped if it does not pay.",
      question: "What would we actually do, in business terms?",
      visual: {
        kind: "levers",
        items: [
          { title: "Discover", outcome: "More branch-level discovery" },
          { title: "Convert", outcome: "More completed bookings" },
          { title: "Acquire", outcome: "More covers in the right hours" },
        ],
        base: "Measured by branch",
      },
      evidence: [
        { tag: "HYP", text: "The three levers come from a ranked judgement of opportunities, not from a measurement.", conf: "Medium" },
        { tag: "HYP", text: "The size of each lever's effect is unknown until the pilot." },
        { tag: "DATA", text: "Implementation detail (profiles, branch pages, tracking, campaigns) is in the appendix." },
      ],
      notes: "Three levers, in plain terms. Discovery: when a guest searches near a branch, the right branch information is easy to find. Conversion: reserving is clear and quick, including for international guests. Acquisition: a small, capped amount of media aimed at nearby guests in hours when you have seats. I cannot tell you today how much each lever is worth. That is the point of a pilot. Technical detail is in the appendix if your team wants it.",
    },
    {
      id: "validate",
      tone: "light",
      kicker: "Facts and open questions",
      headline: "What We Observed — and What We Need to Validate",
      copy: "Observed: the official site came first on our brand search test; public details sometimes differ between sources. Estimated: traffic tools disagree widely. To validate with HMA: occupancy by hour, reservation sources, average check, margins. Nothing here assumes a problem.",
      question: "How much of this is fact, and how much is still a question?",
      visual: {
        kind: "board",
        cols: [
          { title: "Observed (our tests)", tag: "OBS", items: ["Official site first on the tested brand search (one test, one device)", "Some public details differ between sources"] },
          { title: "Estimated (third-party tools)", tag: "3P", items: ["Traffic tools disagree widely on Mozza's monthly visits", "Estimates are not Mozza analytics"] },
          { title: "To validate with HMA data", tag: "DATA", items: ["Occupancy by hour", "Reservation sources", "Average check and margins"] },
        ],
      },
      evidence: [
        { tag: "OBS", text: "Official site first on the tested brand query: one test, one device.", conf: "Medium" },
        { tag: "OBS", text: "Some public details differ between sources: Oct 2026 review, being re-verified before the meeting.", conf: "Medium" },
        { tag: "3P", text: "Two third-party tools estimate Mozza's monthly organic visits roughly eight times apart; neither is analytics, so we do not use either as a traffic figure.", conf: "Low" },
        { tag: "DATA", text: "Occupancy, reservation sources and margins can only come from HMA." },
      ],
      notes: "This slide separates three things. What we saw ourselves, in a few tests on one device. What third-party tools estimate; they disagree with each other, which tells us not to rely on them for decisions. And what only you can tell us. I am deliberately not listing problems, because I do not know that any exist. Your numbers will tell us whether there is anything worth fixing. If you recognise a figure here as wrong, please say so; I would rather be corrected than convincing.",
    },
    {
      id: "pilot",
      tone: "plain",
      kicker: "The proposal",
      headline: "A Controlled 90-Day Pilot",
      copy: "One branch, 90 days, compared with a baseline. Weeks 1–4 prepare; weeks 5–13 test; day 90 is a decision point: go, adjust or stop. Branch, hours and budget are set with HMA, and depend on capacity and measurement.",
      question: "What exactly would we do, how long would it take, and how can HMA exit?",
      visual: {
        kind: "timeline",
        weeks: 13,
        rows: [
          { label: "Agree and baseline (weeks 1–2)", from: 1, to: 2, tone: "base" },
          { label: "Prepare (weeks 1–4)", from: 1, to: 4, tone: "prep" },
          { label: "Test (weeks 5–13)", from: 5, to: 13, tone: "test" },
        ],
        decision: { label: "Day 90: decision", outcomes: ["Go", "Adjust", "Stop"] },
        note: "Conditional on operational capacity and measurement feasibility.",
      },
      evidence: [
        { tag: "HYP", text: "Pilot design: a test branch compared with its own baseline, plus a comparison branch where one exists. The branch is not chosen.", conf: "Medium" },
        { tag: "DATA", text: "Feasibility depends on HMA's capacity data and on what reservation reporting can show." },
      ],
      notes: "Small and reversible. One branch, ninety days, and a comparison against what the branch was doing before. The first month is preparation with no media spend. At day ninety we decide together: go, adjust, or stop. I would only start if two conditions are true: the branch has seats to fill in the hours we target, and we can measure reservations well enough to judge the result. If either is false, I would tell you and not start.",
    },
    {
      id: "success",
      tone: "light",
      kicker: "The measure",
      headline: "How We Will Judge Success",
      copy: "Success means incremental contribution after media, commissions and relevant operating costs, not clicks or rankings. Results are compared with a baseline, with thresholds agreed in advance. If the data cannot show a clear benefit, we say so and stop.",
      question: "What number decides whether this was worth it?",
      visual: {
        kind: "equation",
        terms: [
          { label: "Incremental revenue", op: "" },
          { label: "Media", op: "−" },
          { label: "Commissions", op: "−" },
          { label: "Relevant operating costs", op: "−" },
        ],
        result: "Incremental contribution",
        ladderTitle: "Supporting metrics, in order",
        ladder: ["Interactions", "Booking clicks", "Confirmed reservations", "Seated covers"],
      },
      evidence: [
        { tag: "HYP", text: "Method: incremental, capacity-capped, net of costs. No outcome is promised.", conf: "High" },
        { tag: "DATA", text: "Whether the pilot can show measurable incremental revenue depends on the pilot design and on data quality." },
      ],
      notes: "I measure incremental contribution after costs: media, any booking-platform commissions, and the operating costs that extra covers really bring. Not clicks, not rankings. Incremental means what would not have happened anyway, so we compare with a baseline and, where possible, another branch. Thresholds are agreed before we start, so nobody is tempted to move the goalposts. I do not promise a result. If the data cannot show a clear benefit, I will say so, and we stop with no hard feelings.",
    },
    {
      id: "next-step",
      tone: "dark",
      kicker: "The ask",
      headline: "The Next Step: 20-Minute Discovery Meeting",
      copy: "Twenty minutes to hear your priorities, which branch and hours matter most, and what information already exists. Then we decide together whether a pilot is worth scoping. We ask for no data access before that conversation. Contact: Wadhah Belhassen.",
      question: "What is the smallest decision we are asking for today?",
      visual: {
        kind: "cta",
        steps: ["Discovery meeting", "Scope (only if worthwhile)", "90-day pilot"],
        whatsapp: { label: "Discuss the pilot on WhatsApp", href: WA_URL, external: true },
        links: [{ label: "Website", href: "https://www.wadhah.digital/en", external: true }],
      },
      evidence: [
        { tag: "PUB", text: "Contact details are the ones already published on the Strategy page." },
      ],
      notes: "My ask is small: twenty minutes, whenever suits you or your team. I would like to hear which branches and hours matter to you, what you already track, and where you would not want me to go. I am not asking for any access or data before that. If it makes sense afterwards, I will scope a pilot with you. If it does not, I will have learned something, and so will you. Thank you.",
    },
  ],
  appendix: [
    {
      id: "a-evidence",
      title: "A. Evidence register",
      lead: "Every statement used on the slides, with its label, source and confidence.",
      table: {
        head: ["Statement used", "Label", "Source / date", "Confidence", "Slide"],
        rows: [
          ["Official site first for “mozza by cocotte” (Bangkok test)", "Our own test, one device", "2026-11-05", "Medium", "3, 5"],
          ["Brand search ≈ 2.4K a month", "Third-party estimate", "Mangools, Oct 2026", "Medium", "1"],
          ["Ratings 4.5–4.9, ≈ 6.0K reviews, four branches", "Public listings", "Oct 2026", "Medium", "1"],
          ["HMA Privilege programme", "Public page", "Current", "High", "1"],
          ["Non-brand and mall-level search demand (ranges)", "Third-party estimate", "Keyword Planner, Oct 2025–Sep 2026", "Medium", "3"],
          ["Other restaurants in top results on generic Italian searches", "Our own snapshot", "Oct 2026", "Medium", "3"],
          ["Popular Times (Central Park): relative peaks", "Third-party estimate, not occupancy", "Oct 2026", "Low as occupancy evidence", "2 (motivation only)"],
          ["Two tools estimate monthly organic visits ≈ 8× apart (Semrush ≈ 2.8K, Ahrefs ≈ 354–380)", "Third-party estimates", "Nov / Oct 2026", "Low as a traffic figure", "5"],
          ["Some public details differ between sources", "Our own review", "Oct 2026 (being re-verified)", "Medium", "5"],
          ["Complete branch list", "Needs HMA information", "—", "Open", "2"],
          ["Occupancy, average check, margin, reservation sources", "Needs HMA information", "—", "Open", "2, 5, 7"],
        ],
      },
    },
    {
      id: "b-method",
      title: "B. Measurement methodology",
      lead: "Implementation detail, only relevant once HMA agrees to scope a pilot.",
      bullets: [
        "KPI ladder (never blended): Maps / Google Business Profile interactions → booking clicks → confirmed reservations (provider-reported) → seated covers and revenue (point of sale) → modelled store visits (supportive only, if the account is eligible).",
        "Incrementality: a pre-period baseline of 4–8 weeks; difference-in-differences against the branch's own baseline and, where one exists, a comparison branch; optionally a within-branch comparison of targeted vs untargeted slots; a brand-ad on/off holdout only if brand ads are ever tested.",
        "Tracking implementation (only after HMA agrees to scope): GA4 key events (reservation start/click, directions, call, WhatsApp, LINE); GTM container review; UTM on outbound booking links; Google Business Profile performance export; provider reservation exports by source and branch; covers and revenue by hour.",
        "Technical SEO and local checks (supporting, not primary): Google Business Profile completeness per branch, branch landing pages, Restaurant structured data, consistent name-address-phone details, readable HTML menus, language versions.",
        "Formula: incremental confirmed reservations × show rate × party size = incremental covers (capped by available seats in the targeted slots); × spend per cover × contribution margin = incremental contribution before costs; net incremental contribution = that − media − provider commissions − relevant incremental operating costs.",
        "Attribution limits: no exact branch or source attribution is promised until the booking providers' source fields are known.",
        "Example values (spend per guest, party size) are never shown as Mozza data.",
      ],
    },
    {
      id: "c-data",
      title: "C. Required HMA data",
      lead: "Requested at or after the discovery meeting. Nothing is requested before it. Aggregated counts only; no guest personal data.",
      bullets: [
        "Tier 1 (to scope a pilot): (1) branches in scope; (2) average check and party size per branch; (3) margin definition and any commissions; (4) covers or occupancy by hour, weekday vs weekend, 8–12 weeks; (5) reservations by source and no-show rate; (6) current marketing spend by channel and branch; (7) which analytics and booking reports exist, and who owns them.",
        "Tier 2 (once scope is agreed): read-only access to Search Console, GA4 / GTM and Google Business Profile insights; reservation-platform exports.",
      ],
    },
    {
      id: "d-risks",
      title: "D. Risks and assumptions",
      table: {
        head: ["#", "Risk / assumption", "Mitigation"],
        rows: [
          ["1", "Branches may be near capacity in the targeted hours (no room for incremental covers)", "Choose branch and hours from HMA's own data; do not start if capacity is not there"],
          ["2", "Reservation reporting may not show source or branch", "Use baseline plus a comparison branch; judge on confirmed reservations and covers; state the limit"],
          ["3", "Incrementality may be low (guests would have booked anyway)", "Judge on incremental, not attributed, results; holdout where appropriate"],
          ["4", "Third-party tools can mislead (traffic estimates ≈ 8× apart; competitor lists are algorithmic)", "Not used for decisions; replaced by HMA's first-party data"],
          ["5", "Small sample over 90 days", "Pre-agreed minimum event counts; “Adjust” extends 30 days"],
          ["6", "Seasonality or events distort the read", "Compare with baseline and a comparison branch; record events"],
          ["7", "Platform or provider constraints (booking flow, content approvals)", "Agree scope with HMA's process; no platform migration in the pilot"],
          ["8", "Our own checks are single-device tests", "Repeat and archive before any claim"],
          ["A", "Assumes HMA wants to explore additional covers on weekdays", "Confirm in the meeting"],
        ],
      },
    },
    {
      id: "e-criteria",
      title: "E. Pilot decision criteria",
      lead: "Form only. Thresholds are set with HMA in weeks 1–2.",
      table: {
        head: ["Gate", "Rule"],
        rows: [
          ["Start", "Capacity exists in the targeted hours AND at least basic reservation counts by branch are available AND HMA approves branch, hours and budget cap. Otherwise: do not start."],
          ["Go (scale to more branches)", "Net incremental contribution after media, commissions and relevant operating costs ≥ the threshold agreed in weeks 1–2, in slots with spare capacity, with data quality passed."],
          ["Adjust (extend up to 30 days)", "Positive early signals but too few events or incomplete data; fixes agreed."],
          ["Stop", "Net incremental contribution below threshold after the agreed learning period, or no measurable difference from baseline, or data cannot support a conclusion; spend stops at once."],
        ],
      },
      foot: "The stop rule and budget cap are written down before launch. Platform migration is not part of the pilot.",
    },
  ],
};


// ---------------------------------------------------------------------------------------------------------------------------
// MARKETING DIRECTOR — Growth Strategy. Same infrastructure and evidence labels as the archived CEO deck.
// Rules: no invented revenue, occupancy, reservation volumes, conversion rates or ad ROI; no pricing; no photographs; every claim labelled.
// ---------------------------------------------------------------------------------------------------------------------------
const WA_TEXT_MKT = "Hi Wadhah, I've seen the Mozza marketing strategy. Let's discuss the pilot.";
const WA_URL_MKT = `https://wa.me/21628320998?text=${encodeURIComponent(WA_TEXT_MKT)}`;

export const marketingDeck = {
  role: "marketing",
  title: "Mozza by Cocotte — Marketing Strategy for Branch-Level Growth",
  subtitle: "For the Marketing Director",
  ui,
  tags,
  slides: [
    {
      id: "context",
      tone: "dark",
      kicker: "Marketing opportunity · business context",
      headline: "A Strong Brand With Room to Capture More Local Demand",
      copy: "Mozza has strong ratings, a loyalty programme and guests who search for it by name. The marketing question is narrower: can Search, Maps and branch pages bring additional high-intent local guests, profitably, branch by branch, and can we prove it?",
      question: "What is the marketing opportunity, and what is it not?",
      visual: {
        kind: "tiles",
        items: [
          { icon: "star", label: "Reputation" },
          { icon: "heart", label: "Loyalty" },
          { icon: "search", label: "Brand search" },
          { icon: "pin", label: "Branch discovery" },
        ],
      },
      evidence: [
        { tag: "PUB", text: "Google ratings of 4.5–4.9 across four branches (≈ 6.0K reviews, Oct 2026).", conf: "Medium" },
        { tag: "PUB", text: "HMA Privilege loyalty programme exists.", conf: "High" },
        { tag: "3P", text: "“mozza by cocotte” ≈ 2.4K searches a month (Mangools, Oct 2026).", conf: "Medium" },
        { tag: "HYP", text: "Additional profitable covers can be won from local, high-intent search: untested until the pilot." },
      ],
      notes: "Thank you for the time. I am not here to audit your marketing. Mozza has a strong reputation and guests who search for it by name. The opportunity I want to test is narrower: local, high-intent demand around each branch, in the right language and at the right time, and whether it can be captured profitably and measured by branch. Everything on these slides is labelled by how sure we are, and nothing assumes that current marketing underperforms.",
    },
    {
      id: "demand",
      tone: "plain",
      kicker: "Brand versus non-brand demand",
      headline: "Brand Demand Is Visible; the Larger Pool Is Local and Non-Brand",
      copy: "Guests who know Mozza search by name. A separate pool searches by area, mall and cuisine, in Thai and English. Keyword Planner ranges show that pool at the same or higher volume than brand searches. Ranges are estimates, never summed.",
      question: "Where does new demand sit compared with the demand Mozza already has?",
      visual: {
        kind: "bands",
        caption: "Google Keyword Planner, Bangkok, Oct 2025 – Sep 2026. Monthly search ranges (log scale), not additive, not Mozza analytics.",
        scale: ["10–100", "100–1K", "1K–10K", "10K–100K"],
        groups: { brand: "Brand", nonbrand: "Local, non-brand", thai: "Thai" },
        rows: [
          { label: "mozza by cocotte", group: "brand", band: 3 },
          { label: "mozza emquartier", group: "brand", band: 2 },
          { label: "italian restaurant near me", group: "nonbrand", band: 4 },
          { label: "pizza near me", group: "nonbrand", band: 4 },
          { label: "italian restaurant bangkok", group: "nonbrand", band: 3 },
          { label: "pasta bangkok", group: "nonbrand", band: 2 },
          { label: "ร้านอาหารอิตาเลี่ยน ใกล้ฉัน", group: "thai", band: 3 },
          { label: "พิซซ่า", group: "thai", band: 4 },
        ],
      },
      evidence: [
        { tag: "3P", text: "Keyword Planner ranges (Bangkok, all languages, Google Search, Oct 2025 – Sep 2026). Ranges are estimates, not additive.", conf: "Medium" },
        { tag: "OBS", text: "On generic “Italian restaurant Bangkok” searches other restaurants appeared in the top results in our Oct 2026 snapshot (one device, one place and time).", conf: "Medium" },
        { tag: "3P", text: "Brand-query position differs by source: first in our own test (one device), about position 2 in Mangools (Oct 2026), and position 14 for “mozza by cocotte” in a Semrush Position Tracking fragment dated Nov 5, 2026 whose location, device and language are not visible. Positions vary; we align one location, device and language before making any claim.", conf: "Low" },
        { tag: "DATA", text: "Share of reservations from brand versus non-brand search can only come from HMA's reports." },
      ],
      notes: "Brand demand is visible and healthy. The second pool is guests with no name in mind: they search for a mall, an area or 'Italian near me'. Keyword Planner shows that pool at the same or higher range, but ranges are estimates and not additive. I am also flagging that brand-query positions differ between sources; I will not claim anything until we compare like for like. The question is how many of those guests Mozza already wins, and your data answers that.",
    },
    {
      id: "branches",
      tone: "light",
      kicker: "Branch-level local discovery",
      headline: "Local Discovery Happens Branch by Branch",
      copy: "Each branch has its own mall and its own Thai and English search terms, and volumes differ by branch. Branch pages, profiles and menus need to match how guests search for that specific location, in both languages.",
      question: "Which branches have which local demand, and in which language?",
      visual: {
        kind: "table",
        caption: "Keyword Planner monthly search ranges for the mall-name term of each branch (not additive).",
        head: ["Branch", "English term · range", "Thai term · range"],
        rows: [
          ["Siam Paragon", "siam paragon restaurant · 1K–10K", "ร้านอาหาร สยามพารากอน · 1K–10K"],
          ["ICONSIAM", "iconsiam restaurant · 1K–10K", "ร้านอาหาร ไอคอนสยาม · 1K–10K"],
          ["EmQuartier", "emquartier restaurant · 1K–10K", "ร้านอาหาร เอ็มควอเทียร์ · 1K–10K"],
          ["Central Park", "dusit central park restaurant · 1K–10K", "ร้านอาหาร ดุสิต เซ็นทรัล พาร์ค · 100–1K"],
          ["Central Chidlom", "central chidlom restaurant · 100–1K", "ร้านอาหาร เซ็นทรัลชิดลม · 1K–10K"],
        ],
      },
      evidence: [
        { tag: "3P", text: "Keyword Planner ranges for each branch's mall-name terms (Bangkok, Oct 2025 – Sep 2026).", conf: "Medium" },
        { tag: "OBS", text: "In our Oct 2026 review the Central Park page sat at a temporary-looking address with another branch's title, and branch pages were mostly images with a booking button. Being re-verified.", conf: "Medium" },
        { tag: "DATA", text: "The current branch list (including CentralWorld and any other venue) is to be confirmed with HMA." },
      ],
      notes: "Local search is branch-specific. EmQuartier, ICONSIAM, Siam Paragon and Central Park all show their mall names in the same range; Central Chidlom is stronger in Thai than in English. Which branch to start with is a decision for your data: capacity, margin and the quality of the current branch page. I would not choose from keyword volumes alone.",
    },
    {
      id: "ads",
      tone: "plain",
      kicker: "Google Ads and local high-intent acquisition",
      headline: "Google Ads: Capped, Local, High-Intent Search",
      copy: "A small Search test on one branch: mall and “Italian near me” intent, the branch page as landing page, separate Thai and English ad groups, a capped budget. No Google Ads activity was observable in our review. Performance Max only after Search proves value.",
      question: "What would a minimal, low-risk Google Ads test look like?",
      visual: {
        kind: "steps",
        labels: { observed: "What we would set up", test: "How we would judge it" },
        items: [
          { title: "Structure", observed: "Search only, one branch. Ad groups: mall or area, Italian near me, pizza, pasta; Thai and English separated; exact and phrase match.", test: "Impression share, click-through rate and search terms reviewed weekly." },
          { title: "Landing page", observed: "The branch page with address, hours, menu and Reserve, never the homepage.", test: "Booking clicks per branch-page visit." },
          { title: "Bidding", observed: "Maximise clicks with a CPC cap; move to conversions once reservation actions are tracked.", test: "Cost per booking click, then cost per confirmed reservation." },
          { title: "Guardrails", observed: "Negative keywords (recipes, jobs), brand terms kept out of the non-brand campaign, budget cap and stop rule agreed before launch.", test: "Share of spend on irrelevant terms; spend against the cap." },
        ],
      },
      evidence: [
        { tag: "3P", text: "Keyword Planner top-of-page bid estimates for non-brand terms are mostly about €0.1–0.9 (≈ ฿4–35). A bid is a price per click, not a price per table.", conf: "Medium" },
        { tag: "OBS", text: "No observable Google Ads footprint was identified for Mozza Bangkok or Hospitality Management Asia in Google's Ads Transparency Center during our review (Oct 2026).", conf: "Medium" },
        { tag: "HYP", text: "The click-to-table rate, show rate and incrementality are unknown: the test exists to measure them. Cost per table = cost per click ÷ click-to-table rate." },
        { tag: "DATA", text: "Branch capacity by hour, any existing Google Ads account and the media budget come from HMA." },
      ],
      notes: "This is deliberately small. One branch, Search only, capped, landing on the branch page. Bids for these terms are cheap per click on paper, but a bid is a price per click, not per table; what matters is the click-to-table rate, which nobody knows yet. I would not run it at all unless the branch has seats to fill and we can see reservations by source. Performance Max comes later, if Search proves value.",
    },
    {
      id: "languages",
      tone: "light",
      kicker: "Multilingual targeting",
      headline: "Thai and English First, Arabic Only if Data Supports It",
      copy: "Thai and English demand are both visible in keyword data. Arabic is a hypothesis: no demand data has been collected and the international booking path has not been tested. Thai branch pages come first; Arabic follows evidence.",
      question: "Which languages justify investment, and on what evidence?",
      visual: {
        kind: "levers",
        items: [
          { title: "Thai", outcome: "Dedicated Thai branch pages and Thai ad groups: demand is visible" },
          { title: "English", outcome: "Branch pages built for local and tourist intent: demand is visible" },
          { title: "Arabic", outcome: "Test only if booking or search data shows demand" },
        ],
        base: "Language decisions follow booking and Search Console data",
      },
      evidence: [
        { tag: "3P", text: "Thai terms such as “ร้านอาหารอิตาเลี่ยน ใกล้ฉัน” sit in the 1K–10K range and “พิซซ่า” in the 10K–100K range (Keyword Planner).", conf: "Medium" },
        { tag: "OBS", text: "In our Oct 2026 review the Thai version of the main site displayed English content. Being re-verified.", conf: "Medium" },
        { tag: "HYP", text: "Arabic-language demand and a tested international booking path are unproven: no Arabic data has been collected." },
        { tag: "DATA", text: "The language and country mix of reservations can only come from HMA." },
      ],
      notes: "Thai and English are both evidenced. Arabic is an open question, not a plan. This demo site shows how Thai and Arabic pages would work, but I would only invest in Arabic if your booking data or Search Console shows international demand. Thai native review of any copy comes before anything goes live.",
    },
    {
      id: "seo",
      tone: "plain",
      kicker: "SEO and Local SEO architecture",
      headline: "Structure Guests and Search Assistants Can Read",
      copy: "Branch pages with address, hours, directions and menu text; Business Profile links to the right branch page; clean branch URLs; structured data; links between branch, menu and language pages. Our observations date from October 2026 and are being re-verified.",
      question: "What search structure would make each branch easy to find and to choose?",
      visual: {
        kind: "board",
        cols: [
          { title: "Observed (our review)", tag: "OBS", items: ["Main food and breakfast menus are image-only PDFs", "Branch pages mostly images plus a booking button", "Some profile links point to the homepage; one public detail differs between sources"] },
          { title: "Estimated (third-party tools)", tag: "3P", items: ["Two tools estimate organic visits about 7–8 times apart", "A crawler reports 82% site health: 6 errors, 73 warnings (counts only)"] },
          { title: "To validate with HMA data", tag: "DATA", items: ["Search Console queries and pages by branch", "Business Profile calls, directions and website clicks", "Which pages currently rank for each branch query"] },
        ],
      },
      evidence: [
        { tag: "OBS", text: "Public-site and listing review, Oct 2026 (nine observations): image-only menus, branch-page structure, profile links, address difference, listing prices. Notes supplied by the project owner; re-verification pending.", conf: "Medium" },
        { tag: "3P", text: "Semrush (Nov 4, 2026) and Ahrefs (Oct 2026) estimate Mozza's monthly organic visits roughly 7–8 times apart; neither is Mozza analytics.", conf: "Low" },
        { tag: "3P", text: "Semrush Site Audit, Nov 5, 2026: health 82%, 6 errors, 73 warnings, 58 pages crawled. The issue list has not been reviewed.", conf: "Medium" },
        { tag: "DATA", text: "Search Console and Business Profile data are needed to size any of this." },
      ],
      notes: "The structure question is simple: can a guest or an assistant find the right branch, read the menu, and reserve? Our review suggests branch pages and menus carry little readable text, but I am labelling that as our observation, to be re-verified. The traffic tools disagree with each other, so decisions should rest on your Search Console, not on a model. This is a prioritisation exercise, not a list of faults.",
    },
    {
      id: "journey",
      tone: "light",
      kicker: "Customer journey and reservation conversion",
      headline: "From Search to Seat: Each Step Can Be Tested",
      copy: "Discover, choose the branch, read the menu, reserve, visit. Each step can be tested without assuming a problem. International guests need a booking path tested end to end, including phone-number formats, before anything is claimed.",
      question: "Where could the path from search to reservation be strengthened, and how would we know?",
      visual: {
        kind: "steps",
        labels: { observed: "What guests need", test: "How we would test it" },
        items: [
          { title: "Discover", observed: "A clear, local result for the area, mall or cuisine they searched.", test: "Local-intent impressions and clicks by branch (Search Console)." },
          { title: "Choose a branch", observed: "Address, hours, how to get there, one clear Reserve action.", test: "Branch-page views, directions requests, booking clicks." },
          { title: "Evaluate the menu", observed: "Readable dishes and prices before deciding.", test: "Menu-page engagement, then booking clicks." },
          { title: "Reserve", observed: "A short path, in their language, with their phone number format.", test: "Booking-click rate, click-to-confirmed rate, completion by language." },
          { title: "Visit", observed: "Confirmation and directions that match the branch.", test: "Confirmed reservations and seated covers by branch (HMA systems)." },
        ],
      },
      evidence: [
        { tag: "OBS", text: "Reservations are completed on an external booking platform (Oct 2026 review).", conf: "Medium" },
        { tag: "HYP", text: "Friction at any step is a hypothesis: no funnel data has been seen." },
        { tag: "DATA", text: "Funnel and completion data by branch, and the booking platform's reports, come from HMA." },
      ],
      notes: "Five steps, each with one thing to test. I am not asserting that guests drop out anywhere; I am saying each step is measurable and cheap to improve if it turns out to matter. The international path, phone-number formats and languages, deserves a hands-on test before we discuss it further.",
    },
    {
      id: "measurement",
      tone: "plain",
      kicker: "Attribution, GA4, GTM and measurement",
      headline: "First, See What Is Measured Today",
      copy: "Before any media spend we need to see what exists: GA4 and Tag Manager, Search Console, Business Profile insights and booking reports, by branch. Then we agree events, UTM conventions and one branch-level report. We assume nothing about what is or is not in place.",
      question: "What do we need to measure, and what can attribution honestly tell us?",
      visual: {
        kind: "board",
        cols: [
          { title: "Events to agree (examples)", tag: "HYP", items: ["Reservation start or booking click", "Directions and call", "Messaging (WhatsApp, LINE)", "UTM on every booking link"] },
          { title: "Sources to review with HMA", tag: "DATA", items: ["GA4 and Tag Manager (if any)", "Search Console", "Business Profile insights", "Booking platform reports by branch"] },
          { title: "Limits we will state", tag: "OBS", items: ["No exact branch or source attribution until the booking provider's source fields are known", "Modelled store visits only support, never lead"] },
        ],
      },
      evidence: [
        { tag: "HYP", text: "Event names and conventions are a proposal to agree with HMA's team.", conf: "Medium" },
        { tag: "DATA", text: "We have not seen HMA's analytics, Search Console, Business Profile or booking reports, so the current set-up is unknown. It does not show that anything is missing." },
        { tag: "OBS", text: "Metrics are kept in separate layers: Maps and profile interactions, booking clicks, confirmed reservations, seated covers and revenue.", conf: "High" },
      ],
      notes: "I will not assume anything is broken. HMA may already have much of this. The first job is a short read-only review of what exists, by branch. Then we agree a handful of events and a UTM convention, and one report. The honest limit: attribution can only go as far as the booking provider's reporting allows; where it cannot, we use a baseline and a comparison branch.",
    },
    {
      id: "contribution",
      tone: "light",
      kicker: "Incremental seated covers and contribution",
      headline: "Success Means Incremental Covers and Contribution",
      copy: "We measure incremental seated covers and contribution after media, commissions and relevant operating costs, against a baseline. Clicks and rankings are leading indicators only. No result is promised: if the data cannot show a clear benefit, we say so.",
      question: "Which number decides whether marketing paid back?",
      visual: {
        kind: "equation",
        terms: [
          { label: "Incremental revenue", op: "" },
          { label: "Media", op: "−" },
          { label: "Commissions", op: "−" },
          { label: "Relevant operating costs", op: "−" },
        ],
        result: "Incremental contribution",
        ladderTitle: "Supporting metrics, in order",
        ladder: ["Interactions", "Booking clicks", "Confirmed reservations", "Seated covers"],
      },
      evidence: [
        { tag: "HYP", text: "Method: incremental, capacity-capped, net of costs, against a baseline and a comparison branch where one exists. No outcome is promised.", conf: "High" },
        { tag: "DATA", text: "Average spend per cover, party size, margin, commissions and capacity by hour can only come from HMA. No figure from this deck is a Mozza number." },
      ],
      notes: "Incremental means what would not have happened anyway. We compare with the branch's own baseline and, where possible, another branch. Contribution is after media, any booking-platform commission and the operating costs that extra covers bring. Thresholds are agreed before launch so nobody moves the goalposts. I make no promise about the result.",
    },
    {
      id: "pilot",
      tone: "plain",
      kicker: "A controlled pilot",
      headline: "A Controlled 90-Day Pilot",
      copy: "One branch, 90 days, compared with a baseline. Weeks 1–4 prepare with no media spend; weeks 5–13 test; day 90 is a decision point: go, adjust or stop. Branch, hours and budget are set with HMA and depend on capacity and measurement.",
      question: "What exactly would we do, how long would it take, and how can HMA exit?",
      visual: {
        kind: "timeline",
        weeks: 13,
        rows: [
          { label: "Agree and baseline (weeks 1–2)", from: 1, to: 2, tone: "base" },
          { label: "Prepare: tracking, branch page, profile, Thai page (weeks 1–4)", from: 1, to: 4, tone: "prep" },
          { label: "Test: capped local Search, weekly optimisation (weeks 5–13)", from: 5, to: 13, tone: "test" },
        ],
        decision: { label: "Day 90: decision", outcomes: ["Go", "Adjust", "Stop"] },
        note: "Conditional on operational capacity and measurement feasibility.",
      },
      evidence: [
        { tag: "HYP", text: "Pilot design: a test branch against its own baseline, plus a comparison branch where one exists. The branch is not chosen.", conf: "Medium" },
        { tag: "DATA", text: "Feasibility depends on HMA's capacity data and on what reservation reporting can show." },
      ],
      notes: "Small and reversible. The first month is preparation with no media spend. Media starts only once tracking is verified. At day ninety we decide together: go, adjust or stop. I would only start if the branch has seats to fill in the hours we target and we can measure reservations well enough to judge the result. If either is false, I would tell you and not start.",
    },
    {
      id: "criteria",
      tone: "light",
      kicker: "Decision criteria",
      headline: "Decision Criteria Are Written Before Launch",
      copy: "Four gates, agreed with HMA in weeks 1–2 and written down before any media starts. The form is fixed now; the thresholds are set with your numbers. Platform migration is not part of the pilot.",
      question: "How will we decide to start, scale, adjust or stop?",
      visual: {
        kind: "table",
        head: ["Gate", "Rule (thresholds agreed with HMA in weeks 1–2)"],
        rows: [
          ["Start", "Capacity exists in the targeted hours AND basic reservation counts by branch are available AND HMA approves the branch, hours and budget cap. Otherwise: do not start."],
          ["Go", "Net incremental contribution after media, commissions and relevant operating costs meets the agreed threshold, in slots with spare capacity, with data quality passed."],
          ["Adjust", "Positive early signals but too few events or incomplete data: extend by up to 30 days with agreed fixes."],
          ["Stop", "Net incremental contribution below the threshold after the agreed learning period, no measurable difference from baseline, or data cannot support a conclusion: spend stops at once."],
        ],
      },
      evidence: [
        { tag: "HYP", text: "Decision form proposed for agreement; no numeric threshold is assumed.", conf: "High" },
        { tag: "DATA", text: "Thresholds, minimum event counts and the budget cap are set with HMA after discovery." },
      ],
      notes: "The point of this slide is that the rules exist before the result does. I do not have your margins, so I am not proposing numbers. In the first two weeks we set thresholds with your finance and operations people. If the pilot does not clear the bar, we stop and the foundation work stays with you.",
    },
    {
      id: "next-step",
      tone: "dark",
      kicker: "The ask",
      headline: "The Next Step: A 20-Minute Executive Meeting",
      copy: "Twenty minutes to hear your marketing priorities, which branch and hours matter most, and which data already exists. Then we decide together whether a pilot is worth scoping. We ask for no data access before that conversation. Contact: Wadhah Belhassen.",
      question: "What is the smallest decision we are asking for?",
      visual: {
        kind: "cta",
        steps: ["Executive meeting", "Scope (only if worthwhile)", "90-day pilot"],
        whatsapp: { label: "Discuss the pilot on WhatsApp", href: WA_URL_MKT, external: true },
        links: [{ label: "Website", href: "https://www.wadhah.digital/en", external: true }],
      },
      evidence: [{ tag: "PUB", text: "Contact details are the ones already published on the Strategy page." }],
      notes: "My ask is small: twenty minutes, whenever suits you. I would like to hear which branches and hours matter to you, what you already track, and where you would not want me to go. I am not asking for any access or data before that. If it makes sense afterwards, I will scope a pilot with you. If it does not, we have both learned something.",
    },
  ],
  appendix: [
    {
      id: "a-evidence",
      title: "A. Evidence register",
      lead: "Every statement on the slides, with its label, source and confidence.",
      table: {
        head: ["Statement used", "Label", "Source / date", "Confidence", "Slide"],
        rows: [
          ["Ratings 4.5–4.9, ≈ 6.0K reviews, four branches", "Public listings", "Google Maps, Oct 2026", "Medium", "1"],
          ["HMA Privilege loyalty programme", "Public page", "Current", "High", "1"],
          ["“mozza by cocotte” ≈ 2.4K searches a month", "Third-party estimate", "Mangools, Oct 2026", "Medium", "1"],
          ["Brand, non-brand and Thai search-volume ranges; mall terms by branch", "Third-party estimate", "Keyword Planner, Bangkok, Oct 2025 – Sep 2026", "Medium", "2, 3, 5"],
          ["Other restaurants in top results on generic Italian searches", "Our own snapshot", "Oct 2026", "Medium", "2"],
          ["Brand-query position differs by source", "Our test / Mangools / Semrush fragment", "Oct – Nov 2026", "Low", "2"],
          ["Non-brand top-of-page bids ≈ €0.1–0.9", "Third-party estimate", "Keyword Planner, Oct 2026", "Medium", "4"],
          ["No observable Google Ads footprint in Ads Transparency Center", "Our own review", "Oct 2026", "Medium", "4"],
          ["Image-only menus, thin branch pages, Thai page showing English, profile links, address difference", "Our own review (owner-supplied notes)", "Oct 2026, re-verification pending", "Medium", "3, 5, 6, 7"],
          ["Organic-visit estimates ≈ 7–8× apart; Site Audit 82%, 6 errors, 73 warnings", "Third-party estimates", "Semrush Nov 2026; Ahrefs Oct 2026", "Low / Medium", "6"],
          ["Branch list, funnel, capacity, margin, language mix, analytics set-up", "Needs HMA information", "—", "Open", "3–10"],
        ],
      },
    },
    {
      id: "b-method",
      title: "B. Measurement methodology",
      lead: "Implementation detail, relevant only once HMA agrees to scope a pilot.",
      bullets: [
        "KPI ladder (never blended): Maps and Business Profile interactions → booking clicks → confirmed reservations (provider-reported) → seated covers and revenue (point of sale) → modelled store visits (supportive only, if the account is eligible).",
        "Incrementality: a pre-period baseline of 4–8 weeks; difference-in-differences against the branch's own baseline and, where one exists, a comparison branch; optionally targeted versus untargeted slots within the branch.",
        "Tracking (only after HMA agrees to scope): GA4 key events (reservation start or click, directions, call, WhatsApp, LINE); a Tag Manager container review; UTM on outbound booking links; Business Profile performance export; provider reservation exports by source and branch; covers and revenue by hour.",
        "Formula: incremental confirmed reservations × show rate × party size = incremental covers, capped by available seats in the targeted slots; × spend per cover × contribution margin = contribution before costs; net incremental contribution = that − media − provider commissions − relevant incremental operating costs.",
        "Cost per table = cost per click ÷ click-to-table rate: the rate is unknown until measured.",
        "No exact branch or source attribution is promised until the booking provider's source fields are known.",
        "No example figure in this deck is a Mozza number.",
      ],
    },
    {
      id: "c-data",
      title: "C. Information requested from HMA",
      lead: "Requested at or after the executive meeting. Nothing is requested before it. Aggregated counts only; no guest personal data.",
      bullets: [
        "Tier 1 (to scope a pilot): branches in scope; average check and party size per branch; margin definition and any commissions; covers or occupancy by hour, weekday versus weekend, 8–12 weeks; reservations by source and no-show rate; current marketing spend by channel and branch, and any Google Ads account; which analytics and booking reports exist and who owns them.",
        "Tier 2 (once scope is agreed): read-only access to Search Console, GA4 and Tag Manager, and Business Profile insights; reservation-platform exports.",
      ],
    },
    {
      id: "d-risks",
      title: "D. Risks and assumptions",
      table: {
        head: ["#", "Risk / assumption", "Mitigation"],
        rows: [
          ["1", "The chosen branch may be near capacity in the targeted hours", "Choose the branch and hours from HMA's own data; do not start if capacity is not there"],
          ["2", "Reservation reporting may not show source or branch", "Use a baseline plus a comparison branch; judge on confirmed reservations and covers; state the limit"],
          ["3", "Incrementality may be low (guests would have booked anyway)", "Judge incremental, not attributed, results; holdout where appropriate"],
          ["4", "Third-party tools can mislead (traffic estimates differ; brand positions differ by source)", "Not used for decisions; replaced by HMA's first-party data"],
          ["5", "A small sample over 90 days", "Pre-agreed minimum event counts; “Adjust” extends by up to 30 days"],
          ["6", "Seasonality or events distort the read", "Compare with the baseline and a comparison branch; record events"],
          ["7", "Our own observations are dated and single-device", "Re-verify and repeat before any external claim"],
          ["A", "Assumes HMA wants to explore additional covers on weekdays and in quieter hours", "Confirm in the meeting"],
        ],
      },
    },
  ],
};

export const roleHub = {
  title: "Strategy experiences",
  lead: "Two interactive, evidence-labelled experiences for the HMA marketing team. Below them is the full strategy document.",
  open: "Open",
};

// Only these two are linked from the hub. The CEO presentation (ceoDeck, /strategy/ceo/) is archived: still built, noindex, not linked.
export const roleCards = [
  { role: "marketing", title: "Marketing Director — Growth Strategy", who: "Brand versus non-brand demand, local discovery, Google Ads, measurement and a controlled 90-day pilot", href: "/strategy/marketing/" },
  { role: "growth-risks", title: "Growth Risks & Structural Gaps — Evidence-based investigation", who: "Evidence-labelled findings, third-party signals, structural gaps and commercial opportunities", href: "/strategy/growth-risks/", dark: true },
];
