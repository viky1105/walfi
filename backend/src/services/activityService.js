const activityRepository = require("../repositories/activityRepository");
const walletRepository = require("../repositories/walletRepository");
const alertService = require("./alertService");

async function getRecentActivity(userId) {
  return activityRepository.getRecentActivity(userId);
}

module.exports = {
  getRecentActivity,
};
