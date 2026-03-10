import { useState } from 'react'
import { useWPMStore } from '@/stores/wpmStore'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Alternatif } from '@/types'
import { MAX_ALTERNATIF, MIN_ALTERNATIF } from '@/constants'

export function StepInputAlternatif() {
  const kriteria = useWPMStore((s) => s.kriteria)
  const storeAlternatif = useWPMStore((s) => s.alternatif)
  const setAlternatif = useWPMStore((s) => s.setAlternatif)
  const { goNext, goPrev } = useStepProgress()

  const [alternatif, setLocal] = useState<Alternatif[]>(() =>
    storeAlternatif.map((a) => ({
      ...a,
      nilai: { ...Object.fromEntries(kriteria.map((k) => [k.id, 1])), ...a.nilai },
    })),
  )

  function addAlternatif() {
    if (alternatif.length >= MAX_ALTERNATIF) return
    const id = `a${Date.now()}`
    setLocal([
      ...alternatif,
      { id, nama: '', nilai: Object.fromEntries(kriteria.map((k) => [k.id, 1])) },
    ])
  }

  function removeAlternatif(id: string) {
    if (alternatif.length <= MIN_ALTERNATIF) return
    setLocal(alternatif.filter((a) => a.id !== id))
  }

  function updateNama(id: string, nama: string) {
    setLocal(alternatif.map((a) => (a.id === id ? { ...a, nama } : a)))
  }

  function updateNilai(altId: string, kriteriaId: string, val: number) {
    setLocal(
      alternatif.map((a) =>
        a.id === altId ? { ...a, nilai: { ...a.nilai, [kriteriaId]: val } } : a,
      ),
    )
  }

  function handleNext() {
    const valid = alternatif.every((a) => a.nama.trim() !== '')
    if (!valid) return
    setAlternatif(alternatif)
    goNext()
  }

  return (
    <StepCard
      title="2. Input Alternatif"
      description="Masukkan nama alternatif dan nilai untuk setiap kriteria."
    >
      {/* desktop: scrollable table */}
      <div className="hidden sm:block overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gruvbox-border">
              <th className="text-left pb-2 pr-3 text-xs font-mono text-gruvbox-muted">
                Alternatif
              </th>
              {kriteria.map((k) => (
                <th key={k.id} className="text-left pb-2 px-2 text-xs font-mono text-gruvbox-muted">
                  {k.nama || k.id}
                </th>
              ))}
              <th className="pb-2 w-6" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gruvbox-border/30">
            {alternatif.map((a, i) => (
              <tr key={a.id}>
                <td className="pr-3 py-2">
                  <Input
                    placeholder={`Alternatif ${i + 1}`}
                    value={a.nama}
                    onChange={(e) => updateNama(a.id, e.target.value)}
                    className="w-28"
                  />
                </td>
                {kriteria.map((k) => (
                  <td key={k.id} className="px-2 py-2">
                    <Input
                      type="number"
                      min={1}
                      value={a.nilai[k.id] ?? 1}
                      onChange={(e) => updateNilai(a.id, k.id, Number(e.target.value))}
                      className="w-14"
                    />
                  </td>
                ))}
                <td className="py-2 pl-1">
                  <button
                    onClick={() => removeAlternatif(a.id)}
                    disabled={alternatif.length <= MIN_ALTERNATIF}
                    className="text-gruvbox-muted hover:text-gruvbox-red disabled:opacity-30 transition-colors text-xl leading-none"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile: card stack per alternatif */}
      <div className="flex sm:hidden flex-col gap-3 mb-4">
        {alternatif.map((a, i) => (
          <div key={a.id} className="bg-gruvbox-raised/30 rounded-lg p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Input
                placeholder={`Alternatif ${i + 1}`}
                value={a.nama}
                onChange={(e) => updateNama(a.id, e.target.value)}
                className="flex-1 mr-2"
              />
              <button
                onClick={() => removeAlternatif(a.id)}
                disabled={alternatif.length <= MIN_ALTERNATIF}
                className="text-gruvbox-muted hover:text-gruvbox-red disabled:opacity-30 transition-colors text-xl leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {kriteria.map((k) => (
                <div key={k.id} className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-gruvbox-muted truncate">
                    {k.nama || k.id}
                  </span>
                  <Input
                    type="number"
                    min={1}
                    value={a.nilai[k.id] ?? 1}
                    onChange={(e) => updateNilai(a.id, k.id, Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button variant="outline" size="sm" onClick={addAlternatif} disabled={alternatif.length >= MAX_ALTERNATIF}>
          + Tambah Alternatif
        </Button>
        <div className="flex justify-between sm:justify-end gap-2">
          <Button variant="ghost" onClick={goPrev}>← Kembali</Button>
          <Button onClick={handleNext}>Lanjut →</Button>
        </div>
      </div>
    </StepCard>
  )
}
