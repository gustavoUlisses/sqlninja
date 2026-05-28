"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { getProgress } from "@/lib/progress";
import type { Exercicio } from "@/lib/types";

interface ExerciseListProps {
  nivel: string;
  exercises: Exercicio[];
}

export function ExerciseList({ nivel, exercises }: ExerciseListProps) {
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    setDone(new Set(getProgress().exerciciosConcluidos));
  }, []);

  return (
    <div className="space-y-1">
      {exercises.map((ex) => {
        const isDone = done.has(ex.id);
        return (
          <Link
            key={ex.id}
            href={`/exercicios/${nivel}/${ex.id}`}
            className={`flex items-center justify-between rounded-lg border px-5 py-4 transition-colors group ${
              isDone
                ? "border-[#50fa7b]/25 bg-[#50fa7b]/[0.03] hover:bg-[#50fa7b]/[0.06] hover:border-[#50fa7b]/40"
                : "border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15"
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`text-xs font-mono tabular-nums w-6 ${
                  isDone ? "text-[#50fa7b]/70" : "text-white/25"
                }`}
              >
                {String(ex.numero).padStart(2, "0")}
              </span>
              <div>
                <p
                  className={`text-sm font-medium transition-colors ${
                    isDone ? "text-white" : "text-white/80 group-hover:text-white"
                  }`}
                >
                  {ex.titulo}
                </p>
                <p className="text-xs text-white/30 mt-0.5 line-clamp-1">
                  {ex.demanda.slice(0, 80)}…
                </p>
              </div>
            </div>
            {isDone ? (
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full border"
                style={{
                  backgroundColor: "#50fa7b20",
                  borderColor: "#50fa7b60",
                }}
              >
                <Check className="w-3 h-3" style={{ color: "#50fa7b" }} />
              </span>
            ) : (
              <span className="text-white/20 group-hover:text-white/40 transition-colors text-lg leading-none">
                →
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
