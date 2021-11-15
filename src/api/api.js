import { socket } from "./socket";

export async function getServers() {
  return new Promise((res, rej) => {
    socket.emit("get-servers", null, (err, servers) => {
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
    const player = JSON.parse(localStorage.getItem("player"));
    socket.emit(
      "join-server",
      { serverId, serverPassword, player },
      (err, playerId) => {
        if (err) return rej(err);
        res(playerId);
      }
    );
  });
}

export async function joinServer(serverId, serverPassword = "") {
  return new Promise((res, rej) => {
    const player = JSON.parse(localStorage.getItem("player"));
    socket.emit(
      "join-server",
      { serverId, serverPassword, player },
      (err, playerId) => {
        if (err) return rej(err);
        res(playerId);
      }
    );
  });
}

export function leaveServer() {
  socket.emit("leave-server", (err, playerId) => {
    if (err) return rej(err);
    res(playerId);
  });
}

export async function move(cardId, draw) {
  return new Promise((res, rej) => {
    socket.emit(
      "move",
      { cardId, draw },
      (err, { nxtPlayer, card, draw, cardsToDraw }) => {
        if (err) return rej(err);
        res({ nxtPlayer, card, draw, cardsToDraw });
      }
    );
  });
}

export async function onPlayersUpdated(cb) {
  socket.on("players-changed", cb);
}

export async function onStart(cb) {
  socket.on("start-game", cb);
}

export async function onMove(cb) {
  socket.on("move", cb);
}

export async function onPlayerLeft(cb) {
  socket.on("player-left", cb);
}
