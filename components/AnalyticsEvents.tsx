'use client'

import { useEffect } from 'react'

type AnalyticsWindow = Window & {
  umami?: {
    track: (name: string, data: Record<string, string>) => Promise<unknown> | void
  }
}

export default function AnalyticsEvents() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const recordClick = (event: MouseEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('[data-analytics-event]')
      const eventName = element?.dataset.analyticsEvent
      const tracker = (window as AnalyticsWindow).umami
      if (!element || !eventName || !tracker) return

      try {
        const request = tracker.track(eventName, {
          resource: element.dataset.analyticsResource || eventName,
          page: window.location.pathname,
        })
        if (request) void request.catch(() => {})
      } catch {
        // A blocked or unavailable tracker must not interrupt the interaction.
      }
    }

    document.addEventListener('click', recordClick, true)
    return () => document.removeEventListener('click', recordClick, true)
  }, [])

  return null
}
