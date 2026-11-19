import PublicationList from '@/components/PublicationList'
import { Locale } from '@/data/i18n'
import StructuredData from '@/components/StructuredData'
import { publicationsStructuredData } from '@/data/structuredData'

const copy = {
  en: {
    eyebrow: 'Research output',
    title: 'Publications',
    intro: 'Papers, manuscripts, and demos in human–computer interaction and human-centered AI.',
  },
  zh: {
    eyebrow: '研究成果',
    title: '學術著作',
    intro: '人機互動與以人為本的 AI 領域的論文、稿件與展示作品。',
  },
}

export default function PublicationsPage({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <div className="academic-document">
      <StructuredData data={publicationsStructuredData(locale)} />
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className="document-intro">{t.intro}</p>
      <section id="publications" className="academic-section">
        <PublicationList locale={locale} heading="h2" />
      </section>
    </div>
  )
}
