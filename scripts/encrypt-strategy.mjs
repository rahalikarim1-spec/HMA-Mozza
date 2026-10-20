/**
 * Build step: encrypts the private /strategy content (strategy/doc.mjs, EN + FR) into public/strategy-data/payload.json.
 *   AES-256-GCM, key = PBKDF2-SHA256(passcode, random salt, 600 000 iterations). Decrypted in the browser with WebCrypto.
 * The passcode comes from the STRATEGY_PASSCODE environment variable (never committed, never logged).
 * Optional: STRATEGY_EUR_THB (default 38) for the "≈ THB" conversion of Keyword Planner bids.
 * Without STRATEGY_PASSCODE no payload is written and /strategy says the content is not available in this build.
 */
import { webcrypto as crypto, randomBytes } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { buildDoc } from "../strategy/doc.mjs";

const OUT_DIR = "public/strategy-data";
const OUT = `${OUT_DIR}/payload.json`;
const pass = process.env.STRATEGY_PASSCODE;
rmSync(OUT_DIR, { recursive: true, force: true });

if (!pass) {
  console.warn("encrypt-strategy: STRATEGY_PASSCODE is not set -> no strategy payload in this build (the /strategy page will say so).");
  process.exit(0);
}
if (pass.length < 12) console.warn("encrypt-strategy: WARNING - passcode shorter than 12 characters; an offline brute-force attack on a static file is realistic. Use a long passphrase.");

const fx = Number(process.env.STRATEGY_EUR_THB || 38);
const payload = { v: 1, en: buildDoc("en", { fx }), fr: buildDoc("fr", { fx }) };
const iter = 600000;
const salt = randomBytes(16);
const iv = randomBytes(12);
const keyMat = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, keyMat, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = Buffer.from(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(payload))));
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify({ v: 1, kdf: "PBKDF2-SHA256", iter, salt: salt.toString("base64"), iv: iv.toString("base64"), data: ct.toString("base64") }));
console.log(`encrypt-strategy: wrote ${OUT} (${Math.round(ct.length / 1024)} KB encrypted, EUR→THB ${fx})`);
