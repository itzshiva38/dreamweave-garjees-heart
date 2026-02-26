import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  index: number;
}

const messages = [
  "I love you endlessly 💕",
  "You are my everything ✨",
  "Forever isn't long enough 🌙",
  "My heart beats for you 💖",
  "You make life beautiful 🌸",
  "Together is my favorite place 💫",
  "You're my sweetest dream 🌟",
  "Always and forever 💕",
];

export default function GardenFirefly({ index }: Props) {
  const [tapped, setTapped] = useState(false);

  const x = 5 + ((index * 41 + index * index * 3) % 90);
  const y = 10 + ((index * 29 + index * 7) % 70);

  return (
    <motion.div
      className="absolute z-20 cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, Math.sin(index * 1.3) * 40, Math.cos(index * 0.7) * 30, 0],
        y: [0, Math.cos(index * 0.9) * 30, Math.sin(index * 1.1) * 20, 0],
      }}
      transition={{
        duration: 8 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={() => {
        setTapped(true);
        setTimeout(() => setTapped(false), 3000);
      }}
    >
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(55 90% 70%), hsl(55 80% 50% / 0.3))",
          boxShadow: "0 0 12px hsl(55 90% 65% / 0.6), 0 0 24px hsl(55 80% 50% / 0.3)",
        }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <AnimatePresence>
        {tapped && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] text-foreground"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 0 15px hsl(55 90% 65% / 0.2)",
            }}
          >
            {messages[index % messages.length]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
