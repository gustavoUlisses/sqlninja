import { notFound } from "next/navigation";
import { LEVELS, getLevelInfo } from "@/lib/levels";
import { CertificadoClient } from "@/components/certificate/CertificadoClient";
import type { Nivel } from "@/lib/types";
import { DATASET_JUNIOR } from "@/data/datasets/junior";
import { QUIZ_JUNIOR } from "@/data/quiz/junior";
import { makeExercicio } from "@/lib/exerciseLoader";

export function generateStaticParams() {
  return LEVELS.map((l) => ({ nivel: l.nivel }));
}

interface Props {
  params: Promise<{ nivel: string }>;
}

export default async function CertificadoPage({ params }: Props) {
  const { nivel } = await params;
  const levelInfo = getLevelInfo(nivel);
  if (!levelInfo || !LEVELS.find((l) => l.nivel === nivel)) notFound();

  // Por enquanto só Junior tem certificado
  if (nivel !== "junior") {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white/30">
        <p>Certificado disponível apenas para o módulo Júnior por enquanto.</p>
      </main>
    );
  }

  const dataset = DATASET_JUNIOR;
  const quizExercises = QUIZ_JUNIOR.map((raw) => makeExercicio(raw, dataset));

  return (
    <CertificadoClient
      nivel={nivel as Nivel}
      levelInfo={levelInfo}
      exercises={quizExercises}
    />
  );
}
