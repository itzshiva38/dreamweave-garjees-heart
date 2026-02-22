import { motion } from "framer-motion";
import { Star, Heart, Sparkles } from "lucide-react";

const cards = [
  {
    icon: Star,
    title: "A Radiant Soul",
    text: "Gargee lights up every room she enters — a warmth that wraps around your heart and never lets go. Her laughter is a melody, her presence a gift.",
    glow: "glow-border-lavender",
  },
  {
    icon: Heart,
    title: "Boundless Love",
    text: "With a heart as vast as the cosmos, Gargee pours love into everything she touches. She sees the beauty in the smallest moments and shares it freely.",
    glow: "glow-border-rose",
  },
  {
    icon: Sparkles,
    title: "Infinite Dreams",
    text: "This dreamscape is a tribute — a digital sanctuary where every star twinkles for her, every color blooms in her honor. A world made of love.",
    glow: "glow-border-cyan",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground text-glow mb-4"
        >
          About the Dream
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Every dream has a story. This one was born from love. 💫
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`glass-card ${card.glow} hover:scale-105 transition-transform duration-300`}
            >
              <card.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
