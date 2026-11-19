'use client'

import { useRef, useState } from 'react'
import { dictionary } from '@/data/dictionary'
import { useLocale } from './useLocale'

export default function NamePronunciation({ audioSrc }: { audioSrc: string }) {
  const locale = useLocale()
  const t = dictionary[locale].pronunciation
  // Replace public/static/audio/chien-yin-wu.mp3 with a personal recording.
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState('')

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    setError('')
    if (!audio.paused) {
      audio.pause()
      return
    }

    try {
      if (audio.error) audio.load()
      if (audio.ended) audio.currentTime = 0
      await audio.play()
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setIsPlaying(false)
      setError(t.unavailable)
    }
  }

  return (
    <div className="name-pronunciation">
      <div className="name-pronunciation-heading">
        {/* The heading above already shows the name in the page's language; show the other one. */}
        {locale === 'zh' ? (
          <span className="name-pronunciation-chinese" lang="en">
            Chien-Yin Wu
          </span>
        ) : (
          <span className="name-pronunciation-chinese" lang="zh-Hant">
            巫芊瑩
          </span>
        )}
        <button
          type="button"
          className="name-pronunciation-button"
          data-analytics-event={isPlaying ? 'name_pronunciation_pause' : 'name_pronunciation_play'}
          data-analytics-resource="name"
          onClick={togglePlayback}
          aria-label={isPlaying ? t.pauseLabel : t.listenLabel}
          aria-pressed={isPlaying}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isPlaying ? (
              <path d="M9 5v14M15 5v14" />
            ) : (
              <>
                <path d="m11 5-6 4H2v6h3l6 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
              </>
            )}
          </svg>
          <span>{isPlaying ? t.pause : t.listen}</span>
        </button>
      </div>
      <div className="name-pronunciation-guide">
        <span>
          <span className="name-pronunciation-label">{t.ipa}</span>{' '}
          <span className="name-pronunciation-phonetics">[wu tʃjɛn ɪŋ]</span>
        </span>
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false)
          setError(t.unavailable)
        }}
      >
        <track
          kind="captions"
          src={audioSrc.replace(/\.mp3$/, '.vtt')}
          srcLang="zh-Hant"
          label="巫芊瑩"
        />
      </audio>
      {error && (
        <p className="name-pronunciation-error" role="status">
          {error}
        </p>
      )}
    </div>
  )
}
