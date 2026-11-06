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

export const roleHub = {
  title: "Presentations by role",
  lead: "Interactive, evidence-labelled presentations for the HMA team. One shared evidence base, different priorities. This page is the full strategy document.",
  soon: "Coming soon",
  open: "Open presentation",
};

export const roleCards = [
  { role: "ceo", title: "CEO / Co-Founder", who: "Profitable growth, occupancy and a controlled 90-day pilot", href: "/strategy/ceo/" },
  { role: "marketing", title: "Marketing Director", who: "Channel performance, budget efficiency and attribution", soon: true },
  { role: "brand", title: "Brand Manager", who: "Brand consistency, visibility and international discovery", soon: true },
  { role: "operations", title: "Operations Director", who: "Reservations, branch performance and coordination", soon: true },
  { role: "restaurant", title: "Restaurant General Manager", who: "Local demand, booking experience and restaurant traffic", soon: true },
];
