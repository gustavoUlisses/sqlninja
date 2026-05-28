"use client";

import { Check, X, Circle, AlertTriangle } from "lucide-react";
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
const YELLOW = "#f1fa8c";

// ── Tradução de erros SQLite → português didático ────────────────────────────

interface ParsedError {
  titulo: string;
  descricao: string;
  dica?: string;
}

function parseSqlError(raw: string): ParsedError {
  const msg = raw.toLowerCase();

  if (msg.includes("no such table")) {
    const match = raw.match(/no such table:\s*(\S+)/i);
    const table = match ? match[1] : "desconhecida";
    return {
      titulo: "Tabela não encontrada",
      descricao: `A tabela "${table}" não existe nesta base de dados.`,
      dica: 'Verifique o Schema no painel esquerdo — os nomes das tabelas disponíveis estão listados lá.',
    };
  }

  if (msg.includes("no such column")) {
    const match = raw.match(/no such column:\s*(\S+)/i);
    const col = match ? match[1] : "desconhecida";
    return {
      titulo: "Coluna não encontrada",
      descricao: `A coluna "${col}" não existe na tabela.`,
      dica: 'Verifique os nomes das colunas no Schema. Atenção a maiúsculas/minúsculas e acentos.',
    };
  }

  if (msg.includes("syntax error")) {
    const match = raw.match(/syntax error near "?([^"]+)"?/i);
    const near = match ? match[1] : null;
    return {
      titulo: "Erro de sintaxe",
      descricao: near
        ? `SQL inválido próximo a "${near}".`
        : "A query tem um erro de sintaxe.",
      dica: 'Verifique se todas as palavras-chave estão corretas, se as aspas estão fechadas e se as vírgulas estão nos lugares certos.',
    };
  }

  if (msg.includes("unrecognized token")) {
    const match = raw.match(/unrecognized token:\s*"?([^"]+)"?/i);
    const token = match ? match[1] : null;
    return {
      titulo: "Token não reconhecido",
      descricao: token
        ? `O símbolo ou palavra "${token}" não foi reconhecido.`
        : "Símbolo ou palavra não reconhecido pelo SQL.",
      dica: 'Verifique aspas simples e duplas, parênteses não fechados ou caracteres inválidos.',
    };
  }

  if (msg.includes("ambiguous column")) {
    const match = raw.match(/ambiguous column name:\s*(\S+)/i);
    const col = match ? match[1] : "desconhecida";
    return {
      titulo: "Coluna ambígua",
      descricao: `A coluna "${col}" existe em mais de uma tabela do JOIN.`,
      dica: 'Qualifique a coluna com o nome da tabela: tabela.coluna (ex: produtos.nome).',
    };
  }

  if (msg.includes("apenas consultas select") || msg.includes("apenas uma consulta")) {
    return {
      titulo: "Operação não permitida",
      descricao: raw,
      dica: 'Neste exercício, apenas comandos SELECT são aceitos.',
    };
  }

  if (msg.includes("no such function")) {
    const match = raw.match(/no such function:\s*(\S+)/i);
    const fn = match ? match[1] : "desconhecida";
    return {
      titulo: "Função não existe",
      descricao: `A função "${fn}" não está disponível no SQLite.`,
      dica: 'Verifique o nome da função na aba Funções do painel de keywords.',
    };
  }

  if (msg.includes("near")) {
    return {
      titulo: "Erro de sintaxe",
      descricao: raw,
      dica: 'Revise a query cuidadosamente — pode ser vírgula a mais, parêntese não fechado ou palavra-chave fora de ordem.',
    };
  }

  return {
    titulo: "Erro na query",
    descricao: raw,
    dica: 'Revise a query e tente novamente.',
  };
}

// ── Componente de tabela de resultado ────────────────────────────────────────

function ResultTable({
  columns,
  rows,
  label,
  badge,
  variant,
}: {
  columns: string[];
  rows: Row[];
  label: string;
  badge?: string;
  variant?: "success" | "error" | "neutral";
}) {
  const borderColor =
    variant === "success"
      ? "border-[#50fa7b]/30"
      : variant === "error"
      ? "border-[#ff5555]/25"
      : "border-white/8";
  const headerBg =
    variant === "success"
      ? "bg-[#50fa7b]/5"
      : variant === "error"
      ? "bg-[#ff5555]/5"
      : "bg-white/3";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-medium text-white/40">{label}</p>
        {badge && (
          <span className="text-[10px] font-mono text-white/25">{badge}</span>
        )}
      </div>
      <div className={`rounded-lg border ${borderColor} overflow-auto`}>
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className={`border-b border-white/8 ${headerBg}`}>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left text-white/55 font-medium whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
              {columns.length === 0 && (
                <th className="px-3 py-2 text-white/30 font-medium">—</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-white/5 last:border-0 hover:bg-white/3"
              >
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
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className="px-3 py-4 text-center text-white/25 italic"
                >
                  Nenhuma linha retornada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-white/20 mt-1 font-mono">
        {rows.length} linha(s) · {columns.length} coluna(s)
      </p>
    </div>
  );
}

// ── Painel principal ─────────────────────────────────────────────────────────

export function ResultPanel({
  output,
  isCorrect,
  expectedRows,
  reason,
  onNext,
}: ResultPanelProps) {
  // Estado inicial: nada executado ainda
  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 text-white/15">
        <Circle className="w-6 h-6 mb-2 opacity-50" />
        <p className="text-sm">Execute uma query para ver o resultado</p>
      </div>
    );
  }

  // Erro de SQL — query não executou
  if (!output.ok) {
    const err = parseSqlError(output.error);
    return (
      <div className="space-y-3">
        {/* Banner de erro */}
        <div
          className="rounded-lg border p-4 space-y-2"
          style={{ backgroundColor: `${RED}10`, borderColor: `${RED}40` }}
        >
          <div className="flex items-center gap-2">
            <X className="w-4 h-4 shrink-0" style={{ color: RED }} />
            <span className="text-sm font-semibold" style={{ color: RED }}>
              {err.titulo}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-white/60 ml-6">
            {err.descricao}
          </p>
        </div>

        {/* Dica de depuração */}
        {err.dica && (
          <div
            className="rounded-lg border px-4 py-3 flex gap-2.5"
            style={{ backgroundColor: `${YELLOW}08`, borderColor: `${YELLOW}25` }}
          >
            <AlertTriangle
              className="w-3.5 h-3.5 mt-0.5 shrink-0"
              style={{ color: YELLOW }}
            />
            <p className="text-xs leading-relaxed" style={{ color: `${YELLOW}cc` }}>
              {err.dica}
            </p>
          </div>
        )}

        {/* Mensagem técnica colapsável para quem quer ver o raw */}
        <details className="group">
          <summary
            className="text-[11px] text-white/20 hover:text-white/40 cursor-pointer select-none list-none flex items-center gap-1"
          >
            <span className="group-open:rotate-90 inline-block transition-transform">▶</span>
            Mensagem técnica (SQLite)
          </summary>
          <pre
            className="mt-2 text-[11px] font-mono rounded-lg p-3 whitespace-pre-wrap leading-relaxed border text-white/35"
            style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            {output.error}
          </pre>
        </details>
      </div>
    );
  }

  const expectedColumns = expectedRows.length > 0 ? Object.keys(expectedRows[0]) : [];
  const userRows = output.result.rows;
  const userCols = output.result.columns;

  // Resultado correto
  if (isCorrect) {
    return (
      <div className="space-y-4">
        <div
          className="flex items-center gap-2.5 rounded-lg border px-4 py-3"
          style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}40` }}
        >
          <Check className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
          <div>
            <p className="text-sm font-bold" style={{ color: GREEN }}>
              Correto!
            </p>
            <p className="text-xs mt-0.5" style={{ color: `${GREEN}80` }}>
              Sua query retornou o resultado esperado.
            </p>
          </div>
        </div>

        <ResultTable
          columns={userCols}
          rows={userRows}
          label="Resultado"
          badge={`${userRows.length} linha(s)`}
          variant="success"
        />

        {onNext && (
          <button
            onClick={onNext}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ backgroundColor: GREEN, color: "#000" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3fe96d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = GREEN)
            }
          >
            Próximo exercício →
          </button>
        )}
      </div>
    );
  }

  // Resultado errado — query rodou mas não bateu com o esperado
  return (
    <div className="space-y-4">
      {/* Banner com motivo específico */}
      <div
        className="rounded-lg border p-4 space-y-1.5"
        style={{ backgroundColor: `${RED}10`, borderColor: `${RED}35` }}
      >
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 shrink-0" style={{ color: RED }} />
          <p className="text-sm font-semibold" style={{ color: RED }}>
            Resultado diferente do esperado
          </p>
        </div>
        {reason && (
          <p className="text-xs leading-relaxed ml-6" style={{ color: `${RED}99` }}>
            {reason}
          </p>
        )}
      </div>

      {/* O que o usuário obteve — primeiro e em destaque */}
      <ResultTable
        columns={userCols}
        rows={userRows}
        label="Sua query retornou"
        badge={`${userRows.length} linha(s)`}
        variant="neutral"
      />

      {/* O que era esperado — segundo, para comparação */}
      <ResultTable
        columns={expectedColumns}
        rows={expectedRows}
        label="Resultado esperado"
        badge={`${expectedRows.length} linha(s)`}
        variant="success"
      />
    </div>
  );
}
