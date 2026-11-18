import Link from '@/components/Link'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.blog)

const essays = [pageSEO.cafes, pageSEO.photography, pageSEO.sports]

export default function Essays() {
  return (
    <div className="academic-document academic-prose">
      <p className="eyebrow">Beyond research</p>
      <h1>Essays</h1>
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
