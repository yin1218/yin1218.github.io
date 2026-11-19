import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import { Locale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer id="contact" className="academic-footer">
      <div className="footer-contact">
        <h2>{dictionary[locale].contact}</h2>
        <Link href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</Link>
        <div className="footer-links">
          <Link href={siteMetadata.github}>GitHub</Link>
          <Link href={siteMetadata.linkedin}>LinkedIn</Link>
        </div>
      </div>
      <p>
        © {new Date().getFullYear()}{' '}
        {locale === 'zh' ? siteMetadata.nativeName : siteMetadata.author}
      </p>
    </footer>
  )
}
