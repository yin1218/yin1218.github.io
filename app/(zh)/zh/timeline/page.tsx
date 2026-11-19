import MovedPage from '@/components/pages/Moved'
import { absoluteUrl } from 'app/seo'

// A retired address kept alive; it forwards to its new home.
export const metadata = {
  title: '時間軸',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl('/zh/resume') },
}

export default function Page() {
  return <MovedPage locale="zh" to="/resume#timeline" label="前往履歷時間軸" />
}
