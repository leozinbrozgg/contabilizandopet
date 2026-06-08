"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/crm", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/crm/leads", icon: Users, label: "Leads" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-brand-blue flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="inline-block mb-3">
          <Image
            src="/imagens/logo.png"
            alt="Contabilizando Pet Digital"
            width={120}
            height={38}
            className="h-8 w-auto object-contain"
          />
        </div>
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest">
          CRM Interno
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/crm" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors w-full"
        >
          <LogOut size={18} strokeWidth={1.5} />
          Sair
        </button>
      </div>

    </aside>
  );
}
