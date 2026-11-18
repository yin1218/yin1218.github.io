import Link from '@/components/Link'

// The timeline is now a view of the CV; keep the old address working.
export const metadata = {
  title: 'Timeline',
  robots: { index: false, follow: true },
}

export default function TimelineMoved() {
  return (
    <div className="academic-document">
      <meta httpEquiv="refresh" content="0; url=/resume#timeline" />
      <h1>This page has moved</h1>
      <p className="document-intro">
        <Link href="/resume#timeline">Go to the CV timeline</Link>
      </p>
    </div>
  )
}
