const supabase = require("../config/supabase");

async function getWalletScores(userId) {
  const { data: wallets, error } = await supabase
    .from("tracked_wallets")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  const scoredWallets = wallets.map((wallet) => {
    const tradeScore = Math.floor(Math.random() * 25) + 75;
    const activityScore = Math.floor(Math.random() * 20) + 80;
    const consistencyScore = Math.floor(Math.random() * 15) + 85;
    const winRate = Math.floor(Math.random() * 20) + 80;

    const totalScore = Math.round(
      tradeScore * 0.3 +
        activityScore * 0.2 +
        consistencyScore * 0.1 +
        winRate * 0.4,
    );

    return {
      ...wallet,
      score: totalScore,
      winRate,
      activityScore,
      consistencyScore,
      tradeScore,
    };
  });

  return scoredWallets;
}

module.exports = {
  getWalletScores,
};
