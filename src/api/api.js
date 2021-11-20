import { socket } from "./socket";

export async function getServers() {
  return new Promise((res, rej) => {
    socket.emit("get-servers", null, (err, servers) => {
      if (err) return rej(err);
      res(servers);
    });
  });
}

export async function getServerPlayers() {
  return new Promise((res, rej) => {
    socket.emit("get-server-players", null, (err, servers) => {
      if (err) return rej(err);
      res(servers);
    });
  });
}

export async function createServer(serverName, serverPassword = "") {
  return new Promise((res, rej) => {
    socket.emit(
      "create-server",
      { serverName, serverPassword },
      (err, serverId) => {
        if (err) return rej(err);
        res(serverId);
      }
    );
  });
}

export async function joinServer(serverId, serverPassword = "") {
  return new Promise((res, rej) => {
    socket.emit(
      "join-server",
      { serverId, serverPassword, player: getPlayer() },
      (err, playerId) => {
        if (err) return rej(err);
        setTimeout(() => {
          // socket.emit("add-bots");
        }, 2000);
        res(playerId);
      }
    );
  });
}

export function readyToServer() {
  socket.emit("start-game");
}

export function leaveServer() {
  socket.emit("leave-server");
}

export async function move(draw, cardId) {
  return new Promise((res, rej) => {
    socket.emit("move", { cardId, draw }, (err) => {
      if (err) return rej(err);
      res();
    });
  });
}

export function onPlayersUpdated(cb) {
  socket.on("players-changed", cb);
  return () => socket.off("players-changed", cb);
}

export function onInit(cb) {
  socket.on("init-game", cb);

  return () => socket.off("init-game", cb);
}

export function onMove(cb) {
  socket.on("move", cb);
  return () => socket.off("move", cb);
}

export function onPlayerLeft(cb) {
  socket.on("player-left", cb);
  return () => socket.off("player-left", cb);
}

export function onFinishGame(cb) {
  socket.on("finished-game", cb);
  return () => socket.off("finished-game", cb);
}

export function removeAllListeners() {
  socket.removeAllListeners();
}

let player = null;

function getPlayer() {
  if (player) return player;
  player = {};
  player.name = localStorage.getItem("playerName");
  player.img = localStorage.getItem("playerImg");
  return player;
}
