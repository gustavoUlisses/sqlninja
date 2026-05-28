"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Download, Check, X, RotateCcw } from "lucide-react";
import { executeQuery, resultsMatch } from "@/lib/sqlEngine";
import { SqlEditor } from "@/components/exercise/SqlEditor";
import { SchemaPanel } from "@/components/exercise/SchemaPanel";
import { FragmentBuilder } from "@/components/exercise/FragmentBuilder";
import { smartInsert } from "@/lib/smartInsert";
import type { Exercicio, LevelInfo, Nivel, Row } from "@/lib/types";

const PASS_THRESHOLD = 0.70; // 70% mínimo para certificar
const GREEN = "#50fa7b";
const RED = "#ff5555";

interface QuizResult {
  exercicioId: string;
  titulo: string;
  acertou: boolean;
}

// ── PDF Generation ─────────────────────────────────────────────────────────────

async function generatePDF(nome: string, score: number, total: number, nivel: string) {
  const jsPDF = (await import("jspdf")).default;
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const W = 297, H = 210;
  const cx = W / 2;

  // Background
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, W, H, "F");

  // Border
  doc.setDrawColor(80, 250, 123);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, W - 20, H - 20);
  doc.setLineWidth(0.2);
  doc.rect(12, 12, W - 24, H - 24);

  // SQLNINJA
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  doc.text("SQLNINJA", cx, 38, { align: "center" });

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 250, 123);
  doc.text("CERTIFICADO DE CONCLUSÃO", cx, 48, { align: "center" });

  // Separator
  doc.setDrawColor(80, 250, 123, 0.4);
  doc.setLineWidth(0.3);
  doc.line(60, 54, W - 60, 54);

  // Body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(200, 200, 200);
  doc.text("Certificamos que", cx, 66, { align: "center" });

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text(nome.toUpperCase(), cx, 82, { align: "center" });

  // Line under name
  const nameWidth = doc.getTextWidth(nome.toUpperCase());
  doc.setDrawColor(80, 250, 123);
  doc.setLineWidth(0.4);
  doc.line(cx - nameWidth / 2, 85, cx + nameWidth / 2, 85);

  // Course text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(200, 200, 200);
  doc.text("concluiu com aprovação o módulo", cx, 97, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(80, 250, 123);
  doc.text(`JÚNIOR — SQLNINJA`, cx, 108, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text("Aprendizado de SQL do básico ao profissional", cx, 118, { align: "center" });

  // Score
  const scorePct = Math.round((score / total) * 100);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(80, 250, 123);
  doc.text(`Pontuação: ${score}/${total} (${scorePct}%)`, cx, 133, { align: "center" });

  // Date
  const now = new Date();
  const dateStr = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Emitido em ${dateStr}`, cx, 143, { align: "center" });

  // Footer
  doc.setFontSize(9);
  doc.text("sqlninja.vercel.app", cx, 158, { align: "center" });

  // Corner decoration
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(80, 250, 123, 0.1);
  doc.text("SQL", 20, 200);
  doc.text("SQL", W - 20, 200, { align: "right" });

  doc.save(`certificado-sqlninja-${nome.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

// ── Quiz Screen ────────────────────────────────────────────────────────────────

function QuizQuestion({
  exercise,
  questionNum,
  total,
  onAnswer,
}: {
  exercise: Exercicio;
  questionNum: number;
  total: number;
  onAnswer: (acertou: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [expectedRows, setExpectedRows] = useState<Row[]>([]);
  const editorRef = useRef<string>("");
  const expectedCache = useRef<Map<string, Row[]>>(new Map());

  useEffect(() => {
    setQuery("");
    setResult(null);
    editorRef.current = "";
    setExpectedRows([]);

    let cancelled = false;
    (async () => {
      const out = await executeQuery(exercise.schema, exercise.gabarito);
      if (!cancelled && out.ok) {
        expectedCache.current.set(exercise.id, out.result.rows);
        setExpectedRows(out.result.rows);
      }
    })();
    return () => { cancelled = true; };
  }, [exercise.id, exercise.schema, exercise.gabarito]);

  const handleExecute = useCallback(async () => {
    const q = editorRef.current || query;
    if (!q.trim()) return;
    setIsLoading(true);

    const out = await executeQuery(exercise.schema, q);
    if (!out.ok) {
      setResult({ ok: false, message: `Erro: ${out.error}` });
      setIsLoading(false);
      return;
    }

    let expected = expectedRows;
    if (expected.length === 0) {
      const expOut = await executeQuery(exercise.schema, exercise.gabarito);
      if (expOut.ok) {
        expected = expOut.result.rows;
        setExpectedRows(expected);
      }
    }

    const match = resultsMatch(out.result, expected, exercise.ordem_importa ?? false);
    setResult({
      ok: match.ok,
      message: match.ok ? "Correto!" : (match.reason ?? "Resultado diferente do esperado."),
    });
    setIsLoading(false);
  }, [query, exercise, expectedRows]);

  const handleInsert = useCallback((frag: string) => {
    setQuery((prev) => {
      const next = smartInsert(prev, frag);
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

  const handleClear = useCallback(() => {
    setQuery("");
    setResult(null);
    editorRef.current = "";
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="h-1 bg-white/8 shrink-0">
        <div
          className="h-full transition-all"
          style={{ width: `${(questionNum / total) * 100}%`, backgroundColor: GREEN }}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: question */}
        <div className="w-72 shrink-0 border-r border-white/8 p-5 overflow-y-auto space-y-4">
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">
              Questão {questionNum} de {total}
            </p>
            <h3 className="text-sm font-semibold text-white mb-3">{exercise.titulo}</h3>
            <p className="text-sm text-white/70 leading-relaxed">{exercise.demanda}</p>
          </div>
          <SchemaPanel schema={exercise.schema} />
        </div>

        {/* Center: editor + builder */}
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
          <div className="flex-1 min-h-0">
            <SqlEditor
              value={query}
              onChange={(v) => { setQuery(v); editorRef.current = v; }}
              onExecute={handleExecute}
              onClear={handleClear}
              onSemicolon={handleSemicolon}
              isLoading={isLoading}
            />
          </div>
          <FragmentBuilder
            schema={exercise.schema}
            keywords={exercise.keywords_disponiveis}
            funcoes={exercise.funcoes_disponiveis}
            operadores={exercise.operadores_disponiveis}
            valores={exercise.valores_disponiveis}
            onInsert={handleInsert}
          />
        </div>

        {/* Right: feedback */}
        <div className="w-80 shrink-0 border-l border-white/8 p-5 flex flex-col gap-4">
          <p className="text-[10px] text-white/25 uppercase tracking-widest">Resultado</p>

          {!result && (
            <div className="flex-1 flex items-center justify-center text-white/15 text-sm">
              Execute a query para ver o resultado
            </div>
          )}

          {result && (
            <div
              className="rounded-lg border p-4 space-y-3"
              style={{
                backgroundColor: `${result.ok ? GREEN : RED}10`,
                borderColor: `${result.ok ? GREEN : RED}40`,
              }}
            >
              <div className="flex items-center gap-2">
                {result.ok
                  ? <Check className="w-4 h-4" style={{ color: GREEN }} />
                  : <X className="w-4 h-4" style={{ color: RED }} />
                }
                <span className="text-sm font-semibold" style={{ color: result.ok ? GREEN : RED }}>
                  {result.ok ? "Correto!" : "Incorreto"}
                </span>
              </div>
              {!result.ok && (
                <p className="text-xs text-white/50 leading-relaxed">{result.message}</p>
              )}
            </div>
          )}

          {result && (
            <button
              onClick={() => onAnswer(result.ok)}
              className="mt-auto py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{
                backgroundColor: result.ok ? GREEN : "rgba(255,255,255,0.08)",
                color: result.ok ? "#000" : "#fff",
              }}
            >
              {result.ok ? "Próxima questão →" : "Passar adiante →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Results / Certificate Screen ────────────────────────────────────────────

function ResultsScreen({
  results,
  total,
  onRetry,
  nivel,
}: {
  results: QuizResult[];
  total: number;
  onRetry: () => void;
  nivel: string;
}) {
  const [nome, setNome] = useState("");
  const [generating, setGenerating] = useState(false);
  const correct = results.filter((r) => r.acertou).length;
  const pct = Math.round((correct / total) * 100);
  const passed = correct / total >= PASS_THRESHOLD;

  const handleDownload = async () => {
    if (!nome.trim()) return;
    setGenerating(true);
    await generatePDF(nome.trim(), correct, total, nivel);
    setGenerating(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-8">
        {/* Score */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-black"
            style={{
              backgroundColor: `${passed ? GREEN : RED}15`,
              border: `2px solid ${passed ? GREEN : RED}50`,
              color: passed ? GREEN : RED,
            }}
          >
            {pct}%
          </div>
          <h2 className="text-2xl font-bold text-white">
            {passed ? "Parabéns! Você foi aprovado!" : "Continue praticando!"}
          </h2>
          <p className="text-white/50 text-sm">
            {correct} de {total} questões corretas{" "}
            {!passed && `— mínimo ${Math.round(PASS_THRESHOLD * 100)}% para certificar`}
          </p>
        </div>

        {/* Question breakdown */}
        <div className="border border-white/8 rounded-xl overflow-hidden">
          <div className="bg-white/3 px-4 py-2 text-xs text-white/30 uppercase tracking-widest">
            Resumo por questão
          </div>
          <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
            {results.map((r) => (
              <div key={r.exercicioId} className="flex items-center gap-3 px-4 py-2.5">
                {r.acertou
                  ? <Check className="w-3.5 h-3.5 shrink-0" style={{ color: GREEN }} />
                  : <X className="w-3.5 h-3.5 shrink-0" style={{ color: RED }} />
                }
                <span className={`text-xs ${r.acertou ? "text-white/70" : "text-white/40"}`}>
                  {r.titulo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate form */}
        {passed ? (
          <div className="space-y-3">
            <p className="text-sm text-white/60 text-center">
              Digite seu nome para gerar o certificado:
            </p>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30"
              onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            />
            <button
              onClick={handleDownload}
              disabled={!nome.trim() || generating}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: GREEN, color: "#000" }}
            >
              <Download className="w-4 h-4" />
              {generating ? "Gerando PDF..." : "Baixar Certificado (PDF)"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-white/8 hover:bg-white/12 text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar novamente
            </button>
            <Link
              href={`/exercicios/${nivel}`}
              className="block text-center text-sm text-white/40 hover:text-white/70 transition-colors py-2"
            >
              Voltar para os exercícios
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

interface CertificadoClientProps {
  nivel: Nivel;
  levelInfo: LevelInfo;
  exercises: Exercicio[];
}

export function CertificadoClient({ nivel, levelInfo, exercises }: CertificadoClientProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = useCallback((acertou: boolean) => {
    const ex = exercises[currentIdx];
    const newResults = [...results, { exercicioId: ex.id, titulo: ex.titulo, acertou }];
    setResults(newResults);

    if (currentIdx + 1 >= exercises.length) {
      setFinished(true);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }, [currentIdx, results, exercises]);

  const handleRetry = useCallback(() => {
    setResults([]);
    setCurrentIdx(0);
    setFinished(false);
    setStarted(true);
  }, []);

  if (finished) {
    return (
      <ResultsScreen
        results={results}
        total={exercises.length}
        onRetry={handleRetry}
        nivel={nivel}
      />
    );
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <Link
            href={`/exercicios/${nivel}`}
            className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 text-sm transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
            style={{ backgroundColor: "#50fa7b15", border: "1px solid #50fa7b30" }}
          >
            <Award className="w-7 h-7" style={{ color: GREEN }} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Certificação Junior</h1>
            <p className="text-white/50 text-sm mt-2">
              {exercises.length} questões cobrindo todo o currículo Júnior
            </p>
          </div>

          <div className="border border-white/8 rounded-xl p-5 text-left space-y-3 text-sm text-white/60">
            <p>✓ {exercises.length} questões de SQL escrito</p>
            <p>✓ Cobre todos os 17 blocos do currículo</p>
            <p>✓ Nota mínima: {Math.round(PASS_THRESHOLD * 100)}% para ser aprovado</p>
            <p>✓ Certificado PDF ao ser aprovado</p>
            <p className="text-white/30 text-xs pt-1">Sem limite de tempo · Sem dicas · Assim como numa entrevista real</p>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 rounded-xl text-sm font-bold text-black transition-colors"
            style={{ backgroundColor: GREEN }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3fe96d")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
          >
            Iniciar Certificação
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white/60">
            Certificação Júnior
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/25 font-mono">
            {currentIdx + 1}/{exercises.length}
          </span>
          <span className="text-xs text-white/25">
            {results.filter((r) => r.acertou).length} corretas
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <QuizQuestion
          key={exercises[currentIdx].id}
          exercise={exercises[currentIdx]}
          questionNum={currentIdx + 1}
          total={exercises.length}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
