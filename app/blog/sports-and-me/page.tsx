import Link from '@/components/Link'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.sports)

const tried = [
  'Running',
  'Locking',
  'Modern dance (contact improvisation)',
  'Kayaking',
  'Stand-up paddleboarding',
  'Swimming',
  'Snorkelling',
  'Bouldering',
  'Ice climbing',
  'Aerial yoga',
  'Mat yoga',
  'Pilates',
  'Fire spinning',
  'Pole dance',
  'Skating',
  'Weight training',
  'Gyrotonic',
  'Taekwondo',
  'Volleyball',
  'Badminton',
  'Squash',
  'Billiards',
  'Table tennis',
  'Golf',
  'Tree climbing',
  'Archery',
  'Soft tennis',
  'Cycling',
  'Ostrich riding (?)',
  'Frisbee',
  'Bowling',
  'Darts',
]

const next = [
  'Scuba diving',
  'Aerial hoop',
  'Curling',
  'Skateboarding',
  'Sanda',
  'Dragon boating',
  'Dragon and lion dance',
  'Fencing',
  'Air rifle shooting',
  'Skiing',
  'Sailing',
  'Horse riding',
  'Surfing',
]

export default function SportsAndMe() {
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
        During university I spent long hours in front of a screen, between coursework and
        competitions, and then the pandemic kept me at home. Somewhere in there I began to feel that
        staying connected to my body mattered, so I started trying different sports.
      </p>
      <p>
        The list below makes me sound athletic. In truth, I get out of breath after one flight of
        stairs.
      </p>

      <h2 id="tried">Tried so far ({tried.length})</h2>
      <ul className="sports-list">
        {tried.map((sport) => (
          <li key={sport}>{sport}</li>
        ))}
      </ul>

      <h2 id="next">Next on the list ({next.length})</h2>
      <ul className="sports-list">
        {next.map((sport) => (
          <li key={sport}>{sport}</li>
        ))}
      </ul>

      <Link className="project-link" href="/about">
        Back to About
      </Link>
    </article>
  )
}
