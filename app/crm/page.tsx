import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Users, TrendingUp, CheckCircle2, Clock, ArrowRight, MessageCircle } from "lucide-react";
import type { Lead } from "@/types";

const statusStyles: Record<string, string> = {
  "Novo": "bg-blue-50 text-blue-700 border-blue-100",
  "Em atendimento": "bg-amber-50 text-amber-700 border-amber-100",
  "Aguardando resposta": "bg-orange-50 text-orange-700 border-orange-100",
  "Reunião agendada": "bg-violet-50 text-violet-700 border-violet-100",
  "Proposta enviada": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Convertido": "bg-green-50 text-green-700 border-green-100",
  "Perdido": "bg-gray-100 text-gray-500 border-gray-200",
};

const allStatuses = [
  "Novo", "Em atendimento", "Aguardando resposta",
  "Reunião agendada", "Proposta enviada", "Convertido", "Perdido",
];

function Avt({ nome }: { nome: string }) {
  const initials = nome.trim().split(/\s+/).slice(0, 2).map(n => n[0]?.toUpperCase() ?? "").join("");
  const palette = ["bg-blue-500", "bg-violet-500", "bg-teal-500", "bg-rose-500", "bg-amber-500", "bg-indigo-500"];
  const color = palette[nome.charCodeAt(0) % palette.length];
  return (
    <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  );
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

export default async function DashboardPage() {
  const supabase = createClient();

  const [{ data: statsRaw }, { data: leadsRaw }] = await Promise.all([
    supabase.rpc("cpd_get_stats"),
    supabase.rpc("cpd_get_leads", { p_status: null, p_busca: null }),
  ]);

  const contagem: Record<string, number> = {};
  (statsRaw ?? []).forEach((r: { status: string; contagem: number }) => {
    contagem[r.status] = Number(r.contagem);
  });

  const leads: Lead[] = (leadsRaw ?? []) as Lead[];
  const total = leads.length;
  const novos = contagem["Novo"] ?? 0;
  const convertidos = contagem["Convertido"] ?? 0;
  const emAndamento = ["Em atendimento", "Aguardando resposta", "Reunião agendada", "Proposta enviada"]
    .reduce((acc, s) => acc + (contagem[s] ?? 0), 0);
  const taxa = total > 0 ? Math.round((convertidos / total) * 100) : 0;
  const recent = leads.slice(0, 6);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Visão geral dos leads de consultoria</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total de leads", value: total, icon: Users, iconBg: "bg-brand-blue/10", iconColor: "text-brand-blue" },
          { label: "Aguardando contato", value: novos, icon: Clock, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
          { label: "Em andamento", value: emAndamento, icon: TrendingUp, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
          { label: "Taxa de conversão", value: `${taxa}%`, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-500" },
        ].map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-xs text-gray-400 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads recentes */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-700">Leads recentes</h2>
            <Link href="/crm/leads" className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-orange-600 transition-colors">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {!recent.length ? (
              <p className="text-center text-gray-400 text-sm py-10">Nenhum lead ainda.</p>
            ) : (
              recent.map((lead) => (
                <Link key={lead.id} href={`/crm/leads/${lead.id}`} className="flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors group">
                  <Avt nome={lead.nome} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-brand-blue transition-colors">{lead.nome}</p>
                    <p className="text-xs text-gray-400 truncate">{lead.tipo_negocio}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-lg border ${statusStyles[lead.status] ?? "bg-gray-50 text-gray-500 border-gray-100"}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs text-gray-300">{fmt(lead.criado_em)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Breakdown por status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-700">Por status</h2>
          </div>
          <div className="p-4 space-y-2">
            {allStatuses.map((s) => {
              const count = contagem[s] ?? 0;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const style = statusStyles[s] ?? "bg-gray-50 text-gray-500 border-gray-100";
              return (
                <Link key={s} href={`/crm/leads?status=${encodeURIComponent(s)}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border flex-shrink-0 w-40 text-center ${style}`}>
                    {s}
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-orange rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-6 text-right flex-shrink-0">{count}</span>
                </Link>
              );
            })}
          </div>

          {/* WhatsApp contato rápido */}
          <div className="mx-4 mb-4 mt-2">
            <a
              href="https://wa.me/5511930238204"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-50 hover:bg-green-100 border border-green-100 text-green-700 text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
