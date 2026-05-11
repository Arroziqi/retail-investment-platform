import { MSWProvider } from './msw-provider'
import { QueryProvider } from './query-provider'
import { Toaster } from 'sonner'
import { AnalyticsProvider } from '@/lib/analytics/provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MSWProvider>
      <QueryProvider>
        <AnalyticsProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </AnalyticsProvider>
      </QueryProvider>
    </MSWProvider>
  )
}
