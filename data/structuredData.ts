import siteMetadata from './siteMetadata'
import { publication as enPublication } from './academicData'
import { getAcademic, getProjects, getPublications } from './localized'
import { Locale, htmlLang, localizePath } from './i18n'
import { absoluteUrl, getPageSEO, siteDescription, siteTitle } from '../app/seo'

// The person and the website are one entity in both languages, so their ids do not change;
// page-level nodes use the URL of the language version they describe.
const personId = absoluteUrl('/#person')
const websiteId = absoluteUrl('/#website')

const copy = {
  en: {
    alumniOf: 'National Taiwan University',
    knowsAbout: ['Human–computer interaction', 'Human-centered AI', 'Cross-cultural communication'],
    home: 'Home',
    jobTitle: 'Research Assistant',
    ntnu: 'National Taiwan Normal University',
  },
  zh: {
    alumniOf: '國立臺灣大學',
    knowsAbout: ['人機互動', '以人為本的 AI', '跨文化溝通'],
    home: '首頁',
    jobTitle: '研究助理',
    ntnu: '國立臺灣師範大學',
  },
}

function nodes(locale: Locale) {
  const publication = getAcademic(locale).publication
  const url = (path: string) => absoluteUrl(localizePath(path, locale))

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: siteMetadata.author,
    alternateName: siteMetadata.nativeName,
    givenName: 'Chien-Yin',
    familyName: 'Wu',
    url: url('/'),
    image: absoluteUrl('/static/images/chien-yin-wu.webp'),
    description: siteDescription[locale],
    sameAs: [siteMetadata.orcid, siteMetadata.github, siteMetadata.linkedin],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: copy[locale].alumniOf,
      url: 'https://www.ntu.edu.tw/',
    },
    jobTitle: copy[locale].jobTitle,
    affiliation: [
      {
        '@type': 'CollegeOrUniversity',
        name: copy[locale].ntnu,
        url: 'https://www.ntnu.edu.tw/',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: copy[locale].alumniOf,
        url: 'https://www.ntu.edu.tw/',
      },
    ],
    knowsLanguage: ['zh-Hant', 'en'],
    knowsAbout: copy[locale].knowsAbout,
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: siteTitle[locale],
    alternateName: siteMetadata.author,
    url: url('/'),
    inLanguage: htmlLang[locale],
    publisher: { '@id': personId },
  }

  const paper = {
    '@type': 'ScholarlyArticle',
    '@id': enPublication.href,
    name: enPublication.title,
    url: enPublication.href,
    description: publication.description,
    datePublished: enPublication.datePublished,
    identifier: 'doi:10.1145/3706599.3719929',
    inLanguage: 'en',
    author: [{ '@id': personId }, { '@type': 'Person', name: 'Nanyi Bi' }],
    isPartOf: { '@type': 'CreativeWork', name: enPublication.venue },
  }

  return { url, person, website, paper, publication: enPublication }
}

type PageDetails = { path: string; title: string; description: string }

function breadcrumbs(page: PageDetails, locale: Locale) {
  const { url } = nodes(locale)
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url(page.path)}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy[locale].home, item: url('/') },
      { '@type': 'ListItem', position: 2, name: page.title, item: url(page.path) },
    ],
  }
}

export function profileStructuredData(page: PageDetails, locale: Locale = 'en') {
  const { url, website, person, paper, publication } = nodes(locale)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      paper,
      {
        '@type': 'ProfilePage',
        '@id': `${url(page.path)}#webpage`,
        url: url(page.path),
        name: page.title,
        description: page.description,
        inLanguage: htmlLang[locale],
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        citation: { '@id': publication.href },
        ...(page.path !== '/' && {
          breadcrumb: { '@id': `${url(page.path)}#breadcrumbs` },
        }),
      },
      ...(page.path === '/' ? [] : [breadcrumbs(page, locale)]),
    ],
  }
}

export function projectsStructuredData(locale: Locale = 'en') {
  const page = getPageSEO(locale).projects
  const { url, website, person } = nodes(locale)
  const projectsData = getProjects(locale)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      breadcrumbs(page, locale),
      {
        '@type': 'CollectionPage',
        '@id': `${url('/projects')}#webpage`,
        url: url(page.path),
        name: page.title,
        description: page.description,
        inLanguage: htmlLang[locale],
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        breadcrumb: { '@id': `${url('/projects')}#breadcrumbs` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projectsData.length,
          itemListElement: projectsData.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              '@id': `${url('/projects')}#${project.id}`,
              url: `${url('/projects')}#${project.id}`,
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

export function researchStructuredData(locale: Locale = 'en') {
  const page = getPageSEO(locale).beyondAdaptation
  const { url, website, person, paper, publication } = nodes(locale)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      paper,
      breadcrumbs(page, locale),
      {
        '@type': 'WebPage',
        '@id': `${url(page.path)}#webpage`,
        url: url(page.path),
        name: publication.title,
        description: page.description,
        inLanguage: htmlLang[locale],
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': publication.href },
        breadcrumb: { '@id': `${url(page.path)}#breadcrumbs` },
      },
    ],
  }
}

// First-person essays under /blog. `datePublished` is the month shown on the page.
export function essayStructuredData(
  key: 'cafes' | 'photography' | 'sports',
  datePublished: string,
  locale: Locale = 'en'
) {
  const page = getPageSEO(locale)[key]
  const blog = getPageSEO(locale).blog
  const { url, website, person } = nodes(locale)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      {
        '@type': 'BreadcrumbList',
        '@id': `${url(page.path)}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: copy[locale].home, item: url('/') },
          { '@type': 'ListItem', position: 2, name: blog.title, item: url(blog.path) },
          { '@type': 'ListItem', position: 3, name: page.title, item: url(page.path) },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${url(page.path)}#article`,
        mainEntityOfPage: url(page.path),
        url: url(page.path),
        headline: page.title,
        description: page.description,
        datePublished,
        inLanguage: htmlLang[locale],
        image: absoluteUrl(siteMetadata.socialBanner),
        author: { '@id': personId },
        publisher: { '@id': personId },
        isPartOf: { '@id': websiteId },
      },
    ],
  }
}

// The publication list: one entry per work, each pointing at its detail page.
export function publicationsStructuredData(locale: Locale = 'en') {
  const page = getPageSEO(locale).publications
  const { url, website, person } = nodes(locale)
  const items = getPublications(locale)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website,
      person,
      breadcrumbs(page, locale),
      {
        '@type': 'CollectionPage',
        '@id': `${url(page.path)}#webpage`,
        url: url(page.path),
        name: page.title,
        description: page.description,
        inLanguage: htmlLang[locale],
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        breadcrumb: { '@id': `${url(page.path)}#breadcrumbs` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: url(`/publications/${item.id}`),
          })),
        },
      },
    ],
  }
}
