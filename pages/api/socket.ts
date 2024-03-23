import { config } from "@/lib/config";
import type { Server as HTTPServerType } from "http";
import type { Socket as NetSocketType } from "net";
import type { NextApiRequest, NextApiResponse as NextApiResponseBase } from "next";
import type { Server as SocketServerBaseType } from "socket.io";

import { Server } from "socket.io";

const PORT = config.socketServerPort;

interface SocketServer extends HTTPServerType {
  io?: SocketServerBaseType;
}

interface SocketWithIO extends NetSocketType {
  server: SocketServer;
}

interface NextApiResponse extends NextApiResponseBase {
  socket: SocketWithIO;
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (res.socket.server.io) {
    res.status(200).json({ success: true, message: "running" });

    return;
  }

  console.log("Init socket server on port:", PORT);

  const io = new Server({
    path: "/api/socket",
    cors: {
      origin: "*",
    },
  }).listen(PORT);

  io.on("connect", (socket) => {
    const _socket = socket;
    console.log("socket connect: ", socket.id);

    _socket.broadcast.emit("join", `${_socket.id} joined the queue!`);

    socket.on("disconnect", async () => {
      console.log("socket disconnect: ", socket.id);

      _socket.broadcast.emit("leave", `${_socket.id} left the queue!`);
    });
  });

  res.socket.server.io = io;
  res.status(201).json({ success: true, message: "new" });
}
