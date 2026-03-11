import { useWPMStore } from '@/stores/wpmStore'
import githubLogo from '@/assets/GitHub_Invertocat_White_Clearspace.png'

const REPO_URL = 'https://github.com/rywndr/spk-wp'

export function Navbar() {
  const reset = useWPMStore((s) => s.reset)

  return (
    <header className="w-full px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <nav className="bg-gruvbox-surface border-2 border-gruvbox-border [box-shadow:4px_4px_0px_0px_#504945] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-mono text-gruvbox-muted text-sm">
                <a
                  href="https://haikhalroy.me"
                  className="hover:text-gruvbox-orange transition-colors"
                >
                  [~]
                </a>
              </span>
              <span className="font-mono text-gruvbox-muted text-sm">/</span>
              <span className="font-mono font-black text-gruvbox-orange text-sm uppercase tracking-wide [text-shadow:1px_1px_0px_#3c3836]">
                SPK
              </span>
              <span className="font-mono text-gruvbox-muted text-sm">/</span>

              <span className="font-mono font-black text-gruvbox-orange text-sm uppercase tracking-wide [text-shadow:1px_1px_0px_#3c3836]">
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
              <img
                src={githubLogo}
                alt="GitHub"
                className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <span className="hidden sm:inline font-mono text-xs uppercase tracking-wide">
                Source Code
              </span>
            </a>

            <button
              onClick={reset}
              className="font-mono font-black text-xs uppercase tracking-wide text-gruvbox-bg bg-gruvbox-orange border-2 border-gruvbox-orange px-3 py-1.5 [box-shadow:2px_2px_0px_0px_#3c3836] active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:none] transition-all"
            >
              Ulang
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}