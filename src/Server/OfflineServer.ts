import { GameServer, Player, Card } from "../utils/interfaces";
import { ServerInterface } from "./ServerInterface";
import { socket } from "../api/socket";
import BotsServer from "../BotsServer/BotsServer";

export class OfflineServer implements ServerInterface {
  player?: Player;

  _botsServer: BotsServer;

  /**
   *
   */
  constructor() {
    this._botsServer = new BotsServer();
  }

  async getServers(): Promise<GameServer[]> {
    return [];
  }

  async getServerPlayers(): Promise<Player[]> {
    return this._botsServer.players.map((p) => ({ ...p, cards: [] }));
  }

  async createServer(
    serverName: string,
    serverPassword?: string
  ): Promise<string> {
    return new Promise((res, rej) => {
      socket.emit(
        "create-server",
        { serverName, serverPassword, player: this.getPlayer() },
        (err: any, playerId: string) => {
          if (err) return rej(err);
          res(playerId);
        }
      );
    });
  }

  async joinServer(serverId: string, serverPassword?: string): Promise<string> {
    this._botsServer = new BotsServer();
    this._botsServer.init();
    const playerId = this._botsServer.joinPlayer(this.getPlayer());
    setTimeout(() => this._botsServer.addBots(), 2000);
    return playerId;
  }

  emitReady(): void {
    this._botsServer.ready();
  }

  leaveServer(): void {
    this._botsServer = null as any;
  }
  async move(draw: boolean | null, cardId: string): Promise<void> {
    this._botsServer.move(draw, cardId);
  }

  onPlayersUpdated(cb: (players: Player[]) => void): () => void {
    this._botsServer.addEventListener("players-changed", cb);
    return () => this._botsServer.removeEventListener("players-changed", cb);
  }

  onGameInit(
    cb: (data: { players: Player[]; cards: Card[] }) => void
  ): () => void {
    this._botsServer.addEventListener("game-init", cb);
    return () => this._botsServer.removeEventListener("game-init", cb);
  }

  onMove(
    cb: (data: {
      nxtPlayer: number;
      card: Card;
      draw?: number | undefined;
      cardsToDraw?: Card[] | undefined;
    }) => void
  ): () => void {
    this._botsServer.addEventListener("move", cb);
    return () => this._botsServer.removeEventListener("move", cb);
  }

  onPlayerLeft(cb: () => void): () => void {
    this._botsServer.addEventListener("player-left", cb);
    return () => this._botsServer.removeEventListener("player-left", cb);
  }

  onFinishGame(cb: (playersOrdered: Player[]) => void): () => void {
    this._botsServer.addEventListener("finish-game", cb);
    return () => this._botsServer.removeEventListener("finish-game", cb);
  }

  removeAllListeners() {
    this._botsServer.removeAllListeners();
  }

  getPlayer(): Player {
    if (this.player) return this.player;
    this.player = {} as Player;
    this.player.name = localStorage.getItem("playerName") as string;
    this.player.img = localStorage.getItem("playerImg") as string;
    return this.player;
  }
}
