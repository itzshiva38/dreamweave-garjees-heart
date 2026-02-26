import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Moon, Sun, BookHeart, Flower2, Sparkles } from "lucide-react";
import LoveNotesModal from "./LoveNotesModal";
import GardenFlower from "./GardenFlower";
import GardenFirefly from "./GardenFirefly";

const WATERING_KEY = "garden-watering";

interface WateringData {
  lastDate: string;
  streak: number;
}

const flowerData = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 37 + i * i * 7) % 80),
  y: 25 + ((i * 23 + i * 13) % 55),
  color: ["rose", "lavender", "cyan", "rose", "lavender"][i % 5] as "rose" | "lavender" | "cyan",
  memory: [
    "The first time I saw your smile... 💕",
    "Our late-night talks about everything ✨",
    "The way you laugh at my silly jokes 😄",
    "Dancing together in the kitchen 💃",
    "Watching sunsets side by side 🌅",
    "Your voice saying my name like poetry 🎵",
    "The warmth of your hand in mine 🤝",
    "Our first adventure together 🌍",
    "How you make ordinary days magical ✨",
    "The way you look at me 👀💖",
    "Sharing dreams under the stars 🌟",
    "Your hugs that heal everything 🤗",
    "Building our future, one dream at a time 🏡",
    "Every moment with you is a treasure 💎",
  ][i],
}));

export default function GardenMain() {
  const [nightMode, setNightMode] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [watering, setWatering] = useState<WateringData>({ lastDate: "", streak: 0 });
  const [wateredToday, setWateredToday] = useState(false);
  const [waterAnimation, setWaterAnimation] = useState(false);

  useEffect(() => {
    // Auto night mode after 7 PM
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) setNightMode(true);

    // Load watering data
    const saved = localStorage.getItem(WATERING_KEY);
    if (saved) {
      const data: WateringData = JSON.parse(saved);
      setWatering(data);
      const today = new Date().toDateString();
      if (data.lastDate === today) setWateredToday(true);
    }
  }, []);

  const handleWater = useCallback(() => {
    if (wateredToday) return;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = watering.lastDate === yesterday ? watering.streak + 1 : 1;
    const data = { lastDate: today, streak: newStreak };
    setWatering(data);
    setWateredToday(true);
    setWaterAnimation(true);
    localStorage.setItem(WATERING_KEY, JSON.stringify(data));
    setTimeout(() => setWaterAnimation(false), 2000);
  }, [wateredToday, watering]);

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-1000"
      style={{
        background: nightMode
          ? "radial-gradient(ellipse at 50% 30%, hsl(260 50% 10%), hsl(250 40% 4%))"
          : "radial-gradient(ellipse at 50% 80%, hsl(120 30% 35%), hsl(150 25% 20%), hsl(200 30% 15%))",
      }}
    >
      {/* Sky gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: nightMode
            ? "linear-gradient(to bottom, hsl(260 60% 8%) 0%, hsl(270 40% 12%) 50%, hsl(260 30% 8%) 100%)"
            : "linear-gradient(to bottom, hsl(200 60% 55%) 0%, hsl(180 40% 65%) 30%, hsl(120 30% 40%) 100%)",
        }}
      />

      {/* Stars in night mode */}
      {nightMode && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] transition-colors duration-1000"
        style={{
          background: nightMode
            ? "linear-gradient(to top, hsl(120 20% 8%), hsl(150 20% 12%), transparent)"
            : "linear-gradient(to top, hsl(120 35% 25%), hsl(130 30% 35%), transparent)",
        }}
      />

      {/* Fireflies at night */}
      {nightMode &&
        Array.from({ length: 25 }).map((_, i) => (
          <GardenFirefly key={i} index={i} />
        ))}

      {/* Flowers */}
      {flowerData.map((flower) => (
        <GardenFlower
          key={flower.id}
          flower={flower}
          nightMode={nightMode}
          wateredToday={wateredToday}
        />
      ))}

      {/* Water drops animation */}
      <AnimatePresence>
        {waterAnimation && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-30"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: "10%",
                }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 500, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: "easeIn",
                }}
              >
                <Droplets className="w-4 h-4" style={{ color: "hsl(200 80% 70%)" }} />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="relative z-30 flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Flower2 className="w-6 h-6 text-secondary" />
          <h1 className="text-xl md:text-2xl font-serif dreamscape-glow-text">
            Our Garden 🌸
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Night toggle */}
          <button
            onClick={() => setNightMode(!nightMode)}
            className="glass-button px-3 py-2 flex items-center gap-1.5 text-sm"
          >
            {nightMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Center info */}
      <div className="relative z-20 flex flex-col items-center mt-2 gap-2 px-4">
        <motion.p
          className="text-sm text-muted-foreground text-center glass-card px-4 py-2 !rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {wateredToday ? (
            <>🌸 Day {watering.streak} of watering our love 💧</>
          ) : (
            <>Tap the garden to discover memories, tap 💧 to water!</>
          )}
        </motion.p>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
        {/* Water button */}
        <motion.button
          onClick={handleWater}
          className={`glass-button flex items-center gap-2 text-sm ${wateredToday ? "opacity-60" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={wateredToday}
          style={
            !wateredToday
              ? {
                  boxShadow: "0 0 20px hsl(200 80% 60% / 0.3)",
                }
              : undefined
          }
        >
          <Droplets className="w-4 h-4" style={{ color: "hsl(200 80% 65%)" }} />
          {wateredToday ? "Watered 💕" : "Water 💧"}
        </motion.button>

        {/* Love Notes */}
        <motion.button
          onClick={() => setShowNotes(true)}
          className="glass-button flex items-center gap-2 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: "0 0 20px hsl(330 80% 65% / 0.3)" }}
        >
          <BookHeart className="w-4 h-4 text-secondary" />
          Love Notes
        </motion.button>

        {/* Back to Dreamscape */}
        <motion.a
          href="/"
          className="glass-button flex items-center gap-2 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          Dreamscape
        </motion.a>
      </div>

      <LoveNotesModal open={showNotes} onClose={() => setShowNotes(false)} />
    </div>
  );
}
