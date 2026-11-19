import AboutPage from '@/components/pages/About'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('en').about, locale: 'en' })

export default function Page() {
  return <AboutPage locale="en" />
}
