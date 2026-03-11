import { useState } from 'react'
import { useWPMStore } from '@/stores/wpmStore'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { FormulaBlock } from '@/components/shared/FormulaBlock'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { Criterion } from '@/types'
import { MAX_KRITERIA, MIN_KRITERIA } from '@/constants'

const TIPE_OPTIONS = [
  { value: 'benefit', label: 'Benefit ↑' },
  { value: 'cost', label: 'Cost ↓' },
]

const FORMULA_LEGEND = [
  { symbol: 'Wj', symbolLatex: 'W_j', description: 'bobot ternormalisasi kriteria j' },
  { symbol: 'wj', symbolLatex: 'w_j', description: 'bobot asli kriteria j' },
  { symbol: 'Swj', symbolLatex: '\\sum w_j', description: 'jumlah semua bobot awal dari semua kriteria' },
]

export function StepInputKriteria() {
  const storeKriteria = useWPMStore((s) => s.kriteria)
  const setKriteria = useWPMStore((s) => s.setKriteria)
  const { goNext } = useStepProgress()

  const [kriteria, setLocal] = useState<Criterion[]>(storeKriteria)

  function addKriteria() {
    if (kriteria.length >= MAX_KRITERIA) return
    const id = `c${Date.now()}`
    setLocal([...kriteria, { id, nama: '', bobot: 1, tipe: 'benefit' }])
  }

  function removeKriteria(id: string) {
    if (kriteria.length <= MIN_KRITERIA) return
    setLocal(kriteria.filter((k) => k.id !== id))
  }

  function updateKriteria(id: string, field: keyof Criterion, value: string | number) {
    setLocal(kriteria.map((k) => (k.id === id ? { ...k, [field]: value } : k)))
  }

  function handleNext() {
    const valid = kriteria.every((k) => k.nama.trim() !== '' && k.bobot > 0)
    if (!valid) return
    setKriteria(kriteria)
    goNext()
  }

  const totalBobot = kriteria.reduce((s, k) => s + Number(k.bobot), 0)

  return (
    <StepCard
      title="1. Input Kriteria & Bobot"
      description="Tentukan kriteria penilaian, bobot kepentingan, dan tipe kriteria."
    >
      <FormulaBlock
        latex="W_j = \dfrac{w_j}{\sum w_j}"
        legend={FORMULA_LEGEND}
        className="mb-5"
      />

      <div className="flex flex-col gap-2 mb-4">
        {/* header row — hidden on mobile, shown on sm+ */}
        <div className="hidden sm:grid grid-cols-[1fr_56px_116px_24px] gap-2 px-1">
          <span className="text-xs font-mono text-gruvbox-muted">Nama Kriteria</span>
          <span className="text-xs font-mono text-gruvbox-muted">Bobot</span>
          <span className="text-xs font-mono text-gruvbox-muted">Tipe</span>
          <span />
        </div>

        {kriteria.map((k, i) => (
          <div key={k.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_56px_116px_24px] gap-2 sm:items-center bg-gruvbox-raised/30 sm:bg-transparent rounded-lg sm:rounded-none p-2 sm:p-0">
            {/* mobile-only label */}
            <span className="sm:hidden text-[10px] font-mono text-gruvbox-muted uppercase tracking-wider">
              Kriteria {i + 1}
            </span>
            <Input
              placeholder={`Kriteria ${i + 1}`}
              value={k.nama}
              onChange={(e) => updateKriteria(k.id, 'nama', e.target.value)}
            />
            <div className="flex gap-2 sm:contents">
              <Input
                type="number"
                min={1}
                max={10}
                value={k.bobot}
                className="w-14 sm:w-full"
                onChange={(e) => updateKriteria(k.id, 'bobot', Number(e.target.value))}
              />
              <Select
                options={TIPE_OPTIONS}
                value={k.tipe}
                className="flex-1 sm:flex-none"
                onChange={(e) => updateKriteria(k.id, 'tipe', e.target.value)}
              />
              <button
                onClick={() => removeKriteria(k.id)}
                disabled={kriteria.length <= MIN_KRITERIA}
                className="text-gruvbox-muted hover:text-gruvbox-red disabled:opacity-30 transition-colors text-xl leading-none self-center"
                aria-label="Hapus kriteria"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={addKriteria}
            disabled={kriteria.length >= MAX_KRITERIA}
          >
            + Tambah Kriteria
          </Button>
          <div className="flex items-center gap-1">
            {kriteria.map((k) => (
              <Badge key={k.id} variant={k.tipe}>
                {k.tipe === 'benefit' ? '↑' : '↓'}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-mono text-gruvbox-muted">
            Σw = <span className="text-gruvbox-yellow">{totalBobot}</span>
          </span>
          <Button onClick={handleNext}>Lanjut →</Button>
        </div>
      </div>
    </StepCard>
  )
}
