"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Home, Briefcase, Store, CreditCard } from "lucide-react";

const links = [
  { label: "Início",    href: "#inicio",    icon: Home },
  { label: "Serviços",  href: "#servicos",  icon: Briefcase },
  { label: "Segmentos", href: "#segmentos", icon: Store },
  { label: "Planos",    href: "#planos",    icon: CreditCard },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#inicio" className="flex items-center flex-shrink-0">
            <Image
              src="/imagens/logo.png"
              alt="Contabilizando Pet Digital"
              width={130}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium px-3 py-2 rounded-lg transition-all"
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                {label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#consultoria"
              className="bg-brand-orange hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              Consultoria Grátis
            </a>
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden bg-brand-blue border-t border-white/10 px-4 pb-5">
          <nav className="flex flex-col gap-1 pt-3">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium py-2.5 px-3 rounded-lg transition-all"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium py-2.5 px-3 rounded-lg transition-all mt-1"
            >
              Entrar no CRM
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
