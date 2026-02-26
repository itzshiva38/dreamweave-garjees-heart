import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Lock } from "lucide-react";

const NOTES_AUTH_KEY = "garden-notes-unlocked";
const CORRECT_PASSWORD = "iloveyou";

const loveNotes = [
  { title: "Chapter 1: The Beginning", content: "From the moment I first saw you, I knew my life would never be the same. You walked into my world like a poem I'd been waiting to hear. Every word, every glance, every quiet moment became a verse in the most beautiful story ever written — ours." },
  { title: "Chapter 2: Your Smile", content: "Your smile is my sunrise. It doesn't just light up the room — it lights up my entire life. When things get hard, I close my eyes and picture your face, and suddenly everything feels possible again. You are my calm, my courage, my everything." },
  { title: "Chapter 3: Our Adventures", content: "Every adventure with you, no matter how small, becomes a treasure in my heart. From spontaneous walks to late-night conversations that make time disappear — you turn ordinary moments into the most extraordinary memories." },
  { title: "Chapter 4: Your Strength", content: "You are the strongest person I know, even when you don't see it yourself. The way you face challenges, the way you love, the way you care — it inspires me every single day. I'm so proud to stand beside you." },
  { title: "Chapter 5: Forever", content: "If forever has a face, it looks like yours. If forever has a sound, it's your laughter. If forever has a feeling, it's your hand in mine. I don't just want to love you today — I want to love you for every single tomorrow that follows." },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoveNotesModal({ open, onClose }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(NOTES_AUTH_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setUnlocked(true);
      localStorage.setItem(NOTES_AUTH_KEY, "true");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto glass-card p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              boxShadow: "0 0 40px hsl(330 80% 72% / 0.2), 0 0 80px hsl(270 70% 75% / 0.1)",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!unlocked ? (
              /* Password gate */
              <div className="flex flex-col items-center gap-5 py-6">
                <Lock className="w-10 h-10 text-secondary" />
                <h2 className="text-xl font-serif dreamscape-glow-text text-center">
                  This book is very special...
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  Only for our eyes 💕
                </p>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                  <motion.div animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the magic words..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        backdropFilter: "blur(12px)",
                        border: error
                          ? "1px solid hsl(330 80% 60%)"
                          : "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-xs"
                        style={{ color: "hsl(330 80% 72%)" }}
                      >
                        Only for you and me, my love 💖
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-medium text-sm text-primary-foreground"
                    style={{
                      background: "linear-gradient(135deg, hsl(330 60% 60%), hsl(270 70% 65%))",
                      boxShadow: "0 0 20px hsl(330 60% 60% / 0.3)",
                    }}
                  >
                    Open Our Book 💖
                  </button>
                </form>
              </div>
            ) : (
              /* Love Notes content */
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <h2 className="text-2xl font-serif dreamscape-glow-text mb-1">
                    Our Secret Love Notes 💌
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Pages written with all my heart
                  </p>
                </div>

                {loveNotes.map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="glass p-5 !rounded-2xl"
                    style={{
                      boxShadow: `0 0 15px hsl(${330 + i * 20} 60% 65% / 0.15)`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Heart
                        className="w-4 h-4 fill-current"
                        style={{ color: "hsl(330 80% 72%)" }}
                      />
                      <h3 className="font-serif text-sm font-semibold text-foreground">
                        {note.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {note.content}
                    </p>
                  </motion.div>
                ))}

                <p className="text-center text-xs text-muted-foreground mt-2">
                  More chapters coming soon... as our story continues 💕
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
