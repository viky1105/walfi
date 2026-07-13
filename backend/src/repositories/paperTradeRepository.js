const supabase = require("../config/supabase");

async function createPaperTrade(trade) {
  const { data, error } = await supabase
    .from("paper_trades")
    .insert(trade)
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function getPaperTrades(userId) {
  const { data, error } = await supabase
    .from("paper_trades")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

async function updateStatus(id, updates) {
  const { data, error } = await supabase
    .from("paper_trades")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
async function getTrade(id, userId) {
  const { data, error } = await supabase
    .from("paper_trades")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  return data;
}
async function finishTrade(id, signature) {
  return supabase
    .from("paper_trades")
    .update({
      status: "CONFIRMED",
      tx_signature: signature,
      executed_at: new Date().toISOString(),
    })
    .eq("id", id);
}

module.exports = {
  createPaperTrade,
  getPaperTrades,
  updateStatus,
  getTrade,
  finishTrade,
};
