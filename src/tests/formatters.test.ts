import { describe, it, expect } from 'vitest'
import { formatDecimal, fmt3, fmtFinal } from '@/utils/wpm'

describe('formatDecimal', () => {
  it('defaults to 4 decimal places', () => {
    expect(formatDecimal(1 / 3)).toBe('0.3333')
  })

  it('respects explicit digits argument', () => {
    expect(formatDecimal(1 / 3, 2)).toBe('0.33')
    expect(formatDecimal(1 / 3, 6)).toBe('0.333333')
  })

  it('pads with trailing zeros when needed', () => {
    expect(formatDecimal(1.5, 4)).toBe('1.5000')
  })

  it('handles zero correctly', () => {
    expect(formatDecimal(0)).toBe('0.0000')
  })
})

describe('fmt3', () => {
  it('always produces 3 decimal places', () => {
    expect(fmt3(1 / 3)).toBe('0.333')
    expect(fmt3(0.5)).toBe('0.500')
    expect(fmt3(0)).toBe('0.000')
  })

  it('rounds correctly at 3rd decimal', () => {
    // 1/6 = 0.16666... rounds to 0.167
    expect(fmt3(1 / 6)).toBe('0.167')
  })
})

describe('fmtFinal', () => {
  it('always produces 4 decimal places', () => {
    expect(fmtFinal(0.3571)).toBe('0.3571')
    expect(fmtFinal(1)).toBe('1.0000')
  })

  it('rounds correctly at 4th decimal', () => {
    // 1/3 = 0.33333... rounds to 0.3333
    expect(fmtFinal(1 / 3)).toBe('0.3333')
  })

  it('handles values less than 1 correctly', () => {
    expect(fmtFinal(0.25)).toBe('0.2500')
  })
})
