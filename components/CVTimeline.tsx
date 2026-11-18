'use client'

import { useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
import {
  lanes,
  timelineItems,
  timelineYears,
  yearSummaries,
  type LaneId,
} from '@/data/timelineData'

export default function CVTimeline() {
  const [active, setActive] = useState<Set<LaneId>>(() => new Set(lanes.map((l) => l.id)))
  const [currentYear, setCurrentYear] = useState(timelineYears[0])
  const rowRefs = useRef<Record<number, HTMLElement | null>>({})
  const stickyRef = useRef<HTMLDivElement>(null)
  const headsRef = useRef<HTMLDivElement>(null)
  // Keep the lane heads aligned with the rows when the lanes scroll sideways.
  const syncHeads = (e: React.UIEvent<HTMLElement>) => {
    if (headsRef.current) headsRef.current.scrollLeft = e.currentTarget.scrollLeft
  }

  useEffect(() => {
    // The current year is the last row whose top has passed just below the sticky bar.
    let frame = 0
    const update = () => {
      frame = 0
      const sticky = stickyRef.current?.getBoundingClientRect().bottom ?? 0
      const line = sticky + 32
      let year = timelineYears[0]
      for (const y of timelineYears) {
        const el = rowRefs.current[y]
        if (el && el.getBoundingClientRect().top <= line) year = y
      }
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      setCurrentYear(atEnd && window.scrollY > 0 ? timelineYears[timelineYears.length - 1] : year)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const toggle = (id: LaneId) =>
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(id) && next.size > 1) next.delete(id)
      else next.add(id)
      return next
    })

  const showOnly = (id: LaneId) => setActive(new Set([id]))
  const showAll = () => setActive(new Set(lanes.map((l) => l.id)))

  const jumpTo = (year: number) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const row = rowRefs.current[year]
    if (!row) return
    const sticky = stickyRef.current?.offsetHeight ?? 0
    window.scrollTo({
      top: row.getBoundingClientRect().top + window.scrollY - sticky - 16,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  const visibleLanes = lanes.filter((l) => active.has(l.id))
  const currentCount = timelineItems.filter(
    (i) => i.year === currentYear && active.has(i.lane)
  ).length

  return (
    <div className="cvt" style={{ ['--cvt-lanes' as string]: visibleLanes.length }}>
      <div className="cvt-sticky" ref={stickyRef}>
        <div className="cvt-now" aria-live="polite">
          <span className="cvt-now-year">{currentYear}</span>
          <span className="cvt-now-text">
            {yearSummaries[currentYear]}{' '}
            <span className="cvt-now-count">
              {currentCount} {currentCount === 1 ? 'item' : 'items'}
            </span>
          </span>
        </div>
        <div className="cvt-years" role="group" aria-label="Jump to year">
          {timelineYears.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => jumpTo(year)}
              aria-current={year === currentYear ? 'true' : undefined}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="cvt-filters" role="group" aria-label="Filter by category">
          {lanes.map((lane) => (
            <button
              key={lane.id}
              type="button"
              className={`cvt-chip cvt-lane-${lane.id}`}
              aria-pressed={active.has(lane.id)}
              onClick={() => toggle(lane.id)}
              onDoubleClick={() => showOnly(lane.id)}
            >
              <span className="cvt-dot" aria-hidden="true" />
              {lane.title}
            </button>
          ))}
          {active.size < lanes.length && (
            <button type="button" className="cvt-chip cvt-reset" onClick={showAll}>
              Show all
            </button>
          )}
        </div>
        <div className="cvt-heads-scroll" ref={headsRef}>
          <div className="cvt-lane-heads" aria-hidden="true">
            <span />
            {visibleLanes.map((lane) => (
              <span key={lane.id} className={`cvt-lane-${lane.id}`}>
                {lane.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="cvt-rows" onScroll={syncHeads}>
        {timelineYears.map((year) => (
          <li
            key={year}
            data-year={year}
            ref={(el) => {
              rowRefs.current[year] = el
            }}
            className={year === currentYear ? 'cvt-row is-current' : 'cvt-row'}
            aria-labelledby={`cvt-year-${year}`}
          >
            <h2 id={`cvt-year-${year}`} className="cvt-year">
              {year}
            </h2>
            {visibleLanes.map((lane) => {
              const items = timelineItems.filter((i) => i.year === year && i.lane === lane.id)
              return (
                <div key={lane.id} className={`cvt-cell cvt-lane-${lane.id}`}>
                  <span className="cvt-cell-label">{lane.title}</span>
                  {items.map((item) => (
                    <details key={item.title + item.org} className="cvt-item">
                      <summary>
                        <span className="cvt-item-title">{item.title}</span>
                        <span className="cvt-item-org">{item.org}</span>
                      </summary>
                      <div className="cvt-item-body">
                        <p className="cvt-item-when">{item.when}</p>
                        {item.detail && <p>{item.detail}</p>}
                        {item.href && <Link href={item.href}>Read more →</Link>}
                      </div>
                    </details>
                  ))}
                </div>
              )
            })}
          </li>
        ))}
      </ol>
    </div>
  )
}
