import AboutPage from '@/components/pages/About'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('zh').about, locale: 'zh' })

export default function Page() {
  return <AboutPage locale="zh" />
}
