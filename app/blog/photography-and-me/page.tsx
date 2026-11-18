import Link from '@/components/Link'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.photography)

export default function PhotographyAndMe() {
  return (
    <article className="academic-document">
      <p className="eyebrow">Beyond research</p>
      <h1>Photography and me</h1>
      <p className="document-intro">A reflection on my relationship with photography.</p>
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">Coming soon.</p>
      <Link className="project-link" href="/about">
        Back to About
      </Link>
    </article>
  )
}
