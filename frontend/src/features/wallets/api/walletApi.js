import api from "../../../services/api";

export async function getWallets() {
  const { data } = await api.get("/wallets");
  return data;
}

export async function addWallet(payload) {
  const { data } = await api.post("/wallets", payload);
  return data;
}

export async function getWallet(id) {
  const { data } = await api.get(`/wallets/${id}`);

  return data;
}

export async function deleteWallet(id) {
  await api.delete(`/wallets/${id}`);
}
