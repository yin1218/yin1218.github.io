import ProjectList from '@/components/ProjectList'
import StructuredData from '@/components/StructuredData'
import { projectsStructuredData } from '@/data/structuredData'
import { Locale } from '@/data/i18n'

const copy = {
  en: {
    eyebrow: 'Selected work',
    title: 'Projects',
    intro: 'Applications and prototypes across education, community services, and everyday life.',
  },
  zh: {
    eyebrow: '精選作品',
    title: '專案',
    intro: '教育、社區服務與日常生活領域的應用程式與原型。',
  },
}

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <div className="academic-document">
      <StructuredData data={projectsStructuredData(locale)} />
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className="document-intro">{t.intro}</p>
      <div className="mt-10">
        <ProjectList detailed filterable />
      </div>
    </div>
  )
}
