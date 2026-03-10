import { describe, it, expect } from 'vitest'
import { normalisasiBobot, hitungVektorS, hitungVektorV } from '@/utils/wpm'
import type { Criterion, Alternatif } from '@/types'
import { STEP_ORDER, MIN_KRITERIA, MAX_KRITERIA, MIN_ALTERNATIF, MAX_ALTERNATIF } from '@/constants'

// full default dataset used throughout the app
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

describe('Step 1 & 2 — input validation rules', () => {
  it('STEP_ORDER has 6 steps', () => {
    expect(STEP_ORDER).toHaveLength(6)
  })

  it('STEP_ORDER starts with input-kriteria and ends with hasil', () => {
    expect(STEP_ORDER[0]).toBe('input-kriteria')
    expect(STEP_ORDER[STEP_ORDER.length - 1]).toBe('hasil')
  })

  it('kriteria count is within allowed bounds', () => {
    expect(kriteria.length).toBeGreaterThanOrEqual(MIN_KRITERIA)
    expect(kriteria.length).toBeLessThanOrEqual(MAX_KRITERIA)
  })

  it('alternatif count is within allowed bounds', () => {
    expect(alternatif.length).toBeGreaterThanOrEqual(MIN_ALTERNATIF)
    expect(alternatif.length).toBeLessThanOrEqual(MAX_ALTERNATIF)
  })

  it('every criterion has a positive bobot', () => {
    kriteria.forEach((k) => expect(k.bobot).toBeGreaterThan(0))
  })

  it('every criterion tipe is benefit or cost', () => {
    kriteria.forEach((k) => expect(['benefit', 'cost']).toContain(k.tipe))
  })

  it('every alternatif has nilai for every criterion', () => {
    alternatif.forEach((a) => {
      kriteria.forEach((k) => {
        expect(a.nilai[k.id]).toBeDefined()
      })
    })
  })

  it('every nilai value is a positive number', () => {
    alternatif.forEach((a) => {
      Object.values(a.nilai).forEach((v) => expect(v).toBeGreaterThan(0))
    })
  })
})

describe('Full WPM pipeline — end to end', () => {
  const bobotNormal = normalisasiBobot(kriteria)
  const vektorS = hitungVektorS(alternatif, kriteria, bobotNormal)
  const vektorV = hitungVektorV(vektorS)

  it('pipeline produces a result for every alternatif', () => {
    expect(vektorV).toHaveLength(alternatif.length)
  })

  it('winner has peringkat 1', () => {
    expect(vektorV[0].peringkat).toBe(1)
  })

  it('final Vi values sum to 1', () => {
    const sum = vektorV.reduce((acc, v) => acc + v.nilai, 0)
    expect(sum).toBeCloseTo(1, 10)
  })

  it('winner has the highest Vi', () => {
    const maxVi = Math.max(...vektorV.map((v) => v.nilai))
    expect(vektorV[0].nilai).toBe(maxVi)
  })

  it('all alternatif ids in vektorV are present in input', () => {
    const inputIds = new Set(alternatif.map((a) => a.id))
    vektorV.forEach((v) => expect(inputIds.has(v.alternatifId)).toBe(true))
  })

  it('changing a cost value lower improves that alternatif rank', () => {
    // reduce Harga (cost) for a2 from 5 to 1 — should push a2 up
    const improved: Alternatif[] = alternatif.map((a) =>
      a.id === 'a2' ? { ...a, nilai: { ...a.nilai, c1: 1 } } : a,
    )
    const sImproved = hitungVektorS(improved, kriteria, bobotNormal)
    const vImproved = hitungVektorV(sImproved)
    const a2Before = vektorV.find((v) => v.alternatifId === 'a2')!.peringkat
    const a2After  = vImproved.find((v) => v.alternatifId === 'a2')!.peringkat
    expect(a2After).toBeLessThanOrEqual(a2Before)
  })

  it('changing a benefit value higher improves that alternatif rank', () => {
    // increase Kualitas (benefit) for a2 from 3 to 9 — should push a2 up
    const improved: Alternatif[] = alternatif.map((a) =>
      a.id === 'a2' ? { ...a, nilai: { ...a.nilai, c2: 9 } } : a,
    )
    const sImproved = hitungVektorS(improved, kriteria, bobotNormal)
    const vImproved = hitungVektorV(sImproved)
    const a2Before = vektorV.find((v) => v.alternatifId === 'a2')!.peringkat
    const a2After  = vImproved.find((v) => v.alternatifId === 'a2')!.peringkat
    expect(a2After).toBeLessThanOrEqual(a2Before)
  })
})
