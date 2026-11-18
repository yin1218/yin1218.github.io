import type { Experience } from '@/data/academicData'

export default function AcademicEntries({ entries }: { entries: Experience[] }) {
  return (
    <div className="academic-entries">
      {entries.map((entry) => (
        <article
          className="academic-entry"
          key={`${entry.title}-${entry.organization}-${entry.date}`}
        >
          <div className="entry-heading">
            <h3>{entry.title}</h3>
            <span>{entry.date}</span>
          </div>
          <p className="entry-organization">{entry.organization}</p>
          {entry.description && <p>{entry.description}</p>}
        </article>
      ))}
    </div>
  )
}
