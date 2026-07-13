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
    }, {
      onConflict: "user_id",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function findSettingsByLinkCode(linkCode) {
  const { data, error } = await supabase
    .from("copy_settings")
    .select("*")
    .eq("link_code", linkCode)
    .maybeSingle();

  if (error) throw error;

  return data;
}

async function getSettingsByTelegramChatId(chatId) {
  const { data, error } = await supabase
    .from("copy_settings")
    .select("*")
    .eq("telegram_chat_id", chatId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

module.exports = {
  getSettings,
  saveSettings,
  findSettingsByLinkCode,
  getSettingsByTelegramChatId,
};
