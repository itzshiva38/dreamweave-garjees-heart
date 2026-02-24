import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Shuffle, Printer, Sparkles } from "lucide-react";

const REASONS = [
  "I love the way your smile turns my worst days into the best ones.",
  "I love how your laugh feels like home no matter where we are.",
  "I love the sparkle in your eyes when you talk about your dreams.",
  "I love that you make ordinary moments feel like fairy tales.",
  "I love how your hand fits perfectly in mine.",
  "I love the way you bite your lip when you're concentrating.",
  "I love waking up knowing you're the first thought in my heart.",
  "I love how you turn my chaos into calm with just one hug.",
  "I love the little dance you do when your favorite song plays.",
  "I love that your voice is my favorite melody.",
  "I love how you remember every tiny detail about me.",
  "I love the way you look at me like I'm your whole universe.",
  "I love your kindness that makes the world softer.",
  "I love how brave you are even when you think you're not.",
  "I love the way you make me want to be a better man.",
  "I love your crazy ideas that always end in adventure.",
  "I love falling asleep with your name on my lips.",
  "I love how you steal the blanket and I don't even mind.",
  "I love the way you say my name like it's poetry.",
  "I love that you're my safe place and my biggest thrill.",
  "I love how your hugs heal everything.",
  "I love the way you believe in me when I doubt myself.",
  "I love your beautiful mind that thinks in colors and music.",
  "I love how you turn coffee into a love language.",
  "I love the way you light up every room you walk into.",
  "I love that you're my favorite notification.",
  "I love how you kiss me like the world stops spinning.",
  "I love your silly faces that make me laugh till my stomach hurts.",
  "I love the way you care for everyone around you.",
  "I love that forever doesn't feel long enough with you.",
  "I love how you make long-distance feel short.",
  "I love the way you steal my hoodies and they smell like you.",
  "I love your strength wrapped in the softest heart.",
  "I love how you turn my flaws into reasons to love me more.",
  "I love the way you plan our future like it's the best story ever.",
  "I love your sleepy voice in the morning.",
  "I love that you're the reason I believe in soulmates.",
  "I love how you make every day feel like Valentine's.",
  "I love the way you dance in the kitchen like nobody's watching.",
  "I love that you chose me every single day.",
  "I love your passion that sets my heart on fire.",
  "I love how you forgive so easily and love even harder.",
  "I love the way you look when you're lost in thought.",
  "I love that you're my peace in every storm.",
  "I love your cute little snores that I secretly record.",
  "I love how you make me feel like the luckiest guy alive.",
  "I love the way you surprise me with your sweetness.",
  "I love that our inside jokes could fill libraries.",
  "I love how you turn my bad moods into cuddles.",
  "I love the way your love feels like magic I can touch.",
  "I love your dreams because they've become mine too.",
  "I love how you make time stop when we're together.",
  "I love the way you say \"I love you\" with your eyes.",
  "I love that you're my favorite person to grow old with.",
  "I love your heart that loves so deeply it inspires me.",
  "I love how you make ordinary Tuesdays feel special.",
  "I love the way you hold me like you'll never let go.",
  "I love that you're my biggest cheerleader and softest landing.",
  "I love your beautiful soul that shines brighter than stars.",
  "I love how you make me fall in love with you every single day.",
  "I love the way you remember the day we met like it was yesterday.",
  "I love how our story is my favorite book — and you're every chapter.",
  "I love that you turned my life into the most beautiful song.",
  "I love the way you look at our photos and smile.",
  "I love how you've made every memory with me priceless.",
  "I love that our future already feels like home.",
  "I love how you make me excited for every tomorrow.",
  "I love the way you complete my sentences and my heart.",
  "I love that you're the reason \"happily ever after\" feels real.",
  "I love how our love story is better than any movie.",
  "I love the way you make me want to write a thousand more songs for you.",
  "I love that you've turned my ordinary life into an epic.",
  "I love how every page of our book feels like a love letter.",
  "I love the way you make time fly when we're together.",
  "I love that forever started the day I met you.",
  "I love how you make me believe in miracles.",
  "I love the way you love me — completely, wildly, perfectly.",
  "I love that you're my always and my forever.",
  "I love how you make every goodbye feel temporary.",
  "I love the way our hearts beat in the same rhythm.",
  "I love your little quirks that no one else gets but me.",
  "I love how you eat the last bite and still share it with me.",
  "I love the way you hum when you're happy.",
  "I love that you save the best part of everything for me.",
  "I love your random \"I miss you\" texts that make my day.",
  "I love how you steal my fries and my heart at the same time.",
  "I love the way you say goodnight like a promise.",
  "I love your messy hair and perfect soul.",
  "I love that you're my favorite notification and my favorite person.",
  "I love how you make even silence feel romantic.",
  "I love the way you look at the moon and then at me.",
  "I love that you're my calm in every chaos.",
  "I love how you turn my fears into courage.",
  "I love the way you love me on my hardest days.",
  "I love that you're the best part of every single day.",
  "I love how our love feels like coming home.",
  "I love the way you make me feel seen, heard, and cherished.",
  "I love that with you, I've found my missing piece.",
  "I love you more than yesterday but less than tomorrow.",
  "I love you because you are my everything — today, tomorrow, and every day after.",
];

function FloatingHeart({ delay }: { delay: number }) {
  const x = Math.random() * 100;
  const size = 10 + Math.random() * 14;
  const dur = 8 + Math.random() * 6;
  return (
    <motion.div
      className="absolute pointer-events-none text-secondary/20"
      style={{ left: `${x}%`, bottom: -20, fontSize: size }}
      animate={{ y: [0, -800], opacity: [0, 0.6, 0], x: [0, Math.sin(x) * 30] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      ♥
    </motion.div>
  );
}

function ConfettiExplosion() {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const dist = 120 + Math.random() * 200;
        const emoji = ["💖", "✨", "💕", "🌸", "💗"][i % 5];
        return (
          <motion.span
            key={i}
            className="absolute text-lg"
            style={{ left: "50%", top: "40%" }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist + 100,
              scale: 0.5,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function HundredReasons() {
  const [surprise, setSurprise] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSurprise = () => {
    const idx = Math.floor(Math.random() * 100);
    setSurprise(idx);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
    // Scroll to card
    setTimeout(() => {
      document.getElementById(`reason-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>100 Reasons I Love Gargee</title>
      <style>body{font-family:Georgia,serif;padding:40px;max-width:700px;margin:auto}
      h1{text-align:center;color:#a855f7;margin-bottom:30px}
      .r{margin:8px 0;padding:8px 12px;border-left:3px solid #ec4899;font-size:14px}
      .n{font-weight:bold;color:#a855f7;margin-right:8px}</style></head><body>
      <h1>100 Reasons Why I Love Gargee ✨</h1>
      ${REASONS.map((r, i) => `<div class="r"><span class="n">${i + 1}.</span>${r}</div>`).join("")}
      <p style="text-align:center;margin-top:30px;color:#ec4899">With all my love, forever 💕</p>
      </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <section id="reasons" className="relative py-24 px-4 overflow-hidden">
      {/* Floating hearts background */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingHeart key={i} delay={i * 1.2} />
      ))}

      <AnimatePresence>{showConfetti && <ConfettiExplosion />}</AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground dreamscape-glow-text mb-4">
            100 Reasons Why I Love Gargee ✨
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every reason is a heartbeat, every word a forever promise 💕
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSurprise}
              className="glass-button flex items-center gap-2 glow-border-rose"
            >
              <Shuffle className="h-4 w-4" />
              Surprise Me 💖
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="glass-button flex items-center gap-2 glow-border-lavender"
            >
              <Printer className="h-4 w-4" />
              Print Our Love
            </motion.button>
          </div>
        </motion.div>

        {/* Surprise highlight */}
        <AnimatePresence>
          {surprise !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card glow-border-rose text-center mb-12 max-w-lg mx-auto"
            >
              <Sparkles className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Reason #{surprise + 1}</p>
              <p className="text-foreground font-serif text-lg">{REASONS[surprise]}</p>
              <Heart className="h-4 w-4 text-secondary mx-auto mt-3" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              id={`reason-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className={`break-inside-avoid glass-card p-5 group cursor-default transition-shadow duration-300 hover:glow-border-rose ${
                surprise === i ? "glow-border-rose ring-2 ring-secondary/30" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl font-serif font-bold text-secondary/60 group-hover:text-secondary transition-colors shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground/90 leading-relaxed">{reason}</p>
              </div>
              <motion.div
                className="absolute top-2 right-3 text-secondary/0 group-hover:text-secondary/40 transition-colors"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-3 w-3" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
