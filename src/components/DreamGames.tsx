import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, X } from "lucide-react";
import MemoryMatch from "./games/MemoryMatch";
import BubbleClicker from "./games/BubbleClicker";
import StarConstellation from "./games/StarConstellation";
import WhisperQuiz from "./games/WhisperQuiz";
import MelodyGarden from "./games/MelodyGarden";

const games = [
  { id: "memory", title: "Gargee Memory Match", desc: "Flip cards to find matching dreamy pairs", icon: "🧠", glow: "glow-border-lavender", Component: MemoryMatch },
  { id: "bubbles", title: "Dream Bubble Clicker", desc: "Pop floating bubbles to collect dream sparks", icon: "🫧", glow: "glow-border-cyan", Component: BubbleClicker },
  { id: "stars", title: "Star Constellation", desc: "Connect stars to form a heart for Gargee", icon: "⭐", glow: "glow-border-rose", Component: StarConstellation },
  { id: "quiz", title: "Whisper Quiz", desc: "Sweet questions about dreams and love", icon: "💭", glow: "glow-border-lavender", Component: WhisperQuiz },
  { id: "melody", title: "Lumina's Melody Garden", desc: "Click flowers to create ambient melodies", icon: "🌸", glow: "glow-border-cyan", Component: MelodyGarden },
];

export default function DreamGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const ActiveComponent = games.find((g) => g.id === activeGame)?.Component;

  return (
    <section id="games" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground text-glow mb-4"
        >
          Dream Games ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Play, laugh, and make new memories with Gargee 🎮
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {games.map((game, i) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setActiveGame(game.id)}
              className={`glass-card ${game.glow} hover:scale-105 transition-transform duration-300 text-left cursor-pointer`}
            >
              <div className="text-4xl mb-3">{game.icon}</div>
              <h3 className="text-sm font-serif font-semibold text-foreground mb-1">{game.title}</h3>
              <p className="text-xs text-muted-foreground">{game.desc}</p>
              <Gamepad2 className="h-4 w-4 text-primary mt-3" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeGame && ActiveComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card glow-border-lavender"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  {games.find((g) => g.id === activeGame)?.title}
                </h3>
                <button onClick={() => setActiveGame(null)} className="glass-button px-3 py-2 text-sm flex items-center gap-2">
                  <X className="h-4 w-4" /> Back to Dreams
                </button>
              </div>
              <ActiveComponent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
