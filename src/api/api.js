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
