import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

export default function Header() {
  return (
    <header className="academic-header mobile-site-header">
      <Link href="/" aria-label="Chien-Yin Wu home" className="academic-wordmark">
        {siteMetadata.author}
      </Link>
      <div className="flex items-center gap-5">
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}
