import { Search, FileSignature, BadgeCheck, Rocket } from "lucide-react";

const etapas = [
  {
    icon: Search,
    numero: "01",
    titulo: "Diagnóstico inicial",
    descricao: "Entendemos sua empresa, situação atual, faturamento e principais dificuldades.",
    itens: ["Definição do modelo de negócio", "Consultoria inicial gratuita", "Análise da situação atual"],
  },
  {
    icon: FileSignature,
    numero: "02",
    titulo: "Documentação e Planejamento",
    descricao: "Planejamos o melhor caminho: abertura, regularização, migração ou troca de contador.",
    itens: ["Criação e análise de documentos", "Assinatura digital", "Envio para Junta Comercial"],
  },
  {
    icon: BadgeCheck,
    numero: "03",
    titulo: "Aprovação",
    descricao: "Empresa aprovada com CNPJ ativo e documentação organizada.",
    itens: ["Empresa aprovada", "CNPJ ativo", "Documentação organizada"],
  },
  {
    icon: Rocket,
    numero: "04",
    titulo: "Empresa Pronta!",
    descricao: "Gestão contábil digital contínua com todas as ferramentas para operar.",
    itens: ["Conta digital", "Certificado digital", "Emissão de NF e boletos"],
  },
];

export default function Jornada() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Passo a passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-4">
            Como funciona nossa consultoria contábil
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Do sonho à realização: 4 etapas estratégicas para o seu sucesso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {etapas.map(({ icon: Icon, numero, titulo, descricao, itens }, i) => (
            <div key={numero} className="relative">
              {/* Connector line */}
              {i < etapas.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-gray-200 to-transparent z-0 -translate-y-1/2" style={{ width: "calc(100% - 2.5rem)", left: "calc(100% - 0.5rem)" }} />
              )}

              <div className="relative z-10 bg-white border border-gray-100 hover:border-brand-orange/30 hover:shadow-xl rounded-2xl p-6 transition-all duration-200 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-3xl font-bold text-gray-100">{numero}</span>
                </div>

                <h3 className="text-brand-blue font-bold text-base mb-2">{titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{descricao}</p>

                <ul className="space-y-1.5">
                  {itens.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
