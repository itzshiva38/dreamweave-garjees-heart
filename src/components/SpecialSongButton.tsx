import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Pause } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

export default function SpecialSongButton() {
  const [playing, setPlaying] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const firstPlayRef = useRef(true);
  const player = useMusicPlayer();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        player.stop();
      }
    };
  }, []);

  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
      player.pause();
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio("/audio/kaagaz-ki-naav.mp3");
        audioRef.current.loop = true;
        audioRef.current.addEventListener("ended", () => { setPlaying(false); player.stop(); });
        // Sync with floating controls
        audioRef.current.addEventListener("pause", () => { setPlaying(false); player.pause(); });
        audioRef.current.addEventListener("play", () => {
          setPlaying(true);
          player.play("Shiva's Special Song 💖", "Kaagaz Ki Naav — Paper Boat", audioRef.current!);
        });
      }
      audioRef.current.play().catch(() => {});
      setPlaying(true);
      player.play("Shiva's Special Song 💖", "Kaagaz Ki Naav — Paper Boat", audioRef.current);

      if (firstPlayRef.current) {
        firstPlayRef.current = false;
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1500);
      }
    }
  };

  return (
    <div className="relative inline-flex">
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative glass-button text-foreground flex items-center justify-center gap-2 px-5 py-3 overflow-hidden"
        style={{
          boxShadow: playing
            ? "0 0 20px hsl(330 80% 72% / 0.4), 0 0 40px hsl(270 70% 65% / 0.25), 0 0 60px hsl(190 80% 65% / 0.15)"
            : "0 0 12px hsl(330 80% 72% / 0.25), 0 0 24px hsl(270 70% 65% / 0.15)",
          border: "1px solid hsl(330 80% 72% / 0.3)",
        }}
      >
        <span className="absolute inset-0 rounded-xl opacity-30" style={{
          background: "radial-gradient(ellipse at center, hsl(330 80% 72% / 0.2), hsl(270 70% 65% / 0.1), transparent 70%)",
        }} />

        {playing ? (
          <Pause className="h-4 w-4 text-glow-rose" />
        ) : (
          <motion.span
            animate={playing ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="h-4 w-4 text-glow-rose" />
          </motion.span>
        )}
        <span className="relative z-10 text-sm font-medium">
          {playing ? "Playing Shiva's Song 💖" : "Play Shiva's Special Song for Gargee 💖"}
        </span>

        {playing && (
          <motion.span
            className="absolute inset-0 rounded-xl border border-glow-rose/30"
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {showParticles && Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-sm pointer-events-none"
            initial={{ opacity: 1, x: 0, y: 0, left: "50%", top: "50%" }}
            animate={{
              opacity: 0,
              x: Math.cos((i / 10) * Math.PI * 2) * 60,
              y: Math.sin((i / 10) * Math.PI * 2) * 60,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            💖
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
