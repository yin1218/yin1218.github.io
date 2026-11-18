import Link from '@/components/Link'
import HomeIntro from '@/components/HomeIntro'
import ViewfinderPortrait from '@/components/ViewfinderPortrait'
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
          <HomeIntro />
          <div id="contact" className="profile-links">
            <Link href={`mailto:${siteMetadata.email}`}>Email</Link>
            <Link href="/resume">CV</Link>
            <CVDownload label="CV (PDF)" />
            <Link href={siteMetadata.orcid}>ORCID</Link>
            <Link href={siteMetadata.github}>GitHub</Link>
            {siteMetadata.linkedin && <Link href={siteMetadata.linkedin}>LinkedIn</Link>}
          </div>
        </div>
        <ViewfinderPortrait />
      </section>
      <NowBlock />
    </div>
  )
}
