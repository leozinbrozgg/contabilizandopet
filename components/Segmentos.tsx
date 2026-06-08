import {
  ShoppingBag,
  Scissors,
  Stethoscope,
  Building2,
  Package,
  Home,
  ShoppingCart,
  Truck,
} from "lucide-react";

const segmentos = [
  { icon: ShoppingBag,  label: "Petshops" },
  { icon: Scissors,     label: "Banho e tosa" },
  { icon: Stethoscope,  label: "Clínicas veterinárias" },
  { icon: Building2,    label: "Hospitais veterinários" },
  { icon: Package,      label: "Casas de ração" },
  { icon: Home,         label: "Hotéis e creches pet" },
  { icon: ShoppingCart, label: "Lojas de produtos pet" },
  { icon: Truck,        label: "Distribuidores pet" },
];

export default function Segmentos() {
  return (
    <section id="segmentos" className="py-20 sm:py-28 bg-brand-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <span className="inline-block bg-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Segmentos atendidos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Atendemos todos os negócios do mercado pet
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Soluções contábeis pensadas para cada tipo de empresa do setor pet.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {segmentos.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-brand-orange hover:border-brand-orange transition-all duration-200 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center mb-3 transition-colors">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <span className="font-semibold text-white text-sm leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
