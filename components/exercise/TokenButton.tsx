"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getDoc, type TokenCategory } from "@/lib/sqlDocs";
import { cn } from "@/lib/utils";

interface TokenButtonProps {
  label: string;
  token?: string;
  category?: TokenCategory;
  onClick: () => void;
  variant?: "clause" | "tag" | "punct" | "schema" | "schema-header";
  className?: string;
  fullWidth?: boolean;
  description?: string;
}

const VARIANT_STYLES: Record<NonNullable<TokenButtonProps["variant"]>, string> = {
  clause:
    "w-full text-left px-3 py-2 rounded-md border border-white/10 bg-white/[0.03] text-xs font-mono font-medium text-[#bd93f9]/90 hover:bg-[#bd93f9]/10 hover:border-[#bd93f9]/40 hover:text-[#bd93f9]",
  tag:
    "px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-xs font-mono text-white/70 hover:bg-white/[0.06] hover:text-white hover:border-white/25",
  punct:
    "w-9 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-sm font-mono font-bold text-white/60 hover:bg-white/[0.06] hover:text-white hover:border-white/25",
  schema:
    "w-full text-left px-3 py-1.5 text-xs font-mono text-white/65 hover:text-white hover:bg-white/[0.05]",
  "schema-header":
    "flex-1 text-left px-3 py-2 text-xs font-mono font-semibold text-white/75 hover:text-white",
};

const CATEGORY_ACCENTS: Record<TokenCategory, string> = {
  clause: "text-[#bd93f9]",     // Dracula purple
  function: "text-[#50fa7b]",   // Dracula green
  operator: "text-[#ff79c6]",   // Dracula pink
  punct: "text-[#f1fa8c]",      // Dracula yellow
  value: "text-[#8be9fd]",      // Dracula cyan
};

const CATEGORY_LABELS: Record<TokenCategory, string> = {
  clause: "Cláusula",
  function: "Função",
  operator: "Operador",
  punct: "Pontuação",
  value: "Valor",
};

export function TokenButton({
  label,
  token,
  onClick,
  variant = "tag",
  className,
  description,
}: TokenButtonProps) {
  const doc = getDoc(token ?? label);

  const trigger = (
    <button
      onClick={onClick}
      className={cn(
        "transition-all duration-150 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/40",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {label}
    </button>
  );

  if (!doc && !description) {
    return trigger;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={trigger} />
      <TooltipContent
        side="top"
        sideOffset={6}
        className="max-w-xs p-0 bg-zinc-900 text-white border border-white/15 shadow-2xl"
      >
        {doc ? (
          <div className="px-3.5 py-3 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className={cn("font-mono text-sm font-bold", CATEGORY_ACCENTS[doc.category])}>
                {doc.title}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                {CATEGORY_LABELS[doc.category]}
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">{doc.description}</p>
            {doc.example && (
              <pre className="text-[11px] font-mono text-white/50 bg-black/40 border border-white/8 rounded px-2 py-1.5 overflow-x-auto leading-relaxed">
                <code>{doc.example}</code>
              </pre>
            )}
          </div>
        ) : (
          <div className="px-3 py-2 text-xs text-white/80">{description}</div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
