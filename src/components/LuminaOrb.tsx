import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const CUTE_BUBBLES = [
  "Hi, sweet dreamer! ✨",
  "Lumina is here 🌸",
  "Tell me your dreams 💕",
  "You're magical! 🌙",
];

export default function LuminaOrb() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [bubbleText, setBubbleText] = useState(CUTE_BUBBLES[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleText(CUTE_BUBBLES[Math.floor(Math.random() * CUTE_BUBBLES.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setOpen(true);
        setInput(`Please interpret this dream: ${detail}`);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener("open-lumina", handler);
    return () => window.removeEventListener("open-lumina", handler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // Simple local response since we don't have the Supabase edge function
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "✨ Lumina here! I'm dreaming up thoughts just for you, sweet dreamer. This feature will be fully magical once connected to the cloud! 🌙💕",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-6 z-50 glass rounded-full px-4 py-2 text-xs text-foreground max-w-[160px] text-center pointer-events-none"
          >
            {bubbleText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass glow-border-lavender flex items-center justify-center animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Lumina chat"
      >
        <Sparkles className="h-6 w-6 text-primary" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 z-50 w-[340px] sm:w-[380px] max-h-[500px] glass-card glow-border-lavender flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-serif font-semibold text-foreground">Lumina</div>
                  <div className="text-xs text-muted-foreground">Dream companion ✨</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[300px] pr-1">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  ✨ Hi sweet dreamer! I'm Lumina, Gargee's dream companion. Ask me anything! 💕
                </p>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary/20 text-foreground" : "glass text-foreground"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Tell me your dreams..."
                className="flex-1 bg-transparent border border-[hsl(var(--glass-border))] rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50"
                aria-label="Message Lumina"
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="glass-button px-3 py-2 rounded-full disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
