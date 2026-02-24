import StarryBackground from "../components/StarryBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import DreamJournal from "../components/DreamJournal";
import MemoryLane from "../components/MemoryLane";
import HundredReasons from "../components/HundredReasons";
import FutureDreams from "../components/FutureDreams";
import Soundscape from "../components/Soundscape";
import DreamGames from "../components/DreamGames";
import Footer from "../components/Footer";
import LuminaOrb from "../components/LuminaOrb";
import LoadingScreen from "../components/LoadingScreen";
import MusicControls from "../components/MusicControls";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";

const Index = () => (
  <MusicPlayerProvider>
    <div className="relative min-h-screen">
      <LoadingScreen />
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <DreamJournal />
        <MemoryLane />
        <HundredReasons />
        <FutureDreams />
        <Soundscape />
        <DreamGames />
        <Footer />
      </main>
      <LuminaOrb />
      <MusicControls />
    </div>
  </MusicPlayerProvider>
);

export default Index;
