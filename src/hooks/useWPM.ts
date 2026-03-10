import { useMemo } from 'react'
import { useWPMStore } from '@/stores/wpmStore'
import {
  normalisasiBobot,
  hitungVektorS,
  hitungVektorV,
  buildNilaiTernormalisasi,
} from '@/utils/wpm'

// single hook that exposes all derived WPM computation results
export function useWPM() {
  const kriteria = useWPMStore((s) => s.kriteria)
  const alternatif = useWPMStore((s) => s.alternatif)

  const bobotNormal = useMemo(
    () => normalisasiBobot(kriteria),
    [kriteria],
  )

  const vektorS = useMemo(
    () => hitungVektorS(alternatif, kriteria, bobotNormal),
    [alternatif, kriteria, bobotNormal],
  )

  const vektorV = useMemo(
    () => hitungVektorV(vektorS),
    [vektorS],
  )

  const nilaiTernormalisasi = useMemo(
    () => buildNilaiTernormalisasi(alternatif, kriteria, bobotNormal),
    [alternatif, kriteria, bobotNormal],
  )

  return { kriteria, alternatif, bobotNormal, vektorS, vektorV, nilaiTernormalisasi }
}
