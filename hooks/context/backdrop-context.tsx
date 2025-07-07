'use client';
import { createContext, useContext, useState } from 'react';

interface BackdropContextType {
  backdrop: number;
  handleBackdrop: () => unknown;
}

export const BackdropContext = createContext<BackdropContextType | undefined>(undefined);

export function BackdropContextWrapper({ children }: { children: React.ReactNode }) {
  const [backdrop, setBackdrop] = useState<number>(2);
  const handleBackdrop = () => setBackdrop((prev) => (prev > 7 ? 0 : prev + 2));

  return <BackdropContext.Provider value={{ backdrop, handleBackdrop }}>{children}</BackdropContext.Provider>;
}

export const useBackDrop = () => {
  const context = useContext(BackdropContext);
  if (!context) throw new Error('useBackdrop is not in context');
  return context;
};
