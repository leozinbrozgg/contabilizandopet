import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = cookies().get("crm_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const { observacao } = await request.json();

  if (!observacao?.trim()) {
    return NextResponse.json({ error: "Observação não pode ser vazia." }, { status: 400 });
  }

  const { rows } = await pool.query(
    `INSERT INTO leads_historico (lead_id, observacao)
     VALUES ($1, $2) RETURNING *`,
    [id, observacao.trim()]
  );

  return NextResponse.json(rows[0]);
}
