import Link from '@/components/Link'
import SportsList from '@/components/SportsList'
import siteMetadata from '@/data/siteMetadata'
import { nextSports, triedSports } from '@/data/sportsData'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.sports)

export default function SportsAndMe() {
  const hasPhotos = triedSports.some((sport) => sport.photos?.length)
  return (
    <article className="academic-document academic-prose">
      <p className="eyebrow">Beyond research</p>
      <h1>Sports and me</h1>
      <p className="document-intro">I collect sports, one new try at a time.</p>
      <p className="essay-meta">
        <time dateTime="2026-11">November 2026</time> · a list that keeps growing
      </p>

      <h2 id="why">Why I started</h2>
      <p>
        I was born with a heart that had not finished forming. It did finish growing later, but by
        then the habit was set: in many situations I was not encouraged to exercise, and so I did
        not.
      </p>
      <p>
        During university I spent long hours in front of a screen, between coursework and
        competitions, and then the pandemic kept me at home. Somewhere in there I began to feel that
        staying connected to my body mattered, so I started trying different sports.
      </p>
      <p>
        For me, sport is a way to feel connected to the world. It is also a way of proving something
        to myself: I can do this too.
      </p>
      <p>
        The list below makes me sound athletic. In truth, I get out of breath after one flight of
        stairs.
      </p>

      <h2 id="tried">Tried so far ({triedSports.length})</h2>
      {hasPhotos && <p className="sports-hint">Sports with a photo label open my photos.</p>}
      <SportsList sports={triedSports} />

      <h2 id="next">Next on the list ({nextSports.length})</h2>
      <SportsList sports={nextSports} />
      <p className="sports-invite">
        If one of these is on your list too, or you already do it and are happy to take a beginner
        along, <Link href={`mailto:${siteMetadata.email}`}>write to me</Link>. I would love to try
        it together.
      </p>

      <Link className="project-link" href="/about">
        Back to About
      </Link>
    </article>
  )
}
