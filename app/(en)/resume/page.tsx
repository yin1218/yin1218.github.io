import ResumePage from '@/components/pages/Resume'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('en').resume, locale: 'en' })

export default function Page() {
  return <ResumePage locale="en" />
}
