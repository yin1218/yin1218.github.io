import Link from '@/components/Link'
import { Locale } from '@/data/i18n'

export default function PhotographyEssay({ locale }: { locale: Locale }) {
  return locale === 'zh' ? (
    <article className="academic-document academic-prose">
      <p className="eyebrow">研究之外</p>
      <h1>攝影與我</h1>
      <p className="document-intro">我怎麼看待攝影，以及這個看法後來怎麼變了。</p>

      <h2 id="record">記下真實</h2>
      <blockquote className="essay-quote">
        「攝影讓我記得喜悅，也記得痛苦。它替我記錄人生的每個階段，告訴我走過的一切都是真的。」
      </blockquote>
      <p>
        這段話是我大約一年前寫的。那時候，攝影是我用來記錄真實的媒介。這一年想了很多，也讀了一些書（多半是在閒著沒事的時候），這個看法就慢慢變了。
      </p>

      <h2 id="unease">看展時說不上來的感覺</h2>
      <p>
        以前看 World Press Photo
        展，總是很受震撼。今年看完，卻留下一種說不上來的不安，直到讀了汪正翔的《旁觀的方法》，我才知道那是什麼。
      </p>
      <p>書裡提到，現代主義把「呈現真實」奉為最高準則，但真實其實很難靠一張影像完整再現。</p>
      <p>
        打仗的時候，士兵最怕的是等待，不是殺戮。可是照片拍到的，通常是硝煙和血，因為感受太難記錄下來。
      </p>
      <p>
        退一步說，就算感受記錄得下來，現實還是沿著一條線不斷往前，照片卻只能凍結其中一個瞬間，沒辦法複製真實的全貌。
      </p>

      <h2 id="meaning">那拍照是為了什麼？</h2>
      <p>攝影傳達了真實嗎？我覺得沒有。</p>
      <p>沒有任何媒介能取代親身經歷這個世界。所以我不再要攝影替我證明什麼。</p>
      <p>
        我不是選擇了攝影，而是不知不覺就開始拍了。一場美麗的意外：就目前來說，這樣的意義就夠了。
      </p>

      <h2 id="photos">照片在這裡</h2>
      <p>
        不過我還是一直在拍。照片都放在 Instagram 帳號{' '}
        <Link href="https://www.instagram.com/wpbag.jpg/">@wpbag.jpg</Link>。
      </p>

      <Link className="project-link" href="/about">
        回到關於頁
      </Link>
    </article>
  ) : (
    <article className="academic-document academic-prose">
      <p className="eyebrow">Beyond research</p>
      <h1>Photography and me</h1>
      <p className="document-intro">What I think photography means, and how that changed.</p>

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
        uneasy feeling instead, and I could not name it until I read Wang Cheng-Hsiang’s{' '}
        <cite>Ways of Looking On</cite>.
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
        No medium can stand in for experiencing the world yourself. So I stopped asking photography
        to prove anything.
      </p>
      <p>
        I did not choose photography. I started doing it without noticing. A beautiful accident: for
        now, that is meaning enough.
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
