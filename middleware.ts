import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("crm_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64) throw new Error("no payload");

    const payloadJson = atob(payloadB64);
    const payload = JSON.parse(payloadJson);

    if (!payload.email || payload.exp < Date.now()) throw new Error("expired");

    if (sigB64) {
      const secret = process.env.CRM_JWT_SECRET ?? "fallback";
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
      );
      const bin = atob(sigB64);
      const sigBuf = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) sigBuf[i] = bin.charCodeAt(i);
      const valid = await crypto.subtle.verify(
        "HMAC", key, sigBuf, new TextEncoder().encode(payloadB64)
      );
      if (!valid) throw new Error("bad sig");
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/crm", "/crm/:path*"],
};
