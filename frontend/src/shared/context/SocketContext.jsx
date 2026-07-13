import { createContext } from "react";
import socket from "../hooks/useSocket";

const SocketContext = createContext(socket);

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { SocketContext };
