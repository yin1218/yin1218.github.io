import EssaysPage from '@/components/pages/Essays'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('en').blog, locale: 'en' })

export default function Page() {
  return <EssaysPage locale="en" />
}
