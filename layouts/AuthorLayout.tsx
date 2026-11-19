import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import ViewfinderPortrait from '@/components/ViewfinderPortrait'
import NamePronunciation from '@/components/NamePronunciation'
import Link from '@/components/Link'
import CVDownload from '@/components/CVDownload'
import siteMetadata from '@/data/siteMetadata'
import { Locale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  locale?: Locale
}

export default function AuthorLayout({ children, content, locale = 'en' }: Props) {
  const { name, email, linkedin, github } = content
  const t = dictionary[locale].links

  return (
    <div className="academic-document about-document">
      <p className="eyebrow">
        {locale === 'zh' ? (
          <>巫芊瑩 · {siteMetadata.author}</>
        ) : (
          <>
            {name} · <span lang="zh-Hant">巫芊瑩</span>
          </>
        )}
      </p>
      <h1>{locale === 'zh' ? '關於' : 'About'}</h1>
      <div className="about-profile">
        <div>
          <NamePronunciation
            audioSrc={`${process.env.BASE_PATH || ''}/static/audio/chien-yin-wu.mp3`}
          />
          <div className="profile-links">
            <Link href={`mailto:${email}`}>{t.email}</Link>
            <Link href="/resume">{t.cv}</Link>
            <CVDownload label={t.cvPdf} locale={locale} />
            <Link href={siteMetadata.orcid}>ORCID</Link>
            {github && <Link href={github}>GitHub</Link>}
            {linkedin && <Link href={linkedin}>LinkedIn</Link>}
          </div>
        </div>
        <ViewfinderPortrait />
      </div>
      <div className="academic-prose">{children}</div>
    </div>
  )
}
