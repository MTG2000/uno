import { GameServer, Player, Card } from "../utils/interfaces";
import { ServerInterface } from "./ServerInterface";
import { socket } from "../api/socket";

export class OfflineServer implements ServerInterface {
  player?: Player;

  getServers(): Promise<GameServer[]> {
    return new Promise((res, rej) => {
      socket.emit("get-servers", null, (err: any, servers: GameServer[]) => {
        if (err) return rej(err);
        res(servers);
      });
    });
  }
  getServerPlayers(): Promise<Player[]> {
    return new Promise((res, rej) => {
      socket.emit("get-server-players", null, (err: any, players: Player[]) => {
        if (err) return rej(err);
        res(players);
      });
    });
  }
  createServer(serverName: string, serverPassword?: string): Promise<string> {
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

  joinServer(serverId: string, serverPassword?: string): Promise<string> {
    return new Promise((res, rej) => {
      socket.emit(
        "join-server",
        { serverId, serverPassword, player: this.getPlayer() },
        (err: any, playerId: string) => {
          if (err) {
            return rej(err);
          }
          setTimeout(() => {
            // socket.emit("add-bots");
          }, 2000);
          res(playerId);
        }
      );
    });
  }
  emitReady(): void {
    socket.emit("start-game");
  }
  leaveServer(): void {
    socket.emit("leave-server");
  }
  move(draw: boolean | null, cardId: string): Promise<void> {
    return new Promise((res, rej) => {
      socket.emit("move", { cardId, draw }, (err: any) => {
        if (err) return rej(err);
        res();
      });
    });
  }
  onPlayersUpdated(cb: (players: Player[]) => void): () => void {
    socket.on("players-changed", cb);
    return () => socket.off("players-changed", cb);
  }

  onGameInit(
    cb: (data: { players: Player[]; cards: Card[] }) => void
  ): () => void {
    socket.on("init-game", cb);
    return () => socket.off("init-game", cb);
  }
  onMove(
    cb: (data: {
      nxtPlayer: number;
      card: Card;
      draw?: number | undefined;
      cardsToDraw?: Card[] | undefined;
    }) => void
  ): () => void {
    socket.on("move", cb);
    return () => socket.off("move", cb);
  }

  onPlayerLeft(cb: () => void): () => void {
    socket.on("player-left", cb);
    return () => socket.off("player-left", cb);
  }

  onFinishGame(cb: (playersOrdered: Player[]) => void): () => void {
    socket.on("finished-game", cb);
    return () => socket.off("finished-game", cb);
  }

  removeAllListeners() {
    socket.removeAllListeners();
  }

  getPlayer(): Player {
    if (this.player) return this.player;
    this.player = {} as Player;
    this.player.name = localStorage.getItem("playerName") as string;
    this.player.img = localStorage.getItem("playerImg") as string;
    return this.player;
  }
}
