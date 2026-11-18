'use client'

import { useEffect, useRef, useState } from 'react'
import Link from '@/components/Link'
import { nowItems, nowUpdated, type NowItem } from '@/data/nowData'

// Small animated mark after each label: a caret while studying, a spinner while
// building, and dots while waiting for reviewers.
function Glyph({ kind }: { kind: NowItem['glyph'] }) {
  if (kind === 'caret') return <span className="home-now-glyph home-now-caret" aria-hidden="true" />
  if (kind === 'spinner')
    return <span className="home-now-glyph home-now-spinner" aria-hidden="true" />
  return (
    <span className="home-now-glyph home-now-dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

export default function NowBlock() {
  // 'idle' on the server (everything visible), 'ready' once hydrated (hidden until it
  // scrolls in), 'in' after it enters the viewport.
  const [phase, setPhase] = useState<'idle' | 'ready' | 'in'>('idle')
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setPhase('ready')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setPhase('in'))
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="now"
      className={`home-section home-now${phase === 'idle' ? '' : ` is-${phase}`}`}
      aria-labelledby="now-title"
    >
      <div className="home-now-head">
        <h2 id="now-title">
          <span className="home-now-pulse" aria-hidden="true" />
          Now
        </h2>
        <p className="home-now-updated">
          Updated <time dateTime={nowUpdated.iso}>{nowUpdated.label}</time>
        </p>
      </div>
      <ul className="home-now-list">
        {nowItems.map((item, index) => (
          <li
            key={item.text}
            className={`home-now-item cvt-lane-${item.lane}`}
            style={{ ['--i' as string]: index }}
          >
            <p className="home-now-label">
              {item.label}
              <Glyph kind={item.glyph} />
            </p>
            <p className="home-now-text">
              {item.href ? <Link href={item.href}>{item.text}</Link> : item.text}
            </p>
            <p className="home-now-detail">{item.detail}</p>
          </li>
        ))}
      </ul>
      <Link className="home-detail-link" href="/resume#timeline">
        How I got here: timeline
      </Link>
    </section>
  )
}
