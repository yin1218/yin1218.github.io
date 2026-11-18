'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { homePhotos, photoAccount } from '@/data/homePhotos'
import { nextSports, triedSports } from '@/data/sportsData'
import { useAtmosphere, type Atmosphere } from './useAtmosphere'

const lights: { id: Atmosphere; label: string; note: string }[] = [
  { id: 'morning', label: 'Morning', note: 'Morning light through the window. The page is lit.' },
  { id: 'night', label: 'Night', note: 'One yellow lamp tunes the whole corner.' },
]

// Only photographs that exist are shown; entries still waiting for a file are skipped.
const shots = homePhotos.filter((photo) => photo.src)

const sports = [
  ...triedSports.map((sport) => ({ name: sport.name, tried: true })),
  ...nextSports.map((sport) => ({ name: sport.name, tried: false })),
]

// Three interests, each with something small to try before reading the essay.
export default function BeyondResearch() {
  const { atmosphere, light, clear } = useAtmosphere()
  const [frame, setFrame] = useState<number | null>(null)
  const [sport, setSport] = useState<number | null>(null)
  const litNote = lights.find((item) => item.id === atmosphere)?.note
  const photo = frame === null ? null : shots[frame]
  const current = sport === null ? null : sports[sport]

  return (
    <div className="beyond-cards">
      <section className="beyond-card" aria-labelledby="beyond-cafes">
        <p className="beyond-eyebrow">Atmosphere</p>
        <h3 id="beyond-cafes">Café</h3>
        <div className="home-reading" role="group" aria-label="Light the page like a café">
          {lights.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={atmosphere === item.id}
              onClick={() => (atmosphere === item.id ? clear() : light(item.id))}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="beyond-readout" aria-live="polite">
          {litNote ?? 'I go for the atmosphere.'}
        </p>
        <p className="beyond-more">
          <Link href="/blog/cafes-and-me">Cafés and me</Link>
        </p>
      </section>

      <section className="beyond-card" aria-labelledby="beyond-photos">
        <p className="beyond-eyebrow">Looking</p>
        <h3 id="beyond-photos">Photography</h3>
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
              I photograph to keep a record. The photographs are on{' '}
              <Link href={photoAccount.href}>{photoAccount.label}</Link>.
            </>
          )}
        </p>
        <p className="beyond-more">
          <Link href="/blog/photography-and-me">Photography and me</Link>
        </p>
      </section>

      <section className="beyond-card" aria-labelledby="beyond-sports">
        <p className="beyond-eyebrow">Collecting</p>
        <h3 id="beyond-sports">Sport</h3>
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
                aria-label={`${item.name}, ${item.tried ? 'tried' : 'not tried yet'}`}
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
              {current.tried ? ' · tried' : ' · next on the list'}
            </>
          ) : (
            `${triedSports.length} of ${sports.length} tried so far.`
          )}
        </p>
        <p className="beyond-more">
          <Link href="/blog/sports-and-me">Sports and me</Link>
        </p>
      </section>
    </div>
  )
}
