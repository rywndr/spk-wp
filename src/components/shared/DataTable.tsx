import { cn } from '@/lib/utils'

interface DataTableProps {
  headers: string[]
  rows: (string | React.ReactNode)[][]
  highlightCol?: number
  className?: string
}

export function DataTable({ headers, rows, highlightCol, className }: DataTableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-gruvbox-border', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gruvbox-raised border-b border-gruvbox-border">
            {headers.map((h, i) => (
              <th
                key={i}
                className={cn(
                  'px-3 py-2 text-left font-mono text-xs text-gruvbox-muted uppercase tracking-wider',
                  highlightCol === i && 'text-gruvbox-orange',
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-gruvbox-border/50 hover:bg-gruvbox-raised/40 transition-colors"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={cn(
                    'px-3 py-2 text-gruvbox-text font-mono text-xs',
                    highlightCol === ci && 'text-gruvbox-yellow font-semibold',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
