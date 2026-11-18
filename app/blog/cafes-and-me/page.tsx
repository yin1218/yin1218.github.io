import Link from '@/components/Link'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.cafes)

export default function CafesAndMe() {
  return (
    <article className="academic-document">
      <p className="eyebrow">Beyond research</p>
      <h1>Cafés and me</h1>
      <p className="document-intro">A reflection on my relationship with cafés.</p>
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">Coming soon.</p>
      <Link className="project-link" href="/about">
        Back to About
      </Link>
    </article>
  )
}
