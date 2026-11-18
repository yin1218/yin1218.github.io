import Image from '@/components/Image'
import Link from '@/components/Link'
import projectsData from '@/data/projectsData'

export default function ProjectList({
  featuredOnly = false,
  detailed = false,
}: {
  featuredOnly?: boolean
  detailed?: boolean
}) {
  const projects = featuredOnly ? projectsData.filter((project) => project.featured) : projectsData
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <article
          id={project.id}
          aria-labelledby={`${project.id}-title`}
          className={project.imgSrc ? 'project-entry' : 'project-entry project-entry-text'}
          key={project.title}
        >
          {project.imgSrc && (
            <Link
              href={project.href || '/projects'}
              analyticsResource={project.id}
              aria-label={`View ${project.title}`}
            >
              <Image
                src={project.imgSrc}
                alt={project.title}
                width={544}
                height={306}
                sizes="(max-width: 639px) 352px, 180px"
                className="project-image"
              />
            </Link>
          )}
          <div>
            <span className="research-number">
              Project / {String(index + 1).padStart(2, '0')} · {project.date}
            </span>
            <h2 id={`${project.id}-title`}>
              {project.href ? (
                <Link href={project.href} analyticsResource={project.id}>
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h2>
            {project.role && <p className="project-role">My role: {project.role}</p>}
            <p>{project.description}</p>
            {detailed && project.contribution && (
              <p className="project-contribution">{project.contribution}</p>
            )}
            {project.href && (
              <Link
                className="project-link"
                href={project.href}
                analyticsResource={project.id}
                aria-label={`Learn more about ${project.title}`}
              >
                Watch demo <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
