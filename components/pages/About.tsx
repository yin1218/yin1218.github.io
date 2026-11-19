import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import AuthorLayout from '@/layouts/AuthorLayout'
import { components } from '@/components/MDXComponents'
import StructuredData from '@/components/StructuredData'
import { getPageSEO } from 'app/seo'
import { profileStructuredData } from '@/data/structuredData'
import { Locale } from '@/data/i18n'

export default function AboutPage({ locale }: { locale: Locale }) {
  const slug = locale === 'zh' ? 'default-zh' : 'default'
  const author = allAuthors.find((p) => p.slug === slug) as Authors
  return (
    <>
      <StructuredData data={profileStructuredData(getPageSEO(locale).about, locale)} />
      <AuthorLayout content={coreContent(author)} locale={locale}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
