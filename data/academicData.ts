// Sources: materials/Resume20260311.pdf, Resume20251117.pdf, Resume_v9.pdf,
// Resume_v8.pdf and Resume_v7_ChienYinWu.pdf. Graduation and 2026–2027
// appointments confirmed by the owner.
export interface Experience {
  title: string
  organization: string
  date: string
  description: string
}

export const education = [
  {
    title: 'Master of Information Management',
    organization: 'National Taiwan University',
    date: 'Fall 2024 – August 2026',
    description:
      'Advisor: Nanyi Bi. Research focus: human–computer interaction and human-centered AI.',
  },
  {
    title: 'Bachelor of Information Management',
    organization: 'National Taiwan University',
    date: 'Graduated summer 2024',
    description: 'Minor in Philosophy.',
  },
  {
    title: 'Exchange student, Computer Science',
    organization: 'KTH Royal Institute of Technology, Sweden',
    date: 'Spring – summer 2024',
    description: '',
  },
]

// Selected from the NTU transcripts (graduate record downloaded 2026-07-10; undergraduate
// record). Only courses close to the research area with a grade of A or A+ are listed.
// Graduate titles are the official English ones; undergraduate titles are translated.
export const selectedCourses: { level: string; courses: { title: string; grade: string }[] }[] = [
  {
    level: 'Graduate',
    courses: [
      { title: 'Research Methods', grade: 'A+' },
      { title: 'Human Computer Interaction and Social Computing (I) & (II)', grade: 'A+' },
      { title: 'Human Computer Interaction and User Studies', grade: 'A' },
      { title: 'Social Design: An Introduction', grade: 'A' },
      { title: 'Data Strategist', grade: 'A+' },
    ],
  },
  {
    level: 'Undergraduate',
    courses: [
      { title: 'Machine Learning', grade: 'A+' },
      { title: 'Introduction to Text Mining', grade: 'A+' },
      { title: 'Big Data and Business Analytics', grade: 'A+' },
      { title: 'Advanced Interactive Technologies', grade: 'A' },
      { title: 'Research in HCI and Social Computing', grade: 'A+' },
      { title: 'Data Structures and Advanced Programming', grade: 'A+' },
      { title: 'Database Management', grade: 'A+' },
      { title: 'General Psychology', grade: 'A+' },
    ],
  },
]

export const publication = {
  path: '/publications/beyond-adaptation',
  citationPath: '/static/files/beyond-adaptation.bib',
  datePublished: '2025-04-25',
  title:
    'Beyond Adaptation: an LLM-Supported Self-Presentation Ideation Tool for Cross-Cultural Mingling',
  authors: 'Chien-Yin Wu and Nanyi Bi',
  venue: 'CHI EA 2025 · Late-Breaking Work',
  href: 'https://doi.org/10.1145/3706599.3719929',
  description:
    'I conducted seven hour-long interviews about cross-cultural mingling and designed and developed an LLM-supported prototype for self-presentation ideation.',
}

// Sources: Obsidian PhD/申請素材/履歷素材總表 (updated 2026-11-17).
// TAICHI title and author order checked against the official TAICHI 2025 agenda.
export interface PublicationItem {
  id: string
  type: 'Under review' | 'Conference extended abstract' | 'Demo'
  year: string
  authors: string[]
  title: string
  originalTitle?: string
  role?: string
  venue: string
  links?: { label: string; href: string }[]
}

export const selfName = 'Chien-Yin Wu'

export const publications: PublicationItem[] = [
  {
    id: 'seeing-yourself',
    type: 'Under review',
    year: '2026',
    authors: ['Chien-Yin Wu', 'Nanyi Bi'],
    title:
      'Seeing Yourself Before Being Seen: Participant Articulation and Anticipated Self-Presentation with AI-Generated Self-Interpretations',
    venue: 'Manuscript under review at CHI 2027',
  },
  {
    id: 'beyond-adaptation',
    type: 'Conference extended abstract',
    year: '2025',
    authors: ['Chien-Yin Wu', 'Nanyi Bi'],
    title: publication.title,
    venue:
      'Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA ’25) · Late-Breaking Work',
    links: [
      { label: 'Paper', href: publication.href },
      { label: 'BibTeX', href: publication.citationPath },
    ],
  },
  {
    id: 'oblivilight',
    type: 'Demo',
    year: '2025',
    authors: ['湯宇', '張韻柔', '邱馨論', '李思穎', '陶俊儒', '周杰穎', 'Chien-Yin Wu'],
    title: 'Oblivilight: Exploring Forgetting Mechanisms in Generative AI for Emotional Support',
    originalTitle: 'Oblivilight 憶光：探索情感支持生成式人工智慧的遺忘機制',
    venue: 'TAICHI 2025 · Demo (OpenHCI 2025)',
    role: 'Technical teaching assistant to the six-person student team',
    links: [{ label: 'Program', href: 'https://taichi2025.taiwanchi.org/#/agenda' }],
  },
]

export const researchExperience: Experience[] = [
  {
    title: 'Full-time Research Assistant',
    organization: 'NSTC-funded research project · Supervisor: Nian-Shing Chen',
    date: 'November 2026 – present',
    description:
      'Implementing a research system for a project funded by Taiwan’s National Science and Technology Council (NSTC).',
  },
  {
    title: 'Part-time Research Assistant',
    organization: 'National Taiwan University · Supervisor: Nanyi Bi',
    date: 'September 2026 – January 2027 (expected)',
    description:
      'Conducting interviews and analysis for a qualitative study of how people wait for AI agents to finish delegated tasks.',
  },
  {
    title: 'Research Assistant',
    organization: 'National Taiwan University · Advisor: Nanyi Bi',
    date: 'Summer 2024 – August 2026',
    description:
      'Conducted seven hour-long interviews on cross-cultural mingling. Designed and developed an LLM-supported self-presentation ideation prototype; the work was accepted at CHI EA 2025.',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'National Taiwan University · Advisor: Lung-Pan Cheng',
    date: 'Summer 2022',
    description:
      'Designed and conducted experiments with 15 participants for a changing-perspective projection system in virtual reality.',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'National Taiwan University · Advisor: Ling-Chieh Kung',
    date: 'Spring – summer 2022',
    description:
      'Built a rider arrival-rate prediction model for Global Express using Lasso and Ridge regression to support operational planning.',
  },
]

export const workExperience: Experience[] = [
  {
    title: 'InnoServe Intern',
    organization: 'Jubo Health',
    date: 'Spring 2026 – October 2026',
    description:
      'Digitized order workflows through API automation and consolidation of sales logic.',
  },
  {
    title: 'Part-time Frontend Developer',
    organization: 'Junyi Academy',
    date: 'Fall 2022 – spring 2023',
    description:
      'Developed a frontend application that supports teachers in recording students’ non-cognitive development.',
  },
  {
    title: 'Frontend Developer Intern',
    organization: 'LINE Taiwan',
    date: 'Summer 2022 – summer 2023',
    description:
      'Developed frontend modules for LINE TODAY with Nuxt.js and explored frontend SEO improvements.',
  },
  {
    title: 'Student Consultant',
    organization: 'Smart Daily & beBit',
    date: 'Fall 2021 – spring 2022',
    description:
      'Conducted 12 user interviews, identified more than 30 pain points, and facilitated a solution workshop with 10 company staff members.',
  },
]

export const teachingExperience: Experience[] = [
  {
    title: 'Teaching Assistant',
    organization: 'National Taiwan University',
    date: 'Fall 2025',
    description:
      'Cross-Cultural Communication & Management (English-medium instruction); Entrepreneurship and What’s Next.',
  },
  {
    title: 'Teaching Assistant',
    organization: 'National Taiwan University',
    date: 'Spring 2025',
    description: 'Big Data & Business Analytics.',
  },
  {
    title: 'Technical Teaching Assistant',
    organization: 'National Taiwan University',
    date: 'Fall 2022',
    description: 'User Interface Design.',
  },
]

export const leadershipExperience: Experience[] = [
  {
    title: 'Workshop Instructor',
    organization: 'Taiwan FactCheck Education Foundation',
    date: 'Spring 2023',
    description:
      'Designed and led three in-person, half-day workshops on digital literacy and fact-checking for older adults.',
  },
  {
    title: 'Lead Coordinator',
    organization: 'Open HCI',
    date: 'Spring – summer 2022',
    description: 'Organized a five-day human–computer interaction workshop for 105 participants.',
  },
  {
    title: 'Web Developer Volunteer',
    organization: 'Teach for Taiwan',
    date: 'Spring – summer 2022',
    description:
      'Shared research on web technologies and development approaches with the team and created technical documentation.',
  },
]

export const awards = [
  { title: 'Garmin Scholarship', date: '2025', description: 'NT$100,000 scholarship recipient.' },
  { title: 'InnoServe Awards', date: '2021', description: 'Second Prize, IP category.' },
  { title: 'QS-Wharton Reimagine Education Awards', date: '2021', description: 'Finalist.' },
  {
    title: 'APP Mobile Application Innovation Competition',
    date: '2021',
    description: 'Honorable Mention.',
  },
  { title: 'Trans Action Award', date: '2021', description: 'HTC Prize.' },
]

// Grouping and items follow the "Methods and Technical Skills" section of the English CV
// (Obsidian PhD/申請素材/英文履歷, 2026-11-18).
export const skills = [
  {
    title: 'Qualitative methods',
    description:
      'Semi-structured interviews, think-aloud sessions, thematic analysis, workshop facilitation.',
  },
  {
    title: 'Quantitative methods',
    description: 'Survey design, experimental design, ANOVA, regression.',
  },
  { title: 'Design & prototyping', description: 'Figma, interface prototyping.' },
  { title: 'Physical computing', description: 'Arduino, Raspberry Pi.' },
  {
    title: 'Frontend',
    description: 'JavaScript / TypeScript, React, Next.js, Vue / Nuxt.js.',
  },
  { title: 'Backend & cloud', description: 'Python, Node.js, PostgreSQL, AWS, GCP.' },
  {
    title: 'AI & machine learning',
    description: 'LLM API integration, PyTorch, scikit-learn, NumPy, pandas.',
  },
  { title: 'Languages', description: 'Mandarin Chinese (native); English (TOEFL iBT 106).' },
]
