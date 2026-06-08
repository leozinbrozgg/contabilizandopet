import { GraduationCap, Landmark, MapPin } from "lucide-react";

const parceiros = [
  {
    icon: GraduationCap,
    cor: "bg-blue-500",
    nome: "SEBRAE",
    descricao: "Transforme sua ideia em realidade com apoio especializado e educação empreendedora de ponta.",
    beneficio: "20% de desconto nos cursos da Faculdade Sebrae. Parcelado +5% e à vista +10%.",
  },
  {
    icon: Landmark,
    cor: "bg-emerald-500",
    nome: "CORA",
    descricao: "Banco digital PJ completo, focado em simplificar a gestão financeira do seu negócio.",
    beneficio: "Conta digital PJ sem taxas. Abra gratuitamente com integração à plataforma digital.",
  },
  {
    icon: MapPin,
    cor: "bg-violet-500",
    nome: "COMPANY HERO",
    descricao: "Soluções de endereço fiscal e escritórios virtuais para empresas modernas.",
    beneficio: "Descontos exclusivos para escritórios virtuais. Endereço privilegiado para sua empresa.",
  },
];

export default function Parceiros() {
  return (
    <section className="py-20 sm:py-24 bg-brand-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Ecossistema de parcerias
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Parceiros Estratégicos
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Conectamos nossos clientes a parceiros que facilitam o dia a dia e aceleram o crescimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {parceiros.map(({ icon: Icon, cor, nome, descricao, beneficio }) => (
            <div
              key={nome}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:bg-white/10 transition-all duration-200"
            >
              <div className={`${cor} px-6 py-5 flex items-center gap-4`}>
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg">{nome}</h3>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-white/60 text-sm leading-relaxed mb-5 flex-1">{descricao}</p>

                <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4">
                  <span className="text-brand-orange text-xs font-bold uppercase tracking-wider block mb-1.5">
                    Benefício exclusivo
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed">{beneficio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
