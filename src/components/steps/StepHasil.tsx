import { useWPM } from '@/hooks/useWPM'
import { useStepProgress } from '@/hooks/useStepProgress'
import { StepCard } from '@/components/shared/StepCard'
import { Button } from '@/components/ui/Button'
import { fmtFinal } from '@/utils/wpm'
import { cn } from '@/lib/utils'
import { useWPMStore } from '@/stores/wpmStore'

export function StepHasil() {
  const { alternatif, vektorV } = useWPM()
  const { goPrev } = useStepProgress()
  const reset = useWPMStore((s) => s.reset)

  const winner = vektorV[0]
  const winnerNama = alternatif.find((a) => a.id === winner?.alternatifId)?.nama ?? '-'

  return (
    <StepCard title="6. Hasil Akhir" description="Peringkat alternatif berdasarkan nilai Vi.">
      {/* winner highlight */}
      <div className="mb-6 p-4 rounded-xl bg-gruvbox-raised border border-gruvbox-orange/40 shadow-[0_0_20px_rgba(230,160,80,0.1)]">
        <p className="text-xs font-mono text-gruvbox-muted mb-1 uppercase tracking-widest">
          Alternatif Terbaik
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gruvbox-orange flex items-center justify-center font-mono font-bold text-gruvbox-bg text-sm">
            1
          </div>
          <div>
            <p className="text-gruvbox-text font-semibold text-lg">{winnerNama}</p>
            <p className="text-gruvbox-orange font-mono text-sm">
              V = {fmtFinal(winner?.nilai ?? 0)}
            </p>
          </div>
        </div>
      </div>

      {/* full ranking */}
      <div className="flex flex-col gap-2 mb-6">
        {vektorV.map((v) => {
          const nama = alternatif.find((a) => a.id === v.alternatifId)?.nama ?? v.alternatifId
          const pct = (v.nilai * 100).toFixed(1)
          const isFirst = v.peringkat === 1

          return (
            <div key={v.alternatifId} className="flex items-center gap-3">
              <span
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0',
                  isFirst
                    ? 'bg-gruvbox-orange text-gruvbox-bg'
                    : 'bg-gruvbox-raised border border-gruvbox-border text-gruvbox-muted',
                )}
              >
                {v.peringkat}
              </span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gruvbox-text">{nama}</span>
                  <span className="text-xs font-mono text-gruvbox-muted">{pct}%</span>
                </div>
                <div className="h-1.5 bg-gruvbox-raised rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700',
                      isFirst ? 'bg-gruvbox-orange' : 'bg-gruvbox-muted/50',
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-mono text-gruvbox-yellow w-16 text-right">
                {fmtFinal(v.nilai)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={goPrev}>← Kembali</Button>
        <Button variant="outline" onClick={reset}>Mulai Ulang</Button>
      </div>
    </StepCard>
  )
}
