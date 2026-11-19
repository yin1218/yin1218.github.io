import siteMetadata from '@/data/siteMetadata'
import { education, publications, researchExperience } from '@/data/academicData'
import { publicationDetails } from '@/data/publicationDetails'
import { absoluteUrl, pageSEO } from '../seo'

export const dynamic = 'force-static'

// llms.txt (https://llmstxt.org): a plain-text summary for AI assistants and answer engines,
// built from the same data as the pages so it cannot drift from them.
export function GET() {
  const summary = (id: string) => publicationDetails.find((d) => d.id === id)?.summary ?? ''
  const lines = [
    `# ${siteMetadata.author} (${siteMetadata.nativeName})`,
    '',
    `> ${siteMetadata.description}`,
    '',
    '## Key facts',
    '',
    `- Name: ${siteMetadata.author}; in Traditional Chinese, ${siteMetadata.nativeName}.`,
    '- Field: human–computer interaction (HCI), human-centered AI, cross-cultural communication.',
    '- Applying to PhD programs in HCI for fall 2027.',
    ...education.map((e) => `- ${e.title}, ${e.organization} (${e.date}). ${e.description}`.trim()),
    ...researchExperience
      .slice(0, 2)
      .map((e) => `- ${e.title}, ${e.organization.replace(/ · /g, ', ')} (${e.date}).`),
    `- ORCID: ${siteMetadata.orcid}`,
    '',
    '## Publications',
    '',
    ...publications.map(
      (p) =>
        `- [${p.title}](${absoluteUrl(`/publications/${p.id}`)}): ${p.authors.join(', ')}. ${p.venue}, ${p.year}. ${summary(p.id)}`
    ),
    '',
    '## Pages',
    '',
    ...[pageSEO.about, pageSEO.resume, pageSEO.projects, pageSEO.publications, pageSEO.blog].map(
      (p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`
    ),
    `- [CV (PDF)](${absoluteUrl('/static/files/chien-yin-wu-cv.pdf')})`,
    `- [CV in Traditional Chinese (PDF)](${absoluteUrl('/static/files/chien-yin-wu-cv-zh.pdf')})`,
    '',
    '## Other languages',
    '',
    `- [繁體中文](${absoluteUrl('/zh')})`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
