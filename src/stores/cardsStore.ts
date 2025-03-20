import { create } from "zustand";
import { tCardGame } from "../types.ts";

export type tCardStore = {
  cards: tCardGame[];
  actions: {
    setCards: (cards: tCardGame[]) => void;
  };
};

const useCardsStore = create<tCardStore>((set) => ({
  cards: [],
  actions: {
    setCards: (cards: tCardGame[]) => {
      set({ cards });
    },
  },
}));

export const useCards = () => useCardsStore((state) => state.cards);

export const useCardsActions = () => useCardsStore((state) => state.actions);
