import { createContext, useContext, useState, useRef, useCallback, ReactNode } from "react";

interface MusicPlayerState {
  isPlaying: boolean;
  trackName: string;
  artistName: string;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  volume: number;
  play: (name: string, artist: string, audio: HTMLAudioElement) => void;
  pause: () => void;
  stop: () => void;
  setVolume: (v: number) => void;
  seek: (t: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerState | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const play = useCallback((name: string, artist: string, audio: HTMLAudioElement) => {
    audioRef.current = audio;
    setTrackName(name);
    setArtistName(artist);
    setIsPlaying(true);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setTrackName("");
    setArtistName("");
    cancelAnimationFrame(rafRef.current);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const seek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
  }, []);

  return (
    <MusicPlayerContext.Provider value={{ isPlaying, trackName, artistName, audioRef, currentTime, duration, volume, play, pause, stop, setVolume, seek }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) throw new Error("useMusicPlayer must be inside MusicPlayerProvider");
  return ctx;
}
