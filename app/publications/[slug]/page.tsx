import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import RolePills from '@/components/RolePills'
import StructuredData from '@/components/StructuredData'
import { publications } from '@/data/academicData'
import { publicationDetails } from '@/data/publicationDetails'
import { researchStructuredData } from '@/data/structuredData'
import { genPageMetadata } from 'app/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return publicationDetails.map((detail) => ({ slug: detail.id }))
}

const find = (slug: string) => {
  const detail = publicationDetails.find((item) => item.id === slug)
  const item = publications.find((entry) => entry.id === slug)
  return detail && item ? { detail, item } : undefined
}

const withBase = (href: string) =>
  href.startsWith('/static/') ? `${process.env.BASE_PATH || ''}${href}` : href

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const found = find((await props.params).slug)
  if (!found) return {}
  return genPageMetadata({
    title: `${found.detail.shortTitle} · ${found.item.type} ${found.item.year}`,
    description: found.detail.description,
    path: `/publications/${found.detail.id}`,
    index: found.item.type !== 'Under review',
  })
}

export default async function PublicationPage(props: { params: Promise<{ slug: string }> }) {
  const found = find((await props.params).slug)
  if (!found) notFound()
  const { detail, item } = found

  return (
    <article className="academic-document research-document">
      {detail.id === 'beyond-adaptation' && <StructuredData data={researchStructuredData()} />}
      <p className="eyebrow">
        <Link href="/publications">Publications</Link> / {detail.eyebrow}
      </p>
      <h1 lang={/[一-鿿]/.test(detail.shortTitle) ? 'zh-Hant' : undefined}>{detail.shortTitle}</h1>
      <p className="document-intro">{detail.summary}</p>
      <p className="research-byline">
        {item.authors.join(', ')} · {item.type} · {item.year}
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
        <h2>My role</h2>
        <RolePills roles={detail.roles} />
        {detail.roleNote && <p>{detail.roleNote}</p>}
      </section>

      <section id="citation" className="academic-section academic-prose">
        <h2>Citation</h2>
        <p>{detail.citation}</p>
        <div className="profile-links">
          <Link href="/publications">← All publications</Link>
        </div>
      </section>
    </article>
  )
}
