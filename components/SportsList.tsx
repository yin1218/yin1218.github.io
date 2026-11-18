'use client'

import { useEffect, useRef, useState } from 'react'
import type { Sport } from '@/data/sportsData'

// Chips for a list of sports. A sport with photos becomes a button that opens them
// in a dialog; the rest stay plain text.
export default function SportsList({ sports, limit }: { sports: Sport[]; limit?: number }) {
  const [open, setOpen] = useState<Sport | null>(null)
  const [expanded, setExpanded] = useState(false)
  const shown = limit && !expanded ? sports.slice(0, limit) : sports
  const hidden = sports.length - shown.length
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <>
      <ul className="sports-list">
        {shown.map((sport) => (
          <li key={sport.name} className={sport.photos?.length ? 'has-photos' : undefined}>
            {sport.photos?.length ? (
              <button type="button" onClick={() => setOpen(sport)} aria-haspopup="dialog">
                {sport.name}
                <span className="sports-photo-count" aria-hidden="true">
                  {sport.photos.length > 1 ? `${sport.photos.length} photos` : 'photo'}
                </span>
              </button>
            ) : (
              sport.name
            )}
          </li>
        ))}
        {hidden > 0 && (
          <li className="has-photos">
            <button
              type="button"
              aria-label={`Show ${hidden} more sports`}
              onClick={() => setExpanded(true)}
            >
              +{hidden}
            </button>
          </li>
        )}
      </ul>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        className="sports-dialog"
        aria-label={open ? `${open.name} photos` : undefined}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(null)
        }}
      >
        {open && (
          <div className="sports-dialog-body">
            <div className="sports-dialog-head">
              <h2>{open.name}</h2>
              <button type="button" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
            {open.photos?.map((photo) => (
              <figure key={photo.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                {photo.caption && <figcaption>{photo.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </dialog>
    </>
  )
}
