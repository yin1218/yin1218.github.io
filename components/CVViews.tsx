'use client'

import { useEffect, useState, type ReactNode } from 'react'
import CVTimeline from '@/components/CVTimeline'
import { dictionary } from '@/data/dictionary'
import { useLocale } from './useLocale'

type View = 'list' | 'timeline'

// The CV has two views of the same record: the written list and the month-by-month
// timeline. The address keeps the choice (#timeline), so the timeline can be linked to.
export default function CVViews({ header, children }: { header: ReactNode; children: ReactNode }) {
  const t = dictionary[useLocale()].cvViews
  const views: { id: View; label: string }[] = [
    { id: 'list', label: t.list },
    { id: 'timeline', label: t.timeline },
  ]
  const [view, setView] = useState<View>('list')

  useEffect(() => {
    const fromHash = () => setView(window.location.hash === '#timeline' ? 'timeline' : 'list')
    // Section links (#education …) point into the list, so following one leaves the timeline.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (link && link.pathname === window.location.pathname && link.hash) {
        setView(link.hash === '#timeline' ? 'timeline' : 'list')
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('hashchange', fromHash)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  const choose = (next: View) => {
    setView(next)
    const { pathname, search } = window.location
    window.history.replaceState(
      null,
      '',
      `${pathname}${search}${next === 'timeline' ? '#timeline' : ''}`
    )
  }

  return (
    <div className={view === 'timeline' ? 'academic-document cvt-page' : 'academic-document'}>
      {header}
      <div className="cv-views" role="group" aria-label={t.label}>
        {views.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={view === item.id}
            data-analytics-event="cv_view"
            data-analytics-resource={item.id}
            onClick={() => choose(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div hidden={view !== 'list'}>{children}</div>
      {view === 'timeline' && <CVTimeline />}
    </div>
  )
}
