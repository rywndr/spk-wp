import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'benefit' | 'cost' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium',
        variant === 'benefit' && 'bg-gruvbox-green/20 text-gruvbox-green border border-gruvbox-green/30',
        variant === 'cost' && 'bg-gruvbox-red/20 text-gruvbox-red border border-gruvbox-red/30',
        variant === 'neutral' && 'bg-gruvbox-raised text-gruvbox-muted border border-gruvbox-border',
        className,
      )}
    >
      {children}
    </span>
  )
}
