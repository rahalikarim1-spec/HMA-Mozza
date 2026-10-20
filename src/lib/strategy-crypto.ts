/** Browser-side decryption of the strategy payload (AES-GCM, key from PBKDF2-SHA256). The passcode is never logged or sent anywhere. */
export class StrategyError extends Error {
  constructor(public kind: "unavailable" | "wrong") {
    super(kind);
  }
}

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export async function decryptStrategy<T = unknown>(passcode: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch("/strategy-data/payload.json", { cache: "no-store" });
  } catch {
    throw new StrategyError("unavailable");
  }
  if (!res.ok) throw new StrategyError("unavailable");
  const p = (await res.json()) as { iter: number; salt: string; iv: string; data: string };
  try {
    const mat = await crypto.subtle.importKey("raw", new TextEncoder().encode(passcode), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(p.salt), iterations: p.iter, hash: "SHA-256" }, mat, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(p.iv) }, key, b64(p.data));
    return JSON.parse(new TextDecoder().decode(pt)) as T;
  } catch {
    throw new StrategyError("wrong");
  }
}
