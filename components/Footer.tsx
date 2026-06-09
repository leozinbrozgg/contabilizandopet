import Image from "next/image";
import { ArrowRight, MapPin, Globe } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-brand-blue">

      {/* CTA Final */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Sua empresa pet merece uma contabilidade à altura
              </h2>
              <p className="text-white/50 text-lg">
                Deixe a burocracia com a gente e foque no que importa — crescer.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="#consultoria"
                className="flex items-center justify-between bg-brand-orange hover:bg-orange-600 text-white font-semibold px-7 py-5 rounded-2xl transition-colors group"
              >
                <div>
                  <p className="text-lg font-bold">Consultoria Gratuita</p>
                  <p className="text-white/70 text-sm font-normal">Preencha o formulário e retornamos em breve</p>
                </div>
                <ArrowRight className="w-6 h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/5511930238204?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+a+Contabilizando+Pet+Digital."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-5 rounded-2xl transition-colors group"
              >
                <div>
                  <p className="text-lg font-bold">Falar pelo WhatsApp</p>
                  <p className="text-white/50 text-sm font-normal">Resposta rápida com nossa equipe</p>
                </div>
                <WhatsAppIcon className="w-6 h-6 flex-shrink-0 text-green-400" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Footer info — 4 colunas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Coluna 1 — Logo + tagline */}
          <div>
            <div className="mb-5">
              <Image
                src="/imagens/logo.png"
                alt="Contabilizando Pet Digital"
                width={140}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Mais do que uma contabilidade. Somos inteligência financeira e tecnologia para o seu crescimento.
            </p>
          </div>

          {/* Coluna 2 — Serviços */}
          <div>
            <h3 className="font-bold text-white text-sm mb-5">Serviços</h3>
            <ul className="space-y-3">
              {[
                "Abertura de empresa",
                "Trocar de contador",
                "Contabilidade completa",
                "Migrar de MEI para ME",
                "Certificado digital",
                "Planejamento tributário",
              ].map((nome) => (
                <li key={nome}>
                  <a
                    href="#servicos"
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {nome}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Endereços */}
          <div>
            <h3 className="font-bold text-white text-sm mb-5">Endereço</h3>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Sorocaba – SP</p>
                <p className="text-white/50 mt-0.5">Rua Fernando Silva, 190 – Sala 802, Jardim Astro</p>
              </div>
            </div>
          </div>

          {/* Coluna 4 — Contato */}
          <div>
            <h3 className="font-bold text-white text-sm mb-5">Contato</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://contabilizandodigital.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  contabilizandodigital.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/contabilizandopetdigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @contabilizandopetdigital
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511930238204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0 text-green-400" />
                  (11) 93023-8204
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/20 text-xs">
            © 2025 Contabilizando Pet Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>

    </footer>
  );
}
