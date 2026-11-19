import Link from '@/components/Link'
import SportsList from '@/components/SportsList'
import siteMetadata from '@/data/siteMetadata'
import { getSports } from '@/data/localized'
import { Locale } from '@/data/i18n'

export default function SportsEssay({ locale }: { locale: Locale }) {
  const { triedSports, nextSports } = getSports(locale)
  return locale === 'zh' ? (
    <article className="academic-document academic-prose">
      <p className="eyebrow">研究之外</p>
      <h1>運動與我</h1>
      <p className="document-intro">我在收集運動，一次試一項新的。</p>
      <p className="essay-meta">
        <time dateTime="2026-11">2026 年 11 月</time> · 一份還在變長的清單
      </p>

      <h2 id="why">為什麼開始</h2>
      <p>
        我出生時，心臟還沒發育完全。後來雖然長好了，習慣卻已經養成：很多時候，我都不會被鼓勵去運動，所以也就沒動。
      </p>
      <p>
        大學時，課業和比賽讓我長時間黏在螢幕前，接著疫情又把我困在家裡。不知道從什麼時候開始，我覺得跟自己的身體保持連結很重要，就開始嘗試各種運動。
      </p>
      <p>運動讓我覺得自己和這個世界連在一起，也讓我向自己證明：我也做得到。</p>
      <p>下面這份清單，讓我看起來好像很會運動。老實說，我爬一層樓梯就會喘。</p>

      <h2 id="tried">目前試過（{triedSports.length}）</h2>
      <SportsList sports={triedSports} limit={12} />

      <h2 id="next">接下來想試（{nextSports.length}）</h2>
      <SportsList sports={nextSports} />
      <p className="sports-invite">
        如果其中哪一項也在你的清單上，或是你本來就有在玩、也願意帶新手，歡迎
        <Link href={`mailto:${siteMetadata.email}`}>寫信給我</Link>，很想跟你一起試試看。
      </p>

      <Link className="project-link" href="/about">
        回到關於頁
      </Link>
    </article>
  ) : (
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
      <SportsList sports={triedSports} limit={12} />

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
