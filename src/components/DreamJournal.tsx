import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, Trash2, Sparkles } from "lucide-react";

interface DreamEntry {
  id: string;
  text: string;
  date: string;
}

export default function DreamJournal() {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dream-journal");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const save = (updated: DreamEntry[]) => {
    setEntries(updated);
    localStorage.setItem("dream-journal", JSON.stringify(updated));
  };

  const addEntry = () => {
    if (!input.trim()) return;
    const entry: DreamEntry = {
      id: Date.now().toString(),
      text: input.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    save([entry, ...entries]);
    setInput("");
  };

  const deleteEntry = (id: string) => save(entries.filter((e) => e.id !== id));

  const exportEntries = () => {
    const text = entries.map((e) => `[${e.date}]\n${e.text}\n`).join("\n---\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dream-journal.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="journal" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground text-glow mb-4"
        >
          Dream Journal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          Capture your dreams before they fade away 🌙
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card glow-border-lavender mb-8"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your dream, sweet dreamer..."
            className="w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground min-h-[120px] mb-4"
            aria-label="Write your dream"
          />
          <div className="flex flex-wrap gap-3">
            <button onClick={addEntry} className="glass-button glow-border-lavender text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Save Dream
            </button>
            <button
              onClick={() => {
                const event = new CustomEvent("open-lumina", { detail: input });
                window.dispatchEvent(event);
              }}
              className="glass-button glow-border-cyan text-sm flex items-center gap-2"
              disabled={!input.trim()}
            >
              <Sparkles className="h-4 w-4" /> Ask Lumina
            </button>
          </div>
        </motion.div>

        {entries.length > 0 && (
          <div className="flex justify-end mb-4">
            <button onClick={exportEntries} className="glass-button text-xs flex items-center gap-2 px-4 py-2">
              <Download className="h-3 w-3" /> Export All
            </button>
          </div>
        )}

        <div className="space-y-4">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-muted-foreground">{entry.date}</span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  aria-label="Delete dream"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{entry.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
