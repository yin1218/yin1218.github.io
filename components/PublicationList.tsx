import { Fragment } from 'react'
import Link from '@/components/Link'
import { publications, selfName } from '@/data/academicData'

const withBase = (href: string) =>
  href.startsWith('/static/') ? `${process.env.BASE_PATH || ''}${href}` : href

export default function PublicationList() {
  return (
    <ol className="publication-list">
      {publications.map((item) => (
        <li key={item.id} id={item.id} className="publication-item">
          <p className="publication-type">
            {item.type} · {item.year}
          </p>
          <h3>{item.title}</h3>
          {item.originalTitle && (
            <p className="publication-original" lang="zh-Hant">
              {item.originalTitle}
            </p>
          )}
          <p className="publication-authors">
            {item.authors.map((author, index) => (
              <Fragment key={author}>
                {index > 0 && ', '}
                {author === selfName ? (
                  <strong>{author}</strong>
                ) : (
                  <span lang={/[一-鿿]/.test(author) ? 'zh-Hant' : undefined}>{author}</span>
                )}
              </Fragment>
            ))}
          </p>
          <p className="publication-venue">{item.venue}</p>
          {item.links && (
            <div className="publication-links">
              {item.links.map((link) => (
                <Link key={link.label} className="project-link" href={withBase(link.href)}>
                  {link.label}
                  {link.href.startsWith('http') && <span aria-hidden="true"> ↗</span>}
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}
