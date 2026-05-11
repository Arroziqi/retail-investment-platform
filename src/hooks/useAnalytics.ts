'use client';

import { useCallback } from 'react';
import { AnalyticsEvent } from '@/types/analytics';

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent) => {
    // In a real app, this would send data to Mixpanel, Segment, or a custom API
    console.log(`[Analytics] ${event.type}:`, event.payload);
    
    // We could also send this to our mock API
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(err => console.error('Failed to send analytics', err));
  }, []);

  const trackEvent = useCallback((type: AnalyticsEvent['type'], payload?: Record<string, unknown>) => {
    track({ type, payload } as AnalyticsEvent);
  }, [track]);

  return { track, trackEvent };
}
