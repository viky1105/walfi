const { PublicKey } = require("@solana/web3.js");

const walletRepository = require("../repositories/walletRepository");
const walletManager = require("../managers/WalletManager");

async function addWallet(userId, body) {
  const { wallet_address, nickname } = body;

  try {
    new PublicKey(wallet_address);
  } catch {
    throw new Error("Invalid Solana wallet.");
  }

  // Check if already tracking
  const existingWallet = await walletRepository.findWallet(
    userId,
    wallet_address,
  );

  if (existingWallet) {
    throw new Error("You're already tracking this wallet.");
  }

  const wallet = await walletRepository.createWallet(
    userId,
    wallet_address,
    nickname,
  );
  try {
    await walletManager.syncWallets();
  } catch (err) {
    await walletRepository.deleteWallet(userId, wallet.id);
    throw new Error(`Unable to start wallet monitoring: ${err.message}`);
  }
  return wallet;
}

async function getWallets(userId) {
  return walletRepository.getWallets(userId);
}

async function getWallet(userId, walletId) {
  return walletRepository.getWalletById(userId, walletId);
}

module.exports = {
  addWallet,
  getWallets,
  getWallet,
};
