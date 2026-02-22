import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

const tracks = [
  { name: "Ethereal Music", icon: "✨", song: "Finding Her — Ethereal", audioSrc: "/audio/finding-her.mp3" },
  { name: "Gentle Rain", icon: "🌧️", song: "Birds of a Feather — Billie Eilish", audioSrc: "/audio/birds-of-a-feather.mp3" },
  { name: "Wind Chimes", icon: "🎐", song: "I Like Me Better — Lauv", audioSrc: "/audio/i-like-me-better.mp3" },
  { name: "Ocean Waves", icon: "🌊", song: "Sharmeeli — Frappe Ash", audioSrc: "/audio/sharmeeli.mp3" },
];

export default function Soundscape() {
  const [active, setActive] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleTrack = (i: number) => {
    if (active === i) {
      // Stop
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActive(null);
    } else {
      // Switch track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(tracks[i].audioSrc);
      audio.loop = true;
      audio.muted = muted;
      audio.play().catch(() => {});
      audioRef.current = audio;
      setActive(i);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <section id="soundscape" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground text-glow mb-4"
        >
          Soundscape
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          Let these sounds carry you deeper into the dream 🎶
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card glow-border-cyan"
        >
          <div className="flex items-center gap-3 mb-6">
            <Music className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-foreground">
              {active !== null ? `${tracks[active].name} — ${tracks[active].song}` : "Select an ambient track"}
            </span>
            <div className="flex-1" />
            <button
              onClick={() => setMuted(!muted)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          <div className="w-full h-1 rounded-full bg-muted mb-6 overflow-hidden">
            {active !== null && (
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 2 }}
              />
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tracks.map((track, i) => (
              <button
                key={track.name}
                onClick={() => toggleTrack(i)}
                className={`glass rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                  active === i ? "glow-border-cyan" : ""
                }`}
              >
                <div className="text-2xl mb-2">{track.icon}</div>
                <div className="text-xs text-muted-foreground">{track.name}</div>
                <div className="text-[10px] text-primary/70 mt-1 truncate">{track.song}</div>
                <div className="mt-2">
                  {active === i ? (
                    <Pause className="h-4 w-4 mx-auto text-accent" />
                  ) : (
                    <Play className="h-4 w-4 mx-auto text-muted-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
