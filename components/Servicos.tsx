import { Building2, RefreshCw, BookOpen, ArrowUpCircle, KeySquare, TrendingUp } from "lucide-react";

const servicos = [
  {
    icon: Building2,
    titulo: "Abertura de empresa com planejamento estratégico",
    descricao:
      "Abra seu petshop, clínica veterinária, banho e tosa ou negócio pet com o enquadramento correto desde o início. Na Contabilizando Pet Digital, você define a melhor forma de tributação, escolhe a atividade ideal e tira todas as suas dúvidas com apoio especializado.",
  },
  {
    icon: RefreshCw,
    titulo: "Trocar de contador",
    descricao:
      "Trocar de contador é mais simples do que você imagina. Oferecemos suporte completo na transição, incluindo levantamento de pendências, garantindo uma migração tranquila para uma contabilidade moderna, digital e especializada no mercado pet.",
  },
  {
    icon: BookOpen,
    titulo: "Contabilidade completa",
    descricao:
      "Cuidamos das obrigações contábeis, fiscais e trabalhistas da sua empresa para que ela se mantenha regularizada e segura. Gestão completa para que você foque no crescimento sustentável do seu negócio pet.",
  },
  {
    icon: ArrowUpCircle,
    titulo: "Migrar de MEI para ME",
    descricao:
      "Se seu negócio pet cresceu e está próximo de ultrapassar o limite do MEI, cuidamos de todo o processo de migração junto à Receita Federal, Junta Comercial e Prefeitura, do início ao fim, com planejamento e segurança.",
  },
  {
    icon: KeySquare,
    titulo: "Certificado digital",
    descricao:
      "Soluções completas em certificados digitais para todos os tipos de negócios pet. Emitimos com agilidade, garantindo segurança nas transações, autenticidade dos documentos e conformidade fiscal da empresa.",
  },
  {
    icon: TrendingUp,
    titulo: "Planejamento tributário",
    descricao:
      "Analisamos sua empresa para identificar o melhor enquadramento tributário e buscar economia de impostos dentro da lei. Estratégias contínuas para você pagar menos e aumentar a lucratividade do seu negócio pet.",
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            O que fazemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-4">
            Soluções contábeis para o seu negócio pet
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Da abertura da empresa ao planejamento tributário, cuidamos da parte
            contábil para você focar no crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map(({ icon: Icon, titulo, descricao }) => (
            <div
              key={titulo}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-orange/30 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-brand-blue/5 group-hover:bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-6 h-6 text-brand-blue group-hover:text-brand-orange transition-colors" />
              </div>
              <h3 className="text-brand-blue font-semibold text-lg mb-3 leading-tight">
                {titulo}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
