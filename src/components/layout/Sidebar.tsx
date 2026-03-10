import { useStepProgress } from '@/hooks/useStepProgress'
import { SidebarItem } from './SidebarItem'
import { cn } from '@/lib/utils'
import type { WPMStep } from '@/types'

export function Sidebar() {
  const { steps, currentStep, completedSteps, canAccessStep, goTo } = useStepProgress()

  function handleClick(id: WPMStep) {
    goTo(id)
  }

  return (
    <aside className="hidden md:flex flex-col w-52 flex-shrink-0">
      <div className="sticky top-6">
        <div className="bg-gruvbox-surface border border-gruvbox-border rounded-xl p-3 flex flex-col gap-1">
          <p className="text-[10px] font-mono text-gruvbox-muted uppercase tracking-widest px-3 py-1 mb-1">
            Langkah
          </p>
          {steps.map((step) => (
            <SidebarItem
              key={step.id}
              step={step}
              isActive={currentStep === step.id}
              isCompleted={completedSteps.has(step.id)}
              isLocked={!canAccessStep(step.id)}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

// mobile top progress bar shown below md
export function MobileProgressBar() {
  const { steps, currentStep, completedSteps } = useStepProgress()

  const activeStep = steps.find((s) => s.id === currentStep)

  return (
    <div className="flex md:hidden flex-col w-full bg-gruvbox-surface border-b border-gruvbox-border px-4 pt-2 pb-2.5 gap-2">
      {/* dot row */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {steps.map((step, i) => {
          const isActive = currentStep === step.id
          const isDone = completedSteps.has(step.id)
          return (
            <div key={step.id} className="flex items-center gap-1 flex-shrink-0">
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold transition-all',
                  isActive && 'bg-gruvbox-orange text-gruvbox-bg',
                  isDone && !isActive && 'bg-gruvbox-green text-gruvbox-bg',
                  !isActive && !isDone && 'bg-gruvbox-raised border border-gruvbox-border text-gruvbox-muted',
                )}
              >
                {isDone && !isActive ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'w-3 h-px',
                    isDone ? 'bg-gruvbox-green' : 'bg-gruvbox-border',
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
      {/* active step label */}
      {activeStep && (
        <p className="text-xs font-mono text-gruvbox-orange leading-tight">
          {activeStep.label}
          <span className="text-gruvbox-muted"> — {activeStep.description}</span>
        </p>
      )}
    </div>
  )
}
