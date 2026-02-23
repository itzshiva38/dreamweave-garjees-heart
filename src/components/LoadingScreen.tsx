import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POETIC_PHRASES = [
  "Weaving dreams for you...",
  "Painting stars across the sky...",
  "Where love lives forever...",
  "Every heartbeat whispers your name...",
  "For my Gargee... 💕",
];

const HEART_POINTS = [
  { x: 50, y: 90 }, { x: 30, y: 65 }, { x: 15, y: 40 }, { x: 20, y: 20 }, { x: 35, y: 10 },
  { x: 50, y: 25 }, { x: 65, y: 10 }, { x: 80, y: 20 }, { x: 85, y: 40 }, { x: 70, y: 65 },
];

// Sparkle particle component
function Sparkle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: x,
        top: y,
        background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(200,180,255,0.4))",
        boxShadow: "0 0 6px 2px rgba(200,180,255,0.5)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.6, 1, 0],
        scale: [0, 1.2, 0.8, 1, 0],
      }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [orbBloomed, setOrbBloomed] = useState(false);
  const [phase, setPhase] = useState<"loading" | "zoomIn" | "fadeOut" | "done">("loading");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Slower progress (~2.5s total)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 1.6;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Phrase cycling every ~500ms for smooth reading
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((p) => (p + 1) % POETIC_PHRASES.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Slower orb bloom
  useEffect(() => {
    const t = setTimeout(() => setOrbBloomed(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Exit sequence: zoomIn → fadeOut → done
  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      const t1 = setTimeout(() => setPhase("zoomIn"), 200);
      const t2 = setTimeout(() => setPhase("fadeOut"), 600);
      const t3 = setTimeout(() => { setPhase("done"); setVisible(false); }, 1300);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [progress, phase]);

  // Nebula + stars canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawNebula = (x: number, y: number, r: number, color: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    // Dreamier nebula colors - more rose/lavender/cyan
    drawNebula(canvas.width * 0.25, canvas.height * 0.35, 350, "rgba(180, 120, 255, 0.08)");
    drawNebula(canvas.width * 0.75, canvas.height * 0.25, 300, "rgba(255, 130, 200, 0.07)");
    drawNebula(canvas.width * 0.5, canvas.height * 0.7, 320, "rgba(120, 220, 255, 0.06)");
    drawNebula(canvas.width * 0.6, canvas.height * 0.5, 200, "rgba(255, 180, 220, 0.05)");

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 0.5;
      const dx = mouseRef.current.x - x;
      const dy = mouseRef.current.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const brightness = dist < 200 ? 0.8 + Math.random() * 0.2 : 0.3 + Math.random() * 0.4;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210, 190, 255, ${brightness})`;
      ctx.fill();

      if (size > 1.3) {
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 190, 255, ${brightness * 0.12})`;
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

  const connectedStars = Math.floor((Math.min(progress, 100) / 100) * HEART_POINTS.length);

  // Compute animation state for the wrapper
  const getWrapperAnimate = () => {
    if (phase === "zoomIn") return { opacity: 1, scale: 1.15, filter: "blur(1px)" };
    if (phase === "fadeOut") return { opacity: 0, scale: 1.15, y: -30, filter: "blur(8px)" };
    return { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 };
  };

  const getWrapperTransition = () => {
    if (phase === "zoomIn") return { duration: 0.4, ease: "easeInOut" as const };
    if (phase === "fadeOut") return { duration: 0.7, ease: "easeInOut" as const };
    return { duration: 0.3, ease: "easeInOut" as const };
  };

  // Sparkle positions around the orb area
  const sparkles = [
    { x: "42%", y: "32%", delay: 0 },
    { x: "58%", y: "28%", delay: 0.3 },
    { x: "38%", y: "42%", delay: 0.6 },
    { x: "62%", y: "38%", delay: 0.9 },
    { x: "45%", y: "24%", delay: 1.2 },
    { x: "55%", y: "46%", delay: 0.4 },
    { x: "35%", y: "35%", delay: 1.5 },
    { x: "65%", y: "30%", delay: 0.7 },
    { x: "50%", y: "20%", delay: 1.0 },
    { x: "48%", y: "50%", delay: 1.3 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={getWrapperAnimate()}
          transition={getWrapperTransition()}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(260, 40%, 7%), hsl(280, 35%, 10%), hsl(260, 40%, 7%))" }}
        >
          {/* Nebula canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {/* Sparkle particles */}
          {sparkles.map((s, i) => (
            <Sparkle key={`sparkle-${i}`} delay={s.delay} x={s.x} y={s.y} />
          ))}

          {/* Floating polaroid photos */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`polaroid-${i}`}
              className="absolute w-16 h-20 rounded-lg border backdrop-blur-sm"
              style={{
                left: `${20 + i * 25}%`,
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.12)",
                boxShadow: "0 0 20px rgba(180,130,255,0.15)",
              }}
              initial={{ y: "120vh", opacity: 0, rotate: -10 + i * 10 }}
              animate={{ y: ["120vh", "30vh", "120vh"], opacity: [0, 0.7, 0], rotate: [-10 + i * 10, 5 + i * 3, -10 + i * 10] }}
              transition={{ duration: 4.5, delay: 0.3 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-14 rounded-t-lg" style={{ background: "linear-gradient(135deg, rgba(180,130,255,0.25), rgba(255,130,200,0.2))" }} />
              <div className="text-[6px] text-center text-white/50 py-1">✨ Gargee ✨</div>
            </motion.div>
          ))}

          {/* Crystal orb - slower bloom */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={orbBloomed
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 w-36 h-36 rounded-full flex items-center justify-center mb-8"
          >
            {/* Lotus petal glow rings */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${100 + i * 22}%`,
                  height: `${100 + i * 22}%`,
                  border: `1px solid rgba(255,255,255,${0.08 - i * 0.01})`,
                  background: `radial-gradient(circle, transparent 60%, hsl(${270 + i * 10} 70% 65% / ${0.1 - i * 0.012}) 100%)`,
                }}
                initial={{ scale: 0, rotate: i * 30 }}
                animate={{ scale: orbBloomed ? 1 : 0, rotate: i * 30 + 360 }}
                transition={{ duration: 3 + i * 0.4, delay: 0.5 + i * 0.15, repeat: Infinity, ease: "linear" }}
              />
            ))}

            {/* Inner glass orb */}
            <div
              className="w-full h-full rounded-full animate-pulse-glow flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 40px rgba(180,130,255,0.3), inset 0 0 30px rgba(255,130,200,0.1)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: orbBloomed ? 1 : 0 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              >
                <div className="text-4xl">💖</div>
                <div className="text-lg font-serif font-bold text-white/90 mt-1" style={{
                  textShadow: "0 0 20px hsl(270 70% 65% / 0.8), 0 0 40px hsl(330 80% 72% / 0.5), 0 0 60px hsl(185 80% 68% / 0.3)"
                }}>
                  G
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Poetic phrases */}
          <div className="relative z-10 h-12 mb-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIdx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-lg md:text-xl font-serif text-white/85 text-center px-4"
                style={{
                  textShadow: "0 0 20px hsl(270 70% 65% / 0.7), 0 0 40px hsl(330 80% 72% / 0.3)"
                }}
              >
                {POETIC_PHRASES[phraseIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Heart-shaped progress indicator */}
          <div className="relative z-10 w-28 h-28">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {HEART_POINTS.map((point, i) => {
                const isLit = i < connectedStars;
                return (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r={isLit ? 3 : 2}
                    fill={isLit ? "hsl(270, 70%, 78%)" : "rgba(255,255,255,0.15)"}
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: isLit ? 1 : 0.25 }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
              {HEART_POINTS.map((point, i) => {
                if (i === 0 || i >= connectedStars) return null;
                const prev = HEART_POINTS[i - 1];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={prev.x} y1={prev.y} x2={point.x} y2={point.y}
                    stroke="hsl(270, 70%, 78%)" strokeWidth="0.8" strokeOpacity={0.5}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }}
                  />
                );
              })}
              {connectedStars >= HEART_POINTS.length && (
                <motion.line
                  x1={HEART_POINTS[HEART_POINTS.length - 1].x} y1={HEART_POINTS[HEART_POINTS.length - 1].y}
                  x2={HEART_POINTS[0].x} y2={HEART_POINTS[0].y}
                  stroke="hsl(330, 80%, 75%)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }}
                />
              )}
            </svg>
          </div>

          {/* Progress text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-3 text-sm text-white/45 font-sans tracking-wide"
          >
            {progress < 100 ? `${Math.min(Math.floor(progress), 100)}%` : "✨ Ready to dream ✨"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
