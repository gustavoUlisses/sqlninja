import { notFound } from "next/navigation";
import { LEVELS } from "@/lib/levels";
import { getExerciciosByNivel, getExercicioById, getAdjacentIds } from "@/lib/exercises";
import { ExerciseClient } from "@/components/exercise/ExerciseClient";
import type { Nivel } from "@/lib/types";

export function generateStaticParams() {
  const params: { nivel: string; id: string }[] = [];
  for (const level of LEVELS) {
    const exercises = getExerciciosByNivel(level.nivel);
    for (const ex of exercises) {
      params.push({ nivel: level.nivel, id: ex.id });
    }
  }
  return params;
}

interface Props {
  params: Promise<{ nivel: string; id: string }>;
}

export default async function ExercisePage({ params }: Props) {
  const { nivel, id } = await params;
  const validNivel = LEVELS.find((l) => l.nivel === nivel);
  if (!validNivel) notFound();

  const exercicio = getExercicioById(nivel as Nivel, id);
  if (!exercicio) notFound();

  const { prev, next } = getAdjacentIds(nivel as Nivel, id);
  const allInLevel = getExerciciosByNivel(nivel as Nivel);

  return (
    <ExerciseClient
      exercicio={exercicio}
      nextId={next}
      prevId={prev}
      totalInLevel={allInLevel.length}
      completedInLevel={0}
    />
  );
}
