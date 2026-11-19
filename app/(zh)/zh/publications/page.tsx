import PublicationsPage from '@/components/pages/Publications'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('zh').publications, locale: 'zh' })

export default function Page() {
  return <PublicationsPage locale="zh" />
}
