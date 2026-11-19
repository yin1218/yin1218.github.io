import ProjectsPage from '@/components/pages/Projects'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('en').projects, locale: 'en' })

export default function Page() {
  return <ProjectsPage locale="en" />
}
