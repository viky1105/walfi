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

module.exports = {
  createAlert,
  getAlerts,
  markAsRead,
};
