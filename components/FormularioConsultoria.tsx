"use client";

import { useState } from "react";
import {
  CheckCircle2, User, Phone, Store, Building2,
  DollarSign, FileText, Target, MessageSquare,
} from "lucide-react";

const initialState = {
  nome: "",
  whatsapp: "",
  tipo_negocio: "",
  tipo_negocio_outro: "",
  situacao_empresa: "",
  faturamento_mensal: "",
  emite_nota: "",
  qtd_nfs_mes: "",
  principal_necessidade: "",
  mensagem: "",
};

const beneficiosConsultoria = [
  "Análise da sua situação fiscal",
  "Economia tributária dentro da lei",
  "Sem compromisso — 100% gratuito",
];

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10)
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export default function FormularioConsultoria() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "whatsapp" ? maskPhone(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao enviar formulário.");
      }
      setSucesso(true);
      setForm(initialState);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white transition-colors";
  const selectClass =
    "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white transition-colors appearance-none";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

  function Field({
    label, icon: Icon, children,
  }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
    return (
      <div>
        <label className={labelClass}>{label}</label>
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          {children}
        </div>
      </div>
    );
  }

  return (
    <section id="consultoria" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

          {/* Painel esquerdo — info */}
          <div className="bg-brand-blue px-8 py-14 sm:px-12 flex flex-col justify-center">
            <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 self-start">
              Consultoria Gratuita
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
              Consultoria Gratuita para o seu Negócio Pet
            </h2>

            <p className="text-white/60 text-base leading-relaxed mb-10">
              Preencha o formulário e nossa equipe entra em contato pelo WhatsApp.
            </p>

            <ul className="space-y-4 mb-10">
              {beneficiosConsultoria.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span className="text-white/80 text-sm">{b}</span>
                </li>
              ))}
            </ul>

          </div>

          {/* Painel direito — formulário */}
          <div className="bg-gray-50 px-8 py-14 sm:px-12 flex flex-col justify-center">
            {sucesso ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-2">
                  Solicitação enviada!
                </h3>
                <p className="text-gray-500 text-sm">
                  Nossa equipe vai analisar suas informações e entrar em contato pelo WhatsApp em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nome *" icon={User}>
                    <input type="text" name="nome" value={form.nome} onChange={handleChange}
                      required placeholder="Seu nome completo" className={inputClass} />
                  </Field>
                  <Field label="WhatsApp *" icon={Phone}>
                    <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange}
                      required placeholder="(11) 99999-9999" className={inputClass} />
                  </Field>
                </div>

                <Field label="Tipo de negócio pet *" icon={Store}>
                  <select name="tipo_negocio" value={form.tipo_negocio} onChange={handleChange} required className={selectClass}>
                    <option value="">Selecione seu tipo de negócio...</option>
                    <option>Petshop</option>
                    <option>Banho e tosa</option>
                    <option>Clínica veterinária</option>
                    <option>Hospital veterinário</option>
                    <option>Casa de ração</option>
                    <option>Hotel/creche pet</option>
                    <option>Loja de produtos pet</option>
                    <option>Distribuidor pet</option>
                    <option>Outro</option>
                  </select>
                </Field>

                {form.tipo_negocio === "Outro" && (
                  <Field label="Qual tipo de negócio?" icon={Store}>
                    <input type="text" name="tipo_negocio_outro" value={form.tipo_negocio_outro}
                      onChange={handleChange} placeholder="Descreva seu tipo de negócio"
                      className={inputClass} />
                  </Field>
                )}

                <Field label="Situação atual *" icon={Building2}>
                  <select name="situacao_empresa" value={form.situacao_empresa} onChange={handleChange} required className={selectClass}>
                    <option value="">Qual é sua situação hoje?</option>
                    <option>Quero abrir uma empresa</option>
                    <option>Sou MEI</option>
                    <option>Já tenho empresa aberta</option>
                    <option>Quero trocar de contador</option>
                    <option>Estou com dúvidas fiscais</option>
                  </select>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Faturamento mensal *" icon={DollarSign}>
                    <select name="faturamento_mensal" value={form.faturamento_mensal} onChange={handleChange} required className={selectClass}>
                      <option value="">Faturamento estimado...</option>
                      <option>Até R$ 10 mil</option>
                      <option>De R$ 10 mil a R$ 30 mil</option>
                      <option>De R$ 30 mil a R$ 60 mil</option>
                      <option>Acima de R$ 60 mil</option>
                      <option>Prefiro não informar</option>
                    </select>
                  </Field>
                  <Field label="Emite nota fiscal? *" icon={FileText}>
                    <select name="emite_nota" value={form.emite_nota} onChange={handleChange} required className={selectClass}>
                      <option value="">Emite nota fiscal?</option>
                      <option>Sim</option>
                      <option>Não</option>
                      <option>Às vezes</option>
                      <option>Tenho dúvidas sobre isso</option>
                    </select>
                  </Field>
                </div>

                <Field label="Quantas NFs emite por mês?" icon={FileText}>
                  <select name="qtd_nfs_mes" value={form.qtd_nfs_mes} onChange={handleChange} className={selectClass}>
                    <option value="">Selecione a quantidade...</option>
                    <option>Não emito</option>
                    <option>1 a 5</option>
                    <option>6 a 10</option>
                    <option>11 a 20</option>
                    <option>Mais de 20</option>
                  </select>
                </Field>

                <Field label="Principal necessidade *" icon={Target}>
                  <select name="principal_necessidade" value={form.principal_necessidade} onChange={handleChange} required className={selectClass}>
                    <option value="">O que você mais precisa agora?</option>
                    <option>Reduzir impostos</option>
                    <option>Regularizar empresa</option>
                    <option>Sair do MEI</option>
                    <option>Abrir empresa</option>
                    <option>Trocar de contador</option>
                    <option>Organizar financeiro/contábil</option>
                    <option>Entender se estou pagando imposto demais</option>
                  </select>
                </Field>

                <div>
                  <label className={labelClass}>Mensagem adicional</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    <textarea name="mensagem" value={form.mensagem} onChange={handleChange}
                      rows={3} placeholder="Descreva sua situação ou deixe uma dúvida (opcional)"
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white transition-colors" />
                  </div>
                </div>

                {erro && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                    {erro}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-base shadow-lg shadow-brand-orange/30">
                  {loading ? "Enviando..." : "Solicitar Consultoria Gratuita"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
