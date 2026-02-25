import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2 } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

interface LyricLine {
  time: number;
  text: string;
}

const RAW_LRC = `[00:00.00][Verse 1]
[00:11.89](Acoustic Guitar strumming, soft ambient wind sounds)
[00:20.04]Kuch to kaho, yeh raatein chup kyun hain?
[00:26.60]In faaslon mein, hum gum kyun hain?
[00:34.26]Woh jo waade kiye thay, barf se pighal gaye
[00:41.50]Haathon se mere, raet sa phisal gaye
[00:47.60]Ab toh bas...
[00:49.27]Khidki pe baitha hoon, shaam dhale
[00:54.82]Teri yaadon ke, deep jale
[01:00.97]O Humnava... kahan kho gaye?
[01:07.68]Hum toh wahin hain, tum kyun so gaye?
[01:14.54]Yeh ishq mera, Jhelum sa behta hai
[01:21.38]Har lehar mein, bas naam tera kehta hai
[01:28.50]O Humnava... sun le zara...
[01:41.24]♪ Instrumental Interlude ♪
[01:59.63]Sookhe patte hain raahon mein bikhre
[02:06.64]Bilkul waise, jaise hum hain nikhre
[02:14.10]Likhta hoon khat, jo jala diye maine
[02:20.76]Woh dard saare, jo chhupa liye maine
[02:26.74]Kya tumhe bhi...
[02:28.74]Kabhi meri yaad aati hai?
[02:33.62]Ya yeh hawa, yun hi laut jaati hai?
[02:40.36]O Humnava... kahan kho gaye?
[02:47.14]Hum toh wahin hain, tum kyun so gaye?
[02:54.00]Yeh ishq mera, Jhelum sa behta hai
[03:00.82]Har lehar mein, bas naam tera kehta hai
[03:09.00]Maana ke manzil, milti nahi sabko
[03:14.56]Par raaste toh, saath chalte thay?
[03:22.26]Kyun mod diya tumne, rukh hawaon ka?
[03:29.12]Kyun tod diya tumne, ghar duaaon ka?
[03:42.65]Humnava...
[03:48.80]Bas tera pata...
[03:56.10]Dhoondta raha...`;

function parseLRC(lrc: string): LyricLine[] {
  const lines: LyricLine[] = [];
  for (const line of lrc.split("\n")) {
    const match = line.match(/^\[(\d{2}):(\d{2})\.(\d{2,3})\](.+)$/);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseInt(match[2]);
      const ms = parseInt(match[3].padEnd(3, "0"));
      const time = min * 60 + sec + ms / 1000;
      const text = match[4].trim();
      if (text) lines.push({ time, text });
    }
  }
  return lines.sort((a, b) => a.time - b.time);
}

const SPECIAL_TRACK = "Shiva's Special Song 💖";

export default function SyncedLyrics() {
  const { isPlaying, trackName, currentTime } = useMusicPlayer();
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lyrics = useMemo(() => parseLRC(RAW_LRC), []);

  const isSpecialSong = trackName === SPECIAL_TRACK;

  useEffect(() => {
    setShow(isSpecialSong && isPlaying);
  }, [isSpecialSong, isPlaying]);

  const currentIndex = useMemo(() => {
    if (!lyrics.length) return -1;
    let idx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, lyrics]);

  // Auto-scroll to current line
  useEffect(() => {
    if (currentIndex < 0 || !containerRef.current) return;
    const el = containerRef.current.querySelector(`[data-lyric="${currentIndex}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentIndex]);

  if (!isSpecialSong) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          className="fixed bottom-24 left-1/2 z-[38] w-[88vw] max-w-sm pointer-events-auto"
          style={{ transform: "translateX(calc(-50% - 40px))" }}
        >
          <div className="glass-card glow-border-rose px-4 py-3 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Music2 className="h-3.5 w-3.5 text-glow-rose" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Lyrics — Kaagaz Ki Naav
              </span>
            </div>
            <div
              ref={containerRef}
              className="h-36 overflow-y-auto scrollbar-hide space-y-1.5 px-1"
              style={{ maskImage: "linear-gradient(transparent, black 15%, black 85%, transparent)" }}
            >
              {lyrics.map((line, i) => {
                const isCurrent = i === currentIndex;
                const isPast = i < currentIndex;
                return (
                  <motion.p
                    key={i}
                    data-lyric={i}
                    animate={isCurrent ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`text-center text-sm font-serif leading-relaxed transition-all duration-300 ${
                      isCurrent
                        ? "text-foreground font-semibold"
                        : isPast
                        ? "text-muted-foreground/50"
                        : "text-muted-foreground/70"
                    }`}
                    style={
                      isCurrent
                        ? {
                            textShadow:
                              "0 0 12px hsl(330 80% 72% / 0.6), 0 0 24px hsl(270 70% 70% / 0.3)",
                          }
                        : undefined
                    }
                  >
                    {line.text}
                  </motion.p>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
