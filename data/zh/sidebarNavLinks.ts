// Traditional Chinese (Taiwan) counterpart of data/sidebarNavLinks.ts. Keys of `pageSections`
// are un-prefixed English paths, so SidebarNavigation can look them up after stripping the locale.
import { publicationDetails } from './publicationDetails'

export const siteLinks = [
  { href: '/', title: '首頁' },
  { href: '/publications', title: '學術著作' },
  { href: '/projects', title: '專案' },
  { href: '/about', title: '關於' },
  { href: '/resume', title: '履歷' },
]

export const pageSections: Record<string, { id: string; title: string }[]> = {
  ...Object.fromEntries(
    publicationDetails.map((detail) => [
      `/publications/${detail.id}`,
      [
        ...detail.sections.map((section) => ({ id: section.id, title: section.nav })),
        { id: 'role', title: '我的角色' },
        { id: 'citation', title: '引用格式' },
      ],
    ])
  ),
  '/about': [
    { id: 'research', title: '研究' },
    { id: 'working-with-people-and-technology', title: '經歷' },
    { id: 'beyond-research', title: '研究之外' },
  ],
  '/resume': [
    { id: 'education', title: '學歷' },
    { id: 'courses', title: '重點課程' },
    { id: 'publications', title: '著作與展示' },
    { id: 'research-experience', title: '研究經歷' },
    { id: 'work', title: '工作經歷' },
    { id: 'teaching', title: '教學' },
    { id: 'leadership', title: '領導與服務' },
    { id: 'awards', title: '榮譽與獎項' },
    { id: 'skills', title: '技能與語言' },
  ],
}
