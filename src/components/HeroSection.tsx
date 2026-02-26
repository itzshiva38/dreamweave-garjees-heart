import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Sparkles, Heart, BookOpen } from "lucide-react";
import BookReader from "./BookReader";
import SpecialSongButton from "./SpecialSongButton";

const START_DATE_KEY = "gargee-love-start-date";
const DEFAULT_START = "2025-12-21";
const FIRST_MET = "November 2019";

function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86400000));
}

function isAnniversary(dateStr: string): boolean {
  const start = new Date(dateStr);
  const now = new Date();
  return start.getMonth() === now.getMonth() && start.getDate() === now.getDate() && now.getFullYear() > start.getFullYear();
}

function DaysCounter() {
  const stored = localStorage.getItem(START_DATE_KEY) || DEFAULT_START;
  if (!localStorage.getItem(START_DATE_KEY)) localStorage.setItem(START_DATE_KEY, DEFAULT_START);

  const days = getDaysSince(stored);
  const anniversary = isAnniversary(stored);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [displayVal, setDisplayVal] = useState(0);
  const didConfetti = useRef(false);

  useEffect(() => {
    const controls = animate(motionVal, days, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplayVal(v));
    return () => { controls.stop(); unsub(); };
  }, [days]);

  useEffect(() => {
    if (anniversary && !didConfetti.current) {
      didConfetti.current = true;
      // Fire confetti hearts
      const canvas = document.createElement("canvas");
      canvas.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none";
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const hearts: { x: number; y: number; vx: number; vy: number; s: number; o: number; r: number }[] = [];
      for (let i = 0; i < 60; i++) {
        hearts.push({
          x: Math.random() * canvas.width, y: -20 - Math.random() * 200,
          vx: (Math.random() - 0.5) * 3, vy: 1.5 + Math.random() * 3,
          s: 10 + Math.random() * 18, o: 1, r: Math.random() * 0.3 - 0.15
        });
      }
      const colors = ["#f472b6", "#c084fc", "#67e8f9", "#fb7185"];
      let frame = 0;
      const drawHeart = (cx: number, cy: number, size: number, color: string) => {
        ctx.save(); ctx.translate(cx, cy); ctx.scale(size / 20, size / 20);
        ctx.beginPath(); ctx.moveTo(0, -5);
        ctx.bezierCurveTo(-10, -15, -20, 0, 0, 15);
        ctx.bezierCurveTo(20, 0, 10, -15, 0, -5);
        ctx.fillStyle = color; ctx.fill(); ctx.restore();
      };
      const loop = () => {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((h) => {
          h.x += h.vx; h.y += h.vy; h.o -= 0.004;
          if (h.o > 0) drawHeart(h.x, h.y, h.s, colors[Math.floor(Math.random() * colors.length)]);
        });
        if (frame < 180) requestAnimationFrame(loop);
        else canvas.remove();
      };
      loop();
      window.dispatchEvent(new CustomEvent("open-lumina", { detail: "Happy anniversary my love! 💖✨ Another year of our beautiful story together!" }));
    }
  }, [anniversary]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="mb-8"
    >
      <div className="text-6xl md:text-8xl font-serif font-bold tabular-nums dreamscape-glow-text">
        {displayVal}
      </div>
      <p className="text-base md:text-lg text-muted-foreground mt-2">
        days of loving you since 21 December 2025 💕
      </p>
      <p className="text-sm text-muted-foreground/70 mt-1">
        and since we first met in {FIRST_MET} ✨
      </p>
    </motion.div>
  );
}

export default function HeroSection() {
  const title = "Gargee's Dreamscape";
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-3xl mx-auto">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-32 left-10 w-20 h-20 rounded-full bg-glow-lavender/10 blur-2xl"
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-10 w-28 h-28 rounded-full bg-glow-rose/10 blur-2xl"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-glow-cyan/10 blur-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Avatar orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 w-32 h-32 rounded-full glass glow-border-lavender flex items-center justify-center"
        >
          <Heart className="h-12 w-12 text-glow-rose animate-pulse-glow" style={{ animationDuration: "3s" }} />
        </motion.div>

        {/* Glow title with stagger animation */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 overflow-hidden dreamscape-glow-text">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 + i * 0.03, duration: 0.3, ease: "easeOut" }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground text-glow-sm mb-6"
        >
          A world where dreams bloom forever ✨
        </motion.p>

        {/* Days We've Loved Counter */}
        <DaysCounter />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="glass-button glow-border-lavender text-foreground flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Enter the Dream
          </a>
          <a
            href="#journal"
            className="glass-button glow-border-rose text-foreground flex items-center justify-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Meet Lumina
          </a>
          <button
            onClick={() => setBookOpen(true)}
            className="glass-button glow-border-cyan text-foreground flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Read My Book for Gargee 📖
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.7 }}
          className="mt-6 flex justify-center"
        >
          <SpecialSongButton />
        </motion.div>
      </div>

      <BookReader open={bookOpen} onClose={() => setBookOpen(false)} />
    </section>
  );
}
