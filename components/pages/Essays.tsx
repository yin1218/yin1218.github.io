import Link from '@/components/Link'
import { getPageSEO } from 'app/seo'
import { Locale } from '@/data/i18n'

const copy = {
  en: { eyebrow: 'Beyond research', title: 'Essays' },
  zh: { eyebrow: '研究之外', title: '隨筆' },
}

export default function EssaysPage({ locale }: { locale: Locale }) {
  const seo = getPageSEO(locale)
  const essays = [seo.cafes, seo.photography, seo.sports]
  const t = copy[locale]
  return (
    <div className="academic-document academic-prose">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <ul>
        {essays.map((essay) => (
          <li key={essay.path}>
            <Link href={essay.path}>{essay.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
