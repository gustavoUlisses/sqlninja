import type { TabelaSchema } from "@/lib/types";

interface SchemaPanelProps {
  schema: TabelaSchema[];
}

export function SchemaPanel({ schema }: SchemaPanelProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-white/25 uppercase tracking-widest font-medium">
        Schema
      </p>
      {schema.map((table) => (
        <div key={table.nome} className="rounded-lg border border-white/8 overflow-hidden">
          <div className="bg-white/4 px-3 py-2">
            <span className="text-xs font-mono font-semibold text-white/60">
              {table.nome}
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {table.colunas.map((col) => (
              <div key={col.nome} className="flex items-center justify-between px-3 py-1.5">
                <span className="text-xs font-mono text-white/70">{col.nome}</span>
                <span className="text-xs font-mono text-white/25">{col.tipo}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
