import create from "zustand";
import { canPlayCard } from "../BotsServer/BotsServer";
import { wrapMod } from "../utils/helpers";

export interface Player {
  id: string;
  name: string;
  avatar: string;
  cards: Card[];
  isBot?: boolean;
}

export interface Card {
  id?: string;
  layoutId?: string;
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
  direction: number;
  tableStack: Card[];
  drawingStack: Card[];
  players: Player[];

  setPlayerId(playerId: string): void;
  init(players: Player[], startingCards: Card[]): void;
  move(card?: Card, draw?: number, cardsToDraw?: Card[]): void;
}

let cardLayoutIdIdx = 111;

function generateDrawingCards(cnt: number) {
  return Array(cnt)
    .fill(0)
    .map((i) => ({ layoutId: `id_${cardLayoutIdIdx++}` }));
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
  drawingStack: [],

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
    set({ currentPlayer: playersFinal.length % players.length });
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

    set({
      drawingStack: generateDrawingCards(20),
    });
    set({ players: playersFinal });
  },

  move: (card?: Card, draw?: number, cardsToDraw?: Card[]) => {
    const curPlayerObj = get().players[get().currentPlayer];

    if (card?.action === "skip")
      set((state) => ({
        currentPlayer: wrapMod(
          state.currentPlayer + state.direction * 2,
          state.players.length
        ),
      }));
    else if (card?.action === "reverse")
      set((state) => ({
        currentPlayer: wrapMod(
          state.currentPlayer - 1 * state.direction,
          state.players.length
        ),
        direction: -1 * state.direction,
      }));
    else if (card?.action === "wild")
      set((state) => ({
        currentPlayer: state.currentPlayer,
      }));
    else
      set((state) => ({
        currentPlayer: wrapMod(
          state.currentPlayer + state.direction,
          state.players.length
        ),
      }));

    if (draw) {
      set((state) => ({
        players: state.players.map((p) => {
          if (p.id === curPlayerObj.id) {
            let newCards = get().drawingStack.slice(0, draw);
            if (curPlayerObj.id === get().playerId && cardsToDraw) {
              newCards = newCards.map((c, idx) => ({
                ...c,
                ...cardsToDraw[idx],
                rotationY: 0,
              }));
            }
            return {
              ...p,
              cards: p.cards.concat(newCards),
            };
          }
          return p;
        }),
        drawingStack: get()
          .drawingStack.slice(draw)
          .concat(generateDrawingCards(draw)),
      }));
    }

    if (card) {
      let layoutId = card.layoutId;
      let shouldFlip = false;
      if (curPlayerObj.id !== get().playerId) {
        layoutId =
          curPlayerObj.cards[
            Math.floor(Math.random() * curPlayerObj.cards.length)
          ].layoutId;
        shouldFlip = true;
      } else {
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
          if (p === curPlayerObj) {
            return {
              ...p,
              cards: p.cards.filter((c) => c.layoutId !== layoutId),
            };
          }
          return p;
        }),
      }));
    }
    set((state) => ({
      players: state.players.map((p) => {
        if (p.id === get().playerId) {
          const myTurn = get().currentPlayer === 0;

          return {
            ...p,
            cards: p.cards.map((c) => {
              return {
                ...c,
                playable:
                  myTurn &&
                  canPlayCard(get().tableStack[get().tableStack.length - 1], c),
              };
            }),
          };
        }
        return p;
      }),
    }));
  },
}));
