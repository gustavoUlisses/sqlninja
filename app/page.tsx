import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl sm:text-7xl font-black tracking-tight text-white mb-5">
        SQLNINJA
      </h1>

      <p className="text-lg text-white/50 max-w-sm leading-relaxed mb-10">
        Aprenda SQL do zero ao avançado resolvendo desafios reais de uma empresa
        de dados.
      </p>

      <Link
        href="/exercicios/junior/jr-001"
        className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full text-base hover:bg-white/90 transition-colors"
      >
        Iniciar
        <ArrowRight className="w-4 h-4" />
      </Link>

      <p className="text-xs text-white/20 mt-5">
        Gratuito · Sem cadastro · Progresso salvo no navegador
      </p>
    </main>
  );
}
