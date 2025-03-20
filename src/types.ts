import { tStatisticStore } from "./stores/statisticStore.ts";

export type tCard = {
  name: string;
  img: string;
};

export type tCardGame = tCard & {
  id: number | null;
  isOpen: boolean;
};

export type tLocalStorageGameHistory = Omit<
  tStatisticStore,
  "actions" | "time" | "difficult"
> & {
  game_time: string;
  game_data: string;
  difficult_game: string;
};

export type tDifficult = {
  value: number;
  text: string;
};
