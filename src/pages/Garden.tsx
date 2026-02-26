import { useState, useEffect } from "react";
import GardenPasswordGate from "@/components/garden/GardenPasswordGate";
import GardenMain from "@/components/garden/GardenMain";

const GARDEN_AUTH_KEY = "gargee-garden-unlocked";

export default function Garden() {
  const [unlocked, setUnlocked] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(GARDEN_AUTH_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setFadeOut(true);
    localStorage.setItem(GARDEN_AUTH_KEY, "true");
    setTimeout(() => setUnlocked(true), 700);
  };

  if (unlocked) return <GardenMain />;

  return <GardenPasswordGate onUnlock={handleUnlock} fadeOut={fadeOut} />;
}
