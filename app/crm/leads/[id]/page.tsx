export const dynamic = "force-dynamic";

import pool from "@/lib/db";
import { notFound } from "next/navigation";
import LeadDetalhes from "./LeadDetalhes";
import type { Lead, HistoricoLead } from "@/types";

export default async function LeadPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const [leadResult, historicoResult] = await Promise.all([
    pool.query<Lead>(`SELECT * FROM leads_consultoria WHERE id = $1`, [id]),
    pool.query<HistoricoLead>(
      `SELECT * FROM leads_historico WHERE lead_id = $1 ORDER BY criado_em DESC`,
      [id]
    ),
  ]);

  const lead = leadResult.rows[0];
  if (!lead) notFound();

  return (
    <LeadDetalhes
      lead={lead}
      historico={historicoResult.rows}
    />
  );
}
