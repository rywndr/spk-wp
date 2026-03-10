import { useWPMStore } from '@/stores/wpmStore'
import { STEPS, STEP_ORDER } from '@/constants'
import type { WPMStep } from '@/types'

export function useStepProgress() {
  const currentStep = useWPMStore((s) => s.currentStep)
  const completedSteps = useWPMStore((s) => s.completedSteps)
  const setStep = useWPMStore((s) => s.setStep)
  const completeStep = useWPMStore((s) => s.completeStep)
  const canAccessStep = useWPMStore((s) => s.canAccessStep)

  const currentIndex = STEP_ORDER.indexOf(currentStep)

  function goNext() {
    completeStep(currentStep)
    const next = STEP_ORDER[currentIndex + 1]
    if (next) setStep(next)
  }

  function goPrev() {
    const prev = STEP_ORDER[currentIndex - 1]
    if (prev) setStep(prev)
  }

  function goTo(step: WPMStep) {
    if (canAccessStep(step)) setStep(step)
  }

  const isFirst = currentIndex === 0
  const isLast = currentIndex === STEP_ORDER.length - 1

  return {
    currentStep,
    currentIndex,
    completedSteps,
    steps: STEPS,
    isFirst,
    isLast,
    goNext,
    goPrev,
    goTo,
    canAccessStep,
  }
}
