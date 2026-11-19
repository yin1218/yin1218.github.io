// Traditional Chinese (Taiwan) counterpart of data/nowData.ts (same order, same lanes).
import type { NowItem } from '../nowData'

export const nowUpdated = { iso: '2026-11', label: '2026 年 11 月' }

export const nowItems: NowItem[] = [
  {
    lane: 'research',
    label: '研究中',
    glyph: 'caret',
    text: '人們如何等待 AI 代理人完成交辦的任務',
    detail: '於臺大擔任 Nanyi Bi 的兼任研究助理 · 2026 年 9 月起',
  },
  {
    lane: 'work',
    label: '開發中',
    glyph: 'spinner',
    text: '國科會補助計畫的研究系統',
    detail: '於臺師大擔任 Nian-Shing Chen 的專任研究助理 · 2026 年 11 月起',
  },
  {
    lane: 'publications',
    label: '審查中',
    glyph: 'dots',
    text: 'AI 生成的自我詮釋',
    detail: '碩士論文，稿件審查中',
    href: '/publications/self-interpretations',
  },
]
