import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import SidebarNavigation from './SidebarNavigation'
import LanguageSwitch from './LanguageSwitch'
import siteMetadata from '@/data/siteMetadata'
import { Locale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'

export default function Sidebar({ locale }: { locale: Locale }) {
  const t = dictionary[locale]
  return (
    <aside className="site-sidebar" aria-label={t.sidebarLabel}>
      <div className="sidebar-identity">
        <div className="sidebar-brand-row">
          <Link className="academic-wordmark" href="/">
            {locale === 'zh' ? siteMetadata.nativeName : siteMetadata.author}
          </Link>
          <div className="sidebar-tools">
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </div>
        <p>{t.tagline}</p>
      </div>
      <SidebarNavigation />
    </aside>
  )
}
