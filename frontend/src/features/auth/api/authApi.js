import api from "../../../services/api";

export async function getChallenge(wallet) {
  const { data } = await api.get(`/auth/challenge?wallet=${wallet}`);

  return data;
}

export async function verifySignature(payload) {
  const { data } = await api.post("/auth/verify", payload);

  return data;
}
