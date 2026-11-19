// Traditional Chinese (Taiwan) counterparts of the publication list in data/academicData.ts.
// `type` is a display string here; the English data decides what is "Under review".
import type { PublicationItem } from '../academicData'

export type ZhPublicationItem = Omit<PublicationItem, 'type'> & { type: string }

export const publicationTypes: Record<PublicationItem['type'], string> = {
  'Under review': '審查中',
  'Conference extended abstract': '研討會延伸摘要',
  Demo: '展示',
}

export const publications: ZhPublicationItem[] = [
  {
    id: 'self-interpretations',
    type: publicationTypes['Under review'],
    year: '2026',
    authors: ['Chien-Yin Wu', 'Nanyi Bi'],
    title: 'AI 生成的自我詮釋與預期的自我呈現之研究',
    venue: '審查中稿件（題目暫不公開）',
  },
  {
    id: 'beyond-adaptation',
    type: publicationTypes['Conference extended abstract'],
    year: '2025',
    authors: ['Chien-Yin Wu', 'Nanyi Bi'],
    title:
      'Beyond Adaptation: an LLM-Supported Self-Presentation Ideation Tool for Cross-Cultural Mingling',
    venue:
      'Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA ’25) · Late-Breaking Work',
    links: [
      { label: '論文', href: 'https://doi.org/10.1145/3706599.3719929' },
      { label: 'BibTeX', href: '/static/files/beyond-adaptation.bib' },
    ],
  },
  {
    id: 'oblivilight',
    type: publicationTypes.Demo,
    year: '2025',
    authors: ['湯宇', '張韻柔', '邱馨論', '李思穎', '陶俊儒', '周杰穎', '巫芊瑩'],
    title: 'Oblivilight 憶光：探索情感支持生成式人工智慧的遺忘機制',
    originalTitle:
      'Oblivilight: Exploring Forgetting Mechanisms in Generative AI for Emotional Support',
    venue: 'Interactive Demonstration, TAICHI 2025 (OpenHCI 2025)',
    role: '共同作者；以技術助教身分指導六人學生團隊，並協助 Arduino 實作',
    links: [{ label: '議程', href: 'https://taichi2025.taiwanchi.org/#/agenda' }],
  },
]
