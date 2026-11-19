import Link from '@/components/Link'
import HomeIntro from '@/components/HomeIntro'
import ViewfinderPortrait from '@/components/ViewfinderPortrait'
import NamePronunciation from '@/components/NamePronunciation'
import CVDownload from '@/components/CVDownload'
import NowBlock from '@/components/NowBlock'
import siteMetadata from '@/data/siteMetadata'
import { Locale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'
import StructuredData from '@/components/StructuredData'
import { profileStructuredData } from '@/data/structuredData'
import { getPageSEO } from 'app/seo'

export default function HomePage({ locale }: { locale: Locale }) {
  const t = dictionary[locale].links
  return (
    <div className="academic-home home-simple">
      <StructuredData data={profileStructuredData(getPageSEO(locale).home, locale)} />
      <section id="profile" className="home-profile" aria-labelledby="profile-name">
        <div>
          <h1 id="profile-name">
            {locale === 'zh' ? siteMetadata.nativeName : siteMetadata.author}
          </h1>
          <NamePronunciation
            audioSrc={`${process.env.BASE_PATH || ''}/static/audio/chien-yin-wu.mp3`}
          />
          <HomeIntro />
          <div id="contact" className="profile-links">
            <Link href={`mailto:${siteMetadata.email}`}>{t.email}</Link>
            <Link href="/resume">{t.cv}</Link>
            <CVDownload label={t.cvPdf} locale={locale} />
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
