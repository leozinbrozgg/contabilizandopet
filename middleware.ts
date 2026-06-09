import { NextResponse, type NextRequest } from "next/server";

const enc = new TextEncoder();

function fromB64url(str: string): ArrayBuffer {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("crm_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Formato JWT padrão: header.body.sig (3 partes, base64url)
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("invalid format");

    const [header, body, sig] = parts;

    const secret = process.env.CRM_JWT_SECRET ?? "dev-fallback-change-in-production";
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromB64url(sig),
      enc.encode(`${header}.${body}`)
    );
    if (!valid) throw new Error("bad sig");

    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    if (!payload.email) throw new Error("no email");
    if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error("expired");

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/crm", "/crm/:path*"],
};
