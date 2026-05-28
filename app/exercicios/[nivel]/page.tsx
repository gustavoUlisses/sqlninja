import { notFound } from "next/navigation";
import Link from "next/link";
import { LEVELS, getLevelInfo } from "@/lib/levels";
import { getExerciciosByNivel } from "@/lib/exercises";
import { ExerciseList } from "@/components/exercise/ExerciseList";
import type { Nivel } from "@/lib/types";
import { ArrowLeft, Lock, Award } from "lucide-react";

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
    <main className="min-h-screen bg-black">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Início
        </Link>

        {/* Header do módulo */}
        <div className="mb-10">
          <p className="text-[11px] text-white/30 uppercase tracking-widest font-medium mb-2">
            Módulo
          </p>
          <h1 className="text-2xl font-bold text-white">{levelInfo.cargo}</h1>
          <p className="text-white/40 text-sm mt-1.5 leading-relaxed">
            {levelInfo.descricao}
          </p>

          {exercises.length > 0 && (
            <p className="text-white/20 text-xs mt-3 font-mono">
              {exercises.length} exercícios disponíveis
            </p>
          )}
        </div>

        {/* Certificado CTA */}
        {exercises.length > 0 && nivel === "junior" && (
          <Link
            href={`/exercicios/${nivel}/certificado`}
            className="flex items-center justify-between rounded-xl border border-[#50fa7b]/20 bg-[#50fa7b]/[0.04] px-5 py-4 hover:bg-[#50fa7b]/[0.08] hover:border-[#50fa7b]/35 transition-colors group mb-8"
          >
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#50fa7b]/70" />
              <div>
                <p className="text-sm font-semibold text-white/85">Certificação Júnior</p>
                <p className="text-xs text-white/40 mt-0.5">25 questões · PDF ao ser aprovado</p>
              </div>
            </div>
            <span className="text-sm text-[#50fa7b]/60 group-hover:text-[#50fa7b] transition-colors">
              Fazer prova →
            </span>
          </Link>
        )}

        {/* Lista ou estado vazio */}
        {exercises.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <Lock className="w-8 h-8 text-white/15 mx-auto" />
            <p className="text-white/30 font-medium">Em breve</p>
            <p className="text-white/20 text-sm">Este nível está sendo preparado.</p>
            <Link
              href="/exercicios/junior"
              className="inline-block mt-4 text-sm text-white/40 hover:text-white transition-colors"
            >
              Voltar ao Júnior →
            </Link>
          </div>
        ) : (
          <ExerciseList nivel={nivel} exercises={exercises} />
        )}

      </div>
    </main>
  );
}
