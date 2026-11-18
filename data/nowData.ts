// "Now" block on the home page. Update `updated` whenever the list changes.
// `lane` reuses the timeline colours (see data/timelineData.ts).
import type { LaneId } from './timelineData'

export interface NowItem {
  lane: LaneId
  label: string
  text: string
  detail: string
  glyph: 'caret' | 'spinner' | 'dots'
  href?: string
}

export const nowUpdated = { iso: '2026-11', label: 'November 2026' }

export const nowItems: NowItem[] = [
  {
    lane: 'research',
    label: 'Studying',
    glyph: 'caret',
    text: 'How people wait for AI agents to finish delegated tasks',
    detail: 'Part-time research assistant with Nanyi Bi, NTU · since September 2026',
  },
  {
    lane: 'work',
    label: 'Building',
    glyph: 'spinner',
    text: 'A research system for an NSTC-funded project',
    detail: 'Research assistant with Nian-Shing Chen · since November 2026',
  },
  {
    lane: 'publications',
    label: 'Under review',
    glyph: 'dots',
    text: 'Seeing Yourself Before Being Seen',
    detail: 'Thesis paper, submitted to CHI 2027',
    href: '/publications#seeing-yourself',
  },
]
