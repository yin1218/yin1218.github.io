import ProjectList from '@/components/ProjectList'
import { genPageMetadata, pageSEO } from 'app/seo'
import StructuredData from '@/components/StructuredData'
import { projectsStructuredData } from '@/data/structuredData'

export const metadata = genPageMetadata(pageSEO.projects)

export default function Projects() {
  return (
    <div className="academic-document">
      <StructuredData data={projectsStructuredData()} />
      <p className="eyebrow">Selected work</p>
      <h1>Projects</h1>
      <p className="document-intro">
        Applications and prototypes across education, community services, and everyday life.
      </p>
      <div className="mt-10">
        <ProjectList detailed filterable />
      </div>
    </div>
  )
}
