const supabase = require("../config/supabase");

async function getToken(mint) {
  const { data } = await supabase
    .from("token_metadata")
    .select("*")
    .eq("mint", mint)
    .single();

  return data;
}

async function saveToken(token) {
  const { data, error } = await supabase
    .from("token_metadata")
    .upsert(token)
    .select()
    .single();

  if (error) throw error;

  return data;
}

module.exports = {
  getToken,
  saveToken,
};
