import data from "../api/data.json";
import { Card, Player } from "../stores/gameStore";
import { EventsObject } from "../utils/EventsObject";
import { shuffle, wrapMod } from "../utils/helpers";

export interface IMoveEvent {
  curPlayer: number;
  card?: Card;
  draw?: number;
  cardsToDraw?: Card[];
}

export interface IStartEvent {
  cards: Card[];
  players: Player[];
  playerId: string;
}

class _BotsServer extends EventsObject {
  players: Player[] = [];
  curPlayer: number = 0;
  direction: 1 | -1 = 1;
  tableStk: Card[] = [];
  drawingStk: Card[] = [];
  sumDrawing: number = 0;
  lastPlayerDrawed: boolean = false;

  init() {
    this.players = [];
    this.curPlayer = 0;
    this.direction = 1;
    this.tableStk = [];
    this.drawingStk = [];
    this.sumDrawing = 0;
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
    this.players.forEach((player, idx) => {
      player.cards = cards.slice(idx * 7, (idx + 1) * 7) as Card[];
    });
    this.drawingStk = cards.slice(
      this.players.length * 7,
      cards.length
    ) as Card[];

    this.fireEvent("start", {
      cards: this.players.filter((p) => !p.isBot)[0].cards,
      playerId: this.players.filter((p) => !p.isBot)[0].id,
      players: this.players.map((p) => ({ ...p, cards: [] })),
    });

    if (this.players[this.curPlayer].isBot) this.moveBot();
  }

  move(draw: boolean, card: Card | null) {
    let moveEventObj: IMoveEvent = {
      curPlayer: 0,
    };

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

    if (card && !canPlayCard(this.tableStk[0], card, this.lastPlayerDrawed))
      return false;

    if (card?.action === "reverse") this.direction *= -1;

    let nxtPlayer = this.curPlayer;
    //Move to next player ( if not wild card )
    if (card?.action === "skip")
      nxtPlayer = wrapMod(
        this.curPlayer + 2 * this.direction,
        this.players.length
      );
    else if (card?.action !== "wild") {
      nxtPlayer = wrapMod(
        this.curPlayer + 1 * this.direction,
        this.players.length
      );
      console.log("Updated %d", this.curPlayer);
    }

    moveEventObj.curPlayer = nxtPlayer;

    if (card?.action === "draw two") this.sumDrawing += 2;
    if (card?.action === "draw four") this.sumDrawing += 4;

    if (card) {
      this.tableStk.unshift(card);
      moveEventObj.card = card;
      this.players[this.curPlayer].cards = this.players[
        this.curPlayer
      ].cards.filter((c) => c.id !== card.id);
      this.lastPlayerDrawed = false;
    }

    this.curPlayer = nxtPlayer;
    this.fireEvent("move", moveEventObj as IMoveEvent);
    if (this.players[this.curPlayer].isBot) this.moveBot(); //HANDLE INFINTE STACK
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
}

export function canPlayCard(
  oldCard: Card,
  newCard: Card,
  lastPlayerDrawed?: boolean
) {
  //No Card Played Yet
  if (!oldCard) return true;

  //   Old card is wild
  if (oldCard.action === "wild" || newCard.color === "black") return true;

  if (oldCard.action === "draw four" && lastPlayerDrawed) return true;

  // Old Card is Drawing Card and New Card is Drawing
  if (
    oldCard.action &&
    oldCard.action.indexOf("draw") !== -1 &&
    newCard.action &&
    newCard.action.indexOf("draw") !== -1
  )
    return true;

  //   Same Colors But old is not draw
  if (
    (!oldCard.action ||
      (oldCard.action && oldCard.action.indexOf("draw") === -1) ||
      lastPlayerDrawed) &&
    oldCard.color === newCard.color
  )
    return true;

  //   Same Digit
  if (oldCard.digit !== undefined && oldCard.digit === newCard.digit)
    return true;

  return false;
}

const BotsServer = new _BotsServer();
export default BotsServer;
