import api from "../../../services/api";

export async function getSettings() {
  const { data } = await api.get("/copy");
  return data;
}

export async function saveSettings(payload) {
  const { data } = await api.put("/copy", payload);
  return data;
}

export async function generateLinkCode() {
  const { data } = await api.post("/copy/link-code");
  return data;
}
