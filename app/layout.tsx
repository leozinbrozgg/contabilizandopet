import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Contabilizando Pet Digital | Contabilidade para Petshop e Clínica Veterinária",
  description:
    "Contabilidade digital especializada no mercado pet. Abertura de empresa, planejamento tributário e gestão contábil para petshops, clínicas veterinárias, banho e tosa e outros negócios pet.",
  keywords: [
    "contabilidade para petshop",
    "contabilidade para clínica veterinária",
    "contabilidade para banho e tosa",
    "contador para petshop",
    "abrir empresa petshop",
    "migrar MEI para ME petshop",
    "planejamento tributário petshop",
    "contabilidade especializada mercado pet",
  ],
  openGraph: {
    title: "Contabilizando Pet Digital | Contabilidade para Negócios Pet",
    description:
      "Contabilidade digital especializada no mercado pet. Abertura de empresa, planejamento tributário e gestão contábil.",
    type: "website",
    locale: "pt_BR",
    siteName: "Contabilizando Pet Digital",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Contabilizando Pet Digital",
  description:
    "Contabilidade digital especializada no mercado pet. Petshops, clínicas veterinárias, banho e tosa e outros negócios pet.",
  url: "https://contabilizandopetdigital.com.br",
  telephone: "+5511930238204",
  areaServed: "BR",
  serviceType: "Serviços Contábeis",
  priceRange: "R$ 259 - R$ 699/mês",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
