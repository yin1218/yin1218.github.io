import Link from '@/components/Link'
import StructuredData from '@/components/StructuredData'
import { publication } from '@/data/academicData'
import { researchStructuredData } from '@/data/structuredData'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.beyondAdaptation)

export default function BeyondAdaptation() {
  return (
    <article className="academic-document research-document">
      <StructuredData data={researchStructuredData()} />
      <p className="eyebrow">Human-AI interaction · Cross-cultural communication</p>
      <h1>Beyond Adaptation</h1>
      <p className="document-intro">
        An LLM-supported self-presentation ideation tool for cross-cultural mingling.
      </p>
      <p className="research-byline">
        {publication.authors} · {publication.venue}
      </p>
      <div className="document-actions">
        <Link href={publication.href}>Read paper ↗</Link>
        <Link
          href={`${process.env.BASE_PATH || ''}${publication.citationPath}`}
          download="beyond-adaptation.bib"
        >
          Download BibTeX
        </Link>
      </div>

      <section id="overview" className="academic-section academic-prose">
        <h2>The research question</h2>
        <p>
          How can AI support people in developing ideas for presenting themselves when meeting
          people from different cultural backgrounds?
        </p>
        <p>
          This project brings together qualitative interviews and an interactive prototype to
          explore self-presentation in cross-cultural mingling. It connects my interests in
          human-centered AI and cross-cultural communication.
        </p>
      </section>

      <section id="approach" className="academic-section academic-prose">
        <h2>Research approach</h2>
        <figure className="study-process">
          <ol>
            <li>
              <span className="eyebrow">01 · Understand</span>
              <strong>7 interviews</strong>
              <span>Hour-long conversations about cross-cultural mingling.</span>
            </li>
            <li>
              <span className="eyebrow">02 · Design & build</span>
              <strong>LLM-supported prototype</strong>
              <span>A tool for developing self-presentation ideas.</span>
            </li>
            <li>
              <span className="eyebrow">03 · Share</span>
              <strong>CHI EA 2025</strong>
              <span>Published as a Late-Breaking Work.</span>
            </li>
          </ol>
          <figcaption>
            Research process: interviews, prototype development, and publication.
          </figcaption>
        </figure>
        <p>
          I conducted seven hour-long interviews about people’s experiences of cross-cultural
          mingling. I also designed and developed an LLM-supported prototype for self-presentation
          ideation. The prototype explores using AI to help people develop ideas for what they might
          share about themselves in these interactions.
        </p>
      </section>

      <section id="contribution" className="academic-section academic-prose">
        <h2>My contribution</h2>
        <ul>
          <li>Conducted the seven qualitative interviews.</li>
          <li>Designed the self-presentation ideation prototype.</li>
          <li>Implemented the LLM-supported prototype.</li>
        </ul>
        <p>This work was carried out with my advisor, Nanyi Bi, at National Taiwan University.</p>
      </section>

      <section id="publication" className="academic-section academic-prose">
        <h2>Paper & citation</h2>
        <p>
          Chien-Yin Wu and Nanyi Bi. 2025. <cite>{publication.title}</cite>. Proceedings of the
          Extended Abstracts of the CHI Conference on Human Factors in Computing Systems (CHI EA
          ’25), 1–6.
        </p>
        <p>
          <Link href={publication.href}>DOI: 10.1145/3706599.3719929</Link>
        </p>
        <div className="profile-links">
          <Link href="/resume">Academic CV</Link>
          <Link href="/projects">Projects & demos</Link>
        </div>
      </section>
    </article>
  )
}
