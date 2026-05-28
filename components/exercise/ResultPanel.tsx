"use client";

import { Check, X, Circle } from "lucide-react";
import type { QueryOutput, Row } from "@/lib/types";

interface ResultPanelProps {
  output: QueryOutput | null;
  isCorrect: boolean | null;
  expectedRows: Row[];
  reason?: string | null;
  onNext?: () => void;
}

const GREEN = "#50fa7b";
const RED = "#ff5555";

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
      ? "border-[#50fa7b]/30"
      : variant === "error"
      ? "border-[#ff5555]/30"
      : "border-white/8";
  const headerBg =
    variant === "success"
      ? "bg-[#50fa7b]/5"
      : variant === "error"
      ? "bg-[#ff5555]/5"
      : "bg-white/3";

  return (
    <div>
      <p className="text-xs text-white/30 mb-1.5 font-medium">{label}</p>
      <div className={`rounded-lg border ${borderColor} overflow-auto`}>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className={`border-b border-white/8 ${headerBg}`}>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 text-left text-white/60 font-medium whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/3">
                {columns.map((col) => (
                  <td key={col} className="px-3 py-1.5 text-white/75 whitespace-nowrap">
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

export function ResultPanel({ output, isCorrect, expectedRows, reason, onNext }: ResultPanelProps) {
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
        <div
          className="flex items-center gap-2.5 rounded-lg border px-4 py-3"
          style={{ backgroundColor: `${RED}15`, borderColor: `${RED}50` }}
        >
          <X className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />
          <span className="text-sm font-semibold" style={{ color: RED }}>
            Erro na query
          </span>
        </div>
        <pre
          className="text-xs font-mono rounded-lg p-3 whitespace-pre-wrap leading-relaxed border"
          style={{
            backgroundColor: `${RED}08`,
            borderColor: `${RED}20`,
            color: `${RED}cc`,
          }}
        >
          {output.error}
        </pre>
      </div>
    );
  }

  const expectedColumns = expectedRows.length > 0 ? Object.keys(expectedRows[0]) : [];

  if (isCorrect) {
    return (
      <div className="space-y-4">
        <div
          className="flex items-center gap-2.5 rounded-lg border px-4 py-3"
          style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}40` }}
        >
          <Check className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
          <div>
            <p className="text-sm font-bold" style={{ color: GREEN }}>
              Correto!
            </p>
            <p className="text-xs mt-0.5" style={{ color: `${GREEN}90` }}>
              Sua query retornou o resultado esperado.
            </p>
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
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: GREEN, color: "#000" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3fe96d")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
          >
            Próximo exercício →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="rounded-lg border px-4 py-3"
        style={{ backgroundColor: `${RED}12`, borderColor: `${RED}40` }}
      >
        <div className="flex items-center gap-2.5">
          <X className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />
          <p className="text-sm font-semibold" style={{ color: RED }}>
            Resultado diferente do esperado
          </p>
        </div>
        {reason && (
          <p className="text-xs mt-2 ml-6.5 leading-relaxed" style={{ color: `${RED}b3` }}>
            {reason}
          </p>
        )}
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
