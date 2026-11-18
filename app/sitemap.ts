import type { MetadataRoute } from 'next'
import { absoluteUrl, pageSEO } from './seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Include only real pages; omit lastModified rather than claiming every build changes the content.
  return Object.values(pageSEO)
    .filter((page) => !('index' in page) || page.index !== false)
    .map(({ path }) => ({ url: absoluteUrl(path) }))
}
