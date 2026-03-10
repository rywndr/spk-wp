import { useWPM } from '@/hooks/useWPM'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { FormulaBlock } from '@/components/shared/FormulaBlock'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/Button'
import { formatDecimal } from '@/utils/wpm'

const FORMULA_LEGEND = [
  { symbol: 'Vi', description: 'nilai preferensi relatif alternatif i' },
  { symbol: 'Si', description: 'nilai vektor S alternatif i' },
  { symbol: 'Σ Si', description: 'jumlah seluruh nilai vektor S' },
]

export function StepVektorV() {
  const { alternatif, vektorS, vektorV } = useWPM()
  const { goNext, goPrev } = useStepProgress()

  const totalS = vektorS.reduce((s, v) => s + v.nilai, 0)

  const headers = ['Alternatif', 'Si', 'Σ Si', 'Vi = Si / Σ Si']
  const rows = vektorV.map((v) => {
    const si = vektorS.find((s) => s.alternatifId === v.alternatifId)?.nilai ?? 0
    const altNama = alternatif.find((a) => a.id === v.alternatifId)?.nama ?? v.alternatifId
    return [
      altNama,
      <span key="si" className="font-mono text-gruvbox-muted">{formatDecimal(si)}</span>,
      <span key="ts" className="font-mono text-gruvbox-muted">{formatDecimal(totalS)}</span>,
      <span key="vi" className="text-gruvbox-yellow font-semibold font-mono">
        {formatDecimal(v.nilai)}
      </span>,
    ]
  })

  return (
    <StepCard
      title="5. Hitung Vektor V"
      description="Hitung nilai preferensi relatif setiap alternatif terhadap total."
    >
      <FormulaBlock
        formula={`Vi = Si / Σ Si    (Σ Si = ${formatDecimal(totalS)})`}
        legend={FORMULA_LEGEND}
        className="mb-5"
      />

      <DataTable headers={headers} rows={rows} highlightCol={3} className="mb-5" />

      <div className="flex justify-between">
        <Button variant="ghost" onClick={goPrev}>← Kembali</Button>
        <Button onClick={goNext}>Lihat Hasil →</Button>
      </div>
    </StepCard>
  )
}
