import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Pause, Volume2 } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

function formatTime(s: number) {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function MusicControls() {
  const { isPlaying, trackName, artistName, currentTime, duration, volume, setVolume, seek, audioRef } = useMusicPlayer();
  const [visible, setVisible] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  // Show bar when playing
  useEffect(() => {
    if (isPlaying && trackName) {
      setVisible(true);
      resetIdle();
    }
  }, [isPlaying, trackName]);

  // Auto-hide after 6s idle
  const resetIdle = () => {
    clearTimeout(idleTimer.current);
    setVisible(true);
    idleTimer.current = setTimeout(() => setVisible(false), 6000);
  };

  // Fade out when paused for >10s
  useEffect(() => {
    if (!isPlaying && trackName) {
      hideTimer.current = setTimeout(() => setVisible(false), 10000);
      return () => clearTimeout(hideTimer.current);
    }
  }, [isPlaying, trackName]);

  // Mouse/touch shows it
  useEffect(() => {
    const show = () => { if (trackName) resetIdle(); };
    window.addEventListener("mousemove", show, { passive: true });
    window.addEventListener("touchstart", show, { passive: true });
    return () => { window.removeEventListener("mousemove", show); window.removeEventListener("touchstart", show); };
  }, [trackName]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  if (!trackName) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] w-[92vw] max-w-md mr-20"
          style={{ transform: "translateX(calc(-50% - 40px))" }}
          onMouseEnter={resetIdle}
          onClick={resetIdle}
        >
          <div className="glass-card glow-border-rose px-4 py-3 flex flex-col gap-2">
            {/* Top row: play/pause, track info, volume */}
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="relative flex-shrink-0">
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-glow-rose" />
                ) : (
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Heart className="h-5 w-5 text-glow-rose" />
                  </motion.div>
                )}
                {isPlaying && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-glow-rose/40"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{trackName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{artistName}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <div className="relative">
                <button onClick={() => setShowVolume(!showVolume)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Volume2 className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {showVolume && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-8 right-0 glass rounded-xl p-2 w-8 h-24 flex flex-col items-center justify-center"
                    >
                      <input
                        type="range"
                        min={0} max={1} step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-20 accent-primary"
                        style={{ writingMode: "vertical-lr", direction: "rtl", height: "80px", width: "16px" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-1.5 rounded-full bg-muted/50 cursor-pointer overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                seek(pct * duration);
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, hsl(330 80% 72%), hsl(270 70% 70%), hsl(185 80% 65%))",
                }}
                transition={{ duration: 0.1 }}
              />
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "linear-gradient(90deg, hsl(330 80% 72% / 0.15), transparent)" }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
