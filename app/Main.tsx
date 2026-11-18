import Link from '@/components/Link'
import Image from '@/components/Image'
import NamePronunciation from '@/components/NamePronunciation'
import CVDownload from '@/components/CVDownload'
import NowBlock from '@/components/NowBlock'
import { publication } from '@/data/academicData'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <div className="academic-home home-simple">
      <section id="profile" className="home-profile" aria-labelledby="profile-name">
        <div>
          <h1 id="profile-name">Chien-Yin Wu</h1>
          <NamePronunciation
            audioSrc={`${process.env.BASE_PATH || ''}/static/audio/chien-yin-wu.mp3`}
          />
          <p id="research">
            I study human–computer interaction, human-centered AI, and cross-cultural communication.
            I use interviews and prototypes to explore how AI can support people’s interactions.
          </p>
          <p id="education">
            I received my master’s degree in Information Management from National Taiwan University
            in August 2026, advised by Nanyi Bi.
          </p>
          <p id="observations">
            Outside research, I enjoy visiting cafés, observing society, and taking photographs.
          </p>
          <div id="contact" className="profile-links">
            <Link href={`mailto:${siteMetadata.email}`}>Email</Link>
            <Link href="/resume">CV</Link>
            <CVDownload label="CV (PDF)" />
            <Link href={siteMetadata.orcid}>ORCID</Link>
            <Link href={siteMetadata.github}>GitHub</Link>
            {siteMetadata.linkedin && <Link href={siteMetadata.linkedin}>LinkedIn</Link>}
          </div>
        </div>
        <div className="home-portrait-frame">
          <Image
            src="/static/images/chien-yin-wu.webp"
            alt="Portrait of Chien-Yin Wu"
            width={180}
            height={180}
            sizes="(max-width: 767px) 112px, 160px"
            className="home-portrait"
            priority
          />
        </div>
      </section>

      <NowBlock />

      <section id="publication" className="home-section" aria-labelledby="publication-title">
        <h2 id="publication-title">Featured research</h2>
        <article className="home-publication">
          <h3>
            <Link href={publication.path}>{publication.title}</Link>
          </h3>
          <p>{publication.authors}</p>
          <p className="home-meta">{publication.venue}</p>
          <p>{publication.description}</p>
          <div className="research-actions">
            <Link className="home-detail-link" href={publication.path}>
              Research overview
            </Link>
            <Link className="home-detail-link" href={publication.href}>
              Read paper ↗
            </Link>
          </div>
        </article>
        <Link className="home-detail-link" href="/publications">
          All publications
        </Link>
      </section>

      <section id="projects" className="home-section" aria-labelledby="projects-title">
        <h2 id="projects-title">Selected projects</h2>
        <div className="home-projects">
          {projectsData
            .filter((project) => project.featured)
            .map((project) => (
              <article key={project.title}>
                <h3>
                  <Link href={`/projects#${project.id}`}>{project.title}</Link>
                </h3>
                <p className="home-meta">
                  {project.role} · {project.date}
                </p>
                <p>{project.description}</p>
                <Link className="home-detail-link" href={`/projects#${project.id}`}>
                  Contribution & demo
                </Link>
              </article>
            ))}
        </div>
        <Link className="home-detail-link" href="/projects">
          All projects & demos
        </Link>
      </section>
    </div>
  )
}
