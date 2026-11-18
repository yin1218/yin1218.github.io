// One detail page per publication (/publications/<id>). `id` matches data/academicData.ts.
// Keep unpublished work (under review) to what is already public: no findings or data.
export interface PublicationDetail {
  id: string
  shortTitle: string
  eyebrow: string
  summary: string
  description: string
  steps?: { label: string; title: string; text: string }[]
  sections: { id: string; nav: string; title: string; paragraphs: string[] }[]
  roles: string[]
  roleNote?: string
  citation: string
}

export const publicationDetails: PublicationDetail[] = [
  {
    id: 'seeing-yourself',
    shortTitle: 'Seeing Yourself Before Being Seen',
    eyebrow: 'Human-AI interaction · Self-presentation',
    summary:
      'How people articulate themselves, and anticipate presenting themselves to others, when they read AI-generated interpretations of who they are.',
    description:
      'Seeing Yourself Before Being Seen by Chien-Yin Wu and Nanyi Bi: a master’s thesis study of AI-generated self-interpretations, under review at CHI 2027.',
    sections: [
      {
        id: 'overview',
        nav: 'Overview',
        title: 'The research question',
        paragraphs: [
          'What happens when an AI system offers people an interpretation of themselves before they present themselves to someone else?',
          'This paper comes from my master’s thesis at National Taiwan University. It follows Beyond Adaptation, moving from generating ideas for self-presentation to how people respond to seeing themselves described by AI.',
        ],
      },
      {
        id: 'status',
        nav: 'Status',
        title: 'Status',
        paragraphs: [
          'The manuscript is under review at CHI 2027. Study details and findings will be added here once the review is complete.',
        ],
      },
    ],
    roles: ['Study design', 'Interviews', 'Qualitative analysis', 'Writing'],
    roleNote: 'Carried out with my advisor, Nanyi Bi, at National Taiwan University.',
    citation:
      'Chien-Yin Wu and Nanyi Bi. Seeing Yourself Before Being Seen: Participant Articulation and Anticipated Self-Presentation with AI-Generated Self-Interpretations. Manuscript under review at CHI 2027.',
  },
  {
    id: 'beyond-adaptation',
    shortTitle: 'Beyond Adaptation',
    eyebrow: 'Human-AI interaction · Cross-cultural communication',
    summary: 'An LLM-supported self-presentation ideation tool for cross-cultural mingling.',
    description:
      'Beyond Adaptation by Chien-Yin Wu and Nanyi Bi: seven interviews and an LLM-supported self-presentation ideation prototype for cross-cultural mingling, CHI EA 2025.',
    steps: [
      {
        label: '01 · Understand',
        title: '7 interviews',
        text: 'Hour-long conversations about cross-cultural mingling.',
      },
      {
        label: '02 · Design & build',
        title: 'LLM-supported prototype',
        text: 'A tool for developing self-presentation ideas.',
      },
      {
        label: '03 · Share',
        title: 'CHI EA 2025',
        text: 'Published as a Late-Breaking Work.',
      },
    ],
    sections: [
      {
        id: 'overview',
        nav: 'Overview',
        title: 'The research question',
        paragraphs: [
          'How can AI support people in developing ideas for presenting themselves when meeting people from different cultural backgrounds?',
          'This project brings together qualitative interviews and an interactive prototype to explore self-presentation in cross-cultural mingling. It connects my interests in human-centered AI and cross-cultural communication.',
        ],
      },
      {
        id: 'approach',
        nav: 'Research approach',
        title: 'Research approach',
        paragraphs: [
          'I conducted seven hour-long interviews about people’s experiences of cross-cultural mingling. I also designed and developed an LLM-supported prototype for self-presentation ideation. The prototype explores using AI to help people develop ideas for what they might share about themselves in these interactions.',
        ],
      },
    ],
    roles: ['Interviews', 'Prototype design', 'LLM implementation'],
    roleNote: 'Carried out with my advisor, Nanyi Bi, at National Taiwan University.',
    citation:
      'Chien-Yin Wu and Nanyi Bi. 2025. Beyond Adaptation: an LLM-Supported Self-Presentation Ideation Tool for Cross-Cultural Mingling. Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA ’25), 1–6. https://doi.org/10.1145/3706599.3719929',
  },
  {
    id: 'oblivilight',
    shortTitle: 'Oblivilight 憶光',
    eyebrow: 'Generative AI · Emotional support',
    summary:
      'A demo exploring forgetting mechanisms in generative AI for emotional support, built at OpenHCI 2025.',
    description:
      'Oblivilight: a TAICHI 2025 demo from OpenHCI 2025 exploring forgetting mechanisms in generative AI for emotional support.',
    sections: [
      {
        id: 'overview',
        nav: 'Overview',
        title: 'The idea',
        paragraphs: [
          'Emotional-support AI usually remembers everything a person tells it. Oblivilight asks what forgetting could offer instead.',
          'The project was developed by a student team during OpenHCI 2025, a five-day HCI workshop, and presented as a demo at TAICHI 2025.',
        ],
      },
      {
        id: 'approach',
        nav: 'How it was made',
        title: 'How it was made',
        paragraphs: [
          'The team went from ideation to a working Arduino prototype within the workshop. I joined as the team’s technical teaching assistant.',
        ],
      },
    ],
    roles: ['Technical mentoring', 'Prototyping support'],
    roleNote: 'Seventh author. I guided the six-person team as OpenHCI 2025 technical TA.',
    citation:
      '湯宇, 張韻柔, 邱馨論, 李思穎, 陶俊儒, 周杰穎, and Chien-Yin Wu. 2025. Oblivilight 憶光：探索情感支持生成式人工智慧的遺忘機制 (Oblivilight: Exploring Forgetting Mechanisms in Generative AI for Emotional Support). TAICHI 2025, Demo.',
  },
]
