import PublicationList from '@/components/PublicationList'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.publications)

export default function Publications() {
  return (
    <div className="academic-document">
      <p className="eyebrow">Research output</p>
      <h1>Publications</h1>
      <p className="document-intro">
        Papers, manuscripts, and demos in human–computer interaction and human-centered AI.
      </p>
      <section id="publications" className="academic-section">
        <PublicationList />
      </section>
    </div>
  )
}
