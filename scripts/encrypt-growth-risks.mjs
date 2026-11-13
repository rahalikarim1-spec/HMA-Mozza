/**
 * Build step: encrypts the Growth Risks & Structural Gaps content (strategy/growth-risks.mjs) into public/strategy-data/growth-risks.json.
 *   AES-256-GCM, key = PBKDF2-SHA256(password, random 16-byte salt, 600 000 iterations). Decrypted in the browser with WebCrypto.
 * The password comes from the GROWTH_RISKS_PASSWORD environment variable (never committed, never logged).
 * Without it the build FAILS: the page must never be published unprotected. Use --allow-missing for `npm run dev` only (no payload is written).
 */
import { webcrypto as crypto, randomBytes } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { growthRisks } from "../strategy/growth-risks.mjs";

const OUT_DIR = "public/strategy-data";
const OUT = `${OUT_DIR}/growth-risks.json`;
const pass = process.env.GROWTH_RISKS_PASSWORD;
rmSync(OUT_DIR, { recursive: true, force: true });

if (!pass) {
  if (process.argv.includes("--allow-missing")) {
    console.warn("encrypt-growth-risks: GROWTH_RISKS_PASSWORD is not set -> no payload (dev only; the page will show 'not available').");
    process.exit(0);
  }
  console.error("encrypt-growth-risks: GROWTH_RISKS_PASSWORD is not set. Refusing to build: /strategy/growth-risks/ must never be published unprotected.");
  process.exit(1);
}
if (pass.length < 12) console.warn("encrypt-growth-risks: WARNING - password shorter than 12 characters; an offline brute-force attack on a static file is realistic. Use a long passphrase.");

const iter = 600000;
const salt = randomBytes(16);
const iv = randomBytes(12);
const keyMat = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, keyMat, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = Buffer.from(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify({ v: 1, data: growthRisks }))));
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify({ v: 1, kdf: "PBKDF2-SHA256", iter, salt: salt.toString("base64"), iv: iv.toString("base64"), data: ct.toString("base64") }));
console.log(`encrypt-growth-risks: wrote ${OUT} (${Math.round(ct.length / 1024)} KB encrypted)`);
