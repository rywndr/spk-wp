import { cn } from '@/lib/utils'
import type { StepDefinition, WPMStep } from '@/types'

interface SidebarItemProps {
  step: StepDefinition
  isActive: boolean
  isCompleted: boolean
  isLocked: boolean
  onClick: (id: WPMStep) => void
}

export function SidebarItem({
  step,
  isActive,
  isCompleted,
  isLocked,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={() => !isLocked && onClick(step.id)}
      disabled={isLocked}
      className={cn(
        'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
        isActive && 'bg-gruvbox-raised border border-gruvbox-border',
        !isActive && !isLocked && 'hover:bg-gruvbox-raised/50',
        isLocked && 'opacity-40 cursor-not-allowed',
      )}
    >
      {/* step indicator dot */}
      <div className="flex-shrink-0 mt-0.5">
        {isCompleted ? (
          <div className="w-4 h-4 rounded-full bg-gruvbox-green flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4L3 5.5L6.5 2" stroke="#1d2021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : isActive ? (
          <div className="w-4 h-4 rounded-full border-2 border-gruvbox-orange bg-gruvbox-orange/20" />
        ) : (
          <div className="w-4 h-4 rounded-full border border-gruvbox-border" />
        )}
      </div>

      <div className="min-w-0">
        <div
          className={cn(
            'text-xs font-medium leading-tight',
            isActive && 'text-gruvbox-orange',
            isCompleted && !isActive && 'text-gruvbox-text',
            isLocked && 'text-gruvbox-muted',
            !isActive && !isCompleted && !isLocked && 'text-gruvbox-muted',
          )}
        >
          {step.label}
        </div>
        {isActive && (
          <div className="text-[10px] text-gruvbox-muted mt-0.5 leading-tight">
            {step.description}
          </div>
        )}
      </div>
    </button>
  )
}
