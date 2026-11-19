'use client'

import { usePathname } from 'next/navigation'
import { localeFromPathname, type Locale } from '@/data/i18n'

/** The language of the page being shown, derived from the URL. */
export function useLocale(): Locale {
  return localeFromPathname(usePathname())
}
