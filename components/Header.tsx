import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitch from './LanguageSwitch'
import { Locale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'

export default function Header({ locale }: { locale: Locale }) {
  return (
    <header className="academic-header mobile-site-header">
      <Link href="/" aria-label={dictionary[locale].homeLabel} className="academic-wordmark">
        {locale === 'zh' ? siteMetadata.nativeName : siteMetadata.author}
      </Link>
      <div className="flex items-center gap-5">
        <LanguageSwitch />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}
