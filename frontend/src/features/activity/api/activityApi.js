import api from "../../../services/api";

export async function getRecentActivity() {
  const { data } = await api.get("/activity");

  return data;
}
