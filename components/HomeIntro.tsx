'use client'

import { useState, type ReactNode } from 'react'
import Link from '@/components/Link'
import { triedSports } from '@/data/sportsData'
import { dictionary } from '@/data/dictionary'
import type { Locale } from '@/data/i18n'
import { useLocale } from './useLocale'

// The same person introduced to three readers. Switching the reader rewrites the
// introduction, which is a small version of what I study: self-presentation.
type Voice = { id: string; label: string; paragraphs: ReactNode[] }

const enVoices: Voice[] = [
  {
    id: 'researcher',
    label: dictionary.en.home.voices.researcher,
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
    label: dictionary.en.home.voices.industry,
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
    label: dictionary.en.home.voices.friend,
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

const zhVoices: Voice[] = [
  {
    id: 'researcher',
    label: dictionary.zh.home.voices.researcher,
    paragraphs: [
      <>
        我研究 AI 生成的建議如何影響人們看待自己，以及向他人呈現自己。我開發生成式 AI
        原型，再透過訪談了解大家的反應。接下來，我想探討這類建議如何為人保留判斷的空間，也讓人能夠拒絕。
      </>,
      <>
        我在 2026 年 8 月取得國立臺灣大學資訊管理碩士學位，指導教授為 Nanyi Bi，目前正在申請 2027
        年秋季入學的人機互動博士班。
      </>,
      <>研究之外，我喜歡逛咖啡廳、觀察路人、拍照，有機會就嘗試新的運動。</>,
    ],
  },
  {
    id: 'industry',
    label: dictionary.zh.home.voices.industry,
    paragraphs: [
      <>
        除了研究，我也做過前端開發：在 LINE Taiwan 參與 LINE
        TODAY，在均一教育平台開發給老師用的工具，也曾在 Jubo Health 實習，負責訂單流程自動化。
      </>,
      <>
        我從研究切入產品：在決定要做什麼之前，我會先訪談未來的使用者，並做出原型。我擁有國立臺灣大學資訊管理碩士學位，目前正在申請博士班。歡迎看看我的
        <Link href="/projects">專案</Link>。
      </>,
      <>工作以外：咖啡廳、照片，還有我還沒試過的運動。</>,
    ],
  },
  {
    id: 'friend',
    label: dictionary.zh.home.voices.friend,
    paragraphs: [
      <>
        我是芊瑩。我常待在<Link href="/blog/cafes-and-me">咖啡廳</Link>，多半是為了氛圍；也會
        <Link href="/blog/photography-and-me">拍照</Link>，但說不太上來為什麼。
      </>,
      <>
        我在收集<Link href="/blog/sports-and-me">運動</Link>，目前累積 {triedSports.length} 項。
      </>,
      <>白天我研究人和 AI 怎麼相處，說穿了大部分時間都在跟人聊天。</>,
    ],
  },
]

const voicesByLocale: Record<Locale, Voice[]> = { en: enVoices, zh: zhVoices }

const ids = ['research', 'education', 'observations']

export default function HomeIntro() {
  const locale = useLocale()
  const t = dictionary[locale].home
  const voices = voicesByLocale[locale]
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
      <div className="home-reading" role="group" aria-label={t.readingAs}>
        <span className="home-reading-label">{t.readingAs}</span>
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
