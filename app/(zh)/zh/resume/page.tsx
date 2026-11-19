import ResumePage from '@/components/pages/Resume'
import { genPageMetadata, getPageSEO } from 'app/seo'

export const metadata = genPageMetadata({ ...getPageSEO('zh').resume, locale: 'zh' })

export default function Page() {
  return <ResumePage locale="zh" />
}
