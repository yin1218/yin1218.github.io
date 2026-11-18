// Timeline view of the CV. Dates come from data/academicData.ts and the Obsidian
// CV notes (PhD/申請素材/履歷素材總表).
//
// `start` / `end` are 'YYYY-MM'. Where the CV only gives a season, the months follow the
// NTU calendar: spring = Feb–Jun, summer = Jul–Aug, fall = Sep–Jan. Use a bare 'YYYY'
// start when only the year is known, and end: 'present' for ongoing items.
export type LaneId = 'education' | 'research' | 'publications' | 'work' | 'teaching' | 'awards'

export const lanes: { id: LaneId; title: string; short: string }[] = [
  { id: 'education', title: 'Education', short: 'Edu' },
  { id: 'research', title: 'Research', short: 'Res' },
  { id: 'publications', title: 'Publications', short: 'Pub' },
  { id: 'work', title: 'Work', short: 'Work' },
  { id: 'teaching', title: 'Teaching & service', short: 'Teach' },
  { id: 'awards', title: 'Awards', short: 'Award' },
]

export interface TimelineItem {
  lane: LaneId
  title: string
  org: string
  start: string
  end?: string
  note?: string
  detail?: string
  href?: string
}

// The month the timeline was last brought up to date; it is the top of the axis.
export const timelineNow = '2026-11'

export const timelineYears = [2026, 2025, 2024, 2023, 2022, 2021]

export const yearSummaries: Record<number, string> = {
  2026: 'Finishing the master’s thesis and moving into research on waiting for AI agents.',
  2025: 'First CHI publication, teaching, and the OpenHCI demo.',
  2024: 'Exchange at KTH, then starting graduate research with Nanyi Bi.',
  2023: 'Frontend work in industry and digital-literacy workshops.',
  2022: 'First research projects, frontend internships, and leading OpenHCI.',
  2021: 'Service design projects and competitions.',
}

export const timelineItems: TimelineItem[] = [
  // 2026
  {
    lane: 'education',
    title: 'M.S. in Information Management',
    org: 'National Taiwan University',
    start: '2024-09',
    end: '2026-08',
    detail: 'Advisor: Nanyi Bi. Thesis on AI-generated self-interpretations.',
  },
  {
    lane: 'research',
    title: 'Full-time Research Assistant, NSTC project',
    org: 'National Taiwan Normal University · Nian-Shing Chen',
    start: '2026-11',
    end: 'present',
    detail: 'Implementing a research system for a project funded by Taiwan’s NSTC.',
  },
  {
    lane: 'research',
    title: 'Part-time Research Assistant',
    org: 'National Taiwan University · Nanyi Bi',
    start: '2026-09',
    end: '2027-01',
    note: 'Through January 2027 (expected)',
    detail:
      'A qualitative study of people waiting for AI agents to finish delegated tasks: interviews, analysis, and iterative transcript review.',
  },
  {
    lane: 'publications',
    title: 'Seeing Yourself Before Being Seen',
    org: 'Manuscript under review',
    start: '2026',
    detail:
      'Participant articulation and anticipated self-presentation with AI-generated self-interpretations.',
    href: '/publications/seeing-yourself',
  },
  {
    lane: 'work',
    title: 'InnoServe Intern',
    org: 'Jubo Health',
    start: '2026-02',
    end: '2026-10',
    detail: 'Automated order processing via APIs and consolidated the sales rules.',
  },
  // 2025
  {
    lane: 'publications',
    title: 'Beyond Adaptation',
    org: 'CHI EA 2025 · Late-Breaking Work',
    start: '2025-04',
    detail: 'An LLM-supported self-presentation ideation tool for cross-cultural mingling.',
    href: '/publications/beyond-adaptation',
  },
  {
    lane: 'publications',
    title: 'Oblivilight 憶光',
    org: 'TAICHI 2025 · Demo',
    start: '2025',
    detail: 'Forgetting mechanisms in generative AI for emotional support; co-author.',
    href: '/publications/oblivilight',
  },
  {
    lane: 'teaching',
    title: 'Teaching Assistant',
    org: 'Big Data & Business Analytics',
    start: '2025-02',
    end: '2025-06',
    detail: 'Python practice sessions, student questions, and final-project grading.',
  },
  {
    lane: 'teaching',
    title: 'Technical TA, OpenHCI 2025',
    org: 'OpenHCI',
    start: '2025-07',
    end: '2025-08',
    detail: 'Guided a six-person team from ideation to an Arduino prototype.',
  },
  {
    lane: 'teaching',
    title: 'Teaching Assistant',
    org: 'Cross-Cultural Communication · Entrepreneurship',
    start: '2025-09',
    end: '2026-01',
  },
  {
    lane: 'awards',
    title: 'Garmin Scholarship',
    org: 'NT$100,000',
    start: '2025',
  },
  // 2024
  {
    lane: 'education',
    title: 'B.S. in Information Management',
    org: 'National Taiwan University',
    start: '2020-09',
    end: '2024-06',
    detail: 'Minor in Philosophy.',
  },
  {
    lane: 'education',
    title: 'Exchange, Computer Science',
    org: 'KTH Royal Institute of Technology',
    start: '2024-01',
    end: '2024-06',
  },
  {
    lane: 'research',
    title: 'Graduate Research Assistant',
    org: 'National Taiwan University · Nanyi Bi',
    start: '2024-07',
    end: '2026-08',
    detail: 'Seven interviews on cross-cultural mingling and an LLM-supported prototype.',
  },
  // 2023
  {
    lane: 'teaching',
    title: 'Workshop Instructor',
    org: 'Taiwan FactCheck Education Foundation',
    start: '2023-02',
    end: '2023-06',
    detail: 'Three digital-literacy and fact-checking workshops for older adults.',
  },
  // 2022
  {
    lane: 'research',
    title: 'Undergraduate Research Assistant',
    org: 'Lung-Pan Cheng',
    start: '2022-07',
    end: '2022-08',
    detail: 'Experiments with 15 participants for a VR perspective-switching projection system.',
  },
  {
    lane: 'research',
    title: 'Undergraduate Research Assistant',
    org: 'Ling-Chieh Kung',
    start: '2022-02',
    end: '2022-08',
    detail: 'Lasso and Ridge models predicting rider arrival rates for Global Express.',
  },
  {
    lane: 'work',
    title: 'Frontend Developer Intern',
    org: 'LINE Taiwan',
    start: '2022-07',
    end: '2023-07',
    detail: 'Frontend modules for LINE TODAY with Nuxt.js.',
  },
  {
    lane: 'work',
    title: 'Part-time Frontend Developer',
    org: 'Junyi Academy',
    start: '2022-09',
    end: '2023-06',
    detail: 'A tool for teachers to record students’ non-cognitive development.',
  },
  {
    lane: 'teaching',
    title: 'Lead Coordinator, OpenHCI',
    org: 'OpenHCI',
    start: '2022-02',
    end: '2022-08',
    detail: 'A five-day HCI workshop for 105 participants.',
  },
  {
    lane: 'teaching',
    title: 'Technical TA',
    org: 'User Interface Design',
    start: '2022-09',
    end: '2023-01',
  },
  // 2021
  {
    lane: 'work',
    title: 'Student Consultant',
    org: 'Smart Daily & beBit',
    start: '2021-09',
    end: '2022-06',
    detail: '12 user interviews and a solution workshop with company staff.',
  },
  { lane: 'awards', title: 'InnoServe Awards', org: 'Second Prize, IP', start: '2021' },
  {
    lane: 'awards',
    title: 'QS-Wharton Reimagine Education',
    org: 'Finalist',
    start: '2021',
  },
  {
    lane: 'awards',
    title: 'APP Innovation Competition',
    org: 'Honorable Mention',
    start: '2021',
  },
  { lane: 'awards', title: 'Trans Action Award', org: 'HTC Prize', start: '2021' },
]
