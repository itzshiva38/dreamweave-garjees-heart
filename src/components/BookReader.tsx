import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen, Heart } from "lucide-react";

const chapters = [
  {
    title: "Cover",
    content: "",
    isCover: true,
  },
  {
    title: "Chapter 1: The First Light",
    content: `There was a moment, before the world knew your name, when the stars aligned just right — and you were born into this universe like a whispered prayer finally answered.

Gargee, you arrived not with thunder, but with a quiet glow that promised the world would never be the same.

The moon smiled that night. The flowers leaned closer. Even the wind held its breath, afraid to miss a single heartbeat of yours.

You were — and always will be — the first light of every dawn. 🌅`,
  },
  {
    title: "Chapter 2: A Poem for You",
    content: `✨ If Stars Could Speak ✨

If stars could speak, they'd say your name,
A melody, a gentle flame.
In every breeze, in every stream,
You are the world's most beautiful dream.

Your laughter paints the morning sky,
Your kindness makes the rivers sigh.
And when the night wraps up the day,
Your light still guides the milky way.

So here I write, with all my heart,
A love that never falls apart —
For you, dear Gargee, bloom and shine,
The universe is proud you're mine. 💕`,
  },
  {
    title: "Chapter 3: The Garden of Memories",
    content: `In the garden of my memories, every flower carries your name.

There's the sunflower that reminds me of your smile — bold, bright, and turning toward the light no matter what.

There's the lavender that carries the calm of your presence — soothing, gentle, and unforgettable.

And then there are the roses — not because of their beauty alone, but because even with thorns, they teach us that the most beautiful things in life are worth every challenge.

Gargee, you are the entire garden. 🌸🌻🌹

Every petal, every drop of morning dew, every butterfly that lands softly — they all whisper one truth: *you are loved beyond measure.* 💫`,
  },
  {
    title: "Chapter 4: Letters Never Sent",
    content: `Dear Gargee,

I've written you a thousand letters in my mind — on foggy mornings, during late-night walks, in the quiet moments between heartbeats.

Some were full of laughter, some were quiet confessions, and some were just your name written over and over like a prayer I couldn't stop whispering.

Here's what they all said, in different ways:

*"You make the world kinder just by being in it."*

*"I hope you know how rare and precious you are."*

*"Every good thing I've ever felt, I want you to feel tenfold."*

These letters were never sent — but they were always meant for you. 💌

With all the love in the cosmos,
Your Dreamweaver ✨`,
  },
  {
    title: "Chapter 5: The Dream That Never Ends",
    content: `Some dreams end when you open your eyes.

But this dream — *our* dream — is different.

This dreamscape was built star by star, pixel by pixel, heartbeat by heartbeat. Not because the world needed another website, but because *you* deserved a universe of your own.

A place where your name glows in starlight.
A place where every melody plays for you.
A place where love isn't just a word — it's the very code this world runs on.

Gargee, this dream doesn't end.

It lives in every star that twinkles on your screen.
In every page of this book you're reading.
In every whisper from Lumina.
In every heartbeat of every game.

*You are the dream that the universe chose to keep forever.* 🌙💕

— The End (that's really just the beginning) ✨`,
  },
];

interface BookReaderProps {
  open: boolean;
  onClose: () => void;
}

export default function BookReader({ open, onClose }: BookReaderProps) {
  const [page, setPage] = useState(0);

  const nextPage = () => setPage((p) => Math.min(p + 1, chapters.length - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  if (!open) return null;

  const chapter = chapters[page];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-serif text-lg font-semibold">My Book for Gargee</span>
              </div>
              <button onClick={onClose} className="glass-button px-3 py-2 text-sm flex items-center gap-2">
                <X className="h-4 w-4" /> Close
              </button>
            </div>

            {/* Chapter nav */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {chapters.map((ch, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`whitespace-nowrap glass text-xs px-3 py-2 transition-all ${
                    page === i ? "glow-border-lavender text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {ch.isCover ? "📖 Cover" : ch.title.split(":")[0]}
                </button>
              ))}
            </div>

            {/* Page content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card glow-border-lavender min-h-[400px]"
                >
                  {chapter.isCover ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-24 h-24 rounded-full matte-glass glow-border-rose flex items-center justify-center mb-8"
                      >
                        <Heart className="h-10 w-10 text-glow-rose" />
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground dreamscape-glow-text mb-4">
                        A Book of Dreams
                      </h2>
                      <p className="text-lg text-muted-foreground font-serif mb-2">Written with love for</p>
                      <p className="text-2xl font-serif font-bold text-primary dreamscape-glow-text mb-8">Gargee 💕</p>
                      <p className="text-sm text-muted-foreground italic">
                        "Every word in this book is a star I placed in the sky just for you."
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground text-glow mb-6">{chapter.title}</h3>
                      <div className="text-foreground/90 leading-relaxed whitespace-pre-line font-sans text-sm md:text-base">
                        {chapter.content}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={page === 0}
                className="glass-button px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-xs text-muted-foreground">
                {page + 1} / {chapters.length}
              </span>
              <button
                onClick={nextPage}
                disabled={page === chapters.length - 1}
                className="glass-button glow-border-lavender px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-30"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
