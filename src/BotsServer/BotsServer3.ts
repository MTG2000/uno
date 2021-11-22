import data from "./data.json";
import { EventsObject } from "../utils/EventsObject";
import { shuffle, wrapMod } from "../utils/helpers";
import { Card, Player } from "../utils/interfaces";

export interface IMoveEvent {
  curPlayer: number;
  nxtPlayer: number;
  card?: Card;
  draw?: number;
  cardsToDraw?: Card[];
}

export interface IStartEvent {
  cards: Card[];
  players: Player[];
  playerId: string;
}

class BotsServer extends EventsObject {
  players: Player[] = [];
  curPlayer: number = 0;
  direction: 1 | -1 = 1;
  tableStk: Card[] = [];
  drawingStk: Card[] = [];
  sumDrawing: number = 0;
  lastPlayerDrawed: boolean = false;
  playersFinished: number[] = [];

  init() {
    this.players = [];
    this.curPlayer = 0;
    this.direction = 1;
    this.tableStk = [];
    this.drawingStk = [];
    this.sumDrawing = 0;
    this.playersFinished = [];
    this.lastPlayerDrawed = false;
  }

  joinPlayer(player: Player, isBot: boolean = false) {
    this.players.push({
      ...player,
      id: (this.players.length + 1).toString(),
      cards: [],
      isBot,
    });
    if (this.players.length === 4)
      setTimeout(() => {
        this.start();
      }, 1000);
    return this.players.length.toString();
  }

  start() {
    const cards = [...data.cards];
    shuffle(cards);
    shuffle(this.players);
    const NUM_CARDS = 7;
    this.players.forEach((player, idx) => {
      player.cards = cards.slice(
        idx * NUM_CARDS,
        (idx + 1) * NUM_CARDS
      ) as Card[];
    });
    this.drawingStk = cards.slice(
      this.players.length * NUM_CARDS,
      cards.length
    ) as Card[];

    this.fireEvent("start", {
      cards: this.players.filter((p) => !p.isBot)[0].cards,
      playerId: this.players.filter((p) => !p.isBot)[0].id,
      players: this.players.map((p) => ({ ...p, cards: [] })),
    });
  }

  ready() {
    if (this.players[this.curPlayer].isBot) this.moveBot();
  }

  move(draw: boolean, card: Card | null) {
    let moveEventObj: IMoveEvent = { nxtPlayer: 0, curPlayer: 0 };

    if (card && !canPlayCard(this.tableStk[0], card, this.lastPlayerDrawed))
      return false;

    if (draw) {
      let drawCnt = 3;
      if (this.sumDrawing) {
        drawCnt = this.sumDrawing;
        this.sumDrawing = 0;
      }

      moveEventObj.draw = drawCnt;
      if (drawCnt + 1 > this.drawingStk.length) {
        this.drawingStk = shuffle(this.tableStk.slice(5, this.tableStk.length));
        this.tableStk = this.tableStk.slice(0, 5);
      }

      moveEventObj.cardsToDraw = this.drawingStk.slice(0, drawCnt);
      this.players[this.curPlayer].cards = this.drawingStk
        .slice(0, drawCnt)
        .concat(this.players[this.curPlayer].cards);

      this.drawingStk = this.drawingStk.slice(drawCnt, this.drawingStk.length);
      this.lastPlayerDrawed = true;
    }

    let nxtPlayer = this.getNextPlayer(card);

    moveEventObj.curPlayer = this.curPlayer;
    moveEventObj.nxtPlayer = nxtPlayer;

    if (card) {
      if (card.action === "draw two") this.sumDrawing += 2;
      if (card.action === "draw four") this.sumDrawing += 4;

      this.tableStk.unshift(card);
      moveEventObj.card = card;
      this.players[this.curPlayer].cards = this.players[
        this.curPlayer
      ].cards.filter((c) => c.id !== card.id);
      this.lastPlayerDrawed = false;

      // Check if game finished
      if (this.players[this.curPlayer].cards.length === 0)
        this.playersFinished.push(this.curPlayer);
      if (this.playersFinished.length === this.players.length - 1)
        this.finishGame();
    }

    this.curPlayer = nxtPlayer;
    this.fireEvent("move", moveEventObj as IMoveEvent);
    if (this.players[this.curPlayer].isBot) this.moveBot();
  }

  getNextPlayer(card: Card | null) {
    let nxtPlayer = this.curPlayer;

    if (card?.action === "reverse") this.direction *= -1;

    //Move to next player ( if not wild card )
    if (card?.action === "skip")
      nxtPlayer = wrapMod(
        this.curPlayer + 2 * this.direction,
        this.players.length
      );
    else if (card?.action !== "wild")
      nxtPlayer = wrapMod(
        this.curPlayer + 1 * this.direction,
        this.players.length
      );

    //if nxtPlayer is out of the game (no cards left with him)
    while (this.players[nxtPlayer].cards.length === 0) {
      nxtPlayer = wrapMod(nxtPlayer + 1 * this.direction, this.players.length);
    }

    return nxtPlayer;
  }

  moveBot() {
    setTimeout(() => {
      for (let i = 0; i < this.players[this.curPlayer].cards.length; i++) {
        const card = this.players[this.curPlayer].cards[i];

        if (canPlayCard(this.tableStk[0], card, this.lastPlayerDrawed))
          return this.move(false, card);
      }

      return this.move(true, null);
    }, 1500);
  }

  finishGame() {
    this.fireEvent("finish", {
      players: this.playersFinished.map((idx) => this.players[idx]), //return players array in order they finished
    });
  }
}

export function canPlayCard(
  oldCard: Card,
  newCard: Card,
  lastPlayerDrawed?: boolean
) {
  const isOldDawingCard =
    oldCard?.action && oldCard.action.indexOf("draw") !== -1;
  const haveToDraw = isOldDawingCard && !lastPlayerDrawed;
  const isNewDawingCard =
    newCard?.action && newCard.action.indexOf("draw") !== -1;

  //No Card Played Yet
  if (!oldCard) return true;

  if (!haveToDraw && newCard.action === "wild") return true;

  if (newCard.action === "draw four") return true;

  if (oldCard.color === "black" && !haveToDraw) return true;

  if (haveToDraw && isNewDawingCard) return true;

  if (!haveToDraw && oldCard.color === newCard.color) return true;

  if (oldCard.digit !== undefined && oldCard.digit === newCard.digit)
    return true;

  return false;
}
export default BotsServer;
