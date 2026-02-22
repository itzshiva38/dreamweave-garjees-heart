import StarryBackground from "../components/StarryBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import DreamJournal from "../components/DreamJournal";
import MemoryLane from "../components/MemoryLane";
import Soundscape from "../components/Soundscape";
import DreamGames from "../components/DreamGames";
import Footer from "../components/Footer";
import LuminaOrb from "../components/LuminaOrb";
import LoadingScreen from "../components/LoadingScreen";

const Index = () => (
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
      <Soundscape />
      <DreamGames />
      <Footer />
    </main>
    <LuminaOrb />
  </div>
);

export default Index;
