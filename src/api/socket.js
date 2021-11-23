import io from "socket.io-client";

export const socket = io.connect("http://localhost:5000");

socket.reconnectionAttempts(3);
