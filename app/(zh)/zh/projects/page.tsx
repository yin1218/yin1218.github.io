import ProjectsPage from '@/components/pages/Projects'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('zh').projects, locale: 'zh' })

export default function Page() {
  return <ProjectsPage locale="zh" />
}
