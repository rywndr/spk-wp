import { useWPM } from '@/hooks/useWPM'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { FormulaBlock } from '@/components/shared/FormulaBlock'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/Button'
import { fmt3, fmtFinal } from '@/utils/wpm'

const FORMULA_LEGEND = [
  { symbol: 'Si', symbolLatex: 'S_i', description: 'nilai vektor S alternatif i' },
  { symbol: 'Prod', symbolLatex: '\\prod', description: 'perkalian berurutan semua kriteria j' },
  { symbol: 'Xij', symbolLatex: 'X_{ij}', description: 'nilai alternatif i pada kriteria j' },
  { symbol: 'Wj', symbolLatex: 'W_j', description: 'bobot ternormalisasi kriteria j' },
  { symbol: '+Wj', symbolLatex: '+W_j', description: 'eksponen positif untuk kriteria benefit' },
  { symbol: '-Wj', symbolLatex: '-W_j', description: 'eksponen negatif untuk kriteria cost' },
]

export function StepVektorS() {
  const { kriteria, alternatif, bobotNormal, vektorS } = useWPM()
  const { goNext, goPrev } = useStepProgress()

  const headers = [
    'Alternatif',
    ...kriteria.map((k) => `${k.nama} (${k.tipe === 'benefit' ? '+Wj' : '-Wj'})`),
    'Si',
  ]

  const rows = alternatif.map((alt) => {
    const sVal = vektorS.find((s) => s.alternatifId === alt.id)?.nilai ?? 0
    const termCells = kriteria.map((k) => {
      const xij = alt.nilai[k.id] ?? 1
      const wj = bobotNormal[k.id] ?? 0
      const exp = k.tipe === 'benefit' ? wj : -wj
      return (
        <span key={k.id} className="font-mono text-xs text-gruvbox-muted">
          {xij}
          <sup className="text-gruvbox-orange">{fmt3(exp)}</sup>
        </span>
      )
    })
    return [
      alt.nama,
      ...termCells,
      <span key="si" className="text-gruvbox-yellow font-semibold font-mono">
        {fmtFinal(sVal)}
      </span>,
    ]
  })

  return (
    <StepCard
      title="4. Hitung Vektor S"
      description="Hitung nilai vektor S untuk setiap alternatif menggunakan perkalian berbobot."
    >
      <FormulaBlock
        latex="S_i = \prod_{j=1}^{n} X_{ij}^{\,W_j} \quad \text{(benefit: } {+W_j} \text{, cost: } {-W_j}\text{)}"
        legend={FORMULA_LEGEND}
        className="mb-5"
      />

      <DataTable headers={headers} rows={rows} highlightCol={headers.length - 1} className="mb-5" />

      <div className="flex justify-between">
        <Button variant="ghost" onClick={goPrev}>← Kembali</Button>
        <Button onClick={goNext}>Lanjut →</Button>
      </div>
    </StepCard>
  )
}
