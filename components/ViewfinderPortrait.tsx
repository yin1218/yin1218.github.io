'use client'

import { useRef, useState } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { homePhotos, photoAccount } from '@/data/homePhotos'

// Only photographs that exist are shown; entries still waiting for a file are skipped.
const shots = homePhotos.filter((photo) => photo.src)

const portrait = (
  <Image
    src="/static/images/chien-yin-wu.webp"
    alt="Portrait of Chien-Yin Wu"
    width={180}
    height={180}
    sizes="(max-width: 767px) 112px, 160px"
    className="home-portrait"
    priority
  />
)

// The portrait works as a camera: pressing it fires the shutter and shows the next
// photograph. Frame 0 is the portrait itself. Until there are photographs to show it
// is a plain portrait.
export default function ViewfinderPortrait() {
  const [frame, setFrame] = useState(0)
  const [firing, setFiring] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const total = shots.length + 1
  const photo = frame === 0 ? null : shots[frame - 1]

  const shoot = () => {
    setFiring(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFiring(false), 420)
    setFrame((value) => (value + 1) % total)
  }

  if (!shots.length) {
    return (
      <div className="home-viewfinder">
        <div className="home-portrait-frame">{portrait}</div>
      </div>
    )
  }

  return (
    <div className="home-viewfinder">
      <button
        type="button"
        className={firing ? 'home-portrait-frame is-firing' : 'home-portrait-frame'}
        onClick={shoot}
        aria-label="Press the shutter to see the next photograph"
      >
        {portrait}
        {photo &&
          (photo.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={frame} className="home-shot" src={photo.src} alt={photo.alt} />
          ) : (
            <span
              key={frame}
              className="home-shot home-shot-placeholder"
              role="img"
              aria-label={photo.alt}
            >
              <span>{String(frame).padStart(2, '0')}</span>
            </span>
          ))}
        <span className="home-shutter" aria-hidden="true" />
      </button>
      <p className="home-viewfinder-caption" aria-live="polite">
        <span className="home-frame-count">
          {String(frame + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        {photo ? (
          <>
            {photo.caption} · <Link href={photoAccount.href}>{photoAccount.label}</Link>
          </>
        ) : (
          <Link href="/blog/photography-and-me">Why I photograph</Link>
        )}
      </p>
    </div>
  )
}
