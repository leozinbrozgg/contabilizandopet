import { Users, Star, Building2, Clock } from "lucide-react";

const numeros = [
  { icon: Users,     valor: "500+",  label: "Empresas atendidas" },
  { icon: Star,      valor: "98%",   label: "Clientes satisfeitos" },
  { icon: Building2, valor: "5+",    label: "Anos no mercado pet" },
  { icon: Clock,     valor: "24h",   label: "Tempo médio de resposta" },
];

export default function Numeros() {
  return (
    <section className="bg-brand-orange py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {numeros.map(({ icon: Icon, valor, label }) => (
            <div key={label} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-3xl font-bold text-white leading-none">{valor}</p>
                <p className="text-white/80 text-sm mt-1 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
