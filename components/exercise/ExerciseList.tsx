"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { getProgress } from "@/lib/progress";
import type { Exercicio } from "@/lib/types";

// ── Definição dos blocos do currículo ────────────────────────────────────────

const BLOCOS_CURRICULO = [
  { label: "SELECT Básico",         min: 1,  max: 5,  desc: "SELECT *, colunas, alias, DISTINCT" },
  { label: "WHERE Numérico",        min: 6,  max: 8,  desc: "=, >, <, >=, <=, != e expressões calculadas" },
  { label: "WHERE Texto e LIKE",    min: 9,  max: 15, desc: "Filtros de texto e padrões com %" },
  { label: "IN, BETWEEN e NULL",    min: 16, max: 22, desc: "Listas, intervalos, campos nulos e COALESCE" },
  { label: "AND, OR e NOT",         min: 23, max: 28, desc: "Combinando condições e precedência" },
  { label: "ORDER BY e LIMIT",      min: 29, max: 34, desc: "Ordenação, paginação e top-N" },
  { label: "DISTINCT Avançado",     min: 35, max: 36, desc: "Combinações únicas multi-coluna" },
  { label: "Aliases e Expressões",  min: 37, max: 41, desc: "AS, cálculos, concatenação ||" },
  { label: "Funções de Texto",      min: 42, max: 47, desc: "UPPER, LOWER, LENGTH, SUBSTR, TRIM, REPLACE" },
  { label: "Agregação",             min: 48, max: 53, desc: "COUNT, SUM, AVG, MIN, MAX" },
  { label: "CASE WHEN",             min: 54, max: 57, desc: "Classificações e condicionais" },
  { label: "ROUND, ABS e CAST",     min: 58, max: 60, desc: "Funções numéricas e conversão de tipos" },
  { label: "Datas",                 min: 61, max: 65, desc: "strftime, date('now'), julianday, modifiers" },
];

// ── Item de exercício ────────────────────────────────────────────────────────

function ExItem({
  ex,
  nivel,
  isDone,
  isInterview = false,
}: {
  ex: Exercicio;
  nivel: string;
  isDone: boolean;
  isInterview?: boolean;
}) {
  const accentColor = isInterview ? "#bd93f9" : "#50fa7b";

  return (
    <Link
      href={`/exercicios/${nivel}/${ex.id}`}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
        isDone
          ? "bg-[#50fa7b]/[0.04] hover:bg-[#50fa7b]/[0.07]"
          : "hover:bg-white/[0.04]"
      }`}
    >
      {/* Número / check */}
      <div className="shrink-0 w-7 h-7 flex items-center justify-center">
        {isDone ? (
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}60` }}
          >
            <Check className="w-2.5 h-2.5" style={{ color: accentColor }} />
          </span>
        ) : (
          <span className="text-xs font-mono text-white/20 tabular-nums">
            {String(ex.numero).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Título + prévia */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate transition-colors ${
            isDone ? "text-white/80" : "text-white/65 group-hover:text-white/90"
          }`}
        >
          {ex.titulo}
        </p>
      </div>

      {/* Seta */}
      <span className="shrink-0 text-white/15 group-hover:text-white/35 transition-colors text-sm">
        →
      </span>
    </Link>
  );
}

// ── Bloco colapsável do currículo ─────────────────────────────────────────────

function BlocoSection({
  bloco,
  exercises,
  nivel,
  done,
  defaultOpen,
}: {
  bloco: typeof BLOCOS_CURRICULO[0];
  exercises: Exercicio[];
  nivel: string;
  done: Set<string>;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const total = exercises.length;
  const completed = exercises.filter((e) => done.has(e.id)).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const allDone = completed === total && total > 0;

  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors text-left"
      >
        {/* Ícone abrir/fechar */}
        <span className="shrink-0 text-white/25 transition-transform" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>

        {/* Label + desc */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${allDone ? "text-[#50fa7b]" : "text-white/80"}`}>
              {bloco.label}
            </span>
            {allDone && <Check className="w-3 h-3 text-[#50fa7b]" />}
          </div>
          <p className="text-xs text-white/30 mt-0.5">{bloco.desc}</p>
        </div>

        {/* Progresso */}
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono text-white/25">{completed}/{total}</span>
          <div className="w-14 h-1 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${pct}%`,
                backgroundColor: pct === 100 ? "#50fa7b" : "rgba(255,255,255,0.35)",
              }}
            />
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-white/[0.06] bg-white/[0.01] py-1">
          {exercises.map((ex) => (
            <ExItem key={ex.id} ex={ex} nivel={nivel} isDone={done.has(ex.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Cabeçalho de seção principal ──────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  count,
  completed,
  accentColor,
}: {
  title: string;
  subtitle: string;
  count: number;
  completed: number;
  accentColor: string;
}) {
  const pct = count > 0 ? Math.round((completed / count) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 flex-wrap">
        <h2 className="text-base font-bold text-white">{title}</h2>
        <span className="text-xs text-white/30 font-mono">{completed}/{count} concluídos</span>
      </div>
      <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
      <div className="w-full h-[3px] bg-white/8 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: pct === 100 ? "#50fa7b" : accentColor,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

interface ExerciseListProps {
  nivel: string;
  exercises: Exercicio[];
}

export function ExerciseList({ nivel, exercises }: ExerciseListProps) {
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    setDone(new Set(getProgress().exerciciosConcluidos));
  }, []);

  // Separar exercícios por seção
  const curriculo = exercises.filter((e) => e.numero <= 65);
  const reforco = exercises.filter((e) => e.numero >= 66 && e.numero <= 80);
  const entrevista = exercises.filter((e) => e.numero >= 81);

  const completedCurriculo = curriculo.filter((e) => done.has(e.id)).length;
  const completedReforco = reforco.filter((e) => done.has(e.id)).length;
  const completedEntrevista = entrevista.filter((e) => done.has(e.id)).length;

  // Determinar qual bloco abrir por padrão
  // (o primeiro que ainda não foi concluído)
  const firstOpenBloco = BLOCOS_CURRICULO.findIndex((b) => {
    const exs = curriculo.filter((e) => e.numero >= b.min && e.numero <= b.max);
    return exs.some((e) => !done.has(e.id));
  });

  return (
    <div className="space-y-10">

      {/* ── CURRÍCULO ──────────────────────────────────────────── */}
      {curriculo.length > 0 && (
        <section>
          <SectionHeader
            title="Currículo"
            subtitle="13 blocos temáticos do SELECT básico até datas e agregação"
            count={curriculo.length}
            completed={completedCurriculo}
            accentColor="#8be9fd"
          />
          <div className="space-y-2">
            {BLOCOS_CURRICULO.map((bloco, idx) => {
              const exsNoBloco = curriculo.filter(
                (e) => e.numero >= bloco.min && e.numero <= bloco.max
              );
              if (exsNoBloco.length === 0) return null;
              const blocoHasProgress = exsNoBloco.some((e) => done.has(e.id));
              const defaultOpen = idx === firstOpenBloco || (idx === 0 && firstOpenBloco === -1);
              return (
                <BlocoSection
                  key={bloco.label}
                  bloco={bloco}
                  exercises={exsNoBloco}
                  nivel={nivel}
                  done={done}
                  defaultOpen={defaultOpen || blocoHasProgress}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* ── REFORÇO ────────────────────────────────────────────── */}
      {reforco.length > 0 && (
        <section>
          <SectionHeader
            title="Reforço"
            subtitle="Exercícios multi-conceito sem dica — combine o que aprendeu"
            count={reforco.length}
            completed={completedReforco}
            accentColor="#ffb86c"
          />
          <div className="border border-white/[0.07] rounded-xl overflow-hidden divide-y divide-white/[0.05]">
            {reforco.map((ex) => (
              <ExItem key={ex.id} ex={ex} nivel={nivel} isDone={done.has(ex.id)} />
            ))}
          </div>
        </section>
      )}

      {/* ── SIMULADO DE ENTREVISTA ─────────────────────────────── */}
      {entrevista.length > 0 && (
        <section>
          <SectionHeader
            title="Simulado de Entrevista"
            subtitle="Valentina Cruz (Engenheira Sênior) te faz 10 perguntas reais de entrevista Júnior"
            count={entrevista.length}
            completed={completedEntrevista}
            accentColor="#bd93f9"
          />
          <div className="border border-[#bd93f9]/15 rounded-xl overflow-hidden divide-y divide-white/[0.05] bg-[#bd93f9]/[0.02]">
            {entrevista.map((ex) => (
              <ExItem
                key={ex.id}
                ex={ex}
                nivel={nivel}
                isDone={done.has(ex.id)}
                isInterview
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
