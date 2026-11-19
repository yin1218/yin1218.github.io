import PublicationDetailPage, {
  findPublication,
  publicationSlugs,
} from '@/components/pages/PublicationDetail'
import { genPageMetadata } from 'app/seo'
import { citationMeta } from '@/data/citationMeta'

export const dynamicParams = false

export const generateStaticParams = publicationSlugs

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const found = findPublication((await props.params).slug, 'zh')
  if (!found) return {}
  const metadata = genPageMetadata({
    title: `${found.detail.shortTitle} · ${found.item.type} ${found.item.year}`,
    description: found.detail.description,
    path: `/publications/${found.detail.id}`,
    locale: 'zh',
    index: !found.underReview,
  })
  const other = citationMeta(found.detail.id, 'zh')
  return other ? { ...metadata, other } : metadata
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  return <PublicationDetailPage slug={(await props.params).slug} locale="zh" />
}
