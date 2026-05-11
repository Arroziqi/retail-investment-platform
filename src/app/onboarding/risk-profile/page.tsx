import { RiskProfilerWizard } from '@/features/risk-profiler/components/risk-profiler-wizard'

export default function RiskProfilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Personalize Your Journey</h1>
        <RiskProfilerWizard />
      </div>
    </div>
  )
}
