import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Providers from "./app/WalletProvider.jsx";
import { SocketProvider } from "./shared/context/SocketContext";
// Removed geist/css import (package exports don't expose this path). Use a hosted font or add local font files if desired.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Providers>
  </StrictMode>,
);
