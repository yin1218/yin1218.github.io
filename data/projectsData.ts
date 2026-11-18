export interface Project {
  id: string
  title: string
  description: string
  contribution?: string
  roles?: string[]
  date: string
  href?: string
  imgSrc?: string
  featured?: boolean
}

// The original four projects and video URLs were recovered from
// https://wpbag.vercel.app/projects. Contributions are supported by the supplied CVs.
// The two 2025 projects follow "Selected Research and Design Projects" in the English CV
// (Obsidian PhD/申請素材/英文履歷, 2026-11-18). The BrushaMood photo is from the course report.
const projectsData: Project[] = [
  {
    id: 'brushamood',
    title: 'BrushaMood',
    roles: ['Physical computing', 'Prototyping'],
    description:
      'An interactive music device for indirect expressions of care within families. Choosing a mood while dispensing toothpaste plays music from playlists that family members curated, for the two minutes of brushing. A Social Design course project.',
    contribution:
      'Built the working prototype, in which mood buttons trigger playback, with Arduino, Raspberry Pi, and the Spotify API. Contributed to problem framing, user journey mapping, and prototype design.',
    date: 'Spring 2025',
    imgSrc: '/static/images/project/brushamood.webp',
    featured: false,
  },
  {
    id: 'columbarium-theatre',
    title: 'Immersive theatre from the perspective of the deceased',
    roles: ['Concept', 'Video production'],
    description:
      'A spatial storytelling piece by a three-person team in an interdisciplinary arts course. The audience sits in a space staged as a columbarium and watches prerecorded stories of visitors from the position of those being remembered.',
    contribution:
      'Contributed to the concept, narrative, script, and spatial arrangement. Edited and post-produced the video and supported filming.',
    date: 'Spring 2025',
    featured: false,
  },
  {
    id: 'pathfinder',
    title: 'Pathfinder',
    roles: ['Machine learning', 'Deployment'],
    description:
      'A mobile application helping students write academic portfolios and explore suitable majors based on their records.',
    contribution:
      'Developed a classification model using Natural Language Inference and deployed it on AWS. The project received Second Prize in the InnoServe Awards IP category and was a finalist in the QS-Wharton Reimagine Education Awards.',
    date: '2021',
    imgSrc: '/static/images/project/pathfinder.webp',
    href: 'https://www.youtube.com/watch?v=AEFjUuhPILk',
    featured: true,
  },
  {
    id: 'gotcha',
    title: 'GOTCHA',
    roles: ['User research'],
    description:
      '“Got you in charity!” A mobile application prototype addressing uneven fundraising among small nonprofit organizations.',
    contribution:
      'Identified six pain points and three positive aspects of fundraising through more than 400 survey responses and three interviews. Received the HTC Prize at the Trans Action Award.',
    date: '2021',
    imgSrc: '/static/images/project/gotcha.webp',
    href: 'https://www.youtube.com/watch?v=YXzMDNRGixM',
    featured: true,
  },
  {
    id: 'dormy',
    title: 'Dormy, be your homie',
    roles: ['Concept', 'Development'],
    description:
      'A service-matching website helping National Taiwan University dormitory residents meet their everyday needs.',
    contribution: 'Conceived and developed the platform with React.js.',
    date: 'Winter 2021',
    imgSrc: '/static/images/project/dormy.webp',
    href: 'https://youtu.be/gYOxBSz9LmE',
    featured: false,
  },
  {
    id: 'swappy',
    title: 'Swappy',
    roles: ['Prototyping', 'Frontend development'],
    description:
      'A mobile application encouraging people to exchange unused items through decluttering challenges and barter-based groups.',
    contribution:
      'Designed the prototype and developed the frontend. Received an Honorable Mention in the APP Mobile Application Innovation Competition.',
    date: '2021',
    imgSrc: '/static/images/project/swappy.webp',
    href: 'https://www.youtube.com/watch?v=HI4xZkTqql0',
    featured: false,
  },
  {
    id: 'habitra',
    title: 'Habitra, habit tracker',
    roles: ['Concept', 'Development'],
    description: 'A website helping people form habits by gathering with others and setting goals.',
    contribution: 'Conceived and developed the website with React.js.',
    date: 'Winter 2021',
  },
]

export default projectsData
