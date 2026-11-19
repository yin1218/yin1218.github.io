import { Fragment } from 'react'
import Link from '@/components/Link'
import { selfName } from '@/data/academicData'
import siteMetadata from '@/data/siteMetadata'
import { getPublications } from '@/data/localized'
import { dictionary } from '@/data/dictionary'
import type { Locale } from '@/data/i18n'

const CJK = /[一-鿿]/
// Mark the language of each title: Chinese pages carry English paper titles, and vice versa.
const textLang = (text: string) => (CJK.test(text) ? 'zh-Hant' : 'en')

const withBase = (href: string) =>
  href.startsWith('/static/') ? `${process.env.BASE_PATH || ''}${href}` : href

// `heading` is the level of each title: h3 under a section heading (the CV), h2 where the
// list sits directly under the page title.
export default function PublicationList({
  locale = 'en',
  heading: Heading = 'h3',
}: {
  locale?: Locale
  heading?: 'h2' | 'h3'
}) {
  const t = dictionary[locale].publications
  const publications = getPublications(locale)
  return (
    <ol className="publication-list">
      {publications.map((item) => (
        <li key={item.id} id={item.id} className="publication-item">
          <p className="publication-type">
            {item.type} · {item.year}
          </p>
          <Heading className="publication-title">
            <Link href={`/publications/${item.id}`} lang={textLang(item.title)}>
              {item.title}
            </Link>
          </Heading>
          {item.originalTitle && (
            <p className="publication-original" lang={textLang(item.originalTitle)}>
              {item.originalTitle}
            </p>
          )}
          <p className="publication-authors">
            {item.authors.map((author, index) => (
              <Fragment key={author}>
                {index > 0 && t.authorSeparator}
                {author === selfName || author === siteMetadata.nativeName ? (
                  <strong>{author}</strong>
                ) : (
                  <span lang={/[一-鿿]/.test(author) ? 'zh-Hant' : undefined}>{author}</span>
                )}
              </Fragment>
            ))}
          </p>
          <p
            className="publication-venue"
            lang={locale === 'zh' ? textLang(item.venue) : undefined}
          >
            {item.venue}
          </p>
          {item.role && (
            <p className="publication-venue">
              {t.roleLabel} {item.role}
            </p>
          )}
          <div className="publication-links">
            <Link className="project-link" href={`/publications/${item.id}`}>
              {t.readMore}
            </Link>
            {item.links?.map((link) => (
              <Link key={link.label} className="project-link" href={withBase(link.href)}>
                {link.label}
                {link.href.startsWith('http') && <span aria-hidden="true"> ↗</span>}
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ol>
  )
}
