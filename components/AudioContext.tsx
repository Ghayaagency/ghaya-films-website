"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type AudioState = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const AudioCtx = createContext<AudioState | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <AudioCtx.Provider value={{ activeId, setActiveId }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useSharedAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useSharedAudio must be used within AudioProvider");
  return ctx;
}
