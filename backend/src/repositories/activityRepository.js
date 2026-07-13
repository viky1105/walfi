const supabase = require("../config/supabase");
const crypto = require("crypto");

async function getRecentActivity(walletIds) {
  if (!walletIds || walletIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase

    .from("wallet_activity")

    .select(
      `
            *,
            tracked_wallets (
                nickname,
                wallet_address
            )
        `,
    )

    .in("wallet_id", walletIds)

    .order("created_at", {
      ascending: false,
    })

    .limit(30);

  if (error) throw error;

  return data;
}

async function createActivity(activity) {
  const { data, error } = await supabase
    .from("wallet_activity")
    .insert({
      wallet_id: activity.walletId,
      token_symbol: activity.tokenSymbol,
      side: activity.side,
      amount: activity.amount,
      price: activity.price,
      contract_address: activity.contractAddress,
      signature: activity.signature,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
async function activityExists(signature) {
  const { count, error } = await supabase
    .from("wallet_activity")
    .select("*", { count: "exact", head: true })
    .eq("signature", signature);

  if (error) throw error;

  return count > 0;
}

module.exports = {
  getRecentActivity,
  createActivity,
  activityExists,
};
