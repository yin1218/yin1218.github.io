'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from './Link'
import { pageSections, siteLinks } from '@/data/sidebarNavLinks'

export default function SidebarNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const sections = pageSections[pathname]
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setActiveSection('')
    if (!sections) return
    let frame = 0
    const update = () => {
      frame = 0
      const elements = sections.flatMap((section) => {
        const element = document.getElementById(section.id)
        return element ? [{ id: section.id, element }] : []
      })
      if (!elements.length) return
      let current = elements[0].id
      for (const item of elements) {
        if (item.element.getBoundingClientRect().top <= 160) current = item.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = elements[elements.length - 1].id
      }
      setActiveSection(current)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
    }
  }, [pathname, sections])

  return (
    <>
      <nav aria-label="Main navigation" className="sidebar-pages">
        {siteLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            <span className="sidebar-number" aria-hidden="true">
              0{index + 1}
            </span>
            {link.title}
          </Link>
        ))}
      </nav>
      {sections && (
        <nav aria-label="On this page" className="sidebar-sections">
          <p className="eyebrow">On this page</p>
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              aria-current={activeSection === section.id ? 'location' : undefined}
              onClick={onNavigate}
            >
              {section.title}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
