import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
                  <p className="text-lg font-bold">Consultoria Grátis</p>
                  <p className="text-white/70 text-sm font-normal">Preencha o formulário e retornamos em breve</p>
                </div>
                <ArrowRight className="w-6 h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/5511930238204"
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

      {/* Footer info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Logo */}
          <div>
            <div className="inline-block mb-4">
              <Image
                src="/imagens/logo.png"
                alt="Contabilizando Pet Digital"
                width={140}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Contabilidade especializada no mercado pet.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-white/30 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Serviços", href: "#servicos" },
                { label: "Planos", href: "#planos" },
                { label: "Consultoria Grátis", href: "#consultoria" },
                { label: "CRM", href: "/login" },
              ].map((l) => (
                <li key={l.href}>
                  {"href" in l && l.href.startsWith("/") ? (
                    <Link href={l.href} className="text-white/40 hover:text-white text-sm transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-white/40 hover:text-white text-sm transition-colors">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-white/30 mb-4">
              Contato
            </h3>
            <a
              href="https://wa.me/5511930238204"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
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
