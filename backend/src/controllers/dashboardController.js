const walletRepository = require("../repositories/walletRepository");

exports.getStats = async (req, res) => {
  const wallets = await walletRepository.getWallets(req.user.id);

  res.json({
    trackedWallets: wallets.length,
    signalsToday: 0,
    activeAlerts: 0,
    winRate: "--",
  });
};
