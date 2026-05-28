import Link from "next/link";
import { LEVELS } from "@/lib/levels";
import { getExerciciosByNivel } from "@/lib/exercises";
import { ChevronRight, Zap, Code2, Trophy, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section className="px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          100% Gratuito · Sem Cadastro
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
          <span className="text-zinc-100">SQL</span>
          <span className="text-emerald-400">NINJA</span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-3">
          Aprenda SQL do zero ao avançado através de situações reais de trabalho.
        </p>
        <p className="text-base text-zinc-500 max-w-xl mx-auto mb-10">
          Você é um Analista de Dados recém contratado na{" "}
          <span className="text-zinc-300 font-medium">DataCo</span>. Cada
          exercício é uma demanda real do seu gestor — resolva com SQL e suba de
          cargo.
        </p>

        <Link
          href="/exercicios/junior"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Começar como Júnior
          <ChevronRight className="w-5 h-5" />
        </Link>
        <p className="text-xs text-zinc-600 mt-3">
          Sem criar conta. Seu progresso fica salvo no navegador.
        </p>
      </section>

      {/* Features */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Code2 className="w-5 h-5 text-blue-400" />,
              title: "Editor Interativo",
              desc: "Digite SQL livremente ou monte sua query clicando nas keywords disponíveis",
            },
            {
              icon: <BookOpen className="w-5 h-5 text-violet-400" />,
              title: "Contexto Real",
              desc: "Exercícios baseados em situações reais de 2026: e-commerce, análise de dados, BI",
            },
            {
              icon: <Trophy className="w-5 h-5 text-yellow-400" />,
              title: "Progressão de Carreira",
              desc: "Suba de Júnior a Ninja completando desafios de dificuldade crescente",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5"
            >
              <div className="mb-3">{icon}</div>
              <h3 className="font-semibold text-zinc-100 mb-1.5">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Levels */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">
          Trilha de Aprendizado
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          5 níveis de carreira · 150+ exercícios no total
        </p>

        <div className="space-y-3">
          {LEVELS.map((level, i) => {
            const exercises = getExerciciosByNivel(level.nivel);
            const available = exercises.length;
            const isLocked = available === 0;

            return (
              <div
                key={level.nivel}
                className={`flex items-center justify-between rounded-xl border p-5 ${
                  isLocked
                    ? "border-zinc-800/50 bg-zinc-900/20 opacity-50"
                    : `${level.corBg}`
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`text-2xl font-black tabular-nums ${level.cor}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-100">
                        {level.label}
                      </span>
                      {isLocked && (
                        <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                          Em breve
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {level.descricao}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-400 hidden sm:block">
                    {available}/{level.total} exercícios
                  </span>
                  {!isLocked && (
                    <Link
                      href={`/exercicios/${level.nivel}`}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${level.corBg} ${level.cor} hover:opacity-80 transition-opacity`}
                    >
                      Começar →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-zinc-700 text-xs">
        SQLNINJA · Aprenda SQL do jeito que o mercado usa
      </footer>
    </main>
  );
}
