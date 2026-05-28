import { notFound } from "next/navigation";
import Link from "next/link";
import { LEVELS, getLevelInfo } from "@/lib/levels";
import { getExerciciosByNivel } from "@/lib/exercises";
import { ExerciseList } from "@/components/exercise/ExerciseList";
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
        <ExerciseList nivel={nivel} exercises={exercises} />
      )}
    </main>
  );
}
