import { useWPM } from '@/hooks/useWPM'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { FormulaBlock } from '@/components/shared/FormulaBlock'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/Button'
import { fmt3, fmtFinal } from '@/utils/wpm'

const FORMULA_LEGEND = [
  { symbol: 'Vi', symbolLatex: 'V_i', description: 'nilai preferensi relatif alternatif i' },
  { symbol: 'Si', symbolLatex: 'S_i', description: 'nilai vektor S alternatif i' },
  { symbol: 'SSi', symbolLatex: '\\sum S_i', description: 'jumlah seluruh nilai vektor S' },
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
      <span key="si" className="font-mono text-gruvbox-muted">{fmt3(si)}</span>,
      <span key="ts" className="font-mono text-gruvbox-muted">{fmt3(totalS)}</span>,
      <span key="vi" className="text-gruvbox-yellow font-semibold font-mono">
        {fmtFinal(v.nilai)}
      </span>,
    ]
  })

  return (
    <StepCard
      title="5. Hitung Vektor V"
      description="Hitung nilai preferensi relatif setiap alternatif terhadap total."
    >
      <FormulaBlock
        latex={`V_i = \\dfrac{S_i}{\\sum_{i=1}^{m} S_i} \\quad (\\textstyle\\sum S_i = ${fmt3(totalS)})`}
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
