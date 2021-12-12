import { EventsObject } from "../utils/EventsObject";
import { shuffle, wrapMod } from "../utils/helpers";
import { Card, Player } from "../utils/interfaces";
import data from "./data.json";

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

export default class BotsServer extends EventsObject {
  players: Player[] = [];
  curPlayer = 0;
  direction = 1;
  tableStk: Card[] = [];
  drawingStk: Card[] = [];
  sumDrawing = 0;
  lastPlayerDrew = false;
  playersFinished: number[] = [];
  gameRunning = false;
  numberOfPlayers = 4;

  botTimeout = null;

  constructor(numberOfPlayers = 4) {
    super();
    this.numberOfPlayers = numberOfPlayers;
  }

  init() {
    this.players = [];
    this.curPlayer = 0;
    this.direction = 1;
    this.tableStk = [];
    this.drawingStk = [];
    this.sumDrawing = 0;
    this.playersFinished = [];
    this.lastPlayerDrew = false;
    this.gameRunning = false;
  }

  joinPlayer(player: Player) {
    const playerId = this.players.length.toString();

    this.players.push({
      ...player,
      id: playerId,
      cards: [],
    });

    return playerId;
  }

  addBots() {
    const numToAdd = this.numberOfPlayers - this.players.length;
    for (let i = 0; i < numToAdd; i++) {
      const bot = data.players[i];
      const playerId = this.players.length.toString();
      this.players.push({
        ...bot,
        id: playerId,
        cards: [],
        isBot: true,
      });
    }
    this.fireEvent("players-changed", this.players);
    if (this.players.length === this.numberOfPlayers)
      setTimeout(() => {
        this.start();
      }, 1000);
  }

  start() {
    const cards = [...data.cards] as Card[];
    shuffle(cards);
    shuffle(this.players);
    const NUM_CARDS = 7;
    this.players.forEach((player, idx) => {
      player.cards = cards.slice(idx * NUM_CARDS, (idx + 1) * NUM_CARDS);
    });
    this.drawingStk = cards.slice(
      this.players.length * NUM_CARDS,
      cards.length
    );

    this.fireEvent("game-init", {
      cards: this.players.find((p) => !p.isBot)?.cards,
      players: this.players.map((p) => ({ ...p, cards: [] })),
    });
  }

  ready() {
    if (this.players[this.curPlayer].isBot) this.moveBot();
  }

  move(draw: boolean | null, cardId: string | null) {
    let moveEventObj: IMoveEvent = { nxtPlayer: 0, curPlayer: 0 };
    let card: Card | undefined;

    if (cardId) card = getCardById(cardId) as Card;

    if (card && !canPlayCard(this.tableStk[0], card, this.lastPlayerDrew))
      return false;

    if (draw) {
      let drawCnt = 1;
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
      this.lastPlayerDrew = true;
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
      ].cards.filter((c) => c.id !== card?.id);
      this.lastPlayerDrew = false;

      // Check if game finished
      if (this.players[this.curPlayer].cards.length === 0)
        this.playersFinished.push(this.curPlayer);
      if (this.playersFinished.length === this.players.length - 1) {
        this.playersFinished.push(nxtPlayer);
        this.finishGame();
        this.fireEvent("move", moveEventObj as IMoveEvent);
        return;
      }
    }

    this.curPlayer = nxtPlayer;

    this.fireEvent("move", moveEventObj as IMoveEvent);

    if (this.players[this.curPlayer].isBot) this.moveBot();
  }

  getNextPlayer(card?: Card) {
    let nxtPlayer = this.curPlayer;

    if (card?.action === "reverse") this.direction *= -1;

    const moveForward = (steps: number = 1) => {
      while (steps--) {
        nxtPlayer = wrapMod(
          nxtPlayer + 1 * this.direction,
          this.players.length
        );
        while (this.players[nxtPlayer].cards.length === 0)
          nxtPlayer = wrapMod(
            nxtPlayer + 1 * this.direction,
            this.players.length
          );
      }
    };

    //Move to next player ( if not wild card )
    if (card?.action === "skip") {
      moveForward(2);
    } else if (card?.action !== "wild") moveForward();

    return nxtPlayer;
  }

  moveBot() {
    setTimeout(() => {
      for (let i = 0; i < this.players[this.curPlayer].cards.length; i++) {
        const card = this.players[this.curPlayer].cards[i];

        if (canPlayCard(this.tableStk[0], card, this.lastPlayerDrew))
          return this.move(false, card.id as string);
      }

      return this.move(true, null);
    }, 1500);
  }

  finishGame() {
    const playersFinishingOrder = this.playersFinished.map(
      (idx) => this.players[idx]
    );

    this.init();
    this.fireEvent("finish-game", playersFinishingOrder);
  }
}

export function canPlayCard(
  oldCard: Card,
  newCard: Card,
  lastPlayerDrew: boolean
) {
  const isOldDawingCard =
    oldCard?.action && oldCard.action.indexOf("draw") !== -1;
  const haveToDraw = isOldDawingCard && !lastPlayerDrew;
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

const getCardById = (id: string) => data.cards.find((c) => c.id === id);
