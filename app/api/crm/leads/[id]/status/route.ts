import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = cookies().get("crm_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  const { status_novo, status_anterior } = await request.json();

  if (!status_novo) {
    return NextResponse.json({ error: "Status obrigatório." }, { status: 400 });
  }

  await pool.query(
    `UPDATE leads_consultoria SET status = $1, atualizado_em = NOW() WHERE id = $2`,
    [status_novo, id]
  );

  const { rows } = await pool.query(
    `INSERT INTO leads_historico (lead_id, status_anterior, status_novo)
     VALUES ($1, $2, $3) RETURNING *`,
    [id, status_anterior ?? null, status_novo]
  );

  return NextResponse.json(rows[0]);
}
