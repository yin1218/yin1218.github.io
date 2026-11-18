import Main from './Main'
import StructuredData from '@/components/StructuredData'
import { profileStructuredData } from '@/data/structuredData'
import { genPageMetadata, pageSEO } from './seo'

export const metadata = genPageMetadata({ ...pageSEO.home, absoluteTitle: true })

export default function Page() {
  return (
    <>
      <StructuredData data={profileStructuredData(pageSEO.home)} />
      <Main />
    </>
  )
}
