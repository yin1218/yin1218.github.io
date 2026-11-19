import PhotographyEssay from '@/components/pages/essays/Photography'
import StructuredData from '@/components/StructuredData'
import { essayStructuredData } from '@/data/structuredData'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({
  ...getPageSEO('zh').photography,
  locale: 'zh',
  type: 'article',
})

export default function Page() {
  return (
    <>
      <StructuredData data={essayStructuredData('photography', '2026-11', 'zh')} />
      <PhotographyEssay locale="zh" />
    </>
  )
}
