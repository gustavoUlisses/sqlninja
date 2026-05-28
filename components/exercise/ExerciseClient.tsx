"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, ArrowLeft, CheckCheck } from "lucide-react";
import { SqlEditor } from "./SqlEditor";
import { FragmentBuilder } from "./FragmentBuilder";
import { ResultPanel } from "./ResultPanel";
import { SchemaPanel } from "./SchemaPanel";
import { executeQuery, resultsMatch } from "@/lib/sqlEngine";
import { markCompleted, getProgress } from "@/lib/progress";
import { getLevelInfo } from "@/lib/levels";
import type { Exercicio, QueryOutput } from "@/lib/types";

interface ExerciseClientProps {
  exercicio: Exercicio;
  nextId: string | null;
  prevId: string | null;
  totalInLevel: number;
  completedInLevel: number;
}

export function ExerciseClient({
  exercicio,
  nextId,
  prevId,
  totalInLevel,
  completedInLevel,
}: ExerciseClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState<QueryOutput | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [completedCount, setCompletedCount] = useState(completedInLevel);
  const editorRef = useRef<string>("");

  useEffect(() => {
    const p = getProgress();
    const prefix = exercicio.nivel.slice(0, 2);
    const count = p.exerciciosConcluidos.filter((id) => id.startsWith(prefix)).length;
    setCompletedCount(count);
    setAlreadyDone(p.exerciciosConcluidos.includes(exercicio.id));
  }, [exercicio.id, exercicio.nivel]);

  const levelInfo = getLevelInfo(exercicio.nivel);
  const progressPct = Math.round((completedCount / totalInLevel) * 100);

  const handleQueryChange = useCallback((val: string) => {
    setQuery(val);
    editorRef.current = val;
  }, []);

  const handleInsertFragment = useCallback((fragment: string) => {
    setQuery((prev) => {
      const trimmed = prev.trimEnd();
      return trimmed + fragment;
    });
  }, []);

  const handleExecute = useCallback(async () => {
    const q = editorRef.current || query;
    if (!q.trim()) return;
    setIsLoading(true);
    setOutput(null);
    setIsCorrect(null);

    const result = await executeQuery(exercicio.schema, q);
    setOutput(result);

    if (result.ok) {
      const correct = resultsMatch(result.result, exercicio.expected_result);
      setIsCorrect(correct);
      if (correct && !alreadyDone) {
        markCompleted(exercicio.id);
        setAlreadyDone(true);
        setCompletedCount((c) => c + 1);
      }
    } else {
      setIsCorrect(false);
    }
    setIsLoading(false);
  }, [query, exercicio, alreadyDone]);

  const handleNext = useCallback(() => {
    if (nextId) {
      router.push(`/exercicios/${exercicio.nivel}/${nextId}`);
    } else {
      router.push(`/exercicios/${exercicio.nivel}`);
    }
  }, [nextId, exercicio.nivel, router]);

  const handleClear = useCallback(() => {
    setQuery("");
    setOutput(null);
    setIsCorrect(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/exercicios/${exercicio.nivel}`)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{levelInfo.label}</span>
          </button>
          <div className="h-4 w-px bg-zinc-700" />
          <span className="text-sm font-semibold text-zinc-100">
            {exercicio.titulo}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-zinc-500">
              {completedCount}/{totalInLevel}
            </span>
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${levelInfo.corBg} ${levelInfo.cor}`}>
            {levelInfo.label}
          </span>
        </div>
      </header>

      {/* Main layout: 3 columns on desktop, stacked on mobile */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel: Demand + Schema */}
        <div className="w-72 shrink-0 border-r border-zinc-800 overflow-y-auto p-4 space-y-5 hidden md:flex md:flex-col">
          {/* Demand */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-2">
              <span>#{exercicio.numero}</span>
              <span>Demanda</span>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {exercicio.demanda}
            </p>
            {exercicio.dica && (
              <button
                onClick={() => setShowHint((h) => !h)}
                className="mt-3 flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? "Esconder dica" : "Ver dica"}
              </button>
            )}
            {showHint && exercicio.dica && (
              <div className="mt-2 rounded-lg bg-yellow-900/20 border border-yellow-700/40 p-3 text-xs text-yellow-300">
                {exercicio.dica}
              </div>
            )}
          </div>

          {/* Schema */}
          <SchemaPanel schema={exercicio.schema} />
        </div>

        {/* Center panel: Editor + Fragment Builder */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 gap-3">
          {/* Mobile: demand */}
          <div className="md:hidden">
            <p className="text-sm font-semibold text-zinc-300 mb-1">
              #{exercicio.numero} — {exercicio.titulo}
            </p>
            <p className="text-sm text-zinc-400">{exercicio.demanda}</p>
          </div>

          <div className="flex-1 overflow-hidden">
            <SqlEditor
              value={query}
              onChange={handleQueryChange}
              onExecute={handleExecute}
              onClear={handleClear}
              isLoading={isLoading}
            />
          </div>

          <FragmentBuilder
            schema={exercicio.schema}
            keywords={exercicio.keywords_disponiveis}
            funcoes={exercicio.funcoes_disponiveis}
            operadores={exercicio.operadores_disponiveis}
            valores={exercicio.valores_disponiveis}
            onInsert={handleInsertFragment}
          />
        </div>

        {/* Right panel: Result */}
        <div className="w-96 shrink-0 border-l border-zinc-800 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
              Resultado
            </span>
            {isCorrect && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <CheckCheck className="w-3.5 h-3.5" />
                Resolvido
              </span>
            )}
          </div>
          <ResultPanel
            output={output}
            isCorrect={isCorrect}
            expectedRows={exercicio.expected_result}
            onNext={isCorrect ? handleNext : undefined}
          />
        </div>
      </div>

      {/* Navigation footer */}
      <div className="shrink-0 border-t border-zinc-800 bg-zinc-900/50 px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => prevId && router.push(`/exercicios/${exercicio.nivel}/${prevId}`)}
          disabled={!prevId}
          className="text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>
        <span className="text-xs text-zinc-600">
          Exercício {exercicio.numero} de {totalInLevel}
        </span>
        <button
          onClick={() => nextId && router.push(`/exercicios/${exercicio.nivel}/${nextId}`)}
          disabled={!nextId}
          className="text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
