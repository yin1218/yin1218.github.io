'use client'

import { useState } from 'react'
import Image from '@/components/Image'
import Link from '@/components/Link'
import RolePills from '@/components/RolePills'
import projectsData from '@/data/projectsData'

// Every tag used by at least one project, in order of first appearance.
const tags = [...new Set(projectsData.flatMap((project) => project.roles ?? []))]

export default function ProjectList({
  featuredOnly = false,
  detailed = false,
  filterable = false,
}: {
  featuredOnly?: boolean
  detailed?: boolean
  filterable?: boolean
}) {
  const [tag, setTag] = useState<string | null>(null)
  const all = featuredOnly ? projectsData.filter((project) => project.featured) : projectsData
  const projects = tag ? all.filter((project) => project.roles?.includes(tag)) : all
  return (
    <div className="project-list">
      {filterable && (
        <div
          className="home-reading project-filter"
          role="group"
          aria-label="Filter projects by tag"
        >
          <button
            type="button"
            aria-pressed={tag === null}
            data-analytics-event="project_filter"
            data-analytics-resource="all"
            onClick={() => setTag(null)}
          >
            All
          </button>
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tag === item}
              data-analytics-event="project_filter"
              data-analytics-resource={item}
              onClick={() => setTag(tag === item ? null : item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {projects.map((project, index) => (
        <article
          id={project.id}
          aria-labelledby={`${project.id}-title`}
          className="project-entry"
          key={`${tag}-${project.id}`}
        >
          {project.imgSrc && project.href && (
            <Link
              href={project.href}
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
          {project.imgSrc && !project.href && (
            <Image
              src={project.imgSrc}
              alt={project.title}
              width={544}
              height={306}
              sizes="(max-width: 639px) 352px, 180px"
              className="project-image"
            />
          )}
          {!project.imgSrc && (
            <div className="project-image project-placeholder" aria-hidden="true">
              {project.title.charAt(0)}
            </div>
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
            {project.roles && <RolePills roles={project.roles} />}
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
