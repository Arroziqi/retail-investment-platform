'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';

const AnalyticsContext = createContext<null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { track } = useAnalytics();
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathname.current && prevPathname.current !== pathname) {
      track({
        type: 'NAVIGATE',
        payload: {
          from: prevPathname.current,
          to: pathname,
        },
      });
    }
    prevPathname.current = pathname;
  }, [pathname, track]);

  return (
    <AnalyticsContext.Provider value={null}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalyticsContext = () => useContext(AnalyticsContext);
