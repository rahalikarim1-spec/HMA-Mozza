// Post-build checks on ./out: broken internal links/anchors, SEO tags, schema, noindex, banner, privacy rules.
//   npm run build && npm run check
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, posix } from "node:path";

const OUT = "out";
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html" || f === "404.html") pages.push(p);
  }
})(OUT);

const urlOf = (file) => "/" + file.replace(/^out[\\/]?/, "").replace(/index\.html$/, "").replace(/\\/g, "/");
const html = Object.fromEntries(pages.map((p) => [urlOf(p), readFileSync(p, "utf8")]));
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "");
const idsOf = (h) => new Set([...strip(h).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const idCache = {};

const errors = [];
const warn = [];
let linkCount = 0;

for (const [url, h] of Object.entries(html)) {
  const body = strip(h);
  if (url === "/404/" || url === "/404.html" || url.startsWith("/_not-found")) {
    if (!/<meta name="robots" content="noindex, nofollow"\/?>/.test(h)) errors.push(`${url}: missing noindex`);
    if ((body.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${url}: needs exactly one <h1>`);
    continue;
  }

  // --- links
  const isStrategy = url === "/strategy/" || url.startsWith("/strategy/");
  if (isStrategy) {
    // intentional noindex pages (strategy hub + role presentations): only noindex + single H1 + banner are required (no hreflang/canonical/sitemap/breadcrumbs); links and images are still checked below
    if (!/<meta name="robots" content="noindex, nofollow"\/?>/.test(h)) errors.push(`${url}: missing noindex,nofollow`);
    if ((body.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${url}: needs exactly one <h1>`);
    if (!/Concept demo by Wadhah Belhassen/.test(body)) errors.push(`${url}: banner missing`);
    if (url !== "/strategy/") {
      // role presentations are shareable: nothing internal may leak into them (pricing, private outreach, third-party booking / link-quality material, forbidden word)
      // Why the guard exists: shareable role presentations must not carry unvalidated link-quality material by accident.
      // The ONLY exception: the Growth Risks page discusses third-party link-profile signals on purpose, so it is exempt from the
      // backlink/disavow pattern (and from nothing else). Its own stricter checks follow below.
      const LINK_ANALYSIS_ROUTES = new Set(["/strategy/growth-risks/"]);
      for (const [re, what, exempt] of [[/retainer/i, "pricing term"], [/180[,.]?000|300[,.]?000/, "pricing figure"], [/OUTREACH/, "private outreach reference"], [/Trip\.com/i, "internal observation (Trip.com)"], [/backlink|disavow/i, "internal observation (backlinks)", LINK_ANALYSIS_ROUTES], [/halal|حلال/i, "forbidden word"]]) {
        if (exempt && exempt.has(url)) continue;
        if (re.test(body)) errors.push(`${url}: contains ${what}`);
      }
      if (/<img /.test(body)) errors.push(`${url}: images are not allowed on presentation pages until usage rights are confirmed`);
    }
  }
  for (const m of body.matchAll(/<a [^>]*?href="([^"]+)"/g)) {
    let href = m[1].replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    if (href.startsWith("#")) {
      if (/^#(line|instagram|facebook|reserve|delivery|pdf)-?/.test(href)) continue; // documented demo placeholders
      linkCount++;
      if (href !== "#" && !idsOf(h).has(href.slice(1))) errors.push(`${url}: anchor ${href} not found on page`);
      continue;
    }
    linkCount++;
    const [pathAndQuery, hash] = href.split("#");
    const path = pathAndQuery.split("?")[0];
    const target = path.startsWith("/") ? path : posix.normalize(posix.join(url, path));
    const isFile = /\.[a-z0-9]+$/i.test(target);
    if (isFile) {
      if (!existsSync(join(OUT, target)) && !existsSync(join("public", target))) errors.push(`${url}: missing file ${target}`);
      continue;
    }
    const norm = target.endsWith("/") ? target : target + "/";
    if (!html[norm]) { errors.push(`${url}: broken link ${href}`); continue; }
    if (hash) {
      idCache[norm] ??= idsOf(html[norm]);
      if (!idCache[norm].has(hash)) errors.push(`${url}: anchor #${hash} missing on ${norm}`);
    }
  }
  // --- images
  for (const m of body.matchAll(/<img [^>]*?src="(\/[^"]+)"/g)) {
    const src = m[1].split("?")[0];
    if (!existsSync(join(OUT, src))) errors.push(`${url}: missing image ${src}`);
  }

  if (isStrategy) continue;

  // --- SEO / rules
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "";
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "";
  const dec = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
  if (!title) errors.push(`${url}: no <title>`);
  if ([...dec(title)].length > 60) errors.push(`${url}: title ${[...dec(title)].length} > 60: ${dec(title)}`);
  if (!desc) errors.push(`${url}: no meta description`);
  if ([...dec(desc)].length > 155) errors.push(`${url}: description ${[...dec(desc)].length} > 155`);
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${url}: ${h1} <h1>`);
  if (!/<meta name="robots" content="noindex, nofollow"\/?>/.test(h)) errors.push(`${url}: missing noindex,nofollow`);
  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canon) errors.push(`${url}: no canonical`);
  else if (!canon.endsWith(url)) errors.push(`${url}: canonical is not self (${canon})`);
  const hl = [...h.matchAll(/<link rel="alternate" hrefLang="([^"]+)"/g)].map((m) => m[1]).sort().join(",");
  if (hl !== "ar,en,th,x-default") errors.push(`${url}: hreflang set = ${hl}`);
  for (const k of ['property="og:title"', 'property="og:description"', 'property="og:url"', 'name="twitter:card"', 'name="twitter:title"']) if (!h.includes(k)) errors.push(`${url}: missing ${k}`);
  if (!/Concept demo by Wadhah Belhassen|เดโมแนวคิดโดย Wadhah Belhassen|عرض تجريبي من Wadhah Belhassen/.test(body)) errors.push(`${url}: banner missing`);
  if (/halal|حلال/i.test(h)) errors.push(`${url}: forbidden word`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1].replace(/\\u003c/g, "<")); } catch { errors.push(`${url}: invalid JSON-LD`); }
  }
  const inner = url.split("/").filter(Boolean).filter((s) => s !== "th" && s !== "ar").length > 0;
  if (inner && !h.includes('"BreadcrumbList"')) errors.push(`${url}: no BreadcrumbList`);
  if (inner && !/aria-label="[^"]*"[^>]*><ol/.test(body) && !body.includes("<ol")) warn.push(`${url}: no visible breadcrumbs`);
  if (!/href="(\/(th\/|ar\/)?menu\/)"/.test(body) && !/href="\/(th\/|ar\/)?menu\/"/.test(body)) errors.push(`${url}: no link to /menu`);
  if (!/href="\/(th\/|ar\/)?locations\/"/.test(body)) errors.push(`${url}: no link to /locations`);
  if (!/href="\/(th\/|ar\/)?reserve\/[^"]*"/.test(body)) errors.push(`${url}: no link to /reserve`);
}

// robots + sitemap
const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
if (/Disallow:\s*\/\s*$/m.test(robots)) errors.push("robots.txt disallows everything");
const sm = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
for (const l of locs) if (!html[l]) errors.push(`sitemap lists ${l} which does not exist`);
for (const l of locs) if (l === "/strategy/" || l.startsWith("/strategy/")) errors.push(`sitemap must NOT list ${l}`);
for (const u of Object.keys(html)) if (!u.startsWith("/strategy/") && isCoreUrl(u) && !locs.includes(u)) errors.push(`page ${u} missing from sitemap`);
function isCoreUrl(u) { return u !== "/404/" && u !== "/404.html" && !u.startsWith("/_not-found"); }

// --- /strategy: public URL, but noindex + not in sitemap + really rendered
{
  const st = html["/strategy/"];
  if (!st) errors.push("/strategy/ page missing");
  else {
    const txt = strip(st);
    if (!txt.includes("Executive summary")) errors.push("/strategy/: content not rendered at build time");
    if (!/<meta name="robots" content="noindex, nofollow"/.test(st)) errors.push("/strategy/: missing noindex,nofollow");
  }
  console.log(st ? "/strategy/ rendered as a normal static page (noindex, not in sitemap)" : "");
  // Strategy hub: exactly the two approved experiences are linked. The CEO presentation and any other role route are archived (built, noindex, unlinked).
  if (st) {
    for (const need of ["/strategy/marketing/", "/strategy/growth-risks/"]) if (!st.includes(`href="${need}"`)) errors.push(`/strategy/: hub link to ${need} missing`);
    for (const r of ["ceo", "brand", "operations", "restaurant"]) if (st.includes(`href="/strategy/${r}/"`)) errors.push(`/strategy/: links to archived role page /strategy/${r}/`);
    if (/Coming soon/i.test(strip(st))) errors.push("/strategy/: 'Coming soon' role cards must not be shown");
    const heroLinks = (st.match(/href="\/strategy\/[a-z-]+\/"/g) || []).length;
    if (heroLinks !== 2) errors.push(`/strategy/: expected exactly 2 experience links, found ${heroLinks}`);
  }
  // No page may link to the archived CEO presentation
  for (const [u, h] of Object.entries(html)) if (u !== "/strategy/ceo/" && /href="\/strategy\/ceo\//.test(h)) errors.push(`${u}: links to the archived /strategy/ceo/ page`);
  const ceo = html["/strategy/ceo/"];
  if (!ceo) errors.push("/strategy/ceo/ archived page missing");
  else {
    const slides = (ceo.match(/<section id="slide-\d+"/g) || []).length;
    if (slides !== 8) errors.push(`/strategy/ceo/: expected 8 slide sections, found ${slides}`);
    console.log(`/strategy/ceo/ archived (${slides} slides, noindex, not in sitemap, unlinked)`);
  }
  const mk = html["/strategy/marketing/"];
  if (!mk) errors.push("/strategy/marketing/ page missing");
  else {
    const slides = (mk.match(/<section id="slide-\d+"/g) || []).length;
    if (slides !== 12) errors.push(`/strategy/marketing/: expected 12 slide sections, found ${slides}`);
    if (!strip(mk).includes("A Strong Brand With Room to Capture More Local Demand")) errors.push("/strategy/marketing/: content not rendered at build time");
    if (!mk.includes('href="/strategy/"')) errors.push("/strategy/marketing/: Back to Strategy link missing");
    if (!/https:\/\/wa\.me\/21628320998/.test(mk)) errors.push("/strategy/marketing/: WhatsApp CTA missing");
    console.log(`/strategy/marketing/ rendered (${slides} slides, noindex, not in sitemap)`);
  }
  // Growth Risks & Structural Gaps (private review draft): must be rendered, linked from the hub, and carry its safety framing.
  // NOTE: no exception to the content guard is needed: this page does not use the words the guard blocks (backlink/disavow, pricing, Trip.com).
  const gr = html["/strategy/growth-risks/"];
  if (!gr) errors.push("/strategy/growth-risks/ page missing");
  else {
    const t = strip(gr);
    if (!t.includes("Where Growth Meets Digital Risk")) errors.push("/strategy/growth-risks/: content not rendered at build time");
    for (const need of ["Confirmed technical issues", "Third-party risk signals", "Commercial growth opportunities", "What it does NOT prove", "Investigation priority", "Evidence confidence", "Private review draft"]) {
      if (!t.includes(need)) errors.push(`/strategy/growth-risks/: missing required text "${need}"`);
    }
    const nots = (t.match(/What it does NOT prove/g) || []).length;
    const findings = (gr.match(/<li id="finding-/g) || []).length;
    if (findings < 10 || nots !== findings) errors.push(`/strategy/growth-risks/: every finding needs a "does NOT prove" statement (findings ${findings}, statements ${nots})`);
    // a third-party classification must never be presented as a confirmed critical issue or a proven penalty
    if (/Critical<\/span>/.test(gr) && !/Critical<\/th>|Critical priority/.test(gr)) errors.push("/strategy/growth-risks/: a finding is labelled Critical (needs explicit approval)");
    if (/confirmed\s+(google\s+)?penalt|proven\s+penalt|negative\s+seo\s+attack|manipulat/i.test(t)) errors.push("/strategy/growth-risks/: accusation / penalty / manipulation wording");
    // link-profile safety framing: tool classification only, unit/thresholds unconfirmed, never a Google-penalty claim, never a bulk-disavow recommendation
    for (const need of [/third-party/i, /not a google penalty/i, /unit and thresholds[^.]{0,40}not confirmed/i, /no bulk disavow without evidence/i]) {
      if (!need.test(t)) errors.push(`/strategy/growth-risks/: missing safety framing ${need}`);
    }
    const dis = (t.match(/disavow/gi) || []).length, noBulk = (t.match(/No bulk disavow/g) || []).length;
    if (dis !== noBulk) errors.push(`/strategy/growth-risks/: "disavow" appears outside the "No bulk disavow" statement (${dis} vs ${noBulk})`);
    // figures that are reported but not verified from archived evidence must never be rendered (Position Tracking aggregates, Local Listings, unverified anchor counts)
    for (const [re, what] of [[/21\.48/, "Position Tracking visibility (unverified)"], [/106\.67/, "Position Tracking traffic (unverified)"], [/62\.20/, "Position Tracking average (unverified)"], [/\b10\s+(tracked\s+)?keywords\b/i, "tracked keyword count (unverified)"], [/28\s*(\/|of)\s*30/i, "Local Listings figure (M1 not supplied)"], [/\b(881|891)\b/, "anchor counts (unverified)"]]) {
      if (re.test(t)) errors.push(`/strategy/growth-risks/: rendered figure not backed by verified evidence: ${what}`);
    }
    console.log("/strategy/growth-risks/ rendered (noindex, not in sitemap, no images, safety framing present)");
  }
}
console.log(`checked ${Object.keys(html).length} pages, ${linkCount} internal links`);
warn.forEach((w) => console.log("WARN", w));
if (errors.length) {
  console.log(`\n${errors.length} PROBLEM(S):`);
  errors.slice(0, 80).forEach((e) => console.log(" -", e));
  process.exit(1);
}
console.log("OK: zero broken internal links; SEO/noindex/hreflang/canonical/banner/schema checks pass.");
