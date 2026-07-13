const http = require("http");

const app = require("./app");
const { initSocket } = require("./socket/socket");
const { registerWebhook } = require("./services/telegramService");
const walletManager = require("./managers/WalletManager");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Walfi API running on port ${PORT}`);
  void registerWebhook();
  walletManager.syncWallets().catch((err) => {
    console.error("Helius startup sync failed:", err.message);
  });
});
