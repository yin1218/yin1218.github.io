import { publicationDetails } from './publicationDetails'

export const siteLinks = [
  { href: '/', title: 'Home' },
  { href: '/publications', title: 'Publications' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
  { href: '/resume', title: 'CV' },
]

export const pageSections: Record<string, { id: string; title: string }[]> = {
  ...Object.fromEntries(
    publicationDetails.map((detail) => [
      `/publications/${detail.id}`,
      [
        ...detail.sections.map((section) => ({ id: section.id, title: section.nav })),
        { id: 'role', title: 'My role' },
        { id: 'citation', title: 'Citation' },
      ],
    ])
  ),
  '/about': [
    { id: 'research', title: 'Research' },
    { id: 'working-with-people-and-technology', title: 'Experience' },
    { id: 'beyond-research', title: 'Beyond research' },
  ],
  '/resume': [
    { id: 'education', title: 'Education' },
    { id: 'publications', title: 'Publications' },
    { id: 'research-experience', title: 'Research experience' },
    { id: 'work', title: 'Work experience' },
    { id: 'teaching', title: 'Teaching' },
    { id: 'leadership', title: 'Leadership & service' },
    { id: 'awards', title: 'Honors & awards' },
    { id: 'skills', title: 'Skills & languages' },
  ],
}
