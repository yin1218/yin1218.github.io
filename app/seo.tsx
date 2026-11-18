import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

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

export function absoluteUrl(path = '/') {
  return `${siteMetadata.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

interface PageSEOProps {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
  index?: boolean
}

export function genPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  index = true,
}: PageSEOProps): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteMetadata.title}`
  const image = {
    url: absoluteUrl(siteMetadata.socialBanner),
    width: 1200,
    height: 630,
    alt: 'Chien-Yin Wu — human–computer interaction and human-centered AI',
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    ...(!index && {
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    }),
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteMetadata.title,
      images: [image],
      locale: siteMetadata.locale,
      type: 'website',
    },
    twitter: {
      title: fullTitle,
      description,
      card: 'summary_large_image',
      images: [image],
    },
  }
}
