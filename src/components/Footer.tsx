import { Heart, Github, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-4">
      <div className="max-w-4xl mx-auto glass-card text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg text-foreground font-semibold">Gargee's Dreamscape</span>
        </div>
        <p className="text-muted-foreground text-sm mb-6 flex items-center justify-center gap-1">
          Made with infinite love for Gargee <Heart className="h-4 w-4 text-glow-rose inline" /> 💖
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/ShivaOPP/gargee-s-dreamscape"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button px-4 py-2 text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground"
            aria-label="View on GitHub"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Gargee's Dreamscape. All dreams reserved. ✨
        </div>
      </div>
    </footer>
  );
}
