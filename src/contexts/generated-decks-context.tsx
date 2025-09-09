"use client";

import type { Deck } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface GeneratedDecksContextType {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
}

const GeneratedDecksContext = createContext<GeneratedDecksContextType | undefined>(undefined);

export const GeneratedDecksProvider = ({ children }: { children: ReactNode }) => {
  const [decks, setDecks] = useState<Deck[]>([]);

  return (
    <GeneratedDecksContext.Provider value={{ decks, setDecks }}>
      {children}
    </GeneratedDecksContext.Provider>
  );
};

export const useGeneratedDecks = () => {
  const context = useContext(GeneratedDecksContext);
  if (context === undefined) {
    throw new Error('useGeneratedDecks must be used within a GeneratedDecksProvider');
  }
  return context;
};
