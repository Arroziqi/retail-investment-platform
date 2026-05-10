import { MSWProvider } from './msw-provider'
import { QueryProvider } from './query-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MSWProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </MSWProvider>
  )
}
