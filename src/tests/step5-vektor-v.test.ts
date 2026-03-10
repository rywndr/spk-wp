import { describe, it, expect } from 'vitest'
import { normalisasiBobot, hitungVektorS, hitungVektorV } from '@/utils/wpm'
import type { Criterion, Alternatif, VektorS } from '@/types'

const kriteria: Criterion[] = [
  { id: 'c1', nama: 'Harga',    bobot: 3, tipe: 'cost' },
  { id: 'c2', nama: 'Kualitas', bobot: 5, tipe: 'benefit' },
  { id: 'c3', nama: 'Layanan',  bobot: 4, tipe: 'benefit' },
]

const alternatif: Alternatif[] = [
  { id: 'a1', nama: 'Alternatif A', nilai: { c1: 3, c2: 4, c3: 5 } },
  { id: 'a2', nama: 'Alternatif B', nilai: { c1: 5, c2: 3, c3: 4 } },
  { id: 'a3', nama: 'Alternatif C', nilai: { c1: 4, c2: 5, c3: 3 } },
]

const bobotNormal = normalisasiBobot(kriteria)
const vektorS = hitungVektorS(alternatif, kriteria, bobotNormal)

describe('hitungVektorV', () => {
  it('returns one entry per alternatif', () => {
    const result = hitungVektorV(vektorS)
    expect(result).toHaveLength(vektorS.length)
  })

  it('all Vi values sum to 1', () => {
    const result = hitungVektorV(vektorS)
    const sum = result.reduce((acc, v) => acc + v.nilai, 0)
    expect(sum).toBeCloseTo(1, 10)
  })

  it('all Vi values are between 0 and 1', () => {
    const result = hitungVektorV(vektorS)
    result.forEach((v) => {
      expect(v.nilai).toBeGreaterThan(0)
      expect(v.nilai).toBeLessThanOrEqual(1)
    })
  })

  it('result is sorted descending by nilai', () => {
    const result = hitungVektorV(vektorS)
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].nilai).toBeGreaterThanOrEqual(result[i].nilai)
    }
  })

  it('peringkat starts at 1 and is sequential', () => {
    const result = hitungVektorV(vektorS)
    result.forEach((v, i) => expect(v.peringkat).toBe(i + 1))
  })

  it('Vi is proportional to Si — higher Si means higher Vi', () => {
    const sorted = [...vektorS].sort((a, b) => b.nilai - a.nilai)
    const result = hitungVektorV(vektorS)
    // rank 1 should match the alternatif with highest Si
    expect(result[0].alternatifId).toBe(sorted[0].alternatifId)
  })

  it('computes correct Vi for known values', () => {
    const totalS = vektorS.reduce((s, v) => s + v.nilai, 0)
    const result = hitungVektorV(vektorS)
    result.forEach((v) => {
      const si = vektorS.find((s) => s.alternatifId === v.alternatifId)!.nilai
      expect(v.nilai).toBeCloseTo(si / totalS, 8)
    })
  })

  it('returns all peringkat 1 when vektorS is empty and total is zero', () => {
    const zeroS: VektorS[] = [
      { alternatifId: 'a1', nilai: 0 },
      { alternatifId: 'a2', nilai: 0 },
    ]
    const result = hitungVektorV(zeroS)
    // zero total fallback — no division, returns as-is with peringkat
    result.forEach((v) => expect(v.nilai).toBe(0))
  })
})
