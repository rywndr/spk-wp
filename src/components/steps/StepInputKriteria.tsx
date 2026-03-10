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
  { value: 'benefit', label: 'Benefit (↑)' },
  { value: 'cost', label: 'Cost (↓)' },
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
      <FormulaBlock className="mb-5">
        {'Bobot ternormalisasi: Wj = wj / Σwj'}
      </FormulaBlock>

      <div className="flex flex-col gap-3 mb-4">
        {kriteria.map((k, i) => (
          <div
            key={k.id}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-end"
          >
            <Input
              label={i === 0 ? 'Nama Kriteria' : undefined}
              placeholder={`Kriteria ${i + 1}`}
              value={k.nama}
              onChange={(e) => updateKriteria(k.id, 'nama', e.target.value)}
            />
            <Input
              label={i === 0 ? 'Bobot' : undefined}
              type="number"
              min={1}
              max={10}
              value={k.bobot}
              className="w-16"
              onChange={(e) => updateKriteria(k.id, 'bobot', Number(e.target.value))}
            />
            <Select
              label={i === 0 ? 'Tipe' : undefined}
              options={TIPE_OPTIONS}
              value={k.tipe}
              onChange={(e) => updateKriteria(k.id, 'tipe', e.target.value)}
            />
            <button
              onClick={() => removeKriteria(k.id)}
              disabled={kriteria.length <= MIN_KRITERIA}
              className="mb-0.5 text-gruvbox-muted hover:text-gruvbox-red disabled:opacity-30 transition-colors text-lg leading-none"
              aria-label="Hapus kriteria"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={addKriteria}
            disabled={kriteria.length >= MAX_KRITERIA}
          >
            + Tambah Kriteria
          </Button>
          <div className="flex items-center gap-1.5">
            {kriteria.map((k) => (
              <Badge key={k.id} variant={k.tipe}>
                {k.tipe === 'benefit' ? '↑' : '↓'}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gruvbox-muted">
            Σw = <span className="text-gruvbox-yellow">{totalBobot}</span>
          </span>
          <Button onClick={handleNext}>Lanjut →</Button>
        </div>
      </div>
    </StepCard>
  )
}
