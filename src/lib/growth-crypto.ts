/** Browser-side decryption of the Growth Risks payload (AES-256-GCM, key from PBKDF2-SHA256). The password is never logged or sent anywhere. */
export const GR_PAYLOAD_URL = "/strategy-data/growth-risks.json";
export const GR_SESSION_KEY = "growth-risks-unlock";

export class GrowthCryptoError extends Error {
  constructor(public kind: "unavailable" | "wrong") {
    super(kind);
  }
}

export interface GrowthPayload { iter: number; salt: string; iv: string; data: string }

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const toB64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));

export async function loadPayload(): Promise<GrowthPayload> {
  let res: Response;
  try {
    res = await fetch(GR_PAYLOAD_URL, { cache: "no-store" });
  } catch {
    throw new GrowthCryptoError("unavailable");
  }
  if (!res.ok) throw new GrowthCryptoError("unavailable");
  try {
    return (await res.json()) as GrowthPayload;
  } catch {
    throw new GrowthCryptoError("unavailable");
  }
}

async function decryptWith<T>(key: CryptoKey, p: GrowthPayload): Promise<T> {
  try {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(p.iv) }, key, b64(p.data));
    return (JSON.parse(new TextDecoder().decode(pt)) as { data: T }).data;
  } catch {
    throw new GrowthCryptoError("wrong");
  }
}

/** Derive the key from the password, decrypt, and return the content plus the raw key (kept for this browser session only). */
export async function unlockWithPassword<T>(password: string, p: GrowthPayload): Promise<{ data: T; sessionKey: string }> {
  const mat = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(p.salt), iterations: p.iter, hash: "SHA-256" }, mat, { name: "AES-GCM", length: 256 }, true, ["decrypt"]);
  const data = await decryptWith<T>(key, p);
  return { data, sessionKey: toB64(await crypto.subtle.exportKey("raw", key)) };
}

/** Re-open with the session key (after a reload in the same tab). No password involved. */
export async function unlockWithSessionKey<T>(sessionKey: string, p: GrowthPayload): Promise<T> {
  const key = await crypto.subtle.importKey("raw", b64(sessionKey), { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  return decryptWith<T>(key, p);
}
