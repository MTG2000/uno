import { OfflineServer } from "../Server/OfflineServer";
import { OnlineServer } from "../Server/OnlineServer";
import { ServerInterface } from "../Server/ServerInterface";
import { Player, GameServer, Card } from "../utils/interfaces";
import { socket } from "./socket";

export class _API implements ServerInterface {
  isOnline = false;
  _server: ServerInterface;
  player?: Player;

  constructor() {
    if (this.isOnline) this._server = new OnlineServer();
    else this._server = new OfflineServer();

    socket.on("connect", () => {
      this.setOnlineMode(socket.connected);
    });
  }

  setOnlineMode(isOnline: boolean) {
    this.isOnline = isOnline;
  }

  playOnline(isOnline: boolean) {
    if (isOnline) this._server = new OnlineServer();
    else this._server = new OfflineServer();
  }

  getServers(): Promise<GameServer[]> {
    console.log(this._server);

    return this._server.getServers();
  }
  getServerPlayers(): Promise<Player[]> {
    return this._server.getServerPlayers();
  }
  createServer(serverName: string, serverPassword?: string): Promise<string> {
    return this._server.createServer(serverName, serverPassword);
  }
  joinServer(serverId: string, serverPassword?: string): Promise<string> {
    return this._server.joinServer(serverId, serverPassword);
  }

  emitReady(): void {
    this._server.emitReady();
  }
  leaveServer(): void {
    this._server.leaveServer();
  }
  move(draw: boolean | null, cardId: string): Promise<void> {
    return this._server.move(draw, cardId);
  }
  onPlayersUpdated(cb: (players: Player[]) => void): () => void {
    return this._server.onPlayersUpdated(cb);
  }
  onGameInit(
    cb: (data: { players: Player[]; cards: Card[] }) => void
  ): () => void {
    const unsub = this._server.onGameInit(cb);
    console.log(this._server);
    return unsub;
  }
  onMove(
    cb: (data: {
      nxtPlayer: number;
      card: Card;
      draw?: number | undefined;
      cardsToDraw?: Card[] | undefined;
    }) => void
  ): () => void {
    return this._server.onMove(cb);
  }
  onPlayerLeft(cb: () => void): () => void {
    return this._server.onPlayerLeft(cb);
  }
  onFinishGame(cb: (playersOrdered: Player[]) => void): () => void {
    return this._server.onFinishGame(cb);
  }
  getPlayer(): Player {
    return this._server.getPlayer();
  }
}

const API = new _API();

export default API;
