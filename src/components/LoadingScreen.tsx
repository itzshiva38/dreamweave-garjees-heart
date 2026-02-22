import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POETIC_PHRASES = [
  "Weaving dreams for you...",
  "Where love lives forever...",
  "For my Gargee... 💕",
];

// Heart shape points for progress indicator
const HEART_POINTS = [
  { x: 50, y: 90 }, { x: 30, y: 65 }, { x: 15, y: 40 }, { x: 20, y: 20 }, { x: 35, y: 10 },
  { x: 50, y: 25 }, { x: 65, y: 10 }, { x: 80, y: 20 }, { x: 85, y: 40 }, { x: 70, y: 65 },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [orbBloomed, setOrbBloomed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Phrase cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((p) => (p + 1) % POETIC_PHRASES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Orb bloom
  useEffect(() => {
    const t = setTimeout(() => setOrbBloomed(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Exit
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setExiting(true), 300);
      const t2 = setTimeout(() => setVisible(false), 800);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [progress]);

  // Nebula + stars canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Nebula clouds
    const drawNebula = (x: number, y: number, r: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    drawNebula(canvas.width * 0.3, canvas.height * 0.4, 300, "rgba(150, 100, 255, 0.06)");
    drawNebula(canvas.width * 0.7, canvas.height * 0.3, 250, "rgba(255, 100, 180, 0.05)");
    drawNebula(canvas.width * 0.5, canvas.height * 0.7, 280, "rgba(100, 200, 255, 0.04)");

    // Stars
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 0.5;
      const dx = mouseRef.current.x - x;
      const dy = mouseRef.current.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const brightness = dist < 200 ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.4;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 180, 255, ${brightness})`;
      ctx.fill();

      if (size > 1.5) {
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 255, ${brightness * 0.15})`;
        ctx.fill();
      }
    }
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMouse);

    let animId: number;
    const loop = () => { drawCanvas(); animId = requestAnimationFrame(loop); };
    loop();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", handleMouse); };
  }, [drawCanvas]);

  const connectedStars = Math.floor((progress / 100) * HEART_POINTS.length);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "hsl(260, 40%, 8%)" }}
        >
          {/* Nebula canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {/* Floating polaroid photos */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`polaroid-${i}`}
              className="absolute w-16 h-20 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
              style={{ left: `${20 + i * 25}%` }}
              initial={{ y: "120vh", opacity: 0, rotate: -10 + i * 10 }}
              animate={{ y: ["120vh", "30vh", "120vh"], opacity: [0, 0.6, 0], rotate: [-10 + i * 10, 5 + i * 3, -10 + i * 10] }}
              transition={{ duration: 4, delay: 0.3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-14 bg-gradient-to-br from-glow-lavender/20 to-glow-rose/20 rounded-t-lg" />
              <div className="text-[6px] text-center text-white/40 py-1">✨ Gargee ✨</div>
            </motion.div>
          ))}

          {/* Crystal orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={orbBloomed ? { scale: exiting ? [1, 1.3, 0] : 1, opacity: exiting ? [1, 1, 0] : 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: exiting ? 0.5 : 0.8, ease: "easeOut" }}
            className="relative z-10 w-36 h-36 rounded-full flex items-center justify-center mb-8"
          >
            {/* Outer glow rings - lotus petals effect */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute rounded-full border border-white/10"
                style={{
                  width: `${100 + i * 20}%`,
                  height: `${100 + i * 20}%`,
                  background: `radial-gradient(circle, transparent 60%, hsl(270 70% 65% / ${0.08 - i * 0.01}) 100%)`,
                }}
                initial={{ scale: 0, rotate: i * 30 }}
                animate={{ scale: orbBloomed ? 1 : 0, rotate: i * 30 + 360 }}
                transition={{ duration: 2 + i * 0.3, delay: 0.3 + i * 0.1, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* Inner glass orb */}
            <div className="w-full h-full rounded-full matte-glass animate-pulse-glow flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: orbBloomed ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              >
                <div className="text-4xl">💖</div>
                <div className="text-lg font-serif font-bold text-white/90 mt-1" style={{
                  textShadow: "0 0 20px hsl(270 70% 65% / 0.8), 0 0 40px hsl(330 80% 72% / 0.4)"
                }}>
                  G
                </div>
              </motion.div>
            </div>

            {/* Sparkle burst on exit */}
            {exiting && Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute w-1.5 h-1.5 rounded-full bg-white"
                initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 16) * Math.PI * 2) * 120,
                  y: Math.sin((i / 16) * Math.PI * 2) * 120,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          {/* Poetic phrases */}
          <div className="relative z-10 h-10 mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-lg md:text-xl font-serif text-white/80"
                style={{ textShadow: "0 0 20px hsl(270 70% 65% / 0.6)" }}
              >
                {POETIC_PHRASES[phraseIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Heart-shaped progress indicator */}
          <div className="relative z-10 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {HEART_POINTS.map((point, i) => {
                const isLit = i < connectedStars;
                return (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r={isLit ? 3 : 2}
                    fill={isLit ? "hsl(270, 70%, 75%)" : "rgba(255,255,255,0.2)"}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: isLit ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
              {/* Connection lines */}
              {HEART_POINTS.map((point, i) => {
                if (i === 0 || i >= connectedStars) return null;
                const prev = HEART_POINTS[i - 1];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={prev.x} y1={prev.y} x2={point.x} y2={point.y}
                    stroke="hsl(270, 70%, 75%)" strokeWidth="0.8" strokeOpacity={0.6}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }}
                  />
                );
              })}
              {/* Close heart when complete */}
              {connectedStars >= HEART_POINTS.length && (
                <motion.line
                  x1={HEART_POINTS[HEART_POINTS.length - 1].x} y1={HEART_POINTS[HEART_POINTS.length - 1].y}
                  x2={HEART_POINTS[0].x} y2={HEART_POINTS[0].y}
                  stroke="hsl(330, 80%, 72%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
                />
              )}
            </svg>
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-4 text-sm text-white/50 font-sans"
          >
            {progress < 100 ? `${progress}%` : "✨ Ready to dream ✨"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
