// Google Scholar / Highwire `citation_*` meta tags for publication detail pages.
// Bibliographic values always come from the English records (the papers are in English),
// whichever locale the page is rendered in. Works under review get no tags.
import { absoluteUrl } from 'app/seo'
import { publication, publications } from './academicData'
import { publicationDetails } from './publicationDetails'
import { localizePath, Locale } from './i18n'

type CitationMeta = Record<string, string | string[]>

export function citationMeta(slug: string, locale: Locale): CitationMeta | undefined {
  const item = publications.find((entry) => entry.id === slug)
  if (!item || item.type === 'Under review') return undefined

  const pageUrl = absoluteUrl(localizePath(`/publications/${slug}`, locale))

  if (item.type === 'Demo') {
    // The data records no DOI, pages or exact date for the demo: title, authors, year, venue only.
    return {
      citation_title: item.title,
      citation_author: item.authors,
      citation_publication_date: item.year,
      citation_conference_title: item.venue.split(', ').slice(1).join(', ') || item.venue,
      citation_abstract_html_url: pageUrl,
    }
  }

  const isPublished = slug === 'beyond-adaptation'
  if (!isPublished) return undefined
  const citation = publicationDetails.find((entry) => entry.id === slug)?.citation ?? ''
  const pages = citation.match(/,\s*(\d+)[–-](\d+)\.\s+https?:\/\//)
  const doi = publication.href.match(/doi\.org\/(10\..+)$/)?.[1]

  return {
    citation_title: item.title,
    citation_author: item.authors,
    citation_publication_date: publication.datePublished.replace(/-/g, '/'),
    citation_conference_title: item.venue.split(' · ')[0],
    ...(doi && { citation_doi: doi }),
    ...(pages && { citation_firstpage: pages[1], citation_lastpage: pages[2] }),
    citation_abstract_html_url: pageUrl,
    citation_language: 'en',
  }
}
