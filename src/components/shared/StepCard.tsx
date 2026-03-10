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
        'rounded-xl border border-gruvbox-border bg-gruvbox-surface p-4 sm:p-6 transition-all duration-300',
        isActive
          ? 'border-l-4 border-l-gruvbox-orange'
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
