const supabase = require("../config/supabase");

async function getSettings(userId) {
  const { data, error } = await supabase
    .from("copy_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

async function saveSettings(userId, settings) {
  const { data, error } = await supabase
    .from("copy_settings")
    .upsert({
      user_id: userId,
      ...settings,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

module.exports = {
  getSettings,
  saveSettings,
};
