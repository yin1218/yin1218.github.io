'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'

// Café atmospheres sit beside the themes. Each borrows light or dark and adds a wash
// of café light (see "Café atmosphere" in tailwind.css). The choice lives on <html>
// so every control stays in step; it lasts until the page reloads.
export type Atmosphere = 'morning' | 'night'

const atmosphereTheme: Record<Atmosphere, string> = { morning: 'light', night: 'dark' }
const atmosphereEvent = 'atmospherechange'
// The theme in use before an atmosphere was switched on, to return to afterwards.
let themeBefore: string | undefined

const read = () => (document.documentElement.dataset.atmosphere as Atmosphere | undefined) ?? null
const write = (next: Atmosphere | null) => {
  if (next) document.documentElement.dataset.atmosphere = next
  else delete document.documentElement.dataset.atmosphere
  window.dispatchEvent(new Event(atmosphereEvent))
}
const subscribe = (onChange: () => void) => {
  window.addEventListener(atmosphereEvent, onChange)
  return () => window.removeEventListener(atmosphereEvent, onChange)
}

export function useAtmosphere() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const atmosphere = useSyncExternalStore(subscribe, read, () => null)

  // Switch an atmosphere on.
  const light = (next: Atmosphere) => {
    if (!read()) themeBefore = theme ?? 'system'
    write(next)
    setTheme(atmosphereTheme[next])
  }
  // Switch it off and go back to the theme that was in use before.
  const clear = () => {
    write(null)
    setTheme(themeBefore ?? 'system')
    themeBefore = undefined
  }
  // Pick a plain theme, which also ends any atmosphere.
  const pickTheme = (next: string) => {
    write(null)
    themeBefore = undefined
    setTheme(next)
  }

  return { atmosphere, theme, resolvedTheme, light, clear, pickTheme }
}
