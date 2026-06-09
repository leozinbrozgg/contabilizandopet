const enc = new TextEncoder();
const dec = new TextDecoder();

function b64url(buf: ArrayBuffer): string {
  const bytes = Array.from(new Uint8Array(buf));
  return btoa(bytes.map((b) => String.fromCharCode(b)).join(""))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function fromB64url(str: string): ArrayBuffer {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer as ArrayBuffer;
}

async function getKey(): Promise<CryptoKey> {
  const raw = process.env.CRM_JWT_SECRET ?? "dev-fallback-change-in-production";
  return crypto.subtle.importKey(
    "raw",
    enc.encode(raw).buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(payload: { email: string }): Promise<string> {
  const header = b64url(enc.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })).buffer as ArrayBuffer);
  const body = b64url(
    enc.encode(
      JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600 })
    ).buffer as ArrayBuffer
  );
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${header}.${body}`).buffer as ArrayBuffer);
  return `${header}.${body}.${b64url(sig)}`;
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const [header, body, sig] = token.split(".");
    if (!header || !body || !sig) return null;
    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromB64url(sig),
      enc.encode(`${header}.${body}`).buffer as ArrayBuffer
    );
    if (!valid) return null;
    const payload = JSON.parse(dec.decode(fromB64url(body)));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
