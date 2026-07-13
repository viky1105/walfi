const walletRepository = require("../repositories/walletRepository");

const heliusService = require("../services/heliusService");

async function syncWallets() {
  const wallets = await walletRepository.getAllActiveWallets();

  const addresses = [...new Set(wallets.map((wallet) => wallet.wallet_address))];

  console.log(`Syncing ${addresses.length} active wallet(s) to Helius.`);
  await heliusService.updateWebhook(addresses);
}

module.exports = {
  syncWallets,
};
