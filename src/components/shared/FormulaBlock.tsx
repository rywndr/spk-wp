import { cn } from '@/lib/utils'

export interface FormulaLegendItem {
  symbol: string
  description: string
}

interface FormulaBlockProps {
  // raw formula string rendered in monospace
  formula: string
  // optional list of symbol definitions shown below
  legend?: FormulaLegendItem[]
  className?: string
}

export function FormulaBlock({ formula, legend, className }: FormulaBlockProps) {
  return (
    <div className={cn('rounded-lg border border-gruvbox-border overflow-hidden', className)}>
      {/* formula line */}
      <div className="bg-gruvbox-bg px-4 py-3 overflow-x-auto">
        <span className="font-mono text-sm text-gruvbox-yellow whitespace-nowrap">
          {formula}
        </span>
      </div>

      {/* legend */}
      {legend && legend.length > 0 && (
        <div className="bg-gruvbox-surface border-t border-gruvbox-border px-4 py-2.5 flex flex-wrap gap-x-4 gap-y-1">
          {legend.map((item) => (
            <div key={item.symbol} className="flex items-baseline gap-1.5">
              <span className="font-mono text-xs text-gruvbox-orange">{item.symbol}</span>
              <span className="text-xs text-gruvbox-muted">{item.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
