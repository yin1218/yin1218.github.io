import { essayFeed } from '@/data/essays'

export const dynamic = 'force-static'

export function GET() {
  return essayFeed('zh')
}
