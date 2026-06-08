import {
  Zap, Smartphone, FileText, Calculator,
  BarChart2, ShieldCheck, Users2, HeartHandshake,
  TrendingDown, CreditCard,
} from "lucide-react";

const diferenciais = [
  { icon: Zap,            title: "Rapidez no atendimento" },
  { icon: Smartphone,     title: "Aplicativo de gestão empresarial" },
  { icon: FileText,       title: "Emissão de notas fiscais" },
  { icon: Calculator,     title: "Orientação sobre impostos" },
  { icon: BarChart2,      title: "Análise mensal do faturamento" },
  { icon: ShieldCheck,    title: "Supervisão de certidões" },
  { icon: Users2,         title: "Análise do pró-labore dos sócios" },
  { icon: HeartHandshake, title: "Suporte especializado pet" },
  { icon: TrendingDown,   title: "Otimização tributária" },
  { icon: CreditCard,     title: "Conta PJ digital" },
];

export default function Diferenciais() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Vantagens exclusivas
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Tudo que você precisa para ter controle total do seu negócio pet com agilidade digital.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {diferenciais.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-brand-orange hover:shadow-lg transition-all duration-200 bg-white"
            >
              <div className="w-14 h-14 bg-brand-blue group-hover:bg-brand-orange rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200 shadow-sm">
                <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-blue leading-snug transition-colors">
                {title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
