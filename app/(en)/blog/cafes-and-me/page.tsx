import CafesEssay from '@/components/pages/essays/Cafes'
import StructuredData from '@/components/StructuredData'
import { essayStructuredData } from '@/data/structuredData'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({
  ...getPageSEO('en').cafes,
  locale: 'en',
  type: 'article',
})

export default function Page() {
  return (
    <>
      <StructuredData data={essayStructuredData('cafes', '2026-11', 'en')} />
      <CafesEssay locale="en" />
    </>
  )
}
