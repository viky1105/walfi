import api from "../../../services/api";

export async function getAlerts() {
  const { data } = await api.get("/alerts");
  return data;
}

export async function markAlertAsRead(id) {
  const { data } = await api.patch(`/alerts/${id}/read`);
  return data;
}
