import { createContext, useContext } from "react";
import socket from "../hooks/useSocket";

const SocketContext = createContext(socket);

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
