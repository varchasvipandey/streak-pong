import { config } from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

const PORT = config.socketServerPort;

export const initSocketClient = async () => {
  try {
    const res = await fetch("/api/socket");
    if (res.status === 200 || res.status === 201) {
      const socket = io(`:${PORT}`, { path: "/api/socket" });

      socket.on("join", (msg) => {
        console.log(msg);
      });

      socket.on("leave", (msg) => {
        console.log(msg);
      });

      return socket;
    }

    return null;
  } catch {
    return null;
  }
};

export const useSocketClient = () => {
  const hasInitialized = useRef(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!hasInitialized.current) {
      initSocketClient().then((socket) => {
        if (socket) setSocket(socket);
      });

      hasInitialized.current = true;
    }
  }, []);

  return socket;
};
