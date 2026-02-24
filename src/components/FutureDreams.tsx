import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Check, Trash2, RotateCw, Heart } from "lucide-react";

const PRIZES = [
  "Midnight stargazing date 🌟",
  "Write each other love letters 💌",
  "Cook a fancy dinner together 🍝",
  "Sunrise beach walk 🌅",
  "Build a blanket fort movie night 🎬",
  "Road trip to nowhere 🚗",
  "Learn a dance together 💃",
  "Paint each other's portrait 🎨",
  "Picnic under cherry blossoms 🌸",
  "Karaoke night — only love songs 🎤",
  "Matching tattoo adventure 🖋️",
  "Hot air balloon ride 🎈",
  "Write a song together 🎵",
  "Watch every sunset for a week 🌇",
  "Recreate our first date 💕",
];

const COLORS = [
  "hsl(330 80% 72%)", "hsl(270 70% 70%)", "hsl(185 80% 65%)",
  "hsl(330 60% 65%)", "hsl(270 50% 65%)", "hsl(185 60% 60%)",
  "hsl(340 70% 68%)", "hsl(260 65% 68%)", "hsl(190 70% 62%)",
  "hsl(320 70% 70%)", "hsl(280 60% 67%)", "hsl(175 70% 60%)",
  "hsl(335 75% 70%)", "hsl(265 65% 70%)", "hsl(180 75% 63%)",
];

type BucketItem = { id: string; text: string; done: boolean };

function getStoredItems(): BucketItem[] {
  try {
    return JSON.parse(localStorage.getItem("dreamscape-bucket") || "[]");
  } catch { return []; }
}

function ConfettiSmall() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const dist = 80 + Math.random() * 120;
        return (
          <motion.span
            key={i}
            className="absolute text-sm"
            style={{ left: "50%", top: "50%" }}
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{ opacity: 0, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {["💖", "✨", "🌸", "💕"][i % 4]}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function FutureDreams() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [items, setItems] = useState<BucketItem[]>(getStoredItems);
  const [newItem, setNewItem] = useState("");
  const wheelRef = useRef<HTMLDivElement>(null);

  const saveItems = useCallback((next: BucketItem[]) => {
    setItems(next);
    localStorage.setItem("dreamscape-bucket", JSON.stringify(next));
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extraSpins = 5 + Math.random() * 3;
    const prizeIdx = Math.floor(Math.random() * PRIZES.length);
    const sliceAngle = 360 / PRIZES.length;
    const targetAngle = 360 - (prizeIdx * sliceAngle + sliceAngle / 2);
    const newRotation = rotation + extraSpins * 360 + targetAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(PRIZES[prizeIdx]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
    }, 4000);
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    saveItems([...items, { id: Date.now().toString(), text: newItem.trim(), done: false }]);
    setNewItem("");
  };

  const toggleItem = (id: string) => {
    saveItems(items.map(it => it.id === id ? { ...it, done: !it.done } : it));
  };

  const removeItem = (id: string) => {
    saveItems(items.filter(it => it.id !== id));
  };

  const sliceAngle = 360 / PRIZES.length;

  return (
    <section id="future-dreams" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground dreamscape-glow-text mb-4"
        >
          Our Future Dreams ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Spin the wheel of destiny and build our forever bucket list 💕
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Wheel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 text-2xl">▼</div>
              {/* Wheel */}
              <motion.div
                ref={wheelRef}
                className="w-full h-full rounded-full glass glow-border-lavender overflow-hidden relative"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {PRIZES.map((prize, i) => {
                    const startAngle = i * sliceAngle - 90;
                    const endAngle = startAngle + sliceAngle;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    const x1 = 100 + 95 * Math.cos(startRad);
                    const y1 = 100 + 95 * Math.sin(startRad);
                    const x2 = 100 + 95 * Math.cos(endRad);
                    const y2 = 100 + 95 * Math.sin(endRad);
                    const large = sliceAngle > 180 ? 1 : 0;
                    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                    const tx = 100 + 60 * Math.cos(midAngle);
                    const ty = 100 + 60 * Math.sin(midAngle);
                    const textRotate = (startAngle + endAngle) / 2;
                    return (
                      <g key={i}>
                        <path
                          d={`M100,100 L${x1},${y1} A95,95 0 ${large},1 ${x2},${y2} Z`}
                          fill={COLORS[i]}
                          fillOpacity={0.3}
                          stroke="hsl(270 70% 70% / 0.3)"
                          strokeWidth={0.5}
                        />
                        <text
                          x={tx}
                          y={ty}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textRotate}, ${tx}, ${ty})`}
                          className="fill-foreground"
                          fontSize="4.5"
                          fontWeight="500"
                        >
                          {prize.length > 18 ? prize.slice(0, 16) + "…" : prize}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="100" cy="100" r="18" fill="hsl(270 70% 70% / 0.2)" stroke="hsl(330 80% 72% / 0.4)" strokeWidth="1" />
                  <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="fill-foreground" fontSize="8">💕</text>
                </svg>
              </motion.div>

              <AnimatePresence>{showConfetti && <ConfettiSmall />}</AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={spin}
              disabled={spinning}
              className="glass-button glow-border-rose flex items-center gap-2 mt-6 disabled:opacity-50"
            >
              <RotateCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
              {spinning ? "Spinning..." : "Spin the Wheel of Our Love 💖"}
            </motion.button>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-card glow-border-cyan text-center mt-4 max-w-xs"
                >
                  <Star className="h-5 w-5 text-accent mx-auto mb-1" />
                  <p className="text-foreground font-serif">{result}</p>
                  <p className="text-xs text-muted-foreground mt-1">Lumina says: "This is destiny, sweet dreamers! ✨"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bucket List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card glow-border-lavender"
          >
            <h3 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-secondary" />
              Our Forever Bucket List
            </h3>

            <div className="flex gap-2 mb-6">
              <input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="Add a dream together..."
                className="flex-1 bg-transparent border border-[hsl(var(--glass-border))] rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addItem}
                className="glass-button px-4 py-2 glow-border-rose"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {items.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">
                  Start building your forever list together 💕
                </p>
              )}
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`glass rounded-xl px-4 py-3 flex items-center gap-3 group ${
                      item.done ? "opacity-60" : ""
                    }`}
                  >
                    <button onClick={() => toggleItem(item.id)} className="shrink-0">
                      {item.done ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Heart className="h-4 w-4 text-secondary/50 group-hover:text-secondary transition-colors" />
                      )}
                    </button>
                    <span className={`text-sm text-foreground flex-1 ${item.done ? "line-through" : ""}`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground/0 group-hover:text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
