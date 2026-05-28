import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQLNINJA — Aprenda SQL do Zero ao Avançado",
  description:
    "Aprenda SQL na prática com exercícios baseados em situações reais de trabalho. Do Júnior ao Ninja, gratuitamente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-black text-white antialiased">
        <TooltipProvider delay={250}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
