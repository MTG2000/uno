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
  flip?: boolean;
  rotationY?: number;
  playable?: boolean;
}

interface StoreState {
  playerId: string;
  currentPlayer: number;
  direction: 1 | -1;
  tableStack: Card[];
  players: Player[];

  setPlayerId(playerId: string): void;
  init(players: Player[], startingCards: Card[]): void;
  move(card: Card): void;
}

let cardLayoutIdIdx = 111;

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

  init: (players: Player[], startingCards: Card[]) => {
    set({ tableStack: [], direction: 1 });

    // Find my player and re-order
    let playersFinal: Player[] = [];
    let myIdx = 0;
    while (myIdx < players.length) {
      if (players[myIdx].id === get().playerId) break;
      myIdx++;
    }
    for (let i = myIdx; i < players.length; i++) {
      playersFinal.push(players[i]);
    }
    set({ currentPlayer: playersFinal.length });
    for (let i = 0; i < myIdx; i++) {
      playersFinal.push(players[i]);
    }

    //Set Cards for players
    playersFinal[0].cards = startingCards.map((c) => ({
      ...c,
      layoutId: `id_${cardLayoutIdIdx++}`,
      rotationY: 0,
      playable: myIdx === 0,
    }));
    for (let i = 1; i < playersFinal.length; i++) {
      playersFinal[i].cards = Array(startingCards.length)
        .fill(0)
        .map(function () {
          return { layoutId: `id_${cardLayoutIdIdx++}` };
        });
    }
    set({ players: playersFinal });
  },

  move: (card: Card) => {
    const curPlayerObj = get().players[get().currentPlayer];
    set((state) => ({
      currentPlayer: (state.currentPlayer + 1) % state.players.length,
    }));
    let layoutId = card.layoutId;
    let shouldFlip = false;
    if (curPlayerObj.id !== get().playerId) {
      layoutId =
        curPlayerObj.cards[
          Math.floor(Math.random() * curPlayerObj.cards.length)
        ].layoutId;
      shouldFlip = true;
    } else {
      layoutId =
        curPlayerObj.cards[
          Math.floor(Math.random() * curPlayerObj.cards.length)
        ].layoutId;
      const cardToMove = curPlayerObj.cards.filter(
        (c) => c.layoutId === layoutId
      )[0];
      card.color = cardToMove.color;
      card.action = cardToMove.action;
      card.digit = cardToMove.digit;
    }

    set((state) => ({
      tableStack: [
        ...state.tableStack,
        {
          layoutId,
          color: card.color,
          action: card.action,
          digit: card.digit,
          flip: shouldFlip,
          rotationY: 0,
        },
      ],
      players: state.players.map((p) => {
        if (p.id === get().playerId) {
          const myTurn = get().currentPlayer === 0;
          return {
            ...p,
            cards: p.cards
              .filter((c) => c.layoutId !== layoutId)
              .map((c) => ({
                ...c,
                playable: myTurn && canPlayCard(card, c),
              })),
          };
        } else if (p === curPlayerObj) {
          return {
            ...p,
            cards: p.cards.filter((c) => c.layoutId !== layoutId),
          };
        }
        return p;
      }),
    }));
  },
}));

function canPlayCard(oldCard: Card, newCard: Card) {
  if (oldCard.color === newCard.color) return true;
  if (oldCard.digit !== undefined && oldCard.digit === newCard.digit)
    return true;
  if (
    oldCard.action &&
    oldCard.action?.indexOf("draw") !== -1 &&
    newCard.action?.indexOf("draw") !== -1
  )
    return true;

  return false;
}
