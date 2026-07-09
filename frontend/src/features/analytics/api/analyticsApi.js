import api from "../../../services/api";

export async function getAnalytics() {
  const { data } = await api.get("/analytics");
  return data;
}
