import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { Locale, htmlLang, localizePath, ogLocale } from '@/data/i18n'

export const pageSEO = {
  home: {
    path: '/',
    title: `${siteMetadata.title} | HCI & Human-Centered AI`,
    description: siteMetadata.description,
  },
  about: {
    path: '/about',
    title: 'About',
    description:
      'Meet Chien-Yin Wu (巫芊瑩): NTU Information Management graduate with experience in HCI research, human-centered AI, user research, and frontend development.',
  },
  projects: {
    path: '/projects',
    title: 'Projects & Demos',
    description:
      'Projects by Chien-Yin Wu across education, community services, and everyday life, with contributions and demos.',
  },
  beyondAdaptation: {
    path: '/publications/beyond-adaptation',
    title: 'Beyond Adaptation · CHI EA 2025',
    description:
      'Beyond Adaptation by Chien-Yin Wu and Nanyi Bi: seven interviews and an LLM-supported self-presentation ideation prototype for cross-cultural mingling, CHI EA 2025.',
  },
  publications: {
    path: '/publications',
    title: 'Publications',
    description:
      'Publications by Chien-Yin Wu (巫芊瑩): CHI EA 2025 Late-Breaking Work, a manuscript under review, and a TAICHI 2025 demo.',
  },
  resume: {
    path: '/resume',
    title: 'Academic CV',
    description:
      'Academic CV of Chien-Yin Wu (巫芊瑩): NTU education, publications, research, frontend development, teaching, awards, and technical skills.',
  },
  blog: {
    path: '/blog',
    title: 'Essays',
    description:
      'Essays by Chien-Yin Wu (巫芊瑩) beyond research: on cafés, photography, and trying new sports.',
  },
  cafes: {
    path: '/blog/cafes-and-me',
    title: 'Cafés and me',
    description:
      'A first-person essay by Chien-Yin Wu on going to cafés: atmosphere, place, civil inattention, and the ticket to talk.',
  },
  sports: {
    path: '/blog/sports-and-me',
    title: 'Sports and me',
    description:
      'The sports Chien-Yin Wu has tried so far, why the collecting started, and the ones still on the list.',
  },
  photography: {
    path: '/blog/photography-and-me',
    title: 'Photography and me',
    description:
      'A first-person essay by Chien-Yin Wu on what photography means: from recording the real to a beautiful accident.',
  },
} as const

type PageSEO = { path: string; title: string; description: string; index?: boolean }

export const siteTitle: Record<Locale, string> = {
  en: siteMetadata.title,
  zh: '巫芊瑩 Chien-Yin Wu',
}

export const siteDescription: Record<Locale, string> = {
  en: siteMetadata.description,
  zh: '巫芊瑩（Chien-Yin Wu），國立臺灣大學資訊管理學系畢業，研究人機互動、以人為本的 AI 與跨文化溝通。',
}

// Traditional Chinese (Taiwan) counterparts of `pageSEO`. Same keys and paths, so the sitemap
// and the language alternates can pair them up.
export const pageSEOzh: { [K in keyof typeof pageSEO]: PageSEO } = {
  home: {
    path: '/',
    title: `${siteTitle.zh} | 人機互動與以人為本的 AI`,
    description: siteDescription.zh,
  },
  about: {
    path: '/about',
    title: '關於',
    description:
      '認識巫芊瑩（Chien-Yin Wu）：國立臺灣大學資訊管理學系畢業，有人機互動研究、以人為本的 AI、使用者研究與前端開發經驗。',
  },
  projects: {
    path: '/projects',
    title: '專案與展示',
    description: '巫芊瑩在教育、社區服務與日常生活領域的專案，附個人貢獻與展示影片。',
  },
  beyondAdaptation: {
    path: '/publications/beyond-adaptation',
    title: 'Beyond Adaptation · CHI EA 2025',
    description:
      '巫芊瑩與 Nanyi Bi 的 Beyond Adaptation：七場訪談，加上一款 LLM 輔助的跨文化社交自我呈現發想原型，發表於 CHI EA 2025。',
  },
  publications: {
    path: '/publications',
    title: '學術著作',
    description:
      '巫芊瑩（Chien-Yin Wu）的學術著作：CHI EA 2025 Late-Breaking Work、一篇審查中的稿件，以及 TAICHI 2025 展示作品。',
  },
  resume: {
    path: '/resume',
    title: '學術履歷',
    description:
      '巫芊瑩（Chien-Yin Wu）的學術履歷：臺大學歷、著作、研究、前端開發、教學、獎項與技術能力。',
  },
  blog: {
    path: '/blog',
    title: '隨筆',
    description: '巫芊瑩（Chien-Yin Wu）研究以外的隨筆：寫咖啡廳、攝影，還有嘗試新的運動。',
  },
  cafes: {
    path: '/blog/cafes-and-me',
    title: '咖啡廳與我',
    description:
      '巫芊瑩的第一人稱隨筆，寫逛咖啡廳這件事：氛圍、地方、禮貌性忽視，以及「搭話的門票」。',
  },
  sports: {
    path: '/blog/sports-and-me',
    title: '運動與我',
    description: '巫芊瑩目前試過的運動、開始收集的原因，以及清單上還沒試的項目。',
  },
  photography: {
    path: '/blog/photography-and-me',
    title: '攝影與我',
    description: '巫芊瑩的第一人稱隨筆，談攝影的意義：從記下真實，到一場美麗的意外。',
  },
}

export function getPageSEO(locale: Locale) {
  return locale === 'zh' ? pageSEOzh : pageSEO
}

export function absoluteUrl(path = '/') {
  return `${siteMetadata.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

interface PageSEOProps {
  title: string
  description: string
  // Un-prefixed English path; `locale` decides which URL it resolves to.
  path: string
  locale?: Locale
  absoluteTitle?: boolean
  index?: boolean
  type?: 'website' | 'article'
}

export function languageAlternates(path: string) {
  return {
    en: absoluteUrl(localizePath(path, 'en')),
    [htmlLang.zh]: absoluteUrl(localizePath(path, 'zh')),
    'x-default': absoluteUrl(localizePath(path, 'en')),
  }
}

// Per-page social cards are pre-rendered by scripts/generate-og-images.py into
// public/static/images/og/<locale>/<name>.png, one for every page in `pageSEO` and one for every
// publication detail page. Anything else falls back to the shared site image.
const cardPaths: string[] = Object.values(pageSEO).map((page) => page.path)

export function socialCardPath(path: string, locale: Locale): string | undefined {
  const clean = path.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/'
  if (!cardPaths.includes(clean) && !/^\/publications\/[^/]+$/.test(clean)) return undefined
  const name = clean === '/' ? 'home' : clean.slice(1).replace(/\//g, '-')
  return `/static/images/og/${locale}/${name}.png`
}

export function genPageMetadata({
  title,
  description,
  path,
  locale = 'en',
  absoluteTitle = false,
  index = true,
  type = 'website',
}: PageSEOProps): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteTitle[locale]}`
  const url = absoluteUrl(localizePath(path, locale))
  const card = socialCardPath(path, locale)
  const image = {
    url: absoluteUrl(card ?? siteMetadata.socialBanner),
    width: 1200,
    height: 630,
    alt: card
      ? `${title} — ${siteTitle[locale]}`
      : locale === 'zh'
        ? '巫芊瑩 Chien-Yin Wu：人機互動與以人為本的 AI'
        : 'Chien-Yin Wu — human–computer interaction and human-centered AI',
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
      // Feed autodiscovery for the essays (app/feed.xml and its /zh counterpart).
      types: {
        'application/rss+xml': [
          {
            url: absoluteUrl(localizePath('/feed.xml', locale)),
            title: `${siteTitle[locale]} · ${getPageSEO(locale).blog.title}`,
          },
        ],
      },
    },
    ...(!index && {
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    }),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteTitle[locale],
      images: [image],
      locale: ogLocale[locale],
      type,
      ...(type === 'article' && { authors: [siteMetadata.author] }),
    },
    twitter: {
      title: fullTitle,
      description,
      card: 'summary_large_image',
      images: [image],
    },
  }
}

// Root-layout metadata for each locale; pages override title/description/canonical on top.
export function rootMetadata(locale: Locale): Metadata {
  const home = getPageSEO(locale).home
  return {
    ...genPageMetadata({ ...home, locale, absoluteTitle: true }),
    metadataBase: new URL(siteMetadata.siteUrl),
    title: { default: home.title, template: `%s | ${siteTitle[locale]}` },
    applicationName: siteTitle[locale],
    authors: [{ name: siteMetadata.author, url: absoluteUrl(localizePath('/about', locale)) }],
    creator: siteMetadata.author,
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
