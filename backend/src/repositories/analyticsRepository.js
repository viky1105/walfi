const supabase = require("../config/supabase");

async function getAnalytics(userId) {
  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  const totalTrades = data.length;

  const openPositions = data.filter((trade) => trade.status === "OPEN").length;

  const closedPositions = data.filter(
    (trade) => trade.status === "CLOSED",
  ).length;

  const totalVolume = data.reduce(
    (sum, trade) => sum + trade.amount * trade.buy_price,
    0,
  );

  return {
    totalTrades,
    openPositions,
    closedPositions,
    totalVolume,
  };
}

module.exports = {
  getAnalytics,
};
