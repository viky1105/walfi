const supabase = require("../config/supabase");

async function createAlert(alert) {
  const { data, error } = await supabase
    .from("alerts")
    .insert(alert)
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function getAlerts(userId) {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

async function markAsRead(alertId, userId) {
  const { data, error } = await supabase
    .from("alerts")
    .update({
      is_read: true,
    })
    .eq("id", alertId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function deleteAlertsByWallet(userId, walletId, walletNickname) {
  const { error: linkedAlertsError } = await supabase
    .from("alerts")
    .delete()
    .eq("user_id", userId)
    .eq("tracked_wallet_id", walletId);

  if (linkedAlertsError) throw linkedAlertsError;

  // Remove alerts created before tracked_wallet_id was introduced.
  const { error: legacyAlertsError } = await supabase
    .from("alerts")
    .delete()
    .eq("user_id", userId)
    .is("tracked_wallet_id", null)
    .eq("title", `Swap detected for ${walletNickname}`);

  if (legacyAlertsError) throw legacyAlertsError;
}

module.exports = {
  createAlert,
  getAlerts,
  markAsRead,
  deleteAlertsByWallet,
};
