import type { Metadata } from 'next'
import SiteShell from '@/components/SiteShell'
import { rootMetadata } from '../seo'

export const metadata: Metadata = rootMetadata('en')

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>
}
