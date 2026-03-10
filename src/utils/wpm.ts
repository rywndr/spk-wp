import type { Criterion, Alternatif, VektorS, VektorV, NilaiTernormalisasi } from '@/types'

// normalize weights so they sum to 1
export function normalisasiBobot(kriteria: Criterion[]): Record<string, number> {
  const total = kriteria.reduce((sum, k) => sum + k.bobot, 0)
  if (total === 0) return {}
  return Object.fromEntries(kriteria.map((k) => [k.id, k.bobot / total]))
}

// compute S vector for each alternative: product of (xij ^ wj)
export function hitungVektorS(
  alternatif: Alternatif[],
  kriteria: Criterion[],
  bobotNormal: Record<string, number>,
): VektorS[] {
  return alternatif.map((alt) => {
    const nilai = kriteria.reduce((product, k) => {
      const xij = alt.nilai[k.id] ?? 1
      const wj = bobotNormal[k.id] ?? 0
      // cost criteria: use negative weight (reciprocal effect)
      const exp = k.tipe === 'benefit' ? wj : -wj
      return product * Math.pow(xij, exp)
    }, 1)
    return { alternatifId: alt.id, nilai }
  })
}

// compute V vector: Si / sum(all Si)
export function hitungVektorV(vektorS: VektorS[]): VektorV[] {
  const total = vektorS.reduce((sum, s) => sum + s.nilai, 0)
  if (total === 0) return vektorS.map((s, i) => ({ ...s, peringkat: i + 1 }))

  const sorted = [...vektorS]
    .map((s) => ({ ...s, nilai: s.nilai / total }))
    .sort((a, b) => b.nilai - a.nilai)

  return sorted.map((s, i) => ({ ...s, peringkat: i + 1 }))
}

// build matrix of normalized display values (for step display only)
export function buildNilaiTernormalisasi(
  alternatif: Alternatif[],
  kriteria: Criterion[],
  bobotNormal: Record<string, number>,
): NilaiTernormalisasi[] {
  const result: NilaiTernormalisasi[] = []
  for (const alt of alternatif) {
    for (const k of kriteria) {
      result.push({
        alternatifId: alt.id,
        kriteriaId: k.id,
        nilai: Math.pow(alt.nilai[k.id] ?? 1, bobotNormal[k.id] ?? 0),
      })
    }
  }
  return result
}

export function formatDecimal(n: number, digits = 4): string {
  return n.toFixed(digits)
}

// intermediate values capped at 3 decimal places
export function fmt3(n: number): string {
  return n.toFixed(3)
}

// final result values: 4 decimal places for full precision
export function fmtFinal(n: number): string {
  return n.toFixed(4)
}
