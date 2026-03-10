import { useStepProgress } from '@/hooks/useStepProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar, MobileProgressBar } from '@/components/layout/Sidebar'
import { StepInputKriteria } from '@/components/steps/StepInputKriteria'
import { StepInputAlternatif } from '@/components/steps/StepInputAlternatif'
import { StepNormalisasiBobot } from '@/components/steps/StepNormalisasiBobot'
import { StepVektorS } from '@/components/steps/StepVektorS'
import { StepVektorV } from '@/components/steps/StepVektorV'
import { StepHasil } from '@/components/steps/StepHasil'

function StepContent() {
  const { currentStep } = useStepProgress()

  switch (currentStep) {
    case 'input-kriteria':
      return <StepInputKriteria />
    case 'input-alternatif':
      return <StepInputAlternatif />
    case 'normalisasi-bobot':
      return <StepNormalisasiBobot />
    case 'hitung-vektor-s':
      return <StepVektorS />
    case 'hitung-vektor-v':
      return <StepVektorV />
    case 'hasil':
      return <StepHasil />
  }
}

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gruvbox-bg">
      <Navbar />
      <MobileProgressBar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pb-12">
        <div className="flex gap-6 pt-6">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <StepContent />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
