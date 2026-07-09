import api from "../../../services/api";

export async function getPaperTrades() {
  const { data } = await api.get("/paper-trades");

  return data;
}
