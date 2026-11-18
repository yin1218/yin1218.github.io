import Link from '@/components/Link'
import Image from '@/components/Image'
import NamePronunciation from '@/components/NamePronunciation'
import CVDownload from '@/components/CVDownload'
import NowBlock from '@/components/NowBlock'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <div className="academic-home home-simple">
      <section id="profile" className="home-profile" aria-labelledby="profile-name">
        <div>
          <h1 id="profile-name">Chien-Yin Wu</h1>
          <NamePronunciation
            audioSrc={`${process.env.BASE_PATH || ''}/static/audio/chien-yin-wu.mp3`}
          />
          <p id="research">
            I study human–computer interaction, human-centered AI, and cross-cultural communication.
            I use interviews and prototypes to explore how AI can support people’s interactions.
          </p>
          <p id="education">
            I received my master’s degree in Information Management from National Taiwan University
            in August 2026, advised by Nanyi Bi.
          </p>
          <p id="observations">
            Outside research, I enjoy visiting cafés, observing society, and taking photographs.
          </p>
          <div id="contact" className="profile-links">
            <Link href={`mailto:${siteMetadata.email}`}>Email</Link>
            <Link href="/resume">CV</Link>
            <CVDownload label="CV (PDF)" />
            <Link href={siteMetadata.orcid}>ORCID</Link>
            <Link href={siteMetadata.github}>GitHub</Link>
            {siteMetadata.linkedin && <Link href={siteMetadata.linkedin}>LinkedIn</Link>}
          </div>
        </div>
        <div className="home-portrait-frame">
          <Image
            src="/static/images/chien-yin-wu.webp"
            alt="Portrait of Chien-Yin Wu"
            width={180}
            height={180}
            sizes="(max-width: 767px) 112px, 160px"
            className="home-portrait"
            priority
          />
        </div>
      </section>
      <NowBlock />
    </div>
  )
}
