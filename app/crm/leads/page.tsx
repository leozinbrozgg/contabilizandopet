export const dynamic = "force-dynamic";

import pool from "@/lib/db";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
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
    <div className={`w-9 h-9 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  );
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { status?: string; busca?: string };
}) {
  const { rows } = await pool.query<Lead>(
    `SELECT * FROM leads_consultoria
     WHERE ($1::text IS NULL OR status = $1)
       AND ($2::text IS NULL OR nome ILIKE '%' || $2 || '%' OR whatsapp ILIKE '%' || $2 || '%')
     ORDER BY criado_em DESC`,
    [searchParams.status || null, searchParams.busca || null]
  );

  const leads = rows;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-400 mt-0.5">{leads.length} lead{leads.length !== 1 ? "s" : ""} encontrado{leads.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <form className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            name="busca"
            defaultValue={searchParams.busca}
            placeholder="Buscar por nome ou WhatsApp..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white transition-colors"
          />
        </div>
        <select
          name="status"
          defaultValue={searchParams.status}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-orange bg-white transition-colors"
        >
          <option value="">Todos os status</option>
          {allStatuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button type="submit" className="bg-brand-blue hover:bg-brand-blue/90 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
          Filtrar
        </button>
        {(searchParams.status || searchParams.busca) && (
          <Link href="/crm/leads" className="text-gray-400 hover:text-gray-600 text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white transition-colors">
            Limpar
          </Link>
        )}
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {!leads.length ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </div>
            <p className="text-gray-500 font-medium text-sm">Nenhum lead encontrado</p>
            <p className="text-gray-400 text-xs mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Lead</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">Tipo de negócio</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Necessidade</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Cadastro</th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-5 py-4">
                      <Link href={`/crm/leads/${lead.id}`} className="flex items-center gap-3">
                        <Avt nome={lead.nome} />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-brand-blue transition-colors truncate max-w-[160px]">{lead.nome}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[160px]">{lead.whatsapp}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{lead.tipo_negocio}</td>
                    <td className="px-5 py-4 text-sm text-gray-500 max-w-[180px] truncate">{lead.principal_necessidade}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap ${statusStyles[lead.status] ?? "bg-gray-50 text-gray-500 border-gray-100"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">{fmt(lead.criado_em)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/crm/leads/${lead.id}`} className="text-xs font-semibold text-brand-blue hover:text-brand-orange transition-colors whitespace-nowrap">
                          Ver detalhes
                        </Link>
                        <a
                          href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors"
                          title="Abrir no WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
