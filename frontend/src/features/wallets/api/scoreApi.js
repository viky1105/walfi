import api from "../../../services/api";

export async function getWalletScores() {
  const { data } = await api.get("/scores");
  return data;
}
