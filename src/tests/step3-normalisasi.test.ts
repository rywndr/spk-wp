import { describe, it, expect } from 'vitest'
import { normalisasiBobot } from '@/utils/wpm'
import type { Criterion } from '@/types'

const kriteriaFixture: Criterion[] = [
  { id: 'c1', nama: 'Harga',    bobot: 3, tipe: 'cost' },
  { id: 'c2', nama: 'Kualitas', bobot: 5, tipe: 'benefit' },
  { id: 'c3', nama: 'Layanan',  bobot: 4, tipe: 'benefit' },
]

describe('normalisasiBobot', () => {
  it('all normalized weights sum to 1', () => {
    const result = normalisasiBobot(kriteriaFixture)
    const sum = Object.values(result).reduce((a, b) => a + b, 0)
    expect(sum).toBeCloseTo(1, 10)
  })

  it('each weight is proportional to its raw bobot', () => {
    const result = normalisasiBobot(kriteriaFixture)
    // total = 3+5+4 = 12
    expect(result['c1']).toBeCloseTo(3 / 12, 10)
    expect(result['c2']).toBeCloseTo(5 / 12, 10)
    expect(result['c3']).toBeCloseTo(4 / 12, 10)
  })

  it('returns empty object when total bobot is zero', () => {
    const zeroed: Criterion[] = [
      { id: 'c1', nama: 'X', bobot: 0, tipe: 'benefit' },
    ]
    expect(normalisasiBobot(zeroed)).toEqual({})
  })

  it('single criterion gets weight of 1', () => {
    const single: Criterion[] = [
      { id: 'c1', nama: 'X', bobot: 7, tipe: 'benefit' },
    ]
    expect(normalisasiBobot(single)['c1']).toBeCloseTo(1, 10)
  })

  it('equal weights produce equal normalized values', () => {
    const equal: Criterion[] = [
      { id: 'c1', nama: 'A', bobot: 2, tipe: 'benefit' },
      { id: 'c2', nama: 'B', bobot: 2, tipe: 'benefit' },
      { id: 'c3', nama: 'C', bobot: 2, tipe: 'benefit' },
    ]
    const result = normalisasiBobot(equal)
    expect(result['c1']).toBeCloseTo(1 / 3, 10)
    expect(result['c2']).toBeCloseTo(1 / 3, 10)
    expect(result['c3']).toBeCloseTo(1 / 3, 10)
  })
})
