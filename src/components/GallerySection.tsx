import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

import gargee1 from "@/assets/gallery/gargee-1.jpg";
import gargee2 from "@/assets/gallery/gargee-2.jpg";
import gargee3 from "@/assets/gallery/gargee-3.jpg";
import gargee4 from "@/assets/gallery/gargee-4.jpg";
import gargee5 from "@/assets/gallery/gargee-5.jpg";


const gargeePhotos = [
  { src: gargee1, title: "Fairy Light Dreams", caption: "Glowing in emerald elegance ✨", h: "h-80" },
  { src: gargee2, title: "Golden Hour", caption: "Warmth that melts the heart 🌅", h: "h-72" },
  { src: gargee3, title: "Carnival Magic", caption: "Pink skies and endless joy 🎀", h: "h-80" },
  { src: gargee4, title: "Sunset Silhouettes", caption: "Cherished moments at the pier 🌊", h: "h-72" },
  { src: gargee5, title: "Together Forever", caption: "Love captured in a smile 💕", h: "h-64" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-foreground text-glow mb-4"
        >
          Dream Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
        >
          Visions from the dreamscape, captured in ethereal light 🌸
        </motion.p>

        {/* Gargee's real photos */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 mb-8">
          {gargeePhotos.map((photo, i) => (
            <motion.div
              key={photo.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`relative group rounded-2xl overflow-hidden ${photo.h} break-inside-avoid`}
            >
              <img src={photo.src} alt={photo.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-background/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <p className="font-serif text-lg text-foreground font-semibold">{photo.title}</p>
                <p className="text-sm text-muted-foreground">{photo.caption}</p>
                <button className="glass-button text-xs flex items-center gap-2 px-4 py-2">
                  <Share2 className="h-3 w-3" /> Share this dream
                </button>
              </div>
              {/* Caption always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity">
                <p className="font-serif text-sm text-foreground font-semibold drop-shadow-lg">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
