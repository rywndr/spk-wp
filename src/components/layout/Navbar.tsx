import { useWPMStore } from '@/stores/wpmStore'
import { Button } from '@/components/ui/Button'
import githubLogo from '@/assets/GitHub_Invertocat_White_Clearspace.png'

const REPO_URL = 'https://github.com/rywndr/spk-wp'

export function Navbar() {
  const reset = useWPMStore((s) => s.reset)

  return (
    <header className="w-full px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <nav className="bg-gruvbox-surface border border-gruvbox-border rounded-2xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* logo mark */}
            <div>
              <span className="font-mono text-gruvbox-muted text-sm">
                <a 
                href="https://haikhalroy.me" 
                className="hover:text-gruvbox-orange transition-colors">
                  [~]
                </a>
              </span>
              <span className="font-mono text-gruvbox-muted text-sm">/</span>
              <span className="font-mono text-gruvbox-orange text-sm font-medium">
                SPK
              </span>
              <span className="font-mono text-gruvbox-muted text-sm">/</span>
              <span className="font-mono text-gruvbox-orange text-sm font-medium">
                Weighted-Product
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-gruvbox-muted hover:text-gruvbox-text transition-colors"
            >
              <img src={githubLogo} alt="GitHub" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="hidden sm:inline font-mono text-xs">Source Code</span>
            </a>
            <Button variant="ghost" size="sm" onClick={reset}>
              Ulang
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
