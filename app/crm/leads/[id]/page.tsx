import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import LeadDetalhes from "./LeadDetalhes";
import type { Lead, HistoricoLead } from "@/types";

export default async function LeadPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: leadRaw }, { data: historicoRaw }] = await Promise.all([
    supabase.rpc("cpd_get_lead", { p_id: params.id }),
    supabase.rpc("cpd_get_historico", { p_lead_id: params.id }),
  ]);

  const lead = (leadRaw as Lead[] | null)?.[0];
  if (!lead) notFound();

  return (
    <LeadDetalhes
      lead={lead}
      historico={(historicoRaw ?? []) as HistoricoLead[]}
    />
  );
}
