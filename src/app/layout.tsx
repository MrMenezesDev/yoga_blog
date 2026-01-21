import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "योग Garden - Digital Garden de Yoga e Psicanálise",
  description: "Integrando Yoga, Sânscrito, Psicanálise e Tecnologia na busca por Sthira (estabilidade) e Sukha (fluidez)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-gradient-to-br from-orange-50 via-white to-blue-50`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar à esquerda */}
          <Sidebar />
          
          {/* Conteúdo principal */}
          <main className="flex-1 ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
