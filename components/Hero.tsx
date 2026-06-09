import Image from "next/image";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen flex items-center overflow-hidden">

      {/* Imagem de fundo */}
      <Image
        src="/imagens/banner2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
        style={{ objectPosition: "center top" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-blue/75" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Contabilidade Digital para{" "}
            <span className="text-brand-orange">Negócios Pet</span>
          </h1>

          <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Contabilidade especializada para petshops, clínicas veterinárias,
            banho e tosa e empresas do setor pet que querem praticidade,
            controle, conformidade fiscal e atendimento humanizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#consultoria"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg shadow-brand-orange/30"
            >
              Solicitar Consultoria Gratuita
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5511930238204?text=Ol%C3%A1%21+Gostaria+de+falar+com+um+especialista+da+Contabilizando+Pet+Digital."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Falar com Especialista
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
