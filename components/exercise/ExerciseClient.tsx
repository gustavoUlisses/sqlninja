"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, ArrowLeft, Check } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { SqlEditor } from "./SqlEditor";
import { FragmentBuilder } from "./FragmentBuilder";
import { ResultPanel } from "./ResultPanel";
import { SchemaPanel } from "./SchemaPanel";
import { executeQuery, resultsMatch } from "@/lib/sqlEngine";
import { markCompleted, getProgress } from "@/lib/progress";
import { getLevelInfo } from "@/lib/levels";
import type { Exercicio, QueryOutput } from "@/lib/types";

// SQL clause keywords that should start on a new line
const NEWLINE_KEYWORDS = new Set([
  "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
  "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "CROSS JOIN",
  "ON", "UNION", "UNION ALL", "WITH",
]);

// Indented sub-clause keywords
const INDENT_KEYWORDS = new Set(["AND", "OR", "NOT"]);

function smartInsert(current: string, fragment: string): string {
  const raw = fragment.trim();
  const trimmed = current.trimEnd();

  // ";" just appends
  if (raw === ";") return trimmed + ";";

  // Clause keywords: new line
  if (NEWLINE_KEYWORDS.has(raw)) {
    if (trimmed === "") return raw + " ";
    return trimmed + "\n" + raw + " ";
  }

  // AND / OR: new line with indent
  if (INDENT_KEYWORDS.has(raw)) {
    if (trimmed === "") return raw + " ";
    return trimmed + "\n  " + raw + " ";
  }

  // SELECT at start
  if (raw === "SELECT" || raw === "SELECT DISTINCT") {
    if (trimmed === "") return raw + " ";
    return trimmed + "\n" + raw + " ";
  }

  // DISTINCT after SELECT
  if (raw === "DISTINCT") {
    return trimmed + " DISTINCT ";
  }

  // Column names: if we're right after SELECT or a comma, separate with ", "
  // Detect if the last non-whitespace char is a column/identifier (add comma)
  const lastLine = trimmed.split("\n").pop() ?? "";
  const isAfterSelectLine = /^\s*SELECT(\s+DISTINCT)?\s+\S/i.test(lastLine);
  const endsWithIdentifier = /[\w)"']$/.test(trimmed);

  if (isAfterSelectLine && endsWithIdentifier && !raw.startsWith("'") && !/^[0-9]/.test(raw)) {
    return trimmed + ", " + raw.trimStart();
  }

  // Operators and values: just spaces
  return trimmed + " " + raw.trimStart();
}

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
      const next = smartInsert(prev, fragment);
      editorRef.current = next;
      return next;
    });
  }, []);

  const handleSemicolon = useCallback(() => {
    setQuery((prev) => {
      const next = prev.trimEnd() + ";";
      editorRef.current = next;
      return next;
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
    if (nextId) router.push(`/exercicios/${exercicio.nivel}/${nextId}`);
    else router.push(`/exercicios/${exercicio.nivel}`);
  }, [nextId, exercicio.nivel, router]);

  const handleClear = useCallback(() => {
    setQuery("");
    setOutput(null);
    setIsCorrect(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/exercicios/${exercicio.nivel}`)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/80 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">{levelInfo.label}</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-sm font-medium text-white/70 truncate max-w-xs">
            {exercicio.titulo}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-white/25 font-mono">
              {completedCount}/{totalInLevel}
            </span>
            <div className="w-20 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/60 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          {alreadyDone && (
            <span className="flex items-center gap-1 text-xs text-white/40">
              <Check className="w-3 h-3" />
              Resolvido
            </span>
          )}
        </div>
      </header>

      {/* Resizable 3-panel layout */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" className="h-full">

          {/* Left panel: Demand + Schema */}
          <Panel defaultSize={22} minSize={15} maxSize={40} className="hidden md:flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div>
                <p className="text-xs text-white/25 uppercase tracking-widest font-medium mb-3">
                  #{String(exercicio.numero).padStart(2, "0")} — Demanda
                </p>
                <p className="text-sm text-white/75 leading-relaxed">
                  {exercicio.demanda}
                </p>
                {exercicio.dica && (
                  <>
                    <button
                      onClick={() => setShowHint((h) => !h)}
                      className="mt-4 flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {showHint ? "Esconder dica" : "Ver dica"}
                    </button>
                    {showHint && (
                      <div className="mt-2 rounded-lg bg-white/4 border border-white/10 p-3 text-xs text-white/60 leading-relaxed">
                        {exercicio.dica}
                      </div>
                    )}
                  </>
                )}
              </div>
              <SchemaPanel schema={exercicio.schema} />
            </div>
          </Panel>

          <PanelResizeHandle className="w-px bg-white/8 hover:bg-white/20 active:bg-white/30 transition-colors cursor-col-resize hidden md:block" />

          {/* Center panel: Editor + Fragments */}
          <Panel defaultSize={48} minSize={30} className="flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
              {/* Mobile: demand */}
              <div className="md:hidden mb-1">
                <p className="text-xs text-white/30 mb-1">#{exercicio.numero} — {exercicio.titulo}</p>
                <p className="text-sm text-white/60">{exercicio.demanda}</p>
              </div>

              <div className="flex-1 overflow-hidden min-h-0">
                <SqlEditor
                  value={query}
                  onChange={handleQueryChange}
                  onExecute={handleExecute}
                  onClear={handleClear}
                  onSemicolon={handleSemicolon}
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
          </Panel>

          <PanelResizeHandle className="w-px bg-white/8 hover:bg-white/20 active:bg-white/30 transition-colors cursor-col-resize" />

          {/* Right panel: Result */}
          <Panel defaultSize={30} minSize={20} maxSize={50} className="flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5">
              <p className="text-xs text-white/25 uppercase tracking-widest font-medium mb-4">
                Resultado
              </p>
              <ResultPanel
                output={output}
                isCorrect={isCorrect}
                expectedRows={exercicio.expected_result}
                onNext={isCorrect ? handleNext : undefined}
              />
            </div>
          </Panel>

        </PanelGroup>
      </div>

      {/* Footer nav */}
      <div className="shrink-0 border-t border-white/8 px-5 py-2.5 flex items-center justify-between">
        <button
          onClick={() => prevId && router.push(`/exercicios/${exercicio.nivel}/${prevId}`)}
          disabled={!prevId}
          className="text-xs text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>
        <span className="text-xs text-white/20 font-mono">
          {exercicio.numero}/{totalInLevel}
        </span>
        <button
          onClick={() => nextId && router.push(`/exercicios/${exercicio.nivel}/${nextId}`)}
          disabled={!nextId}
          className="text-xs text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
