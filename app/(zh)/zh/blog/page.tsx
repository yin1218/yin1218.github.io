import EssaysPage from '@/components/pages/Essays'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('zh').blog, locale: 'zh' })

export default function Page() {
  return <EssaysPage locale="zh" />
}
