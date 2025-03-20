import { create } from "zustand";
import { tDifficult } from "../types.ts";
import { incrementValue } from "../utils/incerementValue.ts";

type tStatisticStoreActions = {
  setDifficult: (difficult: tDifficult | null) => void;
  setMove: () => void;
  setRevelatedTiles: () => void;
  setMatchedPairs: () => void;
  setScore: () => void;
  setTime: () => void;
  getTime: (time: number) => string;
  restartGame: () => void;
};

export type tStatisticStore = {
  difficult: tDifficult | null;
  time: number;
  move: number;
  revelatedTiles: number;
  matchedPairs: number;
  score: number;
  actions: tStatisticStoreActions;
};

const useStatisticStore = create<tStatisticStore>((set) => ({
  difficult: null,
  move: 0,
  revelatedTiles: 0,
  matchedPairs: 0,
  score: 0,
  time: 0,
  actions: {
    setDifficult: (difficult: tDifficult | null) =>
      set({ difficult: difficult ?? null }),
    setTime: () =>
      set((prevState: tStatisticStore) => ({ time: prevState.time + 1000 })),
    getTime: (gameTime: number) => {
      const minutes = Math.floor((gameTime / 1000 / 60) % 60);
      const seconds = (gameTime / 1000) % 60;
      return `Time: ${minutes <= 9 ? `0${minutes}` : minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
    },
    setMove: () =>
      set((prevState: tStatisticStore) =>
        incrementValue("move", prevState.move),
      ),
    setRevelatedTiles: () =>
      set((prevState: tStatisticStore) =>
        incrementValue("revelatedTiles", prevState.revelatedTiles),
      ),
    setMatchedPairs: () =>
      set((prevState: tStatisticStore) =>
        incrementValue("matchedPairs", prevState.matchedPairs),
      ),
    setScore: () =>
      set((prevState: tStatisticStore) =>
        incrementValue("score", prevState.score),
      ),
    restartGame: () =>
      set({
        difficult: null,
        move: 0,
        revelatedTiles: 0,
        matchedPairs: 0,
        score: 0,
        time: 0,
      }),
  },
}));

export const useStatistic = () => useStatisticStore((store) => store);

export const useStatisticActions = () =>
  useStatisticStore((state) => state.actions);
