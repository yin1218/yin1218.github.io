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
        Time runs down the page, month by month; each block is as tall as the time it lasted. Tap a
        category to hide or show it, and tap a block for details. The full text version is on the{' '}
        <Link href="/resume">CV</Link> page.
      </p>
      <CVTimeline />
    </div>
  )
}
