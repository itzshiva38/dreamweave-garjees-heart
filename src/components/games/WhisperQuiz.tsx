import { useState } from "react";
import { motion } from "framer-motion";

const QUESTIONS = [
  { q: "What color are the most beautiful dreams?", options: ["Lavender purple 💜", "Rose pink 🌸", "Starlight gold ✨", "All of them! 🌈"], correct: 3 },
  { q: "What does Gargee's laughter sound like?", options: ["Wind chimes 🎐", "A melody 🎶", "Falling stars ⭐", "Pure magic ✨"], correct: 3 },
  { q: "Where do dreams go when you wake up?", options: ["They float in clouds ☁️", "They hide in flowers 🌺", "They live in your heart 💕", "They wait in the moonlight 🌙"], correct: 2 },
  { q: "What's the sweetest moment of the day?", options: ["Sunrise hugs 🌅", "Afternoon giggles 😄", "Stargazing together 🌌", "Every moment with love 💝"], correct: 3 },
  { q: "If love were a season, which would it be?", options: ["Spring — new beginnings 🌱", "Summer — warm & bright ☀️", "Autumn — golden & cozy 🍂", "It's every season 🌸"], correct: 3 },
  { q: "What makes this dreamscape special?", options: ["The stars ⭐", "The music 🎵", "Lumina 🤖", "It was made with love 💖"], correct: 3 },
];

export default function WhisperQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [done, setDone] = useState(false);

  const question = QUESTIONS[current];

  const answer = (idx: number) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
    if (idx === question.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 >= QUESTIONS.length) {
        setDone(true);
        const prev = parseInt(localStorage.getItem("quiz-best") || "0");
        const final = score + (idx === question.correct ? 1 : 0);
        if (final > prev) localStorage.setItem("quiz-best", String(final));
      } else {
        setCurrent((c) => c + 1);
        setAnswered(false);
        setSelectedIdx(-1);
      }
    }, 1000);
  };

  const restart = () => { setCurrent(0); setScore(0); setAnswered(false); setSelectedIdx(-1); setDone(false); };

  const perfect = score === QUESTIONS.length;

  if (done) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
        {perfect && (
          <div className="mb-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.span key={i} className="inline-block text-xl mx-0.5" initial={{ y: 0, opacity: 0 }} animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }} transition={{ delay: i * 0.08, duration: 1 }}>🎉</motion.span>
            ))}
          </div>
        )}
        <p className="text-xl font-serif text-foreground mb-2">
          {perfect ? "Perfect! Lumina gives you the warmest hug! 🤗💕" : `You got ${score}/${QUESTIONS.length}!`}
        </p>
        <p className="text-sm text-muted-foreground mb-4">{perfect ? "You know love better than anyone ✨" : "Every answer was beautiful 🌸"}</p>
        <button onClick={restart} className="glass-button glow-border-lavender text-sm">Play Again</button>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground mb-4">Question {current + 1} of {QUESTIONS.length} | Score: {score}</p>
      <motion.p key={current} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-lg font-serif text-foreground mb-6">{question.q}</motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, idx) => (
          <motion.button key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            onClick={() => answer(idx)}
            className={`glass p-4 text-sm text-left transition-all duration-300 cursor-pointer ${
              answered && idx === question.correct ? "glow-border-cyan" : answered && idx === selectedIdx ? "glow-border-rose opacity-60" : "hover:scale-105"
            }`}
          >{opt}</motion.button>
        ))}
      </div>
    </div>
  );
}
