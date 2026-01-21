import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import FocusHeader from "@/components/layout/FocusHeader";
import Navigation from "@/components/layout/Navigation";

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
  title: "Sangha Digital - Jornada de Autoconhecimento",
  description: "Digital Garden de Yoga, Vedanta e Psicanálise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-gray-50`}
      >
        {/* Header Preto com Foco Atual */}
        <FocusHeader />
        
        {/* Navbar Branca */}
        <Navigation />
        
        {/* Conteúdo Principal */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
