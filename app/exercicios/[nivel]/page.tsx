import { notFound } from "next/navigation";
import Link from "next/link";
import { LEVELS, getLevelInfo } from "@/lib/levels";
import { getExerciciosByNivel } from "@/lib/exercises";
import type { Nivel } from "@/lib/types";
import { CheckCircle2, Lock, ArrowLeft } from "lucide-react";

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
    <main className="min-h-screen bg-zinc-950 px-6 py-10 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Início
      </Link>

      <div className="mb-8">
        <div
          className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${levelInfo.corBg} ${levelInfo.cor}`}
        >
          {levelInfo.label}
        </div>
        <h1 className="text-3xl font-bold text-zinc-100">{levelInfo.cargo}</h1>
        <p className="text-zinc-500 mt-1.5">{levelInfo.descricao}</p>
        <p className="text-sm text-zinc-600 mt-2">
          {exercises.length} de {levelInfo.total} exercícios disponíveis
        </p>
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">
          <Lock className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Exercícios em produção</p>
          <p className="text-sm mt-1">Este nível ainda está sendo preparado.</p>
          <Link
            href="/exercicios/junior"
            className="inline-block mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Voltar ao Júnior →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {exercises.map((ex) => (
            <Link
              key={ex.id}
              href={`/exercicios/${nivel}/${ex.id}`}
              className={`flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 hover:border-zinc-700 hover:bg-zinc-900 transition-colors group`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold tabular-nums ${levelInfo.cor} opacity-60`}>
                  {String(ex.numero).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                    {ex.titulo}
                  </p>
                  <p className="text-xs text-zinc-600 mt-0.5 line-clamp-1">
                    {ex.demanda}
                  </p>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-zinc-700 flex-shrink-0" />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
