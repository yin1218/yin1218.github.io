import type { Metadata } from 'next'
import SiteShell from '@/components/SiteShell'
import { rootMetadata } from '../seo'

export const metadata: Metadata = rootMetadata('zh')

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="zh">{children}</SiteShell>
}
