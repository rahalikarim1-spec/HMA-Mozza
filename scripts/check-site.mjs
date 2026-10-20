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
  if (url === "/strategy/") {
    // private page: only noindex + single H1 + banner are required (no hreflang/canonical/sitemap/breadcrumbs)
    if (!/<meta name="robots" content="noindex, nofollow"\/?>/.test(h)) errors.push(`${url}: missing noindex,nofollow`);
    if ((body.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${url}: needs exactly one <h1>`);
    if (!/Concept demo by Wadhah Belhassen/.test(body)) errors.push(`${url}: banner missing`);
    continue;
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
if (locs.includes("/strategy/")) errors.push("sitemap must NOT list /strategy/");
for (const u of Object.keys(html)) if (u !== "/strategy/" && isCoreUrl(u) && !locs.includes(u)) errors.push(`page ${u} missing from sitemap`);
function isCoreUrl(u) { return u !== "/404/" && u !== "/404.html" && !u.startsWith("/_not-found"); }

// --- strategy content must never appear in plain text anywhere in the export
{
  const { buildDoc } = await import("../strategy/doc.mjs");
  const strings = [];
  const walk = (x) => { if (typeof x === "string") { if (x.length >= 30) strings.push(x); } else if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === "object") Object.values(x).forEach(walk); };
  // the button label (= document title) is intentionally public, so it is excluded from the leak scan
  for (const L of ["en", "fr"]) { const d = buildDoc(L); const pub = d.ui.title; const clone = JSON.parse(JSON.stringify(d)); clone.ui.title = ""; walk(clone); void pub; }
  const sample = strings.filter((_, i) => i % Math.max(1, Math.floor(strings.length / 120)) === 0);
  const files = [];
  (function w(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) w(p); else if (/\.(html|js|json|txt|css|xml)$/.test(f) && !p.includes("strategy-data")) files.push(p); } })(OUT);
  let leaked = 0;
  for (const f of files) { const c = readFileSync(f, "utf8"); for (const s of sample) if (c.includes(s)) { errors.push(`LEAK: strategy text found in plain text in ${f}: "${s.slice(0, 50)}…"`); leaked++; } }
  const payload = join(OUT, "strategy-data", "payload.json");
  console.log(existsSync(payload) ? `strategy payload present (encrypted); scanned ${files.length} files for ${sample.length} sample sentences: ${leaked} leaks` : "strategy payload NOT built (STRATEGY_PASSCODE unset)");
}
console.log(`checked ${Object.keys(html).length} pages, ${linkCount} internal links`);
warn.forEach((w) => console.log("WARN", w));
if (errors.length) {
  console.log(`\n${errors.length} PROBLEM(S):`);
  errors.slice(0, 80).forEach((e) => console.log(" -", e));
  process.exit(1);
}
console.log("OK: zero broken internal links; SEO/noindex/hreflang/canonical/banner/schema checks pass.");
