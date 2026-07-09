const alertRepository = require("../repositories/alertRepository");

async function createAlert(alert) {
  return alertRepository.createAlert(alert);
}

async function getAlerts(userId) {
  return alertRepository.getAlerts(userId);
}

async function markAsRead(userId, alertId) {
  return alertRepository.markAsRead(alertId, userId);
}

module.exports = {
  createAlert,
  getAlerts,
  markAsRead,
};
