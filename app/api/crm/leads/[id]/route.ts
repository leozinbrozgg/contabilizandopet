import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = cookies().get("crm_token")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  // Histórico é deletado em cascata (ON DELETE CASCADE)
  await pool.query("DELETE FROM leads_consultoria WHERE id = $1", [id]);

  return NextResponse.json({ success: true });
}
