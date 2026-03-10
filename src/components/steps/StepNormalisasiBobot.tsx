import { useWPM } from '@/hooks/useWPM'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { FormulaBlock } from '@/components/shared/FormulaBlock'
import { DataTable } from '@/components/shared/DataTable'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/ui/Button'
import { fmt3 } from '@/utils/wpm'

const FORMULA_LEGEND = [
  { symbol: 'Wj', symbolLatex: 'W_j', description: 'bobot ternormalisasi kriteria j' },
  { symbol: 'wj', symbolLatex: 'w_j', description: 'bobot asli kriteria j' },
  { symbol: 'Swj', symbolLatex: '\\sum w_j', description: 'jumlah semua bobot asli' },
]

export function StepNormalisasiBobot() {
  const { kriteria, bobotNormal } = useWPM()
  const { goNext, goPrev } = useStepProgress()

  const totalBobot = kriteria.reduce((s, k) => s + k.bobot, 0)

  const headers = ['Kriteria', 'Tipe', 'Bobot (wj)', 'Wj = wj / Σwj']
  const rows = kriteria.map((k) => [
    k.nama,
    <Badge key={k.id} variant={k.tipe}>{k.tipe}</Badge>,
    String(k.bobot),
    <span key={k.id} className="text-gruvbox-yellow font-mono">
      {fmt3(bobotNormal[k.id] ?? 0)}
    </span>,
  ])

  const sumRow = [
    <span key="sum" className="text-gruvbox-muted">Σ</span>,
    '',
    <span key="tw" className="text-gruvbox-orange font-semibold">{totalBobot}</span>,
    <span key="tw1" className="text-gruvbox-green font-semibold">1.000</span>,
  ]

  return (
    <StepCard
      title="3. Normalisasi Bobot"
      description="Hitung bobot ternormalisasi agar total bobot sama dengan 1."
    >
      <FormulaBlock
        latex={`W_j = \\dfrac{w_j}{\\sum w_j} \\quad (\\sum w_j = ${totalBobot})`}
        legend={FORMULA_LEGEND}
        className="mb-5"
      />

      <DataTable headers={headers} rows={[...rows, sumRow]} highlightCol={3} className="mb-5" />

      <div className="flex justify-between">
        <Button variant="ghost" onClick={goPrev}>← Kembali</Button>
        <Button onClick={goNext}>Lanjut →</Button>
      </div>
    </StepCard>
  )
}
