import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, BookOpen } from "lucide-react";
import BookReader from "./BookReader";
import SpecialSongButton from "./SpecialSongButton";

export default function HeroSection() {
  const title = "Gargee's Dreamscape";
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-3xl mx-auto">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-32 left-10 w-20 h-20 rounded-full bg-glow-lavender/10 blur-2xl"
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-10 w-28 h-28 rounded-full bg-glow-rose/10 blur-2xl"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-glow-cyan/10 blur-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Avatar orb */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 w-32 h-32 rounded-full glass glow-border-lavender flex items-center justify-center"
        >
          <Heart className="h-12 w-12 text-glow-rose animate-pulse-glow" style={{ animationDuration: "3s" }} />
        </motion.div>

        {/* Glow title with stagger animation */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 overflow-hidden dreamscape-glow-text">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 + i * 0.03, duration: 0.3, ease: "easeOut" }}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground text-glow-sm mb-10"
        >
          A world where dreams bloom forever ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="glass-button glow-border-lavender text-foreground flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Enter the Dream
          </a>
          <a
            href="#journal"
            className="glass-button glow-border-rose text-foreground flex items-center justify-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Meet Lumina
          </a>
          <button
            onClick={() => setBookOpen(true)}
            className="glass-button glow-border-cyan text-foreground flex items-center justify-center gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Read My Book for Gargee 📖
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.7 }}
          className="mt-6 flex justify-center"
        >
          <SpecialSongButton />
        </motion.div>
      </div>

      <BookReader open={bookOpen} onClose={() => setBookOpen(false)} />
    </section>
  );
}
