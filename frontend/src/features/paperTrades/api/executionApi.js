import axios from "axios";

const API = "http://localhost:5000/api";

export async function executeTrade(id) {
  const { data } = await axios.post(`${API}/execute/${id}`);

  return data;
}

export async function submitSignedTrade(id, signedTransaction) {
  const { data } = await axios.post(`${API}/execute/${id}/broadcast`, {
    signedTransaction,
  });

  return data;
}
