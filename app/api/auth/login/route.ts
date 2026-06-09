import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, senha } = await request.json();

  if (!email?.trim() || !senha?.trim()) {
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const { rows } = await pool.query(
    "SELECT senha_hash FROM crm_users WHERE email = $1",
    [email.trim().toLowerCase()]
  );

  if (!rows[0] || !(await bcrypt.compare(senha, rows[0].senha_hash))) {
    return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
  }

  const token = await signToken({ email: email.trim().toLowerCase() });

  const response = NextResponse.json({ success: true });
  response.cookies.set("crm_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
