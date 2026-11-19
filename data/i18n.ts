export type Locale = 'en' | 'zh'

export const locales: Locale[] = ['en', 'zh']
export const defaultLocale: Locale = 'en'

/** Value of the `lang` attribute (and hreflang) for each locale. */
export const htmlLang: Record<Locale, string> = { en: 'en', zh: 'zh-Hant-TW' }
/** Open Graph locale for each locale. */
export const ogLocale: Record<Locale, string> = { en: 'en_US', zh: 'zh_TW' }

const ZH_PREFIX = '/zh'

const splitSuffix = (path: string) => {
  const index = path.search(/[?#]/)
  return index === -1 ? [path, ''] : [path.slice(0, index), path.slice(index)]
}

/** The locale a pathname belongs to (`/zh`, `/zh/...` are Chinese). */
export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return defaultLocale
  return pathname === ZH_PREFIX || pathname.startsWith(`${ZH_PREFIX}/`) ? 'zh' : 'en'
}

/** Remove the locale prefix: `/zh/resume` -> `/resume`, `/zh` -> `/`. */
export function stripLocale(pathname: string): string {
  const [path, suffix] = splitSuffix(pathname)
  if (path === ZH_PREFIX) return `/${suffix}`
  if (path.startsWith(`${ZH_PREFIX}/`)) return `${path.slice(ZH_PREFIX.length)}${suffix}`
  return pathname
}

/** The path of the same page in `locale`; keeps any `?query` / `#hash`. */
export function localizePath(path: string, locale: Locale): string {
  const base = stripLocale(path)
  if (locale === defaultLocale) return base
  const [pathname, suffix] = splitSuffix(base)
  return `${pathname === '/' ? ZH_PREFIX : `${ZH_PREFIX}${pathname}`}${suffix}`
}
