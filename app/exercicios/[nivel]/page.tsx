import { notFound } from "next/navigation";
import Link from "next/link";
import { LEVELS, getLevelInfo } from "@/lib/levels";
import { getExerciciosByNivel } from "@/lib/exercises";
import type { Nivel } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return LEVELS.map((l) => ({ nivel: l.nivel }));
}

interface Props {
  params: Promise<{ nivel: string }>;
}

export default async function NivelPage({ params }: Props) {
  const { nivel } = await params;
  const levelInfo = getLevelInfo(nivel);
  if (!levelInfo || !LEVELS.find((l) => l.nivel === nivel)) notFound();

  const exercises = getExerciciosByNivel(nivel as Nivel);

  return (
    <main className="min-h-screen bg-black px-6 py-10 max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 text-sm mb-10 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Início
      </Link>

      <div className="mb-8">
        <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-2">
          {levelInfo.label}
        </p>
        <h1 className="text-2xl font-bold text-white">{levelInfo.cargo}</h1>
        <p className="text-white/40 text-sm mt-1.5">{levelInfo.descricao}</p>
        <p className="text-white/20 text-xs mt-3">
          {exercises.length} de {levelInfo.total} exercícios disponíveis
        </p>
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/30 font-medium">Em breve</p>
          <p className="text-white/20 text-sm mt-1">
            Este nível está sendo preparado.
          </p>
          <Link
            href="/exercicios/junior"
            className="inline-block mt-6 text-sm text-white/50 hover:text-white transition-colors"
          >
            Voltar ao Júnior →
          </Link>
        </div>
      ) : (
        <div className="space-y-1">
          {exercises.map((ex) => (
            <Link
              key={ex.id}
              href={`/exercicios/${nivel}/${ex.id}`}
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/3 px-5 py-4 hover:bg-white/6 hover:border-white/15 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/25 tabular-nums w-6">
                  {String(ex.numero).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {ex.titulo}
                  </p>
                  <p className="text-xs text-white/30 mt-0.5 line-clamp-1">
                    {ex.demanda.slice(0, 80)}…
                  </p>
                </div>
              </div>
              <span className="text-white/20 group-hover:text-white/40 transition-colors text-lg leading-none">
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
