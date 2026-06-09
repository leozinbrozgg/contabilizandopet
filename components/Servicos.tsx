import { Building2, RefreshCw, BookOpen, ArrowUpCircle, KeySquare, TrendingUp, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WPP = "5511930238204";

const servicos = [
  {
    icon: Building2,
    titulo: "Abertura de empresa com planejamento estratégico",
    descricao:
      "Abra seu petshop, clínica veterinária, banho e tosa ou negócio pet com o enquadramento correto desde o início. Na Contabilizando Pet Digital, você define a melhor forma de tributação, escolhe a atividade ideal e tira todas as suas dúvidas com apoio especializado.",
    msg: "Olá! Quero abrir uma empresa pet com planejamento estratégico. Podem me ajudar com o enquadramento correto?",
  },
  {
    icon: RefreshCw,
    titulo: "Trocar de contador",
    descricao:
      "Trocar de contador é mais simples do que você imagina. Oferecemos suporte completo na transição, incluindo levantamento de pendências, garantindo uma migração tranquila para uma contabilidade moderna, digital e especializada no mercado pet.",
    msg: "Olá! Quero trocar de contador e migrar para a Contabilizando Pet Digital. Como funciona o processo de transição?",
  },
  {
    icon: BookOpen,
    titulo: "Contabilidade completa",
    descricao:
      "Cuidamos das obrigações contábeis, fiscais e trabalhistas da sua empresa para que ela se mantenha regularizada e segura. Gestão completa para que você foque no crescimento sustentável do seu negócio pet.",
    msg: "Olá! Tenho interesse na contabilidade completa para minha empresa pet. Podem me apresentar os serviços?",
  },
  {
    icon: ArrowUpCircle,
    titulo: "Migrar de MEI para ME",
    descricao:
      "Se seu negócio pet cresceu e está próximo de ultrapassar o limite do MEI, cuidamos de todo o processo de migração junto à Receita Federal, Junta Comercial e Prefeitura, do início ao fim, com planejamento e segurança.",
    msg: "Olá! Preciso migrar meu negócio pet do MEI para ME. Podem me ajudar com esse processo?",
  },
  {
    icon: KeySquare,
    titulo: "Certificado digital",
    descricao:
      "Soluções completas em certificados digitais para todos os tipos de negócios pet. Emitimos com agilidade, garantindo segurança nas transações, autenticidade dos documentos e conformidade fiscal da empresa.",
    msg: "Olá! Preciso de um certificado digital para minha empresa pet. Como funciona o processo com a Contabilizando Pet Digital?",
  },
  {
    icon: TrendingUp,
    titulo: "Planejamento tributário",
    descricao:
      "Analisamos sua empresa para identificar o melhor enquadramento tributário e buscar economia de impostos dentro da lei. Estratégias contínuas para você pagar menos e aumentar a lucratividade do seu negócio pet.",
    msg: "Olá! Quero fazer um planejamento tributário para reduzir os impostos da minha empresa pet. Como posso começar?",
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
          {servicos.map(({ icon: Icon, titulo, descricao, msg }) => (
            <a
              key={titulo}
              href={`https://wa.me/${WPP}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-orange/30 hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="w-12 h-12 bg-brand-blue/5 group-hover:bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4 transition-colors flex-shrink-0">
                <Icon className="w-6 h-6 text-brand-blue group-hover:text-brand-orange transition-colors" />
              </div>
              <h3 className="text-brand-blue font-semibold text-lg mb-3 leading-tight">
                {titulo}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{descricao}</p>
              <div className="flex items-center gap-1.5 mt-5 text-xs font-semibold text-green-600 group-hover:text-green-500 transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                Falar pelo WhatsApp
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
