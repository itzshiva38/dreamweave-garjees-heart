import { useState } from "react";
import { motion } from "framer-motion";

const HEART_STARS = [
  { x: 50, y: 85 }, { x: 25, y: 55 }, { x: 10, y: 30 }, { x: 25, y: 12 }, { x: 42, y: 20 },
  { x: 50, y: 35 }, { x: 58, y: 20 }, { x: 75, y: 12 }, { x: 90, y: 30 }, { x: 75, y: 55 },
];

export default function StarConstellation() {
  const [connected, setConnected] = useState<number[]>([]);
  const [won, setWon] = useState(false);
  const nextIdx = connected.length;

  const clickStar = (idx: number) => {
    if (won) return;
    if (idx === nextIdx) {
      const next = [...connected, idx];
      setConnected(next);
      if (next.length === HEART_STARS.length) setWon(true);
    }
  };

  const restart = () => { setConnected([]); setWon(false); };

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground mb-4">
        {won ? "You made a heart for Gargee! 💕" : `Connect the stars in order (${connected.length}/${HEART_STARS.length})`}
      </p>
      {!won && <p className="text-xs text-muted-foreground mb-2">Hint: Star #{nextIdx + 1} glows brighter ✨</p>}

      <div className="relative w-full aspect-square max-w-sm mx-auto glass rounded-3xl overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
          {connected.length > 1 && connected.map((idx, i) => {
            if (i === 0) return null;
            const from = HEART_STARS[connected[i - 1]];
            const to = HEART_STARS[idx];
            return (
              <motion.line key={`${i}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="hsl(330, 80%, 72%)" strokeWidth="0.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
              />
            );
          })}
          {won && (
            <motion.line x1={HEART_STARS[HEART_STARS.length - 1].x} y1={HEART_STARS[HEART_STARS.length - 1].y}
              x2={HEART_STARS[0].x} y2={HEART_STARS[0].y} stroke="hsl(330, 80%, 72%)" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}
            />
          )}
        </svg>

        {HEART_STARS.map((star, i) => {
          const isNext = i === nextIdx && !won;
          const isConnected = connected.includes(i);
          return (
            <motion.button key={i} onClick={() => clickStar(i)}
              className={`absolute w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isConnected ? "bg-secondary scale-110" : isNext ? "bg-primary animate-pulse-glow scale-125" : "bg-muted-foreground/40 hover:bg-primary/60"
              }`}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.9 }}
            />
          );
        })}

        {won && Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-secondary" style={{ left: "50%", top: "50%" }}
            initial={{ scale: 0 }} animate={{ x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 200, scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, delay: i * 0.05 }}
          />
        ))}
      </div>

      {won && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <p className="text-foreground font-serif mb-3">A heart made of starlight, just for Gargee 💫</p>
          <button onClick={restart} className="glass-button glow-border-rose text-sm">Draw Again</button>
        </motion.div>
      )}
    </div>
  );
}
