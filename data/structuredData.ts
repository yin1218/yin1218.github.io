import siteMetadata from './siteMetadata'
import projectsData from './projectsData'
import { publication } from './academicData'
import { absoluteUrl, pageSEO } from '../app/seo'

const personId = absoluteUrl('/#person')
const websiteId = absoluteUrl('/#website')

const person = {
  '@type': 'Person',
  '@id': personId,
  name: siteMetadata.author,
  alternateName: siteMetadata.nativeName,
  givenName: 'Chien-Yin',
  familyName: 'Wu',
  url: absoluteUrl('/'),
  image: absoluteUrl('/static/images/chien-yin-wu.webp'),
  description: siteMetadata.description,
  sameAs: [siteMetadata.orcid, siteMetadata.github, siteMetadata.linkedin],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'National Taiwan University',
    url: 'https://www.ntu.edu.tw/',
  },
  knowsAbout: ['Human–computer interaction', 'Human-centered AI', 'Cross-cultural communication'],
}

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteMetadata.title,
  alternateName: siteMetadata.author,
  url: absoluteUrl('/'),
  inLanguage: siteMetadata.language,
  publisher: { '@id': personId },
}

const paper = {
  '@type': 'ScholarlyArticle',
  '@id': publication.href,
  name: publication.title,
  url: publication.href,
  description: publication.description,
  datePublished: publication.datePublished,
  identifier: 'doi:10.1145/3706599.3719929',
  inLanguage: 'en',
  author: [{ '@id': personId }, { '@type': 'Person', name: 'Nanyi Bi' }],
  isPartOf: { '@type': 'CreativeWork', name: publication.venue },
}

type PageDetails = { path: string; title: string; description: string }

function breadcrumbs(page: PageDetails) {
  return {
    '@type': 'BreadcrumbList',
    '@id': absoluteUrl(`${page.path}#breadcrumbs`),
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: page.title, item: absoluteUrl(page.path) },
    ],
  }
}

export function profileStructuredData(page: PageDetails) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      paper,
      {
        '@type': 'ProfilePage',
        '@id': absoluteUrl(`${page.path}#webpage`),
        url: absoluteUrl(page.path),
        name: page.title,
        description: page.description,
        inLanguage: siteMetadata.language,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        citation: { '@id': publication.href },
        ...(page.path !== '/' && {
          breadcrumb: { '@id': absoluteUrl(`${page.path}#breadcrumbs`) },
        }),
      },
      ...(page.path === '/' ? [] : [breadcrumbs(page)]),
    ],
  }
}

export function projectsStructuredData() {
  const page = pageSEO.projects
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      breadcrumbs(page),
      {
        '@type': 'CollectionPage',
        '@id': absoluteUrl('/projects#webpage'),
        url: absoluteUrl(page.path),
        name: page.title,
        description: page.description,
        inLanguage: siteMetadata.language,
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        breadcrumb: { '@id': absoluteUrl('/projects#breadcrumbs') },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projectsData.length,
          itemListElement: projectsData.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              '@id': absoluteUrl(`/projects#${project.id}`),
              url: absoluteUrl(`/projects#${project.id}`),
              name: project.title,
              description: project.description,
              author: { '@id': personId },
              ...(project.imgSrc && { image: absoluteUrl(project.imgSrc) }),
            },
          })),
        },
      },
    ],
  }
}

export function researchStructuredData() {
  const page = pageSEO.beyondAdaptation
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      paper,
      breadcrumbs(page),
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(`${page.path}#webpage`),
        url: absoluteUrl(page.path),
        name: publication.title,
        description: page.description,
        inLanguage: siteMetadata.language,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': publication.href },
        breadcrumb: { '@id': absoluteUrl(`${page.path}#breadcrumbs`) },
      },
    ],
  }
}
