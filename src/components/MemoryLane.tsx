import { motion } from "framer-motion";

const memories = [
  { year: "The Beginning", title: "A Star is Born", desc: "The universe conspired to create something extraordinary — a soul full of light, love, and endless wonder." },
  { year: "Chapter 1", title: "First Dreams", desc: "She dreamed in colors that hadn't been named yet. Every night brought new worlds, new stories, new possibilities." },
  { year: "Chapter 2", title: "Finding Magic", desc: "In the everyday moments — a sunbeam through curtains, raindrops on glass — she found the extraordinary." },
  { year: "Chapter 3", title: "Spreading Light", desc: "Like stars that shine not for themselves but for the cosmos, she illuminated the lives of everyone around her." },
  { year: "Now", title: "The Dreamscape", desc: "This digital sanctuary stands as a testament — a world where her dreams live on forever, touching hearts across time." },
];

export default function MemoryLane() {
  return (
    <section id="memories" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground text-glow mb-4"
        >
          Memory Lane
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          A journey through moments that sparkle like stardust 💫
        </motion.p>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {memories.map((mem, i) => (
            <motion.div
              key={mem.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 mt-6 z-10 animate-pulse-glow" />
              <div className={`ml-10 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="glass-card hover:scale-[1.02] transition-transform duration-300">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{mem.year}</span>
                  <h3 className="text-lg font-serif font-semibold text-foreground mt-1 mb-2">{mem.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mem.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
