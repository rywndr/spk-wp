import type { StepDefinition, WPMStep } from '@/types'

export const STEPS: StepDefinition[] = [
  {
    id: 'input-kriteria',
    label: 'Kriteria & Bobot',
    description: 'Tentukan kriteria dan bobot kepentingan',
    index: 0,
  },
  {
    id: 'input-alternatif',
    label: 'Alternatif',
    description: 'Masukkan nilai setiap alternatif',
    index: 1,
  },
  {
    id: 'normalisasi-bobot',
    label: 'Normalisasi Bobot',
    description: 'Hitung bobot ternormalisasi (Wj)',
    index: 2,
  },
  {
    id: 'hitung-vektor-s',
    label: 'Vektor S',
    description: 'Hitung nilai vektor S tiap alternatif',
    index: 3,
  },
  {
    id: 'hitung-vektor-v',
    label: 'Vektor V',
    description: 'Hitung nilai vektor V (preferensi relatif)',
    index: 4,
  },
  {
    id: 'hasil',
    label: 'Hasil Akhir',
    description: 'Peringkat alternatif terbaik',
    index: 5,
  },
]

export const STEP_ORDER: WPMStep[] = STEPS.map((s) => s.id)

export const MIN_KRITERIA = 2
export const MAX_KRITERIA = 8
export const MIN_ALTERNATIF = 2
export const MAX_ALTERNATIF = 10
