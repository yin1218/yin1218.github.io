import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import AcademicEntries from '@/components/AcademicEntries'
import PublicationList from '@/components/PublicationList'
import CVDownload from '@/components/CVDownload'
import CVViews from '@/components/CVViews'
import StructuredData from '@/components/StructuredData'
import { getAcademic } from '@/data/localized'
import { getPageSEO } from 'app/seo'
import { profileStructuredData } from '@/data/structuredData'
import { Locale } from '@/data/i18n'

const copy = {
  en: {
    title: 'Curriculum vitae',
    intro:
      'Human–computer interaction, human-centered AI, and cross-cultural communication. Experience in user research, frontend development, and service innovation.',
    sectionsLabel: 'CV sections',
    nav: {
      education: 'Education',
      publications: 'Publications',
      research: 'Research',
      work: 'Work',
      teaching: 'Teaching',
      leadership: 'Leadership',
      awards: 'Awards',
      skills: 'Skills',
    },
    education: 'Education',
    courses: 'Selected courses',
    publications: 'Publications & demonstrations',
    research: 'Research experience',
    work: 'Work experience',
    teaching: 'Teaching',
    leadership: 'Leadership & service',
    awards: 'Honors & awards',
    skills: 'Skills & languages',
    projects: 'Projects',
    projectNames: 'Pathfinder, GOTCHA, Dormy, Swappy, and Habitra.',
    exploreProjects: 'Explore projects & demos',
    contact: 'Contact',
  },
  zh: {
    title: '履歷',
    intro: '人機互動、以人為本的 AI、跨文化溝通。具備使用者研究、前端開發與服務創新經驗。',
    sectionsLabel: '履歷章節',
    nav: {
      education: '學歷',
      publications: '著作',
      research: '研究',
      work: '工作',
      teaching: '教學',
      leadership: '領導',
      awards: '獎項',
      skills: '技能',
    },
    education: '學歷',
    courses: '重點課程',
    publications: '著作與展示',
    research: '研究經歷',
    work: '工作經歷',
    teaching: '教學',
    leadership: '領導與服務',
    awards: '榮譽與獎項',
    skills: '技能與語言',
    projects: '專案',
    projectNames: 'Pathfinder、GOTCHA、Dormy、Swappy 與 Habitra。',
    exploreProjects: '瀏覽專案與展示影片',
    contact: '聯絡方式',
  },
}

export default function ResumePage({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const {
    education,
    selectedCourses,
    researchExperience,
    workExperience,
    teachingExperience,
    leadershipExperience,
    awards,
    skills,
  } = getAcademic(locale)

  return (
    <CVViews
      header={
        <>
          <StructuredData data={profileStructuredData(getPageSEO(locale).resume, locale)} />
          <p className="eyebrow">
            {locale === 'zh' ? (
              <>
                <span lang="zh-Hant">{siteMetadata.nativeName}</span> · Chien-Yin Wu
              </>
            ) : (
              <>
                Chien-Yin Wu · <span lang="zh-Hant">{siteMetadata.nativeName}</span>
              </>
            )}
          </p>
          <h1>{t.title}</h1>
          <p className="document-intro">{t.intro}</p>
          <div className="document-actions">
            <CVDownload locale={locale} />
          </div>
        </>
      }
    >
      <nav className="cv-navigation" aria-label={t.sectionsLabel}>
        <Link href="#education">{t.nav.education}</Link>
        <Link href="#publications">{t.nav.publications}</Link>
        <Link href="#research-experience">{t.nav.research}</Link>
        <Link href="#work">{t.nav.work}</Link>
        <Link href="#teaching">{t.nav.teaching}</Link>
        <Link href="#leadership">{t.nav.leadership}</Link>
        <Link href="#awards">{t.nav.awards}</Link>
        <Link href="#skills">{t.nav.skills}</Link>
      </nav>
      <section id="education" className="academic-section">
        <h2>{t.education}</h2>
        <AcademicEntries entries={education} />
        <div id="courses" className="selected-courses">
          <h3>{t.courses}</h3>
          {selectedCourses.map((group) => (
            <div className="selected-courses-group" key={group.level}>
              <h4>{group.level}</h4>
              <ul>
                {group.courses.map((course) => (
                  <li key={course.title}>
                    <span>{course.title}</span>
                    <span className="course-grade">{course.grade}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section id="publications" className="academic-section">
        <h2>{t.publications}</h2>
        <PublicationList locale={locale} />
      </section>
      <section id="research-experience" className="academic-section">
        <h2>{t.research}</h2>
        <AcademicEntries entries={researchExperience} />
      </section>
      <section id="work" className="academic-section">
        <h2>{t.work}</h2>
        <AcademicEntries entries={workExperience} />
      </section>
      <section id="teaching" className="academic-section">
        <h2>{t.teaching}</h2>
        <AcademicEntries entries={teachingExperience} />
      </section>
      <section id="leadership" className="academic-section">
        <h2>{t.leadership}</h2>
        <AcademicEntries entries={leadershipExperience} />
      </section>
      <section id="awards" className="academic-section">
        <h2>{t.awards}</h2>
        <div className="academic-entries">
          {awards.map((award) => (
            <article className="academic-entry" key={award.title}>
              <div className="entry-heading">
                <h3>{award.title}</h3>
                <span>{award.date}</span>
              </div>
              <p>{award.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="skills" className="academic-section">
        <h2>{t.skills}</h2>
        <dl className="skills-list">
          {skills.map((skill) => (
            <div key={skill.title}>
              <dt>{skill.title}</dt>
              <dd>{skill.description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="academic-section">
        <h2>{t.projects}</h2>
        <p className="mt-4 leading-8">{t.projectNames}</p>
        <Link className="project-link" href="/projects">
          {t.exploreProjects}
        </Link>
      </section>
      <section className="academic-section">
        <h2>{t.contact}</h2>
        <div className="profile-links">
          <Link href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</Link>
          <Link href={siteMetadata.github}>GitHub</Link>
          <Link href={siteMetadata.orcid}>ORCID</Link>
          {siteMetadata.linkedin && <Link href={siteMetadata.linkedin}>LinkedIn</Link>}
        </div>
      </section>
    </CVViews>
  )
}
