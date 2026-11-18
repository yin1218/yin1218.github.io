import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata, pageSEO } from 'app/seo'
import { components } from '@/components/MDXComponents'
import StructuredData from '@/components/StructuredData'
import { profileStructuredData } from '@/data/structuredData'

export const metadata = genPageMetadata(pageSEO.about)

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <StructuredData data={profileStructuredData(pageSEO.about)} />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
