"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Clock, ArrowRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Lead, HistoricoLead } from "@/types";

const statusOptions = [
  "Novo", "Em atendimento", "Aguardando resposta",
  "Reunião agendada", "Proposta enviada", "Convertido", "Perdido",
];

const statusStyles: Record<string, string> = {
  "Novo": "bg-blue-50 text-blue-700 border-blue-100",
  "Em atendimento": "bg-amber-50 text-amber-700 border-amber-100",
  "Aguardando resposta": "bg-orange-50 text-orange-700 border-orange-100",
  "Reunião agendada": "bg-violet-50 text-violet-700 border-violet-100",
  "Proposta enviada": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Convertido": "bg-green-50 text-green-700 border-green-100",
  "Perdido": "bg-gray-100 text-gray-500 border-gray-200",
};

function fmt(d: string) {
  return new Date(d).toLocaleString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtShort(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function Avt({ nome }: { nome: string }) {
  const initials = nome.trim().split(/\s+/).slice(0, 2).map(n => n[0]?.toUpperCase() ?? "").join("");
  const palette = ["bg-blue-500", "bg-violet-500", "bg-teal-500", "bg-rose-500", "bg-amber-500", "bg-indigo-500"];
  const color = palette[nome.charCodeAt(0) % palette.length];
  return (
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-sm font-bold">{initials}</span>
    </div>
  );
}

const campos = (lead: Lead) => [
  { label: "WhatsApp", valor: lead.whatsapp },
  { label: "Tipo de negócio", valor: lead.tipo_negocio },
  { label: "Situação da empresa", valor: lead.situacao_empresa },
  { label: "Faturamento mensal", valor: lead.faturamento_mensal },
  { label: "Emite nota fiscal", valor: lead.emite_nota },
  { label: "Principal necessidade", valor: lead.principal_necessidade },
  { label: "Mensagem", valor: lead.mensagem || "—" },
  { label: "Origem", valor: lead.origem },
  { label: "Cadastrado em", valor: fmt(lead.criado_em) },
];

export default function LeadDetalhes({
  lead,
  historico,
}: {
  lead: Lead;
  historico: HistoricoLead[];
}) {
  const [status, setStatus] = useState(lead.status);
  const [observacao, setObservacao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [msgOk, setMsgOk] = useState(false);
  const [historicoLocal, setHistoricoLocal] = useState(historico);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const router = useRouter();

  async function salvarStatus(novoStatus: string) {
    if (novoStatus === status) return;
    setSalvando(true);
    const statusAnterior = status;

    const res = await fetch(`/api/crm/leads/${lead.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_novo: novoStatus, status_anterior: statusAnterior }),
    });

    if (res.ok) {
      const row: HistoricoLead = await res.json();
      setStatus(novoStatus as Lead["status"]);
      setHistoricoLocal([row, ...historicoLocal]);
      router.refresh();
    }
    setSalvando(false);
  }

  async function salvarObservacao() {
    if (!observacao.trim()) return;
    setSalvando(true);

    const res = await fetch(`/api/crm/leads/${lead.id}/observacao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observacao: observacao.trim() }),
    });

    if (res.ok) {
      const row: HistoricoLead = await res.json();
      setHistoricoLocal([row, ...historicoLocal]);
      setObservacao("");
      setMsgOk(true);
      setTimeout(() => setMsgOk(false), 2000);
    }
    setSalvando(false);
  }

  async function excluirLead() {
    setExcluindo(true);
    const res = await fetch(`/api/crm/leads/${lead.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/crm/leads");
    } else {
      setExcluindo(false);
      setConfirmarExclusao(false);
    }
  }

  return (
    <>
      <div className="p-6 lg:p-8 max-w-5xl">
        <Link href="/crm/leads" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Leads
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avt nome={lead.nome} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lead.nome}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${statusStyles[status] ?? "bg-gray-50 text-gray-500 border-gray-100"}`}>
                    {status}
                  </span>
                  <span className="text-xs text-gray-400">{lead.tipo_negocio}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Abrir no WhatsApp
              </a>
              <button
                onClick={() => setConfirmarExclusao(true)}
                className="inline-flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50">
                <h2 className="text-sm font-bold text-gray-700">Informações do lead</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {campos(lead).map(({ label, valor }) => (
                  <div key={label} className="flex items-start px-6 py-3.5 gap-4">
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-36 flex-shrink-0 pt-0.5">{label}</dt>
                    <dd className="text-sm text-gray-700 flex-1">{valor}</dd>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-700 mb-4">Adicionar observação</h2>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows={3}
                placeholder="Digite uma observação interna sobre este lead..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors resize-none mb-3"
              />
              <div className="flex items-center justify-between">
                {msgOk && <p className="text-green-600 text-xs font-semibold">Observação salva!</p>}
                <div className="ml-auto">
                  <button
                    onClick={salvarObservacao}
                    disabled={salvando || !observacao.trim()}
                    className="bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-40 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
                  >
                    {salvando ? "Salvando..." : "Salvar nota"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-4">Alterar status</h2>
              <div className="space-y-2">
                {statusOptions.map((s) => {
                  const isActive = s === status;
                  const style = statusStyles[s] ?? "bg-gray-50 text-gray-500 border-gray-100";
                  return (
                    <button
                      key={s}
                      onClick={() => salvarStatus(s)}
                      disabled={salvando || isActive}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        isActive
                          ? `${style} ring-2 ring-offset-1 ring-brand-orange/30`
                          : "bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {s}
                      {isActive && <ArrowRight className="w-3 h-3 opacity-50" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-bold text-gray-700 mb-4">Histórico</h2>
              {!historicoLocal.length ? (
                <div className="text-center py-6">
                  <Clock className="w-5 h-5 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-xs text-gray-400">Nenhuma atividade ainda</p>
                </div>
              ) : (
                <ol className="relative border-l border-gray-100 space-y-4 ml-2">
                  {historicoLocal.map((h) => (
                    <li key={h.id} className="ml-4">
                      <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-brand-orange/30 border-2 border-brand-orange" />
                      <p className="text-xs text-gray-400 mb-1">{fmtShort(h.criado_em)}</p>
                      {h.observacao && (
                        <p className="text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-2">{h.observacao}</p>
                      )}
                      {h.status_novo && (
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold text-gray-600">{h.status_anterior}</span>
                          {" → "}
                          <span className="font-semibold text-brand-blue">{h.status_novo}</span>
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {confirmarExclusao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="w-11 h-11 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-base font-bold text-gray-900 text-center mb-1">Excluir lead?</h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              <span className="font-semibold text-gray-600">{lead.nome}</span> e todo o histórico serão
              removidos permanentemente. Essa ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmarExclusao(false)}
                disabled={excluindo}
                className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                Cancelar
              </button>
              <button
                onClick={excluirLead}
                disabled={excluindo}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {excluindo ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
