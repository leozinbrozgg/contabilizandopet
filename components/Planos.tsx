"use client";

import { useState } from "react";
import {
  Check, Users2, Monitor, Zap, ShieldCheck,
  CreditCard, BarChart2, FolderOpen, MessageSquare,
  TrendingDown, Building2,
} from "lucide-react";

const beneficiosGerais = [
  { icon: Users2,        label: "Especialistas no mercado pet" },
  { icon: Monitor,       label: "Plataforma digital completa" },
  { icon: Zap,           label: "Empresa pronta para faturar" },
  { icon: ShieldCheck,   label: "Certificado digital incluso" },
  { icon: CreditCard,    label: "Conta PJ digital em até 24h" },
  { icon: BarChart2,     label: "Relatórios contábeis" },
  { icon: FolderOpen,    label: "Gestão de documentos" },
  { icon: MessageSquare, label: "Atendimento multicanal" },
  { icon: TrendingDown,  label: "Planejamento tributário" },
  { icon: Building2,     label: "Abertura com planejamento" },
];

const WPP = "5511930238204";

type TabKey = "servico" | "comercio";

const planos = [
  {
    nome: "START",
    precos: { servico: "257", comercio: "497" },
    destaque: false,
    badge: null,
    itens: [
      "Até 5 notas fiscais/mês",
      "Pró-labore até 2 sócios",
      "Faturamento até R$ 250 mil/ano",
      "Folha de pagamento à parte",
    ],
    cta: "Quero o plano Start",
    msgs: {
      servico: "Olá! Tenho interesse no Plano START Serviços (R$ 257/mês) da Contabilizando Pet Digital. Podem me ajudar?",
      comercio: "Olá! Tenho interesse no Plano START Comércio (R$ 497/mês) da Contabilizando Pet Digital. Podem me ajudar?",
    },
  },
  {
    nome: "SMART",
    precos: { servico: "387", comercio: "847" },
    destaque: true,
    badge: "Mais escolhido",
    itens: [
      "Tudo do Plano Start",
      "Até 10 notas fiscais/mês",
      "Pró-labore até 3 sócios",
      "Relatórios trimestrais",
      "Entrega de CNDs",
      "Faturamento até R$ 720 mil/ano",
      "Folha de pagamento à parte",
    ],
    cta: "Quero o plano Smart",
    msgs: {
      servico: "Olá! Tenho interesse no Plano SMART Serviços (R$ 387/mês) da Contabilizando Pet Digital. Podem me ajudar?",
      comercio: "Olá! Tenho interesse no Plano SMART Comércio (R$ 847/mês) da Contabilizando Pet Digital. Podem me ajudar?",
    },
  },
  {
    nome: "PERFORMANCE",
    precos: { servico: "697", comercio: "1.497" },
    destaque: false,
    badge: null,
    itens: [
      "Tudo do Plano Smart",
      "Até 20 notas fiscais/mês",
      "Pró-labore até 4 sócios",
      "Relatórios mensais",
      "Pesquisa de situação fiscal",
      "Folha até 5 funcionários",
      "Faturamento até R$ 1,8 mi/ano",
    ],
    cta: "Quero o plano Performance",
    msgs: {
      servico: "Olá! Tenho interesse no Plano PERFORMANCE Serviços (R$ 697/mês) da Contabilizando Pet Digital. Podem me ajudar?",
      comercio: "Olá! Tenho interesse no Plano PERFORMANCE Comércio (R$ 1.497/mês) da Contabilizando Pet Digital. Podem me ajudar?",
    },
  },
];

export default function Planos() {
  const [tab, setTab] = useState<TabKey>("servico");

  return (
    <section id="planos" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Planos & Preços
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-4">
            Escolha o plano ideal para sua empresa
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Todos os planos incluem abertura de empresa e acesso total à plataforma digital.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 gap-1">
            {(["servico", "comercio"] as TabKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? "bg-brand-blue text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "servico" ? "Serviços" : "Comércio"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-14">
          {planos.map((plano) => {
            const preco = plano.precos[tab];
            const msg = plano.msgs[tab];
            const href = `https://wa.me/${WPP}?text=${encodeURIComponent(msg)}`;
            return (
              <div
                key={plano.nome}
                className={`relative rounded-2xl border-2 flex flex-col bg-white transition-all duration-200 ${
                  plano.destaque
                    ? "border-brand-orange shadow-2xl shadow-brand-orange/10 md:-translate-y-2"
                    : "border-gray-100 shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Badge */}
                {plano.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap shadow-md">
                      {plano.badge}
                    </span>
                  </div>
                )}

                {/* Preço */}
                <div className="p-7 pb-6 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {plano.nome}
                  </p>
                  <div className="flex items-end gap-1.5">
                    <span className="text-gray-400 text-base font-medium mb-1">R$</span>
                    <span className="text-5xl font-bold text-brand-blue leading-none">
                      {preco}
                    </span>
                    <span className="text-gray-400 text-sm mb-1.5">/mês</span>
                  </div>
                </div>

                {/* Itens */}
                <ul className="px-7 py-6 space-y-3.5 flex-1">
                  {plano.itens.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-brand-orange" strokeWidth={2.5} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Botão */}
                <div className="px-7 pb-7">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-full font-semibold py-3.5 rounded-xl transition-colors ${
                      plano.destaque
                        ? "bg-brand-orange hover:bg-orange-600 text-white shadow-lg shadow-brand-orange/30"
                        : "bg-brand-blue/5 hover:bg-brand-blue hover:text-white text-brand-blue border border-brand-blue/10"
                    }`}
                  >
                    {plano.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefícios */}
        <div>
          <p className="text-center text-brand-blue font-bold text-base mb-6">
            Incluso em todos os planos
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {beneficiosGerais.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <div className="w-8 h-8 bg-brand-blue/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-blue" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold text-gray-600 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
