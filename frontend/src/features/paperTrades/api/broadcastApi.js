import api from "../../../services/api";

export async function broadcastTrade(tradeId, signedTransaction) {
  const { data } = await api.post("/broadcast", {
    tradeId,
    signedTransaction,
  });

  return data;
}
