import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        variant === 'primary' &&
          'bg-gruvbox-orange text-gruvbox-bg hover:bg-gruvbox-yellow active:scale-95',
        variant === 'ghost' &&
          'text-gruvbox-muted hover:text-gruvbox-text hover:bg-gruvbox-raised',
        variant === 'outline' &&
          'border border-gruvbox-border text-gruvbox-text hover:border-gruvbox-orange hover:text-gruvbox-orange',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
