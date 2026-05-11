import { KYCWizard } from '@/features/auth-kyc/components/kyc-wizard'

export default function KYCPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Complete Your Profile</h1>
        <KYCWizard />
      </div>
    </div>
  )
}
