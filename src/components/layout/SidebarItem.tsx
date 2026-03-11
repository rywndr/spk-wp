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
        'w-full flex items-start gap-3 px-3 py-2.5 text-left border-2 transition-all duration-150',
        isActive && 'bg-gruvbox-raised border-gruvbox-orange [box-shadow:2px_2px_0px_0px_#e6a050]',
        !isActive && !isLocked && 'border-transparent hover:border-gruvbox-border hover:bg-gruvbox-raised',
        isLocked && 'border-transparent opacity-40 cursor-not-allowed',
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {isCompleted ? (
          <div className="w-4 h-4 bg-gruvbox-green border-2 border-gruvbox-green flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4L3 5.5L6.5 2" stroke="#1d2021" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : isActive ? (
          <div className="w-4 h-4 border-2 border-gruvbox-orange bg-gruvbox-orange/20" />
        ) : (
          <div className="w-4 h-4 border-2 border-gruvbox-border" />
        )}
      </div>
      <div className="min-w-0">
        <div
          className={cn(
            'text-xs font-mono font-black uppercase tracking-wide leading-tight',
            isActive && 'text-gruvbox-orange [text-shadow:1px_1px_0px_#3c3836]',
            isCompleted && !isActive && 'text-gruvbox-text',
            (isLocked || (!isActive && !isCompleted)) && 'text-gruvbox-muted',
          )}
        >
          {step.label}
        </div>
        {isActive && (
          <div className="text-[10px] font-mono text-gruvbox-muted mt-0.5 leading-tight normal-case tracking-normal font-normal">
            {step.description}
          </div>
        )}
      </div>
    </button>
  )
}