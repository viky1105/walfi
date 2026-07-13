const activityRepository = require("../repositories/activityRepository");
const walletRepository = require("../repositories/walletRepository");
const alertService = require("./alertService");

async function getRecentActivity(userId) {
  const wallets = await walletRepository.getWallets(userId);
  const walletIds = wallets.map((wallet) => wallet.id);

  if (walletIds.length === 0) {
    return [];
  }

  return activityRepository.getRecentActivity(walletIds);
}

module.exports = {
  getRecentActivity,
};
