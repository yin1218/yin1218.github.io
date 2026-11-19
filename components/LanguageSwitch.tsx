'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale, htmlLang, localeFromPathname, localizePath, stripLocale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'
import { track } from './track'

const options: { locale: Locale; label: string }[] = [
  { locale: 'en', label: 'EN' },
  { locale: 'zh', label: '中文' },
]

// Text-only switch between the two language versions of the current page.
export default function LanguageSwitch() {
  const pathname = usePathname()
  const current = localeFromPathname(pathname)
  const path = stripLocale(pathname || '/')
  // Keep the in-page position (for example the CV's #timeline view) when switching language.
  const [hash, setHash] = useState('')
  useEffect(() => {
    const update = () => setHash(window.location.hash)
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [pathname])

  return (
    <nav className="language-switch" aria-label={dictionary[current].languageLabel}>
      {options.map(({ locale, label }) => (
        <NextLink
          key={locale}
          href={localizePath(path, locale) + hash}
          lang={htmlLang[locale]}
          hrefLang={htmlLang[locale]}
          aria-current={locale === current ? 'true' : undefined}
          onClick={() => track('language_set', { resource: locale })}
        >
          {label}
        </NextLink>
      ))}
    </nav>
  )
}
