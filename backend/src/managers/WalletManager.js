const walletRepository = require("../repositories/walletRepository");

const heliusService = require("../services/heliusService");

async function syncWallets() {
  const wallets = await walletRepository.getAllActiveWallets();

  const addresses = [...new Set(wallets.map((wallet) => wallet.wallet_address))];

  await heliusService.updateWebhook(addresses);
}

module.exports = {
  syncWallets,
};
