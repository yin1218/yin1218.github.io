type AnalyticsWindow = Window & {
  umami?: {
    track: (name: string, data: Record<string, string | number>) => Promise<unknown> | void
  }
}

// Sends one event to Umami. Does nothing in development, when no Website ID is configured,
// or when the tracker is blocked; a failure never interrupts the interaction.
export function track(name: string, data: Record<string, string | number> = {}) {
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') return
  const tracker = (window as AnalyticsWindow).umami
  if (!tracker) return
  try {
    const request = tracker.track(name, { page: window.location.pathname, ...data })
    if (request) void request.catch(() => {})
  } catch {
    // Ignore: analytics is optional.
  }
}
