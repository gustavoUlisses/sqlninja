"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TabelaSchema } from "@/lib/types";

interface FragmentBuilderProps {
  schema: TabelaSchema[];
  keywords: string[];
  funcoes?: string[];
  operadores?: string[];
  valores?: string[];
  onInsert: (fragment: string) => void;
}

// Tudo que pertence à aba "Tabela" (lado esquerdo, lista vertical)
const CLAUSE_ORDER = [
  "SELECT", "SELECT DISTINCT", "DISTINCT",
  "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
  "JOIN", "INNER JOIN", "LEFT JOIN", "ON", "AS",
  "WITH", "UNION", "UNION ALL",
  "CASE", "WHEN", "THEN", "ELSE", "END",
];

const DEFAULT_FUNCTIONS = [
  "COUNT(*)", "COUNT(DISTINCT )", "SUM()", "AVG()", "MAX()", "MIN()",
];

const DEFAULT_OPERATORS = [
  "=", "!=", ">", "<", ">=", "<=",
  "AND", "OR", "NOT",
  "IN", "NOT IN", "LIKE", "NOT LIKE", "BETWEEN",
  "IS NULL", "IS NOT NULL",
];

// Cláusulas estruturais (entram como "botão grande" na coluna esquerda).
// Tudo o que NÃO está aqui e o exercício listou em `keywords_disponiveis`
// será automaticamente movido para "Filtros & Valores".
const STRUCTURAL_CLAUSES = new Set([
  "SELECT", "SELECT DISTINCT", "DISTINCT",
  "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
  "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON", "AS",
  "WITH", "UNION", "UNION ALL",
  "CASE", "WHEN", "THEN", "ELSE", "END",
]);

function ClauseButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded border border-white/10 bg-white/3 text-xs font-mono font-semibold text-white/70 hover:bg-white/8 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

function ColRow({ label, onClick, bold }: { label: string; onClick: () => void; bold?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 text-xs font-mono text-white/70 hover:text-white hover:bg-white/6 transition-colors cursor-pointer ${
        bold ? "font-semibold" : ""
      }`}
    >
      {label}
    </button>
  );
}

function SmallTag({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded border border-white/10 bg-white/3 text-xs font-mono text-white/60 hover:bg-white/8 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

function PunctButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded border border-white/10 bg-white/3 text-sm font-mono font-bold text-white/60 hover:bg-white/8 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

export function FragmentBuilder({
  schema,
  keywords,
  funcoes,
  operadores,
  valores,
  onInsert,
}: FragmentBuilderProps) {
  // Separa as keywords do exercício entre cláusulas estruturais e operadores
  const clausesFromExercise: string[] = [];
  const operatorsFromKeywords: string[] = [];
  for (const kw of keywords) {
    if (STRUCTURAL_CLAUSES.has(kw)) clausesFromExercise.push(kw);
    else operatorsFromKeywords.push(kw);
  }

  // Cláusulas: usa do exercício se houver, senão fallback canônico
  const clauses = clausesFromExercise.length > 0
    ? clausesFromExercise
    : ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT"];

  // Ordenar segundo CLAUSE_ORDER para apresentação consistente
  const orderedClauses = CLAUSE_ORDER.filter((c) => clauses.includes(c));

  // Funções: usa do exercício, senão default pequeno
  const fns = funcoes && funcoes.length > 0 ? funcoes : DEFAULT_FUNCTIONS;

  // Operadores: junta os do exercício + os movidos de keywords
  const opsFromExercise = operadores && operadores.length > 0 ? operadores : [];
  const allOps = Array.from(new Set([...operatorsFromKeywords, ...opsFromExercise]));
  const ops = allOps.length > 0 ? allOps : DEFAULT_OPERATORS;

  return (
    <div className="border border-white/8 rounded-lg bg-[#1e1f29] overflow-hidden">
      <Tabs defaultValue="tabela">
        <TabsList className="w-full bg-[#191a24] rounded-none border-b border-white/8 h-9 px-2 gap-1 justify-start">
          <TabsTrigger value="tabela" className="text-xs px-3 h-7 rounded data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40 hover:text-white/70 transition-colors">
            Tabela
          </TabsTrigger>
          <TabsTrigger value="funcoes" className="text-xs px-3 h-7 rounded data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40 hover:text-white/70 transition-colors">
            Funções
          </TabsTrigger>
          <TabsTrigger value="filtros" className="text-xs px-3 h-7 rounded data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40 hover:text-white/70 transition-colors">
            Filtros & Valores
          </TabsTrigger>
        </TabsList>

        {/* Tab: Tabela */}
        <TabsContent value="tabela" className="mt-0">
          <div className="flex min-h-[160px]">
            {/* Esquerda: cláusulas */}
            <div className="w-36 shrink-0 border-r border-white/8 p-2 space-y-1">
              {orderedClauses.map((kw) => (
                <ClauseButton key={kw} label={kw} onClick={() => onInsert(kw)} />
              ))}
            </div>

            {/* Direita: schema */}
            <div className="flex-1 overflow-y-auto max-h-60">
              {schema.map((table) => (
                <div key={table.nome}>
                  <div className="flex items-center border-b border-white/8 bg-white/3">
                    <button
                      onClick={() => onInsert("*")}
                      className="px-3 py-2 text-xs font-mono font-bold text-white/50 hover:text-white transition-colors border-r border-white/8"
                      title="Inserir asterisco"
                    >
                      *
                    </button>
                    <button
                      onClick={() => onInsert(table.nome)}
                      className="flex-1 px-3 py-2 text-xs font-mono font-semibold text-white/70 hover:text-white text-left transition-colors"
                      title="Inserir nome da tabela"
                    >
                      {table.nome}
                    </button>
                  </div>
                  <div className="divide-y divide-white/4">
                    {table.colunas.map((col) => (
                      <ColRow key={col.nome} label={col.nome} onClick={() => onInsert(col.nome)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab: Funções */}
        <TabsContent value="funcoes" className="mt-0 p-3">
          <div className="flex flex-wrap gap-1.5">
            {fns.map((fn) => (
              <SmallTag key={fn} label={fn} onClick={() => onInsert(fn)} />
            ))}
          </div>
        </TabsContent>

        {/* Tab: Filtros & Valores */}
        <TabsContent value="filtros" className="mt-0 p-3 space-y-3">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Operadores</p>
            <div className="flex flex-wrap gap-1.5">
              {ops.map((op) => (
                <SmallTag key={op} label={op} onClick={() => onInsert(op)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Pontuação</p>
            <div className="flex flex-wrap gap-1.5">
              <PunctButton label="(" onClick={() => onInsert("(")} />
              <PunctButton label=")" onClick={() => onInsert(")")} />
              <PunctButton label="," onClick={() => onInsert(",")} />
            </div>
          </div>
          {valores && valores.length > 0 && (
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Valores do exercício</p>
              <div className="flex flex-wrap gap-1.5">
                {valores.map((v) => (
                  <SmallTag key={v} label={v} onClick={() => onInsert(v)} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
