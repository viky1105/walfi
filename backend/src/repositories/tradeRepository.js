const supabase = require("../config/supabase");

async function getTrades(userId) {
  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

async function getTrade(id, userId) {
  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  return data;
}
async function createTrade(trade) {
  const { data, error } = await supabase
    .from("trades")
    .insert({
      user_id: trade.userId,
      contract_address: trade.contractAddress,
      token_symbol: trade.tokenSymbol,
      buy_price: trade.buyPrice,
      amount: trade.amount,
      status: "OPEN",
      side: "BUY",
      signature: trade.signature,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
module.exports = {
  getTrades,
  getTrade,
  createTrade,
};
