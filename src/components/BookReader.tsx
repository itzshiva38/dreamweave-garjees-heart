import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen, Heart } from "lucide-react";
import gargee1 from "@/assets/gallery/gargee-1.jpg";

// ─── Lumina chapter messages ───
const LUMINA_MESSAGES = [
  "Another beautiful memory unfolds… 💕",
  "Gargee's light shines here ✨",
  "Every word whispers love… 🌙",
  "This chapter is written in starlight 🌟",
  "The dream deepens… 💫",
  "Two hearts, one story… 💖",
  "Keep reading, beautiful soul ✨",
  "Love never fades from these pages 🦋",
];

// ─── Floating particle component ───
function BookParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: ["✨", "💕", "🌙", "⭐", "💫", "🦋"][i % 6],
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 8,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute opacity-20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Book content from somethingnew.txt ───
const bookPages = [
  {
    title: "Cover",
    content: "",
    isCover: true,
  },
  {
    title: "Part One: Strangers on a Screen",
    content: `The story begins in 2019. It feels like a lifetime ago now, doesn't it? The world was different then, and I was different, too. It started in a place that feels almost too ordinary for how much it would eventually shatter and rebuild my entire existence Discord.
    
For most people, it was just an app a place to chat while gaming, a collection of servers and notifications. But for me, it became the doorway to everything.
I met a girl there.

To this day, I can't quite recall the exact timestamp. I don't remember the specific server channel or the precise moment our paths crossed in the digital void. The memory is like a watercolor painting left out in the rain the edges are blurred, the specific lines washed away but the color remains. I know the where and I know the when, and sometimes, in the grand scheme of fate, that has to be enough.

Her profile was the first thing I noticed. She was cute no, beautiful. Gorgeous, even. But it wasn't just the static image that drew me in. It was the way she typed, the way she carried herself in the text channels. She was loving, caring, and possessed this endearing clumsiness that made her feel incredibly real. In a space filled with trolls and anonymous masks, she felt human. She felt tangible, not like some distant, perfect persona curated behind a screen.

We started the way everyone does in the digital age. It was a dance we both knew the steps to strangers trading the basics, testing the waters to see if it was safe to swim.

"What's your name?"
"How old are you?"

I remember typing the answers, the mechanical rhythm of the keys under my fingers.

"Where are you from?" she asked.
"Tell me about your family," I replied.
These questions felt like a script we were both reading from, the kind of first conversation that happens a million times a day across the internet. It was the standard protocol of online interaction establish identity, establish location, establish safety. It should have been nothing special. It should have been forgettable, just another chat log buried under thousands of others.

Except... it was special.

It wasn't a slow burn. It was a freefall. Within just a few days, I found myself falling in love with her.

I know how that sounds to anyone looking in from the outside. It sounds fast. It sounds reckless, maybe even a little desperate. How can you fall for pixels? they might ask. How can you love someone you haven't touched?

But they weren't there. They didn't feel the way the air shifted when she replied. There was something about the way she listened she didn't just wait for her turn to type she really listened. She absorbed my words. She was the kind of person I'd never expected to find in the real world, let alone stumble upon in a random discord server amidst the noise and the chaos.

The conversations that started as polite small talk the weather, school, the mundane details of life slowly metamorphosed. They became the anchor of my existence, the best part of my day. I found myself rushing through my daily routine, checking the time, just waiting for the moment I could sit down at my computer and see her status turn green.

We started exploring our shared interests. We discovered we both liked anime and movies or at least, that's what I told her.

The truth was a little more complicated. I didn't really care about anime at the time. It was just cartoons to me, something casual. And movies? Movies were fine, a decent way to kill two hours, but I wasn't obsessed. I didn't live for cinema.

She, on the other hand, was a different breed entirely. She was a "K-drama girl" through and through. She lived in those worlds of high romance, dramatic pauses, and tear jerking plot twists. I had absolutely no interest in that world. To me, it looked like subtitles and melodrama.

But she had this power. She did this thing where our normal chats would stretch like taffy, pulling longer and longer until the sun went down and the moon took its place. And those late nights turned into movie nights, into anime marathons. It became just us, together in the glow of our screens, isolated from the rest of the world, watching whatever came up.

I remember those nights vividly. The room would be dark, lit only by the monitor. She would be excited, typing in all caps about a scene, and I...

Well, sometimes she'd put on a K-drama, and I'd sit there, bored out of my mind. I'd be scrolling on my phone, not even looking at the screen half the time, barely paying attention to the handsome lead actor crying in the rain.

"Are you watching? It's getting good!" she would message.

And I would lie.

"Yeah, this is good! I'm really enjoying it!" I'd type back, forcing enthusiasm into every keystroke.

I didn't lie to trick her. I lied because I didn't want to disappoint her. I lied because seeing her happy, even over something I found boring, made me happy. I didn't want those nights to end. I wanted to protect the bubble we were in.
And then, a shift occurred.

I don't know when it happened exactly. I can't pinpoint the specific episode or the specific series where the boredom turned into genuine interest, but somehow, I got hooked.

K-dramas became my thing, too.

I started watching them on my own, when she wasn't even online. I found myself getting genuinely invested in the characters, crying at the sad parts, cheering for the couples. It was all thanks to her. She had opened a door I never would have opened myself.

She became my guide. She introduced me to so many anime that would become staples of my life Demon Slayer with its breathtaking animation, the brutal world of Attack on Titan, and her all-time favorite Spy x Family.

I watched a lot of them. I got caught up in the stories, the lore, the characters. For a while, I was as obsessed as she was.

Though I'll admit, looking back from where I stand now, I haven't kept up with the recent seasons. Life got in the way, as it always does. Or maybe I just got lazy. The passion for the shows faded, but the memory of watching them with her never did.

Those nights? Those early nights when everything was new and exciting? When a notification sound was enough to make my heart race? I'll never forget them. They were the foundation. They were the beginning of the "us" I didn't even know I was building.
`,
  },
  {
    title: "Part One: When Everything Deepened",
    content: `Those movie nights, as cherished as they were, eventually evolved. Passive consumption wasn't enough anymore we wanted to do something together. We needed a new way to bridge the hundreds of miles between us, something more interactive than just listening to each other breathe over a voice call while a movie played.
    
So, naturally, we started gaming together.  

And let me tell you, if our movie tastes were different with my indifference battling her K-drama obsession our gaming styles were practically from different planets. We were opposites in every conceivable way.  

She was a Call of Duty girl through and through. She thrived on the chaos. She was all about that fast paced action, the run and gun, the instant respawns, and the adrenaline of the kill cam. She wanted speed. She wanted instant gratification.

Me? I was cut from a different cloth.

I was loyal to PUBG.  

You have to understand the era this was before BGMI was even a thing. This was back when the game felt rawer, more tactical, and less about flashy skins. I preferred the slow burn of a battle royale, the tension of holding a position in the grass for twenty minutes, the strategy over the spray and pray.  

She had never played it before. It wasn't her style it wasn't her world. But she did something that still makes me smile when I think about it she tried it for me.

For me.  

She downloaded the massive file, set up her account, and stepped into my world. That small gesture meant more than she probably realized. It was her stepping out of her comfort zone just to stand in mine.

We would load into matches together, parachuting down into the virtual wasteland of Erangel or Sanhok. But the romance of the gesture often evaporated the moment the boots hit the ground.

Because the game was unforgiving, and she was new to the mechanics, she would often die early in the match.  

The silence on the voice channel would be shattered by her genuine, fiery anger.

"Why didn't you protect me?!" she would shout into her microphone, her voice laced with frustration and a hint of betrayal.  

I would scramble to explain, my fingers still mashing keys as I tried to survive the ambush that had just killed her. I stumbled over my words, trying to outline the mechanics of the game, the positioning, the bad luck of the drop.
I made excuses. "I didn't see him! He was camping!"

I promised, with all the sincerity I could muster, that I would do better next time. I promised I would be her shield.  

This cycle her getting frustrated at her premature virtual death and me desperately trying to make it up to her became a rhythm of its own. It was chaotic, it was loud, and it was us.

Strangely enough, that dynamic hasn't really disappeared. It still happens now, just in different ways. The arguments might change, the context might shift, but the core remains her expecting me to be her protector, and me trying my hardest to live up to that impossible standard.  

Eventually, looking for calmer waters where we wouldn't scream at each other over sniper shots, we switched to Roblox.

It was a jarring shift in tone, going from the gritty realism of battle royales to the blocky, colorful world of usergenerated content. But it worked.

We played tons of obbies obstacle courses and parkour games together. We spent hours jumping across floating platforms, dodging lasers, and falling into voids, laughing at the absurdity of it all. It was simpler. Lighter.  

Then came Pet Simulator X.

I got really into it. There was something about the collection aspect, the progression, the grind of hatching rare pets that hooked me. I could spend hours just managing my inventory.

But she? She absolutely hated it.  

To her, it was the definition of monotony. She called it boring, pointless, and not fun at all.

"Why are we just clicking?" she would ask. "What's the point?"

I would try to convince her, explaining the rarity of the pets I was hatching or the satisfaction of the grind, but she wouldn't budge. She was stubborn like that. She knew what she liked, and she certainly knew what she didn't.  

And then, just as our routine felt set in stone, just as I thought I had figured out the rhythm of our days... the screen went dark.

One day, she just... disappeared.  

There was no warning. No "goodbye for now." Just silence.

Days passed, bleeding into one another. Then weeks.

I checked my phone constantly, waiting for a notification that never came. No messages, no calls, nothing.

The digital silence was deafening. It wasn't just that she was gone it was the abruptness of it. One day we were laughing over a failed parkour jump, and the next, I was staring at a grey "Offline" status that refused to turn green.
`,
  },
  {
    title: "Part One: The Echoes in the Silence",
    content: `The silence she left behind wasn't just quiet it was heavy.
    
Days turned into a week, then two. I found myself staring at the offline status next to her name, willing it to change, but it remained stubbornly grey .

No messages. No calls. Nothing .

It was as if she had simply ceased to exist, evaporating into the digital ether from which she came.

I didn't know what to do with myself. The hours we used to spend together now stretched out before me, empty and suffocating.

Desperate for any tether to her, any reminder that she was real and that I hadn't imagined the last few months, I did the only thing I could think of: I reached out to her best friend, Mudra .

It was a strange dynamic. I wasn't friends with Mudra not really.

 I was friends with her friend. But Mudra was the closest link I had.
 
We started playing Adopt Me together on Roblox .

I was a guy who liked tactical shooters and battle royales, yet there I was, running through the pastel-colored world of a pet simulation game, navigating the same obbies and parkour courses that my girl had shown me just weeks before .

We would sit in Discord voice calls for hours, the game running in the background, the cheerful music looping endlessly while we just talked .

But it wasn't the same.

I wasn't playing because I enjoyed the game. I wasn't talking because I wanted to bond with Mudra.

I was doing it because it felt like holding onto a piece of her while she was gone . Every jump in the game, every familiar map, every mention of her name in conversation was a crumb I starved for. It was a way to keep her seat warm until she came back.

If she came back.

And then, she did.

But the reunion wasn't the cinematic, tearful embrace I had played out in my head.

When she finally logged back in, the air between us didn't feel relieved. It felt cold.
She wasn't happy.

She was angry. And beneath the sharp edges of her text, I could sense something else jealousy .

I could feel it vibrating through the screen, radiating off her words like heat . She didn't say it explicitly she was too proud, too guarded for that but the subtext was screaming.

She saw me hanging out with Mudra. She saw the time I had spent in that proxy friendship.

And in her mind, a dark narrative was spinning: "No, he can't be mine. I don't think he likes me." .

She was convincing herself that I had moved on, or that I preferred her friend. She kept her true feelings buried deep, terrified that if she admitted them if she said, "I missed you, and I hate that you were with her" she would lose me as a friend .

She had already lost too many people she cared about in her life . She couldn't risk adding me to that graveyard of relationships. So she put up walls. She couldn't risk it .

But beneath the anger and the fear, there was a realization. She knew the truth of her situation her presence online was fragile. She might disappear again at any moment . Her time on Discord was never guaranteed it was subject to the whims of her internet connection, her parents, her circumstances.

So, in a moment that felt like a bridge being built across a chasm, she did something huge.

She gave me her WhatsApp number .
Just in case.

It was a safety line. A way for me to reach her whenever I wanted, wherever she ended up, regardless of whether Discord was an option .

We moved our conversation there, and immediately, the dynamic shifted.

We talked for days on this new platform. Seeing her name pop up on my actual phone screen, amidst the notifications of my real life, made everything feel... safe . Stable .

It felt like we had found a loophole in the universe, a way to stay connected no matter what obstacles were thrown at us .

But every good thing has an expiration date.

I finally learned the reason for our golden era, for those long nights of freedom.

She had been staying at her grandmother's house .

That was the only reason we had met in the first place. That was the only reason she could talk to me for hours, the only reason we could watch movies until 3 AM, the only reason she could play games with me late into the night . Her grandmother's house was a sanctuary of freedom.

But she had to go back.

At her own house, with her parents around? That freedom evaporated. It just wasn't possible .

She couldn't be on her phone like that. She couldn't be with me like that .
The walls were closing in again.

I waited. I learned to live for the scraps of time she could steal.

I remember one day vividly. The notification chime rang, and a wave of emotion hit me happiness, relief, everything pouring out at once .

I actually cried. My old friend was back. But she wasn't just my friend anymore, was she? .

By this point, the denial was wearing thin. My feelings for her had grown stronger, deeper, impossible to ignore .

There is one specific moment from that time that I remember so clearly it makes me laugh now, though at the time, my heart stopped.

We were on a call a rare, precious voice call. Suddenly, her phone buzzed.

Her mom was calling her .

Panic surged through me. What if she gets caught? What if they see my name?

But like an idiot, in a split second of panic and fascination, I took a screenshot of her calling screen .

I captured the moment. I had her mom's number just sitting right there on my phone . It was an invasion of privacy, a mistake, a slip up.

I expected her to freak out. I expected her to yell, to tell me to delete it immediately.

But she didn't. She wasn't worried .
She didn't even tell me to delete it. She just said, in a voice that was terrifyingly calm, "Don't message or call her."

That was it.

No panic. No fear.
She trusted me .

She was comfortable with me in a way that made my chest ache. She knew, without a shadow of a doubt, that I would never use that information to hurt her.

And she was right. I would never, ever betray that trust .
`,
  },
  {
    title: "Part One: The Fear of Not Being Enough",
    content: `The truth is, I liked her too. It wasn't just a passing digital crush or a fleeting interest born out of boredom; it was deep, heavy, and growing more consuming with every midnight conversation. I liked her more than I probably admitted to myself at the time, and certainly more than I was willing to show her.  
    
But just like her, I became a master of concealment. I kept those feelings locked away, buried beneath a layers of casual banter and the noisy distraction of our late-night gaming sessions. I built a wall of "just friends" so high that I started to believe I was safe behind it. I told myself the same lies she was likely telling herself She can't be mine. I convinced myself she had impossibly high standards, and that I was nowhere near reaching them.  

In my eyes, she was a creature of light too beautiful, too kind, too perfect in her clumsy, caring way. She was out of my league in every conceivable way. When I looked at the guy on the other side of the screen, I didn't see a hero I saw just some ugly headed guy who was deluding himself into thinking someone like her could ever love someone like me.  
There was a logical barrier, too, a cold fact that I used to extinguish any spark of hope whenever it flared up she had told me once that she didn't really like to date anyone online. That single sentence became my cage. I lost hope, took my feelings, and shoved them back into the dark.  

And then, she disappeared again. Yes, once again, the silence returned like a recurring nightmare. In those gaps of silence, I performed a sort of mental surgery on myself. I convinced myself that what we had the friendship, the laughter, the shared games was enough. I told myself that hearing her voice and making her laugh was all I deserved, and all I could ever hope for.  

But the beautiful, tragic irony of it all is that she did love me. Because here we are now, in the present, proving every one of those paralyzing fears wrong. Back then, though, we were just two people dancing around the truth, existing in that comfortable, fragile space between friendship and something more.
  
She would fill that space with the details of her life. She told me stories about her friends, her school days, and the tiny, mundane things that happened while I wasn't there.

"You won't believe what happened today..." she would start. I would settle in, leaning into my monitor, ready to listen to every single detail.  

I listened to her recount how someone annoyed her in class, the way she tried a new recipe that turned out absolutely terrible, and the moments when she saw something that reminded her of a show we had watched together. I loved those moments. Not because the stories were always dramatic or exciting, but because she chose to share them with me. Out of everyone in her physical world, she came to me.  

I shared my world, too my own messy, ordinary life. We talked about random things that didn't matter to the rest of the world but somehow mattered to us. These were conversations that didn't really have a destination; they just went everywhere, building a foundation of intimacy with each passing night. Looking back, I think we were both terrified of ruining what we had by saying the truth out loud. We were falling for each other in the quiet spaces between words, in the comfort of being together even when we were miles apart. Neither of us knew it yet, but we were already each other's. We just needed time to realize it. 
`,
  },
  {
    title: "Part One: The World of Words",
    content: `The World of Words
As we grew closer, I discovered another layer to her personality that I hadn't expected: she was a "novel person" through and through. She didn't just read books she devoured them like they were oxygen, disappearing into fictional worlds and comics for hours at a time. But her true obsession the genre that really made her eyes light up was dark romance.  

Before she introduced me to it, I had no idea what I was missing. If I'm being honest, I probably would have rolled my eyes at the concept before I met her, but hell yeah, I grew to love dark romance because of her. Those stories were intense, twisted, and beautiful in ways I never anticipated. They had a certain edge to them, a complexity that felt grounded and cool despite their dramatic nature.  

But more than the books themselves, what I really loved was the way she talked about them.  

Whenever she finished a chapter, or even if she was just in the middle of a particularly gripping scene, she would get this specific excitement in her voice that I could never get enough of. She would become so happy and animated, her words tripping over each other as she prepared to tell me everything. And I mean everything.  

She wouldn't just give me a summary she gave me the experience. I got every single small detail, every sudden plot twist, and every character moment that had made her gasp, cry, or laugh. She loved to yap all day about her stories and the characters she lived with in her head, and honestly? I never got tired of it.  

I would sit there in our voice calls, listening to her go on and on And then he said this, and she did that, and oh my god you won't believe what happened next!. Even if I hadn't read the book myself, even if I had absolutely no context for why a certain secondary character's betrayal was such a big deal, it didn't matter to me. 
 
Watching her light up like that, hearing the pure, unadulterated joy in her voice that was enough for me. She could talk for hours on end, and I would just sit on my side of the screen, smiling like an idiot, completely captivated. I wasn't just captivated by the stories I was captivated by her. I loved the way she got lost in those fictional worlds and the way she made them come alive just by describing them to me.  

Eventually, I started reading some of the books she recommended. Part of it was curiosity, but mostly, it was because I wanted to share that world with her on a deeper level. I wanted to understand exactly what made her eyes sparkle when she reached a particular scene. I didn't just want to be a listener anymore I wanted to be someone who could yap right back with her, debating plot points and sharing the same excitement. 
 
Looking back, I think that was the moment I realized just how deep I had fallen. I wasn't just falling for the girl who played Call of Duty with me or the girl who watched movies with me late into the night. I was falling for every single part of her the girl who disappeared into stories, who talked about fictional characters as if they were real people, and who trusted me enough to share all these little, passionate pieces of herself.
`,
  },
  {
    title: "Part Two: The Longest Silence{it felt like forever}",
    content: `Just as the world of dark romance and late night yapping had become my new normal, the rug was pulled out from under me once again. She disappeared. In the past, her absences had been like brief flickering lights, but this time was different. This wasn't a matter of a few days or even a couple of weeks this was long painfully, excruciatingly long.  
    
The silence that followed was a living thing. It sat in the corner of my room, heavy and suffocating. Every time my phone vibrated, my heart would leap into my throat, only to sink back down when I saw a notification from anyone else but her. This kind of silence does something to your mind it makes you wonder if they are ever coming back, or if this time, you have truly lost them to the void for good. I spent my nights staring at our old chat logs, re-reading her yaps about books, trying to find a sign I might have missed that she was planning to leave

𝑻𝒉𝒆 𝑭𝒂𝒍𝒔𝒆 𝑫𝒂𝒘𝒏

When she finally returned, the relief was so sharp it almost hurt. It felt as though the sun had finally risen after a year-long winter. For a brief window maybe a week, maybe two it felt like everything could finally go back to normal. We fell right back into our old, familiar rhythm. We watched movies together, our screens synced as we laughed and commented in the chat. We stayed up until the early hours of the morning, talking about everything and nothing.  

I was so incredibly relieved, so profoundly grateful just to have my companion back. I thought the storm had passed. I thought we were safe.

𝑻𝒉𝒆 𝑺𝒉𝒂𝒕𝒕𝒆𝒓𝒊𝒏𝒈

And then, without warning, the world collapsed. He came into the picture.  
There was a guy someone she loved, and someone who loved her back. The news didn't just break my heart it shattered it into a million jagged pieces. Every secret hope I had nurtured, every "what if" I had whispered to myself during those late night calls, came crashing down all at once. I was crushed, left standing in the wreckage of a future I had only ever dared to dream about in the dark. 
 
The worst part of the pain was the internal conflict. Despite the agony in my chest, I was genuinely happy for her. I loved her enough to want her to be happy, to be loved, and to have all the things she deserved, even if it wasn't with me.  

I chose to respect him. I even reached out to him. I told him and I meant it with everything in me to take good care of her. I told him to never let her cry and to treat her with the respect and devotion she was worth. Because even if I couldn't be the one by her side, I needed to know, for my own peace of mind, that she would be okay.  


𝑻𝒉𝒆 𝑺𝒍𝒐𝒘 𝑫𝒓𝒊𝒇𝒕

But knowing she was in good hands didn't make losing her any easier. Slowly, agonizingly, things between us began to change. We started drifting apart, the distance between us growing wider with every passing day.  

The Voice Calls The long, rambling voice calls that used to stretch into the early morning hours became a thing of the past.  

The Movie Nights There were no more movie nights where we'd share a screen and a laugh.

The Games The gaming sessions stopped; there was no more of her getting genuinely angry at me for not protecting her in Call of Duty.

It felt like the end of an era. God, I missed her. I had never had a companion or a friend like her someone who truly understood the mess of my thoughts, someone who listened when the rest of the world felt loud and empty.  
But I had already convinced myself long ago that there was no way she could ever be mine. In my mind, she was a star, and I was just looking up from the ground. She was out of my league, and she always had been. So, I did the only thing I could do I accepted it. I accepted the silence. I accepted the distance. I accepted that I was losing the person who meant the most to me. 
`,
  },
  {
    title: "Part Two: When Everything Fell Apart",
    content: `The unraveling was slow, then all at once. It began with the discovery that she had created a new space for herself online a world on Instagram. But she hadn't made it for us, or for our mutual friends, or even for herself. She had started using it for him, her new boyfriend. It was a digital sanctuary built for two, and I was the ghost hovering at the edges.  
    
I tried I truly did. I talked to both of them, desperately trying to keep the bridges from burning, trying to be the supportive best friend everyone expected me to be. But the reality was a cold shower she ignored me. Not occasionally, but a lot. She poured every second of her attention, every ounce of her affection, into him. I was left with the scraps if I was lucky enough to receive anything at all.  

It ate at me from the inside out. I would sit in the quiet of my room, staring at the screen, thinking about our three years of history. Three years of shared secrets, late-night yaps about dark romance, and gaming sessions that felt like they would never end. Was it all nothing?. How could she leave me like this in just a few seconds?. How could three years be summarized and discarded so easily?. 
 
But I accepted it. Because to do anything else would mean losing the tiny thread I still held.  


𝑻𝒉𝒆 4 𝑨𝑴 𝑹𝒊𝒕𝒖𝒂𝒍

I became a different person during those months. She only came online at 4 AM to talk to her boyfriend. So, I started waking up at 4 AM too, just to catch a few fleeting minutes with her. I was a ghost in the pre dawn hours, dragging myself out of sleep just to know she was still real.  

And every time we talked, I cried.

I never let her see it. I kept my chats steady, my tone casual, while the tears ran down my face in the dark. I knew things would never be the same. I could feel the inevitable end coming toward me like a train. I lived in constant fear of his possessiveness, waiting for the moment he would demand she block me forever. 
 
But he didn't do what I expected. Instead, he reached out to me.

He was decent about it. He told me to give her space, acknowledging that he understood I was her best friend and that pulling away after years was difficult. He wasn't a monster, which almost made it worse.

But the truth was, I wasn't going anywhere. Even if the world, or even she herself, wanted me to leave, I couldn't. I just wanted to be with her for a lifetime even if it was only as a best friend. To me, that would have been enough.  

𝑻𝒉𝒆 𝑩𝒓𝒆𝒂𝒌𝒊𝒏𝒈 𝑷𝒐𝒊𝒏𝒕

But the friction between our past and her present became too much. We fought constantly, bitterly.

She said things that cut deeper than any physical wound.  

"For God's sake, can you give me time? To talk to him? You always talk to me all day long!".  

Her words were blades, and she used them over and over. It felt like she was trying to push me away on purpose, trying to make the final goodbye easier for us both. One night, the tension finally snapped.  

I broke. All the years of care, all the hours of listening, all the sacrifices I had made to stay in her orbit came pouring out.

"Is my care nothing?" I shouted into the void of our chat. "Was my time just a waste? I was with you for so long... I never expected you to be like this.". 
 
But I didn't know the whole story. I didn't know what she was carrying behind that screen. I didn't know about her family, about the friends who hurt her with their cruel words, or the crushing feeling that her own parents didn't truly care about her. She was drowning, and my demands for her time were just adding more weight to her shoulders.  

I hurt her that night. Really, truly hurt her.
And so, she did what she had to do. She said goodbye forever. And then, she blocked me.  

It hurt so much that it felt good, in a twisted, sickening way. Like a wound that had been festering finally being lanced. The end I had been dreading for months had finally arrived. It felt like the end of the world. `,
  },
  {
    title: "Part Two: Holding On by a Thread",
    content: `The silence that followed the block was different from the others. It wasn't a technical glitch or a busy week it was a deliberate, digital execution. But I couldn't just let her go. The thought of her existing in a world where I was a stranger was a reality I refused to inhabit. I have always hated losing friends there is a finality to it that feels like a small death and I knew, deep down in the parts of her she tried to hide, she hated it too. We were both hoarders of people, clinging to connections even when they turned into ghosts.  
    
So, I did what anyone blinded by the fear of loss would do I looked for a back door. I created a new Instagram account, a digital shadow designed to bridge the chasm she had opened between us. I named it "akiixrizz".  

But even as I typed in the new credentials, a cold sense of clarity washed over me. I knew the reality of the situation I couldn't force her, or her boyfriend, to keep me in their lives forever. It wasn't fair to demand a seat at a table that had been cleared of my presence. It was their choice, their journey, and I had to respect that no matter how much it killed me inside to realize I was no longer a priority.
  
The situation was already a minefield, and then a girl named Sneha entered the fray, complicating the already tangled web of our social circle. Her involvement acted like a catalyst, turning small misunderstandings into full-scale explosions. In the end, her interference led to the very thing I was trying to avoid Gargee blocked me again because of the mess Sneha had helped create. Everything felt like it was spiraling out of my control, a series of crashing waves I couldn't swim against. though this was all just a story sneha wasn't a real girl anyway.

I realized then that the truth was no longer working. To stay in her orbit, I had to become someone else someone who wasn't a threat.

I began to craft stories using the "akiixrizz" account, and to my surprise, they actually worked. I lied. I told them I had moved on, that my heart was no longer aching for what we used to have. I invented a girl named Shine and told them I was with her. I painted a picture of a man who was happy, settled, and completely over the past.  

I have told her the real story now, but back then, that lie was my only currency. I did it for one reason so that Yash, her boyfriend, would finally feel safe. I needed him to see me not as a rival or a pining ex-best friend, but as a man who had his own life and his own girl. I didn't want him to worry that I was trying to snatch her away, because all I really wanted the only thing that mattered was to still be a part of her life, even if I was only watching from the sidelines.  

Once the lie took hold and the tension simmered down, I stayed true to my word. I gave them space real, actual space. I stepped back into the shadows and let them be. For months and months, I existed in the periphery of her world, a silent observer of a life I was no longer allowed to share.  

But I never truly vanished. I would come back in between, every few weeks or months, just to check in. I would send a message, share a small thought, or ask how things were going. I wasn't there to interfere or cause problems. I just wanted to remind them and perhaps remind myself that I was still there. I still cared, and I was still holding onto whatever fraying thread of friendship we had left.
`,
  },
  {
    title: "Part Two: The Unwanted Triangle",
    content: `As the months of my self-imposed exile stretched on, I began to notice a destructive pattern that repeated with the precision of a clock. It was a rhythm I had inadvertently created. Every time I reached out, every time I couldn't resist the urge to check in or bridge the gap I had promised to respect, the ripples turned into tidal waves.  
    
My presence, however brief or well-intentioned, acted like a match in a room full of gasoline. It caused problems. It sparked fights that I wasn't present for but could feel in the static of her replies. It created a thick, suffocating tension that hung over their relationship, an invisible third party sitting at their table.  

Yash would get jealous. Looking back with the clarity of time, I can’t even blame him. From his perspective, his girlfriend was carving out precious time and mental energy for another guy her "best friend" from a past he wasn't part of. He felt that attention belonged to him, and he wasn't entirely wrong. He did everything in his power to push me away, to widen the distance until I was nothing but a fading memory. He wanted to make it clear that there was no room for me in the life they were building together.  

But she was the variable he couldn't control. She hated losing friends it was a core part of who she was. She didn't see people as disposable or replaceable. So, she fought back.  

I would hear echoes of their arguments through her. She would try to make him understand the weight of our history. "He’s my best friend," she would tell him, defending the years we had spent in the trenches of Discord and late-night calls. "He’s been here for years. I’m not just going to abandon him". She defended our friendship with a fierce loyalty, even when it cost her the very peace she was trying to find with him.  

And if I’m being honest painfully, selfishly honest that made me happy.  

It probably shouldn't have. I should have wanted her to have a peaceful relationship, but there was a dark, validation-seeking part of me that thrived on it. I was happy that she still made time for me whenever the world allowed it. I was happy that she still trusted me enough to fight for me, that she still cared, and that she refused to let me be erased. It was a small, cold comfort knowing that I hadn't completely lost her to this new chapter of her life.  

But that happiness was always overshadowed by a deep, hollow sadness.  

Because even as she defended me, I knew the truth things would never, ever be like they were before. We were playing at a friendship that was a shadow of its former self. The version of "us" that existed in 2019 was dead.  

There would be no more voice calls that bled into the sunrise. There would be no more movie nights where we’d share a screen and a heartbeat, laughing at the same frame. The gaming sessions were over; here was no more of her getting genuinely angry at me for failing to protect her in Call of Duty.  

I still had her, technically. We still talked, we still exchanged words, but I didn't have her in the way I wanted. I didn't have her in the way I needed to breathe. That reality was a physical weight in my chest, a constant reminder that I was holding onto a ghost while she was living a life with someone else.
`,
  },
  {
    title: "Part Three: Searching for What I Lost",
    content: `The absence of Gargee wasn't just a quiet room it was a sensory deprivation chamber. I spent my days wandering through a life that felt increasingly like a movie I was watching rather than living. I decided I had to move on. I told myself that the only way to kill the ghost of "us" was to replace it with someone new, someone tangible.  
    
I wasn't just looking for a girlfriend I was looking for a mirror of what I had lost. I scoured my social circles and digital platforms, searching for a girl who would recreate those specific, sacred rituals.
`,
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

In the midst of this desperate search, I found a girl named Iba on YouTube. She was, by all conventional standards, breathtaking damn beautiful with striking blue eyes and caramel-colored skin. She was wealthy, lived a life that seemed worlds apart from my own, and for a moment, the sheer novelty of her distracted me.  

We talked a lot in the beginning, the kind of rapid-fire messaging that mimics depth. For a fleeting second, I allowed myself to wonder if she was the answer the one who would finally make me forget the "darkangel". But the connection was a house of cards. After just a few weeks, she found someone else and moved on.  

The strange part was how little I felt. I didn't care about the romance ending because there were no real feelings beneath the surface. But true to my nature, I hated losing a friend. I couldn't stand the idea of another person becoming a stranger.  

The Sanskriti Connection

Driven by my refusal to let go of the connection, I reached out to Iba's closest friend, Sanskriti. What started as a simple attempt to keep a door open turned into a discovery that made my world tilt on its axis.  

Suddenly, I found myself pulled into a vast, interconnected network of people: Mudra, Advika, Liso, Astral, and others. It was like finding a secret map to a world I had already been living in. I quickly realized that these weren't just random people they were all close friends of Gargee.  

I hadn't known it when I first messaged Sanskriti, but the realization hit me like a physical blow. I thought, perhaps naively, that this was the universe throwing me a lifeline.

The Breaking of the Idol

But there was no way back. iba wouldn't speak to me she had blocked me from every corner of her digital life. The reason was a new shadow in her life her boyfriend the third one since we had drifted. This one was different he was possessive to an extreme, a "super possessive" force that demanded her total isolation from me.  

When I saw the reality of her life that she was changing boyfriends at light speed something inside me didn't just bend it snapped. It wasn't my heart breaking this time it was my patience and my hope.  

I realized then that the girl I had been mourning was a version of her that no longer existed, or perhaps never did.

I moved on from her without a shred of care left for our supposed friendship. The realization was cold and final our entire history, those momths of late nights and yaps, felt like a joke to her. It always had been. I was done being the punchline.`,
  },
  {
    title: "Part Three: The Trap",
    content: `By May 2024, my internal landscape was a wasteland. The bridge to Gargee had been burned, and the smoke from that fire still stung my eyes. I was drifting, anchored to nothing, until a notification vibrated against my desk a message from a girl on Instagram who seemed to appear out of the digital ether.

𝑻𝒉𝒆 𝑨𝒓𝒄𝒉𝒊𝒕𝒆𝒄𝒕𝒖𝒓𝒆 𝒐𝒇 𝒂 𝑳𝒊𝒆

At first, she felt like a miracle. She was caring, attentive, and radiated a warmth that I had been starving for since Gargee’s departure. She seemed to possess all the qualities I had been searching for the soft yapping about her day, the genuine-sounding interest in mine, the emotional safety I craved. I was vulnerable, my defenses eroded by months of isolation, and I walked straight into the cage she had built for me.  

It was a role, meticulously crafted and flawlessly executed. Every text she sent was designed to exploit my need for connection. I wasn't just falling for her I was falling for the version of a companion she knew I wanted. I was "blind in love," fueled by a desperation to feel significant again, and she used that blindness to her absolute advantage.

𝑻𝒉𝒆 𝑴𝒊𝒔𝒔𝒊𝒐𝒏

The true motive surfaced under the guise of a crisis. She didn't want my heart she wanted my hacking skills. She told me a harrowing story about a man named Anuj who was suffocating her life. According to her, he was obsessed spending every waking second monitoring her, giving her no room to breathe, and overwhelming her with unwanted attention.`,
    hasTable: true,
    tableData: {
      headers: ["The Claims", "What She Told Me"],
      rows: [
        ["Abuse of Power", "She claimed he used his political connections to suppress her, making it impossible for her to fight back through traditional means."],
        ["Relentless Blackmail", "He allegedly held her life hostage with threats that had pushed her to the brink of suicide and self-harm."],
        ["The Ultimate Humiliation", "He had reportedly used an intimate photo of her as his own profile picture."],
      ],
    },
    contentAfterTable: `I went to work. I infiltrated the accounts he had hijacked and snatched them back into her control. I scrubbed his devices of the photos he used as weapons, ensuring he had no leverage left to ruin her reputation. I dismantled his digital arsenal until he had nothing left to defend himself with. Finally, Anuj gave up he was defeated.

𝑻𝒉𝒆 𝑫𝒊𝒔𝒄𝒂𝒓𝒅

The victory lasted only hours. That same day, the girl who had been so "loving" and "vulnerable" underwent a terrifying transformation. The warmth vanished. In its place was a cold, clinical dismissal

"I don't think you're good enough for me. I guess we shouldn't talk anymore." 
 
It was a physical blow, a "punch to the gut" that left me breathless. I realized then that I was never a friend I was a contractor who had just finished a job. The moment the obstacle named Anuj was removed, I became obsolete. She had "used me up" in the most calculated way possible and threw me aside like a broken tool. 
 
I was desperate for an explanation. I created multiple accounts just to reach her, hoping to hear that I had misunderstood, hoping to find a shred of the person I thought she was. But the answer was final I had been a means to an end. That was the extent of my value to her.
  
The Dark Mirror

A poisonous desire for revenge began to take root in my mind. I wanted to destroy her world the way she had shattered mine I wanted her to feel the crushing weight of being discarded. But as I stood on the precipice of becoming the very hacker-villain she had described, I stopped.  `,
    hasTable2: true,
    tableData2: {
      headers: ["The Dark Mirror", "My Reflection"],
      rows: [
        ["The Realization", "If I sought to ruin her, wasn't I becoming exactly what Anuj was?"],
        ["The Doubt", "What if she had used Anuj too?"],
        ["The Cycle", "I started to wonder if his obsession was the result of being used and discarded, just as I had been."],
      ],
    },
    contentAfterTable2: `I looked at the digital wreckage and realized that some traps are designed not just to catch you, but to change you into something you hate. I chose to walk away, leaving the silence to settle over the month of May.
`,
  },
  {
    title: "Part Four: The Return",
    content: `By mid-November 2024, the world felt gray. I was wandering through life like a ghost, untethered and exhausted. The wounds from being used and discarded by the girl who trapped me were still fresh, leaving me feeling hollow and cynical. I was tired of the games, tired of the digital masks, and tired of searching for a connection that always seemed to slip through my fingers.  
    
The only person who truly anchored me during this time was my sister, Sanskriti. She was the one soul I could share everything with the one person who actually listened. Our relationship was built on a foundation of genuine trust, though it was often disguised by the typical sibling dynamic of relentless poking and teasing. She would mock my dramatic stories and roll her eyes at my heartbreaks, but she was always there when the silence became too loud.  

Yet, even with her support, a specific void remained. No matter how many people drifted in and out of my life, no one could fill the space Gargee had left behind. To me, she was still the best person who had ever lived, a standard I couldn't help but measure everyone else against. I had accepted her loss as a permanent fixture of my life, a scar that I had learned to live with.  

I kept wandering, scrolling mindlessly through the digital world, searching for something I couldn't even name. And then, one afternoon, the algorithm did something I never expected. As I was glancing through my suggested contacts, a name appeared that made the world stop. 
 
"darkangel."

My heart didn't just skip a beat it stopped entirely. I didn't stop to think about the years of distance, or the fact that she had blocked me from everywhere. Logic vanished. I simply reached out.  

𝑻𝒉𝒆 𝑻𝒓𝒖𝒕𝒉 𝑼𝒏𝒗𝒆𝒊𝒍𝒆𝒅

When we finally began to talk again, the girl I found wasn't the distant, untouchable figure I had imagined. She was broken more shattered than I had ever seen her. As the walls she had built around herself began to crumble, she shared a truth that re-wrote our entire history she had been pretending about her feelings for years.  

All those months and years when I thought I was just a "best friend" on the sidelines, she had been hiding her real emotions, burying them so deep they were invisible. Initially, I tried to be understanding. I told myself it made sense it wasn't safe for her to share her family's struggles or her true feelings. She had her reasons for the deception. But as we grew closer again, a sense of unease settled in my chest something about her story didn't sit right with me.  

As she opened up, our old dynamic resurfaced, but with a new, sharper edge. I began to predict the darker details of her current relationship. I made "guesses" about the explicit nature of their calls and the things they shared, poking at the reality she was trying to normalize. She would get angry when I brought these things up, but I couldn't stop myself. Poking and teasing her had always been "our thing," but now it was a way of forcing her to see the truth of her situation.  

The tension reached a breaking point when she told her boyfriend about my teasing. Predictably, he was ready to cut me out of her life once again. But I had learned how to play the game. I stepped in and calmed the situation, reassuring him that there was nothing to worry about and that we were "just friends". I did whatever was necessary to ensure I wasn't pushed away again.  

A few days later, she came back to me, apologizing for the trouble. And then, finally, she shared everything.


𝑻𝒉𝒆 𝑨𝒏𝒂𝒕𝒐𝒎𝒚 𝒐𝒇 𝒂 𝑻𝒐𝒙𝒊𝒄 𝑳𝒐𝒗𝒆

The reality of her life with him was a nightmare of emotional manipulation. He wasn't in love with her soul he was addicted to her body. He used his emotions as a weapon, playing the victim card whenever he was at fault. He would cry and act guilty until she was the one consoling him, apologizing for things he had done.  

He never cared about her feelings, her studies, her goals, or the dreams she had once whispered to me during our late-night calls. All he demanded was her total, undivided attention. She had spent months sacrificing her identity and her peace just to baby him, convinced that this constant self-erasure was what love looked like.  

My first instinct, strangely enough, was to try to save their relationship. I tried to convince her that things could get better, that relationships went through rough patches, and that maybe he would change. I didn't want to be the reason for her breakup.

But she was done hurting. She had fought until she was emotionally bankrupt. I eventually realized that my advice was a mistake. It wasn't going to be fine. It was never going to be fine. The girl I loved was drowning, and the only way to save her was to let the relationship sink. `,
  },
  {
    title: "Part Five: Finally, Us",
    content: `When the end finally came for her previous relationship, I expected a collapse. I expected to spend weeks, maybe months, pulling her out of the wreckage of a broken heart. But she surprised me she didn't break. Instead of falling apart, she did something I had only dreamed of in the quiet hours of the night she looked back. She remembered the foundation we had built over years of Discord calls, movie marathons, and shared secrets. She remembered us.  
    
And then, she did it. She gave me a chance a real, honest chance to be her boyfriend.  

God, I was happy. There are no words in the English language or any language that can truly capture the limitlessness of that happiness. It felt like I had finally reached the end of a long, exhausting journey. I had my old friend back, but this time, the "friend" label was gone, replaced by something much more profound. The girl I had loved for so long, the one I had convinced myself was hopelessly out of my league, had finally chosen me.  
As we navigated this new beginning, she didn't tell me everything about her past immediately. She held parts of herself back, protecting the wounds that were still raw. But slowly, piece by piece, the walls came down. She opened up and showed me her true side and it was beautiful. She was even better, even more wonderfully "crazy" than I had ever known. Looking at her now, I find it impossible to understand how anyone could have had such a woman and treated her the way he did.  

But I am not naive. I know that things aren't perfect yet they can't be. She still carries way too many scars from the people who failed to see her worth. There are broken pieces of her that haven't healed, memories that still sting like salt in an open wound. And I know with every fiber of my being that I have the responsibility to heal them. I don't see her pain as a burden I take those scars as my own. I strive to understand her pain as if it were vibrating in my own chest, and I am determined to heal her in whatever way she needs.  

We have returned to our sacred rituals. We watch movies together, we let songs carry our conversations, and we spend hours during late-night video calls just staring at each other. The distance is still there, but it feels smaller now. She still asks me to protect her in COD, and I still do my absolute best even though I still fail sometimes, and she still gets genuinely mad at me for it.  

It feels like coming home. Like we are finally where we were always meant to be. 
`,
  },
  {
    title: "Part Five: Why She Didn't Break",
    content: `People wondered why she didn't fall apart after the breakup. They didn't see the truth she didn't break afterward because she had been falling apart for months already piece by piece, tear by tear. She had already cried enough for a lifetime. She had reached out for help, for change, for a sliver of understanding from him so many times, only to be met with silence or indifference.  
    
When you keep reaching out and get nothing back, or worse, more demands, your feelings don't just vanish they burn out slowly, like a flame with no oxygen. But she didn't give up easily she fought until her last breath to save that relationship. She gave everything she had until she was physically and emotionally bankrupt, until she realized there was no hope left for things to be fixed. Even now, she still misses the idea of him as a friend, because she truly hates losing people.  
`,
    hasTable: true,
    tableData: {
      headers: ["Too Many Reasons to Leave", "The Truth"],
      rows: [
        ["The Caretaker Role", "She didn't want to be a mother to a partner. She was tired of spending every waking hour babying him while her own needs were ignored."],
        ["The Forced Compliance", "He would force her for everything, never understanding that she needed time or space."],
        ["The Erasure of Self", "He never listened to her reasons — he just kept pushing and demanding until she learned to say 'sorry' for things that weren't her fault."],
      ],
    },
    contentAfterTable: `She learned to say "yes" to things that hurt her because she was a woman who wanted to "date to marry". She was building a future, and she sacrificed her own peace to try and make it work. She stayed even when he threatened to leave her, used breakups as leverage, and treated her like a puppet. She stayed until she simply couldn't breathe anymore.  `,
  },
  {
    title: "Part Six: Our Present, Our Future",
    content: `Now, we are in the "love-dovey" phase the part where the world feels bright again. The thing I focus on every single day is protecting her. I want to keep her safe from everyone who might hurt her and keep her by my side forever. I want to heal her. I want to understand her feelings in ways no one else has bothered to try.  
    
I try to make her feel seen. I want her to wake up and know that someone is paying attention, that her feelings matter, and that her heart is in safe hands. This attention, this genuine care, is the medicine that is helping her heal. I love her more than I ever thought was possible for one person to love another.  

I don't just want her for today or tomorrow I want to enjoy my whole life with her. I want to see the future we talked about in those 2019 Discord calls and make it real. She is my girlfriend, yes, but she is also my best friend, my companion, and the person who knows my soul better than anyone else.  

We are healing together. We are learning that real love isn't about using someone for comfort it's about truly caring for them. It's not perfect we still have scars and moments where the past tries to claw its way back in but we are facing it together. And that is the only thing that matters.
`,
  },
  {
    title: "Epilogue: To the Girl Who Was Always Mine",
    content: `Looking back at this journey from strangers on a screen to best friends to losing each other and finding our way home I realize that every tear and every late night was leading us here. You were always meant to be mine. We just had to walk through the fire to understand how beautiful our world really was.  
    
I was wrong when I thought I wasn't good enough for you. I was wrong because love isn't about "deserving". It's about choosing each other every single day, especially when it's hard. You chose me when you could have walked away forever. You gave me a chance when hope was a forgotten word.  

Every morning I wake up knowing you're mine, I fall in love with you all over again. You are my best friend, my home, and my safe place. I promise to protect you, to heal those scars with you, and to never let you feel alone again. I promise to listen, to care, and to give you the support you need to fly.  

You are my darkangel my gorgeous, clumsy, caring girl who yaps about dark romance for hours. I wouldn't change a single thing about you. I love you more than words in any diary could ever capture.
`,
  },
  {
    title: "Author's Note",
    content: `Writing this hasn't just been about expressiing a story it's been about documenting a survival guide for a heart.
When I first looked at the raw memories, I saw more than just a timeline of Discord messages and gaming sessions. I saw two people who were constantly being pulled apart by distance, circumstances, and the interference of others, yet somehow always found their way back to the same frequency.
This book is a testament to the fact that online doesn't mean unreal. The emotions captured here the late-night yapping about dark romance, the frustration of a Call of Duty match, the crushing silence of being blocked, and the ultimate relief of a second chance are as real as any physical touch.
To the reader (and specifically to the Darkangel): This story was written with a specific kind of care. It was written to show you that your scars aren't flaws they are maps of where you've been, and they led you here. To the "ugly headed guy" who wrote the original pages You were never out of her league. You were just waiting for the world to catch up to the truth.`,
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

// Render a dreamy matte-glass table with zebra stripes and hover glow
function DreamTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl" style={{ WebkitOverflowScrolling: "touch" }}>
      <table className="w-full border-collapse overflow-hidden" style={{
        background: "hsl(var(--muted) / 0.3)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
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
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="transition-all duration-300 cursor-default"
              style={{
                background: ri % 2 === 0 ? "hsl(var(--primary) / 0.03)" : "transparent",
                borderBottom: "1px solid hsl(var(--border) / 0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "hsl(var(--primary) / 0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 20px hsl(var(--glow-lavender) / 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = ri % 2 === 0 ? "hsl(var(--primary) / 0.03)" : "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
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
  const [luminaMsg, setLuminaMsg] = useState("");
  const [showLumina, setShowLumina] = useState(false);

  useEffect(() => {
    if (open) setPage(0);
  }, [open]);

  // Show Lumina message on chapter change (not cover)
  useEffect(() => {
    if (page > 0 && open) {
      const msg = LUMINA_MESSAGES[page % LUMINA_MESSAGES.length];
      setLuminaMsg(msg);
      setShowLumina(true);
      const t = setTimeout(() => setShowLumina(false), 3000);
      return () => clearTimeout(t);
    }
  }, [page, open]);

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
      rotateY: dir >= 0 ? 80 : -80,
      opacity: 0,
      scale: 0.92,
      x: dir >= 0 ? 60 : -60,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      rotateY: dir >= 0 ? -80 : 80,
      opacity: 0,
      scale: 0.92,
      x: dir >= 0 ? -60 : 60,
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
          {/* Background particles */}
          <BookParticles />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col relative z-10"
          >
            {/* Lumina message */}
            <AnimatePresence>
              {showLumina && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                >
                  <span className="text-xs font-serif italic dreamscape-glow-text px-4 py-1.5 glass rounded-full">
                    ✨ {luminaMsg}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

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

            {/* Page content with enhanced 3D flip */}
            <div className="flex-1 overflow-y-auto" style={{ perspective: "1400px" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  className="glass-card glow-border-lavender min-h-[400px] overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform, opacity",
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
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground dreamscape-glow-text mb-6">{chapter.title}</h3>
                      <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-[15px] md:text-base" style={{
                        textShadow: "0 0 1px hsl(var(--foreground) / 0.05)",
                      }}>
                        {chapter.content}
                      </div>
                      {chapter.hasTable && chapter.tableData && (
                        <DreamTable headers={chapter.tableData.headers} rows={chapter.tableData.rows} />
                      )}
                      {chapter.contentAfterTable && (
                        <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-[15px] md:text-base mt-4">
                          {chapter.contentAfterTable}
                        </div>
                      )}
                      {chapter.hasTable2 && chapter.tableData2 && (
                        <DreamTable headers={chapter.tableData2.headers} rows={chapter.tableData2.rows} />
                      )}
                      {chapter.contentAfterTable2 && (
                        <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-[15px] md:text-base mt-4">
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
