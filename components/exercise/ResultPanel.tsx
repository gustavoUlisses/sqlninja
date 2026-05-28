"use client";

import { Check, X, Circle } from "lucide-react";
import type { QueryOutput, Row } from "@/lib/types";

interface ResultPanelProps {
  output: QueryOutput | null;
  isCorrect: boolean | null;
  expectedRows: Row[];
  onNext?: () => void;
}

function ResultTable({
  columns,
  rows,
  label,
  variant,
}: {
  columns: string[];
  rows: Row[];
  label: string;
  variant?: "success" | "error" | "neutral";
}) {
  const borderColor =
    variant === "success"
      ? "border-white/20"
      : variant === "error"
      ? "border-white/10"
      : "border-white/8";

  return (
    <div>
      <p className="text-xs text-white/30 mb-1.5 font-medium">{label}</p>
      <div className={`rounded-lg border ${borderColor} overflow-auto max-h-48`}>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 text-left text-white/50 font-medium whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/3">
                {columns.map((col) => (
                  <td key={col} className="px-3 py-1.5 text-white/70 whitespace-nowrap">
                    {row[col] === null ? (
                      <span className="text-white/20 italic">NULL</span>
                    ) : (
                      String(row[col])
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-4 text-center text-white/20 italic">
                  Nenhum resultado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/20 mt-1">{rows.length} linha(s)</p>
    </div>
  );
}

export function ResultPanel({ output, isCorrect, expectedRows, onNext }: ResultPanelProps) {
  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 text-white/15">
        <Circle className="w-6 h-6 mb-2 opacity-50" />
        <p className="text-sm">Execute uma query para ver o resultado</p>
      </div>
    );
  }

  if (!output.ok) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/50">
          <X className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">Erro na query</span>
        </div>
        <pre className="text-xs text-white/40 font-mono bg-white/3 border border-white/8 rounded-lg p-3 whitespace-pre-wrap leading-relaxed">
          {output.error}
        </pre>
      </div>
    );
  }

  const expectedColumns = expectedRows.length > 0 ? Object.keys(expectedRows[0]) : [];

  if (isCorrect) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 border border-white/15 px-4 py-3">
          <Check className="w-4 h-4 text-white flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white">Correto!</p>
            <p className="text-xs text-white/40 mt-0.5">Sua query retornou o resultado esperado.</p>
          </div>
        </div>

        <ResultTable
          columns={output.result.columns}
          rows={output.result.rows}
          label="Resultado"
          variant="success"
        />

        {onNext && (
          <button
            onClick={onNext}
            className="w-full py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Próximo exercício →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/40">
        <X className="w-4 h-4 flex-shrink-0" />
        <p className="text-sm font-medium">Resultado diferente do esperado</p>
      </div>
      <ResultTable
        columns={output.result.columns}
        rows={output.result.rows}
        label="Seu resultado"
        variant="error"
      />
      <ResultTable
        columns={expectedColumns}
        rows={expectedRows}
        label="Esperado"
        variant="success"
      />
    </div>
  );
}
