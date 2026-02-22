import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POEMS = [
  "Every spark you catch lights a dream for Gargee 🌟",
  "You're glowing brighter than the stars tonight ✨",
  "Lumina whispers: 'You're doing amazing, dreamer!' 💕",
  "Ten sparks of love, forever remembered 🌸",
  "The cosmos dances when you smile 🌙",
];

interface Bubble { id: number; x: number; delay: number; size: number; color: string; }
const COLORS = ["bg-primary/40", "bg-secondary/40", "bg-accent/40"];

export default function BubbleClicker() {
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [message, setMessage] = useState("");
  const [running, setRunning] = useState(false);
  const best = parseInt(localStorage.getItem("bubble-best") || "0");

  const spawnBubble = useCallback(() => {
    const b: Bubble = { id: Date.now() + Math.random(), x: 10 + Math.random() * 80, delay: 0, size: 40 + Math.random() * 30, color: COLORS[Math.floor(Math.random() * COLORS.length)] };
    setBubbles((prev) => [...prev.slice(-15), b]);
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(spawnBubble, 700);
    return () => clearInterval(interval);
  }, [running, spawnBubble]);

  const pop = (id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > best) localStorage.setItem("bubble-best", String(newScore));
    if (newScore % 10 === 0) {
      setMessage(POEMS[Math.floor(Math.random() * POEMS.length)]);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const removeBubble = (id: number) => setBubbles((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">
        Dream Sparks: <span className="text-foreground font-semibold">{score}</span> | Best: {Math.max(score, best)}
      </p>
      {message && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-primary font-serif mb-3">
          {message}
        </motion.p>
      )}
      {!running ? (
        <button onClick={() => setRunning(true)} className="glass-button glow-border-cyan text-sm">Start Catching Bubbles ✨</button>
      ) : (
        <div className="relative h-80 glass rounded-3xl overflow-hidden">
          <AnimatePresence>
            {bubbles.map((b) => (
              <motion.button
                key={b.id}
                initial={{ y: 320, opacity: 0.8 }}
                animate={{ y: -80, opacity: [0.8, 1, 0.3] }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 3.5, ease: "linear" }}
                onAnimationComplete={() => removeBubble(b.id)}
                onClick={() => pop(b.id)}
                className={`absolute rounded-full ${b.color} backdrop-blur-sm border border-white/20 cursor-pointer hover:scale-110 transition-transform`}
                style={{ left: `${b.x}%`, width: b.size, height: b.size }}
              />
            ))}
          </AnimatePresence>
          <button onClick={() => { setRunning(false); setScore(0); setBubbles([]); }} className="absolute bottom-3 right-3 glass-button text-xs px-3 py-1">Stop</button>
        </div>
      )}
    </div>
  );
}
