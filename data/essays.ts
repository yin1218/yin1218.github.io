import { Locale, htmlLang, localizePath } from '@/data/i18n'
import { absoluteUrl, getPageSEO, siteDescription, siteTitle } from 'app/seo'

export type EssayKey = 'cafes' | 'photography' | 'sports'

// Single source for essay publication months (the page wrappers currently repeat these inline
// as the second argument to essayStructuredData). Newest first.
export const essays: { key: EssayKey; path: string; date: string }[] = [
  { key: 'cafes', path: '/blog/cafes-and-me', date: '2026-11' },
  { key: 'photography', path: '/blog/photography-and-me', date: '2026-11' },
  { key: 'sports', path: '/blog/sports-and-me', date: '2026-11' },
]

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// 'YYYY-MM' (or 'YYYY-MM-DD') -> RFC 822 date, at 00:00 UTC.
const rfc822 = (date: string) =>
  new Date(`${date.length === 7 ? `${date}-01` : date}T00:00:00Z`).toUTCString()

export function feedPath(locale: Locale) {
  return localizePath('/feed.xml', locale)
}

export function essayFeed(locale: Locale) {
  const seo = getPageSEO(locale)
  const self = absoluteUrl(feedPath(locale))
  const home = absoluteUrl(localizePath(seo.blog.path, locale))
  const items = essays.map(({ key, date }) => {
    const page = seo[key]
    const link = absoluteUrl(localizePath(page.path, locale))
    return [
      '    <item>',
      `      <title>${escapeXml(page.title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <description>${escapeXml(page.description)}</description>`,
      `      <pubDate>${rfc822(date)}</pubDate>`,
      '    </item>',
    ].join('\n')
  })
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(`${siteTitle[locale]} · ${seo.blog.title}`)}</title>`,
    `    <link>${escapeXml(home)}</link>`,
    `    <description>${escapeXml(seo.blog.description || siteDescription[locale])}</description>`,
    `    <language>${htmlLang[locale]}</language>`,
    `    <lastBuildDate>${rfc822(essays[0].date)}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
