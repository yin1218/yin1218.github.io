// Locale-aware getters over the English data files (unchanged, also read by the CV generator)
// and their Traditional Chinese counterparts in data/zh/. Both modules share one shape.
import type { Locale } from './i18n'
import * as enAcademic from './academicData'
import * as zhAcademic from './zh/academicData'
import * as enTimeline from './timelineData'
import * as zhTimeline from './zh/timelineData'
import * as enNow from './nowData'
import * as zhNow from './zh/nowData'
import * as enPublications from './publicationDetails'
import * as zhPublications from './zh/publicationDetails'
import * as zhPublicationList from './zh/publications'
import * as enSports from './sportsData'
import * as zhSports from './zh/sportsData'
import * as enPhotos from './homePhotos'
import * as zhPhotos from './zh/homePhotos'
import enProjects from './projectsData'
import zhProjects from './zh/projectsData'
import enResearch from './researchData'
import zhResearch from './zh/researchData'

export const getAcademic = (locale: Locale) => {
  const base = locale === 'zh' ? zhAcademic : enAcademic
  return {
    education: base.education,
    selectedCourses: base.selectedCourses,
    researchExperience: base.researchExperience,
    workExperience: base.workExperience,
    teachingExperience: base.teachingExperience,
    leadershipExperience: base.leadershipExperience,
    awards: base.awards,
    skills: base.skills,
    publication: { ...enAcademic.publication, ...(locale === 'zh' ? zhAcademic.publication : {}) },
  }
}

export interface DisplayPublication extends Omit<enAcademic.PublicationItem, 'type'> {
  type: string
  originalTitle?: string
}

export const getPublications = (locale: Locale): DisplayPublication[] =>
  locale === 'zh'
    ? (zhPublicationList.publications as DisplayPublication[])
    : (enAcademic.publications as DisplayPublication[])

export const getPublicationDetails = (locale: Locale) =>
  locale === 'zh' ? zhPublications.publicationDetails : enPublications.publicationDetails

export const getTimeline = (locale: Locale) => (locale === 'zh' ? zhTimeline : enTimeline)
export const getNow = (locale: Locale) => (locale === 'zh' ? zhNow : enNow)
export const getProjects = (locale: Locale) => (locale === 'zh' ? zhProjects : enProjects)
export const getResearchInterests = (locale: Locale) => (locale === 'zh' ? zhResearch : enResearch)
export const getSports = (locale: Locale) => (locale === 'zh' ? zhSports : enSports)
export const getHomePhotos = (locale: Locale) =>
  locale === 'zh' ? zhPhotos.homePhotos : enPhotos.homePhotos
