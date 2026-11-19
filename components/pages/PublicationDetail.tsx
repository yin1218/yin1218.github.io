import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import RolePills from '@/components/RolePills'
import StructuredData from '@/components/StructuredData'
import { getPublications, getPublicationDetails } from '@/data/localized'
import { researchStructuredData } from '@/data/structuredData'
import { Locale } from '@/data/i18n'
import { dictionary } from '@/data/dictionary'
import { publications as enPublications } from '@/data/academicData'
import { publicationDetails as enDetails } from '@/data/publicationDetails'

const CJK = /[一-鿿]/
const withBase = (href: string) =>
  href.startsWith('/static/') ? `${process.env.BASE_PATH || ''}${href}` : href

export const publicationSlugs = () => enDetails.map((detail) => ({ slug: detail.id }))

export const findPublication = (slug: string, locale: Locale) => {
  const detail = getPublicationDetails(locale).find((entry) => entry.id === slug)
  const item = getPublications(locale).find((entry) => entry.id === slug)
  // The English record decides whether a paper is still under review (and so noindex).
  const english = enPublications.find((entry) => entry.id === slug)
  return detail && item && english
    ? { detail, item, underReview: english.type === 'Under review' }
    : undefined
}

export default function PublicationDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const found = findPublication(slug, locale)
  if (!found) notFound()
  const { detail, item } = found
  const t = dictionary[locale].publications

  return (
    <article className="academic-document research-document">
      {detail.id === 'beyond-adaptation' && (
        <StructuredData data={researchStructuredData(locale)} />
      )}
      <p className="eyebrow">
        <Link href="/publications">{t.publications}</Link> / {detail.eyebrow}
      </p>
      <h1 lang={CJK.test(detail.shortTitle) ? 'zh-Hant' : undefined}>{detail.shortTitle}</h1>
      <p className="document-intro">{detail.summary}</p>
      <p className="research-byline">
        {item.authors.join(t.authorSeparator)} · {item.type} · {item.year}
      </p>
      {item.links && (
        <div className="document-actions">
          {item.links.map((link) => (
            <Link
              key={link.label}
              href={withBase(link.href)}
              download={link.href.endsWith('.bib') ? `${detail.id}.bib` : undefined}
            >
              {link.label}
              {link.href.startsWith('http') && ' ↗'}
            </Link>
          ))}
        </div>
      )}

      {detail.sections.map((section) => (
        <section key={section.id} id={section.id} className="academic-section academic-prose">
          <h2>{section.title}</h2>
          {section.id === 'approach' && detail.steps && (
            <figure className="study-process">
              <ol>
                {detail.steps.map((step) => (
                  <li key={step.label}>
                    <span className="eyebrow">{step.label}</span>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </li>
                ))}
              </ol>
            </figure>
          )}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}

      <section id="role" className="academic-section academic-prose">
        <h2>{t.myRole}</h2>
        <RolePills roles={detail.roles} label={t.myRole} />
        {detail.roleNote && <p>{detail.roleNote}</p>}
      </section>

      <section id="citation" className="academic-section academic-prose">
        <h2>{t.citation}</h2>
        <p lang={locale === 'zh' && !CJK.test(detail.citation) ? 'en' : undefined}>
          {detail.citation}
        </p>
        <div className="profile-links">
          <Link href="/publications">{t.allPublications}</Link>
        </div>
      </section>
    </article>
  )
}
