import type { Locale } from './i18n'

// UI strings that are not page content. Components import this and pick `dictionary[locale]`;
// never pass it across the server/client boundary as a prop (it contains functions).
interface Dictionary {
  skipToContent: string
  sidebarLabel: string
  tagline: string
  mainNavigation: string
  onThisPage: string
  navigation: string
  openNavigation: string
  closeNavigation: string
  homeLabel: string
  languageLabel: string
  theme: {
    label: string
    light: string
    dark: string
    system: string
    morning: string
    night: string
  }
  contact: string
  links: {
    email: string
    cv: string
    cvPdf: string
    downloadCv: string
    cvDownloadName: string
  }
  home: {
    readingAs: string
    voices: { researcher: string; industry: string; friend: string }
    nowTitle: string
    updated: string
    timelineLink: string
  }
  beyond: {
    atmosphere: string
    cafe: string
    looking: string
    photography: string
    collecting: string
    sport: string
    morning: string
    night: string
    morningNote: string
    nightNote: string
    lightGroup: string
    defaultCafeNote: string
    photoNote: string
    photoNoteEnd: string
    cafesEssay: string
    photographyEssay: string
    sportsEssay: string
    sportLabel: (name: string, tried: boolean) => string
    sportTried: string
    sportNext: string
    sportSummary: (tried: number, total: number) => string
  }
  portrait: { alt: string; shutter: string; why: string }
  pronunciation: {
    unavailable: string
    pause: string
    listen: string
    pauseLabel: string
    listenLabel: string
    ipa: string
  }
  projects: {
    filter: string
    all: string
    view: (title: string) => string
    learnMore: (title: string) => string
    project: string
    watchDemo: string
  }
  publications: {
    myRole: string
    roleLabel: string
    readMore: string
    authorSeparator: string
    allPublications: string
    citation: string
    publications: string
  }
  timeline: {
    jumpToYear: string
    filter: string
    showAll: string
    readMore: string
    now: string
    months: string[]
    items: (count: number) => string
    month: (index: number) => string
    duration: (years: number, months: number) => string
    range: (parts: {
      startYear: number
      startMonth: number
      endYear?: number
      endMonth?: number
      ongoing: boolean
    }) => string
  }
  cvViews: { label: string; list: string; timeline: string }
  sports: {
    photos: (count: number) => string
    showMore: (count: number) => string
    dialogLabel: (name: string) => string
    close: string
    tried: (count: number) => string
    next: (count: number) => string
    writeToMe: string
  }
  notFound: { title: string; heading: string; body: string; back: string }
  moved: { heading: string }
}

const enMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const en: Dictionary = {
  skipToContent: 'Skip to content',
  sidebarLabel: 'Site sidebar',
  tagline: 'Human–computer interaction research',
  mainNavigation: 'Main navigation',
  onThisPage: 'On this page',
  navigation: 'Navigation',
  openNavigation: 'Open navigation',
  closeNavigation: 'Close navigation',
  homeLabel: 'Chien-Yin Wu home',
  languageLabel: 'Language',
  theme: {
    label: 'Theme and atmosphere',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    morning: 'Morning café',
    night: 'Night café',
  },
  contact: 'Contact',
  links: {
    email: 'Email',
    cv: 'CV',
    cvPdf: 'CV (PDF)',
    downloadCv: 'Download CV (PDF)',
    cvDownloadName: 'Chien-Yin-Wu-CV.pdf',
  },
  home: {
    readingAs: 'Reading as',
    voices: { researcher: 'Researcher', industry: 'Industry', friend: 'Friend' },
    nowTitle: 'Now',
    updated: 'Updated',
    timelineLink: 'How I got here: timeline',
  },
  beyond: {
    atmosphere: 'Atmosphere',
    cafe: 'Café',
    looking: 'Looking',
    photography: 'Photography',
    collecting: 'Collecting',
    sport: 'Sport',
    morning: 'Morning',
    night: 'Night',
    morningNote: 'Morning light through the window. The page is lit.',
    nightNote: 'One yellow lamp tunes the whole corner.',
    lightGroup: 'Light the page like a café',
    defaultCafeNote: 'I go for the atmosphere.',
    photoNote: 'I photograph to keep a record. The photographs are on',
    photoNoteEnd: '.',
    cafesEssay: 'Cafés and me',
    photographyEssay: 'Photography and me',
    sportsEssay: 'Sports and me',
    sportLabel: (name, tried) => `${name}, ${tried ? 'tried' : 'not tried yet'}`,
    sportTried: ' · tried',
    sportNext: ' · next on the list',
    sportSummary: (tried, total) => `${tried} of ${total} tried so far.`,
  },
  portrait: {
    alt: 'Portrait of Chien-Yin Wu',
    shutter: 'Press the shutter to see the next photograph',
    why: 'Why I photograph',
  },
  pronunciation: {
    unavailable: 'Audio is unavailable. Please try again.',
    pause: 'Pause',
    listen: 'Listen',
    pauseLabel: 'Pause name pronunciation',
    listenLabel: 'Listen to the pronunciation of 巫芊瑩 in Mandarin',
    ipa: 'IPA (approx.)',
  },
  projects: {
    filter: 'Filter projects by tag',
    all: 'All',
    view: (title) => `View ${title}`,
    learnMore: (title) => `Learn more about ${title}`,
    project: 'Project',
    watchDemo: 'Watch demo',
  },
  publications: {
    myRole: 'My role',
    roleLabel: 'My role:',
    readMore: 'Read more →',
    authorSeparator: ', ',
    allPublications: '← All publications',
    citation: 'Citation',
    publications: 'Publications',
  },
  timeline: {
    jumpToYear: 'Jump to year',
    filter: 'Filter by category',
    showAll: 'Show all',
    readMore: 'Read more →',
    now: 'now',
    months: enMonths,
    items: (count) => `${count} ${count === 1 ? 'item' : 'items'}`,
    month: (index) => enMonths[index],
    duration: (years, months) =>
      [years && `${years} yr`, months && `${months} mo`].filter(Boolean).join(' '),
    range: ({ startYear, startMonth, endYear, endMonth, ongoing }) => {
      const from = enMonths[startMonth]
      if (endYear === undefined || endMonth === undefined) {
        return ongoing ? `${from} ${startYear} – now` : `${from} ${startYear}`
      }
      return startYear === endYear
        ? `${from} – ${enMonths[endMonth]} ${endYear}`
        : `${from} ${startYear} – ${enMonths[endMonth]} ${endYear}`
    },
  },
  cvViews: { label: 'CV view', list: 'List', timeline: 'Timeline' },
  sports: {
    photos: (count) => (count > 1 ? `${count} photos` : 'photo'),
    showMore: (count) => `Show ${count} more sports`,
    dialogLabel: (name) => `${name} photos`,
    close: 'Close',
    tried: (count) => `Tried so far (${count})`,
    next: (count) => `Next on the list (${count})`,
    writeToMe: 'write to me',
  },
  notFound: {
    title: 'Page not found',
    heading: 'Page not found.',
    body: 'Find my research, projects, and CV from the homepage.',
    back: 'Back to homepage',
  },
  moved: { heading: 'This page has moved' },
}

const zhMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const zh: Dictionary = {
  skipToContent: '跳到主要內容',
  sidebarLabel: '網站側邊欄',
  tagline: '人機互動研究',
  mainNavigation: '主選單',
  onThisPage: '本頁內容',
  navigation: '選單',
  openNavigation: '開啟選單',
  closeNavigation: '關閉選單',
  homeLabel: '巫芊瑩 首頁',
  languageLabel: '語言',
  theme: {
    label: '主題與氛圍',
    light: '淺色',
    dark: '深色',
    system: '跟隨系統',
    morning: '晨間咖啡廳',
    night: '夜間咖啡廳',
  },
  contact: '聯絡方式',
  links: {
    email: '電子郵件',
    cv: '履歷',
    cvPdf: '履歷（PDF）',
    downloadCv: '下載履歷（PDF）',
    cvDownloadName: 'Chien-Yin-Wu-CV-zh.pdf',
  },
  home: {
    readingAs: '讀者身分',
    voices: { researcher: '研究者', industry: '業界', friend: '朋友' },
    nowTitle: '近況',
    updated: '更新於',
    timelineLink: '一路走來：時間軸',
  },
  beyond: {
    atmosphere: '氛圍',
    cafe: '咖啡廳',
    looking: '觀看',
    photography: '攝影',
    collecting: '收集',
    sport: '運動',
    morning: '早晨',
    night: '夜晚',
    morningNote: '晨光從窗外照進來，整頁都亮了。',
    nightNote: '一盞黃燈，替整個角落定了調。',
    lightGroup: '替頁面換上咖啡廳的燈光',
    defaultCafeNote: '我去咖啡廳，是為了氛圍。',
    photoNote: '我拍照，是為了留下紀錄。照片都在',
    photoNoteEnd: '。',
    cafesEssay: '咖啡廳與我',
    photographyEssay: '攝影與我',
    sportsEssay: '運動與我',
    sportLabel: (name, tried) => `${name}，${tried ? '試過了' : '還沒試'}`,
    sportTried: ' · 試過了',
    sportNext: ' · 下一個想試',
    sportSummary: (tried, total) => `${total} 項裡，目前試過 ${tried} 項。`,
  },
  portrait: {
    alt: '巫芊瑩的個人照',
    shutter: '按下快門，看下一張照片',
    why: '我為什麼拍照',
  },
  pronunciation: {
    unavailable: '無法播放音訊，請再試一次。',
    pause: '暫停',
    listen: '播放',
    pauseLabel: '暫停播放姓名發音',
    listenLabel: '播放「巫芊瑩」的華語發音',
    ipa: 'IPA（近似）',
  },
  projects: {
    filter: '依標籤篩選專案',
    all: '全部',
    view: (title) => `查看 ${title}`,
    learnMore: (title) => `進一步了解 ${title}`,
    project: '專案',
    watchDemo: '看展示影片',
  },
  publications: {
    myRole: '我的角色',
    roleLabel: '我的角色：',
    readMore: '繼續閱讀 →',
    authorSeparator: '、',
    allPublications: '← 所有著作',
    citation: '引用格式',
    publications: '學術著作',
  },
  timeline: {
    jumpToYear: '跳至年份',
    filter: '依類別篩選',
    showAll: '顯示全部',
    readMore: '繼續閱讀 →',
    now: '迄今',
    months: zhMonths.map((month) => `${month} 月`),
    items: (count) => `${count} 項`,
    month: (index) => `${zhMonths[index]} 月`,
    duration: (years, months) =>
      [years && `${years} 年`, months && `${months} 個月`].filter(Boolean).join(' '),
    range: ({ startYear, startMonth, endYear, endMonth, ongoing }) => {
      const from = `${startYear} 年 ${startMonth + 1} 月`
      if (endYear === undefined || endMonth === undefined) {
        return ongoing ? `${from} – 迄今` : from
      }
      return startYear === endYear
        ? `${from} – ${endMonth + 1} 月`
        : `${from} – ${endYear} 年 ${endMonth + 1} 月`
    },
  },
  cvViews: { label: '履歷檢視方式', list: '清單', timeline: '時間軸' },
  sports: {
    photos: (count) => (count > 1 ? `${count} 張照片` : '照片'),
    showMore: (count) => `顯示其餘 ${count} 項`,
    dialogLabel: (name) => `${name}的照片`,
    close: '關閉',
    tried: (count) => `目前試過（${count}）`,
    next: (count) => `接下來想試（${count}）`,
    writeToMe: '寫信給我',
  },
  notFound: {
    title: '找不到頁面',
    heading: '找不到這個頁面。',
    body: '我的研究、專案和履歷，都可以從首頁找到。',
    back: '回到首頁',
  },
  moved: { heading: '這個頁面已經搬家了' },
}

export const dictionary: Record<Locale, Dictionary> = { en, zh }
