'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { track } from './track'

// Sections shorter than this are treated as scrolled past, not read.
const MIN_SECONDS = 3

// The section being read is the last landmark that starts above the middle of the viewport.
// Landmarks are sections with an id, and headings with an id on pages written as prose.
function currentSection() {
  const middle = window.innerHeight / 2
  let current: string | null = null
  document.querySelectorAll<HTMLElement>('section[id], h2[id]').forEach((element) => {
    if (element.tagName === 'H2' && element.closest('section[id]')) return
    if (element.getBoundingClientRect().top <= middle) current = element.id
  })
  return current
}

export default function AnalyticsEvents() {
  const pathname = usePathname()

  // Clicks on anything marked with data-analytics-event.
  useEffect(() => {
    const recordClick = (event: MouseEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return
      const element = event.target.closest<HTMLElement>('[data-analytics-event]')
      const eventName = element?.dataset.analyticsEvent
      if (!element || !eventName) return
      track(eventName, { resource: element.dataset.analyticsResource || eventName })
    }
    document.addEventListener('click', recordClick, true)
    return () => document.removeEventListener('click', recordClick, true)
  }, [])

  // Time spent in each section of the page, counted once a second while the tab is visible
  // and reported when the visitor leaves the page or hides the tab.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    const page = pathname
    const seconds = new Map<string, number>()
    let deepest = 0

    const tick = () => {
      if (document.visibilityState !== 'visible') return
      const section = currentSection()
      if (section) seconds.set(section, (seconds.get(section) ?? 0) + 1)
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const depth = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100
      deepest = Math.max(deepest, Math.min(depth, 100))
    }
    const flush = () => {
      let total = 0
      seconds.forEach((value, section) => {
        total += value
        if (value >= MIN_SECONDS) track('section_dwell', { section, seconds: value, page })
      })
      if (total >= MIN_SECONDS) track('page_read', { seconds: total, depth: deepest, page })
      seconds.clear()
    }
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush()
    }

    const timer = window.setInterval(tick, 1000)
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [pathname])

  return null
}
