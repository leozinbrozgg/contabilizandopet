"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const beneficios = [
  "Visualize e gerencie todos os leads",
  "Atualize status e adicione observações",
  "Histórico completo de cada cliente",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    if (error) {
      setErro("E-mail ou senha incorretos.");
    } else {
      router.push("/crm");
    }
    setLoading(false);
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange bg-white transition-colors";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* Painel esquerdo */}
        <div className="bg-brand-blue flex flex-col justify-between p-10">
          <div className="inline-block self-start">
            <Image
              src="/imagens/logo.png"
              alt="Contabilizando Pet Digital"
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
            />
          </div>

          <div className="py-10">
            <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Acesso Interno
            </span>
            <h1 className="text-3xl font-bold text-white leading-tight mb-4">
              CRM Contabilizando<br />
              <span className="text-brand-orange">Pet Digital</span>
            </h1>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Gerencie seus leads e acompanhe cada cliente em tempo real.
            </p>
            <ul className="space-y-3">
              {beneficios.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0" strokeWidth={2} />
                  <span className="text-white/80 text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white/20 text-xs">© 2025 Contabilizando Pet Digital</p>
        </div>

        {/* Painel direito */}
        <div className="bg-white flex flex-col justify-center px-10 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-blue">Entrar no CRM</h2>
            <p className="text-gray-400 text-sm mt-1">Use suas credenciais de acesso</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-brand-orange/30"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
