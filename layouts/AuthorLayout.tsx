import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'
import NamePronunciation from '@/components/NamePronunciation'
import Link from '@/components/Link'
import CVDownload from '@/components/CVDownload'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, email, linkedin, github } = content

  return (
    <div className="academic-document about-document">
      <p className="eyebrow">
        {name} · <span lang="zh-Hant">巫芊瑩</span>
      </p>
      <h1>About</h1>
      <div className="about-profile">
        <div>
          <NamePronunciation
            audioSrc={`${process.env.BASE_PATH || ''}/static/audio/chien-yin-wu.mp3`}
          />
          <div className="profile-links">
            <Link href={`mailto:${email}`}>Email</Link>
            <Link href="/resume">CV</Link>
            <CVDownload label="CV (PDF)" />
            <Link href={siteMetadata.orcid}>ORCID</Link>
            {github && <Link href={github}>GitHub</Link>}
            {linkedin && <Link href={linkedin}>LinkedIn</Link>}
          </div>
        </div>
        {avatar && (
          <div className="home-portrait-frame">
            <Image
              src={avatar}
              alt={`Portrait of ${name}`}
              width={180}
              height={180}
              sizes="(max-width: 767px) 112px, 160px"
              className="home-portrait"
            />
          </div>
        )}
      </div>
      <div className="academic-prose">{children}</div>
    </div>
  )
}
