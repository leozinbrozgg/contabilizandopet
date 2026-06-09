import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json();

    const adminEmail = (process.env.CRM_ADMIN_EMAIL ?? "").toLowerCase().trim();
    const adminSenha = process.env.CRM_ADMIN_SENHA ?? "";

    if (
      !email || !senha ||
      email.trim().toLowerCase() !== adminEmail ||
      senha !== adminSenha
    ) {
      return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
    }

    const token = await signToken({ email: adminEmail });

    const response = NextResponse.json({ success: true });
    response.cookies.set("crm_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[login]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
