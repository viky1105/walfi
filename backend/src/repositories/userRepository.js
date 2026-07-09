const supabase = require("../config/supabase");

async function findByWallet(walletAddress) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("wallet_address", walletAddress)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}

async function createUser(walletAddress) {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        wallet_address: walletAddress,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function updateLastLogin(userId) {
  const { error } = await supabase
    .from("users")
    .update({
      last_login_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
}

async function findChallenge(walletAddress) {
  const { data, error } = await supabase
    .from("auth_challenges")
    .select("*")
    .eq("wallet_address", walletAddress)
    .single();

  if (error) return null;

  return data;
}

async function deleteChallenge(walletAddress) {
  const { error } = await supabase
    .from("auth_challenges")
    .delete()
    .eq("wallet_address", walletAddress);

  if (error) throw error;
}

module.exports = {
  findByWallet,
  createUser,
  updateLastLogin,
  findChallenge,
  deleteChallenge,
};
