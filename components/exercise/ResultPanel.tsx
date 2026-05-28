"use client";

import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
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
  highlight,
}: {
  columns: string[];
  rows: Row[];
  label: string;
  highlight?: "green" | "red";
}) {
  const borderColor =
    highlight === "green"
      ? "border-emerald-700/50"
      : highlight === "red"
      ? "border-red-700/50"
      : "border-zinc-700/50";
  const headerBg =
    highlight === "green"
      ? "bg-emerald-900/30"
      : highlight === "red"
      ? "bg-red-900/30"
      : "bg-zinc-800/60";

  return (
    <div>
      <p className="text-xs text-zinc-400 mb-1.5 font-medium">{label}</p>
      <div className={`rounded-lg border ${borderColor} overflow-auto max-h-48`}>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className={headerBg}>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left text-zinc-300 font-semibold whitespace-nowrap border-b border-zinc-700/50"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30">
                {columns.map((col) => (
                  <td key={col} className="px-3 py-1.5 text-zinc-300 whitespace-nowrap">
                    {row[col] === null ? (
                      <span className="text-zinc-600 italic">NULL</span>
                    ) : (
                      String(row[col])
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-4 text-center text-zinc-600 italic"
                >
                  Nenhum resultado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-600 mt-1">{rows.length} linha(s)</p>
    </div>
  );
}

export function ResultPanel({ output, isCorrect, expectedRows, onNext }: ResultPanelProps) {
  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-zinc-600">
        <AlertCircle className="w-8 h-8 mb-2 opacity-40" />
        <p className="text-sm">Execute uma query para ver o resultado</p>
      </div>
    );
  }

  if (!output.ok) {
    return (
      <div className="rounded-lg border border-red-800/50 bg-red-900/10 p-4">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold">Erro na query</span>
        </div>
        <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap">
          {output.error}
        </pre>
      </div>
    );
  }

  const expectedColumns = expectedRows.length > 0 ? Object.keys(expectedRows[0]) : [];

  if (isCorrect) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg border border-emerald-700/50 bg-emerald-900/10 p-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold">Correto! Excelente trabalho.</p>
              <p className="text-xs text-emerald-500 mt-0.5">
                Sua query retornou o resultado esperado.
              </p>
            </div>
          </div>
        </div>
        <ResultTable
          columns={output.result.columns}
          rows={output.result.rows}
          label="Resultado"
          highlight="green"
        />
        {onNext && (
          <button
            onClick={onNext}
            className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            Próximo exercício →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-red-700/50 bg-red-900/10 p-3">
        <div className="flex items-center gap-2 text-red-400">
          <XCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm font-semibold">Resultado diferente do esperado</p>
        </div>
      </div>
      <ResultTable
        columns={output.result.columns}
        rows={output.result.rows}
        label="Seu resultado"
        highlight="red"
      />
      <ResultTable
        columns={expectedColumns}
        rows={expectedRows}
        label="Resultado esperado"
        highlight="green"
      />
    </div>
  );
}
