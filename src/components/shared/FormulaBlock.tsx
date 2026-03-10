import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { cn } from '@/lib/utils'

export interface FormulaLegendItem {
  symbol: string
  // LaTeX for the symbol itself, rendered inline
  symbolLatex?: string
  description: string
}

interface FormulaBlockProps {
  // LaTeX string passed directly to KaTeX (display mode)
  latex: string
  legend?: FormulaLegendItem[]
  className?: string
}

export function FormulaBlock({ latex, legend, className }: FormulaBlockProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        output: 'html',
      })
    } catch {
      return `<span class="text-gruvbox-red">${latex}</span>`
    }
  }, [latex])

  return (
    <div className={cn('rounded-lg border border-gruvbox-border overflow-hidden', className)}>
      {/* KaTeX rendered formula */}
      <div
        className="bg-gruvbox-bg px-4 py-3 overflow-x-auto katex-display-block"
        // biome-ignore lint: KaTeX output is sanitized internally
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* legend strip */}
      {legend && legend.length > 0 && (
        <div className="bg-gruvbox-surface border-t border-gruvbox-border px-4 py-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
          {legend.map((item) => (
            <LegendItem key={item.symbol} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

interface LegendItemProps {
  item: FormulaLegendItem
}

function LegendItem({ item }: LegendItemProps) {
  const symbolHtml = useMemo(() => {
    if (!item.symbolLatex) return null
    try {
      return katex.renderToString(item.symbolLatex, {
        displayMode: false,
        throwOnError: false,
        output: 'html',
      })
    } catch {
      return null
    }
  }, [item.symbolLatex])

  return (
    <div className="flex items-baseline gap-1.5">
      {symbolHtml ? (
        <span
          className="text-gruvbox-orange katex-inline-symbol"
          dangerouslySetInnerHTML={{ __html: symbolHtml }}
        />
      ) : (
        <span className="font-mono text-xs text-gruvbox-orange">{item.symbol}</span>
      )}
      <span className="text-xs text-gruvbox-muted">{item.description}</span>
    </div>
  )
}
