import HomePage from '@/components/pages/Home'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({
  ...getPageSEO('zh').home,
  locale: 'zh',
  absoluteTitle: true,
})

export default function Page() {
  return <HomePage locale="zh" />
}
