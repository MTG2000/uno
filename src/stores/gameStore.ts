import create from "zustand";

interface Player {
  id: string;
  name: string;
  avatar: string;
  cards: Card[];
}

interface Card {
  layoutId: string;
  digit?: number;
  color?: "red" | "blue" | "green" | "yellow" | "black";
  action?: "reverse" | "skip" | "draw two" | "draw four" | "wild";
}

interface StoreState {
  playerId: string;
  currentPlayer: number;
  direction: 1 | -1;
  tableStack: Card[];
  players: Player[];
}

export const useGameStore = create<StoreState>((set, get) => ({
  //   bears: 0,
  //   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 })
  playerId: "",
  currentPlayer: 0,
  direction: 1,
  tableStack: [],
  players: [],

  setPlayerId: (playerId: string) => set({ playerId }),

  init: (players: Player[]) => {
    // Find my player and re-order
    let playersFinal: Player[] = [];
    let myIdx = 0;
    while (myIdx < players.length) {
      if (players[myIdx].id === get().playerId) break;
    }
    for (let i = myIdx; i < players.length; i++) {
      playersFinal.push(players[i]);
    }
    set({ currentPlayer: playersFinal.length });
    for (let i = 0; i < myIdx; i++) {
      playersFinal.push(players[i]);
    }

    set({ tableStack: [], direction: 1 });
  },
}));
