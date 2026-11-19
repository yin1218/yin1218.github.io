import MovedPage from '@/components/pages/Moved'
import { absoluteUrl } from 'app/seo'

// A retired address kept alive; it forwards to its new home.
export const metadata = {
  title: 'Timeline',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/resume') },
}

export default function Page() {
  return <MovedPage locale="en" to="/resume#timeline" label="Go to the CV timeline" />
}
