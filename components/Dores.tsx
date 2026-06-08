import { AlertCircle, ArrowRight } from "lucide-react";

const dores = [
  "Você não sabe se está pagando imposto demais?",
  "Seu contador não entende a rotina do mercado pet?",
  "Sua empresa cresceu, mas a contabilidade ficou desorganizada?",
  "Você tem dificuldade para controlar faturamento, notas e documentos?",
  "Está pensando em sair do MEI?",
  "Quer abrir uma empresa pet com segurança?",
  "Precisa trocar de contador?",
  "Tem dúvidas sobre emissão de nota fiscal?",
  "Quer crescer sem correr riscos fiscais?",
];

export default function Dores() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl mb-14">
          <span className="inline-block bg-red-50 text-red-500 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Reconhece algum desses?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue leading-tight">
            Seu negócio pet enfrenta algum desses problemas?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
          {dores.map((dor) => (
            <div
              key={dor}
              className="flex items-start gap-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all"
            >
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-red-400" strokeWidth={2} />
              </div>
              <p className="text-gray-700 text-sm font-medium leading-snug pt-1">{dor}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-blue rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white text-lg font-medium max-w-xl">
            Se você se identificou com algum desses pontos, a{" "}
            <span className="text-brand-orange font-bold">Consultoria Grátis</span>{" "}
            pode indicar o melhor caminho para sua empresa.
          </p>
          <a
            href="#consultoria"
            className="flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold px-7 py-4 rounded-xl transition-colors whitespace-nowrap flex-shrink-0"
          >
            Quero uma Consultoria Grátis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
