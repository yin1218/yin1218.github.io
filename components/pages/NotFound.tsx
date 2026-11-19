'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/Link'
import { Locale, htmlLang, localeFromPathname } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'

// GitHub Pages serves the one exported 404.html for every unknown URL, including those under
// /zh, so the text switches to the language of the address once the page is in the browser.
export default function NotFoundPage({ locale: initial }: { locale: Locale }) {
  const [locale, setLocale] = useState(initial)
  useEffect(() => setLocale(localeFromPathname(window.location.pathname)), [])
  const t = dictionary[locale].notFound
  return (
    <div
      lang={locale === initial ? undefined : htmlLang[locale]}
      className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6"
    >
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl leading-normal font-bold md:text-2xl">{t.heading}</p>
        <p className="mb-8">{t.body}</p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 hover:bg-blue-700 focus:outline-hidden dark:hover:bg-blue-500"
        >
          {t.back}
        </Link>
      </div>
    </div>
  )
}
