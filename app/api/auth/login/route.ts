import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

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

    // Usa signToken do lib/auth — gera JWT de 3 partes (header.body.sig)
    // compatível com verifyToken usado em todos os endpoints protegidos
    const token = await signToken({ email: adminEmail });

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
