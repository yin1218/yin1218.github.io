import Link from '@/components/Link'

// The overview moved under Publications; keep the old address working.
export const metadata = {
  title: 'Beyond Adaptation',
  robots: { index: false, follow: true },
}

export default function BeyondAdaptationMoved() {
  return (
    <div className="academic-document">
      <meta httpEquiv="refresh" content="0; url=/publications/beyond-adaptation" />
      <h1>This page has moved</h1>
      <p className="document-intro">
        <Link href="/publications/beyond-adaptation">Go to Beyond Adaptation</Link>
      </p>
    </div>
  )
}
