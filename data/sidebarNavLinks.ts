export const siteLinks = [
  { href: '/', title: 'Home' },
  { href: '/research/beyond-adaptation', title: 'Research' },
  { href: '/publications', title: 'Publications' },
  { href: '/projects', title: 'Projects' },
  { href: '/about', title: 'About' },
  { href: '/resume', title: 'CV' },
]

export const pageSections: Record<string, { id: string; title: string }[]> = {
  '/': [
    { id: 'profile', title: 'Introduction' },
    { id: 'publication', title: 'Featured research' },
    { id: 'projects', title: 'Projects' },
  ],
  '/research/beyond-adaptation': [
    { id: 'overview', title: 'Overview' },
    { id: 'approach', title: 'Research approach' },
    { id: 'contribution', title: 'My contribution' },
    { id: 'publication', title: 'Paper & citation' },
  ],
  '/about': [
    { id: 'research', title: 'Research' },
    { id: 'working-with-people-and-technology', title: 'Experience' },
    { id: 'beyond-research', title: 'Beyond research' },
    { id: 'contact', title: 'Contact' },
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
