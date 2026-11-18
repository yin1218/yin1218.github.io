import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import SidebarNavigation from './SidebarNavigation'
import siteMetadata from '@/data/siteMetadata'

export default function Sidebar() {
  return (
    <aside className="site-sidebar" aria-label="Site sidebar">
      <div className="sidebar-identity">
        <div className="sidebar-brand-row">
          <Link className="academic-wordmark" href="/">
            {siteMetadata.author}
          </Link>
          <ThemeSwitch />
        </div>
        <p>Research & everyday observations</p>
      </div>
      <SidebarNavigation />
      <div className="sidebar-contact">
        <Link href={`mailto:${siteMetadata.email}`}>
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
        <p>Observer, with a camera.</p>
      </div>
    </aside>
  )
}
