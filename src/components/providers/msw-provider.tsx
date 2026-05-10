'use client'

import { useEffect, useState } from 'react'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mockingReady, setMockingReady] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
    async function init() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        const { worker } = await import('@/mocks/browser')
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
      }
      setMockingReady(true)
    }

    if (!mockingReady) {
      init()
    }
  }, [mockingReady])

  // Avoid hydration mismatch by rendering children on server and during initial client pass
  if (!isClient) {
    return <>{children}</>
  }

  if (!mockingReady && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    return null // Or a loading skeleton/spinner
  }

  return <>{children}</>
}
