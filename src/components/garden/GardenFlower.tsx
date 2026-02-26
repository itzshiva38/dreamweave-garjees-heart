import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowerProps {
  flower: {
    id: number;
    x: number;
    y: number;
    color: "rose" | "lavender" | "cyan";
    memory: string;
  };
  nightMode: boolean;
  wateredToday: boolean;
}

const colorMap = {
  rose: { petal: "hsl(330 80% 72%)", glow: "hsl(330 80% 72% / 0.4)" },
  lavender: { petal: "hsl(270 70% 75%)", glow: "hsl(270 70% 75% / 0.4)" },
  cyan: { petal: "hsl(185 80% 68%)", glow: "hsl(185 80% 68% / 0.4)" },
};

export default function GardenFlower({ flower, nightMode, wateredToday }: FlowerProps) {
  const [bloomed, setBloomed] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const c = colorMap[flower.color];

  const handleTap = () => {
    if (!bloomed) {
      setBloomed(true);
      setTimeout(() => setShowMemory(true), 400);
    } else {
      setShowMemory(!showMemory);
    }
  };

  return (
    <motion.div
      className="absolute z-10 cursor-pointer select-none"
      style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
      onClick={handleTap}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Stem */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full"
        style={{
          height: 30 + flower.id * 2,
          top: 20,
          background: nightMode ? "hsl(120 30% 20%)" : "hsl(120 40% 35%)",
        }}
      />

      {/* Flower SVG */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        animate={bloomed ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
        style={{ filter: nightMode ? `drop-shadow(0 0 8px ${c.glow})` : undefined }}
      >
        {/* Petals */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <motion.ellipse
            key={angle}
            cx="24"
            cy="24"
            rx={bloomed ? 8 : 4}
            ry={bloomed ? 14 : 6}
            fill={c.petal}
            opacity={bloomed ? 0.85 : 0.5}
            transform={`rotate(${angle} 24 24) translate(0 ${bloomed ? -8 : -3})`}
            animate={bloomed ? { opacity: 0.85 } : {}}
            transition={{ duration: 0.4 }}
          />
        ))}
        {/* Center */}
        <circle cx="24" cy="24" r={bloomed ? 6 : 4} fill="hsl(45 90% 65%)" opacity={0.9} />
      </motion.svg>

      {/* Sparkle when watered */}
      {wateredToday && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px]">✨</span>
        </motion.div>
      )}

      {/* Memory tooltip */}
      <AnimatePresence>
        {showMemory && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-2xl text-xs text-center text-foreground"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${c.petal}40`,
              boxShadow: `0 0 15px ${c.glow}`,
            }}
          >
            {flower.memory}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
