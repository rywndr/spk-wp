import { useWPMStore } from '@/stores/wpmStore'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const reset = useWPMStore((s) => s.reset)

  return (
    <header className="w-full px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <nav className="bg-gruvbox-surface border border-gruvbox-border rounded-2xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* logo mark */}
            <div className="w-7 h-7 rounded-md bg-gruvbox-orange flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-gruvbox-bg">W</span>
            </div>
            <div>
              <span className="font-mono text-gruvbox-text font-semibold text-sm tracking-tight">
                SPK
              </span>
              <span className="font-mono text-gruvbox-muted text-sm"> / </span>
              <span className="font-mono text-gruvbox-orange text-sm font-medium">
                Weighted Product
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gruvbox-muted font-mono">
              Sistem Pendukung Keputusan
            </span>
            <Button variant="ghost" size="sm" onClick={reset}>
              Ulang
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
