import Link from '@/components/Link'
import { genPageMetadata, pageSEO } from 'app/seo'

export const metadata = genPageMetadata(pageSEO.photography)

export default function PhotographyAndMe() {
  return (
    <article className="academic-document academic-prose">
      <p className="eyebrow">Beyond research</p>
      <h1>Photography and me</h1>
      <p className="document-intro">What I think photography means, and how that changed.</p>
      <p className="essay-meta">Translated from a note I wrote in Chinese</p>

      <h2 id="record">A way to record what was real</h2>
      <blockquote className="essay-quote">
        “Photography is what lets me remember the joy and the pain. It records every stage of my
        life for me, and tells me that everything I walked through was real.”
      </blockquote>
      <p>
        I wrote that about a year before this note. Back then, photography was my medium for
        recording what was real. After a year of thinking and reading, mostly when I had nothing
        else to do, that view slowly changed.
      </p>

      <h2 id="unease">A strange feeling at the exhibition</h2>
      <p>
        The World Press Photo exhibition used to leave me shaken. This year it left me with an odd,
        uneasy feeling instead, and I could not name it until I read Wang Cheng-Hsiang’s
        《旁觀的方式》. It is a wonderful book, and I want to read it again when I have time.
      </p>
      <p>
        The book points out that modernism treated “presenting the real” as its highest rule, yet
        the real can hardly be represented in full by an image.
      </p>
      <p>
        In war, a soldier’s greatest fear is the waiting, not the killing. What photographs show,
        though, is usually smoke and blood, because a feeling is too hard to record.
      </p>
      <p>
        Take a step back and suppose feelings could be recorded. Reality still moves forward in a
        line, while a photograph can only freeze one instant. It cannot copy the whole of what was
        real.
      </p>

      <h2 id="meaning">So what is it for?</h2>
      <p>Does photography convey the real? I do not think it does.</p>
      <p>
        No medium can stand in for experiencing the world yourself, so photography now seems to have
        no practical meaning for me.
      </p>
      <p>
        I did not choose photography. I started doing it without noticing. A beautiful accident:
        that is its meaning, haha.
      </p>

      <h2 id="photos">Where the photos are</h2>
      <p>
        I keep taking them anyway. My photographs are on Instagram at{' '}
        <Link href="https://www.instagram.com/wpbag.jpg/">@wpbag.jpg</Link>.
      </p>

      <Link className="project-link" href="/about">
        Back to About
      </Link>
    </article>
  )
}
