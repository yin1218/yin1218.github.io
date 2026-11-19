import PublicationsPage from '@/components/pages/Publications'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('en').publications, locale: 'en' })

export default function Page() {
  return <PublicationsPage locale="en" />
}
