import HomePage from '@/components/pages/Home'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({
  ...getPageSEO('en').home,
  locale: 'en',
  absoluteTitle: true,
})

export default function Page() {
  return <HomePage locale="en" />
}
