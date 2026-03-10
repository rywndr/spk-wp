import { cn } from '@/lib/utils'

interface StepCardProps {
  title: string
  description?: string
  isActive?: boolean
  children: React.ReactNode
  className?: string
}

export function StepCard({
  title,
  description,
  isActive = true,
  children,
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gruvbox-border bg-gruvbox-surface p-6 transition-all duration-300',
        isActive
          ? 'border-l-4 border-l-gruvbox-orange shadow-[0_0_12px_rgba(230,160,80,0.15)]'
          : 'opacity-40 pointer-events-none',
        className,
      )}
    >
      <div className="mb-4">
        <h2 className="text-gruvbox-orange font-semibold text-lg leading-tight">{title}</h2>
        {description && (
          <p className="text-gruvbox-muted text-sm mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}
