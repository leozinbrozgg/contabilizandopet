import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let email = "", senha = "";
    try {
      const b = await request.json();
      email = b.email ?? "";
      senha = b.senha ?? "";
    } catch {
      return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
    }

    const adminEmail = (process.env.CRM_ADMIN_EMAIL ?? "").toLowerCase().trim();
    const adminSenha = process.env.CRM_ADMIN_SENHA ?? "";

    if (!adminEmail || email.toLowerCase().trim() !== adminEmail || senha !== adminSenha) {
      return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
    }

    const payload = btoa(
      JSON.stringify({ email: adminEmail, exp: Date.now() + 604_800_000 })
    );

    const secret = process.env.CRM_JWT_SECRET ?? "fallback";
    let token = payload;

    try {
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const sig = await crypto.subtle.sign(
        "HMAC", key, new TextEncoder().encode(payload)
      );
      const sigB64 = btoa(String.fromCharCode(...Array.from(new Uint8Array(sig))));
      token = `${payload}.${sigB64}`;
    } catch {
      // crypto.subtle indisponível — usa payload sem assinatura
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("crm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604_800,
      path: "/",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Erro: " + String(err) }, { status: 500 });
  }
}
