import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { isNullOrUndefined } from "util";
import { canPlayCard } from "../../BotsServer/BotsServer";
import { wrapMod } from "../../utils/helpers";
import { Card, Player } from "../../utils/interfaces";

interface StoreState {
  playerId: string;
  currentPlayer: number;
  nextPlayre: number;
  orderOffset: number;
  direction: number;
  tableStack: Card[];
  drawingStack: Card[];
  players: Player[];
  lastPlayerDrawed: boolean;
}

let cardLayoutIdIdx = 111;

function generateDrawingCards(cnt: number) {
  return Array(cnt)
    .fill(0)
    .map((i) => ({ layoutId: `id_${cardLayoutIdIdx++}` }));
}

const initialState = {
  tableStack: [] as Card[],
  drawingStack: [] as Card[],
} as StoreState;

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerId(state, action: PayloadAction<string>) {
      state.playerId = action.payload;
    },
    init: (
      state,
      action: PayloadAction<{ players: Player[]; cards: Card[] }>
    ) => {
      const { players, cards: startingCards } = action.payload;
      state.direction = 1;
      state.tableStack = [];
      state.lastPlayerDrawed = false;
      state.tableStack = [];

      // Find my player and re-order
      let playersFinal: Player[] = [];
      let myIdx = 0;
      while (myIdx < players.length) {
        if (players[myIdx].id === state.playerId) break;
        myIdx++;
      }

      for (let i = myIdx; i < players.length; i++) {
        playersFinal.push(players[i]);
      }
      state.currentPlayer = playersFinal.length % players.length;
      for (let i = 0; i < myIdx; i++) {
        playersFinal.push(players[i]);
      }

      //Set Cards for players
      let cardsToDistribute: Card[] = startingCards.map((c) => ({
        ...c,
        layoutId: `id_${cardLayoutIdIdx++}`,
        rotationY: 0,
        playable: myIdx === 0,
        forPlayer: 0,
      }));

      for (let i = 1; i < playersFinal.length; i++) {
        cardsToDistribute = cardsToDistribute.concat(
          Array(startingCards.length)
            .fill(0)
            .map(() => ({
              layoutId: `id_${cardLayoutIdIdx++}`,
              forPlayer: i,
            }))
        );
      }
      state.players = playersFinal;
      state.drawingStack = cardsToDistribute.concat(generateDrawingCards(20));
      state.orderOffset = myIdx;
    },

    ready(state) {
      state.players = state.players.map((player, idx) => {
        return {
          ...player,
          cards: state.drawingStack.filter((c) => c.forPlayer === idx),
        };
      });

      state.drawingStack = state.drawingStack.filter((c) =>
        isNullOrUndefined(c.forPlayer)
      );
    },
    moveCard(
      state,
      action: PayloadAction<{
        nextPlayer: number;
        card?: Card;
        draw?: number;
        cardsToDraw?: Card[];
      }>
    ) {
      let { nextPlayer, card, cardsToDraw = [], draw } = action.payload;

      const curPlayerObj = state.players[state.currentPlayer];

      nextPlayer = wrapMod(
        nextPlayer - state.orderOffset,
        state.players.length
      );

      if (card?.action === "reverse") state.direction *= -1;

      if (draw) {
        state.players = state.players.map((p) => {
          if (p.id === curPlayerObj.id) {
            let newCards = state.drawingStack.slice(0, draw);
            if (curPlayerObj.id === state.playerId && cardsToDraw) {
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
        });
        state.drawingStack = state.drawingStack
          .slice(draw)
          .concat(generateDrawingCards(draw));
        state.lastPlayerDrawed = true;
      }

      if (card) {
        let layoutId: string | undefined = "";
        let shouldFlip = false;
        if (curPlayerObj.id !== state.playerId) {
          layoutId =
            curPlayerObj.cards[
              Math.floor(Math.random() * curPlayerObj.cards.length)
            ].layoutId;
          shouldFlip = true;
        } else {
          layoutId = curPlayerObj.cards.find((c) => c.id === card?.id)
            ?.layoutId;
          const cardToMove = curPlayerObj.cards.filter(
            (c) => c.layoutId === layoutId
          )[0];
          console.log(layoutId, current(cardToMove));

          card.color = cardToMove.color;
          card.action = cardToMove.action;
          card.digit = cardToMove.digit;
        }

        state.tableStack = [
          ...state.tableStack.slice(-1),
          {
            layoutId,
            color: card.color,
            action: card.action,
            digit: card.digit,
            flip: shouldFlip,
            rotationY: 0,
          },
        ];
        state.players = state.players.map((p) => {
          if (p === curPlayerObj) {
            return {
              ...p,
              cards: p.cards.filter((c) => c.layoutId !== layoutId),
            };
          }
          return p;
        });
        state.lastPlayerDrawed = false;
      }

      state.nextPlayre = nextPlayer;
    },
    movePlayer(state) {
      state.players = state.players.map((p) => {
        if (p.id === state.playerId) {
          const myTurn = state.nextPlayre === 0;

          return {
            ...p,
            cards: p.cards.map((c) => {
              return {
                ...c,
                playable:
                  myTurn &&
                  canPlayCard(
                    state.tableStack[state.tableStack.length - 1],
                    c,
                    state.lastPlayerDrawed
                  ),
              };
            }),
          };
        }
        return p;
      });
      state.currentPlayer = state.nextPlayre;
    },
  },
});

export const {
  init,
  ready,
  moveCard,
  movePlayer,
  setPlayerId,
} = gameSlice.actions;

export default gameSlice.reducer;
