import type { MetadataRoute } from 'next'
import { locales, localizePath } from '@/data/i18n'
import { publicationDetails } from '@/data/publicationDetails'
import { absoluteUrl, pageSEO } from './seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Include only real pages; omit lastModified rather than claiming every build changes the content.
  // Noindex pages are skipped in every language; each URL lists its language alternates.
  const paths = Object.values(pageSEO)
    .filter((page) => !('index' in page) || page.index !== false)
    .map((page) => page.path as string)
  // Every publication has a detail page; only some of them have an entry in pageSEO.
  for (const { id } of publicationDetails) {
    const path = `/publications/${id}`
    if (!paths.includes(path)) paths.push(path)
  }
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      alternates: {
        languages: {
          en: absoluteUrl(localizePath(path, 'en')),
          'zh-Hant-TW': absoluteUrl(localizePath(path, 'zh')),
        },
      },
    }))
  )
}
