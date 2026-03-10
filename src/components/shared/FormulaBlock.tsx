import { cn } from '@/lib/utils'

interface FormulaBlockProps {
  children: React.ReactNode
  className?: string
}

export function FormulaBlock({ children, className }: FormulaBlockProps) {
  return (
    <div
      className={cn(
        'font-mono text-sm bg-gruvbox-bg border border-gruvbox-border rounded-lg px-4 py-3',
        'text-gruvbox-yellow leading-relaxed overflow-x-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}
