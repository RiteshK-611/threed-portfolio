"use client";

import { createContext, useContext, useState } from 'react';

const GlowingBallContext = createContext({
  isHovering: false,
  setIsHovering: () => {},
  text: "",
  setText: () => {},
});

export function GlowingBallProvider({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  const [text, setText] = useState("");

  return (
    <GlowingBallContext.Provider value={{ isHovering, setIsHovering, text, setText }}>
      {children}
    </GlowingBallContext.Provider>
  );
}

export function useGlowingBall() {
  const context = useContext(GlowingBallContext);
  if (!context) {
    throw new Error('useGlowingBall must be used within a GlowingBallProvider');
  }
  return context;
}
