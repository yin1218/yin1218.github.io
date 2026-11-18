import CVTimeline from '@/components/CVTimeline'
import Link from '@/components/Link'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.timeline)

export default function Timeline() {
  return (
    <div className="academic-document cvt-page">
      <p className="eyebrow">CV · timeline view</p>
      <h1>Timeline</h1>
      <p className="document-intro">
        Scroll through the years to see what I was working on. Tap a category to hide or show it,
        and tap an entry for details. The full text version is on the <Link href="/resume">CV</Link>{' '}
        page.
      </p>
      <CVTimeline />
    </div>
  )
}
