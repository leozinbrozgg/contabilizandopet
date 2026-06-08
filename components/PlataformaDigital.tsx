import Image from "next/image";
import { FileText, Send, MessageSquare, BookOpen, Clock, Smartphone } from "lucide-react";

const beneficios = [
  { icon: FileText,      label: "Acesso a documentos" },
  { icon: Send,          label: "Solicitações online" },
  { icon: MessageSquare, label: "Atendimento digital" },
  { icon: BookOpen,      label: "Organização contábil" },
  { icon: Clock,         label: "Mais praticidade no dia a dia" },
  { icon: Smartphone,    label: "Controle na palma da mão" },
];

export default function PlataformaDigital() {
  return (
    <section className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Imagem — aparece primeiro no mobile */}
          <div className="flex justify-center order-first lg:order-none">
            <div className="relative w-72 sm:w-80 lg:w-full lg:max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-orange/20 to-brand-blue/10 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/imagens/app.png"
                  alt="Plataforma digital Contabilizando Pet Digital"
                  width={480}
                  height={820}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Texto e benefícios */}
          <div>
            <span className="inline-block bg-brand-orange/10 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              Tecnologia Móvel
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mb-5 leading-tight">
              Controle sua empresa pet de forma digital
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              A Contabilizando Pet Digital oferece uma plataforma exclusiva onde
              o empreendedor do setor pet tem o controle da empresa na palma da
              mão, tornando a contabilidade mais fácil, mais rápida e mais eficiente.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {beneficios.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{label}</span>
                </li>
              ))}
            </ul>

            <a
              href="#consultoria"
              className="inline-flex bg-brand-orange hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Quero conhecer a plataforma
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
