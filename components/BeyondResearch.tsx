'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { photoAccount } from '@/data/homePhotos'
import { getHomePhotos, getSports } from '@/data/localized'
import { dictionary } from '@/data/dictionary'
import { useAtmosphere, type Atmosphere } from './useAtmosphere'
import { useLocale } from './useLocale'

// Three interests, each with something small to try before reading the essay.
export default function BeyondResearch() {
  const locale = useLocale()
  const t = dictionary[locale].beyond
  const lights: { id: Atmosphere; label: string; note: string }[] = [
    { id: 'morning', label: t.morning, note: t.morningNote },
    { id: 'night', label: t.night, note: t.nightNote },
  ]
  // Only photographs that exist are shown; entries still waiting for a file are skipped.
  const shots = getHomePhotos(locale).filter((photo) => photo.src)
  const { triedSports, nextSports } = getSports(locale)
  const sports = [
    ...triedSports.map((sport) => ({ name: sport.name, tried: true })),
    ...nextSports.map((sport) => ({ name: sport.name, tried: false })),
  ]
  const { atmosphere, light, clear } = useAtmosphere()
  const [frame, setFrame] = useState<number | null>(null)
  const [sport, setSport] = useState<number | null>(null)
  const litNote = lights.find((item) => item.id === atmosphere)?.note
  const photo = frame === null ? null : shots[frame]
  const current = sport === null ? null : sports[sport]

  return (
    <div className="beyond-cards">
      <section className="beyond-card" aria-labelledby="beyond-cafes">
        <p className="beyond-eyebrow">{t.atmosphere}</p>
        <h3 id="beyond-cafes">{t.cafe}</h3>
        <div className="home-reading" role="group" aria-label={t.lightGroup}>
          {lights.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={atmosphere === item.id}
              data-analytics-event="atmosphere_set"
              data-analytics-resource={item.id}
              onClick={() => (atmosphere === item.id ? clear() : light(item.id))}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="beyond-readout" aria-live="polite">
          {litNote ?? t.defaultCafeNote}
        </p>
        <p className="beyond-more">
          <Link href="/blog/cafes-and-me">{t.cafesEssay}</Link>
        </p>
      </section>

      <section className="beyond-card" aria-labelledby="beyond-photos">
        <p className="beyond-eyebrow">{t.looking}</p>
        <h3 id="beyond-photos">{t.photography}</h3>
        {shots.length > 0 && (
          <div className="beyond-frames" onMouseLeave={() => setFrame(null)}>
            {shots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className={frame === index ? 'beyond-frame is-active' : 'beyond-frame'}
                aria-label={item.alt}
                onMouseEnter={() => setFrame(index)}
                onFocus={() => setFrame(index)}
                onClick={() => setFrame(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt="" />
              </button>
            ))}
          </div>
        )}
        <p className="beyond-readout" aria-live="polite">
          {photo ? (
            photo.caption
          ) : (
            <>
              {t.photoNote} <Link href={photoAccount.href}>{photoAccount.label}</Link>
              {t.photoNoteEnd}
            </>
          )}
        </p>
        <p className="beyond-more">
          <Link href="/blog/photography-and-me">{t.photographyEssay}</Link>
        </p>
      </section>

      <section className="beyond-card" aria-labelledby="beyond-sports">
        <p className="beyond-eyebrow">{t.collecting}</p>
        <h3 id="beyond-sports">{t.sport}</h3>
        <ul className="beyond-dots" onMouseLeave={() => setSport(null)}>
          {sports.map((item, index) => (
            <li key={item.name}>
              <button
                type="button"
                className={
                  'beyond-dot' +
                  (item.tried ? ' is-tried' : '') +
                  (sport === index ? ' is-active' : '')
                }
                aria-label={t.sportLabel(item.name, item.tried)}
                onMouseEnter={() => setSport(index)}
                onFocus={() => setSport(index)}
                onClick={() => setSport(index)}
              />
            </li>
          ))}
        </ul>
        <p className="beyond-readout" aria-live="polite">
          {current ? (
            <>
              <strong>{current.name}</strong>
              {current.tried ? t.sportTried : t.sportNext}
            </>
          ) : (
            t.sportSummary(triedSports.length, sports.length)
          )}
        </p>
        <p className="beyond-more">
          <Link href="/blog/sports-and-me">{t.sportsEssay}</Link>
        </p>
      </section>
    </div>
  )
}
