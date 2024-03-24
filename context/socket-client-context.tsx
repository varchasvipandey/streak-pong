import { createContext, useRef, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

import { config } from "@/lib/config";
import { RecvEvents } from "@/lib/socket-events";
import { toast } from "sonner";

interface SocketClientContextType {
  socket?: Socket;
}

interface SocketClientProviderProps {
  children: JSX.Element;
}

export const SocketClientContext = createContext<SocketClientContextType | null>(null);

export const SocketClientContextProvider = ({ children }: SocketClientProviderProps) => {
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

  return <SocketClientContext.Provider value={{ socket }}>{children}</SocketClientContext.Provider>;
};

const initSocketClient = async () => {
  try {
    const socket = io(config.socketServerUrl);

    socket.on(RecvEvents.SomeoneJoined, (msg) => {
      toast(msg);
    });

    socket.on(RecvEvents.SomeoneLeft, (msg) => {
      toast(msg);
    });

    return socket;
  } catch {
    return null;
  }
};
