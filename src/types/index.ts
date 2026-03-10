export interface Criterion {
  id: string
  nama: string
  // bobot as a raw number 1-5, normalized in utils
  bobot: number
  // 'benefit' = bigger is better, 'cost' = smaller is better
  tipe: 'benefit' | 'cost'
}

export interface Alternatif {
  id: string
  nama: string
  // keyed by criterion id
  nilai: Record<string, number>
}

export interface NilaiTernormalisasi {
  alternatifId: string
  kriteriaId: string
  nilai: number
}

export interface VektorS {
  alternatifId: string
  nilai: number
}

export interface VektorV {
  alternatifId: string
  nilai: number
  peringkat: number
}

export type WPMStep =
  | 'input-kriteria'
  | 'input-alternatif'
  | 'normalisasi-bobot'
  | 'hitung-vektor-s'
  | 'hitung-vektor-v'
  | 'hasil'

export interface StepDefinition {
  id: WPMStep
  label: string
  description: string
  index: number
}
