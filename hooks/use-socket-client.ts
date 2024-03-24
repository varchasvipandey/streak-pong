import { SocketClientContext } from "@/context/socket-client-context";
import { useContext } from "react";

export const useSocketClient = () => {
  const context = useContext(SocketClientContext);

  if (!context)
    throw new Error("useSocketClient must be used inside SocketClientContext. Make sure your component is wrapped by SocketClientContextProvider.");

  return context;
};
