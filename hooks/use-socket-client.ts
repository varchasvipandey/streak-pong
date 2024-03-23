import { config } from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export const initSocketClient = async () => {
  try {
    const socket = io(config.socketServerUrl);

    socket.on("join", (msg) => {
      console.log(msg);
    });

    socket.on("leave", (msg) => {
      console.log(msg);
    });

    return socket;
  } catch {
    return null;
  }
};

export const useSocketClient = () => {
  const hasInitialized = useRef(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    let socketConnection: Socket;
    if (!hasInitialized.current) {
      initSocketClient().then((socket) => {
        if (socket) {
          setSocket(socket);
          socketConnection = socket;
        }
      });

      hasInitialized.current = true;
    }

    return () => {
      if (socketConnection) socketConnection.disconnect();
    };
  }, []);

  return socket;
};
