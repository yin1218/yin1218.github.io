import Link from '@/components/Link'
import { Locale } from '@/data/i18n'

export default function CafesEssay({ locale }: { locale: Locale }) {
  return locale === 'zh' ? (
    <article className="academic-document academic-prose">
      <p className="eyebrow">研究之外</p>
      <h1>咖啡廳與我</h1>
      <p className="document-intro">逛咖啡廳算不算嗜好？我去那裡，到底是為了什麼？</p>
      <p className="essay-meta">
        <time dateTime="2026-11">2026 年 11 月</time> · 整理自 10 月以來的筆記
      </p>

      <h2 id="doubt">一個說出口有點彆扭的嗜好</h2>
      <p>
        有人問我平常休閒都做些什麼，老實說，答案是逛咖啡廳。但很長一段時間，我都不太好意思這樣講。寫作、畫畫會產出東西；看書、看展至少吸收了東西。逛咖啡廳看起來卻只是單純的消費：付錢、坐著，然後兩手空空地離開。
      </p>
      <p>
        可是這條界線越想越站不住。看展要買票，書也有定價，說穿了一樣是消費，只是因為有明確的內容可以吸收，看起來比較體面。我真正在意的不是花錢，而是咖啡廳好像沒有什麼內容，待再久也累積不出什麼。
      </p>
      <p>
        Robert Stebbins 把休閒分成兩種：嚴肅休閒（serious
        leisure）會慢慢累積技能與知識，隨興休閒（casual
        leisure）則純粹是享受。逛咖啡廳兩種都可以是。有人會學著分辨烘焙度和產區，或是看懂一個空間怎麼安排光線與動線。我大多屬於隨興的那一邊，也不再覺得這有什麼好道歉的。
      </p>

      <h2 id="beach">就像去海邊</h2>
      <p>
        後來讓我釋懷的，是拿海邊或山來比。有人說喜歡去海邊，沒有人會覺得奇怪，雖然去海邊同樣什麼也沒產出。去那裡，就是為了在某種氛圍裡待上一會兒。
      </p>
      <p>
        差別只有一個。海岸的氛圍不是誰造出來的，我是去和它相遇；咖啡廳的氛圍則是設計過的：燈光、音樂、椅子的高度、窗戶框進來的風景。一間接著一間逛，有點像走過一個又一個別人用心策展的氛圍，這大概也是我總想試新店的原因。
      </p>
      <p>
        所以我不再硬把「嗜好」這兩個字套上去。「我喜歡待在氛圍好的咖啡廳」，跟「我喜歡在海邊散步」一樣，就是一句很平常的話。
      </p>

      <h2 id="atmosphere">我吸收的是氛圍</h2>
      <p>
        Gernot Böhme
        讓我找到描述這件事的語言。在他看來，氛圍是一種「介於中間」的東西：它不屬於哪一張椅子或哪一盞燈，也不只是我把心情投射到房間上；換作別人走進來，一樣感受得到。我還沒看清楚店裡的擺設，身體就已經知道這裡是鬆是緊、是冷是暖。一盞黃燈，就能替整個角落定調。
      </p>
      <p>
        不過 Böhme
        也有批判的一面。他指出，我們買的東西，越來越多是刻意佈置出來的情緒，咖啡廳就是很明顯的例子。這點我接受，逛咖啡廳確實是消費。但我消費的東西是真實的，而且非得親自到場才拿得到。它也是一種輸入，只是不以文字的形式出現：光線、聲音的疏密、飲料的味道、身邊的人的步調。
      </p>

      <h2 id="place">淺嚐，而不是定居</h2>
      <p>
        人文地理學者看的是更長的時間。段義孚（Yi-Fu Tuan）
        說，空間是移動，地方是停頓：在一個地方停留得夠多次，經驗和情感慢慢沉澱下來，空間就成了地方。Edward
        Relph 描述了一道光譜，一端是以外人的身分路過，另一端是真正屬於某個地方。David Seamon
        則寫過「地方芭蕾」（place
        ballet），指許多人的日常在同一個地點交會：每天早上都是同一位咖啡師，靠窗的位子總坐著同一位老先生。
      </p>
      <p>
        照這樣看，逛很多間咖啡廳，和有一間屬於自己的咖啡廳，是兩種不同的經驗。去新店的時候，我是在品嚐一種氛圍，不需要和那裡有任何過去。同一張桌子回去坐上二十次，那間店才會變成我的地方。我做的多半是前者，承認這點之後，心裡輕鬆不少：我比較像是在漫遊，而不是在紮根。
      </p>

      <h2 id="working">不是每個人都在工作</h2>
      <p>
        我以前不喜歡主打共同工作（co-working）的咖啡廳，過了好一陣子才想通原因。我喜歡一般咖啡廳，是因為那裡不是每個人都在工作：有人聊天、有人看書、有人盯著窗外發呆，也有人在打字。沒有哪一種狀態是預設，所以我可以在工作和休息之間切換，做哪一件都不顯得突兀。到了大家都在工作的空間，休息反而會讓我覺得跟周圍格格不入。
      </p>
      <p>
        沒人來打擾，也是原因之一。Erving Goffman 把這叫做禮貌性忽視（civil
        inattention）：陌生人之間短暫對看一眼，意思是「我看到你了」，接著移開視線，表示「我不會打擾你」。他把這比作會車時把遠光燈切成近光燈。這是一種禮貌，不是冷漠。在咖啡廳裡，我和其他人待在同一個空間，卻不欠任何人一句回應。我能在那裡放鬆，很大一部分就是因為這樣。
      </p>

      <h2 id="ticket">搭話的門票</h2>
      <p>
        但同樣的禮貌，也讓人很難開口，因為要打破它，總得有個理由。十月下旬的某一天，我在一個經過策展的共享空間待了一段時間，對這類地方的看法也跟著改變。那裡有一般咖啡廳很少提供的東西：認識人的機會。
      </p>
      <p>
        Harvey Sacks 有個說法，剛好能形容先前缺的那樣東西：「搭話的門票」（ticket to
        talk）。陌生人需要某個理由，讓開口變得順理成章：一起參與的活動、一個話題，或是一樣可以指著問「你也是為了這個來的嗎？」的東西。一般咖啡廳不缺人，缺的是這張門票。經過策展的空間，則透過主題、活動，或是聚集來的那群人，把門票發給每一個人。
      </p>
      <p>
        這是有代價的。Ray Oldenburg 所說的「第三空間」（third
        place），是家和職場以外的非正式聚會場所，理應是中立的地方：身分地位在那裡被抹平，誰都可以走進來。策展空間讓相遇變得容易，靠的卻是篩選誰會在場。比起第三空間，它更接近一個社群：比較容易聊開，但沒那麼開放，對只想安靜坐著、不想被注意的人，也沒那麼包容。
      </p>
      <p>
        這兩種偏好並不衝突。一種在意的是氛圍讓我能做什麼，另一種在意的是空間讓哪些相遇有機會發生。想在工作和發呆之間晃來晃去的時候，我會為了氛圍去一般的咖啡廳；想認識人的時候，我現在知道要去找會發門票的地方。
      </p>

      <h2 id="open">我還沒想通的事</h2>
      <p>
        十月那次為什麼能認識人，我到現在還沒想通。也許是因為那場活動，也許是空間的安排，例如那張長長的共用桌，也可能是在場的人本來就有共同點。想通了，大概就知道所謂「策展一個空間」，策的到底是空間、活動，還是人。我會繼續跑咖啡廳，慢慢找答案。
      </p>
      <p>
        我逛過的咖啡廳都會發在 Threads 帳號{' '}
        <Link href="https://www.threads.com/@wpbag.cafe">@wpbag.cafe</Link>。
      </p>

      <h2 id="reading">參考讀物</h2>
      <ul>
        <li>Gernot Böhme 談氛圍與美學經濟</li>
        <li>
          Yi-Fu Tuan，<cite>Space and Place</cite>、<cite>Topophilia</cite>
        </li>
        <li>
          Edward Relph，<cite>Place and Placelessness</cite>
        </li>
        <li>David Seamon 談身體芭蕾與地方芭蕾</li>
        <li>
          Ray Oldenburg，<cite>The Great Good Place</cite>
        </li>
        <li>
          Erving Goffman，<cite>Behavior in Public Places</cite>
        </li>
        <li>Harvey Sacks 談搭話的門票</li>
        <li>Robert Stebbins 談嚴肅休閒與隨興休閒</li>
      </ul>

      <Link className="project-link" href="/about">
        回到關於頁
      </Link>
    </article>
  ) : (
    <article className="academic-document academic-prose">
      <p className="eyebrow">Beyond research</p>
      <h1>Cafés and me</h1>
      <p className="document-intro">
        On whether going to cafés counts as a hobby, and what I am actually there for.
      </p>
      <p className="essay-meta">
        <time dateTime="2026-11">November 2026</time> · from notes I have kept since October
      </p>

      <h2 id="doubt">A hobby that felt odd to say out loud</h2>
      <p>
        When people ask what I do for fun, the honest answer is that I go to cafés. For a long time
        I felt uneasy saying it. Writing and drawing produce something. Reading and visiting
        exhibitions take something in. Going to cafés looked like plain consumption: I pay, I sit, I
        leave with nothing.
      </p>
      <p>
        The more I looked at that distinction, the less it held. An exhibition needs a ticket and a
        book has a price, so those are consumption too. They only feel respectable because there is
        obvious content to absorb. What bothered me about cafés was not the paying. It was that they
        seemed to have no content and nothing that adds up over time.
      </p>
      <p>
        Robert Stebbins separates serious leisure, where skill and knowledge build up, from casual
        leisure, which is simply enjoyed. Café-going can be either. Some people learn to tell roasts
        and origins apart, or read how a room handles light and movement. I am mostly on the casual
        side, and I have stopped thinking that needs an apology.
      </p>

      <h2 id="beach">Like going to the beach</h2>
      <p>
        The comparison that settled it for me was the beach, or the mountains. Nobody finds it
        strange when someone says they like going to the sea, although that produces nothing either.
        You go to be inside a certain atmosphere for a while.
      </p>
      <p>
        There is one difference. The atmosphere of a coast is not made by anyone; I go there to meet
        it. The atmosphere of a café is designed: the lighting, the music, the height of the chairs,
        what the window frames. Going from café to café is a little like walking through atmospheres
        that people have curated one by one, which is probably why I keep wanting to try a new
        place.
      </p>
      <p>
        So I no longer force the word “hobby” onto it. “I like spending time in cafés with a good
        atmosphere” is as ordinary a sentence as “I like walking by the sea.”
      </p>

      <h2 id="atmosphere">What I take in is atmosphere</h2>
      <p>
        Gernot Böhme gave me words for this. He describes atmosphere as something in between: it is
        not a property of any chair or lamp, and it is not only my mood projected onto the room.
        Someone else who walks in feels it as well. Before I have looked at the furniture, my body
        already knows whether the place is loose or tense, cold or warm. One yellow lamp can tune a
        whole corner.
      </p>
      <p>
        Böhme is also critical. He points out that more and more of what we buy is staged mood, and
        cafés are a clear case. I accept that. Going to cafés is consumption. But what I consume is
        real, and it can only be had by being there in person. It is input, only not in the form of
        text: light, how dense the sound is, the taste of the drink, the pace of the people around
        me.
      </p>

      <h2 id="place">Tasting, not settling</h2>
      <p>
        The humanistic geographers look at a longer stretch of time. For Yi-Fu Tuan, space is
        movement and place is pause: a space becomes a place once you have stopped there often
        enough for experience and feeling to gather. Edward Relph describes a range from passing
        through as an outsider to belonging somewhere. David Seamon writes about the “place ballet,”
        when many people’s routines cross at the same spot: the same barista every morning, the old
        man who always takes the window seat.
      </p>
      <p>
        Read this way, visiting many cafés and having one café are different experiences. When I go
        somewhere new I am tasting an atmosphere, which needs no history. Returning to the same
        table twenty times is what turns a shop into my place. I do far more of the first, and it
        helped to admit that. I am wandering more than I am putting down roots.
      </p>

      <h2 id="working">Not everyone is working</h2>
      <p>
        I used to dislike co-working cafés, and it took me a while to see why. What I like about an
        ordinary café is that not everyone there is working. Some people talk, some read, some stare
        out of the window, some type. No single state is the default, so I can move between working
        and resting without either one feeling out of place. In a room where everybody is working,
        resting starts to feel like a mismatch with the room.
      </p>
      <p>
        Being left alone is part of it. Erving Goffman called this civil inattention: strangers give
        each other a brief glance that says “I see you,” then look away to say “and I will not
        intrude.” He compared it to dimming your headlights for an oncoming car. It is a courtesy,
        not coldness. In a café I am present among other people and I owe none of them a reply. That
        is a large part of why I can relax there.
      </p>

      <h2 id="ticket">A ticket to talk</h2>
      <p>
        The same courtesy makes it hard to start a conversation, because breaking it needs a reason.
        One day in late October I spent time in a shared space that had been curated, and I changed
        my mind about such places. It offered something an ordinary café rarely does: a chance to
        meet people.
      </p>
      <p>
        Harvey Sacks has a phrase for what was missing before, a “ticket to talk.” Strangers need
        something that makes opening their mouths reasonable: a shared activity, a topic, a thing to
        point at and ask, “Are you here for this too?” Ordinary cafés have plenty of people. What
        they lack is the ticket. A curated space hands one to everybody through its theme, its
        events, or the people it brings together.
      </p>
      <p>
        This comes at a cost. Ray Oldenburg’s third place, the informal gathering spot that is
        neither home nor work, is supposed to be neutral ground where status is levelled and anyone
        may walk in. A curated space makes meeting easy by selecting who is in the room. It is
        closer to a community than to a third place: easier to enter into conversation, less open,
        and less forgiving of someone who only wants to sit there unnoticed.
      </p>
      <p>
        The two preferences do not contradict each other. One is about what the atmosphere lets me
        do, the other about which encounters the space makes possible. When I want to drift between
        work and daydreaming, I go to an ordinary café for its atmosphere. When I want to meet
        someone, I now know to look for a place that gives out tickets.
      </p>

      <h2 id="open">What I have not worked out</h2>
      <p>
        I still do not know what made that October encounter happen. It could have been the
        activity, the way the room was arranged, such as one long shared table, or the fact that the
        people there already had something in common. The answer would tell me what “curating” a
        space really curates: the room, the programme, or the people. I will keep going to cafés to
        find out.
      </p>
      <p>
        I post the cafés I visit on Threads at{' '}
        <Link href="https://www.threads.com/@wpbag.cafe">@wpbag.cafe</Link>.
      </p>

      <h2 id="reading">Reading behind this</h2>
      <ul>
        <li>Gernot Böhme on atmosphere and the aesthetic economy</li>
        <li>
          Yi-Fu Tuan, <cite>Space and Place</cite> and <cite>Topophilia</cite>
        </li>
        <li>
          Edward Relph, <cite>Place and Placelessness</cite>
        </li>
        <li>David Seamon on body ballet and place ballet</li>
        <li>
          Ray Oldenburg, <cite>The Great Good Place</cite>
        </li>
        <li>
          Erving Goffman, <cite>Behavior in Public Places</cite>
        </li>
        <li>Harvey Sacks on the ticket to talk</li>
        <li>Robert Stebbins on serious and casual leisure</li>
      </ul>

      <Link className="project-link" href="/about">
        Back to About
      </Link>
    </article>
  )
}
