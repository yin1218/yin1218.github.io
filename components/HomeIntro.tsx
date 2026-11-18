'use client'

import { useState, type ReactNode } from 'react'
import Link from '@/components/Link'
import { triedSports } from '@/data/sportsData'

// The same person introduced to three readers. Switching the reader rewrites the
// introduction, which is a small version of what I study: self-presentation.
const voices: { id: string; label: string; paragraphs: ReactNode[] }[] = [
  {
    id: 'researcher',
    label: 'Researcher',
    paragraphs: [
      <>
        I study how AI-generated suggestions shape how people see themselves and present themselves
        to others. I build generative AI prototypes and use interviews to learn how people respond
        to them. Next, I want to ask how such suggestions can leave people room to judge them and to
        decline them.
      </>,
      <>
        I completed my master’s degree in Information Management at National Taiwan University in
        August 2026 under the supervision of Nanyi Bi. I am applying to PhD programs in
        human–computer interaction for fall 2027.
      </>,
      <>
        Outside research, I enjoy visiting cafés, people-watching, taking photographs, and trying a
        new sport whenever I can.
      </>,
    ],
  },
  {
    id: 'industry',
    label: 'Industry',
    paragraphs: [
      <>
        Alongside research I have worked as a frontend developer: on LINE TODAY at LINE Taiwan, on a
        tool for teachers at Junyi Academy, and as an intern automating order workflows at Jubo
        Health.
      </>,
      <>
        I come to products from research: I interview the people who will use something and
        prototype it before deciding what to build. I hold a master’s degree in Information
        Management from National Taiwan University and am now applying to PhD programs. See my{' '}
        <Link href="/projects">projects</Link>.
      </>,
      <>Away from work: cafés, photographs, and whichever sport I have not tried yet.</>,
    ],
  },
  {
    id: 'friend',
    label: 'Friend',
    paragraphs: [
      <>
        I’m Chien-Yin. I spend a lot of time in <Link href="/blog/cafes-and-me">cafés</Link>, mostly
        for the atmosphere, and I take <Link href="/blog/photography-and-me">photographs</Link>{' '}
        without quite knowing why.
      </>,
      <>
        I collect <Link href="/blog/sports-and-me">sports</Link>: {triedSports.length} so far.
      </>,
      <>By day I research how people and AI get along, which mostly means talking to people.</>,
    ],
  },
]

const ids = ['research', 'education', 'observations']

export default function HomeIntro() {
  const [active, setActive] = useState(voices[0].id)
  const voice = voices.find((item) => item.id === active) ?? voices[0]

  return (
    <div className="home-intro">
      <div key={voice.id} className="home-voice" aria-live="polite">
        {voice.paragraphs.map((paragraph, index) => (
          <p key={ids[index]} id={ids[index]}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="home-reading" role="group" aria-label="Reading as">
        <span className="home-reading-label">Reading as</span>
        {voices.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === active}
            data-analytics-event="voice_switch"
            data-analytics-resource={item.id}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
