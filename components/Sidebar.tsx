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
        <p>Human–computer interaction research</p>
      </div>
      <SidebarNavigation />
    </aside>
  )
}
