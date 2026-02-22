import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen, Heart } from "lucide-react";
import gargee1 from "@/assets/gallery/gargee-1.jpg";

// ─── Book content from somethingnew.txt ───
const bookPages = [
  {
    title: "Cover",
    content: "",
    isCover: true,
  },
  {
    title: "Part One: Strangers on a Screen",
    content: `The story begins in 2019. It feels like a lifetime ago now, doesn't it? The world was different then, and I was different, too. It started in a place that feels almost too ordinary for how much it would eventually shatter and rebuild my entire existence — Discord.

For most people, it was just an app — a place to chat while gaming, a collection of servers and notifications. But for me, it became the doorway to everything.

I met a girl there.

To this day, I can't quite recall the exact timestamp. I don't remember the specific server channel or the precise moment our paths crossed in the digital void. The memory is like a watercolor painting left out in the rain — the edges are blurred, the specific lines washed away — but the color remains. I know the where and I know the when, and sometimes, in the grand scheme of fate, that has to be enough.

Her profile was the first thing I noticed. She was cute — no, beautiful. Gorgeous, even. But it wasn't just the static image that drew me in. It was the way she typed, the way she carried herself in the text channels. She was loving, caring, and possessed this endearing clumsiness that made her feel incredibly real. In a space filled with trolls and anonymous masks, she felt human. She felt tangible, not like some distant, perfect persona curated behind a screen.

We started the way everyone does in the digital age. It was a dance we both knew the steps to — strangers trading the basics, testing the waters to see if it was safe to swim.

"What's your name?"
"How old are you?"

I remember typing the answers, the mechanical rhythm of the keys under my fingers.

"Where are you from?" she asked.
"Tell me about your family," I replied.

These questions felt like a script we were both reading from, the kind of first conversation that happens a million times a day across the internet. It was the standard protocol of online interaction — establish identity, establish location, establish safety. It should have been nothing special. It should have been forgettable, just another chat log buried under thousands of others.

Except... it was special.

It wasn't a slow burn. It was a freefall. Within just a few days, I found myself falling in love with her.

I know how that sounds to anyone looking in from the outside. It sounds fast. It sounds reckless, maybe even a little desperate. How can you fall for pixels? they might ask. How can you love someone you haven't touched?

But they weren't there. They didn't feel the way the air shifted when she replied. There was something about the way she listened — she didn't just wait for her turn to type — she really listened. She absorbed my words. She was the kind of person I'd never expected to find in the real world, let alone stumble upon in a random discord server amidst the noise and the chaos.`,
  },
  {
    title: "Part One: When Everything Deepened",
    content: `The conversations that started as polite small talk — the weather, school, the mundane details of life — slowly metamorphosed. They became the anchor of my existence, the best part of my day. I found myself rushing through my daily routine, checking the time, just waiting for the moment I could sit down at my computer and see her status turn green.

We started exploring our shared interests. We discovered we both liked anime and movies — or at least, that's what I told her.

The truth was a little more complicated. I didn't really care about anime at the time. It was just cartoons to me, something casual. And movies? Movies were fine, a decent way to kill two hours, but I wasn't obsessed. I didn't live for cinema.

She, on the other hand, was a different breed entirely. She was a "K-drama girl" through and through. She lived in those worlds of high romance, dramatic pauses, and tear-jerking plot twists. I had absolutely no interest in that world. To me, it looked like subtitles and melodrama.

But she had this power. She did this thing where our normal chats would stretch like taffy, pulling longer and longer until the sun went down and the moon took its place. And those late nights turned into movie nights, into anime marathons. It became just us, together in the glow of our screens, isolated from the rest of the world, watching whatever came up.

"Are you watching? It's getting good!" she would message.
And I would lie.
"Yeah, this is good! I'm really enjoying it!" I'd type back, forcing enthusiasm into every keystroke.

I didn't lie to trick her. I lied because I didn't want to disappoint her. I lied because seeing her happy, even over something I found boring, made me happy.

And then, a shift occurred. I don't know when it happened exactly. I can't pinpoint the specific episode or the specific series where the boredom turned into genuine interest, but somehow, I got hooked.

K-dramas became my thing, too.

She became my guide. She introduced me to so many anime that would become staples of my life — Demon Slayer with its breathtaking animation, the brutal world of Attack on Titan, and her all-time favorite — Spy x Family.

Those nights? Those early nights when everything was new and exciting? When a notification sound was enough to make my heart race? I'll never forget them. They were the foundation. They were the beginning of the "us" I didn't even know I was building.`,
  },
  {
    title: "Part One: The Gaming Days",
    content: `Those movie nights, as cherished as they were, eventually evolved. Passive consumption wasn't enough anymore — we wanted to do something together. We needed a new way to bridge the hundreds of miles between us, something more interactive than just listening to each other breathe over a voice call while a movie played.

So, naturally, we started gaming together.

She was a Call of Duty girl through and through. She thrived on the chaos — all about that fast-paced action, the run and gun, the instant respawns, and the adrenaline of the kill cam. She wanted speed. She wanted instant gratification.

Me? I was loyal to PUBG.

She had never played it before. It wasn't her style — it wasn't her world. But she did something that still makes me smile when I think about it — she tried it for me.

For me.

She downloaded the massive file, set up her account, and stepped into my world. That small gesture meant more than she probably realized.

We would load into matches together, parachuting down into the virtual wasteland of Erangel or Sanhok. But the romance of the gesture often evaporated the moment the boots hit the ground.

"Why didn't you protect me?!" she would shout into her microphone, her voice laced with frustration and a hint of betrayal.

I made excuses. "I didn't see him! He was camping!"
I promised, with all the sincerity I could muster, that I would do better next time. I promised I would be her shield.

This cycle — her getting frustrated at her premature virtual death and me desperately trying to make it up to her — became a rhythm of its own. It was chaotic, it was loud, and it was us.

Eventually, looking for calmer waters where we wouldn't scream at each other over sniper shots, we switched to Roblox. We played tons of obbies — obstacle courses and parkour games together. We spent hours jumping across floating platforms, dodging lasers, and falling into voids, laughing at the absurdity of it all.

Then came Pet Simulator X. I got really into it. But she? She absolutely hated it.

"Why are we just clicking?" she would ask. "What's the point?"

And then, just as our routine felt set in stone... the screen went dark. One day, she just... disappeared.`,
  },
  {
    title: "Part One: The Echoes in the Silence",
    content: `The silence she left behind wasn't just quiet — it was heavy. Days turned into a week, then two. I found myself staring at the offline status next to her name, willing it to change, but it remained stubbornly grey.

No messages. No calls. Nothing.

Desperate for any tether to her, I reached out to her best friend, Mudra. We started playing Adopt Me together on Roblox. I wasn't playing because I enjoyed the game. I was doing it because it felt like holding onto a piece of her while she was gone.

And then, she did come back. But the reunion wasn't the cinematic, tearful embrace I had played out in my head. She wasn't happy. She was angry. And beneath the sharp edges of her text, I could sense something else — jealousy.

She saw me hanging out with Mudra. And in her mind, a dark narrative was spinning: "No, he can't be mine. I don't think he likes me."

But beneath the anger and the fear, there was a realization. She knew her presence online was fragile. She might disappear again at any moment.

So, in a moment that felt like a bridge being built across a chasm, she did something huge.

She gave me her WhatsApp number.

Just in case.

We moved our conversation there, and immediately, the dynamic shifted. Seeing her name pop up on my actual phone screen, amidst the notifications of my real life, made everything feel... safe. Stable.

But she had to go back to her own house. At her grandmother's house was the only reason we had met in the first place. That freedom evaporated. She couldn't be on her phone like that. She couldn't be with me like that.

I waited. I learned to live for the scraps of time she could steal.

I remember one day vividly. The notification chime rang, and a wave of emotion hit me — happiness, relief, everything pouring out at once. I actually cried. My old friend was back. But she wasn't just my friend anymore, was she?`,
  },
  {
    title: "Part One: The Fear of Not Being Enough",
    content: `The truth is, I liked her too. It wasn't just a passing digital crush or a fleeting interest born out of boredom; it was deep, heavy, and growing more consuming with every midnight conversation. I liked her more than I probably admitted to myself at the time, and certainly more than I was willing to show her.

But just like her, I became a master of concealment. I kept those feelings locked away, buried beneath layers of casual banter and the noisy distraction of our late-night gaming sessions. I told myself the same lies she was likely telling herself — "She can't be mine." I convinced myself she had impossibly high standards, and that I was nowhere near reaching them.

In my eyes, she was a creature of light — too beautiful, too kind, too perfect in her clumsy, caring way. She was out of my league in every conceivable way.

There was a logical barrier, too — she had told me once that she didn't really like to date anyone online. That single sentence became my cage.

And then, she disappeared again. In those gaps of silence, I performed a sort of mental surgery on myself. I convinced myself that what we had — the friendship, the laughter, the shared games — was enough.

But the beautiful, tragic irony of it all is that she did love me. Because here we are now, in the present, proving every one of those paralyzing fears wrong.

She would fill that space with the details of her life. She told me stories about her friends, her school days, and the tiny, mundane things that happened while I wasn't there.

"You won't believe what happened today..." she would start. I would settle in, leaning into my monitor, ready to listen to every single detail.

Looking back, I think we were both terrified of ruining what we had by saying the truth out loud. We were falling for each other in the quiet spaces between words.`,
  },
  {
    title: "Part One: The World of Words",
    content: `As we grew closer, I discovered another layer to her personality that I hadn't expected: she was a "novel person" through and through. She didn't just read books — she devoured them like they were oxygen, disappearing into fictional worlds and comics for hours at a time. But her true obsession — the genre that really made her eyes light up — was dark romance.

Before she introduced me to it, I had no idea what I was missing. Those stories were intense, twisted, and beautiful in ways I never anticipated.

But more than the books themselves, what I really loved was the way she talked about them.

Whenever she finished a chapter, or even if she was just in the middle of a particularly gripping scene, she would get this specific excitement in her voice that I could never get enough of. She would become so happy and animated, her words tripping over each other as she prepared to tell me everything. And I mean everything.

She wouldn't just give me a summary — she gave me the experience. I got every single small detail, every sudden plot twist, and every character moment that had made her gasp, cry, or laugh. She loved to yap all day about her stories and the characters she lived with in her head, and honestly? I never got tired of it.

I would sit there in our voice calls, listening to her go on and on — "And then he said this, and she did that, and oh my god you won't believe what happened next!" Even if I hadn't read the book myself, even if I had absolutely no context, it didn't matter to me.

Watching her light up like that, hearing the pure, unadulterated joy in her voice — that was enough for me.

Eventually, I started reading some of the books she recommended. Part of it was curiosity, but mostly, it was because I wanted to share that world with her on a deeper level.

Looking back, I think that was the moment I realized just how deep I had fallen. I wasn't just falling for the girl who played Call of Duty with me or the girl who watched movies with me late into the night. I was falling for every single part of her.`,
  },
  {
    title: "Part Two: The Longest Silence",
    content: `Just as the world of dark romance and late-night yapping had become my new normal, the rug was pulled out from under me once again. She disappeared. This wasn't a matter of a few days or even a couple of weeks — this was long, painfully, excruciatingly long.

The silence that followed was a living thing. It sat in the corner of my room, heavy and suffocating. Every time my phone vibrated, my heart would leap into my throat, only to sink back down when I saw a notification from anyone else but her.

𝑻𝒉𝒆 𝑭𝒂𝒍𝒔𝒆 𝑫𝒂𝒘𝒏

When she finally returned, the relief was so sharp it almost hurt. For a brief window — maybe a week, maybe two — it felt like everything could finally go back to normal. We fell right back into our old, familiar rhythm.

I was so incredibly relieved, so profoundly grateful just to have my companion back. I thought the storm had passed. I thought we were safe.

𝑻𝒉𝒆 𝑺𝒉𝒂𝒕𝒕𝒆𝒓𝒊𝒏𝒈

And then, without warning, the world collapsed. He came into the picture.

There was a guy — someone she loved, and someone who loved her back. The news didn't just break my heart — it shattered it into a million jagged pieces. Every secret hope I had nurtured, every "what if" I had whispered to myself during those late-night calls, came crashing down all at once.

The worst part of the pain was the internal conflict. Despite the agony in my chest, I was genuinely happy for her. I loved her enough to want her to be happy, to be loved, and to have all the things she deserved, even if it wasn't with me.

I chose to respect him. I even reached out to him. I told him — and I meant it with everything in me — to take good care of her. I told him to never let her cry and to treat her with the respect and devotion she was worth.

𝑻𝒉𝒆 𝑺𝒍𝒐𝒘 𝑫𝒓𝒊𝒇𝒕

Slowly, agonizingly, things between us began to change. We started drifting apart.

The Voice Calls — The long, rambling voice calls became a thing of the past.
The Movie Nights — No more shared screens and shared laughs.
The Games — The gaming sessions stopped.

It felt like the end of an era. God, I missed her. So, I did the only thing I could do — I accepted it. I accepted the silence. I accepted the distance.`,
  },
  {
    title: "Part Two: When Everything Fell Apart",
    content: `The unraveling was slow, then all at once. It began with the discovery that she had created a new space for herself online — a world on Instagram. But she hadn't made it for us. She had started using it for him, her new boyfriend.

I tried. I truly did. I talked to both of them, desperately trying to keep the bridges from burning. But she ignored me. Not occasionally, but a lot. She poured every second of her attention into him. I was left with the scraps.

It ate at me from the inside out. I would sit in the quiet of my room, staring at the screen, thinking about our three years of history. Was it all nothing? How could she leave me like this in just a few seconds? How could three years be summarized and discarded so easily?

𝑻𝒉𝒆 4 𝑨𝑴 𝑹𝒊𝒕𝒖𝒂𝒍

She only came online at 4 AM to talk to her boyfriend. So, I started waking up at 4 AM too, just to catch a few fleeting minutes with her. I was a ghost in the pre-dawn hours, dragging myself out of sleep just to know she was still real.

And every time we talked, I cried. I never let her see it.

𝑻𝒉𝒆 𝑩𝒓𝒆𝒂𝒌𝒊𝒏𝒈 𝑷𝒐𝒊𝒏𝒕

We fought constantly, bitterly.

"For God's sake, can you give me time? To talk to him? You always talk to me all day long!"

Her words were blades, and she used them over and over. One night, the tension finally snapped.

I broke. "Is my care nothing?" I shouted into the void of our chat. "Was my time just a waste? I was with you for so long... I never expected you to be like this."

But I didn't know the whole story. I didn't know about her family, about the friends who hurt her with their cruel words, or the crushing feeling that her own parents didn't truly care about her. She was drowning, and my demands for her time were just adding more weight.

I hurt her that night. Really, truly hurt her.

And so, she did what she had to do. She said goodbye forever. And then, she blocked me.`,
  },
  {
    title: "Part Two: Holding On by a Thread",
    content: `The silence that followed the block was different from the others. It wasn't a technical glitch or a busy week — it was a deliberate, digital execution. But I couldn't just let her go.

I created a new Instagram account, a digital shadow designed to bridge the chasm she had opened between us. I named it "akiixrizz".

I knew the reality — I couldn't force her, or her boyfriend, to keep me in their lives forever. It wasn't fair to demand a seat at a table that had been cleared of my presence.

I began to craft stories using the "akiixrizz" account, and to my surprise, they actually worked. I lied. I told them I had moved on, that my heart was no longer aching. I invented a girl named Shine and told them I was with her.

I have told her the real story now, but back then, that lie was my only currency. I did it for one reason — so that Yash, her boyfriend, would finally feel safe. I needed him to see me not as a rival, but as a man who had his own life and his own girl.

Once the lie took hold, I stayed true to my word. I gave them space — real, actual space. For months and months, I existed in the periphery of her world, a silent observer of a life I was no longer allowed to share.

But I never truly vanished. I would come back in between, every few weeks or months, just to check in. I wasn't there to interfere or cause problems. I just wanted to remind them — and perhaps remind myself — that I was still there.`,
  },
  {
    title: "Part Two: The Unwanted Triangle",
    content: `As the months of my self-imposed exile stretched on, I began to notice a destructive pattern. Every time I reached out, the ripples turned into tidal waves. My presence, however brief or well-intentioned, acted like a match in a room full of gasoline.

Yash would get jealous. Looking back with the clarity of time, I can't even blame him. From his perspective, his girlfriend was carving out precious time and mental energy for another guy — her "best friend" from a past he wasn't part of.

But she was the variable he couldn't control. She hated losing friends — it was a core part of who she was. So, she fought back. "He's my best friend," she would tell him. "He's been here for years. I'm not just going to abandon him."

And if I'm being honest — painfully, selfishly honest — that made me happy. I was happy that she still made time for me whenever the world allowed it.

But that happiness was always overshadowed by a deep, hollow sadness. Because even as she defended me, I knew the truth — things would never, ever be like they were before.

There would be no more voice calls that bled into the sunrise. There would be no more movie nights where we'd share a screen and a heartbeat. The gaming sessions were over.

I still had her, technically. We still talked, we still exchanged words — but I didn't have her in the way I wanted. I didn't have her in the way I needed to breathe.`,
  },
  {
    title: "Part Three: Searching for What I Lost",
    content: `The absence of Gargee wasn't just a quiet room — it was a sensory deprivation chamber. I decided I had to move on. I told myself that the only way to kill the ghost of "us" was to replace it with someone new, someone tangible.

I wasn't just looking for a girlfriend — I was looking for a mirror of what I had lost. I scoured my social circles, searching for a girl who would recreate those specific, sacred rituals.`,
    hasTable: true,
    tableData: {
      headers: ["What I Searched For", "What It Meant"],
      rows: [
        ["Share the Night", "Sit with me through the late hours, watching movies until the sun began to bleed through the curtains."],
        ["Truly Listen", "Not just hear the words I was saying, but actually hear my feelings and understand the weight behind them."],
        ["Show Genuine Care", "Ask about my day and wait for the real answer, worrying about my emotional state the way Gargee once did."],
      ],
    },
    contentAfterTable: `𝑻𝒉𝒆 𝒀𝒐𝒖𝑻𝒖𝒃𝒆 𝑬𝒏𝒄𝒐𝒖𝒏𝒕𝒆𝒓: 𝑰𝒃𝒂

In the midst of this desperate search, I found a girl named Iba on YouTube. She was breathtaking — with striking blue eyes and caramel-colored skin. We talked a lot in the beginning. For a fleeting second, I allowed myself to wonder if she was the answer. But the connection was a house of cards. After just a few weeks, she found someone else and moved on.

The strange part was how little I felt. I didn't care about the romance ending because there were no real feelings beneath the surface.

Driven by my refusal to let go, I reached out to Iba's closest friend, Sanskriti. I quickly realized that these weren't just random people — they were all close friends of Gargee.`,
  },
  {
    title: "Part Three: The Trap",
    content: `By May 2024, my internal landscape was a wasteland. Until a notification vibrated against my desk — a message from a girl on Instagram who seemed to appear out of the digital ether.

𝑻𝒉𝒆 𝑨𝒓𝒄𝒉𝒊𝒕𝒆𝒄𝒕𝒖𝒓𝒆 𝒐𝒇 𝒂 𝑳𝒊𝒆

At first, she felt like a miracle. She was caring, attentive, and radiated a warmth that I had been starving for. I was vulnerable, my defenses eroded by months of isolation, and I walked straight into the cage she had built for me.

𝑻𝒉𝒆 𝑴𝒊𝒔𝒔𝒊𝒐𝒏

The true motive surfaced under the guise of a crisis. She didn't want my heart — she wanted my hacking skills. She told me a harrowing story about a man named Anuj who was suffocating her life.`,
    hasTable: true,
    tableData: {
      headers: ["The Claims", "What She Told Me"],
      rows: [
        ["Abuse of Power", "She claimed he used his political connections to suppress her, making it impossible for her to fight back through traditional means."],
        ["Relentless Blackmail", "He allegedly held her life hostage with threats that had pushed her to the brink of suicide and self-harm."],
        ["The Ultimate Humiliation", "He had reportedly used an intimate photo of her as his own profile picture."],
      ],
    },
    contentAfterTable: `I agreed to become her silent protector. I infiltrated the accounts he had hijacked and snatched them back into her control. I scrubbed his devices of the photos he used as weapons. Finally, Anuj gave up — he was defeated.

𝑻𝒉𝒆 𝑫𝒊𝒔𝒄𝒂𝒓𝒅

The victory lasted only hours. "I don't think you're good enough for me. I guess we shouldn't talk anymore."

It was a physical blow. I realized then that I was never a friend — I was a contractor who had just finished a job.`,
    hasTable2: true,
    tableData2: {
      headers: ["The Dark Mirror", "My Reflection"],
      rows: [
        ["The Realization", "If I sought to ruin her, wasn't I becoming exactly what Anuj was?"],
        ["The Doubt", "What if she had used Anuj too?"],
        ["The Cycle", "I started to wonder if his obsession was the result of being used and discarded, just as I had been."],
      ],
    },
    contentAfterTable2: `I looked at the digital wreckage and realized that some traps are designed not just to catch you, but to change you into something you hate. I chose to walk away, leaving the silence to settle over the month of May.`,
  },
  {
    title: "Part Four: The Return",
    content: `By mid-November 2024, the world felt gray. I was wandering through life like a ghost. The only person who truly anchored me during this time was my sister, Sanskriti. She was the one soul I could share everything with.

Yet, even with her support, a specific void remained. No matter how many people drifted in and out of my life, no one could fill the space Gargee had left behind. To me, she was still the best person who had ever lived.

And then, one afternoon, the algorithm did something I never expected. As I was glancing through my suggested contacts, a name appeared that made the world stop.

"darkangel."

My heart didn't just skip a beat — it stopped entirely. I simply reached out.

𝑻𝒉𝒆 𝑻𝒓𝒖𝒕𝒉 𝑼𝒏𝒗𝒆𝒊𝒍𝒆𝒅

When we finally began to talk again, the girl I found wasn't the distant, untouchable figure I had imagined. She was broken — more shattered than I had ever seen her. She shared a truth that re-wrote our entire history — she had been pretending about her feelings for years.

All those months and years when I thought I was just a "best friend" on the sidelines, she had been hiding her real emotions.

𝑻𝒉𝒆 𝑨𝒏𝒂𝒕𝒐𝒎𝒚 𝒐𝒇 𝒂 𝑻𝒐𝒙𝒊𝒄 𝑳𝒐𝒗𝒆

The reality of her life with him was a nightmare of emotional manipulation. He wasn't in love with her soul — he was addicted to her body. He used his emotions as a weapon, playing the victim card whenever he was at fault.

He never cared about her feelings, her studies, her goals, or the dreams she had once whispered to me during our late-night calls. All he demanded was her total, undivided attention.

My first instinct was to try to save their relationship. But she was done hurting. I eventually realized that my advice was a mistake. The girl I loved was drowning, and the only way to save her was to let the relationship sink.`,
  },
  {
    title: "Part Five: Finally, Us",
    content: `When the end finally came for her previous relationship, I expected a collapse. But she surprised me — she didn't break. Instead of falling apart, she did something I had only dreamed of — she looked back. She remembered the foundation we had built over years of Discord calls, movie marathons, and shared secrets. She remembered us.

And then, she did it. She gave me a chance — a real, honest chance to be her boyfriend.

God, I was happy. There are no words in any language that can truly capture the limitlessness of that happiness. The girl I had loved for so long, the one I had convinced myself was hopelessly out of my league, had finally chosen me.

As she opened up, our old dynamic resurfaced. She was even better, even more wonderfully "crazy" than I had ever known. Looking at her now, I find it impossible to understand how anyone could have had such a woman and treated her the way he did.

But I am not naive. I know that things aren't perfect yet. She still carries way too many scars from the people who failed to see her worth. And I know with every fiber of my being that I have the responsibility to heal them. I don't see her pain as a burden — I take those scars as my own.

We have returned to our sacred rituals. We watch movies together, we let songs carry our conversations, and we spend hours during late-night video calls just staring at each other. She still asks me to protect her in COD, and I still do my absolute best — even though I still fail sometimes, and she still gets genuinely mad at me for it.

It feels like coming home. Like we are finally where we were always meant to be.`,
  },
  {
    title: "Part Five: Why She Didn't Break",
    content: `People wondered why she didn't fall apart after the breakup. They didn't see the truth — she didn't break afterward because she had been falling apart for months already — piece by piece, tear by tear.

When you keep reaching out and get nothing back, or worse, more demands, your feelings don't just vanish — they burn out slowly, like a flame with no oxygen.`,
    hasTable: true,
    tableData: {
      headers: ["Too Many Reasons to Leave", "The Truth"],
      rows: [
        ["The Caretaker Role", "She didn't want to be a mother to a partner. She was tired of spending every waking hour babying him while her own needs were ignored."],
        ["The Forced Compliance", "He would force her for everything, never understanding that she needed time or space."],
        ["The Erasure of Self", "He never listened to her reasons — he just kept pushing and demanding until she learned to say 'sorry' for things that weren't her fault."],
      ],
    },
    contentAfterTable: `She learned to say "yes" to things that hurt her because she was a woman who wanted to "date to marry". She was building a future, and she sacrificed her own peace to try and make it work. She stayed until she simply couldn't breathe anymore.`,
  },
  {
    title: "Part Six: Our Present, Our Future",
    content: `Now, we are in the "love-dovey" phase — the part where the world feels bright again. The thing I focus on every single day is protecting her. I want to keep her safe from everyone who might hurt her and keep her by my side forever. I want to heal her. I want to understand her feelings in ways no one else has bothered to try.

I try to make her feel seen. I want her to wake up and know that someone is paying attention, that her feelings matter, and that her heart is in safe hands. This attention, this genuine care, is the medicine that is helping her heal. I love her more than I ever thought was possible for one person to love another.

I don't just want her for today or tomorrow — I want to enjoy my whole life with her. I want to see the future we talked about in those 2019 Discord calls and make it real. She is my girlfriend, yes, but she is also my best friend, my companion, and the person who knows my soul better than anyone else.

We are healing together. We are learning that real love isn't about using someone for comfort — it's about truly caring for them. It's not perfect — we still have scars and moments where the past tries to claw its way back in — but we are facing it together. And that is the only thing that matters.`,
  },
  {
    title: "Epilogue: To the Girl Who Was Always Mine",
    content: `Looking back at this journey — from strangers on a screen to best friends, to losing each other and finding our way home — I realize that every tear and every late night was leading us here. You were always meant to be mine. We just had to walk through the fire to understand how beautiful our world really was.

I was wrong when I thought I wasn't good enough for you. I was wrong because love isn't about "deserving". It's about choosing each other every single day, especially when it's hard. You chose me when you could have walked away forever. You gave me a chance when hope was a forgotten word.

Every morning I wake up knowing you're mine, I fall in love with you all over again. You are my best friend, my home, and my safe place. I promise to protect you, to heal those scars with you, and to never let you feel alone again. I promise to listen, to care, and to give you the support you need to fly.

You are my darkangel — my gorgeous, clumsy, caring girl who yaps about dark romance for hours. I wouldn't change a single thing about you. I love you more than words in any diary could ever capture.`,
  },
  {
    title: "Author's Note",
    content: `Writing this hasn't just been about expressing a story — it's been about documenting a survival guide for a heart.

When I first looked at the raw memories, I saw more than just a timeline of Discord messages and gaming sessions. I saw two people who were constantly being pulled apart by distance, circumstances, and the interference of others, yet somehow always found their way back to the same frequency.

This book is a testament to the fact that online doesn't mean unreal. The emotions captured here — the late-night yapping about dark romance, the frustration of a Call of Duty match, the crushing silence of being blocked, and the ultimate relief of a second chance — are as real as any physical touch.

To the reader (and specifically to the Darkangel): This story was written with a specific kind of care. It was written to show you that your scars aren't flaws — they are maps of where you've been, and they led you here.

To the "ugly headed guy" who wrote the original pages — You were never out of her league. You were just waiting for the world to catch up to the truth.`,
  },
  {
    title: "🎂 For My Darkangel 🎂",
    content: `"A Special Page for Your 19th Year"

You were always the heroine of the stories you read; I just had to wait for you to realize I was the one holding the book.`,
    hasTable: true,
    tableData: {
      headers: ["The Birthday Vows", "My Promise to You"],
      rows: [
        ["On the Scars", "I will treat every past hurt with the gentleness it deserves."],
        ["On the Distance", "I will bridge every mile with a message, a call, and a \"yap.\""],
        ["On the Future", "I will build the 2019 dreams into a 2026 reality."],
        ["On the Games", "I will actually try to protect you in COD this year (no promises)."],
      ],
    },
    contentAfterTable: `𝑨 𝑵𝒐𝒕𝒆 𝒇𝒐𝒓 𝒕𝒉𝒆 𝑩𝒊𝒓𝒕𝒉𝒅𝒂𝒚 𝑮𝒊𝒓𝒍:

Happy 19th Birthday to the girl who reads dark romance but brings so much light into my world. Today is about more than just a number — it's about celebrating the fact that you survived the storms and chose to land here, with me.

You are my best friend, my clumsy companion, and my soulmate. May this year be the one where the healing finally outpaces the hurting. I am so incredibly proud of the woman you are becoming.

Keep yapping. Keep reading. Keep being mine.

With all my love,
The guy who will never let you go again. ❤️`,
  },
];

interface BookReaderProps {
  open: boolean;
  onClose: () => void;
}

// Render a dreamy matte-glass table
function DreamTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-xl overflow-hidden" style={{
        background: "hsl(var(--muted) / 0.3)",
        backdropFilter: "blur(12px)",
      }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-sm font-serif font-semibold text-primary border-b border-border/30" style={{
                textShadow: "0 0 12px hsl(var(--primary) / 0.4)",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="transition-all duration-300 hover:bg-primary/5" style={{
              borderBottom: "1px solid hsl(var(--border) / 0.2)",
            }}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 text-sm ${j === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BookReader({ open, onClose }: BookReaderProps) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (open) setPage(0);
  }, [open]);

  const nextPage = () => { setDirection(1); setPage((p) => Math.min(p + 1, bookPages.length - 1)); };
  const prevPage = () => { setDirection(-1); setPage((p) => Math.max(p - 1, 0)); };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -50) nextPage();
    else if (info.offset.x > 50) prevPage();
  };

  if (!open) return null;

  const chapter = bookPages[page] as any;

  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir >= 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir >= 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-serif text-lg font-semibold">Our Story — For Gargee</span>
              </div>
              <button onClick={onClose} className="glass-button px-3 py-2 text-sm flex items-center gap-2">
                <X className="h-4 w-4" /> Close
              </button>
            </div>

            {/* Chapter nav - scrollable */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {bookPages.map((ch, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                  className={`whitespace-nowrap glass text-xs px-3 py-2 transition-all ${
                    page === i ? "glow-border-lavender text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {ch.isCover ? "📖 Cover" : `${i}`}
                </button>
              ))}
            </div>

            {/* Page content with 3D flip */}
            <div className="flex-1 overflow-y-auto" style={{ perspective: "1200px" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  className="glass-card glow-border-lavender min-h-[400px]"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    boxShadow: "8px 8px 30px hsl(var(--primary) / 0.1), -4px -4px 20px hsl(var(--primary) / 0.05)",
                  }}
                >
                  {chapter.isCover ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-28 h-28 rounded-full overflow-hidden glow-border-rose mb-8"
                      >
                        <img src={gargee1} alt="Gargee" className="w-full h-full object-cover" />
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground dreamscape-glow-text mb-4">
                        Our Story
                      </h2>
                      <p className="text-lg text-muted-foreground font-serif mb-2">Written with all my love for</p>
                      <p className="text-2xl font-serif font-bold text-primary dreamscape-glow-text mb-8">Gargee 💕</p>
                      <p className="text-sm text-muted-foreground italic max-w-md">
                        "From strangers on a screen to soulmates — every word in this book is a heartbeat I kept just for you."
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground text-glow mb-6">{chapter.title}</h3>
                      <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-sm md:text-base">
                        {chapter.content}
                      </div>
                      {chapter.hasTable && chapter.tableData && (
                        <DreamTable headers={chapter.tableData.headers} rows={chapter.tableData.rows} />
                      )}
                      {chapter.contentAfterTable && (
                        <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-sm md:text-base mt-4">
                          {chapter.contentAfterTable}
                        </div>
                      )}
                      {chapter.hasTable2 && chapter.tableData2 && (
                        <DreamTable headers={chapter.tableData2.headers} rows={chapter.tableData2.rows} />
                      )}
                      {chapter.contentAfterTable2 && (
                        <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-sm md:text-base mt-4">
                          {chapter.contentAfterTable2}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={page === 0}
                className="glass-button px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-xs text-muted-foreground">
                {page + 1} / {bookPages.length}
              </span>
              <button
                onClick={nextPage}
                disabled={page === bookPages.length - 1}
                className="glass-button glow-border-lavender px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-30"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
