import type { Metadata } from 'next'
import NotFoundPage from '@/components/pages/NotFound'
import { dictionary } from '@/data/dictionary'

export const metadata: Metadata = {
  title: dictionary.zh.notFound.title,
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  alternates: { canonical: null },
}

export default function NotFound() {
  return <NotFoundPage locale="zh" />
}
