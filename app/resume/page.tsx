import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import AcademicEntries from '@/components/AcademicEntries'
import PublicationList from '@/components/PublicationList'
import CVDownload from '@/components/CVDownload'
import {
  education,
  researchExperience,
  workExperience,
  teachingExperience,
  leadershipExperience,
  awards,
  skills,
} from '@/data/academicData'
import { genPageMetadata, pageSEO } from 'app/seo'
import StructuredData from '@/components/StructuredData'
import { profileStructuredData } from '@/data/structuredData'

export const metadata = genPageMetadata(pageSEO.resume)

export default function Resume() {
  return (
    <div className="academic-document">
      <StructuredData data={profileStructuredData(pageSEO.resume)} />
      <p className="eyebrow">
        Chien-Yin Wu · <span lang="zh-Hant">巫芊瑩</span>
      </p>
      <h1>Curriculum vitae</h1>
      <p className="document-intro">
        Human–computer interaction, human-centered AI, and cross-cultural communication. Experience
        in user research, frontend development, and service innovation.
      </p>
      <div className="document-actions">
        <CVDownload />
      </div>
      <nav className="cv-navigation" aria-label="CV sections">
        <Link href="#education">Education</Link>
        <Link href="#publications">Publications</Link>
        <Link href="#research-experience">Research</Link>
        <Link href="#work">Work</Link>
        <Link href="#teaching">Teaching</Link>
        <Link href="#leadership">Leadership</Link>
        <Link href="#awards">Awards</Link>
        <Link href="#skills">Skills</Link>
      </nav>
      <section id="education" className="academic-section">
        <h2>Education</h2>
        <AcademicEntries entries={education} />
      </section>
      <section id="publications" className="academic-section">
        <h2>Publications</h2>
        <PublicationList />
      </section>
      <section id="research-experience" className="academic-section">
        <h2>Research experience</h2>
        <AcademicEntries entries={researchExperience} />
      </section>
      <section id="work" className="academic-section">
        <h2>Work experience</h2>
        <AcademicEntries entries={workExperience} />
      </section>
      <section id="teaching" className="academic-section">
        <h2>Teaching</h2>
        <AcademicEntries entries={teachingExperience} />
      </section>
      <section id="leadership" className="academic-section">
        <h2>Leadership & service</h2>
        <AcademicEntries entries={leadershipExperience} />
      </section>
      <section id="awards" className="academic-section">
        <h2>Honors & awards</h2>
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
        <h2>Skills & languages</h2>
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
        <h2>Projects</h2>
        <p className="mt-4 leading-8">Pathfinder, GOTCHA, Dormy, Swappy, and Habitra.</p>
        <Link className="project-link" href="/projects">
          Explore projects & demos
        </Link>
      </section>
      <section className="academic-section">
        <h2>Contact</h2>
        <div className="profile-links">
          <Link href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</Link>
          <Link href={siteMetadata.github}>GitHub</Link>
          <Link href={siteMetadata.orcid}>ORCID</Link>
          {siteMetadata.linkedin && <Link href={siteMetadata.linkedin}>LinkedIn</Link>}
        </div>
      </section>
    </div>
  )
}
