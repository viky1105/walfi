import api from "../../../services/api";

export async function getPortfolio() {
  const { data } = await api.get("/trades");

  return data;
}

export async function getTrade(id) {
  const { data } = await api.get(`/trades/${id}`);
  return data;
}
