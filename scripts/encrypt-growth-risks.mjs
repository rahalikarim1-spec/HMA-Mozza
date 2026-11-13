/**
 * Build step: encrypts the Growth Risks & Structural Gaps content (strategy/growth-risks.mjs) into public/strategy-data/growth-risks.json.
 *   AES-256-GCM, key = PBKDF2-SHA256(password, random 16-byte salt, 600 000 iterations). Decrypted in the browser with WebCrypto.
 * The password is GROWTH_RISKS_PASSWORD if set, otherwise the default below (the repo is public: this is a light gate, not strong secrecy).
 */
import { webcrypto as crypto, randomBytes } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { growthRisks } from "../strategy/growth-risks.mjs";

const OUT_DIR = "public/strategy-data";
const OUT = `${OUT_DIR}/growth-risks.json`;
const pass = process.env.GROWTH_RISKS_PASSWORD || "mozza6"; // GROWTH_RISKS_PASSWORD overrides the default
rmSync(OUT_DIR, { recursive: true, force: true });

const iter = 600000;
const salt = randomBytes(16);
const iv = randomBytes(12);
const keyMat = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, keyMat, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const ct = Buffer.from(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify({ v: 1, data: growthRisks }))));
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, JSON.stringify({ v: 1, kdf: "PBKDF2-SHA256", iter, salt: salt.toString("base64"), iv: iv.toString("base64"), data: ct.toString("base64") }));
console.log(`encrypt-growth-risks: wrote ${OUT} (${Math.round(ct.length / 1024)} KB encrypted)`);
