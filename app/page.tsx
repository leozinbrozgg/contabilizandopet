import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Diferenciais from "@/components/Diferenciais";
import Dores from "@/components/Dores";
import Segmentos from "@/components/Segmentos";
import Jornada from "@/components/Jornada";
import Servicos from "@/components/Servicos";
import Parceiros from "@/components/Parceiros";
import Planos from "@/components/Planos";
import FormularioConsultoria from "@/components/FormularioConsultoria";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Dores />
        <Segmentos />
        <Diferenciais />
        <Servicos />
        <Jornada />
        <Parceiros />
        <Planos />
        <FormularioConsultoria />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
