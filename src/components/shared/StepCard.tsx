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
        'relative border-2 bg-gruvbox-surface p-4 sm:p-6 transition-all duration-150',
        isActive
          ? 'border-gruvbox-orange [box-shadow:4px_4px_0px_0px_#e6a050]'
          : 'border-gruvbox-border [box-shadow:4px_4px_0px_0px_#504945] opacity-40 pointer-events-none',
        className,
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gruvbox-orange" />
      )}
      <div className="mb-4">
        <h2
          className={cn(
            'font-black text-lg uppercase tracking-wide leading-tight',
            isActive
              ? 'text-gruvbox-orange [text-shadow:2px_2px_0px_#3c3836]'
              : 'text-gruvbox-muted',
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="text-gruvbox-muted text-sm mt-1 font-medium">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}