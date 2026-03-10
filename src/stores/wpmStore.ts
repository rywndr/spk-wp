import { create } from 'zustand'
import type { Criterion, Alternatif, WPMStep } from '@/types'
import { STEP_ORDER } from '@/constants'
import {
  normalisasiBobot,
  hitungVektorS,
  hitungVektorV,
} from '@/utils/wpm'

interface WPMState {
  currentStep: WPMStep
  completedSteps: Set<WPMStep>

  kriteria: Criterion[]
  alternatif: Alternatif[]

  // derived — computed on demand
  bobotNormal: Record<string, number>

  // actions
  setStep: (step: WPMStep) => void
  completeStep: (step: WPMStep) => void
  canAccessStep: (step: WPMStep) => boolean

  setKriteria: (kriteria: Criterion[]) => void
  setAlternatif: (alternatif: Alternatif[]) => void
  computeAll: () => void
  reset: () => void
}

const defaultKriteria: Criterion[] = [
  { id: 'c1', nama: 'Harga', bobot: 3, tipe: 'cost' },
  { id: 'c2', nama: 'Kualitas', bobot: 5, tipe: 'benefit' },
  { id: 'c3', nama: 'Layanan', bobot: 4, tipe: 'benefit' },
]

const defaultAlternatif: Alternatif[] = [
  { id: 'a1', nama: 'Alternatif A', nilai: { c1: 3, c2: 4, c3: 5 } },
  { id: 'a2', nama: 'Alternatif B', nilai: { c1: 5, c2: 3, c3: 4 } },
  { id: 'a3', nama: 'Alternatif C', nilai: { c1: 4, c2: 5, c3: 3 } },
]

export const useWPMStore = create<WPMState>((set, get) => ({
  currentStep: 'input-kriteria',
  completedSteps: new Set(),

  kriteria: defaultKriteria,
  alternatif: defaultAlternatif,
  bobotNormal: normalisasiBobot(defaultKriteria),

  setStep: (step) => set({ currentStep: step }),

  completeStep: (step) =>
    set((state) => ({
      completedSteps: new Set([...state.completedSteps, step]),
    })),

  canAccessStep: (step) => {
    const { completedSteps } = get()
    const idx = STEP_ORDER.indexOf(step)
    // first step always accessible
    if (idx === 0) return true
    // all previous steps must be completed
    return STEP_ORDER.slice(0, idx).every((s) => completedSteps.has(s))
  },

  setKriteria: (kriteria) =>
    set({ kriteria, bobotNormal: normalisasiBobot(kriteria) }),

  setAlternatif: (alternatif) => set({ alternatif }),

  computeAll: () => {
    const { kriteria, alternatif, bobotNormal } = get()
    // side-effect free — results derived in hooks/components
    void hitungVektorS(alternatif, kriteria, bobotNormal)
    void hitungVektorV([])
  },

  reset: () =>
    set({
      currentStep: 'input-kriteria',
      completedSteps: new Set(),
      kriteria: defaultKriteria,
      alternatif: defaultAlternatif,
      bobotNormal: normalisasiBobot(defaultKriteria),
    }),
}))
