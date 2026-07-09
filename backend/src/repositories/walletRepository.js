const supabase = require("../config/supabase");

async function createWallet(userId, walletAddress, nickname) {
  const { data, error } = await supabase

    .from("tracked_wallets")

    .insert([
      {
        user_id: userId,

        wallet_address: walletAddress,

        nickname,
      },
    ])

    .select()

    .single();

  if (error) throw error;

  return data;
}

async function getWallets(userId) {
  const { data, error } = await supabase
    .from("tracked_wallets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

async function getAllActiveWallets() {
  const { data, error } = await supabase

    .from("tracked_wallets")

    .select("wallet_address")

    .eq("is_active", true);

  if (error) throw error;

  return data;
}

async function findWallet(userId, walletAddress) {
  const { data, error } = await supabase
    .from("tracked_wallets")
    .select("*")
    .eq("user_id", userId)
    .eq("wallet_address", walletAddress)
    .maybeSingle();

  if (error) throw error;

  return data;
}

async function getWalletById(userId, walletId) {
  const { data, error } = await supabase
    .from("tracked_wallets")
    .select("*")
    .eq("id", walletId)
    .eq("user_id", userId)
    .single();

  if (error) throw error;

  return data;
}
async function getWalletByAddress(walletAddress) {
  const { data, error } = await supabase
    .from("tracked_wallets")
    .select("*")
    .eq("wallet_address", walletAddress)
    .single();

  if (error) return null;

  return data;
}

module.exports = {
  createWallet,
  getWallets,
  getAllActiveWallets,
  getWalletById,
  findWallet,
  getWalletByAddress,
};
