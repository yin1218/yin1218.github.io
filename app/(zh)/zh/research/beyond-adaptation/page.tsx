import MovedPage from '@/components/pages/Moved'
import { absoluteUrl } from 'app/seo'

// A retired address kept alive; it forwards to its new home.
export const metadata = {
  title: 'Beyond Adaptation',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/zh/publications/beyond-adaptation') },
}

export default function Page() {
  return (
    <MovedPage locale="zh" to="/publications/beyond-adaptation" label="前往 Beyond Adaptation" />
  )
}
