import { describe, it, expect } from 'vitest'
import { normalisasiBobot, hitungVektorS } from '@/utils/wpm'
import type { Criterion, Alternatif } from '@/types'

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

describe('hitungVektorS', () => {
  it('returns one entry per alternatif', () => {
    const result = hitungVektorS(alternatif, kriteria, bobotNormal)
    expect(result).toHaveLength(alternatif.length)
  })

  it('each alternatif id is preserved', () => {
    const result = hitungVektorS(alternatif, kriteria, bobotNormal)
    const ids = result.map((r) => r.alternatifId)
    expect(ids).toEqual(['a1', 'a2', 'a3'])
  })

  it('all Si values are positive', () => {
    const result = hitungVektorS(alternatif, kriteria, bobotNormal)
    result.forEach((r) => expect(r.nilai).toBeGreaterThan(0))
  })

  it('benefit criterion raises Si when value is higher', () => {
    // two alternatifs, one criterion (benefit), higher value should win
    const k: Criterion[] = [{ id: 'k1', nama: 'Q', bobot: 1, tipe: 'benefit' }]
    const w = normalisasiBobot(k)
    const alts: Alternatif[] = [
      { id: 'a1', nama: 'Low',  nilai: { k1: 2 } },
      { id: 'a2', nama: 'High', nilai: { k1: 5 } },
    ]
    const [low, high] = hitungVektorS(alts, k, w)
    expect(high.nilai).toBeGreaterThan(low.nilai)
  })

  it('cost criterion lowers Si when value is higher', () => {
    // higher cost value should produce lower Si
    const k: Criterion[] = [{ id: 'k1', nama: 'Price', bobot: 1, tipe: 'cost' }]
    const w = normalisasiBobot(k)
    const alts: Alternatif[] = [
      { id: 'a1', nama: 'Cheap',     nilai: { k1: 2 } },
      { id: 'a2', nama: 'Expensive', nilai: { k1: 5 } },
    ]
    const [cheap, expensive] = hitungVektorS(alts, k, w)
    expect(cheap.nilai).toBeGreaterThan(expensive.nilai)
  })

  it('missing nilai defaults to 1 (neutral for any exponent)', () => {
    const k: Criterion[] = [{ id: 'k1', nama: 'Q', bobot: 1, tipe: 'benefit' }]
    const w = normalisasiBobot(k)
    const alts: Alternatif[] = [
      { id: 'a1', nama: 'Missing', nilai: {} },
    ]
    const [result] = hitungVektorS(alts, k, w)
    // 1^w = 1
    expect(result.nilai).toBeCloseTo(1, 10)
  })

  it('computes correct Si for known values', () => {
    // W = [3/12, 5/12, 4/12], A = [3,4,5]
    // Si = 3^(-3/12) * 4^(5/12) * 5^(4/12)
    const w = bobotNormal
    const expected =
      Math.pow(3, -(3 / 12)) *
      Math.pow(4, 5 / 12) *
      Math.pow(5, 4 / 12)
    const result = hitungVektorS([alternatif[0]], kriteria, w)
    expect(result[0].nilai).toBeCloseTo(expected, 8)
  })
})
