import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Lock, HelpCircle } from "lucide-react";

const CORRECT_PASSWORD = "gargeeissuchacutie@0709022716";

interface Props {
  onUnlock: () => void;
  fadeOut: boolean;
}

function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6,
    isHeart: Math.random() > 0.6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.isHeart ? (
            <Heart
              className="text-glow-rose fill-current"
              style={{
                width: p.size * 3,
                height: p.size * 3,
                color: "hsl(330 80% 72%)",
                opacity: 0.5,
              }}
            />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, hsl(270 70% 75% / 0.6), transparent)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function GardenPasswordGate({ onUnlock, fadeOut }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sparkles, setSparkles] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setSparkles(true);
      setTimeout(onUnlock, 200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, hsl(270 60% 15%) 0%, hsl(260 50% 8%) 40%, hsl(250 40% 5%) 100%)",
      }}
      animate={fadeOut ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <FloatingParticles />

      {/* Sparkle explosion on correct */}
      <AnimatePresence>
        {sparkles && (
          <>
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * Math.PI * 2;
              return (
                <motion.div
                  key={i}
                  className="absolute z-50"
                  style={{ left: "50%", top: "50%" }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * 300,
                    y: Math.sin(angle) * 300,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {i % 2 === 0 ? (
                    <Heart className="w-5 h-5 fill-current" style={{ color: "hsl(330 80% 72%)" }} />
                  ) : (
                    <Sparkles className="w-4 h-4" style={{ color: "hsl(270 70% 75%)" }} />
                  )}
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-md w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif dreamscape-glow-text mb-3">
            Gargee's Secret Garden 🌸
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            A garden made only for my forever love 💕
          </p>
        </motion.div>

        {/* Lock icon */}
        <motion.div
          className="w-16 h-16 rounded-full glass flex items-center justify-center"
          style={{
            boxShadow:
              "0 0 30px hsl(330 80% 72% / 0.3), 0 0 60px hsl(270 70% 75% / 0.15)",
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lock className="w-7 h-7 text-secondary" />
        </motion.div>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <motion.div
            animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the secret password..."
              className="w-full px-5 py-4 rounded-2xl text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                border: error
                  ? "1px solid hsl(330 80% 60%)"
                  : "1px solid rgba(255,255,255,0.12)",
                boxShadow: error
                  ? "0 0 20px hsl(330 80% 60% / 0.3)"
                  : "0 0 20px hsl(270 70% 75% / 0.15), inset 0 0 10px hsl(185 80% 68% / 0.05)",
              }}
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm"
                style={{ color: "hsl(330 80% 72%)" }}
              >
                Only for my Gargee... try again 💕
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full py-4 rounded-2xl font-semibold text-base text-primary-foreground transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, hsl(270 70% 65%), hsl(330 60% 65%))",
              boxShadow:
                "0 0 25px hsl(270 70% 65% / 0.4), 0 0 50px hsl(330 60% 65% / 0.2)",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(270 70% 65% / 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Unlock Our Garden ✨
          </motion.button>
        </form>

        {/* Hint */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Hint
        </button>
        <AnimatePresence>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-muted-foreground text-center -mt-4"
            >
              She's such a cutie + a very special number 💕
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
