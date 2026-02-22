import { useState } from "react";
import { motion } from "framer-motion";

const FLOWERS = [
  { emoji: "🌸", name: "Cherry Blossom", sound: "Soft chime", color: "glow-border-rose" },
  { emoji: "🌺", name: "Hibiscus", sound: "Rain drop", color: "glow-border-lavender" },
  { emoji: "🌷", name: "Tulip", sound: "Wind bell", color: "glow-border-cyan" },
  { emoji: "🌻", name: "Sunflower", sound: "Deep hum", color: "glow-border-rose" },
  { emoji: "🪻", name: "Lavender", sound: "Whisper tone", color: "glow-border-lavender" },
  { emoji: "🌼", name: "Daisy", sound: "Bright ping", color: "glow-border-cyan" },
  { emoji: "💮", name: "White Flower", sound: "Ocean wave", color: "glow-border-rose" },
];

export default function MelodyGarden() {
  const [collected, setCollected] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState<number | null>(null);

  const clickFlower = (idx: number) => {
    setPlaying(idx);
    setCollected((prev) => new Set(prev).add(idx));
    setTimeout(() => setPlaying(null), 600);
  };

  const complete = collected.size >= 5;
  const restart = () => { setCollected(new Set()); setPlaying(null); };

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-2">Flowers collected: {collected.size}/5 {complete && "— Your melody is ready! 🎶"}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
        {FLOWERS.map((flower, idx) => (
          <motion.button key={idx} onClick={() => clickFlower(idx)} whileTap={{ scale: 0.9 }}
            className={`glass p-4 flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${collected.has(idx) ? flower.color : ""} ${playing === idx ? "scale-110" : "hover:scale-105"}`}
          >
            <motion.span className="text-3xl" animate={playing === idx ? { rotate: [0, -10, 10, 0], scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.5 }}>{flower.emoji}</motion.span>
            <span className="text-xs text-muted-foreground">{flower.name}</span>
            {playing === idx && (
              <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-primary">♪ {flower.sound}</motion.span>
            )}
          </motion.button>
        ))}
      </div>
      {complete && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card glow-border-cyan">
          <p className="text-foreground font-serif mb-2">🎵 Your Melody Garden 🎵</p>
          <div className="flex justify-center gap-2 mb-3">
            {Array.from(collected).map((idx) => (
              <motion.span key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl">{FLOWERS[idx].emoji}</motion.span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-3">A beautiful song made with love for Gargee 💕</p>
          <button onClick={restart} className="glass-button glow-border-lavender text-sm">New Garden</button>
        </motion.div>
      )}
    </div>
  );
}
