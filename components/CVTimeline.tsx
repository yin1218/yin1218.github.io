'use client'

import { useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
import {
  lanes,
  timelineItems,
  timelineNow,
  timelineYears,
  yearSummaries,
  type LaneId,
  type TimelineItem,
} from '@/data/timelineData'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Months are counted from year 0 so they can be compared and subtracted.
const toIndex = (value: string) => {
  const [year, month] = value.split('-').map(Number)
  return year * 12 + (month - 1)
}
const nowIndex = toIndex(timelineNow)
const nowYear = Math.floor(nowIndex / 12)
const floorIndex = timelineYears[timelineYears.length - 1] * 12

// Grid rows, newest first: each year has a heading row, then one row per month.
const gridRows: { year: number; month?: number }[] = []
const yearRow: Record<number, number> = {}
const monthRow: Record<number, number> = {}
for (const year of timelineYears) {
  gridRows.push({ year })
  yearRow[year] = gridRows.length
  const lastMonth = year === nowYear ? nowIndex % 12 : 11
  for (let month = lastMonth; month >= 0; month--) {
    gridRows.push({ year, month })
    monthRow[year * 12 + month] = gridRows.length
  }
}

const formatMonth = (index: number) => `${MONTHS[index % 12]} ${Math.floor(index / 12)}`

// "Feb – Oct 2026 · 9 mo", "Sep 2025 – Jan 2026 · 5 mo", "Nov 2026 – now", "Apr 2025", "2021"
function describe(item: TimelineItem) {
  if (!item.start.includes('-')) return { range: item.start, duration: '' }
  const start = toIndex(item.start)
  if (!item.end) return { range: formatMonth(start), duration: '' }
  const ongoing = item.end === 'present'
  const end = ongoing ? nowIndex : toIndex(item.end)
  const sameYear = Math.floor(start / 12) === Math.floor(end / 12)
  const from = sameYear && !ongoing ? MONTHS[start % 12] : formatMonth(start)
  const months = end - start + 1
  const years = Math.floor(months / 12)
  const rest = months % 12
  const duration = [years && `${years} yr`, rest && `${rest} mo`].filter(Boolean).join(' ')
  return { range: `${from} – ${ongoing ? 'now' : formatMonth(end)}`, duration }
}

interface Placement {
  items: TimelineItem[]
  top: number
  bottom: number
  track: number
  span: number
}

// Place each lane's items on the month grid. Items that overlap in time sit side by side
// in separate tracks; items with only a year are stacked together at the top of that year.
function layoutLane(id: LaneId) {
  const placements: Placement[] = []
  const yearOnly: Record<string, TimelineItem[]> = {}
  for (const item of timelineItems.filter((i) => i.lane === id)) {
    if (!item.start.includes('-')) {
      ;(yearOnly[item.start] ||= []).push(item)
      continue
    }
    const start = Math.max(toIndex(item.start), floorIndex)
    const end = Math.min(
      !item.end || item.end === 'present' ? (item.end ? nowIndex : start) : toIndex(item.end),
      nowIndex
    )
    placements.push({
      items: [item],
      top: monthRow[end],
      bottom: monthRow[start],
      track: 0,
      span: 1,
    })
  }
  for (const [year, items] of Object.entries(yearOnly)) {
    // Let the group run down into the year's first months so it does not stretch the
    // heading row.
    const row = yearRow[Number(year)]
    const monthsInYear = Number(year) === nowYear ? (nowIndex % 12) + 1 : 12
    const bottom = row + Math.min(monthsInYear, items.length * 3)
    placements.push({ items, top: row, bottom, track: 0, span: 1 })
  }
  placements.sort((a, b) => a.top - b.top || b.bottom - a.bottom)
  const overlaps = (a: Placement, b: Placement) => a.top <= b.bottom && b.top <= a.bottom
  const placed: Placement[] = []
  for (const p of placements) {
    while (placed.some((q) => q.track === p.track && overlaps(p, q))) p.track++
    placed.push(p)
  }
  const tracks = Math.max(1, ...placements.map((p) => p.track + 1))
  // Let an item use the free tracks to its right.
  for (const p of placements) {
    while (
      p.track + p.span < tracks &&
      !placements.some((q) => q.track === p.track + p.span && overlaps(p, q))
    )
      p.span++
  }
  return { tracks, placements }
}

const laneLayouts = Object.fromEntries(
  lanes.map((lane) => [lane.id, layoutLane(lane.id)])
) as Record<LaneId, ReturnType<typeof layoutLane>>

const activeIn = (item: TimelineItem, year: number) => {
  const startYear = Number(item.start.slice(0, 4))
  const endYear =
    item.end === 'present' ? nowYear : item.end ? Number(item.end.slice(0, 4)) : startYear
  return startYear <= year && year <= endYear
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  const { range, duration } = describe(item)
  return (
    <details className="cvt-item">
      <summary>
        <span className="cvt-item-title">{item.title}</span>
        <span className="cvt-item-org">{item.org}</span>
        <span className="cvt-item-when">
          {range}
          {duration && <span className="cvt-item-duration"> · {duration}</span>}
        </span>
      </summary>
      {(item.note || item.detail || item.href) && (
        <div className="cvt-item-body">
          {item.note && <p className="cvt-item-note">{item.note}</p>}
          {item.detail && <p>{item.detail}</p>}
          {item.href && <Link href={item.href}>Read more →</Link>}
        </div>
      )}
    </details>
  )
}

export default function CVTimeline() {
  const [active, setActive] = useState<Set<LaneId>>(() => new Set(lanes.map((l) => l.id)))
  const [currentYear, setCurrentYear] = useState(timelineYears[0])
  const rowRefs = useRef<Record<number, HTMLElement | null>>({})
  const stickyRef = useRef<HTMLDivElement>(null)
  const headsRef = useRef<HTMLDivElement>(null)
  // Keep the lane heads aligned with the grid when the lanes scroll sideways.
  const syncHeads = (e: React.UIEvent<HTMLElement>) => {
    if (headsRef.current) headsRef.current.scrollLeft = e.currentTarget.scrollLeft
  }

  useEffect(() => {
    // The current year is the last year heading that has passed just below the sticky bar.
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

  // First grid column of each visible lane (column 1 is the year/month axis).
  let nextColumn = 2
  const visibleLanes = lanes
    .filter((l) => active.has(l.id))
    .map((lane) => {
      const layout = laneLayouts[lane.id]
      const column = nextColumn
      nextColumn += layout.tracks
      return { ...lane, ...layout, column }
    })
  const wide = visibleLanes.filter((l) => l.tracks === 1).length
  const narrow = visibleLanes.reduce((sum, l) => sum + (l.tracks > 1 ? l.tracks : 0), 0)
  const columns = [
    'var(--cvt-year-col)',
    ...visibleLanes.map((l) =>
      l.tracks === 1
        ? 'minmax(var(--cvt-lane-min), 2fr)'
        : `repeat(${l.tracks}, minmax(var(--cvt-track-min), 1.3fr))`
    ),
  ].join(' ')
  const gridStyle = {
    gridTemplateColumns: columns,
    ['--cvt-wide' as string]: wide,
    ['--cvt-narrow' as string]: narrow,
  }
  const currentCount = timelineItems.filter(
    (i) => active.has(i.lane) && activeIn(i, currentYear)
  ).length

  return (
    <div className="cvt">
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
          <div className="cvt-lane-heads" style={gridStyle} aria-hidden="true">
            <span />
            {visibleLanes.map((lane) => (
              <span
                key={lane.id}
                className={`cvt-lane-${lane.id}`}
                style={{ gridColumn: `span ${lane.tracks}` }}
              >
                {lane.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="cvt-rows" onScroll={syncHeads}>
        <div className="cvt-grid" style={gridStyle}>
          {gridRows.map((row, index) =>
            row.month === undefined ? (
              <h2
                key={`year-${row.year}`}
                id={`cvt-year-${row.year}`}
                ref={(el) => {
                  rowRefs.current[row.year] = el
                }}
                className={row.year === currentYear ? 'cvt-year is-current' : 'cvt-year'}
                style={{ gridRow: index + 1 }}
              >
                {row.year}
              </h2>
            ) : (
              <span
                key={`month-${row.year}-${row.month}`}
                className={
                  row.year * 12 + row.month === nowIndex ? 'cvt-month is-now' : 'cvt-month'
                }
                style={{ gridRow: index + 1 }}
              >
                {MONTHS[row.month]}
              </span>
            )
          )}
          {gridRows.map((row, index) => (
            <span
              key={`rule-${index}`}
              className={row.month === undefined ? 'cvt-rule cvt-rule-year' : 'cvt-rule'}
              style={{ gridRow: index + 1 }}
              aria-hidden="true"
            />
          ))}
          {visibleLanes.map((lane) =>
            lane.placements.map((p) => (
              <div
                key={`${lane.id}-${p.items[0].title}-${p.items[0].org}`}
                className={`cvt-block cvt-lane-${lane.id}`}
                style={{
                  gridColumn: `${lane.column + p.track} / span ${p.span}`,
                  gridRow: `${p.top} / ${p.bottom + 1}`,
                }}
              >
                {p.items.map((item) => (
                  <TimelineEntry key={item.title + item.org} item={item} />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
