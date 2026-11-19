import SportsEssay from '@/components/pages/essays/Sports'
import StructuredData from '@/components/StructuredData'
import { essayStructuredData } from '@/data/structuredData'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({
  ...getPageSEO('en').sports,
  locale: 'en',
  type: 'article',
})

export default function Page() {
  return (
    <>
      <StructuredData data={essayStructuredData('sports', '2026-11', 'en')} />
      <SportsEssay locale="en" />
    </>
  )
}
