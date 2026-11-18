// Timeline view of the CV. Years come from data/academicData.ts and the Obsidian
// CV notes (PhD/申請素材/履歷素材總表). Items sit in the year they started.
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
  year: number
  title: string
  org: string
  when: string
  detail?: string
  href?: string
}

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
    year: 2026,
    title: 'M.S. in Information Management',
    org: 'National Taiwan University',
    when: 'Graduated August 2026',
    detail: 'Advisor: Nanyi Bi. Thesis on AI-generated self-interpretations.',
  },
  {
    lane: 'research',
    year: 2026,
    title: 'Research Assistant, NSTC project',
    org: 'Supervisor: Nian-Shing Chen',
    when: 'November 2026 –',
    detail: 'Implementing a research system for a project funded by Taiwan’s NSTC.',
  },
  {
    lane: 'research',
    year: 2026,
    title: 'Part-time Research Assistant',
    org: 'National Taiwan University · Nanyi Bi',
    when: 'September 2026 –',
    detail:
      'A qualitative study of people waiting for AI agents to finish delegated tasks: interviews, analysis, and iterative transcript review.',
  },
  {
    lane: 'publications',
    year: 2026,
    title: 'Seeing Yourself Before Being Seen',
    org: 'Under review at CHI 2027',
    when: '2026',
    detail:
      'Participant articulation and anticipated self-presentation with AI-generated self-interpretations.',
    href: '/publications/seeing-yourself',
  },
  {
    lane: 'work',
    year: 2026,
    title: 'InnoServe Intern',
    org: 'Jubo Health',
    when: 'Spring – October 2026',
    detail: 'Digitized order workflows through API automation and consolidated sales logic.',
  },
  // 2025
  {
    lane: 'publications',
    year: 2025,
    title: 'Beyond Adaptation',
    org: 'CHI EA 2025 · Late-Breaking Work',
    when: 'April 2025',
    detail: 'An LLM-supported self-presentation ideation tool for cross-cultural mingling.',
    href: '/publications/beyond-adaptation',
  },
  {
    lane: 'publications',
    year: 2025,
    title: 'Oblivilight 憶光',
    org: 'TAICHI 2025 · Demo',
    when: '2025',
    detail: 'Forgetting mechanisms in generative AI for emotional support; seventh author.',
    href: '/publications/oblivilight',
  },
  {
    lane: 'teaching',
    year: 2025,
    title: 'Teaching Assistant',
    org: 'Big Data & Business Analytics',
    when: 'Spring 2025',
    detail: 'Python practice sessions, student questions, and final-project grading.',
  },
  {
    lane: 'teaching',
    year: 2025,
    title: 'Technical TA, OpenHCI 2025',
    org: 'OpenHCI',
    when: 'Summer 2025',
    detail: 'Guided a six-person team from ideation to an Arduino prototype.',
  },
  {
    lane: 'teaching',
    year: 2025,
    title: 'Teaching Assistant',
    org: 'Cross-Cultural Communication · Entrepreneurship',
    when: 'Fall 2025',
  },
  {
    lane: 'awards',
    year: 2025,
    title: 'Garmin Scholarship',
    org: 'NT$100,000',
    when: '2025',
  },
  // 2024
  {
    lane: 'education',
    year: 2024,
    title: 'B.S. in Information Management',
    org: 'National Taiwan University',
    when: 'Graduated summer 2024',
    detail: 'Minor in Philosophy.',
  },
  {
    lane: 'education',
    year: 2024,
    title: 'Exchange, Computer Science',
    org: 'KTH Royal Institute of Technology',
    when: 'Spring – summer 2024',
  },
  {
    lane: 'research',
    year: 2024,
    title: 'Graduate Research Assistant',
    org: 'National Taiwan University · Nanyi Bi',
    when: 'Summer 2024 –',
    detail: 'Seven interviews on cross-cultural mingling and an LLM-supported prototype.',
  },
  // 2023
  {
    lane: 'teaching',
    year: 2023,
    title: 'Workshop Instructor',
    org: 'Taiwan FactCheck Education Foundation',
    when: 'Spring 2023',
    detail: 'Three digital-literacy and fact-checking workshops for older adults.',
  },
  // 2022
  {
    lane: 'research',
    year: 2022,
    title: 'Undergraduate Research Assistant',
    org: 'Lung-Pan Cheng',
    when: 'Summer 2022',
    detail: 'Experiments with 15 participants for a VR changing-perspective projection system.',
  },
  {
    lane: 'research',
    year: 2022,
    title: 'Undergraduate Research Assistant',
    org: 'Ling-Chieh Kung',
    when: 'Spring – summer 2022',
    detail: 'Lasso and Ridge models predicting rider arrival rates for Global Express.',
  },
  {
    lane: 'work',
    year: 2022,
    title: 'Frontend Developer Intern',
    org: 'LINE Taiwan',
    when: 'Summer 2022 – summer 2023',
    detail: 'Frontend modules for LINE TODAY with Nuxt.js.',
  },
  {
    lane: 'work',
    year: 2022,
    title: 'Part-time Frontend Developer',
    org: 'Junyi Academy',
    when: 'Fall 2022 – spring 2023',
    detail: 'A tool for teachers to record students’ non-cognitive development.',
  },
  {
    lane: 'teaching',
    year: 2022,
    title: 'Lead Coordinator, OpenHCI',
    org: 'OpenHCI',
    when: 'Spring – summer 2022',
    detail: 'A five-day HCI workshop for 105 participants.',
  },
  {
    lane: 'teaching',
    year: 2022,
    title: 'Technical TA',
    org: 'User Interface Design',
    when: 'Fall 2022',
  },
  // 2021
  {
    lane: 'work',
    year: 2021,
    title: 'Student Consultant',
    org: 'Smart Daily & beBit',
    when: 'Fall 2021 – spring 2022',
    detail: '12 user interviews and a solution workshop with company staff.',
  },
  { lane: 'awards', year: 2021, title: 'InnoServe Awards', org: 'Second Prize, IP', when: '2021' },
  {
    lane: 'awards',
    year: 2021,
    title: 'QS-Wharton Reimagine Education',
    org: 'Finalist',
    when: '2021',
  },
  {
    lane: 'awards',
    year: 2021,
    title: 'APP Innovation Competition',
    org: 'Honorable Mention',
    when: '2021',
  },
  { lane: 'awards', year: 2021, title: 'Trans Action Award', org: 'HTC Prize', when: '2021' },
]
