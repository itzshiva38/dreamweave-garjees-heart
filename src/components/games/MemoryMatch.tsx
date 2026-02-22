import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const CARDS_DATA = [
  "🌸 Gargee's smile",
  "✨ Starlight wish",
  "🌙 Moonlit dream",
  "💕 Infinite love",
  "🦋 Butterfly kiss",
  "🌺 Garden bloom",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<{ id: number; value: string; flipped: boolean; matched: boolean }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const doubled = shuffle([...CARDS_DATA, ...CARDS_DATA]).map((value, id) => ({ id, value, flipped: false, matched: false }));
    setCards(doubled);
  }, []);

  const flip = (id: number) => {
    if (selected.length >= 2 || cards[id].flipped || cards[id].matched) return;
    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(next);
    const sel = [...selected, id];
    setSelected(sel);

    if (sel.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = sel;
      if (next[a].value === next[b].value) {
        setTimeout(() => {
          setCards((prev) => {
            const updated = prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c));
            if (updated.every((c) => c.matched)) setWon(true);
            return updated;
          });
          setSelected([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)));
          setSelected([]);
        }, 800);
      }
    }
  };

  const restart = () => {
    setWon(false);
    setMoves(0);
    setSelected([]);
    const doubled = shuffle([...CARDS_DATA, ...CARDS_DATA]).map((value, id) => ({ id, value, flipped: false, matched: false }));
    setCards(doubled);
  };

  const best = parseInt(localStorage.getItem("memory-best") || "999");
  useEffect(() => {
    if (won && moves < best) localStorage.setItem("memory-best", String(moves));
  }, [won, moves, best]);

  return (
    <div className="text-center">
      {won ? (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="py-8">
          <div className="text-4xl mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.span key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: [0, -20, 0], opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.6, repeat: 2 }}>
                <Heart className="inline h-6 w-6 text-glow-rose mx-1" />
              </motion.span>
            ))}
          </div>
          <p className="text-foreground font-serif text-lg mb-2">You remembered her perfectly! 🌸💕</p>
          <p className="text-sm text-muted-foreground mb-4">Completed in {moves} moves (Best: {Math.min(moves, best)})</p>
          <button onClick={restart} className="glass-button glow-border-rose text-sm">Play Again</button>
        </motion.div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">Moves: {moves} | Best: {best < 999 ? best : "—"}</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cards.map((card) => (
              <motion.button
                key={card.id}
                onClick={() => flip(card.id)}
                whileTap={{ scale: 0.95 }}
                className={`glass h-20 sm:h-24 flex items-center justify-center text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  card.matched ? "glow-border-rose opacity-60" : card.flipped ? "glow-border-lavender" : ""
                }`}
              >
                {card.flipped || card.matched ? <span className="text-foreground">{card.value}</span> : <span className="text-2xl">🌙</span>}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
